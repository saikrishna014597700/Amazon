import React, { Component } from "react";
import axios from "axios";
import "./cart.css";
const productImage = require("../../utils/product.jpg");
export default class extends Component {
  constructor() {
    super();
    this.state = {
      userId: 3,
      productDetails: [],
      cartPrice:0
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:3001/api/cart/getCompleteCart/", {
        userId: this.state.userId,
      })
      .then((response) => {
          let finalPrice = 0;
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
                  let products = this.state.productDetails;
                  res.data[0].quantity = product.quantity;
                  products.push(res.data[0]);
                  let price = parseInt(res.data[0].price,10);
                  console.log("price==>"+product.price);
                  finalPrice = finalPrice+price;
                  await this.setState({
                    productDetails: products,
                    cartPrice:finalPrice
                  });
                });
            });
          }
        }
      });
  }

  render() {
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
                  &nbsp;&nbsp;<a href="#">delete</a>
                  &nbsp;&nbsp; <a href="#">save for later</a>
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
      <div style={{ height: "650px",width:"80%" }}>
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
                  <div style={{color: "#b05753"}}>${this.state.cartPrice}</div>
                </div>
                <div className="row" >
                    <input type="checkbox" style={{marginTop:"4px"}}></input>
                    &nbsp;
                    <div style={{fontSize:"14px"}}>This item contains gift</div>
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
                    onClick={this.addToCart}
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
        </div>
        <div className="col-md-4">{checkoutOptions}</div>
      </div>
    );
  }
}
