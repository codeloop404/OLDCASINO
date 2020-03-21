import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import ReactPaginate from 'react-paginate';
import SubHeader from './subHeader'
import Footer from './footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class CasinoTransaction extends Component{
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
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var id = this.props.match.params.Id
        axios.post(`${SERVER}/getCasinoTransactionByAccount`,{id:id}).then((response)=>{
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
            <SubHeader />

            <Sidebar />
           <div class="row">
               <div className="column1">
               <h2 style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}} >All Casino Transaction</h2>

{/* <input type="date" onChange={this.selectCalnder} />   */}
{/* <input type="text" placeholder="SerchByName" onChange={this.selectName} />  */}
 

            <div className="table-responsive" >
               <table className="table">
                   {/* All MAsters */}
                            <thead style={{backgroundColor:"white"}}>
                            <tr>
                                <th >Sr. No.</th>
                                <th>Win Amount</th>
                                <th>Bet Amount</th>
                                <th>0</th>
                         <th>1</th>
                         <th>2</th>
                         <th>3</th>
                         <th>4</th>
                         <th>5</th>
                         <th>6</th>
                         <th>7</th>
                         <th>8</th>
                         <th>9</th>
                               
                                

                            </tr>
                            </thead>
                            <tbody id="allContacts">
                            
                            {this
                            .state
                            .users
                            .map((contact, i) => {
                                var dates = new Date(contact.createdAt)
                                var date = dates.toISOString().slice(0,10);
                                var id = contact._id
                                return (
                                    <tr key={contact._id} >
                                    <td>{i+1}</td>
                                <td>{contact.winAmount}</td>
                                <td>{
                                    contact.zeroNumber[0].amount+
                                    contact.oneNumber[0].amount+
                                    contact.twoNumber[0].amount+
                                    contact.threeNumber[0].amount+
                                    contact.fourNumber[0].amount+
                                    contact.fiveNumber[0].amount+
                                    contact.sixNumber[0].amount+
                                    contact.sevenNumber[0].amount+
                                    contact.eightNumber[0].amount+
                                    contact.nineNumber[0].amount
                                    }
                                    </td>
                                    <td>{contact.zeroNumber[0].amount}</td>
                                <td>{contact.oneNumber[0].amount}</td>
                                <td>{contact.twoNumber[0].amount}</td>
                                <td>{contact.threeNumber[0].amount}</td>
                                <td>{contact.fourNumber[0].amount}</td>
                                <td>{contact.fiveNumber[0].amount}</td>
                                <td>{contact.sixNumber[0].amount}</td>
                                <td>{contact.sevenNumber[0].amount}</td>
                                <td>{contact.eightNumber[0].amount}</td>
                                <td>{contact.nineNumber[0].amount}</td>
                                         
                                    
                                        
                                      
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
            <Footer />
     
                        </body>
        )
    }
}

export default CasinoTransaction;