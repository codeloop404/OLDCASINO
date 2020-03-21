import React, { Component } from 'react'
import SubHeader from './subHeader'

import Header from './Header'
import axios from 'axios'
import DatePicker from "react-datepicker";
import Sidebar from './sidebar';
import Footer from './footer'

const SERVER = process.env.REACT_APP_API_URL

class SuperAdminCricketMatchHistory extends Component {
    constructor(props){
        super(props)
        this.state={
            history:[],
            startDate: new Date()

        }
    }
    async getHistory(){
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var id = this.props.match.params.Id
       var history =   await axios.post(`${SERVER}/getCricketMatchbet`,{id:id})
       console.log("==============History1",history.data)
       if(history.data.status){
        console.log("==============History2",history)

           await this.setState({history:history.data.data})
       }
    }
    componentDidMount(){
        this.getHistory()
    }
    handlebetHistory = (e,id)=>{
        console.log("========999999--------",e,id)
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/getlistofbetOnMatch`,{matchId:id}).then((response)=>{

        })
    }

    render() {

        return (
            <body className="">
                <Header />
                <SubHeader />
                <Sidebar />
                <div class="row">
             <h2 style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}}>Cricket Bet History</h2>

             <div className="table-responsive">
                 {/* <p>Participants</p> */}
        

                 <table class="table">
                     {/* <p>On Going Bet</p> */}
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                         <th>No.</th>
                         <th>UserName</th>
                         <th>BetName</th>
                         <th>BetStatus</th>
                         <th>BetAmount</th>
                         <th>Your Score</th>
                         <th>Final Score</th>
                         <th>Date</th>
                         <th>P/L</th>
                         </tr>

                     </thead>
                     {this.state.history.length !== 0 ? (
                     <tbody id="allContacts">
                     {this
                                .state
                                .history
                                .map((contact, i) => {
                                    console.log("====yh hai yha map hai===sexllllll======",contact)
                                    var dates = new Date(contact.createdAt)
                                    var date = dates.toISOString().slice(0,10)
                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id}   >
                                        {/* <td>{i+1}</td> */}
                                        <td>{i+1}</td>
                                    <td>{contact.userName}</td>
                                    <td>{contact.typeOfBet }  {contact.team}</td>
                                    <td>{contact.betStatus}</td>
                                <td>&#x20b9;{contact.betAmount}</td>
                                    <td>&#x20b9;{contact.sessionScore}</td>
                                    <td>{contact.finalSessionScore}</td>
                                <td>{date}</td>
                                    <td>{contact.betResult ? (<p style={{color:"green"}}>P :&#x20b9;{contact.winAmount}</p>):(<p style={{color:"red"}}>L: &#x20b9;{contact.betAmount}</p>)}</td>
                                

                                            
                                          
                                        </tr>

                                    );
                                })
                            }
                            
                            </tbody>):(null)}
                 </table>
                 </div>
                 </div>
                 <Footer />

                </body>

           
        )
    }
}

export default SuperAdminCricketMatchHistory;