import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Form, Button, FormGroup } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import Env from "../../helpers/Env";
import StarRatings from "react-star-ratings";

// import "../admin/InventoryListings.css";
import { List } from "semantic-ui-react";

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: {},
      productsAvailable: false,
      dialogueOpen: false,
      categoryName: "",
      products: [],
    };
  }

  getProductsBySeller = async () => {
    // localhost: 3001 / api / admin / products - by - seller / 33;
    await axios
      .get(
        `${Env.host}/api/admin/products-by-seller/${this.props?.location?.sellerId}`
      )
      .then(async (res) => {
        for (var i in res.data) {
          await axios
            .get(
              `http://localhost:3001/api/seller/profile/${res.data[i].sellerId}`
            )
            .then((seller) => {
              res.data[i].sellerName = seller.data.sellerName;
            });
        }
        console.log("response after seller name is::", res);
        this.setState({
          products: res.data,
        });
      });
  };

  componentDidMount() {
    this.getProductsBySeller();
  }

  render() {
    let products = "";
    // if (this.state.productsAvailable) {
    // console.log("enetered iff in ");
    products = this.state?.products?.map((sellerProduct) => {
      return (
        <div className="col-md-3" style={{ margin: 5 }}>
          <div className="ui card">
            {/* <div className="image"> */}
            <div className="row" style={{ margin: 10 }}>
              {/* <div className="col-md-1" style={{ paddingTop: "50px" }}>
                  <a
                    className="prev"
                    onClick={this.scroll.bind(null, -1, sellerProduct._id)}
                  >
                    &#10094;
                  </a>
                </div> */}
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
              {/* <div className="col-md-1" style={{ paddingTop: "50px" }}>
                  <a
                    className="next"
                    onClick={this.scroll.bind(null, 1, sellerProduct._id)}
                  >
                    &#10095;
                  </a>
                </div> */}
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
                Seller: {sellerProduct.sellerName}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                {sellerProduct.productDesc}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                ${sellerProduct.price}
              </div>
              {/* <div className="row" style={{ margin: 10 }}>
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="yellow"
                    changeRating={this.changeRating.bind(this)}
                    starDimension="20px"
                    starSpacing="6px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div> */}
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
    // }

    return (
      <React.Fragment>
        <div className="auth-inner">
          <h3>Products by {this.props.location.sellerName}</h3>
          {products}
        </div>

        {/* <h1>Hi</h1> */}
        {/* <div className="row">
          {!!this.state?.productsAvailable && products ? (
            <div className="row">{products}</div>
          ) : (
            <h1 className="product-unavailable">
              This category has no products
            </h1>
          )}
        </div> */}
      </React.Fragment>
    );
  }
}

export default ProductView;
