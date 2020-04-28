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
        <h1>Shopping List for </h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
          <Link to="signup">signup</Link>
          <Link to="addProduct">Add Product</Link>
          <Link to="orders">Orders</Link>
          <Link to="login">Login</Link>
          <Link to="search">Search Product</Link>

          <Link to="customerCards">Your Cards</Link>
          <Link to="customerAddresses">Your Addresses</Link>
        </ul>
      </div>
    );
  }
}

export default Home;
