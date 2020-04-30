import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";

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
    };
  }

  async componentDidMount() {
    var productId = this.props.match.params.id;
    axios
      .get(`http://localhost:3001/api/product/getProductDetails/${productId}`)
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
          sellerProducts: this.state.sellerProducts.concat(response.data),
        });
        console.log("Pro are::", this.state.sellerProducts);
      });
  }

  handleReduxChange = (e, id, name) => {
    console.log("Before", id, name, this.state.sellerProductsTest);
    const sellerProduct = this.state.sellerProducts;
    sellerProduct.map((sellerProductt) => {
      if (sellerProductt._id === id) {
        sellerProductt[name] = e.target.value;
      }
      console.log("Id iss", sellerProductt);
      this.setState({
        sellerProductsTest: sellerProductt,
      });
    });
  };

  async editProduct(event) {
    console.log("New pro", this.state.sellerProductsTest);
    const payload = {
      _id: this.props.match.params.id,
      productObj: this.state.sellerProductsTest,
    };
    axios
      .post("http://localhost:3001/api/product/editProduct/", payload)
      .then((response) => {
        console.log("Final res is", response);
        this.setState({
          sellerProducts: response.data,
        });
        alert("Updated successfully");
      });
  }

  async deleteProduct(event) {
    const payload = {
      _id: this.props.match.params.id,
    };
    axios
      .post("http://localhost:3001/api/product/deleteProduct/", payload)
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
                          <option value="Electronics">Electronics</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Rentals">Rentals</option>
                        </select>
                      </div>
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
