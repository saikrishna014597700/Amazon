import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./admin.css";
import axios from "axios";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "../seller-module/shoe.jpg";
import { Link } from "react-router-dom";
import Env from "../../helpers/Env";

export default class AdminOrders extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDesc: "",
      price: "",
      category: "",
      sellerOrders: [],
      deliveredOrders: [],
      cancelledOrders: [],
      openOrders: [],
      redirect: null,
      searchTerm: "",
      status: "",
    };
  }

  async componentDidMount() {
    console.log("ENeterd componentDidMount");
    axios
      .get(`${Env.host}/api/admin/all-orders?status=${this.state.status}`)
      .then(async (response) => {
        console.log("Pro are::", response);
        await this.setState({
          openOrders: response.data,
        });
        console.log("Pro are::", this.state.openOrders);
      });
  }

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  searchOnChangeHandle = () => {
    this.getOrdersBySearch();
  };

  getOrdersBySearch = () => {
    axios
      .get(
        `${Env.host}/api/admin/orders_by_seller_name?searchTerm=${this.state.searchTerm}`
      )
      .then(async (response) => {
        await this.setState({
          openOrders: response.data,
        });
      });
  };

  getOrdersbyStatus = () => {
    axios
      .get(`${Env.host}/api/admin/all-orders?status=${this.state.status}`)
      .then(async (response) => {
        console.log("Pro are::", response);
        await this.setState({
          openOrders: response.data,
        });
        console.log("Pro are::", this.state.openOrders);
      });
  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    } else {
      if (localStorage.getItem("role") != "Seller") {
        redirectVar = <Redirect to="/login" />;
      }
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let openOrders = this.state.openOrders.map((sellerOrder) => {
      console.log("seller", sellerOrder);
      let orderProducts = sellerOrder?.productsArr?.map((orderProduct) => {
        var buttonId = sellerOrder.order._id;
        return (
          <div>
            <div class="card">
              <table>
                <tr>
                  <th style={{ width: "20%" }}>
                    <img
                      class="card-img-left"
                      src={logo}
                      alt="Card image cap"
                      style={{
                        width: "300px",
                        height: "300px",
                        float: "left",
                        marginLeft: "20px",
                      }}
                    ></img>
                  </th>
                  <th style={{ width: "30%", textAlign: "left" }}>
                    <div
                      class="card-body"
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <h5 class="card-title">
                        Status : {orderProduct.productTracking.status}
                      </h5>
                      <p class="card-text">
                        <a href="#" class="card-link">
                          {orderProduct.product.productName}
                        </a>
                      </p>
                      {/* <p class="card-text">
                        {orderProduct.product.productName}
                      </p> */}
                      <h6>{orderProduct.product.productDesc}</h6>
                      <h6>Price: {orderProduct.product.price}</h6>
                      <h6>Quantity: {orderProduct.productTracking.quantity}</h6>
                    </div>

                    {/* <div class="card-body">
                      <a href="#" class="card-link">
                        Card link
                      </a>
                      <a href="#" class="card-link">
                        Another link
                      </a>
                    </div> */}
                  </th>
                  <th style={{ width: "25%" }}>
                    <Button
                      variant="light"
                      style={{
                        width: "280px",
                        height: "50px",
                        float: "right",
                        marginRight: "20px",
                        marginTop: "10%",
                      }}
                      block
                      onClick={(event) => this.addProduct(event)}
                    >
                      View Product
                    </Button>
                    <Button
                      variant="light"
                      style={{
                        width: "280px",
                        height: "50px",
                        float: "right",
                        marginRight: "20px",
                      }}
                      block
                      onClick={(event) =>
                        this.getProductTrackingDetails(
                          event,
                          orderProduct.product._id,
                          sellerOrder.order._id
                        )
                      }
                    >
                      Tracking Details
                    </Button>
                  </th>
                </tr>
              </table>
            </div>
          </div>
        );
      });

      return (
        <div class="card text-center">
          <div class="card-header">
            <table style={{ width: "100%" }}>
              <tr>
                <th>ORDER PLACED</th>
                <th>Total</th>
                <th>ORDER # </th>
                <th>ORDER DETAILS</th>
              </tr>
              <tr>
                <td>{sellerOrder?.order?.createDate}</td>
                <td>{sellerOrder?.order?.transactionAmount}</td>
                <td>{sellerOrder?.order?._id}</td>
                <td>
                  {/* <Link
                    to={{
                      pathname: `/orderDetailPage/${sellerOrder.order._id}`,
                    }}
                  >
                    Order Details
                  </Link> */}
                  Order Details Link
                </td>
              </tr>
            </table>
            {/* <ul class="nav nav-pills card-header-pills">
              Order Placed On:{sellerOrder.order.createDate}
            </ul>
            <p class="card-text">
              {" "}
              Order ID:{sellerOrder.order._id}
              TransactionAmount: {sellerOrder.order.transactionAmount}
            </p>
            <p class="card-title">
              Shipping Address: {sellerOrder.order.shippingAddress.street}
              {sellerOrder.order.shippingAddress.city}
              {sellerOrder.order.shippingAddress.state}
              {sellerOrder.order.shippingAddress.zip_code}
            </p>
            {/* <button
              class="btn btn-primary"
              onClick={this.productsDisplay(sellerOrder.order._id)}
            >
              Products
            </button> */}
          </div>
          {orderProducts}
        </div>
      );
    });

    return (
      <div>
        {redirectVar}
        <div className="auth-wrapper">
          <div className="auth-inner4">
            <h3>All Orders</h3>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <table style={{ width: "100%" }}>
                <tr>
                  <th>Search by</th>
                  <th>Filter by</th>
                </tr>
                <tr>
                  <td>
                    <Form.Group
                      controlId="exampleForm.ControlInput5"
                      className="float-left"
                    >
                      <Form.Control
                        type="text"
                        className="search-input"
                        name="searchTerm"
                        placeholder="Seller name..."
                        autoComplete="off"
                        onKeyUp={this.onKeyUp}
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      style={{ width: "200px" }}
                      as="select"
                      name="status"
                      value="No Selection"
                      onChange={this.handleOnChange}
                    >
                      <option value="">Select status</option>
                      <option value="Ordered">Ordered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <button
                      className="Amazon"
                      style={{
                        width: "130px",
                        height: "42px",
                        "margin-left": "5px",
                      }}
                      onClick={this.searchOnChangeHandle}
                    >
                      Search
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="Amazon"
                      style={{
                        width: "130px",
                        height: "42px",
                        "margin-left": "5px",
                      }}
                      onClick={this.getOrdersbyStatus}
                    >
                      Filter
                    </button>
                  </td>
                </tr>
              </table>
            </Form>{" "}
            <br />
            <br />
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-orders"
                role="tabpanel"
                aria-labelledby="nav-orders-tab"
              >
                {openOrders}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getProductTrackingDetails = (event, pid, orderId) => {
    this.setState({
      redirect: `/adminProductTrackingDetails/${pid}/${orderId}`,
    });
  };
}
