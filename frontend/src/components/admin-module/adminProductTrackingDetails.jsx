import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./admin.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "./shoe.jpg";
import { Link } from "react-router-dom";
import Env from "../../helpers/Env";

export default class AdminProductTrackingDetails extends Component {
  constructor() {
    super();
    this.state = {
      sellerOrder: [],
      redirect: null,
      productDetail: [],
      productId: "",
      orderId: "",
      editTrackingFlag: false,
      trackingStatus: "Package arrived",
    };
  }

  async componentDidMount() {
    var orderId = this.props.match.params.id;
    var patt = new RegExp("adminProductTrackingDetails\\/(\\w+)");
    var res = patt.exec(this.props.match.url);
    console.log("Reg res are::", res[1]);
    if (res[1]) var productId = res[1];
    if (orderId && productId) {
      this.setState({
        orderId: orderId,
      });
      this.setState({
        productId: productId,
      });
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(
          `${Env.host}/api/seller/ProductTrackingDetails/?orderId=${orderId}&productId=${productId}`
        )
        .then((response) => {
          console.log("Pro are::", response.data.products[0].trackingInfo);
          response.data.products.map((product) => {
            if (product.productId == productId) {
              this.setState({
                productDetail: this.state.productDetail.concat(
                  product.trackingInfo
                ),
              });
            }
          });
          this.setState({
            sellerOrder: this.state.sellerOrder.concat(response.data),
          });
        });
    }
  }

  editTrackingDetails = (event, pid, orderId) => {
    this.setState({
      editTrackingFlag: true,
    });
  };

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  handleTrackingStatusChange = (e) => {
    this.setState({
      trackingStatus: e.target.value,
    });
  };

  updateTrackingDetails() {
    const data = {
      trackingStatus: this.state.trackingStatus,
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(
        `${Env.host}/api/seller/updateSellerTrackingDetails/?orderId=${this.state.orderId}&productId=${this.state.productId}`,
        data
      )
      .then((response) => {
        console.log("Pro are::", response.data);
        this.setState({
          sellerOrder: [],
        });
        this.setState({
          productDetail: [],
        });
        this.setState({
          sellerOrder: this.state.sellerOrder.concat(response.data),
        });
        response.data.products.map((product) => {
          if (product.productId == this.state.productId) {
            this.setState({
              productDetail: this.state.productDetail.concat(
                product.trackingInfo
              ),
            });
          }
        });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let editTDetails = null;
    if (this.state.editTrackingFlag) {
      editTDetails = (
        <div className="card">
          <div className="card-header">
            <p>Update Tracking Details:</p>
          </div>
          <div className="card-body" style={{ marginLeft: "5px" }}>
            <div className="row">
              <br />
              <br />
              <select
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#e7eae8",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
                placeholder="Tracking Detail"
                defaultValue="Select a status"
                name="trackingStatus"
                onChange={(e) => this.handleTrackingStatusChange(e)}
              >
                <option value="Package arrived">Package arrived</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <button
              className="Amazon"
              onClick={(e) => this.setState({ editTrackingFlag: false })}
              style={{
                float: "right",
                marginBottom: "5px",
                width: "80px",
                fontSize: "20px",
              }}
            >
              {" "}
              Cancel
            </button>
            <button
              className="Amazon"
              onClick={(e) => this.updateTrackingDetails()}
              style={{
                float: "right",
                marginBottom: "5px",
                marginRight: "5px",
                width: "80px",
                fontSize: "20px",
              }}
            >
              {" "}
              Update
            </button>
          </div>
        </div>
      );
    }

    let trackingDetails = this.state.productDetail.map((order) => {
      console.log("Exce", order);
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
              {order.trackingAddress?.street} {order.trackingAddress?.city}{" "}
              {order.trackingAddress?.state} {order.trackingAddress?.zip_code}
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

    let editButton;

    if (localStorage.getItem("role") === "Admin") {
      editButton = (
        <button
          className="Amazon"
          onClick={(e) =>
            this.editTrackingDetails(this.state.orderId, this.state.productId)
          }
          style={{
            float: "right",
            marginRight: "5px",
            width: "80px",
            fontSize: "20px",
          }}
        >
          {" "}
          Edit
        </button>
      );
    }

    return (
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner3">
            <h4>
              Tracking Details
              {editButton}
            </h4>
            <br />
            {editTDetails}
            <br />
            {order}
          </div>
        </div>
      </div>
    );
  }
}
