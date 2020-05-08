import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Form, Button, FormGroup } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { Link } from "react-router-dom";
import Env from "../../helpers/Env";
import StarRatings from "react-star-ratings";

import "./productView.css";

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
      salesSum: "",
      month: "",
      year: "",
      monthlySalesSum: "",
    };
  }

  getProductsBySeller = async () => {
    // localhost: 3001 / api / admin / products - by - seller / 33;
    await axios
      .get(
        `${Env.host}/api/admin/products-by-seller/${this.props?.location?.sellerId}`
      )
      .then(async (res) => {
        console.log("response is::", res);
        if (res.data == "No products in this category") {
          alert("No products in this category");
        } else {
          this.setState({
            products: res.data,
          });
          for (var i in res.data) {
            if (res.data[i].sellerId) {
              await axios
                .get(
                  `http://localhost:3001/api/seller/profile/${res.data[i].sellerId}`
                )
                .then((seller) => {
                  res.data[i].sellerName = seller.data.sellerName;
                });
            }
            console.log("response after seller name is::", res);
          }
        }
      });
    await axios
      .get(
        `http://localhost:3001/api/seller/getTotalSalesSumForSeller/${this.props?.location?.sellerId}`
      )
      .then((response) => {
        console.log("Res isss", response.data[0].sales_sum);
        this.setState({
          salesSum: response.data[0].sales_sum,
        });
      });
  };

  componentDidMount() {
    this.getProductsBySeller();
  }

  async handlemonthlySalesMonth(e) {
    await this.setState({
      month: e.target.value,
    });
  }
  async handlemonthlySalesYear(e) {
    await this.setState({
      year: e.target.value,
    });
  }

  async getMonthWiseSalesSum(e) {
    const data = {
      month: this.state.month,
      year: this.state.year,
    };
    await axios
      .post(
        `http://localhost:3001/api/seller/getMonthWiseSalesSum/${this.props?.location?.sellerId}`,
        data
      )
      .then((response) => {
        console.log("Res isss", response.data);
        if (response.data == "No sales amount in given range") {
          alert("No sales amount in given range");
        } else {
          this.setState({
            monthlySalesSum: response.data[0].sales_sum,
          });
        }
      });
  }

  render() {
    let products = "";
    // if (this.state.productsAvailable) {
    // console.log("enetered iff in ");
    let monthWiseSalesAmount = (
      <div>
        <table>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th></th>
          </tr>
          <tr>
            <td>
              {" "}
              <select
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#e7eae8",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  fontSize: "16px",
                }}
                name="trackingStatus"
                onChange={(e) => this.handlemonthlySalesMonth(e)}
              >
                <option value="">--Select Month--</option>
                <option value="01">Janaury</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </td>
            <td>
              <select
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#e7eae8",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  fontSize: "16px",
                }}
                name="trackingStatus"
                onChange={(e) => this.handlemonthlySalesYear(e)}
              >
                <option value="">--Select Year--</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </td>
            <td>
              <button
                className="Amazon"
                style={{
                  width: "130px",
                  height: "50px",
                  "margin-left": "5px",
                }}
                onClick={(e) => this.getMonthWiseSalesSum(e)}
              >
                Get sales sum
              </button>
            </td>
          </tr>
        </table>
        <br />
        <h6>Monthly Sales Sum : {this.state.monthlySalesSum}</h6>
        <br />
      </div>
    );

    products = this.state?.products?.map((sellerProduct) => {
      let logoPath;
        if(sellerProduct.productImages.length === 0){
          logoPath = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
        }else{
          logoPath = sellerProduct.productImages[0]
        }
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

              <div className="image-container" id={sellerProduct._id}>
                <div className="image">
                  <img
                    src={logoPath}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
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
                Seller: {sellerProduct.sellerName}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                {sellerProduct.productDesc}
              </div>
              <div className="row" style={{ margin: 10, textAlign: "center" }}>
                ${sellerProduct.price}
              </div>
            </div>
            <hr style={{ height: "2px", backgroundColor: "gray" }}></hr>
            <div className="extra content">
              <Link
                style={{ fontSize: "15", marginLeft: "70px" }}
                to={{
                  pathname: `/product/${sellerProduct._id}`,
                }}
              >
                {" "}
                View Product
              </Link>
            </div>
          </div>
        </div>
      );
    });
    // }

    return (
      <React.Fragment>
        <div className="auth-inner4">
          <br />
          <h4>Seller : {this.props.location.sellerName}</h4>
          <br />
          <h6>Total Sales Sum : {this.state.salesSum}</h6>
          <br />
          {monthWiseSalesAmount}
          <h6>Products </h6>
          {products}
        </div>
      </React.Fragment>
    );
  }
}

export default ProductView;
