import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import Env from "../../helpers/Env";

export default class EditProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDesc: "",
      price: "",
      category: "",
      sellerProducts: [],
      sellerProductsTest: [],
      redirect: null,
      formData: [],
      categories: [],
      productChange: false,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    console.log("sellerProductsTest", this.state.sellerProductsTest);
    this.setState({
      formData: this.state.formData.concat(e.target.files[0]),
    });
    this.setState({
      productChange: true,
    });
  }

  async removeImage(image) {
    var productId = this.props.match.params.id;
    console.log("remove productId::", productId, "imagePath:::", image);

    var data = {
      productId: productId,
      imagePath: image,
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .post(`${Env.host}/api/file/removeProductImage`, data)
      .then(async (res) => {
        console.log("success", res);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios
          .get(
            `${Env.host}/api/product/getProductDetails/${productId}`
          )
          .then((response) => {
            console.log("Pro are::", response);
            alert("deleted image");
            this.setState({
              sellerProducts: this.state.sellerProducts.concat(response.data),
            });
            //console.log("Pro are::", this.state.sellerProducts);
          });
      });
  }

  async componentDidMount() {
    var productId = this.props.match.params.id;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .get(`${Env.host}/api/product/getProductDetails/${productId}`)
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
          sellerProducts: this.state.sellerProducts.concat(response.data),
        });
        console.log("Pro are::", this.state.sellerProducts);
      });
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .get(`${Env.host}/api/admin/get-product-categories`)
      .then((res) => {
        console.log("response is::", res);
        this.setState({
          categories: res.data,
        });
      });
  }

  handleReduxChange = (e, id, name) => {
    const sellerProduct = this.state.sellerProducts;
    sellerProduct.map((sellerProductt) => {
      if (sellerProductt._id === id) {
        if (sellerProductt[name] == "category") {
          this.setState({
            category: e.target.value,
          });
        } else {
          sellerProductt[name] = e.target.value;
        }
      }
      console.log("Id iss", sellerProductt);
      this.setState({
        sellerProductsTest: sellerProductt,
      });
      this.setState({
        productChange: true,
      });
    });
  };

  // setCategory(e) {
  //   console.log("event", e.target.value);
  //   this.setState({
  //     category: e.target.value,
  //   });
  // }

  async editProduct(event) {
    var changedProdObj;
    console.log("In ", this.state.sellerProductsTest);
    if (this.state.productChange) {
      console.log("In If");
      changedProdObj = this.state.sellerProductsTest;
      const payload = {
        _id: this.props.match.params.id,
        productObj: changedProdObj,
      };
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      await axios
        .post(`${Env.host}/api/product/editProduct/`, payload)
        .then(async (response) => {
          this.state.formData.map(async (form) => {
            let fileData = new FormData();
            fileData.append("file", form);
            //imagesData.push(fileData)
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            await axios
              .post(
                `${Env.host}/api/file/uploadImages/?productId=` +
                  this.props.match.params.id,
                fileData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then(async (res) => {
                console.log("success", res);
              });
          });
          axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
          await axios
            .get(
              `${Env.host}/api/product/getProductDetails/${this.props.match.params.id}`
            )
            .then((response) => {
              // alert("Updated successfully");
              console.log("Pro are::", response);
              this.setState({
                sellerProducts: [].concat(response.data),
              });
            });
          alert("Updated successfully");
        });
    } else {
      console.log("In else");
      alert("Edit the product");
    }
    console.log("New pro", changedProdObj);
  }

  async deleteProduct(event) {
    const payload = {
      _id: this.props.match.params.id,
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(`${Env.host}/api/product/deleteProduct/`, payload)
      .then((response) => {
        console.log("Final res is", response);
        this.setState({ redirect: `/viewAllSellerProducts` });
        alert("Deleted successfully");
      });
  }

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllSellerProducts` });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let sellerProducts = this.state.sellerProducts.map((sellerProduct) => {
      console.log("P name", sellerProduct.productName);

      let imagesHTML;
      let imagesHTMLforAdd;

      let multpileAdds;

      imagesHTML = sellerProduct.productImages.map((image) => {
        return (
          <div className="form-group">
            <div className="row" style={{ marginLeft: "15px" }}>
              <img
                src={image}
                style={{
                  width: "50px",
                  height: "65px",
                  cursor: "pointer",
                  marginRight: "15px",
                }}
              ></img>
              <Button
                variant="warning"
                style={{ width: "85px" }}
                block
                onClick={(event) => this.removeImage(image)}
              >
                Remove
              </Button>
            </div>
          </div>
        );
      });

      // console.log("remaining length::",5-sellerProduct.productImages.length)

      //(i)=>{
      let len = sellerProduct.productImages.length;
      let arr = [];
      for (let index = 0; index < 5 - len; index++) {
        arr.push(index);
      }

      imagesHTMLforAdd = arr.map((pp) => {
        return (
          <div className="form-group">
            <strong>Image </strong>
            <input
              type="file"
              name="user_image"
              accept="image/*"
              className="form-control"
              aria-label="Image"
              aria-describedby="basic-addon1"
              onChange={(e) => this.handleImageChange(e)}
            />
          </div>
        );
      });

      // multpileAdds =

      //}
      console.log("imagesHTMLforAdd", imagesHTMLforAdd);
      //console.log("imagesHTMLforAdd", imagesHTMLforAdd)
      //}

      return (
        <div className="auth-wrapper">
          <div className="auth-inner1">
            <div className="container">
              <div className="row2">
                <div className="panel panel-primary">
                  <div className="panel-body">
                    <div className="form-group">
                      <h3 style={{ float: "center" }}>Edit Product Details</h3>
                    </div>
                    <Form>
                      <div className="form-group">
                        <strong>Product Name</strong>
                        <input
                          defaultValue={sellerProduct.productName}
                          name="productName"
                          type="text"
                          maxlength="50"
                          className="form-control"
                          onChange={(e) =>
                            this.handleReduxChange(
                              e,
                              sellerProduct._id,
                              "productName"
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <strong>Product Description</strong>
                        <input
                          defaultValue={sellerProduct.productDesc}
                          name="productDesc"
                          type="text"
                          maxlength="100"
                          className="form-control"
                          onChange={(e) =>
                            this.handleReduxChange(
                              e,
                              sellerProduct._id,
                              "productDesc"
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <strong>Price</strong>
                        <input
                          defaultValue={sellerProduct.price}
                          name="price"
                          type="text"
                          maxlength="100"
                          className="form-control"
                          onChange={(e) =>
                            this.handleReduxChange(
                              e,
                              sellerProduct._id,
                              "price"
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <strong>Category</strong>
                        <div>{sellerProduct.category}</div>
                      </div>
                      <div className="form-group">
                        <strong>Change Category</strong>
                        <select
                          placeholder="Select Category"
                          defaultValue={sellerProduct.category}
                          class="form-control"
                          name="category"
                          onChange={(e) =>
                            this.handleReduxChange(
                              e,
                              sellerProduct._id,
                              "category"
                            )
                          }
                        >
                          {this.state.categories.map((e, key) => {
                            return (
                              <option key={key} value={e.category}>
                                {e.category}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {imagesHTML}
                      {imagesHTMLforAdd}
                      <div
                        className="form-group"
                        style={{ paddingTop: "12px" }}
                      >
                        <Button
                          variant="warning"
                          size="lg"
                          block
                          onClick={(event) => this.editProduct(event)}
                        >
                          Save new product details
                        </Button>
                        <br />
                        <br />
                        <br />
                        <Button
                          variant="warning"
                          size="lg"
                          block
                          onClick={(event) => this.deleteProduct(event)}
                        >
                          Delete Product
                        </Button>
                        <br />
                        <br />
                        <br />
                        <Button
                          variant="warning"
                          size="lg"
                          block
                          onClick={(event) =>
                            this.redirectToProductsPage(event)
                          }
                        >
                          View All Products
                        </Button>
                      </div>
                      <br />
                      <br />
                      <p className="form-group">
                        By clicking here you are editing a product to{" "}
                        <a href="#">Amazon</a> so that customers can buy
                      </p>
                      <div
                        className="form-group"
                        style={{ paddingTop: "12px" }}
                      ></div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return <div>{sellerProducts}</div>;
  }
}

{
  /* <div className="form-group divider">
                    <hr className="left" />
                    <small>New to site?</small>
                    <hr className="right" />
                  </div>
                  <p className="form-group">
                    <a href="#" className="btn btn-info btn-block">
                      Create an account
                    </a>
                  </p> */
}
