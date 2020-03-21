import React, {Component} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import SubHeader from './subHeader'

import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
 
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
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
const SOCKET = process.env.REACT_APP_API_SOCKET

class LiveCricketUpdate extends Component{
    constructor(props){
        super(props)
        this.state={
            load:true,
            seconds:0,
            ball:1,
            match1:null,
            match2:null,
            perbullRun:null,
            modalIsOpen: false,
            wicket:1,
            match1bhavTeam1:null,
            match1bhavTeam2:null,
            match1twoOverYes:null,
            match1twoOverNo:null,
            match1SixOverYes:null,
            match1SixOverNo:null,
            match1tenOverYes:null,
            match1tenOverNo:null,
            match1TwentyOverYes:null,
            match1TwentyOverNo:null,
            battingTeamSelected:false,
            battingTeam:null,
            bhavPaisaDifferenc:null,
            ballingTeam:null,
            final2OverScore:0,
            final6OverScore:0,
            final10OverScore:0,
            final20OverScore:0,
            winningTeam:null
        }
        this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

       this.socket = io(SOCKET, {
            query: {
                admin: "AdminToken"
            }
        });
        this.socket.on('perballRun', message => {
            this.getLiveCricketMatch()
        });
    }
  
    openModal() {
        this.setState({modalIsOpen: true});
      }
     
      afterOpenModal() {
        this.subtitle.style.color = '#f00';
      }
      closeModal() {
        this.setState({modalIsOpen: false});
      }

     async  getLiveCricketMatch(){
        var id = this.props.match.params.Id

        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/getcricketMatchId`,{id:id}).then((response)=>{
            // console.log("========yhhhhhhhhhchal raha========",response)
            this.setState({match1:response.data.match,load:false})
            if(response.data.match.BattingTeam === null){
                this.setState({battingTeamSelected:true})
            }
        }).catch((error)=>{
        })  
      }
    componentDidMount(){
      this.getLiveCricketMatch()
    }
    handleRun = (event)=>{
         this.setState({perbullRun:event.target.value})
    }
    handleShowSession = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/showNewSession`,{matchId:this.state.match1._id,run:parseInt(this.state.perbullRun)})
    }
    handleShowOldSession = (event)=>{
      event.preventDefault()
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/showOldSession`,{matchId:this.state.match1._id,run:parseInt(this.state.perbullRun)})
    }

    submitPerBallRun = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateperBallRun`,{matchId:this.state.match1._id,run:parseInt(this.state.perbullRun)})
    }
    handleWicket = (event)=>{
        this.setState({wicket:event.target.value})
    }
    submitWicket = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateWicket`,{matchId:this.state.match1._id,wicket:parseInt(this.state.wicket)})
    }
    handlebhav1 = (event)=>{
// console.log(event.target.value,this.state.bhavPaisaDifferenc)
        var match1bhavTeam2 = parseInt(event.target.value) + 10*this.state.bhavPaisaDifferenc
        console.log(event.target.value,this.state.bhavPaisaDifferenc,match1bhavTeam2)
        this.setState({match1bhavTeam1:event.target.value,match1bhavTeam2:match1bhavTeam2})
    }
    handlebhav2 = (event)=>{
        this.setState({match1bhavTeam2:event.target.value})
    }
    handletwoOverYes = (event)=>{
        this.setState({match1twoOverYes:event.target.value,match1twoOverNo:parseInt(event.target.value)-1})
    }
    handletwoOverNo = (event)=>{
        this.setState({match1twoOverNo:event.target.value})
    }
    handleSixOverYes = (event)=>{
        this.setState({match1SixOverYes:event.target.value,match1SixOverNo:parseInt(event.target.value)-1})
    }
    handleSixOverNo=(event)=>{
        this.setState({match1SixOverNo:event.target.value})
    }
    handleTenOverYes = (event)=>{
        console.log("=========handleTenOverYes============",event.target.value)
        this.setState({match1tenOverYes:event.target.value, match1tenOverNo:parseInt(event.target.value)-1})
    }
    handleTenOverNo = (event)=>{
        console.log("=========handleTenOverNo============",event.target.value)

        this.setState({match1tenOverNo:event.target.value})
    }
    handleTwentyOverYes = (event)=>{
           this.setState({match1TwentyOverYes:event.target.value, match1TwentyOverNo:parseInt(event.target.value)-1 })
    }
    handleTwentyOverNo = (event)=>{
        this.setState({match1TwentyOverNo:event.target.value})
 }
 handlePaisa = (event)=>{
    event.preventDefault()
     console.log("===========",event.target.value)
     this.setState({bhavPaisaDifferenc:event.target.value})

 }
 handleOvers = (event)=>{
     this.setState({ball:event.target.value})
 }
    submitBahv1match1 = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateBhaveonTeam1`,{matchId:this.state.match1._id,matchWinTeam1:parseFloat(this.state.match1bhavTeam1)})
        axios.post(`${SERVER}/updateBhaveonTeam2`,{matchId:this.state.match1._id,matchWinTeam2:parseFloat(this.state.match1bhavTeam2)})

        // this.submitBahv1match1()
    }
    submitBahv2match1 = ()=>{
        // event.preventDefault()

        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateBhaveonTeam2`,{matchId:this.state.match1._id,matchWinTeam2:parseFloat(this.state.match1bhavTeam2)})
    }
    submitwoOverSession = (event)=>{
        event.preventDefault()

        console.log("=====================",this.state.match1twoOverNo,this.state.match1twoOverYes)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateTwoOverSession`,{matchId:this.state.match1._id,no:parseInt(this.state.match1twoOverNo),yes:parseInt(this.state.match1twoOverYes)})

    }

    submitSixOverSession =(event)=>{
        event.preventDefault()

        console.log("=======888888888==============",this.state.handleTenOverYes,this.state.handleTenOverNo)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateSixOverSession`,{matchId:this.state.match1._id,no:parseInt(this.state.match1SixOverNo),yes:parseInt(this.state.match1SixOverYes)})
    }

    submitTenOverSession = (event)=>{
        event.preventDefault()

        console.log("=======888888888==============",this.state.match1SixOverNo,this.state.match1SixOverYes)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateTenOverSession`,{matchId:this.state.match1._id,no:parseInt(this.state.match1tenOverNo),yes:parseInt(this.state.match1tenOverYes)})
    }
    submitTwentyOverSession = (event)=>{
        event.preventDefault()

        console.log("=======888888888==============",this.state.match1SixOverNo,this.state.match1SixOverYes)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateTwentyOverSession`,{matchId:this.state.match1._id,no:parseInt(this.state.match1TwentyOverNo),yes:parseInt(this.state.match1TwentyOverYes)})
    }
     submitOvers = (event)=>{
         
         event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateperOvers`,{matchId:this.state.match1._id,runningBall:parseInt(this.state.ball)})
     }

     handleSettled = (event)=>{
        event.preventDefault()

        toast("This Will Integrated Once The Payment Has Been Confirmed As Per Revised Document", {containerId: 'B'})

     }
     battingTeam = (event)=>{
        event.preventDefault()
         this.setState({battingTeam:event.target.value})
     }
     ballingTeam = (event)=>{
        event.preventDefault()
         this.setState({ballingTeam:event.target.value})
     }
     handleBallRunning = (event)=>{
         event.preventDefault()
         const token = localStorage.getItem('superAdmintoken')
         axios.defaults.headers.common['Authorization'] = token;
         axios.post(`${SERVER}/ballRunning`,{matchId:this.state.match1._id,})
     }
     handleStart = (event)=>{
      event.preventDefault()
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/startbetting`,{matchId:this.state.match1._id})
     }
     submitFirtsBattingTeam = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/updateBattingTeam`,{matchId:this.state.match1._id,firstBattingTeam:this.state.battingTeam,ballingTeam:this.state.ballinTeam}).then((response)=>{
            console.log("=======",response)
            if(response.data.status){
                console.log("=======",response)

                this.getLiveCricketMatch()
                setTimeout(function () {
                  window.location.reload()
              }, 1500);
            }
        })
     }
     final2OverScore = (event)=>{
      event.preventDefault()
      this.setState({final2OverScore:event.target.value})
     }
     final6OverScore = (event)=>{
      event.preventDefault()
      this.setState({final6OverScore:event.target.value})
     }
     final10OverScore = (event)=>{
      event.preventDefault()
      this.setState({final10OverScore:event.target.value})
     }
     final20OverScore = (event)=>{
      event.preventDefault()
      this.setState({final20OverScore:event.target.value})
     }
     handleSettled2overs = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/settle2OverSession`,{matchId:this.state.match1._id,finalrun:parseInt(this.state.final2OverScore)}).then((response)=>{
            console.log("=======",response)
            this.getLiveCricketMatch()

            if(response.data.status){
                console.log("=======",response)

              
            }
        }) 
        this.getLiveCricketMatch()
        setTimeout(function () {
          window.location.reload()
      }, 3000);
     }
     handleSettled6overs = (event)=>{
      event.preventDefault()
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/settle6OverSession`,{matchId:this.state.match1._id,finalrun:parseInt(this.state.final6OverScore)}).then((response)=>{
          console.log("=======",response)
          this.getLiveCricketMatch()

          if(response.data.status){
              console.log("=======",response)

              this.getLiveCricketMatch()
             
          }
      }) 
      setTimeout(function () {
        window.location.reload()
    }, 3000);
   }
   handleSettled10overs = (event)=>{
    event.preventDefault()
    const token = localStorage.getItem('superAdmintoken')
    axios.defaults.headers.common['Authorization'] = token;
    axios.post(`${SERVER}/settle10OverSession`,{matchId:this.state.match1._id,finalrun:parseInt(this.state.final10OverScore)}).then((response)=>{
        console.log("=======",response)
        this.getLiveCricketMatch()

        if(response.data.status){
            console.log("=======",response)

            this.getLiveCricketMatch()
         
        }

    }) 
    setTimeout(function () {
      window.location.reload()
  }, 3000);
 }
 handleSettled20overs = (event)=>{
  event.preventDefault()
  const token = localStorage.getItem('superAdmintoken')
  axios.defaults.headers.common['Authorization'] = token;
  axios.post(`${SERVER}/settle20OverSession`,{matchId:this.state.match1._id,finalrun:parseInt(this.state.final20OverScore)}).then((response)=>{
      console.log("=======",response)
      this.getLiveCricketMatch()

      if(response.data.status){
          console.log("=======",response)

         
      }
  }) 
  setTimeout(function () {
    window.location.reload()
}, 3000);
}

     makeTeam1Favourite = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/setFavouriteTeam`,{matchId:this.state.match1._id,favouriteTeam:this.state.match1.team1,unfavouriteTeam:this.state.match1.team1}).then((response)=>{
            console.log("=======",response)
            if(response.data.status){
                console.log("=======",response)

                
            }
        })
     }
     makeTeam2Favourite = (event)=>{
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/setFavouriteTeam`,{matchId:this.state.match1._id,favouriteTeam:this.state.match1.team2, unfavouriteTeam:this.state.match1.team1}).then((response)=>{
            console.log("=======",response)
            if(response.data.status){
                console.log("=======",response)

                this.getLiveCricketMatch()
                
            }
        }) 
    }
    handleInningOver = (event)=>{
      event.preventDefault()
      console.log("this.stat===============",this.state.seconds)
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/marFirstInningOver`,{matchId:this.state.match1._id,seconds:this.state.seconds}).then((response)=>{
          console.log("=======",response)
          if(response.data.status){
              console.log("=======",response)

              this.getLiveCricketMatch()
          }
      })
    }
    handleStopSeconds = (event)=>{
      event.preventDefault()
      console.log("this.stat===============",this.state.seconds)
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/stopSeconds`,{matchId:this.state.match1._id,seconds:this.state.seconds}).then((response)=>{
          console.log("=======",response)
          if(response.data.status){
              console.log("=======",response)

              this.getLiveCricketMatch()
          }
      })
    }
    handleSeonds = (event)=>{
      this.setState({seconds:event.target.value})
    }
    handleSubmitSeconds = (event)=>{
      event.preventDefault()
      console.log("this.stat===============",this.state.seconds)
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/startForSeconds`,{matchId:this.state.match1._id,seconds:this.state.seconds}).then((response)=>{
          console.log("=======",response)
          if(response.data.status){
              console.log("=======",response)

              this.getLiveCricketMatch()
          }
      })
    }
    handleWinning = (event)=>{
      event.preventDefault()
      this.setState({winningTeam:event.target.value})

    }
   
    handleSettleTeamResult = (event)=>{
      event.preventDefault()
      const token = localStorage.getItem('superAdmintoken')
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(`${SERVER}/settleDownTeamResult`,{matchId:this.state.match1._id,team:this.state.winningTeam}).then((response)=>{
          console.log("=======",response)
          this.getLiveCricketMatch()

          if(response.data.status){
              console.log("=======",response)

              this.getLiveCricketMatch()
          }
      })
      setTimeout(function () {
        window.location.reload()
    }, 2000); 

    }




    render(){
if(this.state.load){
  return (
      <body className="">
                     <img src="../images/Loadingicon.gif" alt="loago"></img>

      </body>
  )
}
        return(
            <body  className="">
            <Header />
            <SubHeader />
            {/* <Sidebar /> */}
            {this.state.battingTeamSelected ? (
        
            <div class="row">
            <div class="column">
              <div class="card">
                  <p>Select Batting Team</p>
                  <p>Team1: {this.state.match1.team1} Team2: {this.state.match1.team2}</p>
                  <form onSubmit={this.submitFirtsBattingTeam}>
                  <input placeholder="Batting Team" className="form-control" onChange={this.battingTeam} ></input>
                  {/* <input placeholder="Batting Team" className="form-control" onChange={this.ballingTeam} ></input> */}

                  <button className="adimupdatebutton" onClick={this.submitFirtsBattingTeam}>Submut</button>

                  </form>
                  </div>
                  </div>
                  </div>
            ):(
            <div>
            <div class="row">
  <div class="column">
    <div class="card">
      <h3> Score</h3>
      <p>Score : {this.state.match1.matchScoreRun}/{this.state.match1.matchWicket}</p>
      <form onSubmit={this.submitPerBallRun}>
      <input placeholder="Update Per Ball Score" className="form-control" onChange={this.handleRun} ></input>

      <button className="adimupdatebutton" onClick={this.submitPerBallRun}>UpdateRun</button>

      </form>
      <form onSubmit={this.submitWicket}>
      <input placeholder="Update Wicket" onChange={this.handleWicket} className="form-control"  value={this.state.wicket}></input>

      <button className="adimupdatebutton"  onClick={this.submitWicket}>UpdateWicket</button>

      </form>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>Over</h3>
      <p>Overs: {this.state.match1.runningOvers}.{this.state.match1.runningBall}</p>
      <form onSubmit={this.submitOvers}>
      <input placeholder="Update Overs" className="form-control"  onChange={this.handleOvers} value={this.state.ball}></input>
      <button className="adimupdatebutton"  onClick={this.submitOvers}>Update</button>
      </form>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>BHAV ON TEAM1</h3>
      <p>Bhav on {this.state.match1.team1}: {this.state.match1.matchWinTeam1}</p>
      <p>Bhav on {this.state.match1.team2}: {this.state.match1.matchWinTeam2}</p>

      <form onSubmit={this.submitBahv1match1}>
      <input placeholder="Paisa" className="form-control"  onChange={this.handlePaisa}></input>
<br />
      <input placeholder="Update Bhav On Team1" className="form-control"  onChange={this.handlebhav1} value={this.state.match1bhavTeam1}></input>
      <br />

      <input placeholder="Update Bhav On Team2" className="form-control"  onChange={this.handlebhav1} value={this.state.match1bhavTeam2}></input>
      <button className="adimupdatebutton"  onClick={this.submitBahv1match1}>Update</button>

      </form>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>SELECT FAVOURITE TEAM</h3>
            <span>FAV<button className="adimupdatebutton"  onClick={this.makeTeam1Favourite}>{this.state.match1.team1}</button></span>
            <br />

      <span>-<button className="adimupdatebutton"  onClick={this.makeTeam2Favourite}>{this.state.match1.team2}</button></span>
  


     
    </div>
  </div>
</div>
<div class="row" style={{marginTop:"2%"}}>
  <div class="column">
    <div class="card">
      <h3>2 OVER SESSION</h3>
      <p>2over Session Yes:  {this.state.match1.twoOverSession.yes}   No:  {this.state.match1.twoOverSession.no}</p>

      <form onSubmit={this.submitwoOverSession}>
      <input placeholder="2 over No" className="form-control"  onChange={this.handletwoOverNo} value={this.state.match1twoOverNo}></input>
      <br />

      <input placeholder="2 over Yes" className="form-control" onChange={this.handletwoOverYes} value={this.state.match1twoOverYes}></input>
      {/* <br /> */}

        {/* <input placeholder="2 over No" className="form-control"  onChange={this.handletwoOverNo} value={this.state.match1twoOverNo}></input> */}

        <button className="adimupdatebutton"  onClick={this.submitwoOverSession}>Update</button>

      </form>
      
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>6 OVER SESSION</h3>
      <p>6over Session Yes:  {this.state.match1.sixOverSession.yes} No:{this.state.match1.sixOverSession.no}  </p>
      <form onSubmit={this.submitSixOverSession}>
      <input placeholder="6 over No" className="form-control"  onChange={this.handleSixOverNo} value={this.state.match1SixOverNo}></input>
      <br />

      <input placeholder="6 over Yes" className="form-control"  onChange={this.handleSixOverYes} value={this.state.match1SixOverYes}></input>
      {/* <br /> */}

        {/* <input placeholder="6 over No" className="form-control"  onChange={this.handleSixOverNo} value={this.state.match1SixOverNo}></input> */}


        <button className="adimupdatebutton" onClick={this.submitSixOverSession}>Update</button>
      </form>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>10 OVER SESSION</h3>
      <p>10over Session Yes:  {this.state.match1.tenOverSession.yes} No.:{this.state.match1.tenOverSession.no}</p>
  <form onSubmit={this.submitTenOverSession}>
  <input placeholder="10 over No" className="form-control" onChange={this.handleTenOverNo} value={this.state.match1tenOverNo}></input>
  <br />

  <input placeholder="10 over Yes" className="form-control"  onChange={this.handleTenOverYes} value={this.state.match1tenOverYes} ></input>
  {/* <br /> */}

        {/* <input placeholder="10 over No" className="form-control" onChange={this.handleTenOverNo} value={this.state.match1tenOverNo}></input> */}

        <button className="adimupdatebutton"  onClick={this.submitTenOverSession}>Update</button> 
  </form>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>20 OVER SESSION</h3>
        <p>20over Session Yes:  {this.state.match1.twentyOverSession.yes} No:{this.state.match1.twentyOverSession.no}</p>
      <form onSubmit={this.submitTwentyOverSession}>
      <input placeholder="20 over No" className="form-control"  onChange={this.handleTwentyOverNo} value={this.state.match1TwentyOverNo}></input>
      <br />

        <input placeholder="20 over Yes"className="form-control"  onChange={this.handleTwentyOverYes} value={this.state.match1TwentyOverYes} ></input>
{/* <br /> */}
        {/* <input placeholder="20 over No" className="form-control"  onChange={this.handleTwentyOverNo} value={this.state.match1TwentyOverNo}></input> */}

        <button className="adimupdatebutton"  onClick={this.submitTwentyOverSession}>Update</button>
        </form>
    </div>
  </div>
</div>
<div className="row" style={{marginTop:"2%",marginLeft:"0%"}}>
<div class="column">
<div className="card">
<p>Press Ball Running To Stop Bet</p>
{this.state.match1.disabled ? (    <button style={{"color":"white" ,"background":"green"}}  className="adimupdatebutton" onClick={this.handleStart} > START</button>
):(    <button style={{"color":"white" ,"background":"red"}} className="adimupdatebutton" onClick={this.handleBallRunning} > STOP</button>
)}
    </div>
    </div>
    <div class="column">
<div className="card">
<p>Show New Session</p>
{this.state.match1.showNewSession ? (    <button className="adimupdatebutton" onClick={this.handleShowOldSession} >Show Old Session</button>
):(    <button className="adimupdatebutton" onClick={this.handleShowSession} >Show New Session</button>
)}
    {/* <button className="adimupdatebutton" onClick={this.handleShowSession} >Show NesSession</button> */}
    </div>
    </div>
    <div class="column">
<div className="card">
<p>Start And Stop Bet For Seconds</p>
{this.state.match1.forSeconds ? (      <button style={{"color":"white" ,"background":"red"}} className="adimupdatebutton" onClick={this.handleStopSeconds} >STOP</button>

):(<form onSubmit={this.handleSubmitSeconds} >
  <input placeholder="Seconds" className="form-control"  onChange={this.handleSeonds} value={this.state.match1TwentyOverNo}></input>
  
      <button style={{"color":"white" ,"background":"green"}}  className="adimupdatebutton" onClick={this.handleSubmitSeconds} >Start</button>
      </form>
  )}
{/* <form onSubmit={this.handleSubmitSeconds} >
<input placeholder="Seconds" className="form-control"  onChange={this.handleSeonds} value={this.state.match1TwentyOverNo}></input>

    <button className="adimupdatebutton" onClick={this.handleSubmitSeconds} >Start</button>
    </form> */}
    </div>
    </div>
    <div class="column">
<div className="card">
<p>Mark Innig Over</p>
{this.state.match1.firstInningOver ? (   null
):(    <button style={{"color":"white" ,"background":"red"}} className="adimupdatebutton" onClick={this.handleInningOver} >Inning Over</button>
)}
    </div>
    </div>

</div>
<div className="row" style={{marginTop:"2%",marginLeft:"0%"}}>

<div class="column">
<div className="card">
  {this.state.match1.settletwoOverSession ? (<p>2 Over Session Get Settled </p>):(<div>
    <p>Settle Down 2 over Session</p>
    <form>

    
    <input placeholder="2 over final score"className="form-control"  onChange={this.final2OverScore} value={this.state.final2OverScore} ></input>

    <button className="adimupdatebutton" onClick={this.handleSettled2overs} >Settele 2 Over Session</button>
    </form>
  </div>)}
    
    </div>
    </div>
    <div class="column">
<div className="card">
  {this.state.match1.settlesixOverSession ? (<p>6 Over Session Get Settled </p>):(
    <div>
 <p>Settle Down 6 over Session</p>
    <form>

    
    <input placeholder="6 over final score"className="form-control"  onChange={this.final6OverScore} value={this.state.final6OverScore} ></input>

    <button className="adimupdatebutton" onClick={this.handleSettled6overs} >Settele 6 Over Session</button>
    </form>
    </div>
  )}
   
    </div>
    
    </div>
    <div class="column">
<div className="card">
  {this.state.match1.settletenOverSession ? (<p>10 Over Session Get Settled </p>):(<div>
  <p>Settle Down 10 over Session</p>
  <form>

  
  <input placeholder="10 over final score"className="form-control"  onChange={this.final10OverScore} value={this.state.final10OverScore} ></input>

  <button className="adimupdatebutton" onClick={this.handleSettled10overs} >Settele 10 Over Session</button>
  </form>
    </div>)}
    
    </div>
    
    </div>
    <div class="column">
<div className="card">
  {this.state.match1.settletwentyOverSession? (<p>20 Over Session Get Settled </p>):(<div>
    <p>Settle Down 20 over Session</p>
    <form>

    
    <input placeholder="20 over final score"className="form-control"  onChange={this.final20OverScore} value={this.state.final20OverScore} ></input>

    <button className="adimupdatebutton" onClick={this.handleSettled20overs} >Settele 20 Over Session</button>
    </form>
  </div>)}
    
    </div>
    
    </div>

</div>
<div className="row" style={{marginTop:"2%",marginLeft:"0%"}}>
<div class="column">
<div className="card">
<p>Please Enter Winning Team As Per Above</p>
<form onSubmit={this.handleSettleTeamResult} >
<input placeholder="Winning Team"className="form-control"  onChange={this.handleWinning} value={this.state.winningTeam} ></input>

    <button className="adimupdatebutton" onClick={this.handleSettleTeamResult} > Settle Team Result</button>
    </form>
    </div>
    </div>
   
   

</div>
            
</div>  
          )}
          
            </body>

                            
        )
    }
}

export default LiveCricketUpdate;