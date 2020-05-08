import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

export default class addressSelect extends Component {
  constructor() {
    super();
    this.state = {
      userId: 22,
      addresses: [],
      selectedAddress: {},
    };
  }

  async componentDidMount() {
    let id = localStorage.getItem("id");
    this.setState({
      userId:id
    })
    let userId = id;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
      .get(
        "http://localhost:3001/api/customerDetails/getCustomerAddresses/?userId=" +
          userId
      )
      .then((res) => {
        console.log("addresses::", res.data);
        this.setState({
          addresses: res.data,
        });
      });
  }
  selectAddress = async (address) => {
    await this.setState({
      selectedAddress: address,
    });
    localStorage.setItem("selectedAddress",JSON.stringify(address));
    console.log("localsss=>"+localStorage.getItem("selectedAddress"));
    console.log(
      "this.state.address=>" + JSON.stringify(this.state.selectedAddress)
    );
    await this.setState({ redirect: `/selectCard` });
  };

  changeHandler(event, name) {
    console.log("=====?" + event.target.value);
    let add = this.state.selectedAddress;
    add[name] = event.target.value;
    this.setState({
      selectedAddress: add,
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let addressDiv = this.state.addresses.map((address) => {
      return (
        <div className="col-md-4">
          <div className="row" style={{ fontWeight: "bold", fontSize: "20px" }}>
            {address.name}
          </div>
          <div className="row" style={{ fontSize: "15px" }}>
            {address.street1},{address.street2}
          </div>

          <div className="row" style={{ fontSize: "15px" }}>
            {address.city},{address.state}
          </div>
          <div className="row" style={{ fontSize: "15px" }}>
            {address.country}, {address.zip_code}
          </div>
          <div className="row" style={{ fontSize: "15px" }}>
            Phone: {address.phoneNo}
          </div>
          <br></br>
          <div className="row">
            <button
              className="Amazon"
              onClick={(e) => this.selectAddress(address)}
              style={{ height: "30px", padding: "0px", width: "200px" }}
            >
              Deliver to this address
            </button>
          </div>
          <br></br>
        </div>
      );
    });
    return (
      <div style={{ margin: "100px", marginTop: "60px" }}>
        <div className="row shippingSelect">Select a shipping address</div>
        <br></br>
        <div className="row deliveryMessage">
          Is the address you'd like to use displayed below? If so, click the
          corresponding "Deliver to this address" button. Or you can enter a new
          shipping address.
        </div>
        <br></br>
        <div className="row pickupheading">
          Or ship to an Amazon Pickup location
        </div>
        <div className="row deliveryMessage">
          Amazon Pickup locations offerpackage pickup at self-service Amazon
          Lockers and at staffed locations. Search for an Amazon Pickup location
          near you
        </div>
        <hr style={{ marginLeft: "-20px" }}></hr>
        <div className="row">{addressDiv}</div>

        <div className="row">
          <div className="col-md-8">
            <div className="row addAddressHeading">Add a new Address</div>
            <br></br>
            <div className="row">Full Name:</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "name")}
              ></input>
            </div>
            <div className="row">Address Line 1:</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "street1")}
              ></input>
            </div>
            <div className="row">Address Line 2:</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "street2")}
              ></input>
            </div>
            <div className="row">City:</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "city")}
              ></input>
            </div>
            <div className="row">State/Province/Region</div>

            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "state")}
              ></input>
            </div>
            <div className="row">ZIP:</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "zip_code")}
              ></input>
            </div>
            <div className="row">Country</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "country")}
              ></input>
            </div>
            <div className="row">Phone Number</div>
            <div className="row">
              <input
                type="text"
                style={{
                  width: "50%",
                  margin: " 8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc !important",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => this.changeHandler(e, "phoneno")}
              ></input>
            </div>
            <br></br>
            <div className="row">
              <button
                className="Amazon"
                onClick={(e) => this.selectAddress(this.state.selectedAddress)}
                style={{ height: "30px", padding: "0px", width: "200px" }}
              >
                Deliver to this address
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
