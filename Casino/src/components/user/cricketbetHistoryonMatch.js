import React, { Component } from 'react'
import Header1 from '../Header1'
import axios from 'axios'
import DatePicker from "react-datepicker";

const SERVER = process.env.REACT_APP_API_URL

class UserCricketMatchHistory extends Component {
    constructor(props){
        super(props)
        this.state={
            history:[],
            startDate: new Date(),
            totalBetAmount:null,
            totalProfit:null

        }
    }
    async getHistory(){
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var id = this.props.match.params.Id
       var history =   await axios.post(`${SERVER}/getlistofbetOnMatch`,{matchId:id})
       console.log("==============History1",history.data)
       if(history.data.status){
        console.log("==============History2",history)

           await this.setState({history:history.data.match})
       }
       console.log(this.state.history,"========999999999=======allah wariya============")
       var length = this.state.history.length;
       
        var m = [];
        var p = []
        for (var n = 0; n < length; n++) {

            m.push(this.state.history[n].betAmount)
            if(this.state.history[n].betResult){
                p.push(this.state.history[n].winAmount)
            }

        }
       

   
        var sum = 0
        for (var i = 0; i < m.length; i++) {
            sum += m[i];
        }
        var psum = 0
        for (var i = 0; i < p.length; i++) {
            psum += p[i];
        }
       await this.setState({totalBetAmount:sum,totalProfit:psum})
       

            //   var betAmount =   await axios.post(`${SERVER}/aggregateBetAmountonMatch`,{matchId:id})


        // console.log("======yh hai sum",sum,betAmount)

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
                <Header1 />
                <div class="row">
             <h2 style={{cursor: "pointer",color:"#5fb9f5", marginLeft: "30%",fontSize:"22px"}}>Cricket Bet History</h2>

             <div className="table-responsive">
                 {/* <p>Participants</p> */}
        

                 <table class="table">
                     {/* <p>On Going Bet</p> */}
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                         <th>No.</th>
                         <th>BetName</th>
                         <th>BetStatus</th>
                         <th>BetAmount</th>
                         <th>Your Score</th>
                         <th>Final Score</th>
                         <th>Date</th>
                         <th>P/L</th>
                         </tr>

                     </thead>
                     <tbody id="allContacts">
                     {this
                                .state
                                .history
                                .map((contact, i) => {
                                    console.log("====yh hai yha map hai===sexllllll======",contact)
                                    var dates = new Date(contact.createdAt)
                                    var date = dates.toISOString().slice(0,10)
                                    // var totalBetAmount =  ++contact.betAmount
                                    // // console.log("====yh hai yha map hai===sexllllll======",totalBetAmount)

                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id}   >
                                        {/* <td>{i+1}</td> */}
                                        <td>{i+1}</td>
                                    <td>{contact.typeOfBet }   {contact.team}</td>
                                    <td>{contact.betStatus}</td>
                                <td>&#x20b9;{contact.betAmount}</td>
                                <td>{contact.sessionScore}</td>
                                    <td>{contact.finalSessionScore}</td>
                                <td>{date}</td>
                                    <td>{contact.betResult ? (<p style={{color:"green"}}>P :&#x20b9;{contact.winAmount}</p>):(<p style={{color:"red"}}>L: &#x20b9;{contact.betAmount}</p>)}</td>
                                

                                            
                                          
                                        </tr>


                                    );
                                })
                            }
                            </tbody>
                        {/* <p>{this.state.totalBetAmount}</p> */}
                 </table>


                 </div>
                 <div className="row">
                     <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"blue"}}>
                         <p style={{color:"#fff"}}>Total Bet Amount: &#x20b9; {this.state.totalBetAmount}</p>

                         </div>
                         </div>
                         
                         <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"green"}}>
                         <p style={{color:"#fff"}}>Total Win Amount:&#x20b9; {this.state.totalProfit}</p>

                         </div>
                         </div>
                         
                             <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"red"}}>
                         <p style={{color:"#fff"}}>Profit: &#x20b9; {this.state.totalProfit-this.state.totalBetAmount}</p>

                         </div>
                         </div>
                         <div className="column">
                         <div class="card" style={{width:"350px", height:"50px",background:"yellow"}}>
                         {/* <p style={{color:"wheat"}}>Total Profit/Loss: Rs{this.state.totalBetAmount-this.state.totalWinAmount }</p> */}
           
                         </div>
                         </div>

                     
                 </div>


                 </div>

                </body>

           
        )
    }
}

export default UserCricketMatchHistory;