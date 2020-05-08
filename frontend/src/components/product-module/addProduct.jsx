import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import Env from "../../helpers/Env";

export default class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDesc: "",
      price: "",
      category: "",
      sellerProducts: [],
      categories: [],
      formData: [],
      redirect:null
    };
    this.addProduct = this.addProduct.bind(this);
    this.viewAllSellerProducts = this.viewAllSellerProducts.bind(this);
    this.scroll = this.scroll.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  scroll(direction, id) {
    console.log("id here=>" + id);
    let far = ($("#" + id).width() + 25) * direction;
    let pos = $("#" + id).scrollLeft() + far;
    $("#" + id).animate({ scrollLeft: pos }, 100);
  }

  handleImageChange(e, index) {
    this.setState({
      formData: this.state.formData.concat(e.target.files[0]),
    });
  }

  async componentDidMount() {
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

  setCategory(e) {
    console.log("event", e.target.value);
    this.setState({
      category: e.target.value,
    });
  }

  async viewAllSellerProducts(event) {
    
      this.setState({
        redirect :"/homePage"
      })


  }

  async addProduct(event) {
    const payload = {
      productName: this.state.productName,
      productDesc: this.state.productDesc,
      price: this.state.price,
      category: this.state.category,
      sellerId: localStorage.getItem("id"),
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(`${Env.host}/api/product/addProduct/`, payload)
      .then((response) => {
        console.log("Response is", response.data);
        if (response.status == 200 && response.data) {
          var imagesData = [];
          this.state.formData.map(async (form) => {
            let fileData = new FormData();
            fileData.append("file", form);
            imagesData.push(fileData);
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            await axios
              .post(
                `${Env.host}/api/file/uploadImages/?productId=` +
                  response.data,
                fileData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((res) => {
                console.log("Adding Product");
              });
          });
          alert(`Added a product successfully`);
        } else alert("Error occurred creating a product");
      });
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    } else {
      if (localStorage.getItem("role") != "Seller") {
        redirectVar = <Redirect to="/login" />;
      }
    }

    let sellerProducts = this.state.sellerProducts.map((sellerProduct) => {
      let imagesHTML;

      if (sellerProduct.productImages.length === 0) {
        return (
          <div>
            <div className="image">
              <img
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="image">
              <img
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="image">
              <img
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="image">
              <img
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="image">
              <img
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        );
      } else {
        //use this imagesHTML instead of ****hardcoding images****
        imagesHTML = sellerProduct.productImages.map((image) => {
          return (
            <div className="image">
              <img src={image} style={{ maxWidth: "100%" }} />
            </div>
          );
        });
      }

      return (
        <div className="col-md-3" style={{ margin: 5 }}>
          <div class="ui card">
            {/* <div class="image"> */}
            <div className="row" style={{ margin: 10 }}>
              <div className="col-md-1" style={{ paddingTop: "50px" }}>
                <a
                  className="prev"
                  onClick={this.scroll.bind(null, -1, sellerProduct._id)}
                >
                  &#10094;
                </a>
              </div>
              <div className="col-md-8">
                <div className="image-container" id={sellerProduct._id}>
                  {/* ****hardcoding images****   you can delete from here to */}
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-1" style={{ paddingTop: "50px" }}>
                <a
                  className="next"
                  onClick={this.scroll.bind(null, 1, sellerProduct._id)}
                >
                  &#10095;
                </a>
              </div>
            </div>
            {/* </div> */}
            <div class="content">
              {/* <div class="row"> */}
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
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                {sellerProduct.productDesc}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                ${sellerProduct.price}
              </div>
              {/* </div> */}
            </div>
            <hr style={{ height: "2px", backgroundColor: "gray" }}></hr>
            <div class="extra content">
              <a href="#" style={{ fontSize: "15" }}>
                {/* <i aria-hidden="true" class="user icon"></i> */}
                View Product
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner1">
            <div className="container">
              <div className="row2">
                <div className="panel panel-primary">
                  <div className="panel-body">
                    <div className="form-group">
                      <h3 style={{ float: "center" }}>Add Product</h3>
                    </div>
                    <Form>
                      <div className="form-group">
                        <strong>Product Name</strong>
                        <input
                          name="productName"
                          type="text"
                          maxlength="50"
                          className="form-control"
                          onChange={(e) =>
                            this.setState({
                              productName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <strong>Product Description</strong>
                        <input
                          name="productDesc"
                          type="text"
                          maxlength="100"
                          className="form-control"
                          onChange={(e) =>
                            this.setState({
                              productDesc: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <strong>Price</strong>
                        <input
                          name="price"
                          type="text"
                          maxlength="100"
                          className="form-control"
                          onChange={(e) =>
                            this.setState({
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <strong>Category</strong>
                        <select
                          placeholder="Select Category"
                          class="form-control"
                          name="category"
                          onChange={(e) => this.setCategory(e)}
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
                      <div style={{ paddingTop: "12px" }}>
                        <div className="form-group">
                          <strong>Image 1</strong>
                          <input
                            type="file"
                            name="user_image"
                            accept="image/*"
                            className="form-control"
                            aria-label="Image"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.handleImageChange(e, 0)}
                          />
                        </div>
                        <div className="form-group">
                          <strong>Image 2</strong>
                          <input
                            type="file"
                            name="user_image"
                            accept="image/*"
                            className="form-control"
                            aria-label="Image"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.handleImageChange(e, 1)}
                          />
                        </div>
                        <div className="form-group">
                          <strong>Image 3</strong>
                          <input
                            type="file"
                            name="user_image"
                            accept="image/*"
                            className="form-control"
                            aria-label="Image"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.handleImageChange(e, 2)}
                          />
                        </div>
                        <div className="form-group">
                          <strong>Image 4</strong>
                          <input
                            type="file"
                            name="user_image"
                            accept="image/*"
                            className="form-control"
                            aria-label="Image"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.handleImageChange(e, 3)}
                          />
                        </div>
                        <div className="form-group">
                          <strong>Image 5</strong>
                          <input
                            type="file"
                            name="user_image"
                            accept="image/*"
                            className="form-control"
                            aria-label="Image"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.handleImageChange(e, 4)}
                          />
                        </div>
                        <Button
                          variant="warning"
                          size="lg"
                          block
                          onClick={(event) => this.addProduct(event)}
                        >
                          Add Product
                        </Button>
                      </div>
                      <p className="form-group">
                        By clicking here you are adding a product to{" "}
                        <a href="#">Amazon</a> so that customers can buy
                      </p>
                      <div
                        className="form-group"
                        style={{ paddingTop: "12px" }}
                      >
                        <Button
                          variant="warning"
                          size="lg"
                          block
                          onClick={(event) => this.viewAllSellerProducts(event)}
                        >
                          View All Products
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {redirectVar}
          {sellerProducts}
        </div>
      </div>
    );
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
