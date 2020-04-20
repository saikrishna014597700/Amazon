import React, { Component } from "react";
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Shopping List for </h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
          <Link to="signup">signup</Link>
        </ul>
      </div>
    );
  }
}

export default Home;
