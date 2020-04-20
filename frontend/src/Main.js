import React,{Component} from "react";
import Home from "./components/home-module/home";
// import SignIn from "./components/signin-module/login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from "./components/common/alert";
import SignUp from "./components/signup-module/signup";
import Login from "./components/login-module/login"


//Create a Main Component
class Main extends Component {
  render(){
      return(
        <Router>
    
          <div>
          <Switch>
                   <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="login" component={Login}/>
        </Switch>
          </div>
          </Router>
         
      )
  }
}

export default Main;
