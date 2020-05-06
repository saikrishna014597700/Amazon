import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { Redirect } from "react-router";

const productImage = require("../../utils/product.jpg");
const product2Image = require("../../utils/product2.jpg");
const product3Image = require("../../utils/product3.jpg");
const product4Image = require("../../utils/product4.jpg");
export default class productDescription extends Component {
  constructor() {
    super();
    this.state = {
      userId:22,
      product: {
        productImages:[]
      },
      productId: "5e9d9d90278fd64044dc6945",
      rating: 4.5,
      selectedImage: productImage,
    };
    this.addToCart = this.addToCart.bind(this);
  }
  goToCart = (event, pid, orderId) => {
    
  };
  addToCart = async () => {
    let cartSize = 0;
    console.log("inside add to cart method");
    let payload = {
      userId: this.state.userId,
      productId: this.state.productId,
    };
    let finalQuantity = 1;
    await axios
      .post("http://localhost:3001/api/cart/getCart/", payload)
      .then((response) => {
        if (response) {
          console.log("cart is => ", JSON.stringify(response));
          console.log("data size is =>" + response.data.length);
          if (response.data.length != 0) {
            let quantity = response.data[0].quantity;
            finalQuantity = quantity + 1;
            cartSize=response.data.length;
          }
        }
      });
    console.log("quantity in add to cart=>" + finalQuantity);
    payload = {
      userId: this.state.userId,
      productId: this.state.productId,
      quantity: finalQuantity,
    };

    if (finalQuantity == 1) {
        await axios
        .post("http://localhost:3001/api/cart/addToCart/", payload)
        .then((res) => {
          if (res) {
            console.log("response in add to cart =>", JSON.stringify(res));
          }
        });

    } else {
      await axios
        .post("http://localhost:3001/api/cart/updateCart/", payload)
        .then((res) => {
          if (res) {
            console.log("response in add to cart =>", JSON.stringify(res));
          }
        });
    }
    localStorage.setItem("cartSize",cartSize+1);
    await this.setState({ redirect: `/cart` });
  };
  async componentDidMount() {
    var id = localStorage.getItem("id");
    if(id)
    {
      console.log("in this id=>"+id);
      this.setState({
        userId : id
      })
    }
    
    var productID = this.props.match.params.id;
    if(productID){
      console.log("halwe=>"+productID)
     await this.setState({
        productId : productID
      })
    }
    console.log("inside componentdidmount=>"+this.state.productId);
    axios
      .get(
        "http://localhost:3001/api/product/getProductDetails/?productId=" +
          this.state.productId
      )
      .then(async (response) => {
        console.log(
          "response for product details=>" + JSON.stringify(response)
        );
        await this.setState({
          product: response.data[0],
          selectedImage :response.data[0].productImages[0]
        });
        console.log("this state =>" + JSON.stringify(this.state.product));
      });
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  changeRating(newRating, name) {
    this.setState({
      rating: newRating,
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let product = this.state.product;
    console.log("the product inside render=>" + JSON.stringify(product));
    let productDescription = (
      <div style={{ width: "400px", height: "650px" }}>
        <div
          className="row"
          id="productName"
          style={{ fontSize: "21px", color: "black" }}
        >
          {product.productName}
          <StarRatings
            rating={this.state.rating}
            starRatedColor="#febe62"
            changeRating={this.changeRating.bind(this)}
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

    let imagesHTML

    if(this.state.product.productImages.length === 0){
      imagesHTML= (
        <div>
        <div className="row">
          <img
            src={productImage}
            style={{ width: "50px", height: "65px", cursor: "pointer" }}
            onClick={() => {
              this.setState({ selectedImage: productImage });
            }}
          ></img>
        </div>
        <br></br>
        <div className="row">
          <img
            src={product2Image}
            style={{ width: "50px", height: "65px", cursor: "pointer" }}
            onClick={() => {
              this.setState({ selectedImage: product2Image });
            }}
          ></img>
        </div>
        <br></br>
        <div className="row">
          <img
            src={product3Image}
            style={{ width: "50px", height: "65px", cursor: "pointer" }}
            onClick={() => {
              this.setState({ selectedImage: product3Image });
            }}
          ></img>
        </div>
        <br></br>
        <div className="row">
          <img
            src={product4Image}
            style={{ width: "50px", height: "65px", cursor: "pointer" }}
            onClick={() => {
              this.setState({ selectedImage: product4Image });
            }}
          ></img>
        </div>
        </div>
      )
      
    }else{
      imagesHTML = this.state.product.productImages.map((image)=>{
        return(
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

        )
      })


    }

    let images = (
      <div style={{ height: "650px " }}>
        {imagesHTML}
        <br></br>
        <div className="row">
          <img
            src={productImage}
            style={{ width: "50px", height: "65px", cursor: "pointer" }}
          ></img>
        </div>
      </div>
    );

    let deliveryOptions = (
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
                  <a href="#"> Deliver to San Jose 95126</a>
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
    return (
      <div className="row">
        <div className="card" style={{ width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "5%" }}></td>
              <td style={{ width: "20%" }}>{images}</td>
              <td style={{ width: "25%" }}>
                <img
                  src={this.state.selectedImage}
                  style={{
                    width: "500px",
                    height: "650px",
                    marginRight: "20px",
                  }}
                ></img>
              </td>
              <td style={{ width: "25%" }}>{productDescription}</td>
              <td style={{ width: "25%" }}>{deliveryOptions}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
