import React, { Component } from "react";
import {Form,Button, FormGroup} from 'react-bootstrap'

export default class Login extends Component {
    render() {
        return (
           <div >
                 <div className="container">
		<div className="row">
       
        <img src ={require("../../utils/logo.jpg") } style={{float:"center",height:"100px",width:"200px"}} alt="hs"/>
       
			<div className="panel panel-primary">
				<div className="panel-body">
					<div className="form" style={{alignItems:"center"}}>
						<div className="form-group">
							<h1>Sign-In</h1>
						</div>
						<div className="form-group">
							<strong>Email or mobile phone number</strong>
							<input id="signinEmail" type="email" maxlength="50" className="form-control"/>
						</div>
						<div className="form-group">
							<strong>Password</strong>
                            &nbsp;  
							<span className="right"><a href="#">Forgot your password?</a></span>
							<input id="signinPassword" type="password" maxlength="25" className="form-control"/>
						</div>
						<div className="form-group" style={{paddingTop: "12px"}}>
                        <Button variant="warning" size="lg" block>Sign In</Button>				
                        		</div>
						<div className="form-group divider">
							<hr className="left"/><small>New to site?</small><hr className="right"/>
						</div>
						<p className="form-group"><a href="#" className="btn btn-info btn-block">Create an account</a></p>
						<p className="form-group">By signing in you are agreeing to our <a href="#">Terms of Use</a> and our <a href="#">Privacy Policy</a>.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
  

           </div>
        
        );
    }
}