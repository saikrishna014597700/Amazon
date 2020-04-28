import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./seller.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router";
import logo from "./shoe.jpg";
import { Link } from "react-router-dom";
import {
  XYPlot,
  XAxis, // Shows the values on x axis
  YAxis, // Shows the values on y axis
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";

export default class SellerReports extends Component {
  constructor() {
    super();
    this.state = {
      sellerReports: [],
      redirect: null,
      analyticsArrayState: [],
    };
  }

  async componentDidMount() {
    var sellerId = "123";
    // console.log("orderId::", orderId);
    axios
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
      });
  }

  async redirectToProductsPage(event) {
    this.setState({ redirect: `/viewAllsellerOrders` });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    // let report = this.state.sellerReports.map((order) => {});

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
        <div className="auth-inner">
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
            <br />

            {report}
          </div>
        </div>
      </div>
    );
  }
}
