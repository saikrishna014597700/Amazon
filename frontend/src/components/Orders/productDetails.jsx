import React, { Component } from "react";
import axios from "axios";
import { Form, Button, FormGroup } from "react-bootstrap";

export default class ProductDetails extends Component {
    constructor() {
        super()
        this.state = {
            products:[],
            trackingDetails:''
        }
    }


    async  fetchTrackingInfo(trackingInfo) {

        console.log('trackingInfo::', trackingInfo)
        
        
        let trackingDetails = await trackingInfo.map(function (track) {
            console.log('jaffaaaa')
            return (
                <div key={track._id} style={{ align: 'center' }}>
                    <p>Status: {track.trackingStatus}</p>
                    <p>Location: {track.trackingAddress.zip_code}</p>
                    <p>Time: {track.createDate.toString().substring(0,9)}</p>
                </div>
            )

        })
        console.log("tracking details::", trackingDetails)
        this.setState({
            trackingDetails: trackingDetails
        })

        //return trackingDetails
    }

    async cancelProduct(prodId,orderId){
        console.log('cancel this prod', prodId ,'from order ', orderId)
        var payload = {
            prodId : prodId,
            orderId:orderId
        }
        await axios.post("http://localhost:3001/api/orders/cancelOrder", payload).then((res) => {
            console.log('response is::', res)
            alert(res.data)
        })
    }

     render() {
         console.log('product details::',this.props)
        let ProductDetails =  this.props.products.map((prod) => {
            return (
                <div className = "row" key = {prod._id} >
                    <div className="col-sm" style={{ width: '50%' }}>
                        <div className="image">
                            <img src="https://react.semantic-ui.com/images/icons/plugin.png" />
                        </div>
                    </div>
                    <div className="col-sm" style={{ width: '50%' }}>
                    <div>Name: {prod.productDetails.productName}</div>
                        <div>Quantity : {prod.quantity}</div>
                        <div>Status : {prod.status}</div>
                       <Button variant = "warning" style = {{width:'150px'}} block data-toggle="collapse" data-target="#demo" onClick={(event) => this.fetchTrackingInfo(prod.trackingInfo)}>Tracking Details</Button>
                                <div id="demo" style = {{fontSize:'12px'}} className="collapse">
                                    {this.state.trackingDetails}
                                </div>
                
                        <Button variant = "light" hidden = {prod.status === "Delivered" || prod.status === "Cancelled"} style = {{width:'150px',marginTop:"7px",color:"#ffc107"}} block data-toggle="collapse" data-target="#demo" onClick={(event) => this.cancelProduct(prod.productId,this.props.order._id)}>Cancel Product</Button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {ProductDetails}
            </div>
        );
    }

}