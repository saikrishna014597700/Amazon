import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./seller.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "./shoe.jpg";
import { Bar, Line, Pie } from "react-chartjs-2";

export default class SellerReports extends Component {
  constructor() {
    super();
    this.state = {
      sellerReports: [],
      redirect: null,
      analyticsArrayState: [],
      chartData: [],
      salesSum: "",
    };
  }

  async componentDidMount() {
    var sellerId = localStorage.getItem("id");
    console.log("componentDidMount");
    // console.log("orderId::", orderId);
    await axios
      .get(`http://localhost:3001/api/seller/sellerReports/${sellerId}`)
      .then((response) => {
        console.log("sellerReports are::", response);
        this.setState({
          sellerReports: this.state.sellerReports.concat(response.data),
        });

        var analyticsArray = [];
        response.data.map((order) => {
          var test =
            '{ "y": ' +
            order.product_sales_um +
            ', "x": ' +
            order.product_name +
            " }";
          analyticsArray.push(test);
        });
        console.log("analyticsArrayState", analyticsArray);
        this.setState({
          analyticsArrayState: analyticsArray,
        });
        console.log("componentWillMount");
        var labels = [];
        var data = [];
        var backgroundColor = [];
        // let report = this.state.sellerReports.map((order) => {});
        this.state.sellerReports.map((order) => {
          labels.push(order.product_name);
          // labels.push("Hi");
          data.push(order.product_sales_um);
          backgroundColor.push("rgba(245, 212, 122)");
        });
        console.log("backgroundColor", backgroundColor);
        var state = {};
        var datasets = [];
        state.labels = labels;
        var x = {};
        x.label = "Productwise Sales Sum";
        x.data = data;
        x.backgroundColor = backgroundColor;
        datasets.push(x);
        state.datasets = datasets;
        console.log("State is", state);
        this.setState({
          chartData: state,
        });
        console.log("State iss", this.state.chartData);
      });
    await axios
      .get(
        `http://localhost:3001/api/seller/getTotalSalesSumForSeller/${sellerId}`
      )
      .then((response) => {
        console.log("Res isss", response.data[0].sales_sum);
        this.setState({
          salesSum: response.data[0].sales_sum,
        });
      });
  }

  getChartData() {}

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  render() {
    console.log("state in render::", this.state.chartData);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    } else {
      if (localStorage.getItem("role") != "Seller") {
        redirectVar = <Redirect to="/login" />;
      }
    }
    let graph = (
      <div>
        {/* <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: "Product wise Seller Sales Sum Graph",
              text: "Seller Sales Sum Graph",
              fontSize: 25,
            },
          }}
        /> */}

        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: "Product wise Seller Sales Sum Graph",
              text: "Seller Sales Sum Graph",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />

        <br />

        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Seller Sales Sum " + this.props.location,
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
      </div>
    );

    let report = this.state.sellerReports.map((order) => {
      return (
        <div>
          <div class="card">
            <br />
            {/* <div class="card text-center">
              <div class="card-header"> */}
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>View Count</th>
                <th>Total Sales Amount</th>
              </tr>
              <tr>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.view_count}</td>
                <td>{order.product_sales_um}</td>
              </tr>
              <br />
              <br />
            </table>

            <br />
            {/* </div>
            </div> */}
          </div>
        </div>
      );
    });

    return (
      <div className="auth-wrapper">
        {redirectVar}
        <div className="auth-inner3">
          <div class="card text-center">
            <br />
            <h4>Seller Reports</h4>
            <br />
            <div class="card-header">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>SELLER NAME</th>
                  <th>Total Sales Sum</th>
                </tr>
                <tr>
                  <td>{localStorage.getItem("name")}</td>
                  <td>{this.state.salesSum}</td>
                  <td>
                    {/* <Link
                  to={{
                    pathname: `/orderDetailPage/${sellerOrder.order._id}`,
                  }}
                >
                  Order Details
                </Link> */}
                  </td>
                </tr>
              </table>
            </div>
            <br />

            {report}
          </div>
          {graph}
        </div>
      </div>
    );
  }
}
