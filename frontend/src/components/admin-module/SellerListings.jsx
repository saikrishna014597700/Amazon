import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./InventoryListings.css";
import Env from "../../helpers/Env";
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
        this.setState({ sellers: res.data.result });
      });
  };

  componentDidMount() {
    this.getAllSellers();
  }
  render() {

    let sellerListings = this.state?.sellers?.map((seller) => {
      let imagePath 

      if(seller.imagePath === undefined){
        imagePath = ( <div className="image">
        <img
          src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
          style={{ height:"150px",width:"150px" }}
        />
      </div>
        )
      }else{
        console.log("image exists for seller")
        imagePath = (<div className="image">
        <img
          src={seller.imagePath}
          style={{ height:"150px",width:"150px" }}
        />
      </div>
        )
      }
      return(
      <div>
      <section className="card">
      <div className="row">
        <div className="col-3">
         {imagePath}
        </div>
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
  )
    })

    return (
      <div className="seller-listings">
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
                placeholder="Search events..."
                autoComplete="off"
                onKeyUp={this.onKeyUp}
                onChange={this.handleOnChange}
              />
            </Form.Group>{" "}
            <div className="apply-btn-container float-left">
              <button
                className="Amazon"
                style={{ width: "130px" }}
                onClick={this.searchOnChangeHandle}
              >
                {" "}
                Search
              </button>
            </div>
          </Form>
        </div>
        {sellerListings}
      </div>
    );
  }
}

export default SellerListings;
