import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Form, Button, FormGroup } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router";

import { Link } from "react-router-dom";

import Env from "../../helpers/Env";
import StarRatings from "react-star-ratings";

import "./InventoryListings.css";
import { List } from "semantic-ui-react";
class InventoryListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: {},
      productsAvailable: false,
      dialogueOpen: false,
      categoryName: "",
      defaultCatName: "",
    };
  }

  handleClose = () => {
    this.setState({ dialogueOpen: false });
  };

  handleClickOpen = () => {
    this.setState({ dialogueOpen: true });
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addCategoryAction = () => {
    this.handleClickOpen();
  };

  getCategories = async () => {
    await axios
      .get(`${Env.host}/api/admin/get-product-categories`)
      .then((res) => {
        console.log("response is::", res);
        this.setState({
          categories: res.data,
        });
      });
  };

  async componentDidMount() {
    await this.getCategories();
    console.log("categories::::", this.state.categories);
    var defaultCatId;
    var defaultCatName;
    this.state?.categories?.map((category) => {
      defaultCatId = category.id;
      defaultCatName = category.category;
    });
    await this.setState({
      defaultCatName: defaultCatName,
    });
    if (defaultCatId) {
      await this.getProductsByCategory(defaultCatId);
    }
  }

  getProductsByCategory = (categoryId) => {
    axios
      .get(`${Env.host}/api/admin/products/${categoryId}`)
      .then(async (res) => {
        console.log("response is::", res);
        if (res.data.result === "No products in this category") {
          await this.setState({
            products: [],
            productsAvailable: false,
          });
        } else {
          for (var i in res.data.result) {
            if (res.data.result[i].sellerId) {
              await axios
                .get(
                  `http://localhost:3001/api/seller/profile/${res.data.result[i].sellerId}`
                )
                .then((seller) => {
                  res.data.result[i].sellerName = seller.data.sellerName;
                });
            }
            console.log("after getting seller names::", res.data.result);
          }
          await this.setState({
            products: res.data.result,
            productsAvailable: true,
          });
          console.log("products  typeof::::", this.state.products);
        }
      });
  };

  addCategory = () => {
    const categoryData = { categoryName: this.state.categoryName };
    axios
      .post(`${Env.host}/api/admin/add-category`, categoryData)
      .then(async (res) => {
        console.log("add Category::::", res);
        this.getCategories();
      });
  };

  deleteCategory = () => {
    axios
      .delete(
        `${Env.host}/api/admin/delete-category/${this.state?.selectedCategory?.id}`
      )
      .then(async (res) => {
        console.log("delete response::::", res);
        alert(res.data.result);
        this.getCategories();
      });
  };

  handleSearchNameChange = async (e, data) => {
    await this.setState({
      [e.target.name]: e.target.value,
      selectedCategory: data,
    });
    console.log(JSON.stringify(this.state.selectedCategory, null, 2));
    this.getProductsByCategory(this.state.selectedCategory.id);
    this.setState({
      defaultCatName: this.state.selectedCategory.category,
    });
  };

  onSearchNameKeyUp = (event) => {
    if (!!event.target.value && event.target.value.length >= 3) {
      console.log("onKeyUp Enter");
      event.preventDefault();
      event.stopPropagation();
      this.getProductsByCategory(this.state.selectedCategory.id);
    }
  };

  render() {

    let redirectVar = null;
    if(!localStorage.getItem("id")){
        redirectVar = <Redirect to= "/login"/>
    }
   

    let products = "";
    console.log("Abcc", this.state.defaultCatName);
    if (this.state.productsAvailable) {
      console.log("enetered iff in ");
      products = this.state?.products?.map((sellerProduct) => {
        return (
          <div className="col-md-3" style={{ margin: 5 }}>
            <div className="ui card">
              {/* <div className="image"> */}
              <div className="row" style={{ margin: 10 }}>
                {/* <div className="col-md-1" style={{ paddingTop: "50px" }}>
                  <a
                    className="prev"
                    onClick={this.scroll.bind(null, -1, sellerProduct._id)}
                  >
                    &#10094;
                  </a>
                </div> */}
                <div className="col-md-8">
                  <div className="image-container" id={sellerProduct._id}>
                    <div className="image">
                      <img
                        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-1" style={{ paddingTop: "50px" }}>
                  <a
                    className="next"
                    onClick={this.scroll.bind(null, 1, sellerProduct._id)}
                  >
                    &#10095;
                  </a>
                </div> */}
              </div>
              <div className="content">
                <div
                  className="row"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20",
                    margin: 10,
                    textAlign: "center",
                  }}
                >
                  {sellerProduct.productName}
                </div>
                <div
                  className="row"
                  style={{ margin: 10, textAlign: "center" }}
                >
                  Seller: {sellerProduct.sellerName}
                </div>
                <div
                  className="row"
                  style={{ margin: 10, textAlign: "center" }}
                >
                  {sellerProduct.productDesc}
                </div>
                <div
                  className="row"
                  style={{ margin: 10, textAlign: "center" }}
                >
                  ${sellerProduct.price}
                </div>
                {/* <div className="row" style={{ margin: 10 }}>
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="yellow"
                    changeRating={this.changeRating.bind(this)}
                    starDimension="20px"
                    starSpacing="6px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div> */}
              </div>
              <hr style={{ height: "2px", backgroundColor: "gray" }}></hr>
              <div className="extra content">
                <Link
                  style={{ fontSize: "15", marginLeft: "70px" }}
                  to={{
                    pathname: `/product/${sellerProduct._id}`,
                  }}
                >
                  {" "}
                  View Product
                </Link>
              </div>
              <br />
            </div>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        {redirectVar}
        <article className="auth-inner4">
          <h3>Inventory Listings</h3>
          {/* <div className="row">InventoryListings</div> */}
          <div className="row">
            <div className="col-6">
              <Autocomplete
                className="productSearch"
                id="combo-box-demo"
                name="categoryName"
                searchText={this.state.defaultCatName}
                onChange={this.handleSearchNameChange}
                onKeyUp={this.onSearchNameKeyUp}
                options={!!this.state?.categories ? this.state?.categories : []}
                getOptionLabel={(category) => category.category}
                // value={(category) => category.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by category"
                    // variant="outlined"
                  />
                )}
              />
            </div>
            <div className="col-3">
              <div className="apply-btn-container float-left">
                <button
                  className="btn btn btn-warning category-button"
                  type="button"
                  style={{ marginTop: "15px", marginLeft: "25px" }}
                  onClick={this.addCategoryAction}
                >
                  Add Category
                </button>
              </div>
            </div>
            <div className="col-3">
              <div className="apply-btn-container float-left">
                <button
                  className="btn btn btn-warning category-button"
                  style={{ marginTop: "15px", marginLeft: "20px" }}
                  type="button"
                  onClick={this.deleteCategory}
                >
                  Delete Category
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {!!this.state?.productsAvailable && products ? (
              <div>
                <br />
                <h5 style={{ marginLeft: "20px" }}>
                  Selected Category : {this.state.defaultCatName}
                </h5>
                <br />
                <div className="row">{products}</div>
                <br />
              </div>
            ) : (
              <div>
                <br />
                <h5 style={{ marginLeft: "20px" }}>
                  Selected Category : {this.state.defaultCatName}
                </h5>
                <br />
                <h6
                  className="product-unavailable"
                  style={{ marginLeft: "20px" }}
                >
                  This category has no products
                </h6>
                <br />
              </div>
            )}
          </div>
        </article>

        <Dialog
          className="add-product-dialogue"
          onClose={this.handleClose}
          style={{ margin: "auto", width: "400px", height: "400px" }}
          aria-labelledby="customized-dialog-title"
          open={this.state.dialogueOpen}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Add Category
          </DialogTitle>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                onChange={this.handleOnChange}
              />
            </Form.Group>
          </Form>
          <div className="apply-btn-container float-left">
            <button
              className="btn btn btn-warning category-button"
              type="button"
              onClick={this.addCategory}
            >
              Add Category
            </button>
          </div>
          <br />
          <div className="apply-btn-container float-left">
            <button
              className="btn btn btn-warning category-button"
              type="button"
              onClick={this.handleClose}
            >
              Close
            </button>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default InventoryListings;
