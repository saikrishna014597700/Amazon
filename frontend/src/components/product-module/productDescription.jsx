import React,{ Component } from "react";

export default class productDescription extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart = () =>{

  }
  componentDidMount(){

  }

  render(){
      return(
          <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5" id="imageDiv">
                  <img src={require("../../utils/product.jpg")}  style={{width:"350px",height:"450px"}}></img>
              </div>
              <div className="col-md-5">
                  
              </div>
              
          </div>
      )
  }

}
