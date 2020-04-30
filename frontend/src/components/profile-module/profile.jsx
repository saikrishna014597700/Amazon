import React, { Component } from "react";
import "./profile.css";
import "./New folder/profile1.css";
import "./New folder/profile1.css";
import "./New folder/profile1.css";
import "./New folder/profile1.css";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cname: "",
      showModal: false,
      logout: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  }

  async savename() {
    const data = {
      name: this.state.name,
    };
    await axios
      .post("http://localhost:3001/api/auth/profile/", data)
      .then((response) => {
        this.setState({
          msg: "Updated",
        });
      });
  }

  handleImageChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  };

  render() {
    return (
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        {/* sp:feature:cs-optimization */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link
          rel="preconnect"
          href="https://images-na.ssl-images-amazon.com/"
          crossOrigin
        />
        <link rel="preconnect" href="https://m.media-amazon.com/" crossOrigin />
        <link
          rel="preconnect"
          href="https://completion.amazon.com/"
          crossOrigin
        />
        {/* 13cklb0lle */}
        {/* sp:feature:aui-assets */}
        <link
          rel="stylesheet"
          href="./profile_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8R.css"
        />
        {/* sp:feature:nav-inline-css */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".nav-sprite-v1 .nav-sprite, .nav-sprite-v1 .nav-icon {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global_bluebeacon-1x_optimized_layout1._CB468670774_.png);\n  background-position: 0 1000px;\n  background-repeat: repeat-x;\n}\n.nav-spinner {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/javascripts/lib/popover/images/snake._CB485935611_.gif);\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n.nav-timeline-icon, .nav-access-image, .nav-timeline-prime-icon {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/timeline_sprite_1x._CB485945973_.png);\n  background-repeat: no-repeat;\n}\n",
          }}
        />
        {/* NAVYAAN CSS */}
        <link
          rel="stylesheet"
          href="./profile_files/21taIyvn9cL._RC_71BsXVMRQcL.css,21TJB5pc5TL.css,31vGzsqCErL.css,21lRUdwotiL.css,41tc24mJIGL.css,11G4HxMtMSL.css,31OvHRW+XiL.css,01XHMOHpK1L.css_.css"
        />
        {/* sp:feature:host-assets */}
        <meta name="csrf-param" content="authenticity_token" />
        <meta
          name="csrf-token"
          content="1587961059-trWlAosc2i9Q7XqNPvmeL2KmJiBCeH0PPL5NQJNMk2Q=-5a5c86b8232247dd3092a8182b32d82935795396633e18eecbabda9c80a9e671"
        />
        <meta content="noindex" name="robots" />
        <title>Your Profile</title>

        <div>
          {/* sp:feature:host-atf */}
          <div id="profile_v5">
            <div
              data-reactroot
              className="a-section profile-v5-desktop-background"
            >
              <div className="a-section profile-v5-desktop">
                <div
                  className="a-changeover a-changeover-manual profile-edited-toast"
                  style={{ display: "none" }}
                >
                  <div className="a-changeover-inner">
                    <i className="a-icon a-icon-checkmark-inverse" />
                    <strong className="a-size-medium">Saved</strong>
                  </div>
                </div>
                <div
                  id="customer-profile-view-alert"
                  className="desktop self view-alert-container"
                >
                  <div className="self view-alert">
                    <span className="alert-message">
                      {/* react-text: 10 */}This is your private view of your
                      profile.{/* /react-text */}
                      {/* react-text: 11 */}&nbsp;{/* /react-text */}
                      <span className="a-text-bold">
                        <a href="https://www.amazon.com/gp/profile/amzn1.account.AGOG57CB4RUEYI3BYYUPZFO7KGEQ?preview=true">
                          See what others see
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
                <div
                  id="customer-profile-avatar-header"
                  className="avatar-header-container"
                >
                  <div
                    id="cover-photo-image"
                    className="a-section a-spacing-none"
                  >
                    <div className="a-section">
                      <input
                        type="file"
                        accept="image/*"
                        id="coverUploadInput"
                        name="coverPhoto"
                      />
                      <canvas id="resizingCanvas" />
                      <div
                        className="a-section a-spacing-none desktop cover-photo"
                        style={{
                          backgroundImage:
                            'url("//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/default_desktop_cover_photo_small-fa94c636796d18ebee73e32e4076d119a52366660d5660b5b2e49f62e036575a.png")',
                          backgroundSize: "contain",
                        }}
                      >
                        <img
                          alt=""
                          src="./profile_files/amzn1.account.AGOG57CB4RUEYI3BYYUPZFO7KGEQ"
                          className="cover-photo-with-cropping"
                          id="cover-image-with-cropping"
                        />
                      </div>
                      <div className="a-section">
                        <div className="a-row desktop cover-photo-edit-icon">
                          <img
                            alt=""
                            src="./profile_files/camera-desktop-4aba2c5ff428bad7bee93a2e61a2ad5128cbdd58b770618a1fd108abca1e2f31.png"
                          />
                          <span
                            className="a-declarative"
                            data-action="a-popover"
                            data-a-popover='{"name":"cover-photo-edit-image-popover","dataStrategy":"preload","position":"triggerBottom","activate":"onclick","closeButton":"false"}'
                          >
                            <div
                              id="cover-photo-edit-popover-trigger"
                              className="a-section edit-popover-trigger"
                            />
                          </span>
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
                          <div className="a-section a-spacing-none">
                            <div className="a-section a-spacing-none">
                              <div className="a-row">
                                <label
                                  className="imageUploadLabel"
                                  htmlFor="coverUploadInput"
                                >
                                  <span className="a-size-small a-color-base upload-photo">
                                    Upload
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="a-popover-preload"
                          id="a-popover-cover-photo-delete-popover"
                        >
                          <div className="a-section desktop delete-modal-content">
                            <div className="a-row delete-modal-message">
                              <span>
                                Are you sure you want to delete your cover
                                photo?
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
                        <div
                          className="a-popover-preload"
                          id="a-popover-cover-photo-desktop-crop-popover"
                        >
                          <div className="a-section cover-photo-crop-container">
                            <div className="a-row cover-photo-crop-image-message">
                              <span>
                                Please use a JPEG or PNG file. Your photo must
                                be at least 640px by 244px.
                              </span>
                            </div>
                            <div
                              id="cover-photo-desktop-crop-container"
                              className="a-row"
                            />
                            <div className="a-row cover-photo-desktop-crop-popover-bottom">
                              <div className="a-section">
                                <span className="a-button cancel-button">
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
                                <div className="a-section upload-pick-photo-container">
                                  <span className="a-button pick-photo-button">
                                    <span className="a-button-inner">
                                      <input
                                        type="submit"
                                        className="a-button-input"
                                      />
                                      <span
                                        className="a-button-text"
                                        aria-hidden="true"
                                      >
                                        <span>Pick a different photo</span>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="a-button a-button-primary upload-button">
                                    <span className="a-button-inner">
                                      <input
                                        type="submit"
                                        className="a-button-input"
                                      />
                                      <span
                                        className="a-button-text"
                                        aria-hidden="true"
                                      >
                                        <span>Upload</span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
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
                              src={require("../product-module/shoe.jpg")}
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
                          <input
                            type="text"
                            name="name"
                            defaultValue={localStorage.getItem("name")}
                            onChange={this.handleChange}
                          />
                          <button onClick={this.savename}>Save</button>
                        </span>
                      </div>
                      <div className="a-section desktop inline-edit-container" />
                      <div className="name-header-footer-placeholder" />
                      <div className="a-row name-header-footer-container">
                        <span className="a-button a-button-normal a-button-primary name-header-edit-profile-button">
                          <span className="a-button-inner">
                            <button
                              className="a-button-text"
                              type="button"
                              style={{ width: "25%" }}
                            >
                              Edit your profile
                            </button>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <link
            rel="stylesheet"
            type="text/css"
            href="./profile_files/customer-profile-website._V433198964_.css"
          />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                "\n\n\n\n#csr-hcb-wrapper {\n  display: none;\n}\n\n.bia-item .bia-action-button {\n  display: inline-block;\n  height: 22px;\n  margin-top: 3px;\n  padding: 0px;\n  overflow: hidden;\n  text-align: center;\n  vertical-align: middle;\n  text-decoration: none;\n  color: #111;\n  font-family: Arial,sans-serif;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 19px;\n  cursor: pointer;\n  outline: 0;\n  border: 1px solid;\n  -webkit-border-radius: 3px 3px 3px 3px;\n  -moz-border-radius: 3px 3px 3px 3px;\n  border-radius: 3px 3px 3px 3px;\n  border-radius: 0\\9;\n  border-color: #bcc1c8 #bababa #adb2bb;\n  background: #eff0f3;\n  background: -moz-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f7f8fa), color-stop(100%, #e7e9ec));\n  background: -webkit-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -o-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -ms-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: linear-gradient(top, #f7f8fa, #e7e9ec);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f7f8fa', endColorstr='#e7e9ec',GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: inset 0 1px 0 0 #fff;\n  -moz-box-shadow: inset 0 1px 0 0 #fff;\n  box-shadow: inset 0 1px 0 0 #fff;\n  box-sizing: border-box;\n}\n\n/*related to defect found in YSH page in www.amazon.fr\n  font family was overriden causing button overflow on\n  that particular page.\n  Related SIM: https://issues.amazon.com/issues/P13N-CONSUMABLES-3104\n*/\n#bia-hcb-widget .a-button-text {\n    font-family: Arial,sans-serif !important;\n}\n\n/*This class was added to remove star ratings from\n   Shared Component's templates. Star ratings are\n   currently not configurable. This will work as an\n   immediate solution.\n   TODO: Work with shared components to make star\n   ratings configurable in their Shared View Templates\n*/\n#bia_content .a-icon-row {\n    display: none;\n}\n\n#bia-hcb-widget .a-icon-row {\n      display: none;\n}\n\n#bia_content {\n    width: 266px;\n}\n\n.nav-flyout-sidePanel {\n    width: 266px !important;\n}\n.aui-atc-button {\n    margin-top: 3px;\n    overflow: hidden;\n    color: #111;\n    font-family: Arial,sans-serif;\n    font-size: 11px;\n    font-style: normal;\n    font-weight: normal;\n}\n.bia-item .bia-action-button:hover {\n  border-color: #aeb4bd #adadad #9fa5af;\n  background: #e0e3e8;\n  background: -moz-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e7eaf0), color-stop(100%, #d9dce1));\n  background: -webkit-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -o-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -ms-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: linear-gradient(top, #e7eaf0, #d9dce1);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e7eaf0', endColorstr='#d9dce1',GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n  -moz-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n}\n\n.bia-item .bia-action-button:active {\n  background-color: #dcdfe3;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n}\n\n.bia-item .bia-action-button-disabled {\n  background: #f7f8fa;\n  color: #b7b7b7;\n  border-color: #e0e0e0;\n  box-shadow: none;\n  cursor: default;\n}\n\n.bia-item .bia-action-button-disabled:hover {\n  background: #f7f8fa;\n  color: #b7b7b7;\n  border-color: #e0e0e0;\n  box-shadow: none;\n  cursor: default;\n}\n\n.bia-action-button-inner {\n  border-bottom-color: #111111;\n  border-bottom-style: none;\n  border-bottom-width: 0px;\n  border-image-outset: 0px;\n  border-image-repeat: stretch;\n  border-image-slice: 100%;\n  border-image-width: 1;\n  border-left-color: #111111;\n  border-left-style: none;\n  border-left-width: 0px;\n  border-right-color: #111111;\n  border-right-style: none;\n  border-right-width: 0px;\n  border-top-color: #111111;\n  border-top-style: none;\n  border-top-width: 0px;\n  box-sizing: border-box;\n  display: block;\n  height: 20px;\n  line-height: 19px;\n  overflow: hidden;\n  position: relative;\n  padding: 0;\n  vertical-align: baseline;\n}\n\n.bia-action-inner {\n  border: 0;\n  display: inline;\n  font-size: 11px;\n  height: auto;\n  line-height: 19px;\n  padding: 0px 4px 0px 4px;\n  text-align: center;\n  width: auto;\n  white-space: nowrap;\n}\n\n.csr-content {\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n  width: 220px;\n  line-height: 19px;\n}\n\n.bia-header {\n  font-size: 16px;\n  color: #E47911;\n  padding-bottom: 10px;\n}\n\n.bia-header-widget {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.b2b-nav-header {\n  white-space: nowrap;\n  overflow: hidden;\n  margin-bottom: 18px;\n}\n\n.bia-space-right {\n  padding-right: 18px;\n  white-space: normal;\n  float: left;\n}\n\n.b2b-see-more-link a {\n  display: inline;\n  float: left;\n  margin-top: 3px;\n  margin-left: 3px;\n}\n\n.hcb-see-more-link a {\n  color: #333;\n  font-size: 13px;\n  text-decoration: none;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-hcb-body {\n  overflow: hidden;\n}\n\n.bia-item {\n  width: 220px;\n  display: inline-block;\n  margin-bottom: 20px;\n}\n\n.bia-item-image {\n  float: left;\n  margin-right: 15px;\n  width: 75px;\n  height: 75px;\n}\n\n.bia-image {\n  max-height: 75px;\n  max-width: 75px;\n  border: 0;\n}\n\n.bia-item-data {\n  float: left;\n  width: 130px;\n}\n\n.bia-title {\n  line-height: 19px;\n  font-size: 13px;\n  max-height: 60px;\n  overflow: hidden;\n}\n\n.bia-link:link {\n  text-decoration: none;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-link:visited {\n  text-decoration: none;\n  color: #004B91;\n}\n\n.bia-price-nav {\n  margin-top: -4px;\n  color: #800;\n  font-size: 12px;\n  vertical-align: bottom;\n}\n\n.bia-price-yorr {\n    margin-top: -8px;\n    color: #800;\n    font-size: 12px;\n    vertical-align: bottom;\n}\n\n.bia-price {\n  color: #800;\n  font-size: 12px;\n  vertical-align: bottom;\n}\n\n.bia-vpc-t1{\n  color: #008a00;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.bia-vpc-t2{\n  color: #008a00;\n  font-size: 12px;\n}\n\n.bia-vpc-t3{\n  font-size: 12px;\n  line-height: 20px;\n}\n\n.bia-vpc-t3-badge{\n  color: #ffffff;\n  background-color: #e47911;\n  font-weight: normal;\n\n}\n\n.bia-vpc-t3-badge::before{\n  border-bottom: 10px solid #e47911;\n}\n\n.bia-vpc-t3-badge:after{\n  border-top: 10px solid #e47911;\n}\n\n.bia-ppu {\n  color: #800;\n  font-size: 10px;\n}\n\n.bia-prime-badge {\n  border: 0;\n  vertical-align: middle;\n}\n\n.bia-cart-action {\n  display: none;\n}\n\n.bia-cart-msg {\n  display: block;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n  line-height: 19px;\n}\n\n.bia-cart-icon {\n  background-image:\n      url(\"https://images-na.ssl-images-amazon.com/images/G/01/Recommendations/MissionExperience/BIA/bia-atc-confirm-icon._CB485946458_.png\");\n  display: inline-block;\n  width: 14px;\n  height: 13px;\n  top: 3px;\n  line-height: 19px;\n  position: relative;\n  vertical-align: top;\n}\n\n.bia-cart-success {\n  color: #090!important;\n  display: inline-block;\n  margin: 0;\n  font-size: 13px;\n  font-style: normal;\n  font-weight: bold;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-cart-title {\n  margin-bottom: 3px;\n}\n\n.bia-cart-form {\n  margin: 0px;\n}\n\n.bia-inline-cart-form {\n  margin: 0px;\n}\n\n.bia-cart-submit {\n  cursor: inherit;\n  left: 0;\n  top: 0;\n  line-height: 19px;\n  height: 100%;\n  width: 100%;\n  padding: 1px 6px 1px 6px;\n  position: absolute;\n  opacity: 0.01;\n  overflow: visible;\n  filter: alpha(opacity=1);\n  z-index: 20;\n}\n\n.bia-link-caret {\n  color: #e47911;\n}\n\n",
            }}
          />
          <div style={{ display: "none" }}>
            <div
              id="nav-prime-menu"
              className="nav-empty nav-flyout-content nav-ajax-prime-menu"
            >
              <div className="nav_dynamic" />
              <div className="nav-ajax-message" />
              <div className="nav-ajax-error-msg">
                <p className="nav_p nav-bold">
                  There's a problem loading this menu right now.
                </p>
                <p className="nav_p">
                  <a
                    href="https://www.amazon.com/gp/prime/ref=nav_prime_ajax_err"
                    className="nav_a"
                  >
                    Learn more about Amazon Prime.
                  </a>
                </p>
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n  #nav-prime-tooltip{\n    padding: 0 20px 2px 20px;\n    background-color: white;\n    font-family: arial,sans-serif;\n  }\n  .nav-npt-text-title{\n    font-family: arial,sans-serif;\n    font-size: 18px;\n    font-weight: bold;\n    line-height: 21px;\n    color: #E47923;\n  }\n  .nav-npt-text-detail, a.nav-npt-a{\n    font-family: arial,sans-serif;\n    font-size: 12px;\n    line-height: 14px;\n    color: #333333;\n    margin: 2px 0px;\n  }\n  a.nav-npt-a {\n    text-decoration: underline;\n  }\n",
            }}
          />
          <div style={{ display: "none" }}>
            <div id="nav-prime-tooltip">
              <div className="nav-npt-text-title">
                {" "}
                Get free delivery with Amazon Prime{" "}
              </div>
              <div className="nav-npt-text-detail">
                {" "}
                Prime members enjoy FREE Delivery and exclusive access to music,
                movies, TV shows, original audio series, and Kindle books.{" "}
              </div>
              <div className="nav-npt-text-detail">
                &gt;
                <a
                  className="nav-npt-a"
                  href="https://www.amazon.com/prime/ref=nav_tooltip_redirect"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
          <link
            rel="stylesheet"
            type="text/css"
            href="./profile_files/redirect-overlay-nav-https-20200206._CB423514839_.css"
          />
          {/*[if lte IE 9]><link rel="stylesheet" type="text/css" href="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/redirect-overlay/redirect-overlay-lte-ie9._CB485936874_.css"><![endif]*/}
          {/* btf tilu */}
          {/* sp:feature:host-btf */}
          {/* sp:end-feature:host-btf */}
          {/* sp:feature:aui-preload */}
          {/* sp:feature:nav-footer */}
          {/* footer pilu */}

          {/* whfh-yvj42hjM84a73XYaAs5aPrNXHk3OkHsIHokMdLL/J31kWs84HVjiJK83dDQ5oMnTR812zbrBrEM= rid-VTRH0ACK9YJ9CDRE84VP */}
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
          {/* footer tilu */}
          {/* sp:feature:amazon-pay-iframe */}
          {/* sp:end-feature:amazon-pay-iframe */}
          <div id="be" style={{ display: "none", visibility: "hidden" }}>
            <form
              name="ue_backdetect"
              action="https://www.amazon.com/gp/profile/get"
            >
              <input type="hidden" name="ue_back" defaultValue={2} />
            </form>
          </div>
          <noscript>
            &lt;img height="1" width="1" style='display:none;visibility:hidden;'
            src='//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:146-2783406-4360863:VTRH0ACK9YJ9CDRE84VP$uedata=s:%2Fgp%2Fuedata%3Fnoscript%26id%3DVTRH0ACK9YJ9CDRE84VP:0'
            alt=""/&gt;
          </noscript>
        </div>

        {/* sp:eh:IqOVpnJ5GIjJMVwKFKVKL6shlBOkRCmqdhT0oc7GfGBN8+S5Y3aYsxdPZSmOW32DJ6WpV/HQhCJh7ZB4VgC+Iht74BN6U9TB3i4XHfiVkLYWppeVJTjoOm1AG6o= */}
        <div id="a-popover-root" style={{ zIndex: -1, position: "absolute" }} />
        <span
          style={{
            position: "fixed",
            visibility: "hidden",
            top: "0px",
            left: "0px",
          }}
        >
          ...
        </span>
        <span
          style={{
            position: "fixed",
            visibility: "hidden",
            top: "0px",
            left: "0px",
          }}
        >
          ...
        </span>
      </div>
    );
  }
}

export default Profile;
