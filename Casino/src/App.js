import React,{Component} from 'react';
// import Header from './components/Header';
import './css/bootstrap.css'
import './css/header.css';
import './css/style.css';
import './css/Sidebar.css';
import './css/Cricket.css';
import './css/style2.css';
import './css/android_cricket.css'
import './css/xxx.css'

import  LoginPage from './components/LoginPage';
import {BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import MasterPrivateRoute from './private/MasterAdminRoute'
import MasterAdminCricket from './components/masterAdmin/ongoingCrcketMatch'
import MasterAdminLiveCasino from './components/masterAdmin/masterAdminCasino'
import MasterAdminCricketMatch from './components/masterAdmin/cricketMatch'
import ChangePasswordMaster from './components/masterAdmin/changePassword'
import SuperPrivateRoute from './private/SuperAdminRoute'
import MasterAdminHome from './components/masterAdmin/home'
import MasterAdminUserList from './components/masterAdmin/userList'
import SuperAdminHome from './components/superAdmin/home'
import SuperAdminMasterList from './components/superAdmin/masterAdminList'
import SuperAdminUserList from './components/superAdmin/userList'
import SuperAdminCricket from './components/superAdmin/cricketGame'
import SuperAdminCasino from './components/superAdmin/casinoGame'
import SuperAdminCasinoHistory from './components/superAdmin/casinoGameHistory'
import LiveCricketUpdate from './components/superAdmin/liveCricket'
import Account from './components/superAdmin/account'
import MasertAccount from './components/superAdmin/masterAccount'
import UserAccount from './components/superAdmin/userAccount'

import PrivateRoute from './private/UserRoute'
import UserHome from './components/user/home'
import Cricket from './components/user/liveCricket'
import UserCricketHistory from './components/user/cricketBetHistory'
import ChangePasswordUser from './components/user/changePassword'
import UserCricketMatchHistory from './components/user/cricketbetHistoryonMatch'
import UserCasinoHistory from './components/user/casinoHistory'
import DepositUser from './components/user/chipDeposit'
import WithdrawUser from './components/user/chipWithdraw'

import Casino from './components/Casino1'
import Cricket1 from './components/Cricket1'
import SuperAdminCasinoLiveHistory from './components/superAdmin/onGoingCasino'
import SuperAdminCasinoCompletedHistory from './components/superAdmin/completedCasinoGame'
import CricketMarket from './components/superAdmin/cricketMarket'
import CasinoTransaction from './components/superAdmin/casinoTransaction'
import CricketTransaction from './components/superAdmin/cricketTransaction'
import SuperAdminCompletedCricket from './components/superAdmin/completedCricket'
import SuperAdminCricketMatchHistory from './components/superAdmin/cricketbetPerMatch'
import SuperAdminCricketBetOnMatch from './components/superAdmin/cricketMatchBet'
import Music from './components/Music'
import DepositTransaction from './components/superAdmin/depositTransaction'
import WithdrawTransaction from './components/superAdmin/withdrawTransaction'
import ChipWithdraw from './components/superAdmin/chipWithdraw'
import ChipDeposit from './components/superAdmin/chipDeposit'
import ChipWithdrawMaster from './components/masterAdmin/chipWithdraw'
import ChipDepositMaster from './components/masterAdmin/chipDeposit'





class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:8000",
      pricebtc:''
    };
    // const socket = io(SERVER);
    // socket.on('connect', function(){
    //   console.log("========connected")
    // });

  }
  

  

  render() {
    // console.log("==========",PrivateRoute)
    return (
      <Router>
          <div>
          <Switch>


            <Route  exact path="/" component={LoginPage} />
            <PrivateRoute  exact path="/userHome" component={UserHome} />
            <PrivateRoute exact path = "/userChangepassword" component={ChangePasswordUser} />
            <PrivateRoute exact path="/cricket" component={Cricket} />
            <PrivateRoute exact path="/casinoHistory" component={UserCasinoHistory} />
            <PrivateRoute exact path="/cricket/:Id" component={Cricket1} />
            <PrivateRoute exact path="/usercricketmatchhistory/:Id" component={UserCricketMatchHistory} />
            <PrivateRoute exact path ="/chipdeposit" component={DepositUser} />
            <PrivateRoute exact path= "/chipwithdraw" component={WithdrawUser} />
           
            <PrivateRoute exact path="/cricketHistory" component={UserCricketHistory} /> 

            <SuperPrivateRoute exact path="/superAdminHome" component={SuperAdminHome} />
            <SuperPrivateRoute exact path="/superAdmin/masterlist" component={SuperAdminMasterList} />
            <SuperPrivateRoute exact path="/superAdmin/userlist" component={SuperAdminUserList} />
            <SuperPrivateRoute exact path="/superAdmin/SuperAdminCasinoLiveHistory" component={SuperAdminCasinoLiveHistory} />
            <SuperPrivateRoute exact path="/superAdmin/casinohistory/:Id" component={SuperAdminCasinoHistory} />
            <SuperPrivateRoute exact path="/superAdmin/Completed" component={SuperAdminCasinoCompletedHistory}/>
            <SuperPrivateRoute exact path="/superAdmin/SuperAdminCricket" component={SuperAdminCompletedCricket} />
            <SuperPrivateRoute exact path='/SuperAdminCricketBet/:id' component = {SuperAdminCricketBetOnMatch} />

            <SuperPrivateRoute exact path="/superAdmin/cricket" component={SuperAdminCricket} />
            <SuperPrivateRoute exact path="/superAdmin/casino" component={SuperAdminCasino}/>
            <SuperPrivateRoute exact path="/superAdmin/account" component={Account} />
            <SuperPrivateRoute exact path ="/superAdmincricket/:Id" component={LiveCricketUpdate} />
            <SuperPrivateRoute exact path ="/superAdmin/cricketMarket" component={CricketMarket} />
            <SuperPrivateRoute exact path="/superAdminCasinotransaction/:Id" component={CasinoTransaction} />
            <SuperPrivateRoute exact path="/superAdminCricketTransaction/:Id" component={CricketTransaction} />
            <SuperPrivateRoute exact path= "/superadmincricketmatchhistory/:Id" component={SuperAdminCricketMatchHistory} />
            <SuperPrivateRoute exact path ="/superadmin/useraccount" component={UserAccount} />
            <SuperPrivateRoute exact path ="/superadmin/masteraccount" component={MasertAccount} />
            <SuperPrivateRoute exact path ="/superadmindeposit/:Id" component={DepositTransaction} />
            <SuperPrivateRoute exact path ="/superadminwithdraw/:Id" component={WithdrawTransaction} />
            <SuperPrivateRoute exact path = "/superadminchipdeposit" component={ChipDeposit} />
            <SuperPrivateRoute exact path = "/superadminchipwithdraw" component={ChipWithdraw} />





            <MasterPrivateRoute exact path="/masterChangepassword" component = {ChangePasswordMaster} /> 
            <MasterPrivateRoute exact path="/masterAdminHome" component={MasterAdminHome} />
            <MasterPrivateRoute exact path="/masteradmin/userlist" component={MasterAdminUserList}/>
            <MasterPrivateRoute exact path = "/MasterAdminCricket" component ={MasterAdminCricket} />
            <MasterPrivateRoute exact path = "/MasterAdminCricketMatch/:id" component ={MasterAdminCricketMatch} />
            <MasterPrivateRoute exact path ='/MasterAdminLiveCasino' component={MasterAdminLiveCasino}/>
            <MasterPrivateRoute exact path="/masterchipdeposit" component={ChipDepositMaster} />
            <MasterPrivateRoute exact path="/masterchipwithdraw" component={ChipWithdrawMaster} />





            </Switch>


          </div>
         </Router>
    );
  }
}


export default App;


    

