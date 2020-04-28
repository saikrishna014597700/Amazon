import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "./orders.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import ProductDetails from './productDetails';

export default class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
        this.addProduct = this.addProduct.bind(this);
        this.viewAllSellerProducts = this.viewAllSellerProducts.bind(this);
    }

    async componentDidMount() {
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

    render() {

        let orderDetails = this.state.orders.map((order) => {
            return (
                <div key={order._id} className="card" style={{ }}>

            
                    <div className="card-header">
                    <table style= {{width:"100%"}}>
            <tr>
            <th>Order #</th>
             <th>Transaction Amount</th> 
                <th>Ordered Date</th>
             </tr>
             <tr>
            <td>{order._id}</td>
             <td> $ {order.transactionAmount}</td> 
                <td>{order.createDate.toString().substring(1,10)}</td>
             </tr>
             </table>
                        {/* <div className="row">
                            <div className="col-sm" style={{ width: '50%' }}>
                                <div> Order ID: {order._id}</div>
                                <div>Transaction Amount: $ {order.transactionAmount} </div>
                            </div>
                            <div className="col-sm" style={{ width: '50%' }}>
                                <div>Payment Details: {order.paymentDetails}</div>
                                <div>Ordered Date: {order.createDate}</div>
                            </div>
                        </div> */}
                    </div>



                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-9" >
                                <ProductDetails key={order._id} products={order.products} order={order}>
                                </ProductDetails>
                                
                            </div>


                            <div className="col-sm-3">

                                <div className="row" style={{ marginTop: '7px' }}>
                                    <Button variant="warning" block style={{ width: '150px' }} data-toggle="collapse" data-target="#demo1">Shipping Address</Button>
                                    <div id="demo1" style={{ fontSize: '12px' }} className="collapse">
                                        {/* status is here  */}
                                        <div> {order.shippingAddress.street}</div>
                                        <div>{order.shippingAddress.city}</div>
                                        <div>{order.shippingAddress.state}</div>
                                        <div>{order.shippingAddress.zip_code}</div>
                                    </div>
                                </div>

                                <div className="row" style={{ marginTop: '7px' }}>
                                    <Button variant="warning" block style={{ width: '150px' }} data-toggle="collapse" data-target="#demo1">Billing Address</Button>
                                    <div id="demo1" style={{ fontSize: '12px' }} className="collapse">
                                        {/* status is here  */}
                                        <div> {order.billingAddress.street}</div>
                                        <div>{order.billingAddress.city}</div>
                                        <div>{order.billingAddress.state}</div>
                                        <div>{order.billingAddress.zip_code}</div>
                                    </div>
                                </div>

                                <div className = "row" style = {{marginTop:'7px'}}>
                                <Button variant = "warning" block  style={{ width: '150px'}}  data-toggle="collapse" data-target="#demo1">Billing Address</Button>
                                <div id="demo1" style = {{fontSize:'12px'}} className="collapse">
                                    {/* status is here  */}
                                   <div> {order.billingAddress.street}</div>
                                    <div>{order.billingAddress.city}</div>
                                    <div>{order.billingAddress.state}</div>
                                    <div>{order.billingAddress.zip_code}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div >
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

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="true">Orders</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Cancelled Orders</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">{orderDetails}</div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                    </div>


                    {/* <ul className="list-group list-group-horizontal-xl">
                        <button className="button" onClick={(event) => this.fetchOrders(event)}>Orders</button>
                        <button className="button" style={{ width: '200px', marginLeft: '10px' }}>Cancelled Orders</button>
                    </ul>
                </div>
                <div>
                    {orderDetails}
                </div> */}

                </div>
                </div>
        );
    }
}
