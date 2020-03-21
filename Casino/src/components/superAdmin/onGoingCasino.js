import React, {Component} from 'react';
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
class SuperAdminCasinoLiveHistory extends Component{
    constructor(props){
        super(props)
        this.state={
            transaction:[],

        }
    }
    async getTransaction() {
        var transaction = await axios.get(`${SERVER}/onGoingGameParticipants`)
        console.log("============123==============", transaction)
        await this.setState({ transaction: transaction.data.transaction })
    }

    componentDidMount(){
        this.getTransaction()
        console.log("========677777666=======",this.props.match.params.Id)
        const token = localStorage.getItem('superAdmintoken')
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${SERVER}/getCompletedCasionById`,{id:this.props.match.params.Id}).then((response)=>{
            console.log("===================",response)
            this.setState({transaction:response.data.transaction})
        }).catch((error)=>{
            console.log("======",error)
        })        // window.location= ``
    }
   



    render(){

        return(
            <body className="" >
            <Header />
            <SubHeader />

            <Sidebar />
           <div class="row">
               <div className="column1">
             <div className="table-responsive" >
                        <h2 style={{"overflow-x":"auto","color":"#5fb9f5",    marginLeft: "35%",fontSize:"22px"}}>Participants</h2>

                        <table className="table">
                            <thead style={{backgroundColor:"white"}} >
                                <tr>
                                    <th>User Name</th>
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
                                {this
                                    .state
                                    .transaction
                                    .map((contact, i) => {
                                        console.log("====yh hai yha map hai===sexllllll======", contact)
                                        return (
                                            <tr style={{ cursor: "pointer", color: "green" }} key={contact._id} >
                                                <td>{contact.userName}</td>
                                                <td>{contact.zeroNumber[0].amount}</td>
                                                <td>{contact.oneNumber[0].amount}</td>
                                                <td>{contact.twoNumber[0].amount}</td>
                                                <td>{contact.threeNumber[0].amount}</td>
                                                <td>{contact.fourNumber[0].amount}</td>
                                                <td>{contact.fiveNumber[0].amount}</td>
                                                <td>{contact.sixNumber[0].amount}</td>
                                                <td>{contact.sevenNumber[0].amount}</td>
                                                <td>{contact.eightNumber[0].amount}</td>
                                                <td>{contact.nineNumber[0].amount}</td>



                                            </tr>

                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                                           <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} />
            
                                           </div>
            </div>
            <Footer />

            </body>

                            
        )
    }
}

export default SuperAdminCasinoLiveHistory;