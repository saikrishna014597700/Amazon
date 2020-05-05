import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "../product-module/product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import StarRatings from "react-star-ratings";
import StarRatingComponent from "react-star-rating-component";
import { Redirect } from "react-router";

export default class SearchProduct extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      sellers: [],
      searchCategory: "All",
      searchTerm: "",
      rating: 4.3,
    };
    this.viewSeachResults = this.viewSeachResults.bind(this);
    // this.scroll = this.scroll.bind(this);
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  changeRating(newRating, name) {
    this.setState({
      rating: newRating,
    });
  }

  async componentDidMount() {
    console.log("state=>" + this.state.searchCategory);
    await this.setState({
      searchTerm: this.props.match.params.searchTerm,
    });
    console.log("here in search==>" + this.state.searchTerm);
    await this.viewSeachResults();
  }

  async viewSeachResults() {
    const payload = {
      searchTerm: this.state.searchTerm,
      searchCategory: this.state.searchCategory,
      limit: 10,
      page: 1,
    };
    axios
      .post("http://localhost:3001/api/common/search/", payload)
      .then((response) => {
        console.log("Pro are::", response);
        this.setState({
          products: response.data,
        });
      });
  }
  async changeHandler(e) {
    console.log("value selected =>" + e.target.value);
    await this.setState({
      searchCategory: e.target.value,
    });
  }

  async changeHandlerTerm(e) {
    console.log("value selected =>" + e.target.value);
    await this.setState({
      searchTerm: e.target.value,
    });
  }

  viewProduct = (product) => {
    this.setState({
      redirect: `/product/${product._id}`,
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let sellerProducts = this.state.products.map((sellerProduct) => {
      return (
        <div className="col-md-3" style={{ margin: 5 }}>
          <div className="row" style={{ margin: 10 }}>
            <img
              src={require("../../utils/product.jpg")}
              style={{ height: "250px" }}
            />
          </div>
          <div
            className="row"
            style={{
              fontWeight: "bold",
              fontSize: "20",
              margin: 10,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={(e)=>this.viewProduct(sellerProduct)}
          >
            {sellerProduct.productName}
          </div>
          <div className="row" style={{ margin: 10, textAlign: "center" }}>
            {sellerProduct.productDesc}
          </div>
          <div className="row" style={{ margin: 10, textAlign: "center" }}>
            ${sellerProduct.price}
          </div>
          <div className="row" style={{ margin: 10 }}>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="yellow"
              changeRating={this.changeRating.bind(this)}
              starDimension="20px"
              starSpacing="6px"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <hr style={{ height: "1px", backgroundColor: "gray" }}></hr>
        </div>
      );
    });
    return (
      <div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <br></br>
            <hr
              style={{
                height: "1px",
                backgroundColor: "gray",
                marginRight: "30px",
              }}
            ></hr>
            <div className="row">{sellerProducts}</div>
          </div>
        </div>
      </div>
    );
  }
}
