import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Redirect } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async login(e) {
    e.preventDefault();
    if (document.forms["signform"].reportValidity()) {
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      await axios
        .post("http://localhost:3001/api/auth/signin/", data)
        .then((response) => {
          if (response.data == "Invalid Inputs")
            this.setState({
              msg: "Invalid Username/password",
            });
          else {
            console.log("IDDDD", response.data.id);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("role", response.data.role);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("imagePath", response.data.imagePath);
			localStorage.setItem("token", response.data.token);
            this.setState({
              msg: localStorage.getItem("role"),
            });
            console.log(response.data);
          }
        });
    }
  }

  render() {
    let redirectvar = null;

    
	if(localStorage.getItem("role") === "Admin"){
		redirectvar = <Redirect to="/inventory-listings" />;
	}else if (localStorage.getItem("role") === "Seller"){
		redirectvar = <Redirect to="/viewAllSellerProducts" />
	}else if (localStorage.getItem("role") === "Customer"){
		redirectvar = <Redirect to="/home"/>
	}

    return (
      <div>
        {redirectvar}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div className="container">
              <div className="row">
                <p style={{ color: "red" }}> {this.state.msg} </p>
                <img
                  src={require("../../utils/logo.jpg")}
                  style={{
                    marginLeft: "70px",
                    float: "center",
                    height: "100px",
                    width: "200px",
                  }}
                  alt="hs"
                />

                <div className="panel panel-primary">
                  <div className="panel-body">
                    <form id="signform">
                      <div className="form-group">
                        <h1>Sign-In</h1>
                      </div>
                      <div className="form-group">
                        <strong>Email or mobile phone number</strong>
                        <input
                          id="signinEmail"
                          name="email"
                          type="email"
                          maxlength="50"
                          className="form-control"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <strong>Password</strong>
                        &nbsp;
                        <span className="right">
                          <a href="#">Forgot your password?</a>
                        </span>
                        <input
                          id="signinPassword"
                          name="password"
                          type="password"
                          maxlength="25"
                          className="form-control"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ paddingTop: "12px" }}
                      >
                        <button
                          className="Amazon"
                          onClick={this.login}
                          size="lg"
                          block
                        >
                          <span></span>Sign In
                        </button>
                      </div>

                      <p className="form-group">
                        By signing in you are agreeing to our{" "}
                        <a href="#">Terms of Use</a> and our{" "}
                        <a href="#">Privacy Policy</a>.
                      </p>
                      <div className="form-group divider">
                        <hr className="left" />
                        <small>New to Amazon?</small>
                        <hr className="right" />
                      </div>
                      <p className="form-group">
                        <Link to="/signup">Create your amazon account</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
