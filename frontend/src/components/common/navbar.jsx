import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import { Redirect } from "react-router";
import SearchProduct from "./searchProduct";
import Glyph from "owp.glyphicons";
import { Badge } from "react-bootstrap";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchCategory: "All",
      searchTerm: "",
      active: false,
      redirectVar: null,
      redirect: null,
      productCategories: [],
      cartSize:0
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  onMenuClick() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  handleLogout() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("imagePath");
    this.setState({
      redirectVar: <Redirect to="/login" />,
    });
  }

  goToHome = () => {
    this.setState({
      redirectVar: <Redirect to="/home" />,
    });
  };

  goToCart = () => {
    this.setState({
      redirectVar: <Redirect to="/cart" />,
    });
  };
  goToSearch = () => {
    this.setState({ redirect: `/search/${this.state.searchTerm}` });
  };

  goToOrders = () => {
    this.setState({
      redirectVar: <Redirect to="/orders" />,
    });
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:3001/api/admin/get-product-categories")
      .then((response) => {
        console.log("response in navbar==>" + JSON.stringify(response));
        this.setState({
          productCategories: response.data,
        });
      });
    await axios
      .post("http://localhost:3001/api/cart/getCompleteCart/", {
        userId: this.state.userId,
      })
      .then((response) => {
        let cartSize = 0;
        if (response.status == 200) {
          if (response.data.length != 0) {
            localStorage.setItem("cartSize", cartSize);
            response.data.forEach((product) => {
              cartSize = cartSize + parseInt(product.quantity, 10);
            });
            localStorage.setItem("cartSize", cartSize);
            this.setState({
              cartSize:cartSize
            })
          }
        }
      });
  }
  async viewSeachResults() {
    const payload = {
      searchTerm: this.state.searchTerm,
      searchCategory: this.state.searchCategory,
    };
    axios
      .post("http://localhost:3001/api/common/search/", payload)
      .then(async (response) => {
        console.log("Pro are::", response);
        await this.setState({
          products: response.data,
        });
        this.goToSearch();
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let image = null;
    let navBar = null;
    let dropdowns = null;
    let redirectVar = null;
    let categories = this.state.productCategories?.map((category) => {
      return <option value={category.category}>{category.category}</option>;
    });

    if (localStorage.getItem("id")) {
      if (localStorage.getItem("role") === "Customer") {
        dropdowns = (
          <div>
            <a className="dropdown-item" href="/profile">
              {" "}
              Your Profile
            </a>
            <a className="dropdown-item" href="/orders">
              {" "}
              Your Orders
            </a>
            <a className="dropdown-item" href="/customerCards">
              {" "}
              Your Cards
            </a>
            <a className="dropdown-item" href="/customerAddresses">
              {" "}
              Your Addresses
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </div>
        );
      } else if (localStorage.getItem("role") === "Seller") {
        dropdowns = (
          <div>
            <a className="dropdown-item" href="/sellerProfile">
              {" "}
              Your Profile
            </a>
            <a className="dropdown-item" href="/viewAllSellerProducts">
              {" "}
              Your Inventory
            </a>
            <a className="dropdown-item" href="/addProduct">
              {" "}
              Add Products
            </a>
            <a className="dropdown-item" href="/sellerOrders">
              {" "}
              Your Orders
            </a>
            <a className="dropdown-item" href="/sellerReports">
              {" "}
              Your Reports
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </div>
        );
      } else {
        dropdowns = (
          <div>
            <a className="dropdown-item" href="/inventory-listings">
              {" "}
              Inventory Listings
            </a>
          </div>
        );
      }
    }

    image = (
      <img
        style={{ width: "120px", height: "40px", marginRight: "20px" }}
        src={require("../../utils/navBarLogo.jpg")}
      />
    );
    if (!localStorage.getItem("id")) {
      navBar = "";
    } else {
      navBar = (
        <nav
          class="navbar navbar-expand-lg navbar-light bg-light"
          style={{
            backgroundColor: "#232f3e",
            marginTop: "2px",
            listStyleType: "none",
          }}
        >
          <div
            class="collapse navbar-collapse"
            style={{
              backgroundColor: "#232f3e",
              margin: "-20px",
              listStyleType: "none",
            }}
          >
            <ul class="navbar-nav" style={{ listStyleType: "none" }}>
              <li>
                <div
                  className={this.state.active ? "menu-btn open" : "menu-btn"}
                  onClick={this.onMenuClick}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="menu-toggler"></div>
                </div>
              </li>
              <li>
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={this.goToHome}
                >
                  {image}
                </div>
              </li>
              <li>
                <div className="input-group" style={{ margin: "20px" }}>
                  <select
                    style={{
                      width: `${8 * this.state.searchCategory.length + 25}px`,
                      height: "40px",
                      backgroundColor: "#e7eae8",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      fontSize: "12px",
                    }}
                    onChange={(e) => {
                      this.changeHandler(e);
                    }}
                  >
                    <option value="all">ALL</option>
                    {categories}
                  </select>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.changeHandlerTerm(e);
                    }}
                    id="search"
                    style={{
                      width: `${
                        650 - 8 * this.state.searchCategory.length + 30
                      }px`,
                      height: "39px",
                    }}
                  ></input>
                  <button
                    type="button"
                    style={{
                      width: "40px",
                      backgroundColor: "#febe62",
                      border: 0,
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                    }}
                    height="40px"
                    onClick={(e) => {
                      this.viewSeachResults();
                    }}
                  >
                    {/* {icons.sear} */}
                    <Glyph style={{ fontSize: "20px" }} type="search" />
                  </button>
                </div>
              </li>
              <li className="nav-item dropdown" style={{ marginTop: -4 }}>
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{
                    color: "white",
                    width: "150%",
                    marginTop: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#cccccc",
                      fontWeight: "normal",
                    }}
                  >
                    Hello, {localStorage.getItem("name")}
                    <br></br>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: "bold" }}>
                    Account & Lists
                    <span class="caret" style={{ color: "#cccccc" }}></span>
                  </div>
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ marginTop: -25, marginLeft: 15 }}
                >
                  {dropdowns}
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" onClick={this.handleLogout}>
                    Logout
                  </a>
                </div>
              </li>

              <li class="nav-item dropdown" style={{ marginLeft: "20px" }}>
                <a
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{
                    color: "white",
                    width: "150%",
                    marginLeft: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                  onClick={this.goToOrders}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#cccccc",
                      fontWeight: "normal",
                    }}
                  >
                    Returns<br></br>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: "bold" }}>
                    & Orders
                  </div>
                </a>
              </li>
              <li
                class="nav-item"
                style={{
                  marginTop: "25px",
                  marginLeft: "50px",
                  color: "white",
                  // width: "25%",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={this.goToCart}
              >
                {/*  */}
                <div style={{ position: "absolute", marginLeft: "-30px" }}>
                  <Glyph type="shopping-cart" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    verticalAlign: "top",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      zIndex: 20,
                      verticalAlign: "top",
                      borderRadius: "50px",
                    }}
                    className="badge"
                  >
                    {localStorage.getItem("cartSize")}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    return (
      <div style={{width:"100%"}}>
        {redirectVar}
        {this.state.redirectVar}
        {navBar}
        {/* </nav> */}
      </div>
    );
  }
}

export default Navbar;
