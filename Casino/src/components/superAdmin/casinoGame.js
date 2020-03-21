import React, { Component } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import SubHeader from './subHeader'
import Footer from './footer'

import axios from 'axios';
import Header from './Header'
import Sidebar from './sidebar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
const SOCKET = process.env.REACT_APP_API_SOCKET

console.log("=====================", SERVER)

class SuperAdminCasino extends Component {
    socket = {};

    constructor(props) {
        super(props)
        this.state = {
            gameId: '',
            userName: '',
            password: '',
            users: [],
            lowerValue: '',
            upperValue: '',
            currentBallRun: '',
            upperValuetwentyOver: '',
            lowerValuetwentyOver: '',
            betAmountat0: 0,
            betAmountat1: 0,
            betAmountat2: 0,
            betAmountat3: 0,
            betAmountat4: 0,
            betAmountat5: 0,
            betAmountat6: 0,
            betAmountat7: 0,
            betAmountat8: 0,
            betAmountat9: 0,
            activeGame: false,
            gameResult: 0,
            transaction: [],
            completedBet: [],
            zeroMinimumAmount: 0,
            oneMinimumAmount: 0,
            twoMinimumAmount: 0,
            threeMinimumAmount: 0,
            fourMinimumAmount: 0,
            fiveMinimumAmount: 0,
            sixMinimumAmount: 0,
            sevenMinimumAmount: 0,
            eightMinimumAmount: 0,
            nineMinimumAmount: 0,
            zeroMaximumAmount: 0,
            oneMaximumAmount: 0,
            twoMaximumAmount: 0,
            threeMaximumAmount: 0,
            fourMaximumAmount: 0,
            fiveMaximumAmount: 0,
            sixMaximumAmount: 0,
            sevenMaximumAmount: 0,
            eightMaximumAmount: 0,
            nineMaximumAmount: 0,


        }

        this.socket = io(SOCKET, {
            query: {
                admin: "AdminToken"
            }
        });
        this.socket.on('server:message', message => {
            console.log("===============serverse aa gaya=======", message)

        });
        this.socket.on('server:currentRun', message => {
            console.log("===============serverse aa gaya=======", message)

        });
        this.socket.on('perballRun', message => {
            console.log("===============serverse aa gaya=======", message)

        });

    }

    async getTransaction() {
        var transaction = await axios.get(`${SERVER}/onGoingGameParticipants`)
        console.log("============123==============", transaction)
        await this.setState({ transaction: transaction.data.transaction })
    }


    async getcompletedTransaction() {
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        var completedtransaction = await axios.get(`${SERVER}/getCompletedCasinoGame`)
        console.log("============123=========89799999999887=====", completedtransaction)
        await this.setState({ completedBet: completedtransaction.data.data })

        // await this.setState({transaction:transaction.data.transaction})
    }



    componentWillMount() {
        this.getcompletedTransaction()
        this.getTransaction()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.get(`${SERVER}/getActiveGame`).then((response) => {
            console.log("===============123========", response.data.game._id)
            this.setState({
                gameId: response.data.game._id, activeGame: true, betAmountat0: response.data.game.zeroNumber[0].betAmount, betAmountat1: response.data.game.oneNumber[0].betAmount, betAmountat2: response.data.game.twoNumber[0].betAmount
                , betAmountat3: response.data.game.threeNumber[0].betAmount, betAmountat4: response.data.game.fourNumber[0].betAmount, betAmountat5: response.data.game.fiveNumber[0].betAmount,
                betAmountat6: response.data.game.sixNumber[0].betAmount, betAmountat7: response.data.game.sevenNumber[0].betAmount, betAmountat8: response.data.game.eightNumber[0].betAmount, betAmountat9: response.data.game.nineNumber[0].betAmount
            })
        }).catch((error) => {
            console.log("==123========", error)
        })
    }



    handleChangeAmount = (event) => {
        event.preventDefault()
        // this.socket.emit('client:message', event.target.value );
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }




    handleNumber = async (event) => {
        // event.preventDefault()
        await this.setState({ gameResult: event.target.value })

    }
    startGame = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/startGame`, {
            zeroMinimumAmount: this.state.zeroMinimumAmount,
            oneMinimumAmount: this.state.oneMinimumAmount,
            twoMinimumAmount: this.state.twoMinimumAmount,
            threeMinimumAmount: this.state.threeMinimumAmount,
            fourMinimumAmount: this.state.fourMinimumAmount,
            fiveMinimumAmount: this.state.fiveMinimumAmount,
            sixMinimumAmount: this.state.sixMinimumAmount,
            sevenMinimumAmount: this.state.sevenMinimumAmount,
            eightMinimumAmount: this.state.eightMinimumAmount,
            nineMinimumAmount: this.state.nineMinimumAmount,
            zeroMaximumAmount: this.state.zeroMaximumAmount,
            oneMaximumAmount: this.state.oneMaximumAmount,
            twoMaximumAmount: this.state.twoMaximumAmount,
            threeMaximumAmount: this.state.threeMaximumAmount,
            fourMaximumAmount: this.state.fourMaximumAmount,
            fiveMaximumAmount: this.state.fiveMaximumAmount,
            sixMaximumAmount: this.state.sixMaximumAmount,
            sevenMaximumAmount: this.state.sevenMaximumAmount,
            eightMaximumAmount: this.state.eightMaximumAmount,
            nineMaximumAmount: this.state.nineMaximumAmount,


        }).then((response) => {
            console.log("=========123==============", response)
            toast(response.data.message, { containerId: 'B' })
            if (response.data.status) {
                setTimeout(function () {
                    window.location.reload()
                }, 1000);
            }
            // setTimeout(function(){ 
            // window.location.reload
            //  }, 1000);

        })
        // setTimeout(function(){ 
        //     window.location.reload
        //  }, 1000);


    }

    stopGame = (event) => {
        event.preventDefault()
        event.preventDefault()
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/stopGame`, { id: this.state.gameId, gameResult: this.state.gameResult }).then((response) => {
            console.log("=========123==============", response)
            toast(response.data.message, { containerId: 'B' })
            // window.location.reload()

        })
        toast("Game STopped", { containerId: 'B' })

        setTimeout(function () {
            window.location.reload()
        }, 1500);

    }
    HandleComletd = (evenent, id) => {
        console.log("==============", id)
        window.location = `/superAdmin/casinohistory/${id}`

    }



    render() {

        return (

            <body className="" >
                <Header />
                <SubHeader />

                <Sidebar />
                <div class="row">
                    <div className="column1">
                    <div style={{ "overflow-x": "auto", "color": "#5fb9f5" }} >
                        {this.state.activeGame ? (<form>
                            <h1 style={{"overflow-x":"auto","color":"wheat",    marginLeft: "35%",fontSize:"22px"}}>Stop Game</h1>
                            <input type="number" placeholder="Please Enter Result" class="form-control Right_border" name="" onChange={this.handleNumber} />

                            <button class="btn float-right login_btn1" onClick={this.stopGame}>Stop</button>
                        </form>) : (
                                <div >
                                    <h1 style={{"overflow-x":"auto","color":"wheat",    marginLeft: "35%",fontSize:"22px"}}>Start Game</h1>

                                    <table style={{ "width": "99%" }}>
                                        <thead style={{backgroundColor:"white"}}>
                                        <tr>
                                            <th>min amount</th>
                                            <th>max amount</th>
                                            <th>min amount</th>
                                            <th>max amount</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                            <td>0.<input type="number" placeholder="zeroMinimumAmount" name="zeroMinimumAmount" onChange={this.handleChangeAmount}  value={10}/></td>
                                            <td>0. <input type="number" name="zeroMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                            <td>1.<input type="number" name="oneMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>1. <input type="number" name="oneMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                        </tr>

                                        <tr>
                                            <td>2.<input type="number" name="twoMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>2. <input type="number" name="twoMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                            <td>3.<input type="number" name="threeMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>3. <input type="number" name="threeMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                        </tr>

                                        <tr>
                                            <td>4.<input type="number" name="fourMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>4. <input type="number" name="fourMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                            <td>5.<input type="number" name="fiveMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>5. <input type="number" name="fiveMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                        </tr>




                                        <tr>
                                            <td>6.<input type="number" name="sixMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>6. <input type="number" name="sixMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                            <td>7.<input type="number" name="sevenMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>7. <input type="number" name="sevenMaximumAmount" onChange={this.handleChangeAmount}  value={10000} /></td>
                                        </tr>

                                        <tr>
                                            <td>8.<input type="number" name="eigthMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>8. <input type="number" name="eightMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                            <td>9.<input type="number" name="nineMinimumAmount" onChange={this.handleChangeAmount} value={10}/></td>
                                            <td>9. <input type="number" name="nineMaximumAmount" onChange={this.handleChangeAmount}  value={10000}/></td>
                                        </tr>

                                    </table>

                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <button class="btn float-right login_btn1" onClick={this.startGame}>Start</button>
                                    </div>

                                </div>

                            )}

                    </div>

                    <div className="row" style={{ "overflow-x": "auto", "color": "white", "marginTop": "0px" }} >
                        <div className="column1">
                        <h3 style={{ "color": "white" }}>On Going Bet</h3>

                        <table>
                            <thead style={{backgroundColor:"white"}}>
                                <tr>
                                    <th> 0</th>
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
                                <td> &#x20b9;{this.state.betAmountat0}</td>
                                <td> &#x20b9;{this.state.betAmountat1}</td>
                                <td> &#x20b9;{this.state.betAmountat2}</td>
                                <td>&#x20b9;{this.state.betAmountat3}</td>
                                <td> &#x20b9;{this.state.betAmountat4}</td>
                                <td> &#x20b9;{this.state.betAmountat5}</td>
                                <td> &#x20b9;{this.state.betAmountat6}</td>
                                <td> &#x20b9;{this.state.betAmountat7}</td>
                                <td> &#x20b9;{this.state.betAmountat8}</td>
                                <td> &#x20b9;{this.state.betAmountat9}</td>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>



                </div>

                <Footer />

            </body>


        )
    }
}

export default SuperAdminCasino;