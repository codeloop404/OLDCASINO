import React, {Component} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import SubHeader from './subHeader'
import $ from 'jquery';

import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import Footer from './footer'

import "react-datepicker/dist/react-datepicker.css";
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class SuperAdminCompletedCricket extends Component{
    constructor(props){
        super(props)
        this.state={
            pageCount:'',
            transaction:[],
            completedBet:[],
            offset: 1,
            search:'',
            startDate: new Date(),
            totalBetAmount:null,
            totalWinAmount:null


        }
    }
    async getcompletedTransaction() {
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var completedtransaction = await axios.post(`${SERVER}/getCompletedCricketGame`,{limit:5,offset:this.state.offset,search:this.state.search,})
        console.log("============123=========89799999999887=====", completedtransaction)
        if(completedtransaction.data.status){

        
        await this.setState({ completedBet: completedtransaction.data.message ,pageCount:Math.ceil(completedtransaction.data.pages / 1,)})
        var length = this.state.completedBet.length;
       
        var m = [];
        var w = []
        for (var n = 0; n < length; n++) {

            m.push(this.state.completedBet[n].betAmount)
            w.push(this.state.completedBet[n].winAmount)


        }
        var wsum = 0
        for (var i = 0; i < w.length; i++) {
            wsum += w[i];
        }


        var sum = 0
        for (var i = 0; i < m.length; i++) {
            sum += m[i];
        }
       await this.setState({totalBetAmount:sum,totalWinAmount:wsum})

        }else{
            await   this.setState({completedBet:[]})
        }
        // await this.setState({transaction:transaction.data.transaction})
    }

    componentDidMount(){

          this.getcompletedTransaction()// window.location= ``

    }

    handlebetHistory = (e,id)=>{
        e.preventDefault()
        window.location= `/superadmincricketmatchhistory/${id}`
    }
    handleDatefilter = (event)=>{
        event.preventDefault()
        this.getcompletedTransaction();
    }
	selectCalnder = (date)=>{
        // $('.datepicker').datepicker();

        console.log(date)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        this.setState({startDate:date})
        const search = date.toISOString().slice(0,10)
        console.log(search)
        this.setState({search}, () => {
            // this.getcompletedTransaction();
          });
    }
    handlePageClick = (data) => {
        const selected = data.selected;
        if (selected === 0){
            const offset = 1
            this.setState({offset}, () => {
                this.getcompletedTransaction();
              });
        }
        else{
        const offset = Math.ceil(selected+1) ;
        this.setState({offset}, () => {
          this.getcompletedTransaction();
        });
      }
      };



    render(){

        return(
            <body className="">
             <Header />
             <SubHeader />
             <Sidebar />

             <div class="row">
             <div className="column1">

             <p style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}} >Cricket Market P/L</p>

             <div className="table-responsive">
             <DatePicker
        selected={this.state.startDate}
        onChange={this.selectCalnder}
      />
            <button onClick={this.handleDatefilter} className="filterbutton">Filter</button>

             {/* <input type="text" placeholder="Date" className="datepicker" onChange={this.selectCalnder} id="datepicker" />   */}

                 <table  class="table">
                     {/* <p>On Going Bet</p> */}
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                         <th>Game No.</th>
                         <th>Team1</th>
                         <th>Team2</th>
                         <th>Date</th>
                         <th>Win Amount</th>
                         <th> Bet Amount</th>
                         <th>Profit/Loss</th>
                         <th>View Details</th>
                        
                      
                         </tr>

                     </thead>
                     {this.state.completedBet.length !== 0 ? (
                     <tbody id="allContacts">
                     {this
                                .state
                                .completedBet
                                .map((contact, i) => {
                                    console.log("====yh hai yha map hai===sexllllll======",contact)
                                    var dates = new Date(contact.createdAt)
                                    var date = dates.toISOString().slice(0,10)
                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id} >
                                        {/* <td>{i+1}</td> */}
                                    <td>{i+1}</td>
                                <td>{contact.team1 }</td>
                                    <td>{contact.team2}</td>
                                <td>{date}</td>
                                    <td style={{ color:"blue"}}>&#x20b9;{contact.winAmount}</td>
                                <td style={{ color:"green"}}>&#x20b9;{contact.betAmount}</td>
                                <td style={{ color:"red"}}>&#x20b9;{(contact.betAmount) - (contact.winAmount)}</td>
                                <td><button onClick={(e)=>{
                                            const objectID = contact._id
                                            this.handlebetHistory(e, objectID)
                                        }}>View</button></td>

                                
                              
                                {/* <td>{date}</td> */}
                               

                                            
                                          
                                        </tr>

                                    );
                                })
                            }
                            </tbody>):(<tr className="">
               <li className="">
               <div className="" ><span style={{"color":"white"}}>Ther Is NO Data</span></div>
               </li>
             </tr>
)}
                 </table>
                 <div className="row">
                     <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"blue"}}>
                         <p style={{color:"#fff"}}>Total Bet Amount:  &#x20b9;: {this.state.totalBetAmount} </p>

                         </div>
                         </div>
                         
                         <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"green"}}>
                         <p style={{color:"#fff"}}>Total WinAmount Amount:  &#x20b9;: {this.state.totalWinAmount}</p>

                         </div>
                         </div>
                         
                             <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"red"}}>
                         <p style={{color:"#fff"}}>Total Profit/Loss:  &#x20b9;: {this.state.totalBetAmount-this.state.totalWinAmount }</p>

                         </div>
                         </div>
                         <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"yellow"}}>
                         {/* <p style={{color:"wheat"}}>Total Profit/Loss: Rs{this.state.totalBetAmount-this.state.totalWinAmount }</p> */}
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


                 <div className="text center">
           
        </div>

                 </div>

             </div>
             </div>
                                           <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
                                           <Footer />

            </body>

                            
        )
    }
}

export default SuperAdminCompletedCricket;