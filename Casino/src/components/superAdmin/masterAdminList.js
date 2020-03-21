import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import SubHeader from './subHeader'
import Footer from './footer'

import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const customStyles = {
    content : {
      top                   : '20%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 :'60%' 
    }
  };
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class SuperAdminMasterList extends Component{
	constructor(props){
		super(props)
		this.state = {
            userName:null,
            password:null,
            Confpassword:null,
            users:[],
            modalIsOpen: false,
            userid:null,
            modalIs2Open:false,
            modalIs3Open:false,
            Commission:null,
            modalIs4Open:false

        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
   getAllMasterAdmin (){
    const token = localStorage.getItem('superAdmintoken')
    axios.defaults.headers.common['Authorization'] = token;
    axios.post(`${SERVER}/getAllMasterAdmin`,{limit:10,offset:10,search:'',}).then((response)=>{
                         console.log("=============",response)

        // if(response.data.status){
        
            console.log("=============",response)
             this.setState({users:response.data.message})

        // }
        // else{
           toast(response.data.message, {containerId: 'B'})

        // }
    }).catch((error)=>{
        console.log("===========",error)
    })
   }
    
     componentDidMount(){
       this.getAllMasterAdmin()
     
      }

      handleClick=(e,objectID)=>{
        console.log("========",objectID)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/blockUser`,{id:objectID}).then((response)=>{
          if(response.data.status){
              toast(response.data.message, {containerId: 'B'})
              this.getAllMasterAdmin()
          }

        })
                          //    console.log("=============",response)
    }
    handleChangePassword = (e,id)=>{
        console.log(id)
        this.setState({modalIsOpen: true,userid:id});


    }
    openModal() {
        this.setState({modalIsOpen: true});
      }
     
     
     
      closeModal() {
        this.setState({modalIsOpen: false});
      }
      handlePassword =(event)=>{
          console.log(event.target.name)
          this.setState({[event.target.name]:
        event.target.value
    })
   

      }
      handleStake = (event)=>{
        this.setState({[event.target.name]:
          event.target.value
      })
      }
      handleStakeSubmit = (event)=>{
        event.preventDefault()

        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateStakeClient`,{userid:this.state.userid,Commission:parseInt(this.state.Commission)}).then((response)=>{
            console.log("===========1====================",response)
          if(response.data.status){
            console.log("===========2====================",response)
            toast(response.data.message, {containerId: 'B'})
            this.setState({modalIs3Open: false});
            this.getAllMasterAdmin()


          }else{
            console.log("===========3====================",response)
            toast(response.data.message, {containerId: 'B'})
            this.setState({modalIs3Open: false});
            this.getAllMasterAdmin()


          }
        })
      }
      handleChangePasswordSubmit = (event)=>{
          event.preventDefault()
        //   console.log("this.state====================",this.state.password == this.state.Confpassword)
          if(this.state.password != this.state.Confpassword){
            console.log("this.state=====12===============",this.state.password == this.state.Confpassword,this.state)
            toast("Please Enter Same Password", {containerId: 'B'})

          }else{
            console.log("this.state=====123===============",this.state.password == this.state.Confpassword,this.state)
            const token = localStorage.getItem('superAdmintoken')
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${SERVER}/changePassword`,{userid:this.state.userid,password:this.state.password}).then((response)=>{
                console.log("===========1====================",response)
              if(response.data.status){
                console.log("===========2====================",response)
                toast(response.data.message, {containerId: 'B'})
                this.setState({modalIsOpen: false});
                this.getAllMasterAdmin()


              }else{
                console.log("===========3====================",response)
                toast(response.data.message, {containerId: 'B'})
                this.setState({modalIsOpen: false});
                this.getAllMasterAdmin()



              }
            })

          }
      }
   
    handleUnblock = (e,objectID)=>{
      console.log("========",objectID)
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/unblockUser`,{id:objectID}).then((response)=>{
        if(response.data.status){
          toast(response.data.message, {containerId: 'B'})
          this.getAllMasterAdmin()
        }

      })
    }
	selectCalnder = (e)=>{
        console.log(e.target.value)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/getAllMasterAdmin`,{limit:10,offset:10,search:e.target.value,}).then((response)=>{
            console.log("================",response)
            this.setState({users:response.data.message})

        })
    }
    selectName =(e)=>{
        console.log(e.target.value)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/getAllMasterAdmin`,{limit:10,offset:10,search:e.target.value,}).then((response)=>{
            console.log("================",response)
            this.setState({users:response.data.message})

        })
    }
    handleWallet = (e,id)=>{
      console.log("=========9000000==========",id)
      this.setState({modalIs2Open:true,userid:id})
    
    }
    handleWalletWithdraw = (e,id)=>{
      console.log("=========9000000==========",id)
      this.setState({modalIs4Open:true,userid:id})
    
    }
    handleCommission = (e,id)=>{
      this.setState({modalIs3Open:true,userid:id})

    }
    close3Modal =() =>{
      this.setState({modalIs3Open: false});
    }
    close4Modal =() =>{
      this.setState({modalIs4Open: false});
    }
    close2Modal =() =>{
      this.setState({modalIs2Open: false});
    }
    handleAmount = (event)=>{
      event.preventDefault()
      this.setState({fillAmount:event.target.value})
    }
    handleWalletSubmit = (event)=>{
      event.preventDefault()
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/fillAccount`,{userid:this.state.userid,fillAmount:this.state.fillAmount}).then((response)=>{
        if(response.data.status){
          toast(response.data.message, {containerId: 'B'})
          this.setState({modalIs2Open: false});
          this.getAllMasterAdmin()

    
        }else{
          toast(response.data.message, {containerId: 'B'})
          this.setState({modalIs2Open: false});
          this.getAllMasterAdmin()

    
    
        }
      })
    }
    handleWithdrawSubmit = (event)=>{
      event.preventDefault()
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/withdrawAccount`,{userid:this.state.userid,fillAmount:this.state.fillAmount}).then((response)=>{
        if(response.data.status){
          toast(response.data.message, {containerId: 'B'})
          this.setState({modalIs4Open: false});
          this.getAllMasterAdmin()

    
        }else{
          toast(response.data.message, {containerId: 'B'})
          this.setState({modalIs4Open: false});
          this.getAllMasterAdmin()

    
    
        }
      })
    }

    render(){

        return(
            <body className="" >
            <Header />
            <SubHeader />

            <Sidebar />
           <div class="row">
               <div className="column1">
               <p style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}} >Master List</p>


                     {/* <input type="date" onChange={this.selectCalnder} />   */}
                     <input type="text" placeholder="SerchByName" onChange={this.selectName} />  

            <div className="table-responsive" style={{"overflow-x":"auto","color":"white"}} >
               <table className="table">
                   {/* All MAsters */}
                            <thead style={{backgroundColor:"white"}}>
                            <tr>
                                <th >Sr. No.</th>
                                <th>User</th>
                                <th>Master</th>
                                <th>Wallet Balance</th>
                                <th>Stake</th>
                                <th>Registration</th>
                                <th>BLOCK/UBLOCK</th>
                                <th>Change Password</th>
                                <th>Deposit</th>
                                <th>Withdarw</th>
                                <th>Update Stake</th>


                            </tr>
                            </thead>
                            <tbody id="allContacts">
                            
                            {this
                            .state
                            .users
                            .map((contact, i) => {
                                var dates = new Date(contact.createdAt)
                                var date = dates.toISOString().slice(0,10);
                                return (
                                    <tr key={contact._id} >
                                    <td>{i+1}</td>
                                        <td>{contact.userName}</td>
                                        <td >{contact.masterAdmin}</td>
                                        <td>&#x20b9;{contact.walletBalance}</td>
                                <td>{contact.Commission}%</td>
                                <td>{date}</td>
                                        <td key={contact._id} id={contact._id}
                                  >{contact.blocked ? (<button style={{cursor: "pointer",backgroundColor:"green",color:"white"}}
                                  onClick={(e)=>{
                             const objectID = contact._id
                             this.handleUnblock(e, objectID)
                         }}>UNBLOCK</button>):(<button style={{cursor: "pointer",backgroundColor:"red",color:"white"}}
                                  onClick={(e)=>{
                             const objectID = contact._id
                             this.handleClick(e, objectID)
                         }}>BLOCK</button>)}
                                     </td>
                                     <td><button style={{cursor: "pointer",backgroundColor:"green",color:"white"}}
                                  onClick={(e)=>{
                             const objectID = contact._id
                             this.handleChangePassword(e, objectID)
                         }}>Change Password</button></td>
                          <td><button style={{cursor: "pointer",backgroundColor:"green",color:"white"}}
                                  onClick={(e)=>{
                             const objectID = contact._id
                             this.handleWallet(e, objectID)
                         }}>Fill Chip</button></td>
                         <td><button style={{cursor: "pointer",backgroundColor:"green",color:"white"}}
                                  onClick={(e)=>{
                             const objectID = contact._id
                             this.handleWalletWithdraw(e, objectID)
                         }}>Withdraw Chip</button></td>
                                        
                                        <td><button style={{cursor: "pointer",backgroundColor:"green",color:"white"}}
                                  onClick={(e)=>{
                             const objectID = contact._id
                             this.handleCommission(e, objectID)
                         }}>Update Stake</button></td>    
                                    </tr>

                                );
                            })
                        }
                        </tbody>
                            </table>
                            </div>
                            <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.handleChangePasswordSubmit}>

          <span>Password</span>

    <input type="password"  placeholder="new password"className="form-control" name="password"   onChange={this.handlePassword} value={this.state.password} ></input>
    <span>Confirm Password</span>
    <input type="password" placeholder="confirm password password" className="form-control" name="Confpassword" onChange={this.handlePassword} value={this.state.Confpassword} ></input>


    <button style={{    "margin-left": "30%","width": "50%", "font-size": "116%;"}} className="adimupdatebutton" onClick={this.handleChangePasswordSubmit} >UPDATE Password</button>
    </form>
        </Modal>
        <Modal
          isOpen={this.state.modalIs2Open}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.close2Modal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
          <button onClick={this.close2Modal}>close</button>
          <form onSubmit={this.handleWalletSubmit}>

          <span>Amount</span>

    <input type="number"  placeholder="new password"className="form-control" name="password"   onChange={this.handleAmount} value={this.state.password} ></input>


    <button style={{    "margin-left": "30%","width": "50%", "font-size": "116%;"}} className="adimupdatebutton" onClick={this.handleWalletSubmit} >Fill</button>
    </form>
        </Modal>
        <Modal
          isOpen={this.state.modalIs3Open}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.close3Modal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
          <button onClick={this.close3Modal}>close</button>
          <form onSubmit={this.handleStakeSubmit}>

          <span>Stake</span>

    <input type="number"  placeholder="Stake"className="form-control" name="Commission"   onChange={this.handleStake} value={this.state.Commission} ></input>


    <button style={{    "margin-left": "30%","width": "50%", "font-size": "116%;"}} className="adimupdatebutton" onClick={this.handleStakeSubmit} >Update</button>
    </form>
        </Modal>
        <Modal
          isOpen={this.state.modalIs4Open}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.close4Modal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
          <button onClick={this.close4Modal}>close</button>
          <form onSubmit={this.handleWithdrawSubmit}>

          <span>Amount</span>

    <input type="number"  placeholder="Amount"className="form-control" name="password"   onChange={this.handleAmount}  ></input>


    <button style={{    "margin-left": "30%","width": "50%", "font-size": "116%;"}} className="adimupdatebutton" onClick={this.handleWithdrawSubmit} >Withdarw</button>
    </form>
        </Modal>
                                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
            
            </div>
            </div>
            <Footer />
    
                        </body>
        )
    }
}

export default SuperAdminMasterList;