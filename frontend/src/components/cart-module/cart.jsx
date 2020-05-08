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
    this.refsArray = [];
    this.textBoxRefsArray = [];
  }

  async componentDidMount() {
    var id = localStorage.getItem("id");
    if (id) {
      console.log("in this id=>" + id);
      this.setState({
        userId: id,
      });
    }
    sleep(100).then(() => {
      this.getAllDetails();
    });
  }

  quantityChangeHandler = async (product, e) => {
    var pros = this.state.productDetails;
    let quantity = e.target.value;
    let cartSize = parseInt(localStorage.getItem("cartSize"), 10);
    pros.forEach((productDetail) => {
      if (productDetail._id == product._id) {
        cartSize = cartSize - productDetail.quantity;
        productDetail.quantity = quantity;
        cartSize = cartSize + parseInt(quantity, 10);
        localStorage.setItem("cartSize", cartSize);
      }
    });
    await this.setState({
      productDetails: pros,
    });
    let payload = {
      userId: this.state.userId,
      productId: product._id,
      quantity: quantity,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem('token');
    await axios
      .post("http://localhost:3001/api/cart/updateCart/", payload)
      .then((res) => {
        if (res) {
          console.log("response in add to cart =>", JSON.stringify(res));
        }
      });

    this.getAllDetails();
  };

  async getAllDetails() {
    axios.defaults.headers.common["authorization"] = localStorage.getItem('token');
    await axios
      .post("http://localhost:3001/api/cart/getCompleteCart/", {
        userId: this.state.userId,
      })
      .then((response) => {
        let finalPrice = 0;
        let products = [];
        let cartSize = 0;
        if (response.status == 200) {
          if (response.data.length != 0) {
            localStorage.setItem("cartSize", cartSize);
            response.data.forEach((product) => {
              let productId = product.product_id;
              cartSize = cartSize + parseInt(product.quantity, 10);
              axios
                .get(
                  "http://localhost:3001/api/product/getProductDetails/?productId=" +
                    productId
                )
                .then(async (res) => {
                  res.data[0].quantity = product.quantity;
                  
                  let price = parseInt(res.data[0].price, 10);
                  finalPrice = finalPrice + price * product.quantity;
                  console.log("in response data=>",res.data[0].sellerId);
                  await axios.get(`http://localhost:3001/api/seller/profile/${res.data[0].sellerId}`)
                  .then((seller)=>{
                    res.data[0].sellerName = seller.data.sellerName
                    res.data[0].sellerId = seller.data._id
                  })
                  products.push(res.data[0]);
                  this.setState({
                    productDetails: products,
                    cartPrice: finalPrice,
                  });
                });
            });
            localStorage.setItem("cartSize", cartSize);
          } else {
            this.setState({
              productDetails: products,
              cartPrice: finalPrice,
            });
          }
        }
      });
    this.getSaveForLater();
  }

  async getSaveForLater() {
    await axios
      .post("http://localhost:3001/api/cart/getSaveForLater/", {
        userId: this.state.userId,
      })
      .then((response) => {
        let products = [];
        if (response.status == 200) {
          if (response.data.length != 0) {
            response.data.forEach((product) => {
              let productId = product.product_id;
              axios
                .get(
                  "http://localhost:3001/api/product/getProductDetails/?productId=" +
                    productId
                )
                .then(async (res) => {
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
            let cartSize = localStorage.getItem("cartSize");
            console.log("cartsize in save for later===>" + cartSize);
            localStorage.setItem("cartSize", cartSize - productsave.quantity);
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
            let cartSize = localStorage.getItem("cartSize");
            console.log("cartsize in save for later===>" + cartSize);
            localStorage.setItem("cartSize", cartSize - productsave.quantity);
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
    let cartSize = localStorage.getItem("cartSize");
    localStorage.setItem("cartSize", cartSize - product.quantity);
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
          let cartSize = localStorage.getItem("cartSize");
          localStorage.setItem("cartSize", cartSize);
        }
      });
    await axios
      .post("http://localhost:3001/api/cart/deleteSaveForLater/", payload)
      .then((res) => {});
    sleep(100).then(() => {
      this.getAllDetails();
    });
  };

  deleteSaveForLater = async (product) => {
    let payload = {
      userId: this.state.userId,
      productId: product._id,
      quantity: 1,
    };
    await axios
      .post("http://localhost:3001/api/cart/deleteSaveForLater/", payload)
      .then((res) => {});
    sleep(100).then(() => {
      this.getAllDetails();
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let productsDiv = this.state.productDetails.map((product, i) => {
      let logoPath;
        if(product.productImages.length === 0){
          logoPath = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
        }else{
          logoPath = product.productImages[0]
        }
      return (
        <div className="row">
          <hr style={{ width: "850px", marginLeft: "-18px" }}></hr>
          <table style={{ width: "850px", height: "150px" }}>
            <tr>
             
              <td style={{ width: "20%" }}>
                <img
                  src={logoPath}
                  style={{ width: "150px", height: "150px", cursor: "pointer" }}
                  
                ></img>
              </td>
              <td style={{ width: "70%",marginLeft:"20px" }}>
                <div className="row">
                  <a href={"/sellerProfile/"+product.sellerId}>{product.sellerName}</a>
                </div>
                <div className="row">
                  <a href={"/product/"+product._id}>{product.productName}</a>
                </div>

                <div className="row">
                  qty : &nbsp;
                  <select
                    onChange={(e) => this.quantityChangeHandler(product, e)}
                    style={{ backgroundColor: "#e7eae8", borderRadius: "2px" }}
                    defaultValue={product.quantity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
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
      let logoPath;
      if(product.productImages.length === 0){
        logoPath = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
      }else{
        logoPath = product.productImages[0]
      }
      return (
        <div className="row">
          <hr style={{ width: "850px", marginLeft: "-18px" }}></hr>
          <table style={{ width: "850px", height: "150px" }}>
            <tr>
              <td style={{ width: "20%" }}>
                <img
                  src={logoPath}
                  style={{ width: "150px", height: "150px", cursor: "pointer" }}
                  
                ></img>
              </td>
              <td style={{ width: "70%" ,marginLeft:"20px"}}>
                <div className="row">
                  <a href="/product/:{product._id}">{product.productName}</a>
                </div>
                <div className="row">
                  &nbsp;&nbsp;
                  <a
                    href="#"
                    onClick={(e) => {
                      this.deleteSaveForLater(product);
                    }}
                  >
                    delete
                  </a>
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
