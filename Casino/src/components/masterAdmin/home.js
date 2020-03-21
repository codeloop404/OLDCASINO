import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class MasterAdminHome extends Component{
	constructor(props){
		super(props)
		this.state = {
			userName:'',
            password:'',
            walletBalance:0,
            masterAdminBalance:null
		}
    }
    async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('masterAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getUserbyuserName`, { id: USERID })
        console.log("============yyyyyyyy=678015r24e2732====llllllllllll=", response.data)

        if (response.data.status) {
            await this.setState({ masterAdminBalance: (response.data.user.walletBalance).toFixed(0) })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        }
        console.log("=========123===========", this.state.walletBalance)
        //    await this.setState({currentServerTime:response.data.time})
    }
    componentDidMount(){
        this.getUser()
    }
    handleInput = (event) =>{
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
     }
    
    handleSubmit =(event)=>{
        event.preventDefault()
         console.log("================",this.state)
         const token = localStorage.getItem('masterAdmintoken')
         axios.defaults.headers.common['Authorization'] = token;
 
 
         axios.post(`${SERVER}/addUser`,{userName:this.state.userName,password:this.state.password,walletBalance:this.state.walletBalance}).then((response)=>{
                              console.log("=============",response)

             if(response.data.status){
         
                    toast(response.data.message, {containerId: 'B'})
                    this.setState({userName:'',password:''})
                this.getUser()
               
       
    
    
             }
             else{
                toast(response.data.message, {containerId: 'B'})
    
             }
         }).catch((error)=>{
             console.log("===========",error)
         })
         
     }
	

    render(){

        return(
            <body  >
             <Header />
             <Sidebar />
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-header" style={{"color":"black"}}>
                        <h3 className="text-align-centre" style={{"color":"black"}}>MasterAdmin Wallet Balance :{this.state.masterAdminBalance}</h3>

                            <h3 className="text-align-centre">ADD USER</h3>
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
                                <div class="row align-items-center remember">
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="ADD" class="btn float-right login_btn" onSubmit={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                       
                                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
            
                    </div>
                </div>
            </div>
                            
                        </body>
        )
    }
}

export default MasterAdminHome;