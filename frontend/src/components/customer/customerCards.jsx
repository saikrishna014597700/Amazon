import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import "../product-module/product.css";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";


export default class customerCards extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }
  async componentDidMount(){

        var data = 22;

        await  axios.get("http://localhost:3001/api/customerDetails/getCustomerCards/?userId="+data).then((res)=>{
            this.setState({
                cards:res.data
            })
        })

    }

render(){
    return(
        <div>
            Hi
            </div>
    )
}

}