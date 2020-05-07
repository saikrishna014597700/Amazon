import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
// import DatePicker from "react-bootstrap-date-picker";
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
      chartData: [],
      graphSelection: "top5Sellers",
      graphNames: {
        top5Sellers: "Top 5 Sellers by total sales amount",
        top5Users: "Top 5 customers by total purchase amount",
        top5Products: "Top 5 most sold products",
      },
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.getChart();
  };

  async componentDidMount() {
    console.log("componentDidMount");
    axios.get(`${Env.host}/api/admin/reports`).then(async (response) => {
      console.log("Admin Reports are::", response);
      await this.setState({
        sellerReports: response.data.results,
      });
      this.getChart();
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
      chartData: state,
    });
    console.log("State iss", this.state.chartData);
  };

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  // new Date(new Date('2020-04-16T07:00:00.000Z').setHours(0,0,0,0)).getTime() === new Date(new Date('2020-04-17').setHours(0,0,0,0)).getTime()

  render() {
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
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: "Graph",
              text: "Top 5 Sales",
              fontSize: 25,
            },
            // legend: {
            //   display: "xx",
            //   position: "yy",
            // },
          }}
        />

        {
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
        />
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
        <div className="auth-inner3">
          <div class="card text-center">
            <div class="card-header">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>SELLER NAME</th>
                  <th>Total Sales Sum</th>
                </tr>
                <tr>
                  <td>"Fetch from Local storage"</td>
                  <td>"1234.5"</td>
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
                <option value="top5Products">Top 5 Products</option>
              </Form.Control>
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <Form.Group controlId="date">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Event Date"
                    format="MM/dd/yyyy"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Form.Group>
                </Grid>
              </MuiPickersUtilsProvider> */}
            </Form>
            <br />

            {/* {report} */}
          </div>

          {graph}
        </div>
      </div>
    );
  }
}
