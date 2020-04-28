import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./seller.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "./shoe.jpg";
import { Link } from "react-router-dom";

export default class ProductTrackingDetails extends Component {
  constructor() {
    super();
    this.state = {
      sellerOrder: [],
      redirect: null,
      productDetail: [],
    };
  }

  async componentDidMount() {
    var orderId = this.props.match.params.id;
    var patt = new RegExp("productTrackingDetails\\/(\\w+)");
    var res = patt.exec(this.props.match.url);
    console.log("Reg res are::", res[1]);
    if (res[1]) var productId = res[1];
    if (orderId && productId)
      axios
        .get(
          `http://localhost:3001/api/seller/productTrackingDetails/?orderId=${orderId}&productId=${productId}`
        )
        .then((response) => {
          console.log("Pro are::", response.data.products[0].trackingInfo);
          this.setState({
            sellerOrder: this.state.sellerOrder.concat(response.data),
          });
          this.setState({
            productDetail: this.state.productDetail.concat(
              response.data.products[0].trackingInfo
            ),
          });
        });
  }

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let trackingDetails = this.state.productDetail.map((order) => {
      return (
        <div>
          <br />
          <div
            class="card"
            style={{ width: "50%", marginLeft: "25%", textAlign: "center" }}
          >
            <br />
            <h6 class="card-title">{order.trackingStatus}</h6>
            <h6 class="card-text">
              {order.trackingAddress.street} + {order.trackingAddress.city} +{" "}
              {order.trackingAddress.state}+ {order.trackingAddress.zip_code}
            </h6>
            <h6 class="card-text">{order.createDate}</h6>
            <br />
          </div>
          <br />
        </div>
      );
    });

    let order = this.state.sellerOrder.map((order) => {
      console.log("seller", order);

      return (
        <div>
          <div class="card">{trackingDetails}</div>
          <br />
          <br />
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
        </div>
      );
    });

    return (
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h4>Tracking Details</h4>
            <br />
            {order}
          </div>
        </div>
      </div>
    );
  }
}
