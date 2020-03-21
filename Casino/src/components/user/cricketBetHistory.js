import React, { Component } from 'react'
import Header1 from '../Header1'
import axios from 'axios'
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';

const SERVER = process.env.REACT_APP_API_URL

class UserCricketHistory extends Component {
    constructor(props){
        super(props)
        this.state={
            pageCount:'',
            history:[],
            startDate: new Date(),
            search:'',
            offset: 1,

        }
    }
    async getHistory(){
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
       var history =   await axios.post(`${SERVER}/getCompletedCricketGame`,{limit:5,offset:this.state.offset,search:this.state.search,})
       console.log("==============History1",history.data.message.length)
       if(history.data.status){
        console.log("==============History2",history)

           await this.setState({history:history.data.message,pageCount:Math.ceil(history.data.pages / 1,)})
       }
    }
    componentDidMount(){
        this.getHistory()
    }
    handlebetHistory = (e,id)=>{
        console.log("========999999--------",e,id)
        window.location =`/usercricketmatchhistory/${id}`
        const token = localStorage.getItem('usertoken')
        // axios.defaults.headers.common['Authorization'] = token;
        // axios.post(`${SERVER}/getlistofbetOnMatch`,{matchId:id}).then((response)=>{

        // })
    }
    handleDatefilter = (event)=>{
        event.preventDefault()
        this.getHistory();
    }
    handlePageClick = (data) => {
        const selected = data.selected;
        if (selected === 0){
            const offset = 1
            this.setState({offset}, () => {
                this.getHistory();
              });
        }
        else{
        const offset = Math.ceil(selected+1) ;
        this.setState({offset}, () => {
          this.getHistory();
        });
      }
      };
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
    render() {

        return (
            <body className="">
                <Header1 />
                <div class="row">
             <h2 style={{cursor: "pointer",color:"#5fb9f5", marginLeft: "30%",fontSize:"22px"}}>Cricket Bet History</h2>

             <div className="table-responsive">
                 {/* <p>Participants</p> */}
                 <DatePicker
                 placeholderText=""
        selected={this.state.startDate}
        onChange={this.selectCalnder}
      />
            <button className="filterbutton" onClick={this.handleDatefilter}>Filter</button>


                 <table class="table">
                     {/* <p>On Going Bet</p> */}
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                         <th>Game No.</th>
                         <th>Team1</th>
                         <th>Team2</th>
                         <th>Date</th>
                         <th>View</th>
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
                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id}  onClick={(e)=>{
                                            const objectID = contact._id
                                            this.handlebetHistory(e, objectID)
                                        }} >
                                        {/* <td>{i+1}</td> */}
                                        <td>{i+1}</td>
                                <td >{contact.team1 }</td>
                                    <td>{contact.team2}</td>
                                <td>{date}</td>
                                <td><button  style={{"color":"red",cursor: "pointer",backgroundColor:""}} nClick={(e)=>{
                                            const objectID = contact._id
                                            this.handlebetHistory(e, objectID)
                                        }}> View</button></td>
                                

                                            
                                          
                                        </tr>

                                    );
                                })
                            }
                            </tbody>
                 </table>
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
                 
                 </div>

                </body>

           
        )
    }
}

export default UserCricketHistory;