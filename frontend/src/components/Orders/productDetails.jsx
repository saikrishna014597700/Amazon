import React, { Component } from "react";

export default class ProductDetails extends Component {
    constructor() {
        super()
        this.state = {
            products:[]
        }
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
                        <div>Name: Plug</div>
                        <div>Quantity : {prod.quantity}</div>
                        <div>Status : "In-Transit"</div>
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