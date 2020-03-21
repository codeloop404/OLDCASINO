import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
// import Footer from './footer'
// import SubHeader from './subHeader'

import { Link } from 'react-router-dom'
import Music from '../Music'
// import MusicMobile from './MusicMobile'
import Header1 from '../Header1'
require('dotenv').config()
const SERVER = process.env.REACT_APP_API_URL
const SOCKET = process.env.REACT_APP_API_SOCKET
const style = { button: { background: 'red' } }

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            load: true,
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
            bgColor0: 'linear-gradient(#170983, #7c0ba1)',
            bgColor1: "linear-gradient(#170983, #7c0ba1)",
            bgColor2: "linear-gradient(#170983, #7c0ba1)",
            bgColor3: "linear-gradient(#170983, #7c0ba1)",
            bgColor4: "linear-gradient(#170983, #7c0ba1)",
            bgColor5: "linear-gradient(#170983, #7c0ba1)",
            bgColor6: "linear-gradient(#170983, #7c0ba1)",
            bgColor7: "linear-gradient(#170983, #7c0ba1)",
            bgColor8: "linear-gradient(#170983, #7c0ba1)",
            bgColor9: "linear-gradient(#170983, #7c0ba1)",
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
            betAmount: 0,
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
            masterAdminComission: null,
            masterAdmin: "",
            disabled: true,
            last10data: []
        }
        this.socket = io(SOCKET, {
            query: {
                admin: "AdminToken"
            }
        });
        this.socket.on('perballRun', message => {
            console.log("===============serverse aa gaya=======", message)

        });
        this.socket.on('casinogamestarted', saved => {
            window.location.reload()
        })

        this.socket.on('result-casiono', message => {
            if (message) {
                this.setState({ gameResult: message.gameResult, gameStatus: false, active: true })
                console.log("===============serverse aa gaya===bahar====", message.gameResult, this.state.bgColor1)

                if (message.gameResult === "1" && this.state.bgColor1 === "linear-gradient(#170983, #7c0ba1)") {
                    console.log("===============serverse aa gaya===andar====", message.gameResult, this.state.bgColor1)

                    this.setState({ winAmount: this.state.betAmountat1 * 9.5, bgColor1: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "2" && this.state.bgColor2 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat2 * 9.5, bgColor2: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "3" && this.state.bgColor3 === "linear-gradient(#170983, #7c0ba1)") {
                    console.log("===============yh ayayyayayayyayayayayyayayay======")
                    this.setState({ winAmount: this.state.betAmountat3 * 9.5, bgColor3: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "4" && this.state.bgColor4 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat4 * 9.5, bgColor4: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "5" && this.state.bgColor5 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat5 * 9.5, bgColor5: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "6" && this.state.bgColor6 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat6 * 9.5, bgColor6: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "7" && this.state.bgColor7 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat7 * 9.5, bgColor7: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "8" && this.state.bgColor8 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat8 * 9.5, bgColor8: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "9" && this.state.bgColor9 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat9 * 9.5, bgColor9: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
                if (message.gameResult === "0" && this.state.bgColor0 === "linear-gradient(#170983, #7c0ba1)") {
                    this.setState({ winAmount: this.state.betAmountat0 * 9.5, bgColor0: "linear-gradient(#addb3f, #57ba2f)" })
                    return
                }
            }

        });
    }
    async getMasterPercentage() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getMasterByUser`, { id: USERID })
        console.log("============yyyyyyyy=getUserbyuserName========llllllllllll= masterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", response.data)

        if (response.data.status) {
            await this.setState({ masterAdminComission: response.data.data })
        } else {
            // console.log("=========123===========",this.state.walletBalance)
        }
    }

    async getlast10data() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var last10data = await axios.get(`${SERVER}/getlast10Games`)
        console.log("=========99999======678015r24e2732=======9999=678015r24e2732=====66666====9976==678015r24e2732====", last10data)
        if (last10data.data.status) {
            await this.setState({ last10data: last10data.data.data, load: false })
        }
    }

    async getUser() {
        const USERID = localStorage.getItem('USERID')
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
        var response = await axios.post(`${SERVER}/getUserbyuserName`, { id: USERID })
        console.log("============yyyyyyyy=678015r24e2732========llllllllllll=", response.data)

        if (response.data.status) {
            await this.setState({ walletBalance: (response.data.user.walletBalance).toFixed(0), masterAdmin: response.data.user.masterAdmin })
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
                maximumBetAmount9: response.data.game.nineNumber[0].maximumAmount,
                gameResult: "LIVE"










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
                            this.setState({ betAmountat0: response.data.game.zeroNumber[0].amount })
                        }
                        if (response.data.game.oneNumber[0].status) {
                            this.setState({ betAmountat1: response.data.game.oneNumber[0].amount })
                        }
                        if (response.data.game.twoNumber[0].status) {
                            console.log("========yh aya=========")
                            this.setState({ betAmountat2: response.data.game.twoNumber[0].amount })
                        }
                        if (response.data.game.threeNumber[0].status) {
                            this.setState({ betAmountat3: response.data.game.threeNumber[0].amount })
                        }
                        if (response.data.game.fourNumber[0].status) {
                            this.setState({ betAmountat4: response.data.game.fourNumber[0].amount })
                        }
                        if (response.data.game.fiveNumber[0].status) {
                            this.setState({ betAmountat5: response.data.game.fiveNumber[0].amount })
                        }
                        if (response.data.game.sixNumber[0].status) {
                            this.setState({ betAmountat6: response.data.game.sixNumber[0].amount })
                        }
                        if (response.data.game.sevenNumber[0].status) {
                            this.setState({ betAmountat7: response.data.game.sevenNumber[0].amount })
                        }

                        if (response.data.game.eightNumber[0].status) {
                            console.log("========yh aya=====9999999999888888888====")

                            this.setState({ betAmountat8: response.data.game.eightNumber[0].amount })
                        }
                        if (response.data.game.nineNumber[0].status) {
                            this.setState({ betAmountat9: response.data.game.nineNumber[0].amount })
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
        toast("Please Use Protrait Mode For Mobile", { containerId: 'B' })

        var userName = localStorage.getItem('userName')
        this.setState({ userName: userName })
        this.getGame()
        this.getTime()
        this.getUser()
        this.getMasterPercentage()
        this.getlast10data()
        // $(document).ready(function () {
        //     $('.show-hide').click(function () {
        //         $(this).next().toggle();
        //     });
        // });
        // $("#show").css("display", "none");
    }
    handleClick9 = () => {
        this.setState({
            clicked9: true,
            okButtonValue: 9,
            betNumber: 9,
            disabled: false
        })

    }
    handleClick0 = () => {

        this.setState({
            clicked0: true, okButtonValue: 0, betNumber: 0,
            disabled: false
        })
    }
    handleClick1 = () => {

        this.setState({
            clicked1: true, okButtonValue: 1, betNumber: 1,
            disabled: false
        })
    }
    handleClick2 = () => {

        this.setState({
            clicked2: true, okButtonValue: 2, betNumber: 2,
            disabled: false
        })
    }
    handleClick3 = () => {
        this.setState({
            clicked3: true,
            okButtonValue: 3,
            betNumber: 3
            ,
            disabled: false
        })

    }
    handleClick4 = () => {

        this.setState({
            clicked4: true, okButtonValue: 4, betNumber: 4,
            disabled: false
        })
    }
    handleClick5 = () => {

        this.setState({
            clicked5: true, okButtonValue: 5, betNumber: 5,
            disabled: false
        })
    }
    handleClick6 = () => {

        this.setState({
            clicked6: true, okButtonValue: 6, betNumber: 6,
            disabled: false
        })
    }
    handleClick7 = () => {

        this.setState({
            clicked7: true, okButtonValue: 7, betNumber: 7,
            disabled: false
        })
    }
    handleClick8 = () => {

        this.setState({
            clicked8: true, okButtonValue: 8, betNumber: 8,
            disabled: false
        })

    }

    handlebet = (event) => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }
    handleCoin5 = (event) => {
        this.setState({ betAmount: parseInt(this.state.betAmount) + 5 })
    }
    handleCoin10 = (event) => {
        this.setState({ betAmount: parseInt(this.state.betAmount) + 10 })
    }
    handleCoin50 = (event) => {
        this.setState({ betAmount: parseInt(this.state.betAmount) + 50 })
    }
    handleCoin100 = (event) => {
        this.setState({ betAmount: parseInt(this.state.betAmount) + 100 })
    }
    handleCoin500 = (event) => {
        this.setState({ betAmount: parseInt(this.state.betAmount) + 500 })
    }
    handleCoin1000 = (event) => {
        this.setState({ betAmount: parseInt(this.state.betAmount) + 1000 })
    }

    handleAmount = async (e, id) => {
        await this.setState({ betAmount: e.target.value, betNumber: id })
    }

    handleOkButton = async (e, id) => {
        console.log(this.state.betAmount, this.state.betNumber, id)
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 0, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 1, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 2, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 3, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 4, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 5, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 6, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 7, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 8, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: 9, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
                    axios.post(`${SERVER}/jointheGameCasino`, { id: this.state.activeGameId, number: this.state.betNumber, amount: parseInt(this.state.betAmount), masterAdminComission: parseFloat(this.state.masterAdminComission), masterAdmin: this.state.masterAdmin }).then((response) => {
                        console.log("=============", response)
                        toast(response.data.message, { containerId: 'B' })
                        this.setState({ clicked9: false })
                        this.getGame()
                        this.getUser()
                        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })


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
        this.setState({ clicked0: false, clicked1: false, clicked2: false, clicked3: false, clicked4: false, clicked5: false, clicked6: false, clicked7: false, clicked8: false, clicked9: false, betAmount: 0, disabled: true })
    }
    handleLogout = (event) => {
        event.preventDefault()
        localStorage.clear()
        window.location = '/'

    }

    render() {
        console.log("================this.state.bgco",this.state.bgColor1)
        if (this.state.load) {
            return (
                <body className="casino_BackGround_Image">
                    {/* <Header1 walletBalance={this.state.walletBalance} /> */}
                    <img src="../images/Loadingicon.gif" alt="loago"></img>

                </body>
            )
        }

        return (
            <body className="casino_BackGround_Image" style={{ background: "" }}>
                 <div className="header-section">   
                    <Header1 />
                    {/* <SubHeader /> */}
                </div>
                <div className="card" className="homeCard1">
                    <div className="panel-heading">
                    </div>
                    <div className="homeFlex">
                        <span>
                            <div class="container1">
                                <img className="homeLeft" src="../images/homeLeft.png" alt="Snow" />
                                <span className="Balance">
                                    <h1 className="BalanceFont">BALANCE</h1>
                                </span>
                                <span className="WiningAmount">
                                    <span className="WinnningFont">WINNING</span><br></br><span className="WinnningFont">AMOUNT</span>
                                    {/* <div className="text">WINNING AMOUNT</div> */}

                                </span>
                                <span className="win_number_1">{this.state.last10data[0].gameResult}</span>
                                <span className="win_number_2">{this.state.last10data[0].gameResult}</span>
                                <span className="win_number_3">{this.state.last10data[1].gameResult}</span>
                                <span className="win_number_4">{this.state.last10data[2].gameResult}</span>
                                <span className="win_number_5">{this.state.last10data[3].gameResult}</span>
                                <span className="win_number_6">{this.state.last10data[4].gameResult}</span>
                                <span className="win_number_7">{this.state.last10data[5].gameResult}</span>
                                <span className="win_number_8">{this.state.last10data[6].gameResult}</span>
                                <span className="win_number_9">{this.state.last10data[7].gameResult}</span>
                                <span className="win_number_0">{this.state.last10data[8].gameResult}</span>

                                <span className="last_10_data"><img className="last_10_data_width" src="../images/last_10_data.png"></img></span>



                                <div class="homeCentered51"><p className="home-input-card1">{this.state.gameResult}</p></div>
                                <div class="homeCentered52"><p className="home-input-card1">{this.state.winAmount}</p></div>
                            </div>
                        </span>
                        <span>
                            {this.state.active ? (<img className="homeCircular" src="../images/circular.png"></img>) : (<img className="homeCircular" src="../images/circular.gif"></img>)}

                            {this.state.active ? (<span className="image_center_win">{this.state.gameResult}</span>) : (<span className="image_center_win">N</span>)}

                        </span>


                        <img className="homeRight" src="/images/homeRightNew.png"></img>
                        <span className="casinoTiming">
                            <div class="container1">
                                <span class="card casinoTimingWidth">
                                    <div class="casinoTimingFont">00 SEC</div>
                                </span>
                            </div>
                        </span>
                        <span className="chip_number_5a"><button disabled={this.state.disabled} onClick={this.handleCoin5} className="chip_number_5New"><img className="width_coin" src="../images/coin_5New.png"></img></button></span>
                        <span className="chip_number_10a"><button disabled={this.state.disabled} onClick={this.handleCoin10} className="chip_number_5New"><img className="width_coin" src="../images/coin_10New.png"></img></button></span>

                        <span className="chip_number_50a"><button disabled={this.state.disabled} onClick={this.handleCoin50} className="chip_number_5New"><img className="width_coin" src="../images/coin_50New.png"></img></button></span>
                        <span className="chip_number_100a"><button disabled={this.state.disabled} onClick={this.handleCoin100} className="chip_number_5New"><img className="width_coin" src="../images/coin_100New.png"></img></button></span>
                        <span className="chip_number_500a"><button disabled={this.state.disabled} onClick={this.handleCoin500} className="chip_number_5New"><img className="width_coin" src="../images/coin_500New.png"></img></button></span>
                        <span className="chip_number_1000a"><button disabled={this.state.disabled} onClick={this.handleCoin1000} className="chip_number_5New"><img className="width_coin" src="../images/coin_1000New.png"></img></button></span>






                    </div>

                    <div className="Price_Chart_main1">

                        <div onClick={this.handleClick0} className="card card4a" style={{ backgroundImage: this.state.bgColor0 }}>
                            {this.state.clicked0 ? (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) : (<input type="number" className="input4a" value={this.state.betAmountat0} />)}

                            <button  className="button4a"><span className="center4a">0</span></button>
                        </div>

                        <div onClick={this.handleClick1} className="card card4a" style={{ backgroundImage: this.state.bgColor1 }}>
                            {this.state.clicked1 ? (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) :
                                (<input type="number" className="input4a" value={this.state.betAmountat1} />)}
                            <button  className="button4a"><span className="center4a">1</span></button>
                        </div>

                        <div className="card card4a" onClick={this.handleClick2} style={{ backgroundImage: this.state.bgColor2 }}>
                            {this.state.clicked2 ?
                                (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) :
                                (<input type="number" className="input4a" value={this.state.betAmountat2} />)
                            }
                            <button  className="button4a"><span className="center4a">2</span></button>
                        </div>

                        <div className="card card4a" onClick={this.handleClick3}style={{ backgroundImage: this.state.bgColor3 }}>
                            {this.state.clicked3 ? (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) :
                                (<input type="number" className="input4a" value={this.state.betAmountat3} />)}
                            <button  className="button4a"><span className="center4a">3</span></button>
                        </div>

                        <div onClick={this.handleClick4} className="card card4a" style={{ backgroundImage: this.state.bgColor4 }}>
                            {this.state.clicked4 ? (
                                <input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) : (
                                    <input type="number" className="input4a" value={this.state.betAmountat4} />
                                )
                            }
                            <button  className="button4a"><span className="center4a">4</span></button>
                        </div>

                        <div onClick={this.handleClick5} className="card card4a" style={{ backgroundImage: this.state.bgColor5 }} >
                            {this.state.clicked5 ? (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) : (<input type="number" className="input4a" value={this.state.betAmountat5} />)}

                            <button className="button4a"><span className="center4a">5</span></button>
                        </div>

                        <div onClick={this.handleClick6} className="card card4a" style={{ backgroundImage: this.state.bgColor6 }}>
                            {this.state.clicked6 ? (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) : (<input type="number" className="input4a" value={this.state.betAmountat6} />)}

                            <button  className="button4a"><span className="center4a">6</span></button>
                        </div>

                        <div onClick={this.handleClick7} className="card card4a" style={{ backgroundImage: this.state.bgColor7 }}>
                            {this.state.clicked7 ? (<input type="number" className="input4a" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount} />) : (<input type="number" className="input4a" value={this.state.betAmountat7} />)}

                            <button  className="button4a"><span className="center4a">7</span></button>
                        </div>

                        <div onClick={this.handleClick8} className="card card4a" style={{ backgroundImage: this.state.bgColor8 }} >
                            {this.state.clicked8 ? (<input className="input4a" type="number" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount}></input>
                            ) : (
                                    <input className="input4a" type="number" value={this.state.betAmountat8} />

                                )}
                            <button className="button4a"><span className="center4a">8</span></button>
                        </div>

                        <div onClick={this.handleClick9} className="card card4a" style={{ backgroundImage: this.state.bgColor9 }}>
                            {this.state.clicked9 ? (<input className="input4a" type="number" onChange={(e) => { this.handleAmount(e, this.state.okButtonValue) }} value={this.state.betAmount}></input>) : <input className="input4a" type="number" value={this.state.betAmountat9} />}

                            <button  className="button4a"><span className="center4a">9</span></button>
                        </div>
                    </div>
                    <div className="homeFlex1 home-background-image">
                        <span>
                            <div class="homeCentered54"><p className="home-input-card3">{this.state.winAmount}</p></div>
                        </span>
                        <button onClick={(e) => { this.handleOkButton(e, this.state.okButtonValue) }} class="homeButtonBet">PLACE BET</button>
                        <button onClick={this.handleRepeat} class="homeButtonRebet">REBET</button>
                        <button onClick={this.handleCancel} class="homeButtonQuit">CANCEL</button>
                    </div>
                </div>
                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            </body >
        )
    }
}

export default UserHome;



























































