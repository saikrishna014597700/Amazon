import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";

export default class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDesc: "",
      price: "",
      category: "",
      sellerProducts: [],
    };
    this.addProduct = this.addProduct.bind(this);
    this.viewAllSellerProducts = this.viewAllSellerProducts.bind(this);
    this.scroll = this.scroll.bind(this);
  }
  scroll(direction, id) {
    console.log("id here=>" + id);
    let far = ($("#" + id).width() + 25) * direction;
    let pos = $("#" + id).scrollLeft() + far;
    $("#" + id).animate({ scrollLeft: pos }, 100);
  }
  our;

  async viewAllSellerProducts(event) {
    const payload = {
      sellerId: "123",
    };
    axios
      .post("http://localhost:3001/api/product/viewAllSellerProducts/", payload)
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
          sellerProducts: response.data,
        });
        console.log("Pro are::", this.state.sellerProducts);
      });
  }

  async addProduct(event) {
    const payload = {
      productName: this.state.productName,
      productDesc: this.state.productDesc,
      price: this.state.price,
      category: this.state.category,
    };
    axios
      .post("http://localhost:3001/api/product/addProduct/", payload)
      .then((response) => {});
  }

  render() {
    let sellerProducts = this.state.sellerProducts.map((sellerProduct) => {
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
                <div className="row" style={{fontWeight:"bold",fontSize:"20",margin:10,textAlign:"center"}}>
                  {sellerProduct.productName}
                </div>
                <div className="row" style={{margin:10,textAlign:"center"}}>
                  {sellerProduct.productDesc}
                </div>
                <div className="row" style={{margin:10,textAlign:"center"}}>
                  ${sellerProduct.price}
                </div>
              {/* </div> */}
            </div>
            <hr style={{height:"2px",backgroundColor:"gray"}}></hr>
            <div class="extra content">
              <a href="#" style={{fontSize:"15"}}>
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
        <div className="container">
          <div className="row">
            <img
              src={require("../../utils/logo.jpg")}
              style={{ float: "center", height: "100px", width: "200px" }}
              alt="hs"
            />

            <div className="panel panel-primary">
              <div className="panel-body">
                <Form>
                  <div className="form-group">
                    <h3>Add Product</h3>
                  </div>
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
                      defaultValue=""
                      class="form-control"
                      name="category"
                      onChange={(e) =>
                        this.setState({
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Rentals">Rentals</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ paddingTop: "12px" }}>
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
                  <div className="form-group" style={{ paddingTop: "12px" }}>
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
            <div className="row">{sellerProducts}</div>
          </div>
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
