import React, { Component } from "react";
import { Form } from "react-bootstrap";
// import DatePicker from "react-bootstrap-date-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./admin.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Bar } from "react-chartjs-2";
import Env from "../../helpers/Env";

export default class AdminReports extends Component {
  constructor() {
    super();
    this.state = {
      sellerReports: [],
      redirect: null,
      analyticsArrayState: [],
      analyticsArrayStateProduct: [],
      analyticsArrayStateMostRated: [],
      chartData: [],
      mostViewedProductsChartData: [],
      graphSelection: "top5Sellers",
      graphNames: {
        top5Sellers: "Top 5 Sellers by total sales amount",
        top5Users: "Top 5 customers by total purchase amount",
        top5Products: "Top 5 most sold products",
        top10HighestRated: "top 10 highest rated products",
      },
      dateForOrderCount: "",
      orderCount: "",
      createdDate: new Date(),
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.getChart();
  };

  searchHandleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  getOrderCountByDate = async (event) => {
    const orderCount = this.state.sellerReports.OrdersperDay.filter((order) => {
      const selectedDate = new Date(this.state.createdDate);
      let temp = new Date(new Date().setDate(selectedDate.getDate));
      temp = new Date(temp.setMonth(selectedDate));
      temp = new Date(temp.setFullYear(temp.setMonth(selectedDate)));
      if (
        this.convert(this.state.createdDate) ===
        this.convert(new Date(order.create_date))
      ) {
        console.log("matched order", order);
        return order.order_count;
      } else return 0;
    });
    console.log("orderCount", orderCount[0]);
    await this.setState({ orderCount: orderCount[0] });
    console.log("this.state.orderCount", this.state.orderCount);
    return orderCount;
  };

  getReportingByDate = () => {
    this.getOrderCountByDate();
    this.mostViewedProductsFinal();
  };

  mostViewedProductsFinal = async () => {
    const date = await this.convert(this?.state?.createdDate);
    axios
      .get(`${Env.host}/api/admin/most-viewed-jobs?date=${date}`)
      .then(async (response) => {
        console.log("Admin Reports are::", response);
        await this.setState({
          mostViewedProducts: response.data,
        });
        this.mostViewedProductsChart();
      });
  };

  async componentDidMount() {
    console.log("componentDidMount");
    axios.get(`${Env.host}/api/admin/reports`).then(async (response) => {
      console.log("Admin Reports are::", response);
      await this.setState({
        sellerReports: response.data.results,
      });
      this.getChart();
      this.MostRatedProducts();
      this.getReportingByDate();
    });
  }

  getChart = async () => {
    var analyticsArray = [];
    this.state.sellerReports[this.state.graphSelection].map((order) => {
      var test =
        '{ "y": ' +
        order["sum(pa.product_sales_um)"] +
        ', "x": ' +
        order.name +
        " }";
      analyticsArray.push(test);
    });
    await this.setState({
      analyticsArrayState: analyticsArray,
    });
    var labels = [];
    var data = [];
    var backgroundColor = [];
    this.state.sellerReports[this.state.graphSelection].map((order) => {
      labels.push(order.name);
      data.push(order.sales);
      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
     };
      backgroundColor.push(dynamicColors());
    });

    var state = {};
    var datasets = [];
    state.labels = labels;
    var x = {};
    x.label = this.state.graphNames[this.state.graphSelection];
    x.data = data;
    x.backgroundColor = backgroundColor;
    datasets.push(x);
    state.datasets = datasets;
    console.log("State is", state);
    await this.setState({
      chartData: state,
    });
    console.log("State iss", this.state.chartData);
  };

  MostRatedProducts = async () => {
    var analyticsArray = [];
    this.state.sellerReports.top10HighestRated.map((product) => {
      var test =
        '{ "y": ' + product.avgRating + ', "x": ' + product.productName + " }";
      analyticsArray.push(test);
    });
    await this.setState({
      analyticsArrayStateMostRated: analyticsArray,
    });
    var labels = [];
    var data = [];
    var backgroundColor = [];
    this.state.sellerReports.top10HighestRated.map((product) => {
      labels.push(product.productName);
      data.push(product.avgRating);
      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
     };
      backgroundColor.push(dynamicColors());
    });

    var state = {};
    var datasets = [];
    state.labels = labels;
    var x = {};
    x.label = "Top 10 Most Rated Products";
    x.data = data;
    x.backgroundColor = backgroundColor;
    datasets.push(x);
    state.datasets = datasets;
    console.log("State is", state);
    await this.setState({
      mostRatedProductsChartData: state,
    });
    console.log("State iss", this.state.chartData);
  };

  mostViewedProductsChart = async () => {
    var analyticsArray = [];
    this.state.mostViewedProducts?.map((product) => {
      var test =
        '{ "y": ' +
        product.view_count +
        ', "x": ' +
        product.product_name +
        " }";
      analyticsArray.push(test);
    });
    await this.setState({
      analyticsArrayStateProduct: analyticsArray,
    });
    // console.log("componentWillMount");
    var labels = [];
    var data = [];
    var backgroundColor = [];
    // let report = this.state.sellerReports.map((order) => {});
    this.state.mostViewedProducts?.map((product) => {
      labels.push(product.product_name);
      // labels.push("Hi");
      data.push(product.view_count);
      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
     };
      backgroundColor.push(dynamicColors());
    });

    var state = {};
    var datasets = [];
    state.labels = labels;
    var x = {};
    x.label = "Top 10 Most Viewed Products per day";
    x.data = data;
    x.backgroundColor = backgroundColor;
    datasets.push(x);
    state.datasets = datasets;
    console.log("State is", state);
    await this.setState({
      mostViewedProductsChartData: state,
    });
    console.log("State iss", this.state.mostViewedProductsChartData);
  };

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  handleDateChange = async (date) => {
    await this.setState({ createdDate: date });
    // this.setState({ userGivenDate: date });
    console.log("createdDate::::", this.state.createdDate);
    this.getReportingByDate();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    } else {
      if (localStorage.getItem("role") != "Admin") {
        redirectVar = <Redirect to="/login" />;
      }
    }
    let top10ViewedProductsGraph = (
      <div>
        <Bar
          data={this.state.mostViewedProductsChartData}
          options={{
            title: {
              display: "Top 10 products viewed per day",
              text: "Top 10 products viewed per day",
              fontSize: 25,
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>
    );
    let top10MostRatedProductsGraph = (
      <div>
        <Bar
          data={this.state.mostRatedProductsChartData}
          options={{
            title: {
              display: "Top 10 Most Rated Products",
              text: "Top 10 Most Rated Products",
              fontSize: 25,
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>
    );
    let graph = (
      <div>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: "Graph",
              text: "Sales and Purchases",
              fontSize: 25,
            },
            // legend: {
            //   display: "xx",
            //   position: "yy",
            // },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>
    );

    return (
      <div className="auth-wrapper">
        {redirectVar}
        <div className="auth-inner4">
          <h3>Reports Dashboard</h3>
          <br />
          <div class="card text-center">
            <div className="card">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Form.Group
                  controlId="exampleForm.ControlInput5"
                  className="float-left"
                >
                  <DatePicker
                    placeholderText="Please select a date"
                    default
                    selected={this.state.createdDate}
                    onSelect={this.handleDateChange}
                    dateFormat="MM/dd/yyyy"
                  />
                </Form.Group>
              </Form>
              {/* {!!this.state.createdDate ? ( */}
              <div>
                {!!this.state.orderCount?.order_count ? (
                  <h4>
                    The total number of orders made on this date is{" "}
                    {this.state.orderCount?.order_count}
                  </h4>
                ) : (
                  <h4>The total number of orders made on this date is 0</h4>
                )}
              </div>

              {top10ViewedProductsGraph}
            </div>
            <br />
          </div>
          <Form>
            <Form.Control
              style={{ width: "200px" }}
              as="select"
              name="graphSelection"
              onChange={this.handleOnChange}
            >
              <option value="top5Sellers">Top 5 Sellers</option>
              <option value="top5Users">Top 5 Customers</option>
              <option value="top5Products">Top 5 Most Sold Products</option>
            </Form.Control>
          </Form>
          {graph}
          {top10MostRatedProductsGraph}
        </div>
      </div>
    );
  }
}
