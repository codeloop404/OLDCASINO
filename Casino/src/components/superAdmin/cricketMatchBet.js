import React, { Component } from 'react'
import Header from './Header'
import SubHeader from './subHeader'

import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import DeskTimer from '../DestopTimer'
import Timer from '../Timer'


const SERVER = process.env.REACT_APP_API_URL
const SOCKET = process.env.REACT_APP_API_SOCKET
class SuperAdminCricketBetOnMatch extends Component {
    socket = {};

    constructor(props) {
        super(props)
        this.state = {
            load: true,
            match: null,
            run: null,
            betSelected: null,
            betAmount: 0,
            betName: '',
            userName: null,
            masterAdminComission: null,
            masterAdmin: "",
            disabled: false,
            calculatoClick:"",
            selectedBet:null,
            profit:0,
            betPricceonTeam1:'',
            time: {}, seconds: null 
        }
        this.socket = io(SOCKET, {
            query: {
                admin: "AdminToken"
            }
        });
        this.socket.on('ballrnunning', message => {
            var id = this.props.match.params.Id
            console.log("============", id, message)
            if (id === message.matchId) {
                this.setState({ run: "Ball Running", disabled: true })

            }
        })
        this.socket.on('updateRunningball', message => {
            console.log("=======yha yaya===== message0000000", message)
            if (message.wicket) {
                this.setState({ run: "W", disabled: false })
                return
            }
            if (message) {
                this.setState({ run: `${message.run}Run`, disabled: false })
            }

        })
        this.socket.on('perballRun', message => {
            console.log("=======yha yaya===== message")
            this.setState({ load: true })
            this.getCricketMatch()
        });
        this.socket.on('sessionChanged', message => {
            console.log("=======yha yaya===== message")
            // this.setState({ load: true })
            this.getCricketMatch()
        });
        this.socket.on('seconds',message=>{
            console.log("==========yyyyy hhahahhahahahppppppp======chal arah")
            this.getCricketMatch()

        })
    }
    secondsToTime(secs){
        // console.log("==========iski maaa ka yh ayaayyaya======",secs)
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
    
    async getMasterPercentage() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getMasterByUser`, { id: USERID })
        console.log("============yyyyyyyy=getUserbyuserName========llllllllllll= masterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", response)

        if (response.data.status) {
            await this.setState({ masterAdminComission: (response.data.masterAdminComission).toFixed(0) })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        }
    }

    async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getUserbyuserName`, { id: USERID })
        console.log("============yyyyyyyy=678015r24e2732========llllllllllll=", response)

        if (response.data.status) {
            await this.setState({ walletBalance: (response.data.user.walletBalance).toFixed(0), masterAdmin: response.data.user.masterAdmin })
        } else {
        }
        console.log("=========123===========", this.state.walletBalance)
        //    await this.setState({currentServerTime:response.data.time})
    }

    async getCricketMatch() {

        var id = this.props.match.params.id
        console.log(this.props.match.params.id, "======88888888=========9999================")
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var match = await axios.post(`${SERVER}/getcricketMatchId`, { id: id })
        console.log("=====match===================",match)
        if (match.data.status) {
            this.setState({ match: match.data.match, load: false })
        }
    }

    handleCancleAll = (event)=>{
        this.setState({
          
            calculatoClick:"",
            selectedBet:null,
            profit:0,
            betSelected: null,
            betAmount: 0,
            betName: '',
        })
    }

    componentDidMount() {
        console.log("===========================999999999999=============", this.props.match.params.Id)
        this.getCricketMatch()
        this.getUser()
        this.getMasterPercentage()
        // this.millisToMinutesAndSeconds(60000) 
    }
    handleClick0 =()=>{
console.log(this.state.calculatoClick+0)
        this.setState({calculatoClick:this.state.calculatoClick+0,betAmount:parseInt(this.state.calculatoClick+0)})

if(this.state.selectedBet == "Session"){
    this.setState({profit:parseInt(this.state.calculatoClick+0)*2})
}    
if(this.state.betSelected == this.state.match.matchWinTeam1){
this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+0)})
}    
if(this.state.betSelected == this.state.match.matchWinTeam2){
    this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+0)})
    }

    }
    handleClick1 =()=>{
        console.log(parseInt(this.state.calculatoClick+1))

        this.setState({calculatoClick:this.state.calculatoClick+1,betAmount:parseInt(this.state.calculatoClick+1)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+1)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+1)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+1)})
                }
    }
    handleClick2 =()=>{
        console.log(parseInt(this.state.calculatoClick+2))

        this.setState({calculatoClick:this.state.calculatoClick+2,betAmount:parseInt(this.state.calculatoClick+2)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+2)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+2)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+2)})
                }
    }
    handleClick3 =async()=>{

       await this.setState({calculatoClick:this.state.calculatoClick+3,betAmount:parseInt(this.state.calculatoClick+3)})
       if(this.state.selectedBet == "Session"){
        console.log("======isme ghus raha======")

        this.setState({profit:parseInt(this.state.calculatoClick+3)*2})
    } 
    if(this.state.betSelected == this.state.match.matchWinTeam1){
        this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+3)})
        }    
        if(this.state.betSelected == this.state.match.matchWinTeam2){
            this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+3)})
            }
    }
    handleClick4 = () => {

        this.setState({calculatoClick:this.state.calculatoClick+4,betAmount:parseInt(this.state.calculatoClick+4)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")
            this.setState({profit:parseInt(this.state.calculatoClick+4)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+4)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+4)})
                }
    }
    handleClick5 = () => {

        this.setState({calculatoClick:this.state.calculatoClick+5,betAmount:parseInt(this.state.calculatoClick+5)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+5)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+5)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+5)})
                }
    }
    handleClick6 = () => {

        this.setState({calculatoClick:this.state.calculatoClick+6,betAmount:parseInt(this.state.calculatoClick+6)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+6)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+6)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+6)})
                }
    }
    handleClick7 = () => {

        this.setState({calculatoClick:this.state.calculatoClick+7,betAmount:parseInt(this.state.calculatoClick+7)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+7)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+7)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+7)})
                }
    }
    handleClick8 = () => {

        this.setState({calculatoClick:this.state.calculatoClick+8,betAmount:parseInt(this.state.calculatoClick+8)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+8)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+8)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+8)})
                }
    }
    handleClick9 = () => {

        this.setState({calculatoClick:this.state.calculatoClick+9,betAmount:parseInt(this.state.calculatoClick+9)})
        if(this.state.selectedBet == "Session"){
            console.log("======isme ghus raha======")

            this.setState({profit:parseInt(this.state.calculatoClick+9)*2})
        } 
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(this.state.calculatoClick+9)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(this.state.calculatoClick+9)})
                }
    }


    submit2overSessionNo = (event) => {
        console.log("=======8888888============")
        this.setState({ betSelected: this.state.match.twoOverSession.no, betName: "2 Over No" ,selectedBet:"Session"})
        

    }
    submit6overSessionNo = (event) => {
        this.setState({ betSelected: this.state.match.sixOverSession.no, betName: "6 Over No",selectedBet:"Session" })

    }
    submit2overSessionYes = (event) => {
        console.log("=======8888888============")
        this.setState({ betSelected: this.state.match.twoOverSession.yes, betName: "2 Over Yes" ,selectedBet:"Session"})

    }
    submit6overSessionYes = (event) => {
        this.setState({ betSelected: this.state.match.sixOverSession.yes, betName: "6 Over Yes",selectedBet:"Session" })

    }
    submit10overSessionNo = (event) => {
        console.log("=======8888888============")
        this.setState({ betSelected: this.state.match.tenOverSession.no, betName: "10 Over No",selectedBet:"Session" })

    }
    submit10overSessionYes = (event) => {
        console.log("=======8888888============")
        this.setState({ betSelected: this.state.match.tenOverSession.yes, betName: "10 Over Yes",selectedBet:"Session" })

    }
    submit20overSessionNo = (event) => {
        console.log("=======8888888============")
        this.setState({ betSelected: this.state.match.twentyOverSession.no, betName: "20 Over No",selectedBet:"Session" })

    }
    submit20overSessionYes = (event) => {
        console.log("=======8888888============")
        this.setState({ betSelected: this.state.match.twentyOverSession.yes, betName: "20 Over Yes",selectedBet:"Session" })

    }
    handleBetAmount = (event) => {
        console.log("=======8888888=========handleBetAmoun===", event.target.value)
        this.setState({ betAmount: event.target.value })
        if(this.state.selectedBet == "Session"){
            this.setState({profit:2*(parseInt(event.target.value))})
        }
        if(this.state.betSelected == this.state.match.matchWinTeam1){
            this.setState({profit:(this.state.match.matchWinTeam1/1000)*parseInt(event.target.value)})
            }    
            if(this.state.betSelected == this.state.match.matchWinTeam2){
                this.setState({profit:(1000/this.state.match.matchWinTeam2)*parseInt(event.target.value)})
                }

    }
    handlebetonTeam2 = (event) => {
        this.setState({ betSelected: this.state.match.matchWinTeam2, betName: this.state.match.team2 })

    }
    handlebetonTeam1 = (event) => {
        this.setState({ betSelected: this.state.match.matchWinTeam1, betName: this.state.match.team1 })

    }

    submitBet = (event) => {

        // toast(`Please Enter Amount greaterthan 100`, { containerId: 'B' })

        this.getCricketMatch()
        // console.log("=======8888888======submitBet===handleBetAmoun===",this.state.betSelected,this.state.betAmount, typeof this.state.betName , typeof this.state.match.team1)
        console.log("========9999", this.state.betName == this.state.match.team1)
        if (parseInt(this.state.betAmount) < 100) {

            toast(`Please Enter Amount greaterthan 100`, { containerId: 'B' })
            return
        }
        if (this.state.betName === "2 Over No") {
            console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.twoOverSession.no) {
                console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                const token = localStorage.getItem('superAdmintoken')
                axios.defaults.headers.common['Authorization'] = token;
                axios.post(`${SERVER}/betPlaceon2overNo`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 2 over no`, { containerId: 'B' })

        }
        if (this.state.betName === "2 Over Yes") {
            console.log("==========================", this.state)
            console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.twoOverSession.yes) {
                console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                const token = localStorage.getItem('superAdmintoken')
                axios.defaults.headers.common['Authorization'] = token;
                axios.post(`${SERVER}/betPlaceon2overyes`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 2 over Yes`, { containerId: 'B' })

        }
        if (this.state.betName === "6 Over Yes") {
            console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.sixOverSession.yes) {
                console.log(this.state.betSelected !== this.state.match.sixOverSession.yes, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                axios.post(`${SERVER}/betPlaceon6overYes`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 6 over Yes`, { containerId: 'B' })

        }
        if (this.state.betName === "6 Over No") {
            console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.sixOverSession.no) {
                console.log(this.state.betSelected !== this.state.match.sixOverSession.no, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                axios.post(`${SERVER}/betPlaceon6overNo`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 6 over No`, { containerId: 'B' })

        }
        if (this.state.betName === "10 Over No") {
            console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.tenOverSession.no) {
                console.log(this.state.betSelected !== this.state.match.tenOverSession.no, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                axios.post(`${SERVER}/betPlaceon10overNo`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 6 over No`, { containerId: 'B' })

        }
        if (this.state.betName === "10 Over Yes") {
            console.log(this.state.betSelected !== this.state.match.twoOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.tenOverSession.yes) {
                console.log(this.state.betSelected !== this.state.match.tenOverSession.no, "=======9990000===========")
                // alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })
                return

            } else {
                axios.post(`${SERVER}/betPlaceon10overYes`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 6 over No`, { containerId: 'B' })

        }
        if (this.state.betName === "20 Over No") {
            console.log(this.state.betSelected !== this.state.match.twentyOverSession.no, "=======9990000")
            if (this.state.betSelected !== this.state.match.twentyOverSession.no) {
                console.log(this.state.betSelected !== this.state.match.sixOverSession.no, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                axios.post(`${SERVER}/betPlaceon20overNo`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 6 over No`, { containerId: 'B' })

        }
        if (this.state.betName === "20 Over Yes") {
            console.log(this.state.betSelected !== this.state.match.twentyOverSession.yes, "=======9990000")
            if (this.state.betSelected !== this.state.match.twentyOverSession.yes) {
                console.log(this.state.betSelected !== this.state.match.sixOverSession.no, "=======9990000===========")
                alert("Session Changed Reselect")
                toast("Session Changed Reselect", { containerId: 'B' })

            } else {
                axios.post(`${SERVER}/betPlaceon6overYes`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
            toast(`you Have selcted bet of 6 over No`, { containerId: 'B' })

        }
        if (this.state.betName == this.state.match.team1) {
            if (this.state.betSelected !== this.state.match.matchWinTeam1) {
                alert("Value Changed Reselect")

            } else {
                axios.post(`${SERVER}/betPlaceonTeam1`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount) ,winAmount:(parseInt(this.state.profit).toFixed(2))}).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
        }
        if (this.state.betName == this.state.match.team2) {
            if (this.state.betSelected !== this.state.match.matchWinTeam2) {
                alert("Value Changed Reselect")

            } else {
                axios.post(`${SERVER}/betPlaceonTeam2`, { id: this.state.match._id, masterAdmin: this.state.masterAdmin, masterAdminComission: parseFloat(this.state.masterAdminComission), betAmount: parseInt(this.state.betAmount),winAmount:(parseInt(this.state.profit).toFixed(2)) }).then((response) => {
                    console.log("=============999999999=========", response)
                    toast("Your Bet Is Placed Successfully", { containerId: 'B' })

                })
            }
        }



    }



    render() {
        if (this.state.load) {
            return (
                <body className="cricketBack">
                    <Header />
                    <SubHeader />

                    <img src="../images/Loadingicon.gif" alt="loago"></img>

                </body>
            )
        }
        return (
            <body className="cricketBack" style={{ background: "#070f29" }}>
                <Header />
                <SubHeader />
                
                <div className="cricket_card cricket_card_background content-desktop ">
                    <div style={{height:"70px"}} className="panel-heading">
                        <p className="cricket_header_panel">Maximum Win:20,00,000 <span style={{ marginLeft: "20px", marginRight: "20px" }}>|</span> {this.state.match.matchScoreRun}/{this.state.match.matchWicket} ({this.state.match.runningOvers}.{this.state.match.runningBall})</p>
                    </div>
                    <div className="teamList">
                        <span className="cricket_burning_margin"><img className="teamA" src="../images/teamA.png"></img><span className="australia_india_burning">{this.state.match.team1}</span></span>
                        <span><img style={{ marginLeft: "62px" }} src="../images/burningBall.png"></img></span>
                        <span className="cricket_burning_margin"><span className="australia_india_burning1">{this.state.match.team2}</span><img className="teamB" src="../images/teamB.png"></img></span>
                    </div>
                    <div className="card cricket_secondCard">
                        <span className="australia_india_burning">{this.state.match.team1}</span>
                        <span class="container1">

                            <div onClick={this.handlebetonTeam1} class="cricketCentered51"><p className="cricket-input-card1">10000</p></div>
                            <div onClick={this.handlebetonTeam1} class="cricketCentered52">
                                {this.state.match.matchWinTeam2 > this.state.match.matchWinTeam1 ? (<p className="cricket-input-card2">FAV</p>) : (<p className="cricket-input-card2">-</p>)}
                            </div>
                            <span class="cricketCentered55">
                                <p className="cricket-input-card6">{this.state.run}</p>
                                {/* <img src="../images/runningBall.png"></img> */}
                            </span>
                            <span className="australia_india_burning2">{this.state.match.team2}</span>
                            <span onClick={this.handlebetonTeam2} class="cricketCentered53"><p className="cricket-input-card3">10000</p></span>
                            <span onClick={this.handlebetonTeam2} class="cricketCentered54">
                                {this.state.match.matchWinTeam2 > this.state.match.matchWinTeam1 ? (<p className="cricket-input-card4">-</p>) : (<p className="cricket-input-card4">FAV</p>)}
                            </span>
                        </span>
                        <div className="row">
                            <div className="col-md-4 cricket_1st_col">
                                <span onClick={this.handlebetonTeam1} className="container1 cricket_2nd_row_1st">
                                    <span className="row_1st">{this.state.match.team1}</span>
                                    <span>
        <span className="cricket-input-card5">{this.state.match.matchWinTeam1}</span>
                                        {this.state.match.matchWinTeam1 > this.state.match.matchWinTeam2 ? (<span className="cricket_L_class">K</span>) : (<span className="cricket_L_class">L</span>)}
                                    </span>
                                </span>
                                <span>

                                    <span onClick={this.handlebetonTeam2} className="container1 cricket_2nd_row_1st">
                                        <span className="row_1st">{this.state.match.team2}</span>
                                        <span>
                                            {this.state.match.matchWinTeam1 > this.state.match.matchWinTeam2 ? (<span className="cricket_L_class">L</span>) : (<span className="cricket_L_class">K</span>)}

                                            <span className="cricket-input-card5">{this.state.match.matchWinTeam2}</span>
                                        </span>
                                    </span>

                                </span>

                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4 cricket_1st_col">
                                <span>
                                    <span onClick={this.handlebetonTeam1} className="container1 cricket_2nd_row_1st">

                                        <span className="row_1st">{this.state.match.team1}</span>
                                        <span>
                                            <span className="cricket-input-card5">{this.state.match.matchWinTeam1}</span>
                                            {this.state.match.matchWinTeam1 > this.state.match.matchWinTeam2 ? (<span className="cricket_L_class">K</span>) : (<span className="cricket_L_class">L</span>)} </span>
                                    </span>

                                </span>
                                <span onClick={this.handlebetonTeam2} className="container1 cricket_2nd_row_1st">

                                    <span className="row_1st">{this.state.match.team2}</span>
                                    <span>
                                        {this.state.match.matchWinTeam1 > this.state.match.matchWinTeam2 ? (<span className="cricket_L_class">L</span>) : (<span className="cricket_L_class">K</span>)}

                                        <span className="cricket-input-card5">{this.state.match.matchWinTeam2}</span>
                                    </span>
                                </span>


                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card cricket_secondCard1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <span><img className="thirdRunningBall" src="../images/session.png"></img></span>
                                        {this.state.match.showNewSession ? (<div className="thirdSecondLine1">10 over session</div>) : (<div className="thirdSecondLine1">2 over session</div>)}
                                        {this.state.match.showNewSession ? (<div className="thirdSecondLine2">20 over session</div>) : (<div className="thirdSecondLine2">6 over session</div>)}

                                    </div>
                                    <div className="col-md-3">
                                        <div className="container1">
                                            <div className="thirdNo5">No</div>
                                            {this.state.match.showNewSession ? (<div onClick={this.submit10overSessionNo} className="thirdNo1">{this.state.match.tenOverSession.no}</div>) : (<div onClick={this.submit2overSessionNo} className="thirdNo1">{this.state.match.twoOverSession.no}</div>)}
                                            {this.state.match.showNewSession ? (<div onClick={this.submit20overSessionNo} className="thirdNo2">{this.state.match.twentyOverSession.no}</div>) : (<div onClick={this.submit6overSessionNo} className="thirdNo2">{this.state.match.sixOverSession.no}</div>)}

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="container1">
                                            <div className="thirdNo6">Yes</div>
                                            {this.state.match.showNewSession ? (<div onClick={this.submit10overSessionYes} className="thirdNo3">{this.state.match.tenOverSession.yes}</div>) : (<div onClick={this.submit2overSessionYes} className="thirdNo3">{this.state.match.twoOverSession.yes}</div>)}
                                            {this.state.match.showNewSession ? (<div onClick={this.submit20overSessionYes} className="thirdNo4">{this.state.match.twentyOverSession.yes}</div>) : (<div onClick={this.submit6overSessionYes} className="thirdNo4">{this.state.match.sixOverSession.yes}</div>)}

                                        </div>
                                    </div>
                                    {/* <div className="col-md-1">
                                    </div> */}
                                </div>
                            </div>
                            <div>
                                <img className="cricket_logo_bet" src="../images/cricket_bet_logo.png"></img>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* <div className="container1">
                                <span class="cricketCentered55">
                                </span>
                            </div> */}
                            <span class="cricketCentered55">
                                {/* <p className="cricket-input-card66">88888</p> */}
                                <input type="number" placeholder="Profit Calculator" className="cricket-input-card66" value={(this.state.profit).toFixed(2)}></input>
                            </span>
                            <div className="row margin_right_desktop margin_top_row1">
                                <div className="col-md-3">
                                    {/* <button>
                                        <span>4</span>
                                    </button> */}
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <span>
                                        <button onClick={this.handleClick1} className="calculator">
                                            <span>1</span>
                                        </button>
                                    </span>

                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick2} className="calculator">
                                        <span>2</span>
                                    </button>
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick3} className="calculator">
                                        <span>3</span>
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    {/* <button>
                                        <span>4</span>
                                    </button> */}
                                </div>
                            </div>
                            <div className="row margin_right_desktop margin_top_row2">
                                <div className="col-md-3">
                                    {/* <button>
                                        <span>4</span>
                                    </button> */}
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick4} className="calculator">
                                        <span>4</span>
                                    </button>
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick5} className="calculator">
                                        <span>5</span>
                                    </button>
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick6} className="calculator">
                                        <span>6</span>
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    {/* <button>
                                        <span>4</span>
                                    </button> */}
                                </div>
                            </div>
                            <div className="row margin_right_desktop margin_top_row3">
                                <div className="col-md-3">
                                    {/* <button>
                                        <span>4</span>
                                    </button> */}
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick7} className="calculator">
                                        <span>7</span>
                                    </button>
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick8} className="calculator">
                                        <span>8</span>
                                    </button>
                                </div>
                                <div className="col-md-2" style={{ textAlign: "center" }}>
                                    <button onClick={this.handleClick9} className="calculator">
                                        <span>9</span>
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    {/* <button>
                                        <span>4</span>
                                    </button> */}
                                </div>
                            </div>

                            <div className="row margin_right_desktop margin_top_row3">
                                <div className="col-md-3">

                                </div>
                                <div className="col-md-6 zero_allign_center">
                                    <button onClick={this.handleClick0} className="calculator">
                                        <span>0</span>
                                    </button>
                                </div>
                                <div className="col-md-3">

                                </div>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="card cricket_secondCard2">
                                <div className="container1">
                                    {/* <span className='india_final'><span style={{ color: "#3880f9" }}>{this.state.betName}</span> Bet Slip</span>
                                    <span className="card">hhhh</span> */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span className='india_final'><span style={{ color: "#3880f9" }}>{this.state.betName}</span> Bet Slip</span>
                                        </div>
                                        <div className="col-md-6">
                                            <span className="card final_bet_timer">
                                                <div className="bet_time_font">BET Time</div>
                                                {this.state.match.forSeconds ? (<DeskTimer startetdAt={this.state.match.betStartingTime} expiredAt={this.state.match.betExpiredAt}/>):(null)}
                                                {/* <DeskTimer startetdAt={this.state.match.betStartingTime} expiredAt={this.state.match.betExpiredAt}/> */}
                                                {/* <div className="bet_timing_font">05 - SEC</div> */}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="container1">
                                    <div className="cricket_final_bet">
                                        <span className="cricket-input-card7"><input className="betSelected" value={this.state.betSelected || ""} /></span>
                                        <span className="cricket_L_lastRow">Selected Bet</span>
                                    </div>
                                    <div className="cricket_final_bet">
                                        <span className="cricket-input-card8"><input type="number" className="betSelected1" onChange={this.handleBetAmount} value={this.state.betAmount}/></span>
                                        <span className="cricket_L_lastRow1">Amount</span>
                                    </div>
                                </div>
                                <div className="container1">
                                    <div className="cricket_margin_top">
                                        <button class="cricket_final_button" onClick={this.handleCancleAll}>Cancel</button>
                                       <button class="cricket_final_button1" >NOT</button>
                                        {/* <button disabled={this.state.disabled}  onClick={this.submitBet} class="cricket_final_button1" >OK</button> */}
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>










                {/* mobile content starts here........................... */}





                <div className="and_cricket_card cricket_card_background content-mobile">
                    <div className="panel-heading">
                        <p className="and_cricket_header_panel">Maximum Win:20,00,000 <span style={{ marginLeft: "20px", marginRight: "20px" }}>|</span> {this.state.match.matchScoreRun}/{this.state.match.matchWicket} ({this.state.match.runningOvers}.{this.state.match.runningBall})</p>
                    </div>
                    <div className="and_teamList">
                        <span><img className="and_burnibgBall_width" src="../images/burningBall.png"></img></span>
                    </div>
                    <span className="and_width_640px">
                        <div className="card and_cricket_secondCard">
                            <div class="row">
                                <div onClick={this.handlebetonTeam1} className="col-md-4 col-sm-4 col-xs-4 and_margin_top4">
                                    {/* <img className="and_teamA" src="../images/teamA.png"></img> */}
                                    <span className="and_australia_india_burning">{this.state.match.team1}</span>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4 and_margin_top5">
                                    <div class="container1">
                                        <span class="and_cricketCentered51"><p className="and_cricket-input-card1">10000</p>

                                        </span>
                                        <span class="and_cricketCentered52"><p className="and_cricket-input-card2">-</p></span>
                                    </div>
                                </div>
                                <span className="col-xs-6 col-sm-4 col-md-4 cricket_1st_col and_margin_top3">
                                    <span onClick={this.handlebetonTeam1} className="container1 and_cricket_2nd_row_1st">
                                        <span className="row_1st" style={{color:"##ff9933"}}>{this.state.match.team1}</span>
                                        <span>
                                            {/* <span className="cricket-input-card5">222</span> */}
                                            <span className="and_cricket-input-card222">{this.state.match.matchWinTeam1}</span>

                                            {/* <span className="cricket_L_class">K</span> */}
                                            <span className="and_cricket_L_class222">K</span>


                                        </span>
                                    </span>
                                    <span>
                                        <span onClick={this.handlebetonTeam2} className="container1 and1_cricket_2nd_row_1st">
                                            <span className="row_1st" style={{color:"#ff2121"}}>{this.state.match.team2}</span>
                                            <span>
                                                {/* <span className="cricket-input-card5">333</span> */}
                                                <span className="and_cricket-input-card333">{this.state.match.matchWinTeam2}</span>

                                                {/* <span className="cricket_L_class">L</span> */}
                                                <span className="and_cricket_L_class333">L</span>

                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            {/* <div class="row">
                                <div className="col-md-4 col-sm-4 col-xs-4">

                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4 and_margin_top6">
                                    <span><img className="and_runningBall" src="../images/runningBall.png"></img></span>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">

                                </div>
                            </div> */}
                            <div class="row and_margin_top_row">
                                <div onClick={this.handlebetonTeam2} className="col-md-4 col-sm-4 col-xs-4 and_margin_top2">

                                    {/* <img className="and_teamA" src="../images/teamB.png"></img> */}
                                    <span className="and_australia_india_burning">{this.state.match.team2}</span>


                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <div class="container1 and_margin_top1">
                                        <span class="and_cricketCentered51"><p className="and_cricket-input-card1 and_cricket-input-card1new">10000</p>

                                        </span>
                                        <span onClick={this.handlebetonTeam2} class="and_cricketCentered52"><p className="and_cricket-input-card2 and_cricket-input-card22222">FAV</p></span>
                                        {/* <span class="and_cricketCentered52 and_cricket-input-card2">yyy</span> */}

                                    </div>
                                </div>
                                <span className="col-xs-6 col-sm-4 col-md-4 and_cricket_1st_col">
                                    <span onClick={this.handlebetonTeam1} className="container1 and_cricket_2nd_row_1st">
                                        <span className="row_1st" style={{color:"##ff9933"}}>{this.state.match.team1}</span>
                                        <span>
                                            {/* <span className="cricket-input-card5">555</span> */}
                                            <span className="and_cricket-input-card555">{this.state.match.matchWinTeam1}</span>

                                            {/* <span className="cricket_L_class">K</span> */}
                                            <span className="and_cricket_L_class555">K</span>

                                        </span>
                                    </span>
                                    <span>
                                        <span onClick={this.handlebetonTeam2} className="container1 and1_cricket_2nd_row_1st">
                                            <span className="row_1st" style={{color:"#ff2121"}}>{this.state.match.team2}</span>
                                            <span>
                                                {/* <span className="cricket-input-card5">666</span> */}
                                                <span className="and_cricket-input-card666">{this.state.match.matchWinTeam2}</span>

                                                {/* <span className="cricket_L_class">L</span> */}
                                                <span className="and_cricket_L_class666">L</span>

                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </span>
                    <span className="and_width_640px">
                        <div className="card and_cricket_secondCard1">
                            <div className="row">
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    {this.state.match.showNewSession ? (<div className="and_thirdSecondLine1">10 over session</div>
                                    ) : (<div className="and_thirdSecondLine1">2 over session</div>
                                        )}
                                    {this.state.match.showNewSession ? (<div className="and_thirdSecondLine2">20 over session</div>
                                    ) : (<div className="and_thirdSecondLine2">6 over session</div>
                                        )}
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <span><img className="and_thirdRunningBall" src="../images/runningBall.png"></img></span>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">

                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 and_No_pdding_right">
                                            <span className="container1">
                                                <div className="thirdNo">NO</div>
                                                {this.state.match.showNewSession ? (<div onClick={this.submit10overSessionNo} className="and_thirdNo1">{this.state.match.tenOverSession.no}</div>
                                                ) : (<div onClick={this.submit2overSessionNo} className="and_thirdNo1">{this.state.match.twoOverSession.no}</div>
                                                    )}
                                                {this.state.match.showNewSession ? (
                                                    <div onClick={this.submit20overSessionNo} className="and_thirdNo2">{this.state.match.twentyOverSession.no}</div>

                                                ) : (
                                                        <div onClick={this.submit6overSessionNo} className="and_thirdNo2">{this.state.match.sixOverSession.no}</div>

                                                    )}
                                            </span>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6 and_Yes_pdding_right">
                                            <span className="container1">
                                                <div className="thirdNo">yes</div>
                                                {this.state.match.showNewSession ? (<div onClick={this.submit10overSessionYes} className="and_thirdNo3">{this.state.match.tenOverSession.yes}</div>
                                                ) : (<div onClick={this.submit2overSessionYes} className="and_thirdNo3">{this.state.match.twoOverSession.yes}</div>
                                                    )}
                                                {this.state.match.showNewSession ? (<div onClick={this.submit20overSessionYes} className="and_thirdNo4">{this.state.match.twentyOverSession.yes}</div>
                                                ) : (<div onClick={this.submit6overSessionYes} className="and_thirdNo4">{this.state.match.sixOverSession.yes}</div>
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span className="and_width_640px">
                        <div className="card and_cricket_secondCard2">
                            <div className="row">
                                <div className="col-md-3 col-sm-3 col-xs-3 and_padding_left_finalBet">
                                    <div className="container1">
                                        <div className='and_india_final'><span style={{ color: "#3880f9" }}>{this.state.betName}</span>Final Bet</div>
                                        <span className="container1 and_cricket_2nd_row_1st">

                                            <span className="and_margin_finalBet_11">
                                                {/* <span className="cricket-input-card5">1</span> */}
                                                <span className="and_cricket-input-card111">{this.state.betSelected}</span>

                                                {/* <span className="cricket_L_class">L</span> */}
                                                <span className="and_cricket_L_class111">Bet</span>

                                            </span>

                                        </span>
                                        <span className="container1 and_cricket_2nd_row_1st">

                                            <span className="and_margin_finalBet_22">
                                                {/* <span className="cricket-input-card5">0</span> */}
                                                <input onChange={this.handleBetAmount}  className="and_cricket-input-card000" value={this.state.betAmount}></input>

                                                {/* <span className="cricket_L_class">L</span> */}
                                                <span className="and_cricket_L_class000">Rs</span>

                                            </span>

                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 and_padding_left">
                                    {/* <p class="and_cricket-input-card6">hhhhh</p> */}
                                    <input type="number" className="and_cricket-input-card6" value={this.state.profit}></input>

                                    <div className="row  and_margin_top_row1">

                                        <div className="col-md-2 col-sm-2 col-xs-2">


                                        </div>

                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick1} className="and_calculator">
                                                <span>1</span>
                                            </button>

                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick2} className="and_calculator">
                                                <span>2</span>
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick3} className="and_calculator">
                                                <span>3</span>
                                            </button>
                                        </div>

                                        <div className="col-md-1 col-sm-1 col-xs-1">


                                        </div>

                                    </div>

                                    <div className="row  and_margin_top_row2">
                                        <div className="col-md-2 col-sm-2 col-xs-2">


                                        </div>

                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick4} className="and_calculator">
                                                <span>4</span>
                                            </button>

                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick5} className="and_calculator">
                                                <span>5</span>
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick6} className="and_calculator">
                                                <span>6</span>
                                            </button>
                                        </div>

                                        <div className="col-md-1 col-sm-1 col-xs-1">


                                        </div>
                                    </div>
                                    <div className="row  and_margin_top_row3">
                                        <div className="col-md-2 col-sm-2 col-xs-2">


                                        </div>

                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick7} className="and_calculator">
                                                <span>7</span>
                                            </button>

                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick8} className="and_calculator">
                                                <span>8</span>
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <button onClick={this.handleClick9} className="and_calculator">
                                                <span>9</span>
                                            </button>
                                        </div>

                                        <div className="col-md-1 col-sm-1 col-xs-1">


                                        </div>
                                    </div>
                                    <div className="row  margin_top_row4">
                                        <div className="col-md-12 col-sm-12 col-xs-12 and_zero_center">
                                            <button onClick={this.handleClick0} className="and_calculator">
                                                <span>0</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-3 col-xs-3 and_cancel_padding_left">
                                    <div className="container1">
                                        <span className="card final_bet_timer">
                                            <div className="bet_time_font">BET Time</div>
                                            {this.state.match.forSeconds ? (<Timer startetdAt={this.state.match.betStartingTime} expiredAt={this.state.match.betExpiredAt}/>):(null)}

                                            {/* <Timer startetdAt={this.state.match.betStartingTime} expiredAt={this.state.match.betExpiredAt} /> */}
                                            {/* <div className="bet_timing_font">{this.state.time.s} - SEC</div> */}
                                        </span>
                                        <div className="cricket_margin_top">
                                       
                                        <button class="and_cricket_final_button1" >NOT</button>
                                        {/* ) : (<button onClick={this.submitBet} class="and_cricket_final_button1" >OK</button>)} */}
                                            {/* <div className="and_margon-top_Ok"><button onClick={this.submitBet} class="and_cricket_final_button1">OK</button></div> */}
                                            <div className="and_margon-top_Cancel"><button  onClick={this.handleCancleAll} class="and_cricket_final_button">Cancel</button></div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </span>
                    <div className="and_cric_logo">
                        <img className="and_cric_logo_size" src="../images/and_cric.png"></img>
                    </div>

                </div>

                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />

            </body>
        )
    }
}

export default SuperAdminCricketBetOnMatch;

















































































