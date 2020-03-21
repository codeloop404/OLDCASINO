import React, { Component } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import SubHeader from './subHeader'
import Footer from './footer'

import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
class SuperAdminCricket extends Component {
    socket = {};

    constructor(props) {
        super(props)
        this.state = {
            createMatch: false,
            matchStartedAt:null,
            team1:null,
            team2:null,
            tossTeam1:null,
            tossTeam2:null,
            overs:null,
            typeOfmatch:null,
            matchWinTeam1:null,
            matchWinTeam2:null,
            twoOversessionYes:null,
            twoOversessionNo:null,
            sixOversessionYes:null,
            sixOversessionNo:null,
            tenOversessionYes:null,
            tenOversessionNo:null,
            twentyOversessionYes:null,
            twentyOversessionNo:null,
            seriesName:null,
            seriesStartDate:null,
            seriesEndDate:null,
            series:[],
            modalIsOpen:false,
            joinMatchId:null,
            match:[]
        }

        // this.socket = io(SOCKET, {
        //     query: {
        //         admin: "AdminToken"
        //     }
        // });
        // this.socket.on('server:message', message => {
        //     console.log("===============serverse aa gaya=======", message)

        // });
        // this.socket.on('server:currentRun', message => {
        //     console.log("===============serverse aa gaya=======", message)

        // });

    }
    async getCricketDetail (){
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        const match = await axios.get(`${SERVER}/getCricketliveMatch`)
        console.log("====================",match)
        if(match.data.status){
            this.setState({match:match.data.match})
        }
    }

    getCricketSeries (){
    const token = localStorage.getItem('superAdmintoken')
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`${SERVER}/getCricketSeries`).then((result)=>{
        if(result){
            this.setState({series:result.data.game})
        }
    })
   }
   componentDidMount(){
       this.getCricketSeries()
       this.getCricketDetail()
   }
  
   handleCancle=() =>{
 this.setState({createMatch:false})
  }
  handleJoin =(e,id)=>{
      console.log("============",e,id)
      this.setState({createMatch:true,joinMatchId:id})
  }
    createMatch = (e) => {
        this.setState({ createMatch: true })
    }
    handleMatch = (e)=>{
        console.log(e.target.value)
        if(e.target.value == "T20"){
            this.setState({overs:20,typeOfmatch:"T20"})
        }
    }

    handleInput = (event) =>{
        console.log("========yh hai=========")
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
     }

    handleUpdate = (e, id)=>{
        console.log("==========",id)
        window.location = `/superAdmincricket/${id}`
    }

     handleSubmitSeries = (event)=>{
        event.preventDefault()
        console.log("================",this.state)
        axios.post(`${SERVER}/cricketSeries`,
        {seriesName:this.state.seriesName,seriesEndDate:this.state.seriesEndDate,seriesStartDate:this.state.seriesStartDate}
        ).then((response)=>{
           console.log("=============",response)
           if(response.data.status){
               toast(response.data.message, {containerId: 'B'})
               this.getCricketSeries()

           }else{
               toast(response.data.message, {containerId: 'B'})

           }
   
           
        }).catch((error)=>{
            console.log("===========",error)
        })
     }
     handleSubmit =(event)=>{
        event.preventDefault()
         console.log("================",this.state)
         axios.post(`${SERVER}/createCricketMatch`,
         {_id:this.state.joinMatchId,matchStartedAt:Date.now(),team1:this.state.team1,team2:this.state.team2,tossTeam1:parseFloat(this.state.tossTeam1),tossTeam2:parseFloat(this.state.tossTeam2),overs:this.state.overs,
            matchWinTeam1Rate:parseFloat(this.state.matchWinTeam1),matchWinTeam2Rate:parseFloat(this.state.matchWinTeam2),typeOfmatch:this.state.typeOfmatch,twoOversessionNo:parseInt(this.state.twoOversessionNo),
            twoOversessionYes:parseInt(this.state.twoOversessionYes),sixOversessionNo:parseInt(this.state.sixOversessionNo),sixOversessionYes:parseInt(this.state.sixOversessionYes),tenOversessionNo:parseInt(this.state.tenOversessionNo),
            tenOversessionYes:parseInt(this.state.tenOversessionYes),twentyOversessionYes:parseInt(this.state.twentyOversessionYes),twentyOversessionNo:parseInt(this.state.twentyOversessionNo),createdAt:new Date().toISOString().slice(0,10)}
         ).then((response)=>{
            console.log("=============",response)
            if(response.data.status){
                this.setState({createMatch:false})
                toast(response.data.message, {containerId: 'B'})
                this.getCricketDetail()

            }else{
                toast(response.data.message, {containerId: 'B'})
                this.setState({createMatch:false})

            }
    
            
         }).catch((error)=>{
             console.log("===========",error)
         })
         
     }


    render() {

        return (
            <body className="" >
                <Header />
                <SubHeader />
                <Sidebar />


                <div>
                    <div class="row">
                  <div className="card">
                    <form className="Form_Width">
                        <h1 style={{cursor: "pointer",color:"white",textAlign:"center"}}>Create Crcicket Series</h1>
                                <div class="input-group form-group margin_Bottom">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png" alt=""></img></span>
                                    </div>
                                    <input type="text" class="form-control1 Right_border" placeholder="Series Name" name="seriesName" onChange={this.handleInput} />

                                </div>
                               
                               
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="date" class="form-control1 Right_border" placeholder="Series Start Date" name="seriesStartDate" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" >
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    
                                    <input type="date" class="form-control1 Right_border" placeholder="Series End Date" name="seriesEndDate" onChange={this.handleInput} />
                                </div>
                          
                                <div class="form-group Login margin_Top">
                                    <input type="submit" value="SUBMIT" class="btn float-right login_btn" onClick={this.handleSubmitSeries} />
                                </div>
                            </form>
                            </div>
                            <div className="card1">

                            <div className="table-responsive">
          

          <table  class="table">
              {/* <p>On Going Bet</p> */}
              <thead style={{backgroundColor:"white"}}>
                  <tr>
                      <th>Serial No</th>
                 <th>Team1</th>
                 <th>Team2</th>
                 <th>Score</th>
                 <th>Update</th>
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
                             <td>{i+1}</td>
                             <td>{contact.team1}</td> 
                             <td> {contact.team2}</td>
                             <td>{contact.matchScoreRun}/{contact.matchWicket}</td> 
                         <td key={contact._id} id={contact._id} >
                             <button style={{cursor: "pointer",color:"red"}}
                                    onClick={(e)=>{
                                     const objectID = contact._id
                                     this.handleUpdate(e, objectID)
                                 }}
                             >Update</button>
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
                            <div className="table-responsive">
          
                            <h1 style={{cursor: "pointer",color:"white",textAlign:"center"}}>On Going Series</h1>

                 <table  class="table">
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                             <th>Serial No</th>
                        <th>Series Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Join</th>
                         </tr>

                     </thead>
                     <tbody id="allContacts">
                     {this
                                .state
                                .series
                                .map((contact, i) => {
                                   
                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id} >
                                        {/* <td>{i+1}</td> */}
                                    <td>{i+1}</td>
                                <td>{contact.seriesName}</td>
                                    <td>{contact.seriesStartDate}</td>
                                <td>{contact.seriesEndDate}</td>
                                <td key={contact._id} id={contact._id} >
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
                        {this.state.createMatch ? (<div class="card-body">
                            <form className="Form_Width">
                                <div class="input-group form-group margin_Bottom">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png" alt=""></img></span>
                                    </div>
                                    <input type="text" class="form-control1 Right_border" placeholder="Tema1" name="team1" onChange={this.handleInput} />

                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-54px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png" alt=""></img></span>
                                    </div>
                                    <input type="text" class="form-control1 Right_border" placeholder="Team2" name="team2" onChange={this.handleInput} />
                                </div>
                                {/* <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="tossrateonteam1" name="tossTeam1" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-75px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="tossrateonteam2" name="tossTeam2" onChange={this.handleInput} />
                                </div> */}
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="winRateonTeam1" name="matchWinTeam1" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-75px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="winRateonTeam2" name="matchWinTeam2" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="2over session Yes" name="twoOversessionYes" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-75px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    
                                    <input type="number" class="form-control1 Right_border" placeholder="2over session No" name="twoOversessionNo" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="6over session Yes" name="sixOversessionYes" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-75px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    
                                    <input type="number" class="form-control1 Right_border" placeholder="6over session No" name="sixOversessionNo" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="10over session Yes" name="tenOversessionYes" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-75px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    
                                    <input type="number" class="form-control1 Right_border" placeholder="10over session No" name="tenOversessionNo" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <input type="number" class="form-control1 Right_border" placeholder="20over session Yes" name="twentyOversessionYes" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1" style={{marginTop:"-75px",marginLeft:"269px"}}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    
                                    <input type="number" class="form-control1 Right_border" placeholder="20over session No" name="twentyOversessionNo" onChange={this.handleInput} />
                                </div>
                                <div class="input-group form-group margin_Bottom1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text Left_border"><img className="image_Width" src="../images/cricket.png"></img></span>
                                    </div>
                                    <select onChange={this.handleMatch}  class="form-control1 Right_border">
                                        <option value="T10">T10</option>
                                        <option value="T20">T20</option>
                                        <option value="OneDay">OneDay</option>
                                    </select>
                                </div>

                                <div class="form-group Login margin_Top">
                                    <input type="submit" value="SUBMIT" class="btn float-right login_btn" onClick={this.handleSubmit} />
                                    <input type="submit" value="CANCLE" class="btn float-right login_btn" onClick={this.handleCancle} />

                                </div>
                            </form>
                        </div>) : (null)}


                        <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />


                    </div>
                </div>
         

            </body>
        )
    }
}

export default SuperAdminCricket;