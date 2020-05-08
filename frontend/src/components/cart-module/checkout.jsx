import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

const productImage = require("../../utils/product.jpg");
export default class checkout extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      selectedAddress: {},
      selectedCard: {},
      productDetails: [],
      cartPrice: 0,
    };
    this.refsArray = [];
    this.textBoxRefsArray = [];
  }

  async componentDidMount() {
    await this.setState({
      userId: localStorage.getItem("id"),
      selectedAddress: JSON.parse(localStorage.getItem("selectedAddress")),
      selectedCard: JSON.parse(localStorage.getItem("selectedCard")),
    });
    this.getCart();

    console.log("This state" + JSON.stringify(this.state));
  }

  async getCart() {
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
                  res.data[0].quantity = product.quantity;
                  res.data[0].status = "Ordered";
                  res.data[0].productId = productId;
                  products.push(res.data[0]);
                  let price = parseInt(res.data[0].price, 10);
                  console.log("price==>" + product.price);
                  finalPrice = finalPrice + price * product.quantity;
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
  }

  async checkGift(e, i, product) {
    if (this.refsArray[i].checked) {
      this.textBoxRefsArray[i].style.display = "block";
      let pros = this.state.productDetails;
      let cartPrice = 0;
      pros.forEach((prod) => {
        if (prod._id == product._id) {
          let isGift = {
            isGift: true,
          };
          prod.gift = isGift;
          cartPrice = parseInt(this.state.cartPrice, 10) + 1;
        }
      });
      await this.setState({
        productDetails: pros,
        cartPrice: cartPrice,
      });
    } else {
      this.textBoxRefsArray[i].style.display = "none";
      let pros = this.state.productDetails;
      let cartPrice = 0;
      pros.forEach((prod) => {
        if (prod._id == product._id) {
          let isGift = {
            isGift: false,
            giftMessage: "",
          };
          prod.gift = isGift;
          cartPrice = parseInt(this.state.cartPrice, 10) - 1;
        }
      });
      await this.setState({
        productDetails: pros,
        cartPrice: cartPrice,
      });
    }
  }

  async changeHandlerMessage(e, i, product) {
    let pros = this.state.productDetails;
    pros.forEach((prod) => {
      if (prod._id == product._id) {
        let isGift = {
          isGift: true,
          giftMessage: e.target.value,
        };
        prod.gift = isGift;
      }
    });
    await this.setState({
      productDetails: pros,
    });
  }

  placeOrder = () => {
    console.log("this.state.userId=>" + this.state.userId);
    this.state.selectedAddress.street =
      this.state.selectedAddress.street1 +
      "," +
      this.state.selectedAddress.street2;
    let data = {
      userId: this.state.userId,
      shippingAddress: this.state.selectedAddress,
      billingAddress: this.state.selectedAddress,
      transactionAmount: this.state.cartPrice,
      products: this.state.productDetails,
      gift: { isGift: false },
      paymentDetails: this.state.selectedCard.cardNo,
    };
    axios
      .post("http://localhost:3001/api/cart/saveOrder", data)
      .then(async (response) => {
        if (response.status == 201) {
          console.log("saved successfully" + JSON.stringify(response));
          let orderId = response.data;
          localStorage.removeItem("selectedAddress");
          localStorage.removeItem("selectedCard");
          await axios
            .post("http://localhost:3001/api/cart/deleteCompleteCart", {
              userId: this.state.userId,
            })
            .then((response) => {
              console.log(
                "response from delete complete cart=>" +
                  JSON.stringify(response)
              );
              localStorage.setItem("cartSize", 0);
            });
          
          await this.state.productDetails.forEach(async (product) => {
            let proCat = "";
            await axios
            .get(`http://localhost:3001/api/admin/get-product-categories`)
            .then((res) => {
              console.log("response is::", res);
              res.data.map((category)=>{
                if(category.category==product.category)
                  proCat = category.id
              })
            });
            let payload = {
              productId: product._id,
              orderId: orderId,
              quantity: product.quantity,
              sellerId: product.sellerId,
              price: product.price,
              userId: this.state.userId,
              productName: product.productName,
              categoryId: proCat
            };
            await axios.post(
              "http://localhost:3001/api/cart/saveToMapOrder",
              payload
            );
            await axios.post(
              "http://localhost:3001/api/cart/saveProductAnalytics",
              payload
            );
          });

          await this.setState({ redirect: `/orderDetailPage/${orderId}` });
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let continueDiv = (
      <div>
        <div
          className="card"
          style={{
            alignItems: "center",
            padding: "0px",
            background: "#f6f0f6",
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "0px",
              margin: "25px",
            }}
          >
            <div className="row" style={{ margin: "10px" }}>
              <button
                className="AddCart"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  height: "30px",
                }}
                onClick={this.placeOrder}
              >
                Place your order and pay
              </button>
            </div>
            <div
              className="row"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                alignContent: "center",
              }}
            >
              <div className="col-md-3"></div>Order total: ${" "}
              {this.state.cartPrice}
            </div>
          </div>
        </div>
      </div>
    );
    let paymentDetails = (
      <div className="row">
        <div className="col-md-4">
          <div className="row" style={{ fontWeight: "bold" }}>
            Shipping Address
          </div>
          <div className="row">{this.state.selectedAddress.name}</div>
          <div className="row">
            {this.state.selectedAddress.street1},
            {this.state.selectedAddress.street2}
          </div>
          <div className="row">{this.state.selectedAddress.state}</div>
          <div className="row">
            {this.state.selectedAddress.country},
            {this.state.selectedAddress.zip_code}
          </div>
          <div className="row">Phone: {this.state.selectedAddress.phoneNo}</div>
        </div>
        <div className="col-md-4">
          <div className="row" style={{ fontWeight: "bold" }}>
            Payment Method
          </div>
          <div className="row">{this.state.selectedCard.cardNo}</div>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
    let productsDiv = this.state.productDetails.map((product, i) => {
      let logoPath;
      if(product.productImages.length === 0){
        logoPath = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
      }else{
        logoPath = product.productImages[0]
      }
      return (
        <div className="row">
          <hr style={{ width: "850px", marginLeft: "18px" }}></hr>
          <table
            style={{ width: "850px", height: "150px", marginLeft: "18px" }}
          >
            <tr>
              <td style={{ width: "20%" }}>
                <img
                  src={logoPath}
                  style={{ width: "150px", height: "150px", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ selectedImage: productImage });
                  }}
                ></img>
              </td>
              <td style={{ width: "60%" }}>
                <div className="row">
                  <a href="#">{product.productName}</a>
                </div>
                <div className="row">{product.productDesc}</div>
                <div className="row">$ {product.price}</div>
                <div className="row">
                  <input
                    type="checkbox"
                    onChange={(e) => this.checkGift(e, i, product)}
                    ref={(ref) => (this.refsArray[i] = ref)}
                  ></input>
                  &nbsp;This is a gift
                </div>
                <div
                  className="row"
                  ref={(ref) => (this.textBoxRefsArray[i] = ref)}
                  style={{ display: "none" }}
                >
                  Gift Message : &nbsp;
                  <input
                    type="text"
                    onChange={(e) => this.changeHandlerMessage(e, i, product)}
                  ></input>
                </div>
              </td>
              <td style={{ width: "10%" }}></td>
            </tr>
          </table>

          <div className="col-md-1" style={{ marginLeft: "-35px" }}></div>
        </div>
      );
    });
    return (
      <div className="row" style={{ margin: "100px", marginTop: "60px" }}>
        <div className="row shippingSelect" style={{ width: "850px" }}>
          Review your order
        </div>
        <br></br>

        <div
          className="col-md-9"
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#efefef",
            marginTop: "50px",
            marginLeft: "-20px",
          }}
        >
          {paymentDetails}
        </div>

        <div className="col-md-3" style={{ marginTop: "50px" }}>
          {continueDiv}
        </div>

        <div
          className="col-md-9"
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#efefef",
            marginTop: "50px",
            marginLeft: "-20px",
          }}
        >
          {productsDiv}
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}
