import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import SubHeader from './subHeader'
import Sidebar from './sidebar'

import Footer from './footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
console.log("==========12344151661771718818=========",SERVER)
class SuperAdminHome extends Component{
	constructor(props){
		super(props)
		this.state = {
			userName:'',
            password:'',
            walletBalance:0,
            superadminwalletBalance:0,
            Commission:null
		}
    }
    
    handleInput = (event) =>{
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
     }
    
     async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getUserbyuserName`, { id: USERID })
        console.log("============yyyyyyyy=678015r24e2732====llllllllllll=", response.data)

        if (response.status) {
            await this.setState({ superadminwalletBalance: (response.data.user.walletBalance).toFixed(0) })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        }
        console.log("=========123===========", this.state.walletBalance)
        //    await this.setState({currentServerTime:response.data.time})
    }
    componentDidMount(){
        this.getUser()
    }
    handleSubmit =(event)=>{
        event.preventDefault()
         const token = localStorage.getItem('superAdmintoken')
         axios.defaults.headers.common['Authorization'] = token;
         axios.post(`${SERVER}/addMasterAdmin`,{userName:this.state.userName,password:this.state.password,walletBalance:parseInt(this.state.walletBalance),Commission:parseFloat(this.state.Commission)}).then((response)=>{
                              console.log("=============",response)
             if(response.data.status){
                    toast(response.data.message, {containerId: 'B'})
                    this.setState({userName:'',password:'',walletBalance:0})
                    this.getUser()
             }
             else{
                toast(response.data.message, {containerId: 'B'})
                this.setState({userName:'',password:'',walletBalance:0})
                this.getUser()

             }
         }).catch((error)=>{
             console.log("===========",error)
         })
         
     }

    render(){

        return(
            <body className="" style={{}}>
            <Header />
            <SubHeader />
            <Sidebar />

           <div class="container">

                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-header">
        <h3 className="text-align-centre" style={{"color":"black"}}>SuperAdmin Wallet Balance :{this.state.superadminwalletBalance}</h3>

                            <h3 className="text-align-centre" style={{"color":"black"}}>ADD MASTER</h3>
                            {/* <div class="d-flex justify-content-end social_icon">
                                <span><i class="fab fa-facebook-square"></i></span>
                                <span><i class="fab fa-google-plus-square"></i></span>
                                <span><i class="fab fa-twitter-square"></i></span>
                            </div> */}
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><img className="image_Width" src="../images/userLogin.png"></img></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="username" name="userName" value={this.state.userName} onChange={this.handleInput} />
                                    
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><img className="image_Width" src="../images/UserLock.png"></img></span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="password" name="password" value={this.state.password} onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><img className="image_Width" src="../images/wallet.svg"></img></span>
                                    </div>
                                    <input type="number" class="form-control" placeholder="Amount Deposited" name="walletBalance" value={this.state.walletBalance} onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><img className="image_Width" src="../images/percentage.svg"></img></span>
                                    </div>
                                    <input type="number" class="form-control" placeholder="Commission" name="Commission" value={this.state.Commission} onChange={this.handleInput} />
                                </div>
                                <div class="row align-items-center remember">
                                    {/* <input type="checkbox">Remember Me </input> */}
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="ADD" class="btn float-right login_btn" onSubmit={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                        {/* <div class="card-footer">
                            <div class="d-flex justify-content-center links">
                                Don't have an account?<a href="#">Sign Up</a>
                            </div>
                            <div class="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div> */}
                                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
            
                    </div>
                </div>
            </div>
            <Footer />

            </body>
            
                            
                        // </div>
        )
    }
}

export default SuperAdminHome;