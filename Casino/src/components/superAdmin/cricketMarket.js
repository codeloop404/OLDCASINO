import React, {Component} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';
import SubHeader from './subHeader'
import Sidebar from './sidebar'
import Footer from './footer'

require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
class CricketMarket extends Component{
    constructor(props){
        super(props)
        this.state={
            pageCount:'',
            transaction:[],
            completedBet:[],
            offset: 1,
            search:''


        }
    }
    async getcompletedTransaction() {
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        // var completedtransactionhhh = await axios.post(`${SERVER}/getCricketMatchbet`,{id:"5e3b0ffa05905c41076338af",})
        // console.log("=============99999999",completedtransactionhhh)

        var completedtransaction = await axios.post(`${SERVER}/getCricketBet`,{limit:5,offset:this.state.offset,search:this.state.search,})
        console.log("============123========888990007yeefhevfjegfwsncxj=89799999999887=====", completedtransaction)
        await this.setState({ completedBet: completedtransaction.data.message ,pageCount:Math.ceil(completedtransaction.data.pages / 1,)})

        // await this.setState({transaction:transaction.data.transaction})
    }

    componentDidMount(){
          this.getcompletedTransaction()// window.location= ``
    }
   
	selectCalnder = (e)=>{
        console.log(e.target.value)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        const search = e.target.value
        this.setState({search}, () => {
            this.getcompletedTransaction();
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
      handleUpdate =(e,id)=>{
          window.location = `/SuperAdminCricketBet/${id}`
      }



    render(){

        return(
            <body className="">
             <Header />
             <SubHeader />
             <Sidebar />

             <div class="row">
                 <div className="column1">
             <h2 style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}} >Live Cricket Market </h2>

             <div className="table-responsive">
             {/* <input type="date" onChange={this.selectCalnder} />   */}

                 <table  class="table">
                     {/* <p>On Going Bet</p> */}
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                         <th>Game No.</th>
                         <th>Date</th>
                         <th>Team1</th>
                         <th>Team2</th>
                         <th>BhavonTeam1</th>
                         <th>BhavonTeam2</th>
                         <th>Total Bet Amount</th>
                         <th>Total Win Amount</th>
                         <th>View</th>

                         </tr>

                     </thead>
                     <tbody id="allContacts">
                     {this
                                .state
                                .completedBet
                                .map((contact, i) => {
                                    console.log("====yh hai yha map hai===sexllllll======",contact)
                                    // var dates = new Date(contact.startedAt)
                                    // var date = dates.toISOString().slice(0,10)
                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id} >
                                        {/* <td>{i+1}</td> */}
                                    <td>{i+1}</td>

                                   <td>{contact.createdAt}</td>
                                    <td>{contact.team1}</td>
                                <td>{contact.team2}</td>
                                    <td>{contact.matchWinTeam1}</td>
                                    <td>{contact.matchWinTeam2}</td>
                                <td>{contact.betAmount}</td>
                                <td>{contact.winAmount}</td>

                                <td>   <button style={{cursor: "pointer",backgroundColor:"green",color:"black"}} 
                                    onClick={(e)=>{
                                     const objectID = contact._id
                                     this.handleUpdate(e, objectID)
                                 }}
                             >View</button></td>

                                            
                                          
                                        </tr>

                                    );
                                })
                            }
                            </tbody>
                 </table>
                 <div className="text center">
                 {/* <ReactPaginate
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
        />   */}
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

export default CricketMarket;