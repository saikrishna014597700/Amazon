import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
//import "../product-module/product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import "./style.css"
import { Redirect } from "react-router";

export default class customerAddresses extends Component {
  constructor() {
    super();
    this.state = {
      addresses: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async saveAddress(id) {
    var addresses = this.state.addresses

    var selectedAddress = {}
    for (var address of addresses) {
      if (address._id === id) {
        selectedAddress = address;
      }
    }
    if(document.forms[id].reportValidity()){
    console.log("selectedAddress::", selectedAddress)
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post("http://localhost:3001/api/customerDetails/saveCustomerAddresses/?userId=" + localStorage.getItem("id"), selectedAddress).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })
  }
  }

  async deleteAddress(id){
    var addresses = this.state.addresses

    var selectedAddress = {}
    for (var address of addresses) {
      if (address._id === id) {
        selectedAddress = address;
      }
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post("http://localhost:3001/api/customerDetails/deleteCustomerAddress/?userId=" + localStorage.getItem("id"), selectedAddress).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })

  }

  addAddress() {

    var newAddress = {
      _id : "-1",
      name:"",
      street1:"",
      street2:"",
      city:"",
      state:"",
      zip_code:"",
      country:"",
      phoneNo:"",
      editFlag:true
    }

    this.setState({
        addresses: this.state.addresses.concat(newAddress)
    })

  }

  handleChange(e, id, type) {

    var addresses = this.state.addresses

    for (var address of addresses) {
      if (address._id === id) {
        address[type] = e.target.value;
      }
    }
    console.log(this.state.addresses)

  }
  async componentDidMount() {

    var data = localStorage.getItem("id");

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get("http://localhost:3001/api/customerDetails/getCustomerAddresses/?userId=" + data).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })

  }

  async cancelAddress(){
    var data = localStorage.getItem("id");

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get("http://localhost:3001/api/customerDetails/getCustomerAddresses/?userId=" + data).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })
  }

  

  editAddress(id) {

    var addresses = this.state.addresses

    for (var address of addresses) {
      if (address._id === id) {
        address.editFlag = true
      }
    }

     this.setState({
     addresses: addresses
    })
  }

  render() {

    let redirectVar = null;
    if(!localStorage.getItem("id")){
        redirectVar = <Redirect to= "/login"/>
    }
    else if (localStorage.getItem("id") && !(localStorage.getItem("role") === "Customer")){
      redirectVar = <Redirect to= "/login"/>
    }

    let customerAddresses = this.state.addresses.map((address) => {
      return (

        <div key = {address._id}>
          
          

              <div className="card">


                <div className="card-header">
                  <p>Address Id: {address._id}
                    <button className = "Amazon" onClick={e => this.deleteAddress(address._id)} style={{ float: "right" ,width:"75px"}}> Delete
                  </button>
                    <button className = "Amazon" onClick={e => this.editAddress(address._id)} style={{ float: "right", marginRight: "5px" ,width:"50px"}}> Edit
                  </button>

                  </p>
                </div>
                <div className="card-body" style={{ marginLeft: "5px" }}>
                  <form id = {address._id}>
                  <div className="row">
                    <div className="col-sm">
                    <p style={{ marginBottom: "0px", marginTop: "3px" }}>Name</p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.name} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "name")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}>street2</p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.street2} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "street2")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}>state </p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.state} disabled={!address.editFlag} pattern = "^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$" required onChange={e => this.handleChange(e, address._id, "state")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}>Country</p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.country} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "country")} />
                      </div>
                    </div>
                    <div className="col-sm">
                    <p style={{ marginBottom: "0px", marginTop: "3px" }}>street1</p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.street1} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "street1")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}>City </p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.city} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "city")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}> Zip Code </p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" pattern = "^[0-9]{5}(?:-[0-9]{4})?$" required defaultValue={address.zip_code} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "zip_code")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}> Phone Number </p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" pattern = "[\d]{10}" required defaultValue={address.phoneNo} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "phoneNo")} />
                      </div>
                    </div>


                  </div>
                  <button hidden={!address.editFlag} className = "Amazon" onClick={e => this.cancelAddress()} style={{ float: "right", marginBottom: "5px",width:"60px" }}> Cancel
                  </button>
                  <button hidden={!address.editFlag} className = "Amazon" onClick={e => this.saveAddress(address._id)} style={{ float: "right", marginBottom: "5px",marginRight:"5px",width:"50px" }}> Save
                  </button>

                  </form>
                </div>
               
              </div>
            </div>
          

      )
    })

    return (
      <div style={{ marginTop: "50px" }}>
        {redirectVar}
        <h4>Your Saved Addresses</h4>
        <div className="auth-wrapper">
            <div className="auth-innerStyle">
        {customerAddresses}

        <button  className = "Amazon" style = {{width:"130px"}}onClick={e => this.addAddress()}> Add Address
                  </button>
      </div >
      </div>
      </div>
    )
  }

}