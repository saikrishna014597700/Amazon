import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

import "./seller.css";
import Env from "../../helpers/Env";

class SelerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: 40,
      role: "Seller",
      sellerName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      sellerProfile: {},
      editMode: false,
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  showEditForm = () => {
    this.setState({
      editMode: true,
    });
  };

  noShowEditForm = () => {
    this.setState({
      editMode: false,
    });
  };

  updateProfile = () => {
    const data = {
      sellerName: !!this.state?.sellerName
        ? this.state?.sellerName
        : this.state?.sellerProfile.sellerName,

      sellerAddress: {
        street: !!this.state?.street
          ? this.state?.street
          : this.state?.sellerProfile.street,

        city: !!this.state?.city
          ? this.state?.city
          : this.state?.sellerProfile.city,

        state: !!this.state?.state
          ? this.state?.state
          : this.state?.sellerProfile.state,

        zip_code: !!this.state?.zipCode
          ? this.state?.zipCode
          : this.state?.sellerProfile.zip_code,
      },
    };
    console.log("data before axios put::", data);
    axios
      .put(`${Env.host}/api/seller/updateProfile/${this.state.sellerId}`, data)
      .then(async (res) => {
        this.setState({
          sellerProfile: res.data,
          editMode: false,
        });
        console.log("new seller::::", res);
        // this.getSellerProfile(this.state.sellerId);
      });
  };

  getSellerProfile = (sellerId) => {
    axios
      .get(`${Env.host}/api/seller/profile/${sellerId}`)
      .then(async (res) => {
        console.log("seller::::", res);
        this.setState({
          sellerProfile: res.data,
        });
      });
  };

  componentDidMount() {
    this.getSellerProfile(this.state.sellerId);
  }

  render() {
    return (
      <div className="seller-profile">
        <h3>SelerProfile</h3>
        {!!this.state.editMode ? (
          <div>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Seller Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state?.sellerProfile?.sellerName}
                  placeholder="Enter name here.."
                  name="sellerName"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>street</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={
                    this.state?.sellerProfile?.sellerAddress?.street
                  }
                  placeholder="street"
                  name="street"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>city</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state?.sellerProfile?.sellerAddress?.city}
                  placeholder="city"
                  name="city"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>state</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state?.sellerProfile?.sellerAddress?.state}
                  placeholder="state"
                  name="state"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={
                    this.state?.sellerProfile?.sellerAddress?.zip_code
                  }
                  placeholder="zipCode"
                  name="zipCode"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Form>
            <button
              className="Amazon"
              style={{ width: "130px" }}
              onClick={(e) => this.updateProfile()}
            >
              {" "}
              Save
            </button>{" "}
            <button
              className="Amazon"
              style={{ width: "130px" }}
              onClick={(e) => this.noShowEditForm()}
            >
              {" "}
              Cancel
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-3">
              <div className="image">
                <img
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
            <div className="col-6">
              <section>
                <div>Name: {this.state?.sellerProfile?.sellerName}</div>
                <div>
                  Street: {this.state?.sellerProfile?.sellerAddress?.street}
                </div>
                <div>
                  City: {this.state?.sellerProfile?.sellerAddress?.city}
                </div>
                <div>
                  State: {this.state?.sellerProfile?.sellerAddress?.state}
                </div>
                <div>
                  Zip Code: {this.state?.sellerProfile?.sellerAddress?.zip_code}
                </div>
              </section>
            </div>
            <div className="col">
              {" "}
              {"Seller" === this.state?.role ? (
                <button
                  className="Amazon"
                  style={{ width: "130px" }}
                  onClick={(e) => this.showEditForm()}
                >
                  {" "}
                  Edit
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SelerProfile;
