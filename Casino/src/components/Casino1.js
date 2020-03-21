import React, { Component } from 'react';
import Music from './Music'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';
import $ from 'jquery';
import Header1 from './Header1'
import Timer from './Timer'
import DeskTimer from './DestopTimer'

require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
const socket = process.env.REACT_APP_API_SOCKET
console.log("=========hello============", `${SERVER}/getUserbyuserName`)
class Casino extends Component {
    socket = {};

    constructor(props) {
        super(props)
        this.state = {

            active: false,
            activeGameId: '',
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
            clicked1: false,
            clicked2: false,
            clicked3: false,
            clicked4: false,
            clicked5: false,
            clicked6: false,
            clicked7: false,
            clicked8: false,
            clicked9: false,
            clicked0: false,
            bgColor0: 'green',
            bgColor1: "green",
            bgColor2: "green",
            bgColor3: "green",
            bgColor4: "green",
            bgColor5: "green",
            bgColor6: "green",
            bgColor7: "green",
            bgColor8: "green",
            bgColor9: "green",
            placebetAmount0: 0,
            placebetAmount1: 0,
            placebetAmount2: 0,
            placebetAmount3: 0,
            placebetAmount4: 0,
            placebetAmount5: 0,
            placebetAmount6: 0,
            placebetAmount7: 0,
            placebetAmount8: 0,
            placebetAmount9: 0,
            currentServerTime: 0,
            gameStartedAt: 0,
            gameExpiredAt: 0,
            walletBalance: 0,
            okButtonValue: null,
            betAmount: null,
            betNumber: null,
            winNumber: null,
            gameStatus: false,
            minimumBetAmount0: null,
            minimumBetAmount1: null,
            minimumBetAmount2: null,
            minimumBetAmount3: null,
            minimumBetAmount4: null,
            minimumBetAmount5: null,
            minimumBetAmount6: null,
            minimumBetAmount7: null,
            minimumBetAmount8: null,
            minimumBetAmount9: null,
            maximumBetAmount0: null,
            maximumBetAmount1: null,
            maximumBetAmount2: null,
            maximumBetAmount3: null,
            maximumBetAmount4: null,
            maximumBetAmount5: null,
            maximumBetAmount6: null,
            maximumBetAmount7: null,
            maximumBetAmount8: null,
            maximumBetAmount9: null,
            gameResult: "WAIT",
            winAmount: 0,
            userName: null,
            masterAdminComission:null,
            masterAdmin:""

        }
        this.socket = io(socket, {
            query: {
                admin: "AdminToken"
            }
        });
        this.socket.on('perballRun', message => {
            console.log("===============serverse aa gaya=======", message)

        });
        this.socket.on('result-casiono', message => {
            console.log("===============serverse aa gaya=======", message.gameResult, this.state.bgColor9)
            if (message) {
                this.setState({ gameResult: message.gameResult, gameStatus: false, active: true })
                if (message.gameResult === "1" && this.state.bgColor1 === "red") {
                    this.setState({ winAmount: this.state.betAmountat1 * 9.5 })
                    return
                }
                if (message.gameResult === "2" && this.state.bgColor2 === "red") {
                    this.setState({ winAmount:  this.state.betAmountat2 * 9.5 })
                    return
                }
                if (message.gameResult === "3" && this.state.bgColor3 === "red") {
                    this.setState({ winAmount:  this.state.betAmountat3 * 9.5 })
                    return
                }
                if (message.gameResult === "4" && this.state.bgColor4 === "red") {
                    this.setState({ winAmount:  this.state.betAmountat4 * 9.5 })
                    return
                }
                if (message.gameResult === "5" && this.state.bgColor5 === "red") {
                    this.setState({ winAmount:  this.state.betAmountat5 * 9.5 })
                    return
                }
                if (message.gameResult === "6" && this.state.bgColor6 === "red") {
                    this.setState({ winAmount: this.state.betAmountat6 * 9.5 })
                    return
                }
                if (message.gameResult === "7" && this.state.bgColor7 === "red") {
                    this.setState({ winAmount: this.state.betAmountat7 * 9.5 })
                    return
                }
                if (message.gameResult === "8" && this.state.bgColor8 === "red") {
                    this.setState({ winAmount:  this.state.betAmountat8 * 9.5 })
                    return
                }
                if (message.gameResult === "9" && this.state.bgColor9 === "red") {
                    this.setState({ winAmount: this.state.betAmountat9 * 9.5 })
                    return
                }
                if (message.gameResult === "0" && this.state.bgColor0 === "red") {
                    this.setState({ winAmount:  this.state.betAmountat0 * 9.5 })
                    return
                }
            }

        });
    }
     async getMasterPercentage (){
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getMasterByUser`, { id: USERID })
        console.log("============yyyyyyyy=getUserbyuserName========llllllllllll= masterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", response.data)

        if (response.data.status) {
            await this.setState({ masterAdminComission: (response.data.masterAdminComission).toFixed(0) })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        } 
     }

    async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getUserbyuserName`, { id: USERID })
        console.log("============yyyyyyyy=678015r24e2732========llllllllllll=", response.data)

        if (response.data.status) {
            await this.setState({ walletBalance: (response.data.user.walletBalance).toFixed(0), masterAdmin:response.data.user.masterAdmin })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        }
        console.log("=========123===========", this.state.walletBalance)
        //    await this.setState({currentServerTime:response.data.time})
    }

    async getTime() {
        var response = await axios.get(`${SERVER}/getCurrenTime`)
        await this.setState({ currentServerTime: response.data.time })
        // })

    }
    async  getGame() {
        console.log("=====yh=====")
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.get(`${SERVER}/getActiveGame`)
        // axios.get(`http://localhost:8080/api/getActiveGame`).then((response) => {
        if (response.data.status) {
            // console.log("======1=======", response.data.game.startedAt, response.data.game.expiredAt)
            this.setState({
                activeGameId: response.data.game._id, gameStartedAt: response.data.game.startedAt, gameExpiredAt: response.data.game.expiredAt, gameStatus: true,
                minimumBetAmount0: response.data.game.zeroNumber[0].minimumAmount,
                minimumBetAmount1: response.data.game.oneNumber[0].minimumAmount,
                minimumBetAmount2: response.data.game.twoNumber[0].minimumAmount,
                minimumBetAmount3: response.data.game.threeNumber[0].minimumAmount,
                minimumBetAmount4: response.data.game.fourNumber[0].minimumAmount,
                minimumBetAmount5: response.data.game.fiveNumber[0].minimumAmount,
                minimumBetAmount6: response.data.game.sixNumber[0].minimumAmount,
                minimumBetAmount7: response.data.game.sevenNumber[0].minimumAmount,
                minimumBetAmount8: response.data.game.eightNumber[0].minimumAmount,
                minimumBetAmount9: response.data.game.nineNumber[0].minimumAmount,
                maximumBetAmount0: response.data.game.zeroNumber[0].maximumAmount,
                maximumBetAmount1: response.data.game.oneNumber[0].maximumAmount,
                maximumBetAmount2: response.data.game.twoNumber[0].maximumAmount,
                maximumBetAmount3: response.data.game.threeNumber[0].maximumAmount,
                maximumBetAmount4: response.data.game.fourNumber[0].maximumAmount,
                maximumBetAmount5: response.data.game.fiveNumber[0].maximumAmount,
                maximumBetAmount6: response.data.game.sixNumber[0].maximumAmount,
                maximumBetAmount7: response.data.game.sevenNumber[0].maximumAmount,
                maximumBetAmount8: response.data.game.eightNumber[0].maximumAmount,
                maximumBetAmount9: response.data.game.nineNumber[0].maximumAmount









            })
            if (response.data.game.participants.includes(USERID)) {
                console.log("======yh hai=================8888888888888888")
                // console.log("=======")
                axios.defaults.headers.common['Authorization'] = token;

                axios.post(`${SERVER}/onGoingGAmeBet`, { gameId: response.data.game._id }).then((response) => {
                    // console.log("=======", response.data.status, response.data.game.nineNumber[0], response.data.game.twoNumber[0], response.data.game.threeNumber[0])
                    if (response.data.status) {
                        console.log("========yh aya=====9999999999888888888====")

                        if (response.data.game.zeroNumber[0].status) {
                            this.setState({ bgColor0: "red", betAmountat0: response.data.game.zeroNumber[0].amount })
                        }
                        if (response.data.game.oneNumber[0].status) {
                            this.setState({ bgColor1: "red", betAmountat1: response.data.game.oneNumber[0].amount })
                        }
                        if (response.data.game.twoNumber[0].status) {
                            console.log("========yh aya=========")
                            this.setState({ bgColor2: "red", betAmountat2: response.data.game.twoNumber[0].amount })
                        }
                        if (response.data.game.threeNumber[0].status) {
                            this.setState({ bgColor3: "red", betAmountat3: response.data.game.threeNumber[0].amount })
                        }
                        if (response.data.game.fourNumber[0].status) {
                            this.setState({ bgColor4: "red", betAmountat4: response.data.game.fourNumber[0].amount })
                        }
                        if (response.data.game.fiveNumber[0].status) {
                            this.setState({ bgColor5: "red", betAmountat5: response.data.game.fiveNumber[0].amount })
                        }
                        if (response.data.game.sixNumber[0].status) {
                            this.setState({ bgColor6: "red", betAmountat6: response.data.game.sixNumber[0].amount })
                        }
                        if (response.data.game.sevenNumber[0].status) {
                            this.setState({ bgColor7: "red", betAmountat7: response.data.game.sevenNumber[0].amount })
                        }

                        if (response.data.game.eightNumber[0].status) {
                            console.log("========yh aya=====9999999999888888888====")

                            this.setState({ bgColor8: "red", betAmountat8: response.data.game.eightNumber[0].amount })
                        }
                        if (response.data.game.nineNumber[0].status) {
                            this.setState({ bgColor9: "red", betAmountat9: response.data.game.nineNumber[0].amount })
                        }
                    }

                }).catch((error) => {
                    console.log("======2222=====", error)
                })

            }
        } else {
            toast("Sorry Wait For Next Game", { containerId: 'B' })

        }


        // }).catch((error) => {
        //     console.log("======1111=====", error)
        // })
    }
    componentDidMount() {
        toast(`Please Use Protrait Mode On Mobile To Play This Game `, { containerId: 'B' })

        var userName = localStorage.getItem('userName')
        this.setState({ userName: userName })
        this.getGame()
        this.getTime()
        this.getUser()
        this.getMasterPercentage()
      
    }
    handleClick9 = () => {
        this.setState({
            clicked9: true,
            okButtonValue: 9,
            betNumber: 9
        })

    }
    handleClick0 = () => {

        this.setState({ clicked0: true, okButtonValue: 0, betNumber: 0 })
    }
    handleClick1 = () => {

        this.setState({ clicked1: true, okButtonValue: 1, betNumber: 1 })
    }
    handleClick2 = () => {

        this.setState({ clicked2: true, okButtonValue: 2, betNumber: 2 })
    }
    handleClick3 = () => {
        this.setState({
            clicked3: true,
            okButtonValue: 3,
            betNumber: 3
        })

    }
    handleClick4 = () => {

        this.setState({ clicked4: true, okButtonValue: 4, betNumber: 4 })
    }
    handleClick5 = () => {

        this.setState({ clicked5: true, okButtonValue: 5, betNumber: 5 })
    }
    handleClick6 = () => {

        this.setState({ clicked6: true, okButtonValue: 6, betNumber: 6 })
    }
    handleClick7 = () => {

        this.setState({ clicked7: true, okButtonValue: 7, betNumber: 7 })
    }
    handleClick8 = () => {

        this.setState({ clicked8: true, okButtonValue: 8, betNumber: 8 })

    }

    handlebet = (event) => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }
  
    handleAmount = async (e, id) => {
        console.log(e, id, "========betAmount")
        await this.setState({ betAmount: e.target.value, betNumber: id })

    }

    handleOkButton = async (e, id) => {
        // console.log(this.state.betAmount, this.state.betNumber)
        await this.getTime()

        if (id == null) {
            return
        }
        if (id == 0) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                console.log("==================123================", this.state.minimumBetAmount0 < this.state.betAmountat0 + parseInt(this.state.betAmount), this.state.maximumBetAmount0 > this.state.betAmountat0 + parseInt(this.state.betAmount))

                if (this.state.minimumBetAmount0 < this.state.betAmountat0 + parseInt(this.state.betAmount) || this.state.maximumBetAmount0 >= this.state.betAmountat0 + parseInt(this.state.betAmount)) {
                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 0, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    // toast("Game Time Is over", { containerId: 'B' })
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })
                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 1) {
            // console.log("==================123================",this.state.minimumBetAmount1<this.state.betAmountat1+parseInt(this.state.betAmount),this.state.maximumBetAmount1>this.state.betAmountat1+parseInt(this.state.betAmount))
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount1 < this.state.betAmountat1 + parseInt(this.state.betAmount) && this.state.maximumBetAmount1 >= this.state.betAmountat1 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 1, amount: parseInt(this.state.betAmount) ,masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount1} and lessthan:${this.state.maximumBetAmount1} `, { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })
                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 2) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount2 < this.state.betAmountat2 + parseInt(this.state.betAmount) && this.state.maximumBetAmount2 >= this.state.betAmountat2 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 2, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked2: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount2} and lessthan:${this.state.maximumBetAmount2} `, { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })
                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 3) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount3 < this.state.betAmountat3 + parseInt(this.state.betAmount) && this.state.maximumBetAmount3 >= this.state.betAmountat3 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 3, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked3: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                        console.log("===========", error)
                    })
                }
                else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    // toast("Game Time Is over", { containerId: 'B' })
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount3} and lessthan:${this.state.maximumBetAmount3} `, { containerId: 'B' })


                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 4) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount4 < this.state.betAmountat4 + parseInt(this.state.betAmount) && this.state.maximumBetAmount4 >= this.state.betAmountat4 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 4, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked4: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    // toast("Game Time Is over", { containerId: 'B' })
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount4} and lessthan:${this.state.maximumBetAmount4} `, { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 5) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount5 < this.state.betAmountat5 + parseInt(this.state.betAmount) && this.state.maximumBetAmount5 >= this.state.betAmountat5 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 5, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked5: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    // toast("Game Time Is over", { containerId: 'B' })
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount5} and lessthan:${this.state.maximumBetAmount5} `, { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 6) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                // console.log("===========yhaya============",this.state.minimumBetAmount6 > this.state.betAmountat6+ parseInt(this.state.betAmount))
                if (this.state.minimumBetAmount6 < this.state.betAmountat6 + parseInt(this.state.betAmount) && this.state.maximumBetAmount6 >= this.state.betAmountat6 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 6, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked6: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    // toast("Game Time Is over", { containerId: 'B' })
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount6} and lessthan:${this.state.maximumBetAmount6} `, { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 7) {
            // console.log("=======yh aya=========8888888888888888=====",this.state.activeGameId, parseInt(this.state.betAmount) )
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount7 < this.state.betAmountat7 + parseInt(this.state.betAmount) && this.state.maximumBetAmount7 >= this.state.betAmountat7 + parseInt(this.state.betAmount)) {
                    console.log("=======yh aya=========8888888888888888=====", this.state.activeGameId, parseInt(this.state.betAmount))

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 7, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked7: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount7} and lessthan:${this.state.maximumBetAmount7} `, { containerId: 'B' })

                    // toast("Game Time Is over", { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 8) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount8 < this.state.betAmountat8 + parseInt(this.state.betAmount) && this.state.maximumBetAmount8 >= this.state.betAmountat8 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 8, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=======888888888888======", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked8: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    // toast("Game Time Is over", { containerId: 'B' })
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount8} and lessthan:${this.state.maximumBetAmount8} `, { containerId: 'B' })


                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                toast("Game Time Is over", { containerId: 'B' })

            }
        }
        if (id == 9) {
            if (this.state.currentServerTime < this.state.gameExpiredAt) {
                if (this.state.minimumBetAmount9 < this.state.betAmountat9 + parseInt(this.state.betAmount) && this.state.maximumBetAmount9 >= this.state.betAmountat9 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 9, amount: parseInt(this.state.betAmount) ,masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                        console.log("===========", error)
                    })
                } else {
                    this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    // toast("Game Time Is over", { containerId: 'B' })

                }
            } else {
                this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })

                toast("Game Time Is over", { containerId: 'B' })

            }
        }

    }
    handleRepeat = async (event) => {
        await this.getTime()
        if (this.state.currentServerTime < this.state.gameExpiredAt) {
            if (this.state.betNumber == 0) {
                if (this.state.minimumBetAmount0 > this.state.betAmountat0 + parseInt(this.state.betAmount) || this.state.maximumBetAmount0 >= this.state.betAmountat0 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount9} and lessthan:${this.state.maximumBetAmount9} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 1) {
                if (this.state.minimumBetAmount1 > this.state.betAmountat1 + parseInt(this.state.betAmount) || this.state.maximumBetAmount1 >= this.state.betAmountat1 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 2) {
                console.log("==========678976556===========", this.state.minimumBetAmount2 > this.state.betAmountat2 + parseInt(this.state.betAmount),
                    this.state.maximumBetAmount2 >= this.state.betAmountat2 + parseInt(this.state.betAmount))
                if (this.state.minimumBetAmount2 > this.state.betAmountat2 + parseInt(this.state.betAmount) || this.state.maximumBetAmount2 >= this.state.betAmountat2 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount) ,masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 3) {
                console.log("=====yhaya===========")
                if (this.state.minimumBetAmount3 > this.state.betAmountat3 + parseInt(this.state.betAmount) || this.state.maximumBetAmount3 >= this.state.betAmountat3 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount3} and lessthan:${this.state.maximumBetAmount3} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 4) {
                if (this.state.minimumBetAmount4 > this.state.betAmountat4 + parseInt(this.state.betAmount) || this.state.maximumBetAmount4 >= this.state.betAmountat4 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 5) {
                if (this.state.minimumBetAmount5 > this.state.betAmountat5 + parseInt(this.state.betAmount) || this.state.maximumBetAmount5 >= this.state.betAmountat5 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })


                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 6) {
                if (this.state.minimumBetAmount6 > this.state.betAmountat6 + parseInt(this.state.betAmount) || this.state.maximumBetAmount6 >= this.state.betAmountat6 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount) ,masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 7) {
                if (this.state.minimumBetAmount7 > this.state.betAmountat7 + parseInt(this.state.betAmount) || this.state.maximumBetAmount7 >= this.state.betAmountat7 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount),masterAdminComission:parseFloat(this.state.masterAdminComission) ,masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 8) {
                if (this.state.minimumBetAmount8 > this.state.betAmountat8 + parseInt(this.state.betAmount) || this.state.maximumBetAmount8 >= this.state.betAmountat8 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount) ,masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
            if (this.state.betNumber == 9) {
                if (this.state.minimumBetAmount9 > this.state.betAmountat9 + parseInt(this.state.betAmount) || this.state.maximumBetAmount9 >= this.state.betAmountat9 + parseInt(this.state.betAmount)) {

                    const token = localStorage.getItem('usertoken')
                    axios.defaults.headers.common['Authorization'] = token;
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount) ,masterAdminComission:parseFloat(this.state.masterAdminComission),masterAdmin:this.state.masterAdmin}).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })


                    }).catch((error) => {
                        console.log("===========", error)
                        // toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                    })
                } else {
                    toast(`Please Enter Amount greaterthan:${this.state.minimumBetAmount0} and lessthan:${this.state.maximumBetAmount0} `, { containerId: 'B' })

                }
            }
        } else {
            toast("Game Time Is over", { containerId: 'B' })

        }

        console.log("========================", this.state.betNumber, this.state.betAmount)
    }
    handleCancel = (e) => {
        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false })
    }
    handleLogout = (event) => {
        event.preventDefault()
        localStorage.clear()
        window.location = '/'

    }
    render() {

        return (


            <body className="BackGround_Image">




                <Header1 />

               
                <div>
                    <div div className="container3">
                        <div class="row">

                            <div class="side">
                                <Timer  gameStatus={this.state.gameStatus}/>
                                {/* <div style={{ display: "flex", justifyContent: "center" }}>
                                    <span className="card1 card_timing" id="content-mobile">Next Game Start : 2:45</span>
                                </div> */}

                                <div className="first_line">
                                    <div class="container1" id="content-desktop">
                                        <img className="margin_left_1stImage" src="../images/drww_number.png" alt="Snow" />
                                        <span className="centered10">Draw</span>
                                        <span className="centered12">Number</span>
                                        <div className="centered11">1234907</div>
                                        {/* <img className="Score_Image2" src="../images/drww_number.png" alt="Snow" />
                                        <div class="centered5">Balance Amount: 498</div> */}

                                    </div>
                                    <DeskTimer gameStatus={this.state.gameStatus}/>
                                    {/* <span className="card1 card_timing" id="content-desktop">Next Game Start : 2:45</span> */}

                                    {/* <div className="second_image" id="content-mobile" style={{ display: "flex" }}> */}
                                    <div class="container1" id="content-mobile">
                                        <img className="Score_Image3" src="../images/Third_Row2.png" alt="Snow" />
                                        {/* <button class="button centered"></button> */}
                                        <div className="centered7">10</div>
                                        {/* <button class="button4 centered4"></button> */}
                                        <div className="centered8">9.5</div>
                                        <div className="centered9">95</div>
                                    </div>
                                    {/* <div className="container1" id="content-mobile">
                                        <img className="width_105px" src="../images/live.gif">
                                        </img>
                                    {this.state.gameStatus ? (<p className="centered15">Live</p>) : (<p className="centered15">{this.state.gameResult}</p>)}
                                    </div> */}
                                    <div className="second_image" id="content-mobile">
                                        {/* <img className="width_219px" src="../images/Third_Row3.png"></img> */}
                                        <div class="container1">
                                            <img className="Score_Image" src="../images/total_amountOnBet.png" alt="Snow" />
                                            <div class="centered6">{this.state.walletBalance}</div>

                                        </div>

                                    </div>

                                    {/* <img className="width_363px" src="../images/dollar11.gif"></img> */}

                                    <div class="container1" id="content-mobile">
                                        <img className="Score_Image1" src="../images/You_Win1.png" alt="Snow" />
                                        <div class="centered">{this.state.winAmount}</div>
                                        {/* <div class="">929292</div> */}

                                    </div>

                                  
                                </div>
                
                               

                                <div className="second_image" id="content-mobile">
                                    {/* <img className="width_219px" src="../images/Asset.png"></img> */}

                                    <div class="container1">
                                        <img className="Score_Image4" src="../images/Asset.png" alt="Snow" />
                                        <div class="centered52">Wallet:</div>
                                        <div class="centered51">{this.state.walletBalance}</div>

                                    </div>

                                </div>
                                <div id="content-mobile" className="margin_bottom_GIF">
                                    <img className="GIF_margin_top " src="../images/mac_copy22.gif"></img>
                                    {this.state.active ? (<div className="centered14">{this.state.gameResult}</div>) : (
                                        <img className="centered13" src="../images/dollar11.gif"></img>
                                    )}
                                    {/* <img className="centered13" src="../images/dollar11.gif"></img>
                                    <div className="centered14">1</div> */}
                                    {/* <img className="centered14" src="../images/dollar_near_number1.png"></img> */}
                                </div>
                                <div id="content-desktop">
                                    <img className="GIF_margin_top " src="../images/mac_copy22.gif"></img>
                                    {/* {this.state.gameStatus? (<img className="centered13" src="../images/dollar11.gif"></img>):(<p className="centered15">{this.state.gameResult}</p>)} */}
                                    {this.state.active ? (<h4 className="centered14">{this.state.gameResult}</h4>) : (
                                        <img className="centered13" src="../images/dollar11.gif"></img>
                                    )}

                                    {/* <img className="centered13" src="../images/dollar11.gif"></img>
                                    <h4 className="centered14">1</h4> */}

                                    {/* <img className="centered14" src="../images/dollar_near_number1.png"></img> */}
                                </div>


                                <div className="Repeat_Bet_Margin_Top" id="content-mobile">
                                    {/* <button className="Button_2_image second_image"><img className="Repeat_Bet" src="../images/Repeat_Bet.png"></img></button> */}
                                    {/* <button><img src="../images/Repeat_Bet.png"></img></button> */}
                                    <button onClick={this.handleRepeat} className="Button_2_image"><img className="Repeat_Bet_Button" src="../images/repeatNew.png"></img></button>

                                </div>



                                <div className="ok_cancel">
                                    <button class="button6" onClick={(e) => { this.handleOkButton(e, this.state.okButtonValue) }}><img className="ok_cancel_width1" src="../images/OK.png"></img></button>
                                    <button class="button6" onClick={this.handleCancel}><img className="ok_cancel_width2" src="../images/cancelNew.png"></img></button>
                                </div>






                                <div className="margin-left11" id="content-desktop">
                                    <div className="Price_Chart_main">

                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked1 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat1}</div>)}

                                            {/* <div class="centered5">{this.state.betAmountat1}</div> */}

                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {/* <div class="centered5">{this.state.betAmountat2}</div> */}
                                            {this.state.clicked2 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat2}</div>)}


                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {/* <div class="centered5">{this.state.betAmountat3}</div> */}
                                            {this.state.clicked3 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat3}</div>)}


                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked4 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat4}</div>)}

                                            {/* <div class="centered5">{this.state.betAmountat4}</div> */}

                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked5 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat5}</div>)}

                                            {/* <div class="centered5">{this.state.betAmountat5}</div> */}

                                        </div>

                                    </div>
                                    <div className="Price_Chart_main">
                                        <button className="Button_1_image" onClick={this.handleClick1}><img className="Number_Button" src="../images/number11111.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick2}><img className="Number_Button" src="../images/number22222.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick3}><img className="Number_Button" src="../images/number33333.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick4}><img className="Number_Button" src="../images/number44444.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick5}><img className="Number_Button" src="../images/number55555.png"></img></button>
                                    </div>





                                    <div className="Price_Chart_main margin_top_price">
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked6 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat6}</div>)}

                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {/* <div class="centered5">{this.state.betAmountat7}</div> */}
                                            {this.state.clicked7 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat7}</div>)}


                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {/* <div class="centered5">{this.state.betAmountat8}</div> */}
                                            {this.state.clicked8 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat8}</div>)}


                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {/* <div class="centered5">{this.state.betAmountat9}</div> */}
                                            {this.state.clicked9 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat9}</div>)}


                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {/* <div class="centered5">{this.state.betAmountat0}</div> */}
                                            {this.state.clicked0 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat0}</div>)}


                                        </div>
                                    </div>



                                    <div className="Price_Chart_main ">
                                        <button className="Button_1_image" onClick={this.handleClick6}><img className="Number_Button" src="../images/number66666.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick7}><img className="Number_Button" src="../images/number77777.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick8}><img className="Number_Button" src="../images/number88888.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick9}><img className="Number_Button" src="../images/number99999.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick0}><img className="Number_Button" src="../images/number00000.png"></img></button>

                                    </div>




                                </div>
                                <div className="margin-left111 mobile_width" id="content-mobile">

                                    <div className="Price_Chart_main">
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked1 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat1}</div>)}
                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked2 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat2}</div>)}
                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked3 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat3}</div>)}
                                        </div>
                                    </div>


                                    <div className="Price_Chart_main">
                                        <button className="Button_1_image" onClick={this.handleClick1}><img className="Number_Button" src="../images/number11111.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick2}><img className="Number_Button" src="../images/number22222.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick3}><img className="Number_Button" src="../images/number33333.png"></img></button>
                                    </div>







                                    <div className="Price_Chart_main margin_top_mobile">
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked4 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat4}</div>)}
                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked5 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat5}</div>)}
                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked6 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat6}</div>)}
                                        </div>
                                    </div>
                                    <div className="Price_Chart_main">
                                        <button className="Button_1_image" onClick={this.handleClick4}><img className="Number_Button" src="../images/number44444.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick5}><img className="Number_Button" src="../images/number55555.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick6}><img className="Number_Button" src="../images/number66666.png"></img></button>
                                    </div>




                                    <div className="Price_Chart_main margin_top_mobile">
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked7 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat7}</div>)}
                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked8 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat8}</div>)}
                                        </div>
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked9 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat9}</div>)}

                                        </div>
                                    </div>
                                    <div className="Price_Chart_main">
                                        <button className="Button_1_image" onClick={this.handleClick7}><img className="Number_Button" src="../images/number77777.png"></img></button>
                                        <button className="Button_1_image" onClick={this.handleClick8}><img className="Number_Button" src="../images/number88888.png"></img></button>
                                        {/* <button className="Button_1_image" onClick={this.handleClick9}><img className="Number_Button" src="../images/number99999.svg"></img></button> */}
                                        <button className="Button_1_image" onClick={this.handleClick9}><img className="Number_Button" src="../images/number99999.png"></img></button>


                                    </div>


                                    <div className="Price_Chart_main margin_top_mobile">
                                        <div class="container1">
                                            <img className="Score_Image2" src="../images/price_space.png" alt="Snow" />
                                            {this.state.clicked0 ? (<div class="centered5"><input type="number" className="input-card1" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} /></div>) : (<div class="centered5">{this.state.betAmountat0}</div>)}

                                            {/* <div class="centered5">{this.state.betAmountat0}</div> */}
                                        </div>
                                    </div>
                                    <div className="Price_Chart_main ">
                                        <button className="Button_1_image" onClick={this.handleClick0}><img className="Number_Button" src="../images/number00000.png"></img></button>
                                    </div>
                                    <div className="container1" id="content-mobile">
                                        <img className="width_105px" src="../images/live.gif">
                                        </img>
                                        {this.state.gameStatus ? (<p className="centered15">Live</p>) : (<p className="centered15">{this.state.gameResult}</p>)}
                                    </div>
                                </div>

                            </div>




                            <div class="main1" id="content-desktop">
                                {/* <div className="second_image">
                                <img className="Score_Image" src="../images/You_Win1.png"></img>
                            </div> */}
                                <div class="container1" id="content-desktop">
                                    <img className="Score_Image1" src="../images/You_Win1.png" alt="Snow" />
                                    <div class="centered">Your score:</div>
                                    <div class="centered1">{this.state.winAmount}</div>
                                    <button class="button3 centered3"></button>
                                    <button class="button4 centered4"></button>
                                </div>
                                {/* <div>
                                    <button class="button2"><img className="ok_cancel_width2" src="../images/cancel_button.png"></img></button>

                                </div> */}
                                <div className="Repeat_Bet_Margin_Top" id="content-desktop">
                                    {/* <button className="Button_2_image second_image"><img className="Repeat_Bet" src="../images/Repeat_Bet.png"></img></button> */}
                                    {/* <button><img src="../images/Repeat_Bet.png"></img></button> */}
                                    <button onClick={this.handleRepeat} className="Button_2_image"><img className="Repeat_Bet_Button" src="../images/repeatNew.png"></img></button>

                                </div>



                            </div>
                            <div class="main1" id="content-desktop">
                                <div className="second_image" id="content-desktop">
                                    {/* <img className="width_219px" src="../images/Asset.png"></img> */}
                                    <div class="container1">
                                        <img className="Score_Image4" src="../images/Asset.png" alt="Snow" />
                                        <div class="centered52">Balance Amount:</div>
                                        <div class="centered51">{this.state.walletBalance}</div>

                                    </div>

                                </div>
                                <br id="content-desktop"></br>
                                <br id="content-desktop"></br>
                                <div className="second_image" id="content-desktop">
                                    {/* <img className="width_219px" src="../images/Third_Row2.png"></img> */}
                                    <div class="container1">
                                        <img className="Score_Image3" src="../images/Third_Row2.png" alt="Snow" />
                                        {/* <button class="button centered"></button> */}
                                        <div className="centered7">10</div>
                                        {/* <button class="button4 centered4"></button> */}
                                        <div className="centered8">9.5</div>
                                        <div className="centered9">95</div>
                                    </div>

                                </div>
                                <br id="content-desktop"></br>
                                <br id="content-desktop"></br>
                                <div className="second_image" id="content-desktop">
                                    {/* <img className="width_219px" src="../images/Third_Row3.png"></img> */}
                                    <div class="container1">
                                        <img className="Score_Image" src="../images/Third_Row3.png" alt="Snow" />
                                        <div class="centered6">{this.state.walletBalance}</div>

                                    </div>

                                </div>
                                <br id="content-desktop"></br>
                                <br id="content-desktop"></br>
                                <div className="second_image" id="content-desktop">

                                    <div className="container1">
                                        <img className="width_363px" src="../images/live.gif">
                                            {/* <p>Live</p> */}
                                        </img>
                                        {this.state.gameStatus ? (<div className="centered15">Live</div>) : (<p className="centered15">{this.state.gameResult}</p>)}

                                        {/* {this.state.gameStatus ? (<p className="centered14">Live</p>) : (<p className="centered15">{this.state.gameResult}</p>)} */}

                                        {/* <p className="centeredmy15">Live</p> */}
                                    </div>
                                    {/* <img className="width_363px" src="../images/dollar11.gif"></img> */}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* <Timer gameStatus={this.state.gameStatus}/> */}
                {/* {this.state.gameStatus ? (<Music />) : (null)} */}


                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />

            </body>
        )
    }
}
export default Casino;
























