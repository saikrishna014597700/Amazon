import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import "../profile-module/profile.css"
import "../profile-module/New folder/profile1.css"
import "../profile-module/New folder/profile2.css"
import "../profile-module/New folder/profile3.css"
import "../profile-module/New folder/profile4.css"

import "./seller.css";
import Env from "../../helpers/Env";
import { Redirect } from "react-router";
import {Link} from 'react-router-dom'
import StarRatings from "react-star-ratings";

class SelerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
      sellerName: "",
      street: "",
      city: "",
      state: "",
      dis:0,
      zipCode: "",
      sellerProfile: {},
      editMode: false,
      products:[],
      // sellerProducts:[]
    };
    this.handleImageChange=this.handleImageChange.bind(this)
  }

  async uploadPic(){
    let fileData = new FormData()
    console.log('fileData in state',this.state.formData)
    fileData.append("file", this.state.formData)

    var data = {
      type : this.state.formData.type,
      path:  this.state.formData.name
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post("http://localhost:3001/api/file/uploadImage/?userId="+localStorage.getItem("id"),fileData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }}).then((res)=>{
        localStorage.setItem("imagePath",res.data.Location)
        console.log("response:",res)
        this.setState({
          logout:false
        })
     })
  }

  async handleImageChange(e)  {
    this.setState({
     formData: e.target.files[0],
    });
    console.log(e.target.name," ",e.target.value)
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  showEditForm = () => {
    this.setState({
      editMode: true,
    });
  };

  noShowEditForm = () => {
    this.setState({
      editMode: false,
    });
  };

  updateProfile = () => {
    const data = {
      sellerName: !!this.state?.sellerName
        ? this.state?.sellerName
        : this.state?.sellerProfile.sellerName,

      sellerAddress: {
        street: !!this.state?.street
          ? this.state?.street
          : this.state?.sellerProfile.street,

        city: !!this.state?.city
          ? this.state?.city
          : this.state?.sellerProfile.city,

        state: !!this.state?.state
          ? this.state?.state
          : this.state?.sellerProfile.state,

        zip_code: !!this.state?.zipCode
          ? this.state?.zipCode
          : this.state?.sellerProfile.zip_code,
      },
    };
    console.log("data before axios put::", data);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .put(`${Env.host}/api/seller/updateProfile/${this.state.sellerId}`, data)
      .then(async (res) => {
        this.setState({
          sellerProfile: res.data,
          editMode: false,
         
        });
        await localStorage.setItem("name",this.state?.sellerProfile?.sellerName)
        await this.getSellerProfile(this.props.match.params.id);
        console.log("new seller::::", res);
        // this.getSellerProfile(this.state.sellerId);
      });
      
  };

  getSellerProfile = (sellerId) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(`${Env.host}/api/seller/profile/${sellerId}`)
      .then(async (res) => {
        console.log("seller::::", res);
        this.setState({
          sellerProfile: res.data,
        });
        localStorage.setItem("name",this.state?.sellerProfile.sellerName)
      });
  };

  async componentDidMount() {
    let sellerProducts=null;
    // console.log(this.props.match.params.id)
    this.getSellerProfile(this.props.match.params.id);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios
    .get(
      `${Env.host}/api/admin/products-by-seller/${this.props.match.params.id}`
    )
    .then(async (res) => {
      console.log("products:", res);
      if(res.data!="No products in this category")
      {this.setState({
        products: res.data,
      });}
      console.log(this.state.products)
    });
  }

  render() {

    let redirectVar = null;
    let butts=null;
    let sellerProducts=null;
    if(!localStorage.getItem("id")){
        redirectVar = <Redirect to= "/login"/>}

    if(localStorage.getItem("id")==this.props.match.params.id)
    {
    butts=  ( <div style = {{marginLeft : "300px"}}>
    <input type="file" style = {{marginLeft : "300px !important",width:"20%"}} name="user_image" accept="image/*" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleImageChange} />

<button className="Amazon" style = {{marginLeft : "250px",width:"150px",marginTop:"-65px"}} type="submit" onClick = {(e)=>this.uploadPic()}>
                  <b>Upload Profile Pic</b>
              </button>
              </div>
    )}
   
    let profilePath = null;
    console.log("profilePath before change::",profilePath )
    if(localStorage.getItem("imagePath")!="undefined"){
      console.log("true")
      profilePath = (<img
        alt=""
        src={this.state?.sellerProfile?.imagePath}
        id="avatar-image"
        style={{width:"220px",height:"220px",borderRadius:"50%",marginTop:"85px",marginLeft:"20px",border:"1px"}}
      />)
    }else{
      console.log("false")
      profilePath =(<img
        alt=""
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        
        id="avatar-image"
        style={{width:"220px",height:"220px",borderRadius:"50%",marginTop:"85px",marginLeft:"20px"}}
      />)
    }

    if(localStorage.getItem("role")=="Customer")
    {
      sellerProducts = this.state.products.map((sellerProduct) => {
        let logoPath;
          if(sellerProduct.productImages.length === 0){
            logoPath = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
          }else{
            logoPath = sellerProduct.productImages[0]
          }
        return (
          <div
            // className="col-md-3"
            style={{
              margin: 5,
              width:"860px",
              marginLeft:"300px",
              border: "1",
              borderStyle: "solid",
              borderColor: "#efefef",
            }}
          >
            <div className="row" style={{ margin: 10 }}>
              <img
                src={logoPath}
                style={{ height: "250px" }}
              />
            </div>
            <div
              className="row"
              style={{
                fontWeight: "bold",
                fontSize: "20",
                margin: 10,
                textAlign: "center",
                cursor: "pointer",
              }}
              
            >
         <Link to={"/product/"+sellerProduct._id} >   {sellerProduct.productName} </Link> 
            </div>
            <div className="row" style={{ margin: 10, width: "100%" }}>
              <a href={"/sellerProfile/" + sellerProduct.sellerId}>
                {sellerProduct.sellerName}
              </a>
            </div>
            <div className="row" style={{ margin: 10, textAlign: "center" }}>
              {sellerProduct.productDesc}
            </div>
            <div className="row" style={{ margin: 10, textAlign: "center" }}>
             <h1 style={{fontWeight:"bold"}}> ${sellerProduct.price} </h1>
            </div>
            <div className="row" style={{ margin: 10 }}>
              <StarRatings
                rating={sellerProduct.avgRating}
                starRatedColor="yellow"
                starDimension="20px"
                starSpacing="6px"
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>
        );
      });
    }

    console.log("profilePath::",profilePath)
    return (
      // <div className="seller-profile">
      <div>
        <div className="a-section updated-profile-image-holder desktop">
       
       <div
                        className="a-section a-spacing-none desktop cover-photo"
                        style={{
                          backgroundImage:
                            'url("//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/default_desktop_cover_photo_small-fa94c636796d18ebee73e32e4076d119a52366660d5660b5b2e49f62e036575a.png")',
                          backgroundSize: "contain",
                          height:"305px",
                          width:"860px"
                          ,marginLeft:"300px"
                        }}
                      >
                      
                        {profilePath}
                        <h1 style={{marginLeft:"350px",marginTop:"-70px"}}>{this.state?.sellerProfile?.sellerName}</h1>
                       
                        
                        
                        
                        </div>
{/* <p>{this.state?.sellerProfile?.sellerName}</p> */}
                       
                      </div >
                      
                      {butts}
                     {/* { <div style = {{marginLeft : "300px"}}>
                      <input type="file" style = {{marginLeft : "300px !important",width:"20%"}} name="user_image" accept="image/*" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleImageChange} />
                
                <button className="Amazon" style = {{marginLeft : "250px",width:"150px",marginTop:"-65px"}} type="submit" onClick = {(e)=>this.uploadPic()}>
                                    <b>Upload Profile Pic</b>
                                </button>
                                </div>
                     } */}


                    
        {redirectVar}
        {/* <h3>SelerProfile</h3> */}
        {!!this.state.editMode ? (
          <div class="card" style={{width:"860px",marginLeft:"300px"}}>
          <div class="card-header">
          Your Profile:
        </div>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Seller Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state?.sellerProfile?.sellerName}
                  placeholder="Enter name here.."
                  name="sellerName"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>street</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={
                    this.state?.sellerProfile?.sellerAddress?.street
                  }
                  placeholder="street"
                  name="street"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>city</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state?.sellerProfile?.sellerAddress?.city}
                  placeholder="city"
                  name="city"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>state</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state?.sellerProfile?.sellerAddress?.state}
                  placeholder="state"
                  name="state"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={
                    this.state?.sellerProfile?.sellerAddress?.zip_code
                  }
                  placeholder="zipCode"
                  name="zipCode"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Form>
            <button
              className="Amazon"
              style={{ width: "130px",marginLeft:"30px" }}
              onClick={(e) => this.updateProfile()}
            >
              Save
            </button>
            <button
              className="Amazon"
              style={{ width: "130px" ,marginLeft:"191px",marginTop:"-37.5px"}}
              onClick={(e) => this.noShowEditForm()}
            >
              Cancel
            </button>
          </div>
        ) : (
         < div class="card" style={{width:"860px",marginLeft:"300px"}} >
              {" "}
              {this.props.match.params.id === this.state?.sellerId ? (
               
                <button
                  className="Amazon"
                  style={{ width: "130px",marginLeft:"600px"}}
                  onClick={(e) => this.showEditForm()}
                >
                  {" "}
                  Edit your Profile
                </button>
              ) : (
                ""
              )}
              <div style={{marginLeft:"30px",marginTop:"auto"}} >
                <div><p style={{fontWeight:"bold"}} >Name:</p> {this.state?.sellerProfile?.sellerName}</div> 
                <div>
                <p style={{fontWeight:"bold"}} > Street:</p> {this.state?.sellerProfile?.sellerAddress?.street}
                </div>
                <div>
                <p style={{fontWeight:"bold"}} > City: </p> {this.state?.sellerProfile?.sellerAddress?.city}
                </div>
                <div>
                <p style={{fontWeight:"bold"}} >  State: </p>{this.state?.sellerProfile?.sellerAddress?.state}
                </div>
                <div>
                <p style={{fontWeight:"bold"}} >  Zip Code: </p>{this.state?.sellerProfile?.sellerAddress?.zip_code}
                </div>
                <br></br>
             </div>
          </div>
        )}
        {sellerProducts}
      </div>
    );
  }
}

export default SelerProfile;
