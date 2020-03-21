import React, {Component} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Music  from './Music'
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
console.log("=======yh hai ===========loginpage=====server url",SERVER)
class LoginPage extends Component{
	constructor(props){
		super(props)
		this.state = {
			userName:'',
			password:''
		}
	}
	componentDidMount(){
		const AUTH = localStorage.getItem('usertoken')
		const MASTER = localStorage.getItem('masterAdmintoken')
		const SUPER = localStorage.getItem('superAdmintoken')

		if(AUTH != null ){
			window.location = '/cricket'
            return
		}
		if(MASTER != null){
			window.location = '/MasterAdminCricket'
			return
		}
		if(SUPER != null){
			window.location = '/superAdmin/cricketMarket'
			return
		}

	

	}
   handleInput = (event) =>{
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
 }
 handleSubmit =(event)=>{
	event.preventDefault()
	 console.log("================",this.state)
	 axios.post(`${SERVER}/login`,{userName:this.state.userName,password:this.state.password}).then((response)=>{
		console.log("=============",response)

		 if(response.data.status){
			// //  console.log("=============",response)
			 if(response.data.superAdmin){
				toast(response.data.message, {containerId: 'B'})
				localStorage.setItem("superAdmintoken",response.data.superAdmintoken)
				localStorage.setItem("userName",this.state.userName)

				// return (<SuperAdminHome />)
				window.location = '/superAdmin/cricketMarket'
			 }
			 if(response.data.masterAdmin){
				toast(response.data.message, {containerId: 'B'}) 
				// return (<MasterAdminHome />)'
				localStorage.setItem("userName",this.state.userName)

				localStorage.setItem("masterAdmintoken",response.data.masterAdmintoken)

				window.location = '/MasterAdminCricket'

			 }
			 if(response.data.user){
				toast(response.data.message, {containerId: 'B'}) 
				// return(<UserHome />)
				localStorage.setItem("usertoken",response.data.usertoken)
				localStorage.setItem("userName",this.state.userName)

				window.location = '/cricket'


			 }
			//  toast(response.data.message, {containerId: 'B'})


		 }
		 else{
			toast(response.data.message, {containerId: 'B'})

		 }
	 }).catch((error)=>{
		 console.log("===========",error)
	 })
	 
 }


	render() {

		return (
			<div className="BackGround1">
				<div class="container">
					<div class="d-flex justify-content-center h-100">
						<div class="card3 card3_center">
							<div class="card-header">
								<h3 className="LOGIN">Login</h3>
								{/* <div class="d-flex justify-content-end social_icon">
									<span><i class="fab fa-facebook-square"></i></span>
									<span><i class="fab fa-google-plus-square"></i></span>
									<span><i class="fab fa-twitter-square"></i></span>
								</div> */}
							</div>
							<div class="card-body">
								<form className="Form_Width">
									<div class="input-group form-group margin_Bottom">
										<div class="input-group-prepend">
											{/* <span class="input-group-text Left_border"><i class="fa fa-user-o"></i></span> */}
											<span class="input-group-text Left_border"><img className="image_Width" src="../images/userLogin.png"></img></span>
										</div>
										<input type="text" class="form-control1 Right_border" placeholder="username" name="userName" onChange={this.handleInput} />

									</div>
									<div class="input-group form-group margin_Bottom1">
										<div class="input-group-prepend">
											<span class="input-group-text Left_border"><img className="image_Width" src="../images/UserLock.png"></img></span>
										</div>
										<input type="password" class="form-control1 Right_border" placeholder="password" name="password" onChange={this.handleInput} />
									</div>
									{/* <div class="row align-items-center remember">
										<input type="checkbox" /><span className="remember_Me">Remember Me</span>
									</div> */}
									<div class="form-group Login margin_Top">
										<input type="submit" value="LOGIN" class="btn float-right login_btn" onClick={this.handleSubmit}/>
									</div>
								</form>
							</div>
							<div class="card-footer">
								
								<div class="d-flex justify-content-center">
									{/* <a className="forget_Color" href="#">Forgot your password?</a> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				<ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />

				{/* <Music /> */}
				{/* <audio controls>
  <source src="horse.ogg" type="audio/ogg" />
 
Your browser does not support the audio element.
</audio> */}
			</div>
		)
	}
}

export default LoginPage;