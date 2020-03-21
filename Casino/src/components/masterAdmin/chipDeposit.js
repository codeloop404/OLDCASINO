import React, {Component} from 'react';
import axios from 'axios';

import ReactPaginate from 'react-paginate';
import Header from './Header'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class ChipDepositMaster extends Component{
	constructor(props){
		super(props)
		this.state = {
			userName:'',
            password:'',
            users:[],
            pageCount:'',
            offset: 1,
            search:'',
            value: 'select'

		}
    }
   
    
     async getAccountDetail(){
        const token = localStorage.getItem('masterAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var id = this.props.match.params.Id
        axios.get(`${SERVER}/getDepositTransactionByUser`,{id:id}).then((response)=>{
            console.log("====================",response)
            this.setState({users:response.data.data})

            if(response.data.status){
                // this.setState({users:response.data.message})
            }
            else{
                toast(response.data.message, {containerId: 'B'})

            }
        }).catch((error)=>{
            console.log("===========",error)
        })
     }
     componentDidMount(){
         console.log("===============9999999999999999=======",this.props.match.params.Id)
       this.getAccountDetail()
      }

   
	selectCalnder = (e)=>{
        const search = e.target.value
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
          console.log(e.target.value,id)
          if(e.target.value == "Casino"){
            this.setState({value: e.target.value});
            axios.post(`${SERVER}/getCasinoTransactionByAccount`,{id:id}).then((response)=>{
                console.log(response)
            })
          }
         

      }

    render(){

        return(
            <body className="" >
            <Header />
           
           <div class="row">
               <div className="column1">
               <h2 style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}} >Chip Deposit History</h2>

{/* <input type="date" onChange={this.selectCalnder} />   */}
{/* <input type="text" placeholder="SerchByName" onChange={this.selectName} />  */}
 

            <div style={{"overflow-x":"auto","color":"white"}} >
               <table style={{width: '100%'}}>
                   {/* All MAsters */}
                            <thead style={{backgroundColor:"white"}}>
                            <tr>
                                <th >Sr. No.</th>
                                <th>UserName</th>
                                <th>Amount</th>
                                <th>Date</th>
                               
                               
                                

                            </tr>
                            </thead>
                            <tbody id="allContacts">
                            
                            {this
                            .state
                            .users
                            .map((contact, i) => {
                              
                                var id = contact._id
                                return (
                                    <tr key={contact._id} >
                                    <td>{i+1}</td>
                                <td>{contact.userName}</td>
                            <td style={{color:"green"}}>&#x20b9;{contact.amount}</td>
                                {/* <td>{contact.betStatus}</td> */}
                                <td>{contact.createdAt}</td>
                               
                                         
                                    
                                        
                                      
                                    </tr>

                                );
                            })
                        }
                        </tbody>
                            </table>
                            <div className="text center">
                  
        </div>
                            </div>
                            </div>

                                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
            
            </div>

                            
                        </body>
        )
    }
}

export default ChipDepositMaster;