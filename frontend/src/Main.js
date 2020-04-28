import React, { Component } from "react";
import Home from "./components/home-module/home";
import AddProduct from "./components/product-module/addProduct";
// import SignIn from "./components/signin-module/login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from "./components/common/alert";
import SignUp from "./components/signup-module/signup";
import Login from "./components/login-module/login";
import Orders from "./components/Orders/orders"
import Profile from "./components/profile-module/profile";
import SearchProduct from "./components/common/searchProduct"
import customerCards from "./components/customer/customerCards"
import customerAddresses from "./components/customer/customerAddresses"

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route path="/addProduct" component={AddProduct} />
            <Route path="/orders" component={Orders} />
            <Route path="/Profile" component={Profile} />
            <Route path="/search" component={SearchProduct}/>
            <Route path="/customerCards" component={customerCards}/>
            <Route path="/customerAddresses" component={customerAddresses}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
