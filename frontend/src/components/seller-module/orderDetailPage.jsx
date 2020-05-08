import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./seller.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "./shoe.jpg";
import { Link } from "react-router-dom";

export default class OrderDetailsPage extends Component {
  constructor() {
    super();
    this.state = {
      sellerOrder: [],
      redirect: null,
    };
  }

  async componentDidMount() {
    var orderId = this.props.match.params.id;
    console.log("orderId::", orderId);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(
        `http://localhost:3001/api/seller/getParticularOrderDetails/${orderId}`
      )
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
          sellerOrder: this.state.sellerOrder.concat(response.data),
        });
        console.log("Pro are::", this.state.sellerOrders);
      });
  }

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let order = this.state.sellerOrder.map((order) => {
      console.log("seller", order);

      return (
        <div class="card text-center">
          <div class="card-header">
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <th>ORDER ON</th>
                <th>ORDER #</th>
              </tr>
              <tr>
                <td>{order.createDate}</td>
                <td>{order._id}</td>
              </tr>
              <br />
              <br />
            </table>
            <div class="card">
              <br />
              <br />
              <table style={{ width: "100%" }}>
                <tr>
                  <th>Shipping Address</th>
                  <th>Payment Method</th>
                  <th>Order Summary</th>
                  <th>Billing Address</th>
                </tr>
                <br />
                <tr>
                  <td>{order.shippingAddress.street}</td>
                  <td>{order.paymentDetails}</td>
                  <td>{order.transactionAmount}</td>
                  <td>{order.billingAddress.street}</td>
                </tr>
                <tr>
                  <td>{order.shippingAddress.city}</td>
                  <td></td>
                  <td></td>
                  <td>{order.billingAddress.city}</td>
                </tr>
                <tr>
                  <td>{order.shippingAddress.state}</td>
                  <td></td>
                  <td></td>
                  <td>{order.billingAddress.state}</td>
                </tr>
                <tr>
                  <td>{order.shippingAddress.zip_code}</td>
                  <td></td>
                  <td></td>
                  <td>{order.billingAddress.zip_code}</td>
                </tr>
                <br />
                <br />
              </table>
            </div>
            <br />
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner3">
            <h4>Order Details</h4>
            <br />
            {order}
          </div>
        </div>
      </div>
    );
  }
}
