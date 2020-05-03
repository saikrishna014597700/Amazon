import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";

export default class viewAllSellerProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productDesc: "",
      price: "",
      category: "",
      sellerProducts: [],
      redirect: null,
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

  editProductDetails = (event, id) => {
    this.setState({ redirect: `/editProductDetails/${id}` });
  };

  async componentDidMount() {
    const payload = {
      sellerId: localStorage.getItem("id"),
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

  async viewAllSellerProducts(event) {
    const payload = {
      sellerId: localStorage.getItem("id"),
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
    let redirectVar = null;
    if(!localStorage.getItem("id")){
        redirectVar = <Redirect to= "/login"/>
    }else{
      if(localStorage.getItem("role") != "Seller"){
        redirectVar = <Redirect to= "/login"/>
      }
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
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
              <button
                class="btn success"
                onClick={(event) =>
                  this.editProductDetails(event, sellerProduct._id)
                }
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      );
    });
    return <div className="row">
      {redirectVar}
      {sellerProducts}</div>;
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
