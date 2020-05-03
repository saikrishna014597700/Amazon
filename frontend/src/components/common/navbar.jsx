import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import { Redirect } from "react-router";
import SearchProduct from "./searchProduct";
class Navbar extends Component {
 constructor(props) {
   super(props);
   this.state = {
     headerArray: [],
     companyHeaderArray: [],
     products: [],
     sellers: [],
     searchCategory: "All",
     searchTerm: "",
     rating: 4.3,
     active:false,
     redirectVar :null
   };
   this.onMenuClick = this.onMenuClick.bind(this)
   this.handleLogout = this.handleLogout.bind(this);
 }
  onMenuClick(){
     const currentState = this.state.active;
     this.setState({active:!currentState});
 }
 
 handleLogout(){
   localStorage.removeItem("id");
   localStorage.removeItem("role");
   localStorage.removeItem("name");
   this.setState({
     redirectVar : <Redirect to= "/login"/>
   })
 }
 
 componentDidMount() {}
 async viewSeachResults() {
   const payload = {
     searchTerm: this.state.searchTerm,
     searchCategory: this.state.searchCategory,
   };
   axios
     .post("http://localhost:3001/api/common/search/", payload)
     .then((response) => {
       console.log("Pro are::", response);
       this.setState({
         products: response.data,
       });
     });
 }
 async changeHandler(e) {
   console.log("value selected =>" + e.target.value);
   await this.setState({
     searchCategory: e.target.value,
   });
 }
 
 async changeHandlerTerm(e) {
   console.log("value selected =>" + e.target.value);
   await this.setState({
     searchTerm: e.target.value,
   });
 }
 
 
 render() {
   let navLogin = null;
   let image = null;
   let navBar = null
   let headers = this.state.headerArray.map((header) => {
     return (
     
       <ul className="nav navbar-nav" key={header.tab_name}>
         <li>
           <Link
             to={header.route}
             style={{ color: "white", fontWeight: "bold" }}
           >
             {header.header_name}
           </Link>
         </li>
       </ul>
 
     );
   });
 
   let dropdowns = null;
 
   if(localStorage.getItem("id")){
 
     if(localStorage.getItem("role")==="Customer"){
       dropdowns = (
         <div>
         <a className="dropdown-item" href="/profile"> Your Profile</a>
           <a className="dropdown-item" href="/orders"> Your Orders</a>
           <a className="dropdown-item" href="/customerCards"> Your Cards</a>
           <a className="dropdown-item" href="/customerAddresses"> Your Addresses</a>
           <a className="dropdown-item" href="#">Another action</a>
           </div>)
     }else if (localStorage.getItem("role")==="Seller"){
       dropdowns = (
         <div>
         <a className="dropdown-item" href="/sellerProfile"> Your Profile</a>
           <a className="dropdown-item" href="/viewAllSellerProducts"> Your Inventory</a>
           <a className="dropdown-item" href="/addProduct"> Add Products</a>
           <a className="dropdown-item" href="/sellerOrders"> Your Orders</a>
           <a className="dropdown-item" href="/sellerReports"> Your Reports</a>
           <a className="dropdown-item" href="#">Another action</a>
           </div>)
 
     }else{
       dropdowns = (
         <div>
         <a className="dropdown-item" href="/inventory-listings"> Inventory Listings</a>
         </div>
       )
     }
   }
 
   image = (
     <img
       style={{width:"120px",height:"40px", marginRight:"20px"}}
       src ={require("../../utils/navBarLogo.jpg") }
     />
   );
   if(!localStorage.getItem("id")){
     navBar = ""
    
 }else{
   navBar = (
   <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor:"#232f3e",marginTop:"2px"}}>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{backgroundColor:"#232f3e",margin:"-20px"}}>
    
     <ul class="navbar-nav mr-auto">
      
       <li>
           <div className={this.state.active? "menu-btn open": "menu-btn"} onClick={this.onMenuClick} style={{marginLeft:"15px"}}>
               <div className="menu-toggler">
               </div>
           </div>
       </li>
       <li>
           <div style={{margin:"20px"}}>{image}</div>
          
       </li>
       <li>
         <div className="input-group"style={{margin:"20px"}}>
           <select
             style={{
               width: `${8 * this.state.searchCategory.length + 25}px`,
               height: "40px",
               backgroundColor: "#e7eae8",
               borderTopLeftRadius:"5px",
               borderBottomLeftRadius:"5px",
               fontSize:"12px"
             }}
            
             onChange={(e) => {
               this.changeHandler(e);
             }}
           >
             <option value="ALL">All</option>
             <option value="Electronics">Electronics</option>
             <option value="Fashion">Fashion</option>
             <option value="Furniture">Furniture</option>
           </select>
           <input
             type="text"
             onChange={(e) => {
               this.changeHandlerTerm(e);
             }}
             id="search"
             style={{
               width: `${650 - 8 * this.state.searchCategory.length + 30}px`,
             }}
           ></input>
           <button
             type="button"
             style={{width:"40px",backgroundColor:"#febe62",border:0,borderTopRightRadius:"5px",borderBottomRightRadius:"5px"}}
             height="40px"
 
             onClick={(e) => {
               this.viewSeachResults();
             }}
            
           >
             <i className="glyphicon glyphicon-search" style={{width:"25px"}}></i>
           </button>
         </div>
       </li>
       <li className="nav-item dropdown" style={{marginTop:-4}}>
         <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"white",width:"150%",marginTop:"20px",fontSize:"12px",fontWeight:"bold",fontFamily:"sans-serif"}}>
           <div style={{fontSize:11.5,color:"#cccccc",fontWeight:"normal"}}>
           Hello, {localStorage.getItem("name")}<br></br></div>
           <div style={{fontSize:13,fontWeight:"bold"}}>
           Account & Lists<span class="caret" style={{color:"#cccccc"}}></span>
           </div>
         </a>
         <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{marginTop:-25,marginLeft:15}}>
           {dropdowns}
           <div className="dropdown-divider"></div>
           <a className="dropdown-item" onClick = {this.handleLogout}>Logout</a>
         </div>
       </li>
 
       <li class="nav-item dropdown" style={{marginLeft:"20px"}}>
         <a  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"white",width:"150%",marginLeft:"20px",fontSize:"12px",fontWeight:"bold",fontFamily:"sans-serif"}}>
           <div style={{fontSize:11.5,color:"#cccccc",fontWeight:"normal"}}>
           Returns<br></br></div>
           <div style={{fontSize:13,fontWeight:"bold"}}>
           & Orders
           </div>
         </a>
        
       </li>
      <li class="nav-item" style={{marginTop:"10px"}}>
           <div style={{fontSize:13,fontWeight:"bold",color:"white"}}>
           <img src={require ("../../utils/cart.JPG")}></img>
           </div>
      </li>
     
     </ul>
   
   </div>
 </nav>);
 }
   return (
     <div>
       {this.state.redirectVar}
       {navBar}
       {/* </nav> */}
     </div>
   );
 }
}
 
export default Navbar;
  

