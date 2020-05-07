import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { Redirect } from "react-router";

const productImage = require("../../utils/product.jpg");
const product2Image = require("../../utils/product2.jpg");
const product3Image = require("../../utils/product3.jpg");
const product4Image = require("../../utils/product4.jpg");
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export default class productDescription extends Component {
  constructor() {
    super();
    this.state = {
      userId: 22,
      product: {
        productImages: [],
      },
      productId: "",
      rating: 4.5,
      reviews: [],
      selectedImage: productImage,
      newRating: 0,
      quantity: 1,
    };
    this.userReview = {};
    this.reviewSuccess = {};
    this.addToCart = this.addToCart.bind(this);
  }

  async componentDidMount() {
    var id = localStorage.getItem("id");
    if (id) {
      // console.log("in this id=>" + id);
      this.setState({
        userId: id,
      });
    }

    var productID = this.props.match.params.id;
    if (productID) {
      // console.log("halwe=>" + productID);
      await this.setState({
        productId: productID,
      });
    }
    // console.log("inside componentdidmount=>" + this.state.productId);
    axios
      .get(
        "http://localhost:3001/api/product/getProductDetails/?productId=" +
          this.state.productId
      )
      .then(async (response) => {
        console.log(
          "response for product details=>" + JSON.stringify(response)
        );
        var defaultPath =
          "https://react.semantic-ui.com/images/avatar/large/matthew.png";
        if (response.data[0].productImages[0]) {
          defaultPath = response.data[0].productImages[0];
        }
        await this.setState({
          product: response.data[0],
          selectedImage: defaultPath,
        });
        // console.log("response.data[0].sellerId=>", response.data[0].sellerId);
        await axios
          .get(
            `http://localhost:3001/api/seller/profile/${response.data[0].sellerId}`
          )
          .then((seller) => {
            // console.log("seller Idddd=>", seller);
            response.data[0].sellerName = seller.data.sellerName;
          });
        // console.log(
        // "response for product details=>" + JSON.stringify(response)
        // );
        let reviews = response.data[0].reviewAndRatings;
        await reviews.forEach(async (review) => {
          await axios
            .post(
              "http://localhost:3001/api/customerDetails/getCustomerDetails/?userId=" +
                review.userId
            )
            .then((res) => {
              console.log("reviews::", res.data);
              review.username = res.data.firstName;
            });
        });
        // console.log("reviews:::", reviews);
        sleep(500).then(() => {
          // this.getAllDetails();
          this.setState({
            product: response.data[0],
            reviews: reviews,
          });
          // console.log("this state =>" + JSON.stringify(this.state));
        });
      });
    sleep(1000).then(() => {
      this.updateViewCount();
    });
  }

  goToCart = (event, pid, orderId) => {};
  addToCart = async () => {
    let cartSize = 0;
    let payload = {
      userId: this.state.userId,
      productId: this.state.productId,
    };
    let finalQuantity = this.state.quantity;
    let productExists = false;
    await axios
      .post("http://localhost:3001/api/cart/getCart/", payload)
      .then((response) => {
        console.log("in get cart response", response);
        if (response) {
          if (response.data.length != 0) {
            productExists = true;
            let quantity = response.data[0].quantity;
            finalQuantity =
              parseInt(quantity, 10) + parseInt(this.state.quantity, 10);
            cartSize = response.data.length;
          }
        }
      });
    console.log("final quantity now =>" + finalQuantity);
    payload = {
      userId: this.state.userId,
      productId: this.state.productId,
      quantity: finalQuantity,
    };

    if (!productExists) {
      await axios
        .post("http://localhost:3001/api/cart/addToCart/", payload)
        .then((res) => {
          if (res) {
          }
        });
    } else {
      await axios
        .post("http://localhost:3001/api/cart/updateCart/", payload)
        .then((res) => {
          if (res) {
          }
        });
    }
    localStorage.setItem("cartSize", cartSize + 1);
    await this.setState({ redirect: `/cart` });
  };
  async updateViewCount() {
    var payload = {
      productId: this.state.productId,
      productName: this.state.product.productName,
    };
    console.log("view count payload=>", this.state.product);
    axios
      .post("http://localhost:3001/api/product/updateViewCount", payload)
      .then((response) => {
        console.log("view added");
      });
  }

  quantityChangeHandler = async (product, e) => {
    let quantity = e.target.value;
    await this.setState({
      quantity: quantity,
    });
  };

  changeRating(newRating, name) {
    this.setState({
      newRating: newRating,
    });
  }
  addReview = () => {
    // console.log("this user review=>"+this.userReview.value);
    let payLoad = {
      userId: this.state.userId,
      productId: this.state.productId,
      rating: this.state.newRating,
      review: this.userReview.value,
    };

    axios
      .post("http://localhost:3001/api/product/addRatingAndReview", payLoad)
      .then(async (response) => {
        console.log("the response after adding the review is =>", response);
        if (response.status == 201) {
          this.userReview.innerHTML = "";
          this.userReview.value = "";
          this.reviewSuccess.style.display = "block";
          sleep(3000).then(() => {
            this.reviewSuccess.style.display = "none";
          });
          await axios
            .get(
              "http://localhost:3001/api/product/getProductDetails/?productId=" +
                this.state.productId
            )
            .then(async (res) => {
              await this.setState({
                reviews: res.data[0].reviewAndRatings,
              });
            });
        }
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let reviewAndRatingsDiv = this.state.reviews.map((review) => {
      let rating;
      if (review.rating) {
        rating = (
          <StarRatings
            rating={review.rating}
            starRatedColor="#febe62"
            starDimension="15px"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
          />
        );
      }
      return (
        <div
          style={{
            margin: "15px",
            border: "1px",
            borderStyle: "solid",
            borderColor: "#efefef",
          }}
        >
          <div
            className="row"
            style={{
              marginLeft: "0px",
              // marginTop: "5px",
              marginBottom: "15px",
              backgroundColor: "#e7eae8",
              width: "100%",
              border: "1px",
              borderStyle: "solid",
              borderColor: "#efefef",
            }}
          >
            {/* <div className="col-md-1"></div> */}
            {review.username}
          </div>
          {/* <hr></hr> */}
          <div
            className="row"
            style={{ marginLeft: "15px", marginTop: "-10px" }}
          >
            {rating}
          </div>
          <div className="row" style={{ marginLeft: "15px" }}>
            {review.review}
          </div>
        </div>
      );
    });

    let addReviewDiv = (
      <div style={{ marginLeft: "35px" }}>
        <div
          style={{ display: "none", fontSize: "10px", color: "green" }}
          ref={(ref) => (this.reviewSuccess = ref)}
        >
          Review added successfully.
        </div>
        <div className="row">
          Rating: &nbsp;&nbsp;
          <StarRatings
            rating={this.state.newRating}
            starRatedColor="#febe62"
            changeRating={this.changeRating.bind(this)}
            starDimension="15px"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
          />
        </div>
        <div className="row">
          Review :
          <textarea
            rows="5"
            cols="40"
            ref={(ref) => (this.userReview = ref)}
          ></textarea>
        </div>
        <br></br>
        <div className="row">
          <button onClick={this.addReview}>Add Review</button>
        </div>
        <br></br>
      </div>
    );

    let product = this.state.product;
    let productDescription = (
      <div style={{ width: "400px", height: "650px" }}>
        <div className="row">
          <a href={"/sellerProfile/" + product.sellerId}>
            {product.sellerName}
          </a>
        </div>
        <div className="row" style={{ fontSize: "21px", color: "black" }}>
          {product.productName}
          <StarRatings
            rating={product.avgRating}
            starRatedColor="#febe62"
            starDimension="15px"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
          />
        </div>
        <hr></hr>
        <div className="row" id="price">
          <div style={{ color: "gray" }}>Price:</div>
          &nbsp; &nbsp;
          <div style={{ color: "#b05753", fontFamily: "sans-serif" }}>
            $&nbsp;{product.price}
          </div>
        </div>
        <br></br>
        <div className="row">
          <p>{product.productDesc}</p>
        </div>
      </div>
    );

    let imagesHTML;

    if (this.state.product.productImages.length === 0) {
      imagesHTML = (
        <div>
          <div className="row">
            <img
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              style={{ width: "50px", height: "65px", cursor: "pointer" }}
              onClick={() => {
                this.setState({ selectedImage: productImage });
              }}
            ></img>
          </div>
          <br></br>
        </div>
      );
    } else {
      imagesHTML = this.state.product.productImages.map((image) => {
        return (
          <div>
            <div className="row">
              <img
                src={image}
                style={{ width: "50px", height: "65px", cursor: "pointer" }}
                onClick={() => {
                  this.setState({ selectedImage: image });
                }}
              ></img>
            </div>
            <br></br>
          </div>
        );
      });
    }

    let images = (
      <div style={{ height: "650px " }}>
        {imagesHTML}
        <br></br>
      </div>
    );

    let deliveryOptions;

    if (localStorage.getItem("role") === "Customer" && product.isDeleted == 0) {
      deliveryOptions = (
        <div style={{ height: "650px" }}>
          <div
            className="card"
            style={{
              alignItems: "center",
              marginLeft: "40px",
              marginRight: "30px",
              padding: "0px",
            }}
          >
            <div
              className="card-body"
              style={{
                padding: "0px",
                paddingTop: "10px",
                width: "150px",
                margin: "0px",
              }}
            >
              <div className="row">
                <div className="col-sm" style={{ width: "100%" }}>
                  <div className="row" style={{ fontSize: "12px" }}>
                    qty: &nbsp;&nbsp;
                    <select
                      onChange={(e) => this.quantityChangeHandler(product, e)}
                      style={{
                        backgroundColor: "#e7eae8",
                        borderRadius: "2px",
                      }}
                      defaultValue={product.quantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  <div className="row" style={{ marginTop: "10px" }}>
                    <button
                      className="AddCart"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        height: "30px",
                      }}
                      onClick={this.addToCart}
                    >
                      Add to cart
                    </button>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <button style={{ width: "100%", height: "30px" }}>
                      {" "}
                      Save for later{" "}
                    </button>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    let reviewAddDiv;
    if (localStorage.getItem("role") === "Customer") {
      reviewAddDiv = (
        <div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            Give rating and review
          </div>
          {addReviewDiv}
        </div>
      );
    }

    return (
      // <div className="row" style={{marginTop:"25px"}}>
      <div className="card" style={{ width: "100%" }}>
        <table style={{ width: "100%", marginTop: "25px" }}>
          <tr>
            <td style={{ width: "5%" }}></td>
            <td style={{ width: "3%" }}>{images}</td>
            <td style={{ width: "30%" }}>
              <img
                src={this.state.selectedImage}
                style={{
                  width: "300px",
                  height: "500px",
                  margin: "20px",
                  // marginLeft:"20px"
                }}
              ></img>
            </td>
            <td style={{ width: "25%" }}>{productDescription}</td>
            <td style={{ width: "25%" }}>{deliveryOptions}</td>
          </tr>
          <tr>
            <td style={{ width: "5%" }}></td>
            <td colSpan="3">
              <div
                // className="row"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Ratings and Reviews
              </div>
              {reviewAndRatingsDiv}
            </td>
          </tr>
          <tr>
            <td></td>
            <td colSpan="3">{reviewAddDiv}</td>
          </tr>
        </table>
      </div>
      // </div>
    );
  }
}
