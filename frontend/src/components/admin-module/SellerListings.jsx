import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./InventoryListings.css";
import Env from "../../helpers/Env";
import { Redirect } from "react-router";

class SellerListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sellers: [], searchTerm: "" };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  searchOnChangeHandle = () => {
    this.getAllSellers();
  };

  getAllSellers = () => {
    axios
      .get(
        `${Env.host}/api/admin/all-sellers?searchTerm=${this.state.searchTerm}`
      )
      .then((res) => {
        if (res.data.result.length > 0) {
          this.setState({ sellers: res.data.result });
        } else {
          alert("Give a precise seller name");
        }
      });
    console.log("Sellers are", this.state.sellers);
  };

  componentDidMount() {
    this.getAllSellers();
  }
  render() {
    let redirectVar = null;
    if(!localStorage.getItem("id")){
      redirectVar = <Redirect to= "/login"/>
  }else{
    if(localStorage.getItem("role") != "Admin"){
      redirectVar = <Redirect to= "/login"/>
    }
  }
    let sellerListings = this.state?.sellers?.map((seller) => {
      console.log("Seller is", seller);
      let imagePath;

      if (seller.imagePath === undefined) {
        imagePath = (
          <div className="image">
            <img
              src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
              style={{ height: "150px", width: "150px" }}
            />
          </div>
        );
      } else {
        console.log("image exists for seller");
        imagePath = (
          <div className="image">
            <img
              src={seller.imagePath}
              style={{ height: "150px", width: "150px" }}
            />
          </div>
        );
      }
      return (
        <div>
          <section className="card">
            <div className="row">
              <div className="col-3">{imagePath}</div>
              <div className="col">
                <section>
                  <Link
                    className="amazon-link"
                    to={{
                      pathname: "/product-view",
                      sellerId: seller.userId,
                      sellerName: seller.sellerName,
                      // prevPathName: this?.props?.location?.pathname,
                    }}
                  >
                    {" "}
                    <h4>{seller.sellerName}</h4>
                  </Link>

                  <div>from {seller.sellerAddress?.city}</div>
                </section>
              </div>
            </div>
          </section>
        </div>
      );
    });

    return (
      <div className="seller-listings">
        <h3>Seller Listings</h3>
        <br />
        <div className="row">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Group
              controlId="exampleForm.ControlInput5"
              className="float-left"
            >
              <Form.Control
                type="text"
                className="search-input"
                name="searchTerm"
                style={{
                  width: "480px",
                  height: "40px",
                  marginLeft: "20px",
                  float: "left",
                }}
                placeholder="Search Seller by full name..."
                autoComplete="off"
                onKeyUp={this.onKeyUp}
                onChange={this.handleOnChange}
              />
            </Form.Group>{" "}
            <div className="apply-btn-container float-left">
              <button
                className="Amazon"
                style={{
                  width: "230px",
                  height: "40px",
                  marginLeft: "20px",
                  float: "right",
                }}
                onClick={this.searchOnChangeHandle}
              >
                {" "}
                Search
              </button>
            </div>
          </Form>
        </div>
        {redirectVar}
        {sellerListings}
        {/* {this.state?.sellers?.map((seller) => (
          <section className="card">
            <div className="row">
              <div className="col-3">
                <br />
                <div className="image">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    style={{ maxWidth: "100%", marginLeft: "20px" }}
                  />
                </div>
                <br />
                <br />
              </div>
              <div className="col">
                <br />
                <section>
                  <Link
                    className="amazon-link"
                    to={{
                      pathname: "/product-view",
                      sellerId: seller.userId,
                      sellerName: seller.sellerName,
                      // prevPathName: this?.props?.location?.pathname,
                    }}
                  >
                    {" "}
                    <h4>{seller.sellerName}</h4>
                  </Link>

                  <div>from {seller.sellerAddress?.city}</div>
                </section>
                <br />
              </div>
            </div>
          </section>
        ))} */}
      </div>
    );
  }
}

export default SellerListings;
