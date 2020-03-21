import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';

// import { Link } from 'react-router-dom'
import $ from 'jquery';
const SERVER = process.env.REACT_APP_API_URL


class Footer extends Component {
    constructor(props){
        super(props)
        this.state={
            walletBalance:0,
            userName:null
        }
    }

    async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getUserbyuserName`, { id: USERID })
        console.log("============yyyyyyyy=678015r24e2732====llllllllllll=", response.data.status)

        if (response.status) {
            await this.setState({ walletBalance: (response.data.user.walletBalance).toFixed(0) })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        }
        console.log("=========123===========", this.state.walletBalance)
        //    await this.setState({currentServerTime:response.data.time})
    }
    componentDidMount(){
        this.getUser()
        
    }
     handleLogout = (event)=>{
        event.preventDefault()
        localStorage.clear()
        window.location='/'

     } 
     render() {
         console.log("=======yh cahal raha")

        return (
            <footer className="content-mobile">
            <ul class="menu-links">
               <li class="item"><Link to="/superAdmin/cricketMarket"><img src="../images/inplay.png"/><span>Inplay</span></Link></li>
               <li class="item"><Link to="/superAdmin/masterlist" class="UserChipData" ><img src="../images/edit-stake.png"/><span>Edit stake</span></Link></li>
               <li class="item"><Link to="/superAdmin/cricketMarket" class="site_title endcooki active"><img src="../images/home.png"/></Link></li>
               <li class="item"><Link to="/superAdmin/SuperAdminCricket"><img src="../images/history.png"/><span>Bet History</span></Link></li>
               <li class="item" onClick={this.handleLogout}><img src="../images/logout.png"/><span>Logout</span></li>
            </ul>
         </footer>
        )
    }


}

export default Footer;