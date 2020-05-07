import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../login-module/login.css"
import { Redirect } from "react-router";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:""
    };
    this.create=this.create.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  async handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    // console.log(e.target.value)
  }

  async create(e)
  {
    e.preventDefault();
        if(document.forms['signupForm'].reportValidity()){
    const data= {
      name : this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.option
    }
    await axios
      .post("http://localhost:3001/api/auth/signup/", data)
      .then((response) => {
        this.setState({
          msg: response.data
        })
        console.log("line 40",response)
      });
    console.log("42",this.state.msg)}
  }

  render() {

    let redirectVar = null
    if(localStorage.getItem("id")){
      redirectVar= <Redirect to="/home" />
    }
    if(this.state.msg=="Created Successfully")
    redirectVar= <Redirect to="/login" />
    return (
      <div>
        {redirectVar}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div className="container">
              <div className="row">
              <p style={{color:"red"}}>{this.state.msg} </p>
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
                    <form id="signupForm">
                      <div className="form-group">
                        <h1>Create Account</h1>
                      </div>
                      <div className="form-group">
                        <strong>Your name</strong>
                        <input
                        name="name"
                        onChange={this.handleChange}
                          id="name"
                          type="text"
                          maxlength="50"
                          required
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <strong>Email</strong>
                        <input
                          id="signupEmail"
                          name="email"
                          onChange={this.handleChange}
                          type="email"
                          maxlength="50"
                          // pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" 
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <strong>Password</strong>
                        <input
                          id="signupPassword"
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          minLength="6"
                          maxlength="25"
                          placeholder="At least 6 characters"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                      <Form.Check
          type="radio"
          label="Customer"
          name="option"
          value="Customer"
          onChange={this.handleChange}
          id="formHorizontalRadios1"
          required
        />
        <Form.Check
          type="radio"
          label="Seller"
          value="Seller"
          name="option"
          onChange={this.handleChange}
          id="formHorizontalRadios2"
          
        /> 
        </div>
                      <div
                        className="form-group"
                        style={{ paddingTop: "12px" }}
                      >
                        <button className="Amazon" onClick={this.create} size="lg" block>
                        <span></span>
                          Create your Amazon account
                        </button>
                      </div>

                      <p className="form-group">
                        By creating an account you are agreeing to our{" "}
                        <a href="#">Terms of Use</a> and our{" "}
                        <a href="#">Privacy Policy</a>.
                      </p>
                      <div className="form-group divider">
                        <hr className="left" />
                        <small>Already have an account?</small>
                        <hr className="right" />
                        &nbsp; <Link to="/login">Sign-in →</Link>
                      </div>
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

export default SignUp;
