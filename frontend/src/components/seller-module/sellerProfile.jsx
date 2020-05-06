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

class SelerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: localStorage.getItem("id"),
      role: "Seller",
      sellerName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      sellerProfile: {},
      editMode: false,
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
    axios
      .put(`${Env.host}/api/seller/updateProfile/${this.state.sellerId}`, data)
      .then(async (res) => {
        this.setState({
          sellerProfile: res.data,
          editMode: false,
        });
        console.log("new seller::::", res);
        // this.getSellerProfile(this.state.sellerId);
      });
  };

  getSellerProfile = (sellerId) => {
    axios
      .get(`${Env.host}/api/seller/profile/${sellerId}`)
      .then(async (res) => {
        console.log("seller::::", res);
        this.setState({
          sellerProfile: res.data,
        });
      });
  };

  componentDidMount() {
    this.getSellerProfile(this.state.sellerId);
  }

  render() {

    let redirectVar = null;
    if(!localStorage.getItem("id")){
        redirectVar = <Redirect to= "/login"/>
    }else{
      if(localStorage.getItem("role") != "Seller"){
        redirectVar = <Redirect to= "/login"/>
      }
    }

    let profilePath = null;
    console.log("profilePath before change::",profilePath , )
    if(localStorage.getItem("imagePath")){
      console.log("true")
      profilePath = (<img
        alt=""
        src={localStorage.getItem("imagePath")}
        id="avatar-image"
        style={{width:"220px",height:"220px",borderRadius:"50%",marginTop:"85px",marginLeft:"20px"}}
      />)
    }else{
      console.log("false")
      profilePath = (<img
        alt=""
        src={require("../product-module/shoe.jpg")}
        
        id="avatar-image"
        style={{width:"220px",height:"220px",borderRadius:"50%",marginTop:"85px",marginLeft:"20px"}}
      />)
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
                        </div>
{/* <p>{this.state?.sellerProfile?.sellerName}</p> */}
                       
                      </div >
                      <div style = {{marginLeft : "300px"}}>
                      <input type="file" style = {{magrinLeft : "300px !important",width:"20%"}} name="user_image" accept="image/*" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleImageChange} />
                
                <button variant="primary" style = {{magrinLeft : "300px !important"}} type="submit" onClick = {(e)=>this.uploadPic()}>
                                    <b>Update</b>
                                </button>
                                </div>


                    
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
              style={{ width: "130px" ,marginLeft:"191px",marginTop:"-37px"}}
              onClick={(e) => this.noShowEditForm()}
            >
              Cancel
            </button>
          </div>
        ) : (
         < div class="card" style={{width:"500px",marginLeft:"300px"}} >
          {/* <div className="row"> */}
            <div className="col-3">
             
            </div>
            {/* <div className="col-6"> */}
              <section>
                <div>Name: {this.state?.sellerProfile?.sellerName}</div>
                <div>
                  Street: {this.state?.sellerProfile?.sellerAddress?.street}
                </div>
                <div>
                  City: {this.state?.sellerProfile?.sellerAddress?.city}
                </div>
                <div>
                  State: {this.state?.sellerProfile?.sellerAddress?.state}
                </div>
                <div>
                  Zip Code: {this.state?.sellerProfile?.sellerAddress?.zip_code}
                </div>
              </section>
            {/* </div> */}
            <br></br>
            <div className="col">
              {" "}
              {"Seller" === this.state?.role ? (
                <button
                  className="Amazon"
                  style={{ width: "130px" }}
                  onClick={(e) => this.showEditForm()}
                >
                  {" "}
                  Edit your Profile
                </button>
              ) : (
                ""
              )}
            </div>
          {/* </div> */}
          </div>
        )}
      </div>
    );
  }
}

export default SelerProfile;
