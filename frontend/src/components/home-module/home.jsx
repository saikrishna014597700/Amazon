import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h1>Menu</h1>
            <ul>
              <Link to="orders">Orders</Link>
              <Link to="login">Login</Link>
              <Link to="search">Search Product</Link>

              <Link to="customerCards">Your Cards</Link>
              <Link to="customerAddresses">Your Addresses</Link>
              <Link to="signup">signup</Link>
              <br />
              <Link to="addProduct">Add Product</Link>
              <br />
              <Link to="viewAllSellerProducts">View All Seller Products</Link>
              <br />
              <Link to="sellerOrders">Seller Orders</Link>
              <br />
              <Link to="sellerReports">Seller Reports</Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
