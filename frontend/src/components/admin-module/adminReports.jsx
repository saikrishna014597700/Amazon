import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
// import DatePicker from "react-bootstrap-date-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./admin.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Bar, Line, Pie } from "react-chartjs-2";
import Env from "../../helpers/Env";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

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
        top5Products: "Top 5 ost sold products",
        top10HighestRated: "top 10 highest rated products",
      },
      dateForOrderCount: "",
      orderCount: "",
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

  getOrderCountByDate = async (event) => {
    const dateForOrderCount = "2020-04-16";
    const orderCount = this.state.sellerReports.OrdersperDay.filter((order) => {
      // let createdDate = new Date(
      //   new Date(order.create_date).setHours(0, 0, 0, 0)
      // );
      console.log("createdDate ", this.state.createdDate?.getTime());
      console.log(
        "order.create_date",
        new Date(new Date(order.create_date).setHours(0, 0, 0, 0)).getTime(),
        order.create_date
      );
      const selectedDate = new Date(dateForOrderCount);
      let temp = new Date(new Date().setDate(selectedDate.getDate));
      temp = new Date(temp.setMonth(selectedDate));
      temp = new Date(temp.setFullYear(temp.setMonth(selectedDate)));
      console.log("dateForOrderCount", temp, dateForOrderCount);
      if (
        // new Date(new Date().setHours(0, 0, 0, 0)).getTime(order.create_date) ===
        // new Date(new Date(dateForOrderCount).setHours(0, 0, 0, 0)).getTime()

        this.state.createdDate?.getTime() ===
        new Date(new Date(order.create_date).setHours(0, 0, 0, 0)).getTime()
      ) {
        console.log("matched order", order);
        return order.order_count;
      } else return 0;

      // return order;
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

  mostViewedProductsFinal = () => {
    axios
      .get(`${Env.host}/api/admin/most-viewed-jobs?date=2020-04-16`)
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
    // console.log("analyticsArrayState", analyticsArray);
    await this.setState({
      analyticsArrayState: analyticsArray,
    });
    // console.log("componentWillMount");
    var labels = [];
    var data = [];
    var backgroundColor = [];
    // let report = this.state.sellerReports.map((order) => {});
    this.state.sellerReports[this.state.graphSelection].map((order) => {
      labels.push(order.name);
      // labels.push("Hi");
      data.push(order.sales);
      backgroundColor.push("rgba(245, 212, 122)");
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
    // console.log("analyticsArrayState", analyticsArray);
    await this.setState({
      analyticsArrayStateMostRated: analyticsArray,
    });
    // console.log("componentWillMount");
    var labels = [];
    var data = [];
    var backgroundColor = [];
    // let report = this.state.sellerReports.map((order) => {});
    this.state.sellerReports.top10HighestRated.map((product) => {
      labels.push(product.productName);
      // labels.push("Hi");
      data.push(product.avgRating);
      backgroundColor.push("rgba(254, 190, 98)");
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
      mostRatedProductsChartData: state,
    });
    console.log("State iss", this.state.chartData);
  };

  mostViewedProductsChart = async () => {
    var analyticsArray = [];
    this.state.mostViewedProducts?.map((product) => {
      var test =
        '{ "y": ' +
        product.view_Count +
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
      data.push(product.view_Count);
      backgroundColor.push("rgba(254, 190, 98)");
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
      mostViewedProductsChartData: state,
    });
    console.log("State iss", this.state.mostViewedProductsChartData);
  };

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  handleDateChange = (date) => {
    this.setState({ createdDate: date });
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
          }}
        />

        {/* {
          <Line
            data={this.state.chartData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Largest Cities In " + this.props.location,
                fontSize: 25,
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
              },
            }}
          />
        }
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Largest Cities In " + this.props.location,
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        /> */}
      </div>
    );

    // let report = this.state.sellerReports.map((order) => {
    //   return (
    //     <div>
    //       <div class="card">
    //         <br />
    //         {/* <div class="card text-center">
    //           <div class="card-header"> */}
    //         <br />
    //         <table style={{ width: "100%" }}>
    //           <tr>
    //             <th>Product Name</th>
    //             <th>Quantity</th>
    //             <th>Price</th>
    //             <th>View Count</th>
    //             <th>Total Sales Amount</th>
    //           </tr>
    //           <tr>
    //             <td>{order.product_name}</td>
    //             <td>{order.quantity}</td>
    //             <td>{order.price}</td>
    //             <td>{order.view_count}</td>
    //             <td>{order.product_sales_um}</td>
    //           </tr>
    //           <br />
    //           <br />
    //         </table>

    //         <br />
    //         {/* </div>
    //         </div> */}
    //       </div>
    //     </div>
    //   );
    // });

    // graphSelection(){

    // }
    return (
      <div className="auth-wrapper">
        {redirectVar}
        <div className="auth-inner4">
          <h3>Inventory Listings</h3>
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
                  {/* <Form.Control
                    type="text"
                    className="search-input"
                    name="dateForOrderCount"
                    placeholder="Enter date..."
                    autoComplete="off"
                    onKeyUp={this.onKeyUp}
                    onChange={this.searchHandleOnChange}
                  /> */}
                  <DatePicker
                    placeholderText="Please select a date"
                    selected={this.state.createdDate}
                    onSelect={this.handleDateChange}
                    // showTimeSelect
                    dateFormat="MM/dd/yyyy"
                  />
                </Form.Group>
                {/* <div className="apply-btn-container float-left"> */}
                {/* <button
                  className="Amazon"
                  style={{
                    width: "130px",
                    height: "32px",
                    "margin-left": "5px",
                  }}
                  onClick={this.getReportingByDate}
                >
                  Search
                </button> */}
              </Form>
              {!!this.state.createdDate ? (
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
              ) : (
                ""
              )}

              {top10ViewedProductsGraph}
            </div>
            <br />

            {/* {report} */}
          </div>
          <Form>
            <Form.Control
              style={{ width: "200px" }}
              as="select"
              name="graphSelection"
              // value="No Selection"
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
