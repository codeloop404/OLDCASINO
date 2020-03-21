import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import ReactPaginate from 'react-paginate';
import SubHeader from './subHeader'
import DatePicker from "react-datepicker";
import Footer from './footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class AccountList extends Component{
	constructor(props){
		super(props)
		this.state = {
			userName:'',
            password:'',
            users:[],
            pageCount:'',
            offset: 1,
            search:'',
            value: 'select',
            startDate: new Date()

		}
    }
   
    
     async getAccountDetail(){
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/getAccountDetail`,{limit:5,offset:this.state.offset,search:this.state.search,}).then((response)=>{
            console.log("====================",response)
            this.setState({users:response.data.message,pageCount:Math.ceil(response.data.pages / 1,)})

            if(response.data.status){
                this.setState({users:response.data.message})
            }
            else{
                toast(response.data.message, {containerId: 'B'})

            }
        }).catch((error)=>{
            console.log("===========",error)
        })
     }
     componentDidMount(){
       this.getAccountDetail()
      }

   
	selectCalnder = (date)=>{
        // const search = e.target.value
        this.setState({startDate:date})
        const search = date.toISOString().slice(0,10)
        this.setState({search}, () => {
            this.getAccountDetail();
          });
    }
    selectName =(e)=>{
        const search = e.target.value
        this.setState({search}, () => {
            this.getAccountDetail();
          });
    }

    handlePageClick = (data) => {
        const selected = data.selected;
        if (selected === 0){
            const offset = 1
            this.setState({offset}, () => {
                this.getAccountDetail();
              });
        }
        else{
        const offset = Math.ceil(selected+1) ;
        this.setState({offset}, () => {
          this.getAccountDetail();
        });
      }
      };
      handleSelectTransaction = (e,id)=>{
          console.log(e.target.value,id,e)
          if(e.target.value == "Casino"){
            this.setState({value: e.target.value});
            window.location =`/superAdminCasinotransaction/${id}`
            // axios.post(`${SERVER}/getCasinoTransactionByAccount`,{id:id}).then((response)=>{
            //     console.log(response)
            // })
          }
          if(e.target.value == "Cricket"){
              window.location = `/superAdminCricketTransaction/${id}`
          }
          if(e.target.value == "chipDR"){
            console.log(e.target.value,id,e,"---======89999========")
            window.location = `/superadminwithdraw/${id}`

            // window.location = `/superAdminCricketTransaction/${id}`
        }
        if(e.target.value == "chipCR"){
            console.log(e.target.value,id,e,"---====99999999999999999==89999========")

            window.location = `/superadmindeposit/${id}`
        }
         

      }

    render(){

        return(
            <div className="" >
            <Header />
            <SubHeader />

            <Sidebar />
           <div class="row">
               <div className="column1">
               <h2 style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}} >Account Details</h2>

               <DatePicker
        selected={this.state.startDate}
        onChange={this.selectCalnder}
      /> 
      <span />
<input type="text" placeholder="SerchByName" style={{marginLeft:"40%", marginTop:"0%"}} onChange={this.selectName} /> 
 

            <div className="table-responsive" >
               <table className="table">
                   {/* All MAsters */}
                            <thead style={{backgroundColor:"white"}}>
                            <tr>
                                <th >Sr. No.</th>
                                <th>User</th>
                                <th>Deposited Ammount</th>
                                <th>Wallet Balance</th>
                                <th>Total Profit/Loss</th>
                                <th>Date</th>
                                <th>View</th>
                               
                                

                            </tr>
                            </thead>
                            {this.state.users.length !== 0 ? (
                            <tbody id="allContacts">
                            
                            {this
                            .state
                            .users
                            .map((contact, i) => {
                                console.log("====yh hai yha map hai===sexllllll======",contact)
                                var dates = new Date(contact.createdAt)
                                var date = dates.toISOString().slice(0,10);
                                var id = contact._id
                                return (
                                    <tr key={contact._id} >
                                    <td>{i+1}</td>
                                        <td>{contact.userName}</td>
                                        <td >{contact.amountDepositedByMaster}</td>
                                        <td>{contact.walletBalance}</td>
                                <td>{(contact.walletBalance-contact.amountDepositedByMaster).toFixed(0)}</td>
                                <td>{date}</td>
                                <td  >
                                    <div  class="dropdown"      >
                               <button class="dropbtn">View</button>

                                    <div class="dropdown-content" style={{cursor: "pointer",backgroundColor:"",color:"green"}}  value ="select">
                                        <li>
                                    <button style={{cursor: "pointer",backgroundColor:"",color:""}}  value ="Casino" onClick={(e)=>{
                             const objectID = contact._id
                             this.handleSelectTransaction(e, objectID)
                         }}>Casino</button>
                         </li>
                         <li>
                                    <button style={{cursor: "pointer",backgroundColor:"",color:""}}  value ="Cricket" onClick={(e)=>{
                             const objectID = contact._id
                             this.handleSelectTransaction(e, objectID)
                         }}>Cricket</button>
                                             </li>
                                             <li>
                                    <button style={{cursor: "pointer",backgroundColor:"",color:""}}  value ="chipCR" onClick={(e)=>{
                             const objectID = contact._id
                             this.handleSelectTransaction(e, objectID)
                         }}>Chip CR</button>
                                             </li>
                                             <li>
                                    <button style={{cursor: "pointer",backgroundColor:"",color:""}}  value ="chipDR" onClick={(e)=>{
                             const objectID = contact._id
                             this.handleSelectTransaction(e, objectID)
                         }}>Chip DR</button>
                                             </li>
                                    </div>
                                    </div></td>
                                         
                                    
                                        
                                      
                                    </tr>

                                );
                            })
                        }
                        </tbody>
                        ):(<tr className="">
                        <li className="">
                        <div className="" ><span style={{"color":"white"}}>Ther Is NO Data</span></div>
                        </li>
                      </tr>
         )}
                            </table>
                            <div className="text center">
                 <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />  
        </div>
                            </div>
                            </div>

                                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
            
            </div>
            <Footer />
                            
                        </div>
        )
    }
}

export default AccountList;