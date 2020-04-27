import React, { Component } from 'react';
import "./profile.css"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            logout: false
        };
    }

   

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleImageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

   

    render() {
        
        

        return (
            <div className="container">
            <div className="row">
            <div className="col-md-1"></div>
                <div className="col-md-10">
        
                    <div className="card hovercard" style={{height:"275px"}}>
                        <div className="cardheader" style={{height:"275px"}}>
        
                        </div>
                        <div className="avatar">
                            <img alt="" src="http://lorempixel.com/100/100/people/9/" style={{float:"center",width:"220px",height:"220px"}}/>
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
                    </div>
        
                </div>
        
            </div>
        </div>
        );
    }
}

export default Profile;