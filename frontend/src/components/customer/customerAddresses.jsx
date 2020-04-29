import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
//import "../product-module/product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import "./style.css"

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
    console.log("selectedAddress::", selectedAddress)
    await axios.post("http://localhost:3001/api/customerDetails/saveCustomerAddresses/?userId=" + 29, selectedAddress).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })

  }

  async deleteAddress(id){
    var addresses = this.state.addresses

    var selectedAddress = {}
    for (var address of addresses) {
      if (address._id === id) {
        selectedAddress = address;
      }
    }
    await axios.post("http://localhost:3001/api/customerDetails/deleteCustomerAddress/?userId=" + 29, selectedAddress).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })

  }

  addAddress() {

    var newAddress = {
      _id : undefined,
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

    var data = 29;

    await axios.get("http://localhost:3001/api/customerDetails/getCustomerAddresses/?userId=" + data).then((res) => {

      console.log("addresses::", res.data)
      this.setState({
        addresses: res.data
      })
    })

  }

  async cancelAddress(){
    var data = 29;

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
                        <input style={{ width: "90%" }} type="text" defaultValue={address.state} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "state")} />
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
                        <input style={{ width: "90%" }} type="text" defaultValue={address.zip_code} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "zip_code")} />
                      </div>
                      <p style={{ marginBottom: "0px", marginTop: "3px" }}> Phone Number </p>
                      <div className="form-group">
                        <input style={{ width: "90%" }} type="text" defaultValue={address.phoneNo} disabled={!address.editFlag} onChange={e => this.handleChange(e, address._id, "phoneNo")} />
                      </div>
                    </div>


                  </div>
                  <button hidden={!address.editFlag} className = "Amazon" onClick={e => this.cancelAddress()} style={{ float: "right", marginBottom: "5px",width:"60px" }}> Cancel
                  </button>
                  <button hidden={!address.editFlag} className = "Amazon" onClick={e => this.saveAddress(address._id)} style={{ float: "right", marginBottom: "5px",marginRight:"5px",width:"50px" }}> Save
                  </button>

                  
                </div>

              </div>
            </div>
          

      )
    })

    return (
      <div style={{ marginTop: "50px" }}>
        <h4>Your payment options</h4>
        <div className="auth-wrapper">
            <div className="auth-inner">
        {customerAddresses}

        <button  className = "Amazon" style = {{width:"130px"}}onClick={e => this.addAddress()}> Add Address
                  </button>
      </div >
      </div>
      </div>
    )
  }

}