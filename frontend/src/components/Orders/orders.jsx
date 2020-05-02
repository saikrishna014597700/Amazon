import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./orders.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "./shoe.jpg";
import { Link } from "react-router-dom";

export default class orders extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDesc: "",
      price: "",
      category: "",
      orders: [],
      deliveredOrders: [],
      cancelledOrders: [],
      openOrders: [],
      redirect: null,
    };
  }

  async componentDidMount() {
    var sellerId = "123";
    axios
      .get("http://localhost:3001/api/orders/getAllOrders/?userId=" + 1)
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
            orders: response.data,
        });
        //console.log("Pro are::", this.state.orders);
      });
      axios
      .get("http://localhost:3001/api/orders/getCancelledOrders/?userId=" + 1)
      .then((response) => {
        console.log("Cncelled orders are::", response);
        
        this.setState({
            cancelledOrders: response.data,
        });
        //console.log("Pro are::", this.state.orders);
      });
  }

  async cancelProduct(e,orderId,prodId){
    console.log('cancel this prod', prodId ,'from order ', orderId)
    var payload = {
        prodId : prodId,
        orderId:orderId
    }
    await axios.post("http://localhost:3001/api/orders/cancelOrder", payload).then(async (res) => {
        console.log('response is::', res)
        alert(res.data)
       await axios.get("http://localhost:3001/api/orders/getAllOrders/?userId=" + 1)
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
            orders: response.data,
        });
        //console.log("Pro are::", this.state.orders);
      });
    })
  }

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }
  // productsDisplay = (productsDiv) => {
  //   this.productsDiv.style.display = "block";
  // };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    
    let cancelledOrders = this.state.cancelledOrders.map((sellerOrder) => {
      console.log("seller", sellerOrder);
      let orderProducts = sellerOrder.productsArr.map((orderProduct) => {
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
                        {orderProduct.status}
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
                      <h6>Quantity: {orderProduct.quantity}</h6>
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
                      onClick={(event) => this.addProduct(event)}
                    >
                      Loading...
                    </Button>
                  </th>
                </tr>
              </table>
            </div>

            {/* <div class="card-body">
              <h5 class="card-title">{orderProduct.productTracking.status}</h5>
              <p class="card-text">{orderProduct.product.productName}</p>
              <p class="card-text">{orderProduct.product.productDesc}</p>
              <p class="card-text">Price: {orderProduct.product.price}</p>
              <p class="card-text">
                Quantity: {orderProduct.productTracking.quantity}
              </p>
            </div> */}
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
                <td>{sellerOrder.order.createDate}</td>
                <td>{sellerOrder.order.transactionAmount}</td>
                <td>{sellerOrder.order._id}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/orderDetailPage/${sellerOrder.order._id}`,
                    }}
                  >
                    Order Details
                  </Link>
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

    
    let ordersPlaced = this.state.orders.map((sellerOrder) => {
      console.log("orders placed!!", sellerOrder);
      let orderProducts = sellerOrder.productsArr.map((orderProduct) => {
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
                        {orderProduct.status}
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
                      <h6>Quantity: {orderProduct.quantity}</h6>
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
                      hidden = {orderProduct.status === "Delivered" || orderProduct.status === "Cancelled"}
                      onClick={(event) => this.cancelProduct(event,sellerOrder.order._id,orderProduct.product._id)}
                    >
                      Cancel Product
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
                <td>{sellerOrder.order.createDate}</td>
                <td>{sellerOrder.order.transactionAmount}</td>
                <td>{sellerOrder.order._id}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/orderDetailPage/${sellerOrder.order._id}`,
                    }}
                  >
                    Order Details
                  </Link>
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
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h3>Your Orders</h3>
            <br />
            <br />
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link active"
                  id="nav-orders-tab"
                  data-toggle="tab"
                  href="#nav-orders"
                  role="tab"
                  aria-controls="nav-orders"
                  aria-selected="true"
                >
                  Orders placed
                </a>
                <a
                  class="nav-item nav-link"
                  id="nav-cancelled-orders-tab"
                  data-toggle="tab"
                  href="#nav-cancelled-orders"
                  role="tab"
                  aria-controls="nav-cancelled-orders"
                  aria-selected="false"
                >
                  Cancelled Orders
                </a>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-orders"
                role="tabpanel"
                aria-labelledby="nav-orders-tab"
              >
                {ordersPlaced}
              </div>
              <div
                class="tab-pane fade"
                id="nav-cancelled-orders"
                role="tabpanel"
                aria-labelledby="nav-cancelled-orders-tab"
              >
                {cancelledOrders}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getProductTrackingDetails = (event, pid, orderId) => {
    this.setState({ redirect: `/productTrackingDetails/${pid}/${orderId}` });
  };
}
