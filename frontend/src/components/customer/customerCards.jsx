import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
//import "../product-module/product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import "./style.css";
import { Redirect } from "react-router";
import Env from "../../helpers/Env";

export default class customerCards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async saveCard(id) {
    var cards = this.state.cards;

    let isCardExist = false;
    var selectedCard = {};
    for (var card of cards) {
      console.log("card._id=" + card._id + "");
      if (card._id === id) {
        selectedCard = card;
      }
    }

    for (var card of cards) {
      if (card._id != selectedCard._id && card.cardNo == selectedCard.cardNo) {
        isCardExist = true;
        
      }
    }
    if(isCardExist){
      alert("duplicate card number");
    }
    if (document.forms[id].reportValidity() && !isCardExist) {
      console.log("selectedCard::", selectedCard);
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      await axios
        .post(
          `${Env.host}/api/customerDetails/saveCustomerCards/?userId=` +
            localStorage.getItem("id"),
          selectedCard
        )
        .then((res) => {
          console.log("cards::", res.data);
          this.setState({
            cards: res.data,
          });
        });
    }
  }

  async deleteCard(id) {
    var cards = this.state.cards;

    var selectedCard = {};
    for (var card of cards) {
      if (card._id === id) {
        selectedCard = card;
      }
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .post(
        `${Env.host}/api/customerDetails/deleteCustomerCard/?userId=` +
          localStorage.getItem("id"),
        selectedCard
      )
      .then((res) => {
        console.log("cards::", res.data);
        this.setState({
          cards: res.data,
        });
      });
  }

  addCard() {
    var newCard = {
      _id: "-1",
      cardNo: "",
      nameOnCard: "",
      cvv: "",
      expirationDate: "",
      editFlag: true,
    };

    this.setState({
      cards: this.state.cards.concat(newCard),
    });
  }

  handleChange(e, id, type) {
    var cards = this.state.cards;

    for (var card of cards) {
      if (card._id === id) {
        card[type] = e.target.value;
      }
    }
    console.log(this.state.cards);
  }
  async componentDidMount() {
    var data = localStorage.getItem("id");

    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    await axios
      .get(
        `${Env.host}/api/customerDetails/getCustomerCards/?userId=` +
          data
      )
      .then((res) => {
        console.log("cards::", res.data);
        this.setState({
          cards: res.data,
        });
      });
  }

  async cancelCard() {
    var data = localStorage.getItem("id");
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .get(
        `${Env.host}/api/customerDetails/getCustomerCards/?userId=` +
          data
      )
      .then((res) => {
        console.log("cards::", res.data);
        this.setState({
          cards: res.data,
        });
      });
  }

  editCard(id) {
    var cards = this.state.cards;

    for (var card of cards) {
      if (card._id === id) {
        card.editFlag = true;
      }
    }

    this.setState({
      card: cards,
    });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    } else if (
      localStorage.getItem("id") &&
      !(localStorage.getItem("role") === "Customer")
    ) {
      redirectVar = <Redirect to="/login" />;
    }

    let customerCards = this.state.cards.map((card) => {
      return (
        <div key={card._id}>
          <div className="card">
            <div className="card-header">
              <p>
                Card Num: {card.cardNo}
                <button
                  className="Amazon"
                  onClick={(e) => this.deleteCard(card._id)}
                  style={{ float: "right", width: "75px" }}
                >
                  {" "}
                  Delete
                </button>
                <button
                  className="Amazon"
                  onClick={(e) => this.editCard(card._id)}
                  style={{ float: "right", marginRight: "5px", width: "50px" }}
                >
                  {" "}
                  Edit
                </button>
              </p>
            </div>
            <div className="card-body" style={{ marginLeft: "5px" }}>
              <form id={card._id}>
                <div className="row">
                  <div className="col-sm">
                    <p style={{ marginBottom: "0px", marginTop: "3px" }}>
                      Card Number
                    </p>
                    <div className="form-group">
                      <input
                        style={{ width: "90%" }}
                        pattern="[\d]{16}"
                        required
                        type="text"
                        defaultValue={card.cardNo}
                        disabled={!card.editFlag}
                        onChange={(e) =>
                          this.handleChange(e, card._id, "cardNo")
                        }
                      />
                    </div>
                    <p style={{ marginBottom: "0px", marginTop: "3px" }}>
                      Name on Card{" "}
                    </p>
                    <div className="form-group">
                      <input
                        style={{ width: "90%" }}
                        type="text"
                        defaultValue={card.nameOnCard}
                        disabled={!card.editFlag}
                        onChange={(e) =>
                          this.handleChange(e, card._id, "nameOnCard")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <p style={{ marginBottom: "0px", marginTop: "3px" }}>
                      CVV{" "}
                    </p>
                    <div className="form-group">
                      <input
                        style={{ width: "90%" }}
                        type="text"
                        pattern="[\d]{3}"
                        required
                        defaultValue={card.cvv}
                        disabled={!card.editFlag}
                        onChange={(e) => this.handleChange(e, card._id, "cvv")}
                      />
                    </div>
                    <p style={{ marginBottom: "0px", marginTop: "3px" }}>
                      {" "}
                      Expiry Date{" "}
                    </p>
                    <div className="form-group">
                      <input
                        style={{ width: "90%" }}
                        type="text"
                        pattern="[\d]{4}[\/\.\-]*0[1-9]|1[0-2]"
                        required
                        defaultValue={card.expirationDate}
                        disabled={!card.editFlag}
                        onChange={(e) =>
                          this.handleChange(e, card._id, "expirationDate")
                        }
                      />
                    </div>
                  </div>
                </div>
                <button
                  hidden={!card.editFlag}
                  className="Amazon"
                  onClick={(e) => this.cancelCard()}
                  style={{ float: "right", marginBottom: "5px", width: "60px" }}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  hidden={!card.editFlag}
                  className="Amazon"
                  onClick={(e) => this.saveCard(card._id)}
                  style={{
                    float: "right",
                    marginBottom: "5px",
                    marginRight: "5px",
                    width: "50px",
                  }}
                >
                  {" "}
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div style={{ marginTop: "50px" }}>
        {redirectVar}
        <h4>Your payment options</h4>
        <div className="auth-wrapper">
          <div className="auth-innerStyle">
            {customerCards}

            <button
              className="Amazon"
              style={{ width: "100px" }}
              onClick={(e) => this.addCard()}
            >
              {" "}
              Add Card
            </button>
          </div>
        </div>
      </div>
    );
  }
}
