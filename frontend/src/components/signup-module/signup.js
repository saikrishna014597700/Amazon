import React, { Component } from "react";
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class SignUp extends Component {
    render() {
        return (
            <div>
              <div className="auth-wrapper">
        <div className="auth-inner">
                  <div className="container">
         <div className="row">
        
         <img src ={require("../../utils/logo.jpg") } style={{float:"center",height:"100px",width:"200px"}} alt="hs"/>
        
             <div className="panel panel-primary">
                 <div className="panel-body">
                     <Form>
                         <div className="form-group">
                             <h1>Create Account</h1>
                         </div>
                         <div className="form-group">
                             <strong>Your name</strong>
                             <input id="name" type="text" maxlength="50" className="form-control"/>
                         </div>
                         <div className="form-group">
                             <strong>Email</strong>
                             <input id="signupEmail" type="email" maxlength="50" className="form-control"/>
                         </div>
                         <div className="form-group">
                             <strong>Password</strong>
                             <input id="signupPassword" type="password" maxlength="25" placeholder="At least 6 characters" className="form-control"/>
                         </div>
                         <div className="form-group" style={{paddingTop: "12px"}}>
                         <Button variant="warning" size="lg" block>Create your Amazon account</Button>				
                                 </div>
                         
                         <p className="form-group">By creating an account you are agreeing to our <a href="#">Terms of Use</a> and our <a href="#">Privacy Policy</a>.</p>
                         <div className="form-group divider">
                             <hr className="left"/><small>Already have an account?</small><hr className="right"/>&nbsp; <Link>Sign-in →</Link>
                         </div>
                     </Form>
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

export default SignUp;