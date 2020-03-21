import React, {Component} from 'react';
import Header1 from '../Header1'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
console.log("=======yh hai ================server url")
class ChangePasswordUser extends Component{
	constructor(props){
		super(props)
		this.state = {
			userName:'',
            password:'',
            Confpassword:''
		}
	}
	componentDidMount(){
		

	

	}
   handleInput = (event) =>{
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
 }
 handleSubmit =(event)=>{
	event.preventDefault()
     console.log("================",this.state)
     if(this.state.password != this.state.Confpassword){
        toast("Please Enter Same Password", {containerId: 'B'})

     }else{
     const token = localStorage.getItem('usertoken')
     axios.defaults.headers.common['Authorization'] = token;
	 axios.post(`${SERVER}/changePasswordbyUser`,{password:this.state.password}).then((response)=>{
		console.log("=============",response)

		 if(response.data.status){
            toast(response.data.message, {containerId: 'B'})

			// //  console.log("=============",response)
			
			
			//  toast(response.data.message, {containerId: 'B'})


		 }
		 else{
			toast(response.data.message, {containerId: 'B'})

		 }
	 }).catch((error)=>{
		 console.log("===========",error)
     })
    }
    
	 
 }


	render() {

		return (
			<div className="">
                <body>
                    <Header1 />
				<div class="container">
					<div class="d-flex justify-content-center h-100">
						<div class="card3 card3_center">
							<div class="card-header">
								<h3 className="LOGIN">Change Password</h3>
								
							</div>
							<div class="card-body">
								<form className="Form_Width">
									<div class="input-group form-group margin_Bottom">
										<div class="input-group-prepend">
											{/* <span class="input-group-text Left_border"><i class="fa fa-user-o"></i></span> */}
											<span class="input-group-text Left_border"><img className="image_Width" src="../images/UserLock.png"></img></span>
										</div>
										<input type="password" class="form-control1 Right_border" placeholder="password" name="password" onChange={this.handleInput} />

									</div>
									<div class="input-group form-group margin_Bottom1">
										<div class="input-group-prepend">
											<span class="input-group-text Left_border"><img className="image_Width" src="../images/UserLock.png"></img></span>
										</div>
										<input type="password" class="form-control1 Right_border" placeholder="confirm password" name="Confpassword" onChange={this.handleInput} />
									</div>
									
									<div class="form-group Login margin_Top">
										<input type="submit" value="UPDATE" class="btn float-right login_btn" onClick={this.handleSubmit}/>
									</div>
								</form>
							</div>
							<div class="card-footer">
								
								<div class="d-flex justify-content-center">
								</div>
							</div>
						</div>
					</div>
				</div>
                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />

</body>
			</div>
		)
	}
}

export default ChangePasswordUser;