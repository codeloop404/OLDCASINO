import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';

// import { Link } from 'react-router-dom'
import $ from 'jquery';
const SERVER = process.env.REACT_APP_API_URL


class SubHeader extends Component {
    constructor(props){
        super(props)
        this.state={
            walletBalance:0,
            userName:null
        }
    }

    async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('masterAdmintoken')
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
            <div className="Header_headerContainer__2DG16  " style={{backgroundColor:"black"}}>
               
               <div class="dropdown">
  <button class="dropbtn">Account</button>
  <div class="dropdown-content">
 
  <Link to="/superAdminHome">Add Master
  
                                    </Link>
                                
                              
                                    
                                 
                                    <button onClick={this.handleLogout} class="dropbtn"  >Logout
                                      
                                    </button>
                                        
  </div>
  
</div>
<div class="dropdown">
  <button class="dropbtn">Report</button>
  <div class="dropdown-content">
  <Link class=""  to="/superAdmin/account">Account Statement
                                  
                                  </Link>
  <Link class="" to="/superAdmin/Completed">Casino Market P/L
     
                                    </Link>
                                    <Link class="" to="/superAdmin/SuperAdminCricket">Cricket Market P/L
     
     </Link>      
                      
            
  </div>
</div>
<div class="dropdown">
  <button class="dropbtn">Users</button>
  <div class="dropdown-content">
  <Link to="/superAdmin/userlist">UserList
    
                                    </Link>
                                    
                                    <Link to="/superAdmin/masterlist">MasterList
                                       
                             
                                    </Link>
                                
  </div>
  
</div>
<div class="dropdown">
  <button class="dropbtn">In-Play </button>
  <div class="dropdown-content">
  <Link to="/superAdmin/cricketMarket">Live Cricket
  
                                    </Link>
                                 
                                <Link to="/superAdmin/SuperAdminCasinoLiveHistory">Live Casino
                                   
                                    </Link>
                                    
  </div>
  
</div>
               
   
            </div>
        )
    }


}

export default SubHeader;