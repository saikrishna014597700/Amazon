import React, { Component } from "react";
import axios from "axios";
import "./cart.css";
import { Redirect } from "react-router";

const productImage = require("../../utils/product.jpg");
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default class extends Component {
  constructor() {
    super();
    this.state = {
      userId: 22,
      productDetails: [],
      saveForLaterProducts: [],
      cartPrice: 0,
    };
  }

  async componentDidMount() {
    // this.getAllDetails();
    var id = localStorage.getItem("id");
    if(id)
    {
      console.log("in this id=>"+id);
      this.setState({
        userId : id
      })
    }
    sleep(100).then(() => {
      this.getAllDetails();
    });
  }

  async getAllDetails() {
    await axios
      .post("http://localhost:3001/api/cart/getCompleteCart/", {
        userId: this.state.userId,
      })
      .then((response) => {
        let finalPrice = 0;
        let products = [];
        if (response.status == 200) {
          console.log("response from cart => " + JSON.stringify(response));
          if (response.data.length != 0) {
            response.data.forEach((product) => {
              let productId = product.product_id;

              axios
                .get(
                  "http://localhost:3001/api/product/getProductDetails/?productId=" +
                    productId
                )
                .then(async (res) => {
                  console.log(
                    "response for product details=>" + JSON.stringify(res)
                  );
                  // let products = this.state.productDetails;

                  res.data[0].quantity = product.quantity;
                  products.push(res.data[0]);
                  let price = parseInt(res.data[0].price, 10);

                  console.log("price==>" + product.price);
                  finalPrice = finalPrice + (price*product.quantity);
                  this.setState({
                    productDetails: products,
                    cartPrice: finalPrice,
                  });
                });
            });
          } else {
            this.setState({
              productDetails: products,
              cartPrice: finalPrice,
            });
          }
        }
      });
    await axios
      .post("http://localhost:3001/api/cart/getSaveForLater/", {
        userId: this.state.userId,
      })
      .then((response) => {
        let products = [];
        if (response.status == 200) {
          console.log("response from cart => " + JSON.stringify(response));
          if (response.data.length != 0) {
            response.data.forEach((product) => {
              let productId = product.product_id;

              axios
                .get(
                  "http://localhost:3001/api/product/getProductDetails/?productId=" +
                    productId
                )
                .then(async (res) => {
                  console.log(
                    "response for product details=>" + JSON.stringify(res)
                  );
                  // let products = this.state.saveForLaterProducts;

                  products.push(res.data[0]);
                  this.setState({
                    saveForLaterProducts: products,
                  });
                });
            });
          } else {
            this.setState({
              saveForLaterProducts: products,
            });
          }
        }
      });
  }

  async saveForLater(productsave) {
    console.log("inside save for later method=>" + JSON.stringify(productsave));
    let payload = {
      userId: this.state.userId,
      productId: productsave._id,
    };
    console.log("in save for later payload=>" + JSON.stringify(payload));
    let isProductPresent = false;

    await axios
      .post("http://localhost:3001/api/cart/getSaveForLater/", payload)
      .then((res) => {
        console.log("in get save on click=>", JSON.stringify(res));
        if (res.data.length != 0) {
          res.data.forEach((product) => {
            if (product._id == productsave.product_id) {
              isProductPresent = true;
            }
          });
        }
      });
    console.log(isProductPresent);
    if (isProductPresent) {
      await axios
        .post("http://localhost:3001/api/cart/deleteFromCart/", payload)
        .then((res) => {
          if (res) {
            console.log("response in delete from cart =>", JSON.stringify(res));
          }
        });
      // this.getAllDetails();
      sleep(100).then(() => {
        this.getAllDetails();
      });
    } else {
      await axios
        .post("http://localhost:3001/api/cart/postSaveForLater/", payload)
        .then((res) => {
          if (res) {
            console.log(
              "response in add to save for later =>",
              JSON.stringify(res)
            );
          }
        });
      await axios
        .post("http://localhost:3001/api/cart/deleteFromCart/", payload)
        .then((res) => {
          if (res) {
            console.log("response in delete from cart =>", JSON.stringify(res));
          }
        });
      console.log("after all save for later transactions");
      sleep(100).then(() => {
        this.getAllDetails();
      });
    }
  }

  deleteFromCart(product) {
    console.log("in delete from product=>" + JSON.stringify(product));
    axios
      .post("http://localhost:3001/api/cart/deleteFromCart/", {
        userId: this.state.userId,
        productId: product._id,
      })
      .then((response) => {
        if (response.status == 200) {
          // this.getAllDetails();
          sleep(100).then(() => {
            this.getAllDetails();
          });
        }
      });
  }
  goToCart = (event, pid, orderId) => {
    this.setState({ redirect: `/selectAddress/` });
  };

  addToCart = async (product) => {
    console.log("inside add to cart method");
    let payload = {
      userId: this.state.userId,
      productId: product._id,
      quantity: 1,
    };
    await axios
      .post("http://localhost:3001/api/cart/addToCart/", payload)
      .then((res) => {
        if (res) {
          console.log("response in add to cart =>", JSON.stringify(res));
        }
      });
    await axios
      .post("http://localhost:3001/api/cart/deleteSaveForLater/", payload)
      .then((res) => {});
    sleep(100).then(() => {
      this.getAllDetails();
    });
  };

  deleteSaveForLater = async (product)=>{
    let payload = {
      userId: this.state.userId,
      productId: product._id,
      quantity: 1,
    }
    await axios
      .post("http://localhost:3001/api/cart/deleteSaveForLater/", payload)
      .then((res) => {});
    sleep(100).then(() => {
      this.getAllDetails();
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let productsDiv = this.state.productDetails.map((product) => {
      return (
        <div className="row">
          <hr style={{ width: "850px", marginLeft: "-18px" }}></hr>
          <table style={{ width: "850px", height: "150px" }}>
            <tr>
              <td style={{ width: "10%" }}>
                <input type="checkbox"></input>
              </td>
              <td style={{ width: "20%" }}>
                <img
                  src={productImage}
                  style={{ width: "100%", height: "150px", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ selectedImage: productImage });
                  }}
                ></img>
              </td>
              <td style={{ width: "60%" }}>
                <div className="row">
                  <a href="#">{product.productName}</a>
                </div>
                <div className="row">
                  qty : {product.quantity}
                  &nbsp;&nbsp;
                  <a href="#" onClick={(e) => this.deleteFromCart(product)}>
                    delete
                  </a>
                  &nbsp;&nbsp;{" "}
                  <a href="#" onClick={(e) => this.saveForLater(product)}>
                    save for later
                  </a>
                </div>
              </td>
              <td style={{ width: "10%" }}>$ {product.price}</td>
            </tr>
          </table>

          <div className="col-md-1" style={{ marginLeft: "-35px" }}></div>
        </div>
      );
    });
    let saveForLaterDiv = this.state.saveForLaterProducts.map((product) => {
      return (
        <div className="row">
          <hr style={{ width: "850px", marginLeft: "-18px" }}></hr>
          <table style={{ width: "850px", height: "150px" }}>
            <tr>
              <td style={{ width: "10%" }}>
                <input type="checkbox"></input>
              </td>
              <td style={{ width: "20%" }}>
                <img
                  src={productImage}
                  style={{ width: "100%", height: "150px", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ selectedImage: productImage });
                  }}
                ></img>
              </td>
              <td style={{ width: "60%" }}>
                <div className="row">
                  <a href="#">{product.productName}</a>
                </div>
                <div className="row">
                  &nbsp;&nbsp;<a href="#" onClick={(e)=>{this.deleteSaveForLater(product)}}>delete</a>
                  &nbsp;&nbsp;{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      this.addToCart(product);
                    }}
                  >
                    move to cart
                  </a>
                </div>
              </td>
              <td style={{ width: "10%" }}>$ {product.price}</td>
            </tr>
          </table>

          <div className="col-md-1" style={{ marginLeft: "-35px" }}></div>
        </div>
      );
    });
    let checkoutOptions = (
      <div style={{ height: "650px", width: "80%" }}>
        <div
          className="card"
          style={{
            alignItems: "center",
            marginLeft: "40px",
            marginRight: "30px",
            padding: "0px",
            background: "#f6f0f6",
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "0px",
              paddingTop: "10px",
              width: "210px",
              margin: "0px",
            }}
          >
            <div className="row">
              <div className="col-sm" style={{ width: "100%" }}>
                <div className="row" style={{ fontSize: "17px" }}>
                  Subtotal ({this.state.productDetails.length} item) : &nbsp;
                  <div style={{ color: "#b05753" }}>
                    ${this.state.cartPrice}
                  </div>
                </div>
                <div className="row">
                  <input type="checkbox" style={{ marginTop: "4px" }}></input>
                  &nbsp;
                  <div style={{ fontSize: "14px" }}>
                    This item contains gift
                  </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <button
                    className="AddCart"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      height: "30px",
                    }}
                    onClick={this.goToCart}
                  >
                    proceed to checkout
                  </button>
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div className="row" style={{ marginTop: "40px", marginLeft: "30px" }}>
        <div className="col-md-8">
          <table style={{ width: "850px" }}>
            <tr>
              <td>
                <div className="row cartheading">Shopping Cart</div>
              </td>
            </tr>
            <tr>
              <td style={{ width: "90%", fontSize: "13px" }}>
                &nbsp;
                <a href="#" style={{ margin: "-18px" }}>
                  Deselect all items
                </a>
              </td>
              <td>price</td>
            </tr>
          </table>

          <div className="row" style={{ marginLeft: "5px" }}>
            <div className="col-md-12">{productsDiv} </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-9"></div>
            <div className="col-md-3"> Subtotal : $ {this.state.cartPrice}</div>
          </div>
          <br></br>
          <table style={{ width: "850px" }}>
            <tr>
              <td>
                <div className="row cartheading">Save for later</div>
              </td>
            </tr>
          </table>
          <div className="row" style={{ marginLeft: "5px" }}>
            <div className="col-md-12">{saveForLaterDiv} </div>
          </div>
        </div>
        <div className="col-md-4">{checkoutOptions}</div>
      </div>
    );
  }
}
