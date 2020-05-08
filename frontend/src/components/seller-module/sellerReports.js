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
      month: "",
      year: "",
      monthlySalesSum: "",
    };
  }

  async componentDidMount() {
    var sellerId = localStorage.getItem("id");
    console.log("componentDidMount");
    // console.log("orderId::", orderId);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
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
          var dynamicColors = function () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
          };
          labels.push(order.product_name);
          // labels.push("Hi");
          data.push(order.product_sales_um);
          backgroundColor.push(dynamicColors());
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
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
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

  async handlemonthlySalesMonth(e) {
    await this.setState({
      month: e.target.value,
    });
  }
  async handlemonthlySalesYear(e) {
    await this.setState({
      year: e.target.value,
    });
  }

  async getMonthWiseSalesSum(e) {
    const data = {
      month: this.state.month,
      year: this.state.year,
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .post(
        `http://localhost:3001/api/seller/getMonthWiseSalesSum/${localStorage.getItem(
          "id"
        )}`,
        data
      )
      .then((response) => {
        console.log("Res isss", response.data);
        if (response.data == "No sales amount in given range") {
          alert("No sales amount in given range");
        } else {
          this.setState({
            monthlySalesSum: response.data[0].sales_sum,
          });
        }
      });
  }

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

    let monthWiseSalesAmount = (
      <div>
        <table>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th></th>
          </tr>
          <tr>
            <td>
              {" "}
              <select
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#e7eae8",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  fontSize: "16px",
                }}
                name="trackingStatus"
                onChange={(e) => this.handlemonthlySalesMonth(e)}
              >
                <option value="">--Select Month--</option>
                <option value="01">Janaury</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </td>
            <td>
              <select
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#e7eae8",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  fontSize: "16px",
                }}
                name="trackingStatus"
                onChange={(e) => this.handlemonthlySalesYear(e)}
              >
                <option value="">--Select Year--</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </td>
            <td>
              <button
                className="Amazon"
                style={{
                  width: "130px",
                  height: "50px",
                  "margin-left": "5px",
                }}
                onClick={(e) => this.getMonthWiseSalesSum(e)}
              >
                Get sales sum
              </button>
            </td>
          </tr>
        </table>
        <br />
        <h6>Monthly Sales Sum : {this.state.monthlySalesSum}</h6>
        <br />
      </div>
    );

    let graph = (
      <div>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: "Product wise Seller Sales Sum Graph",
              text: "Seller Sales Sum Graph",
              fontSize: 25,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />

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
            {monthWiseSalesAmount}
            <br />

            {report}
          </div>
          {graph}
        </div>
      </div>
    );
  }
}
