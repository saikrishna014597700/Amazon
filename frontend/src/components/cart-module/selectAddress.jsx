import { Component } from "react";
import Axios from "axios";

export default class addressSelect extends Component{
    constructor(){
        super();
        this.state = {
            userId:3,
            addresses:[]
        }
    }

    componentDidMount(){
        Axios.get
    }
}