import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

export default class selectCard extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      cards: [],
      selectedAddress: {},
      productDetails: [],
      selectedCard: {},
      cartPrice: 0,
    };
    this.radioRefsArray = [];
    this.textBoxRefsArray = [];
  }
  async componentDidMount() {
    let userId = localStorage.getItem("id");
    let selectedAddress = localStorage.getItem("selectedAddress");
    await this.setState({
      userId: userId,
      selectedAddress: selectedAddress,
    });
    this.getCartDetails();
    this.getUserCards();
  }

  async getUserCards() {
    await axios
      .get(
        "http://localhost:3001/api/customerDetails/getCustomerCards/?userId=" +
          this.state.userId
      )
      .then((res) => {
        this.setState({
          cards: res.data,
        });
      });
  }

  async getCartDetails() {
    await axios
      .post("http://localhost:3001/api/cart/getCompleteCart", {
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
                  products.push(res.data[0]);
                  let price = parseInt(res.data[0].price, 10);
                  console.log("price==>" + product.price);
                  finalPrice = finalPrice + price;
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

  changeHandler(event, name) {
    console.log("=====?" + event.target.value);
    let add = this.state.selectedCard;
    add[name] = event.target.value;
    this.setState({
      selectedCard: add,
    });
  }
  selectCard = async (card) => {
    await this.setState({
      selectedCard: card,
    });
    localStorage.setItem("selectedCard", JSON.stringify(card));
    console.log("localsss=>" + localStorage.getItem("selectedCard"));
    console.log("this.state.card=>" + JSON.stringify(this.state.selectedCard));
    await this.setState({ redirect: `/checkout` });
  };

  addCard = async (e) =>{
    var payload = {
      nameOnCard : this.state.selectedCard.name,
      cardNo : this.state.selectedCard.cardNo,
      expirationDate : this.state.selectedCard.expDate,
      cvv : this.state.selectedCard.cvv
    }

    await axios.post("http://localhost:3001/api/customerDetails/saveCustomerCards/?userId=" + localStorage.getItem("id"),payload)
    .then(async (response)=>{
      if(response.status == 201)
      await this.setState({ redirect: `/checkout` });
    })
  }

  async checkRadio(e, i, card) {
    console.log("yo here");
    var j;
    for (j = 0; j < this.radioRefsArray.length; j++) {
      this.radioRefsArray[j].checked = false;
    }
    this.radioRefsArray[i].checked = true;
    await this.setState({
      selectedCard: card,
    });

    for (j = 0; j < this.textBoxRefsArray.length; j++) {
      this.textBoxRefsArray[j].style.display = "none";
    }
    this.textBoxRefsArray[i].style.display = "block";
    localStorage.setItem("selectedCard", JSON.stringify(card));
  }

  goToCheckout = async () => {
    await this.setState({ redirect: `/checkout` });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let cardsDiv = this.state.cards?.map((card, i) => {
      return (
        <div className="row" style={{ margin: "10px" }}>
          <div className="col-md-1">
            <input
              type="radio"
              ref={(ref) => (this.radioRefsArray[i] = ref)}
              onClick={(e) => {
                this.checkRadio(e, i, card);
              }}
              value={card}
            ></input>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8">Card Number {card.cardNo}</div>

              <div
                className="col-md-4"
                style={{ display: "none" }}
                ref={(ref) => (this.textBoxRefsArray[i] = ref)}
              >
                CVV:{" "}
                <input
                  type="text"
                  minLength="3"
                  maxLength="3"
                  style={{ width: "50%" }}
                ></input>
              </div>
            </div>
          </div>
          <div className="col-md-2">{card.nameOnCard}</div>
          <div className="col-md-2">{card.expirationDate}</div>
        </div>
      );
    });
    let continueDiv = (
      <div>
        <div
          className="card"
          style={{
            alignItems: "center",
            // marginLeft: "40px",
            // marginRight: "30px",
            padding: "0px",
            background: "#f6f0f6",
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "0px",
              // paddingTop: "10px",
              // width: "100%",
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
                onClick={this.goToCheckout}
              >
                continue
              </button>
            </div>
            <div className="row">
              You can review this order before it's final.
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="row" style={{ margin: "100px", marginTop: "60px" }}>
        <div className="row shippingSelect">Select a addCardment method</div>
        <br></br>

        <br></br>

        <div
          className="col-md-9"
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#efefef",
          }}
        >
          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-1"></div>
            <div className="col-md-6" style={{ fontWeight: "bold" }}>
              Your saved credit and debit cards
            </div>
            <div className="col-md-2">Name on card</div>
            <div className="col-md-2">Expires on</div>
          </div>
          <hr style={{ width: "800px", margin: "10px" }}></hr>
          {cardsDiv}
        </div>
        <div className="col-md-3">{continueDiv}</div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-8">
              <div className="row addAddressHeading">Add a new Card</div>
              <br></br>
              <div className="row">Name on card:</div>
              <div className="row">
                <input
                  type="text"
                  style={{
                    width: "50%",
                    margin: " 8px 0",
                    display: "inline-block",
                    border: "1px solid #ccc !important",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => this.changeHandler(e, "name")}
                ></input>
              </div>
              <div className="row">Card Number:</div>
              <div className="row">
                <input
                  type="text"
                  style={{
                    width: "50%",
                    margin: " 8px 0",
                    display: "inline-block",
                    border: "1px solid #ccc !important",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => this.changeHandler(e, "cardNo")}
                ></input>
              </div>
              <div className="row">CVV:</div>
              <div className="row">
                <input
                  type="text"
                  style={{
                    width: "50%",
                    margin: " 8px 0",
                    display: "inline-block",
                    border: "1px solid #ccc !important",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => this.changeHandler(e, "cvv")}
                ></input>
              </div>
              <div className="row">Expiry Date:</div>
              <div className="row">
                <input
                  type="text"
                  style={{
                    width: "50%",
                    margin: " 8px 0",
                    display: "inline-block",
                    border: "1px solid #ccc !important",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => this.changeHandler(e, "expDate")}
                ></input>
              </div>
              <br></br>
              <div className="row">
                <button
                  className="Amazon"
                  onClick={(e) => this.addCard(e)}
                  style={{ height: "30px", padding: "0px", width: "200px" }}
                >
                  Pay with this card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
