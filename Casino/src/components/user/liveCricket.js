import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Header1 from '../Header1'
import axios from 'axios'
const SERVER = process.env.REACT_APP_API_URL
const SOCKET = process.env.REACT_APP_API_SOCKET

// import Header from './'


class Cricket extends Component {
    socket = {};

    constructor(props) {
        super(props)
        this.state = {
            lowerValue: '',
            upperValue: '',
            currentBallRun: 0,
            matchScore: 0,
            match:[]
        }

        this.socket = io(SOCKET, {
            query: {
                admin: "AdminToken"
            }
        });
        this.socket.on('perballRun', message => {
            this.getCricketDetail()
        });
    }

    async getCricketDetail (){
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        const match = await axios.get(`${SERVER}/getCricketliveMatch`)
        console.log("====================",match)
        if(match.data.status){
            this.setState({match:match.data.match})
        }
    }
    componentDidMount(){
        this.getCricketDetail()
    }

    handleJoin = (e, id)=>{
        console.log(id,"=========999999999999999")
        window.location=`/cricket/${id}`

       
    }
  

    render() {

        return (
            <body className="cricketBack">
                <Header1 />
                <div className="live_cricket_card cricket_card_background">
                    {/* <p>In Play Cricket</p> */}
                <div className="table-responsive">
          

          <table  class="table">
              {/* <p>On Going Bet</p> */}
              <thead style={{backgroundColor:"white"}}>
                  <tr>
                      <th>Serial No</th>
                 <th>Team1</th>
                 <th>Team2</th>
                 <th>Score</th>
                 <th>Join</th>
                  </tr>

              </thead>
              <tbody id="allContacts">
              {this
                         .state
                         .match
                         .map((contact, i) => {
                            
                             return (
                                 <tr style={{cursor: "pointer",color:"white"}} key={contact._id} >
                                 {/* <td>{i+1}</td> */}
                             <td style={{color:"wheat"}}>{i+1}</td>
                             <td style={{color:"wheat"}}>{contact.team1}</td> 
                             <td style={{color:"wheat"}}> {contact.team2}</td>
                             <td style={{color:"wheat"}}>{contact.matchScoreRun}/{contact.matchWicket}</td> 
                         <td style={{color:"wheat"}} key={contact._id} id={contact._id} >
                             <button style={{cursor: "pointer",color:"red"}}
                                    onClick={(e)=>{
                                     const objectID = contact._id
                                     this.handleJoin(e, objectID)
                                 }}
                             >Join</button>
                              </td>
                        

                                     
                                   
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
            </body>
        )
    }
}

export default Cricket;