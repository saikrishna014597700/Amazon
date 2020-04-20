import React, { Component } from "react";
import {Form,Button, FormGroup} from 'react-bootstrap'

export default class Login extends Component {
    render() {
        return (
           <div >
		    <div className="auth-wrapper">
        <div className="auth-inner">
                 <div className="container">
		<div className="row">
       
        <img src ={require("../../utils/logo.jpg") } style={{marginLeft:"70px", float:"center",height:"100px",width:"200px"}} alt="hs"/>
       
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
                        <Button variant="warning"	>Sign In</Button>				
                        		</div>
					
						<p className="form-group">By signing in you are agreeing to our <a href="#">Terms of Use</a> and our <a href="#">Privacy Policy</a>.</p>
						<div className="form-group divider">
							<hr className="left"/><small>New to Amazon?</small><hr className="right"/>
						</div>
						<p className="form-group"><a href="/signup" className="btn btn-light">Create your amazon account</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	</div>
  

           </div>
        
        );
    }
}