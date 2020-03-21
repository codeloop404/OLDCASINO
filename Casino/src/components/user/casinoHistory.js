import React, { Component } from 'react'
import Header1 from '../Header1'
import axios from 'axios'
const SERVER = process.env.REACT_APP_API_URL

class UserCasinoHistory extends Component {
    constructor(props){
        super(props)
        this.state={
            history:[],
            totalBetAmount:null,
            totalWinAmount:null
        }
    }
    async getHistory(){
        const token = localStorage.getItem('usertoken')
        axios.defaults.headers.common['Authorization'] = token;
       var history =   await axios.get(`${SERVER}/userCasinoHistory`)
    //    console.log("==============History1",history.data)
       if(history.data.status){
        // console.log("==============History2",history)

           await this.setState({history:history.data.data})
           var m = [];
           var p = []
        //    console.log("==============History2=======sexccccccccc======8899900=============",this.state.history)
    
           for (var n = 0; n < m.length; n++) {
            // console.log("==============History20000000==========00000=================00===========",this.state.history[n].betAmount)
               m.push(this.state.history[n].betAmount)
               p.push(this.state.history[n].winAmount)
    
    
           }
          
    
                 console.log("==============mmmmmmmmmmmmm=======sexccccccccc======8899900=============",m)

           var sum = 0
           for (var i = 0; i < m.length; i++) {
               sum += m[i];
           }
           var psum = 0
            for (var i = 0; i < p.length; i++) {
                psum += p[i];
            }
            console.log("==============History2======9===============8999=======",m)
    
           await this.setState({totalBetAmount:sum,totalWinAmount:psum})
           console.log("==============History2-------------",this.state.totalBetAmount,this.state.totalWinAmount)
       }
      

    }
    componentDidMount(){
        this.getHistory()
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

    render() {

        return (
            <body className="">
                <Header1 />
                <div class="row">
             <h2 style={{cursor: "pointer",color:"#5eb9f5",marginLeft: "30%",fontSize:"20px"}}>Casino Bet History</h2>

             <div className="table-responsive">
                 {/* <p>Participants</p> */}

                 <table class="table">
                     {/* <p>On Going Bet</p> */}
                     <thead style={{backgroundColor:"white"}}>
                         <tr>
                         <th>Serial No.</th>
                         <th>Bet Amount</th>
                         <th>Win Amount</th>
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
                                .history
                                .map((contact, i) => {
                                    // console.log("====yh hai yha map hai===sexllllll======",contact)
                                    return (
                                        <tr style={{cursor: "pointer",color:"white"}} key={contact._id} >
                                        {/* <td>{i+1}</td> */}
                                    <td>{i+1}</td>
                                <td>&#x20b9;{contact.betAmount}</td>
                                <td>&#x20b9;{contact.winAmount}</td>

                                <td>&#x20b9;{contact.zeroNumber[0].amount}</td>
                                <td>&#x20b9;{contact.oneNumber[0].amount}</td>
                                <td>&#x20b9;{contact.twoNumber[0].amount}</td>
                                <td>&#x20b9;{contact.threeNumber[0].amount}</td>
                                <td>&#x20b9;{contact.fourNumber[0].amount}</td>
                                <td>&#x20b9;{contact.fiveNumber[0].amount}</td>
                                <td>&#x20b9;{contact.sixNumber[0].amount}</td>
                                <td>&#x20b9;{contact.sevenNumber[0].amount}</td>
                                <td>&#x20b9;{contact.eightNumber[0].amount}</td>
                                <td>&#x20b9;{contact.nineNumber[0].amount}</td>

                                            
                                          
                                        </tr>

                                    );
                                })
                            }
                            </tbody>
                 </table>
                 </div>
               
                 </div>

                </body>

           
        )
    }
}

export default UserCasinoHistory;