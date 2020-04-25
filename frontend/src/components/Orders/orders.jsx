import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./orders.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";

export default class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
        this.addProduct = this.addProduct.bind(this);
        this.viewAllSellerProducts = this.viewAllSellerProducts.bind(this);
    }

    async fetchOrders(event) {
        await axios.get("http://localhost:3001/api/orders/getAllOrders/?userId=" + 1).then((res) => {
            console.log('response is::', res)
            this.setState({
                orders: res.data
            })
        })
    }

    async viewAllSellerProducts(event) {
        const payload = {
            sellerId: "123",
        };
        axios
            .post("http://localhost:3001/api/product/viewAllSellerProducts/", payload)
            .then((response) => {
                console.log("Pro are::", response);
                this.setState({
                    sellerProducts: response.data,
                });
                console.log("Pro are::", this.state.sellerProducts);
            });
    }

    async addProduct(event) {
        const payload = {
            productName: this.state.productName,
            productDesc: this.state.productDesc,
            price: this.state.price,
            category: this.state.category,
        };
        axios
            .post("http://localhost:3001/api/product/addProduct/", payload)
            .then((response) => { });
    }

    async  fetchTrackingInfo(trackingInfo) {
        ;
        console.log('trackingInfo::', trackingInfo)
        let trackingDetails = await trackingInfo.map(function (track) {
            console.log('jaffaaaa')
            return (
                <div key={track._id} style={{ align: 'center' }}>
                    <p>Status: {track.trackingStatus}</p>
                    <p>Location: {track.trackingStatus}</p>
                    <p>Time: {track.createDate}</p>
                </div>
            )

        })
        console.log("tracking details::", trackingDetails)
        this.setState({
            trackingInfo: trackingDetails
        })

        //return trackingDetails
    }

    render() {

        let orderDetails = this.state.orders.map((order) => {
            return (
                <div key={order._id} className="row" style={{ marginTop: "50px" }}>
                    <div className="col-sm" style={{ width: '30%' }}>
                        <div className="ui card" style={{ marginLeft: "150px", border: "0px" }}>
                            <div className="image">
                                <img src="https://react.semantic-ui.com/images/icons/plugin.png" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm" style={{ width: '30%' }}>
                        <div className="ui card" style={{ border: "0px" }}>
                            <div className="content">
                                <div className="meta">Name: Plug</div>
                                <div className="meta">Quantity : {order.products[0].quantity}</div>
                                <div className="meta">Status : {order.status}</div>
                            </div>
                        </div>
                        <button style={{ width: '150px' }} className="button" data-toggle="collapse" data-target="#demo" onClick={(event) => this.fetchTrackingInfo(order.trackingInfo)}>Tracking Details</button>
                        <div id="demo" class="collapse">
                            {/* status is here  */}
                            {this.state.trackingInfo}
                        </div>

                    </div>
                    <div className = "col-sm" style = {{width:'40%'}}>
                    <div className="ui card" style={{ border: "0px" }}>
                    <div className="meta">Cost: {order.transactionAmount} USD</div>
                    <div className="meta">Payment Details: {order.paymentDetails}</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <img
                            src={require("../../utils/logo.jpg")}
                            style={{ float: "center", height: "100px", width: "200px" }}
                            alt="hs"
                        />
                    </div>
                    <ul class="list-group list-group-horizontal-xl">
                        <button className="button" onClick={(event) => this.fetchOrders(event)}>Orders</button>
                        <button className="button" style={{ width: '200px', marginLeft: '10px' }}>Cancelled Orders</button>
                    </ul>
                </div>
                <div>
                    {orderDetails}
                </div>
            </div>
        );
    }
}



