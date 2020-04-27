import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "../product-module/product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import $ from "jquery";
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';

export default class SearchProduct extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      sellers: [],
      searchCategory: "All",
      searchTerm: "",
      rating:4.3
    };
    this.viewSeachResults = this.viewSeachResults.bind(this);
    this.scroll = this.scroll.bind(this);
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }
  scroll(direction, id) {
    console.log("id here=>" + id);
    let far = ($("#" + id).width() + 25) * direction;
    let pos = $("#" + id).scrollLeft() + far;
    $("#" + id).animate({ scrollLeft: pos }, 100);
  }

  async componentDidMount() {
    console.log("state=>"+this.state.searchCategory);
    await this.viewSeachResults();
  }

  async viewSeachResults() {
    const payload = {
      searchTerm: this.state.searchTerm,
      searchCategory: this.state.searchCategory,
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

  render() {
    let sellerProducts = this.state.products.map((sellerProduct) => {
      return (
        <div className="col-md-3" style={{ margin: 5 }}>
          <div className="ui card">
            {/* <div className="image"> */}
            <div className="row" style={{ margin: 10 }}>
              <div className="col-md-1" style={{ paddingTop: "50px" }}>
                <a
                  className="prev"
                  onClick={this.scroll.bind(null, -1, sellerProduct._id)}
                >
                  &#10094;
                </a>
              </div>
              <div className="col-md-8">
                <div className="image-container" id={sellerProduct._id}>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-1" style={{ paddingTop: "50px" }}>
                <a
                  className="next"
                  onClick={this.scroll.bind(null, 1, sellerProduct._id)}
                >
                  &#10095;
                </a>
              </div>
            </div>
            <div className="content">
              <div
                className="row"
                style={{
                  fontWeight: "bold",
                  fontSize: "20",
                  margin: 10,
                  textAlign: "center",
                }}
              >
                {sellerProduct.productName}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                {sellerProduct.productDesc}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                ${sellerProduct.price}
              </div>
              <div className="row" style={{margin:10}}>
              <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          changeRating={this.changeRating.bind(this)}
          starDimension="20px"
        starSpacing="6px"
          numberOfStars={5}
          name='rating'
        />
              </div>
            </div>
            <hr style={{ height: "2px", backgroundColor: "gray" }}></hr>
            <div className="extra content">
              <a href="#" style={{ fontSize: "15" }}>
                View Product
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
                <br></br>
              <div className="input-group">
                
                <select
                    style={{
                      width: `${8*this.state.searchCategory.length + 50}px`,
                      height: "30px",
                      backgroundColor: "#e7eae8",
                    }}
                    // role="menu"
                    onChange={(e) => {
                      this.changeHandler(e);
                    }}
                  >
                    <option value="ALL">All</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                <input
                  type="text"
                  onChange={(e) => {
                    this.changeHandlerTerm(e);
                  }}
                //   className="form-control"
                  name="x"
                  id="search"
                  placeholder="Search"
                  style={{
                    width: `${
                      500 - 8 * this.state.searchCategory.length + 30
                    }px`,
                  }}
                ></input>
                {/* <span className="input-group-btn"> */}
                  <button
                    className="btn btn-default"
                    type="button"
                    height="40px"
                    onClick={(e) => {
                      this.viewSeachResults();
                    }}
                  >
                    Search
                  </button>
                {/* </span> */}
              </div>
            </div>
          </div>
          <br></br>
                <br></br>
                <br></br>
          <div className="row">{sellerProducts}</div>
        </div>
      </div>
    );
  }
}
