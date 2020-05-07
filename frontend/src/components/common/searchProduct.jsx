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
      rating: 0,
      sort: "",
    };
    this.viewSeachResults = this.viewSeachResults.bind(this);
    // this.scroll = this.scroll.bind(this);
  }
  async sortChange(e) {
    await this.setState({
      sort: e.target.value,
    });
    this.viewSeachResults();
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
    // console.log("state=>" + this.state.searchCategory);
    await this.setState({
      searchTerm: this.props.match.params.searchTerm,
    });
    // console.log("here in search==>" + this.state.searchTerm);
    await this.viewSeachResults();
  }

  async viewSeachResults() {
    const payload = {
      searchTerm: this.state.searchTerm,
      searchCategory: this.state.searchCategory,
      limit: 10,
      page: 1,
      rating: this.state.rating,
      sort: this.state.sort,
    };
    console.log("payload before search=>",payload)
    await axios
      .post("http://localhost:3001/api/common/search/", payload)
      .then(async (response) => {
        console.log("Pro are::", response);
        let len = response.data.length;
        for (var i = 0; i < len; i++) {
          await axios
            .get(
              `http://localhost:3001/api/seller/profile/${response.data[i].sellerId}`
            )
            .then((seller) => {
              // console.log("each seller name=>" + seller.data.sellerName);
              response.data[i].sellerName = seller.data.sellerName;
            });
        }
        await this.setState({
          products: response.data,
        });
      });

  }
  async changeHandler(e) {
    await this.setState({
      searchCategory: e.target.value,
    });
  }
  ratingFilter = async (rating) => {
    const payload = {
      searchTerm: this.state.searchTerm,
      searchCategory: this.state.searchCategory,
      limit: 10,
      page: 1,
      rating: rating,
      sort: this.state.sort,
    };
    await axios
      .post("http://localhost:3001/api/common/search/", payload)
      .then(async (response) => {
        let len = response.data.length;
        for (var i = 0; i < len; i++) {
          await axios
            .get(
              `http://localhost:3001/api/seller/profile/${response.data[i].sellerId}`
            )
            .then((seller) => {
              response.data[i].sellerName = seller.data.sellerName;
            });
        }
        await this.setState({
          products: response.data,
        });
      });
  };

  async changeHandlerTerm(e) {
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
    let sortAndFilter = (
      <div style={{ marginLeft: "15px" }}>
        <div className="row" style={{ fontWeight: "bold" }}>
          Filter by rating
        </div>
        <div
          className="row"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.ratingFilter(4)}
        >
          <StarRatings
            rating={4}
            starRatedColor="yellow"
            starDimension="20px"
            starSpacing="6px"
            numberOfStars={5}
            name="rating"
          />
          &nbsp;& up
        </div>
        <div
          className="row"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.ratingFilter(3)}
        >
          <StarRatings
            rating={3}
            starRatedColor="yellow"
            starDimension="20px"
            starSpacing="6px"
            numberOfStars={5}
            name="rating"
          />
          &nbsp;& up
        </div>
        <div
          className="row"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.ratingFilter(2)}
        >
          <StarRatings
            rating={2}
            starRatedColor="yellow"
            starDimension="20px"
            starSpacing="6px"
            numberOfStars={5}
            name="rating"
          />
          &nbsp;& up
        </div>
        <div
          className="row"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.ratingFilter(1)}
        >
          <StarRatings
            rating={1}
            starRatedColor="yellow"
            starDimension="20px"
            starSpacing="6px"
            numberOfStars={5}
            name="rating"
          />
          &nbsp;& up
        </div>
      </div>
    );
    let sellerProducts = this.state.products.map((sellerProduct) => {
      return (
        <div
          className="col-md-3"
          style={{
            margin: 5,
            broder: "1",
            borderStyle: "solid",
            borderColor: "#efefef",
          }}
        >
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
            onClick={(e) => this.viewProduct(sellerProduct)}
          >
            {sellerProduct.productName}
          </div>
          <div className="row" style={{ margin: 10, width: "100%" }}>
            <a href={"/sellerProfile/" + sellerProduct.sellerId}>
              {sellerProduct.sellerName}
            </a>
          </div>
          <div className="row" style={{ margin: 10, textAlign: "center" }}>
            {sellerProduct.productDesc}
          </div>
          <div className="row" style={{ margin: 10, textAlign: "center" }}>
            ${sellerProduct.price}
          </div>
          <div className="row" style={{ margin: 10 }}>
            <StarRatings
              rating={sellerProduct.avgRating}
              starRatedColor="yellow"
              starDimension="20px"
              starSpacing="6px"
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="row">
          <div
            className="col-md-2"
            style={{
              marginTop: "20px",
              borderRight: "1px",
              borderRightStyle: "solid",
              borderRightColor: "#efefef",
            }}
          >
            {sortAndFilter}
          </div>
          <div className="col-md-10">
            <br></br>
            <div className="row">
              <div className="col-md-9"></div>
              <select onChange={(e) => this.sortChange(e)}>
                <option value="priceLow">price low to high</option>
                <option value="priceHigh">price High to low</option>
                <option value="ratingLow">rating low to high</option>
                <option value="ratingHigh">rating High to low</option>
              </select>
            </div>

            <br></br>
            <div className="row">{sellerProducts}</div>
          </div>
        </div>
      </div>
    );
  }
}
