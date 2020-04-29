
import React, { Component } from "react";
import "./profile.css";
import "./New folder/profile1.css";
import "./New folder/profile1.css";
import "./New folder/profile1.css";
import "./New folder/profile1.css";
import axios from "axios"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cname:"",
      showModal: false,
      logout: false,
    };
    this.handleChange=this.handleChange.bind(this)
    this.savename=this.savename.bind(this)
  }

  async handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, " ",e.target.value)
  };

  async savename()
  {
    console.log(this.state.cname)
    const data=
    {
      id: localStorage.getItem("id"),
      name: this.state.cname
    }
    await axios
    .post("http://localhost:3001/api/auth/profile/", data)
    .then((response) => {
      this.setState({
        msg: "Updated",
        // name: this.state.name
      })
  });
  }

    handleImageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

   

    render() {
        
        

        return (
          <div>
            <div className="container">
            <div className="row">
            <div className="col-md-1"></div>
                <div className="col-md-10">
        
                    <div className="card hovercard" style={{height:"275px"}}>
                        <div className="cardheader" style={{height:"275px"}}>
        
                        </div>
                        <span
                          className="a-declarative"
                          data-action="a-modal"
                          data-a-modal='{"name":"cover-photo-desktop-crop-popover","dataStrategy":"preload","header":"Upload a cover photo","padding":"none","closeButtonLabel":"cover-photo-desktop-crop-popover-close"}'
                        >
                          <div
                            id="cover-photo-desktop-crop-trigger"
                            className="a-section"
                          />
                        </span>
                        <div
                          className="a-popover-preload"
                          id="a-popover-cover-photo-edit-image-popover"
                        >
                      
                        </div>
                        <div className="info">
                            <div className="title">
                                <a target="_blank" href="https://scripteden.com/">Revanth Krishna</a>
                            </div>
                            <div className="desc">Passionate designer</div>
                            <div className="desc">Curious developer</div>
                            <div className="desc">Tech geek</div>
                        </div>
                        <div className="bottom">
                            <a className="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a className="btn btn-danger btn-sm" rel="publisher"
                               href="https://plus.google.com/+ahmshahnuralam">
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a className="btn btn-primary btn-sm" rel="publisher"
                               href="https://plus.google.com/shahnuralam">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a className="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam">
                                <i className="fa fa-behance"></i>
                            </a>
                        </div>
                        <div
                          id="cover-photo-mobile-crop-container"
                          className="a-section"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id="customer-profile-avatar-image"
                    className="a-section desktop avatar-image-container"
                  >
                    <div className="a-section">
                      <input
                        type="file"
                        accept="image/*"
                        id="avatarUploadInput"
                        name="avatar"
                      />
                      <canvas id="resizingCanvas" />
                      <span
                        className="a-declarative"
                        data-action="a-popover"
                        data-a-popover='{"name":"avatar-edit-image-popover","dataStrategy":"preload","position":"triggerBottom","activate":"onclick","closeButton":"false"}'
                      >
                        <div className="a-section updated-profile-image-holder desktop">
                          <div
                            className="a-section a-spacing-none circular-avatar-image"
                            style={{
                              backgroundImage:
                                'url("//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/search_avatar-8059b2ed8a963eda51ee0b024a379bc98b88e8b72ba77c7c37204308ce09b47b.png")',
                              backgroundSize: "contain",
                            }}
                          >
                            <img
                              alt=""
                              src={require("../product-module/shoe.jpg") }
                              id="avatar-image"
                            />
                            <div className="a-section">
                              <div className="a-row image-edit-popover-trigger-holder">
                                <img
                                  alt=""
                                  src="./profile_files/camera-desktop-4aba2c5ff428bad7bee93a2e61a2ad5128cbdd58b770618a1fd108abca1e2f31.png"
                                />
                              </div>
                              <div
                                className="a-popover-preload"
                                id="a-popover-avatar-edit-image-popover"
                              >
                                <div className="a-section a-spacing-none">
                                  <div className="a-section a-spacing-none">
                                    <div className="a-row">
                                      <label
                                        className="imageUploadLabel"
                                        htmlFor="avatarUploadInput"
                                      >
                                        <span className="a-size-small a-color-base upload-photo">
                                          Upload
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="a-row a-spacing-top-small">
                                    <span
                                      className="a-declarative"
                                      data-action="a-modal"
                                      data-a-modal='{"name":"avatar-delete-popover","dataStrategy":"preload","padding":"none","header":"Delete Profile Photo","closeButtonLabel":"avatar-delete-popover-close"}'
                                    >
                                      <span className="a-size-small a-color-base desktop delete-photo">
                                        Delete
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="a-popover-preload"
                                id="a-popover-avatar-delete-popover"
                              >
                                <div className="a-section desktop delete-modal-content">
                                  <div className="a-row delete-modal-message">
                                    <span>
                                      Are you sure you want to delete your
                                      profile picture?
                                    </span>
                                  </div>
                                  <div className="a-row delete-modal-footer">
                                    <div className="a-section desktop delete-modal-buttons">
                                      <span className="a-button desktop cancel-button-delete-modal">
                                        <span className="a-button-inner">
                                          <input
                                            type="submit"
                                            className="a-button-input"
                                          />
                                          <span
                                            className="a-button-text"
                                            aria-hidden="true"
                                          >
                                            <span>Cancel</span>
                                          </span>
                                        </span>
                                      </span>
                                      <span className="a-button a-button-primary desktop delete-button-delete-modal">
                                        <span className="a-button-inner">
                                          <input
                                            type="submit"
                                            className="a-button-input"
                                          />
                                          <span
                                            className="a-button-text"
                                            aria-hidden="true"
                                          >
                                            <span>Delete</span>
                                          </span>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="desktop padded card name-header-card">
                 
                  <div className="a-row">
                    <div
                      id="customer-profile-name-header"
                      className="a-section desktop name-header-widget"
                    >
                      <div className="a-row header" />
                      <div className="a-row a-spacing-none name-container">
                        <span className="a-size-extra-large">
                          <input type="text" name="cname" id="cname" defaultValue={localStorage.getItem("name") } onChange={this.handleChange} />
                          <button onClick={this.savename}>Save</button>
                        </span>
                       
                      </div>
                      <div className="a-section desktop inline-edit-container" />
                      <div className="name-header-footer-placeholder" />
                      <div className="a-row name-header-footer-container">
                       
                          <span className="a-button a-button-normal a-button-primary name-header-edit-profile-button">
                            <span className="a-button-inner">
                              <button className="a-button-text" type="button" onClick={this.savename}style={{width:"25%"}}>
                                Edit your profile
                              </button>
                            </span>
                          </span>
                     
                      </div>
                    </div>
        
                </div>
        
            </div>
         
          <link
            rel="stylesheet"
            type="text/css"
            href="./profile_files/redirect-overlay-nav-https-20200206._CB423514839_.css"
          />
         
          <div
            id="sis_pixel_r2"
            aria-hidden="true"
            style={{
              height: "1px",
              position: "absolute",
              left: "-1000000px",
              top: "-1000000px",
            }}
          >
            <iframe
              id="DAsis"
              src="./profile_files/iu3.html"
              width={1}
              height={1}
              frameBorder={0}
              marginWidth={0}
              marginHeight={0}
              scrolling="no"
            />
          </div>
     
          <div id="be" style={{ display: "none", visibility: "hidden" }}>
            <form
              name="ue_backdetect"
              action="https://www.amazon.com/gp/profile/get"
            >
              <input type="hidden" name="ue_back" defaultValue={2} />
            </form>
          </div>
          <noscript>
            &lt;
            &gt;
          </noscript>
        </div>

        );
    }
}

export default Profile;