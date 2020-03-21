var express = require('express');
var router = express.Router();
var userService = require("../controller/userService")
var casinoGameService = require('../controller/casinoGameService')
var adminCricketController = require('../controller/adminCricketController')
var userCricketController = require('../controller/userCricketController')
var adminCricketHistoryController = require('../controller/adminCricketHistoryContorller')
var jwt = require('jsonwebtoken');
var DB = require('../db/user')

// var transhash = require('../api/controller/transhashapi')

// router.post('/savehash', transhash.tnxhash)
// router.post('/receiveadd',transhash.receiveadds)
// router.post('/callbackurl_ipn',transhash.autoipnMethod);
var verifySuperAdmin = (req,res,next)=>{
    console.log("=========yha aya")
    if(req.headers.authorization || req.headers.auth){ 
      const token = req.headers.authorization || req.headers.auth;
    //   console.log("=========token",token)

      jwt.verify(token, "ILOVECASINO", function(err, decoded) {
        console.log("==========iiiiii===sssssss==",err,decoded,decoded._id,)
          if (err) {
            res.json({status:false, message:'You are not authenticate person.'});
            return
          }
          
          DB.user.findById({_id:decoded._id}).then((response)=>{
            // console.log("==========iiiiii===sssssss==",err,decoded,)

            // console.log("==========iiiiiijjjjjjjjjjjjlauda==========lauda==============",response)
            // if(response.userType){
            //   return res.send({status:false,msg:"you are not authanticated person"})
            // }
              if(response){
                if(response.userType){
                  //res.send({status:false,message:"you are not authanticated person"})
                  req.user= response;
                  return next()
                }else{
                  req.user= response;
                  return next()
                }
              }else{
               return res.send({status:false,message:"you are not authanticated person1"})
              }
          })
      })
  }else{
    return  res.send({status:false,message:"you are not authanticated person"})
  }
  
   }










router.post('/addUser',verifySuperAdmin,userService.addUser)
router.post('/login',userService.loginUser)
router.post('/blockUser',verifySuperAdmin,userService.blockUser)
router.post('/unblockUser',verifySuperAdmin,userService.unblockUser)
router.post('/getUserbyuserName',verifySuperAdmin,userService.getUserbyuserName)
router.post('/getMasterByUser',verifySuperAdmin,userService.getMasterByUser)
router.post('/addMasterAdmin',verifySuperAdmin,userService.addMasterAdmin)
router.get('/getAllMasterUsers',verifySuperAdmin,userService.getAllMasterUsers)
router.get('/getAllUsers',verifySuperAdmin,userService.getAllUsers)
router.post('/getAccountDetail',verifySuperAdmin,userService.getAccountDetail)
router.get('/getAccountDetailofClient',verifySuperAdmin,userService.getAccountDetailofClient)
router.get('/getAccountDetailofUser',verifySuperAdmin,userService.getAccountDetailofUser)
router.post('/getAllMasterAdmin',verifySuperAdmin,userService.getAllMasterAdmin)
router.post('/changePassword',verifySuperAdmin,userService.changePassword)
router.post('/changePasswordbyUser',verifySuperAdmin,userService.changePasswordbyUser)
router.post('/fillAccount',verifySuperAdmin,userService.fillAccount)
router.post('/updateStakeClient',verifySuperAdmin,userService.updateStakeClient)
router.post('/startGame',verifySuperAdmin,casinoGameService.startGame)
router.get('/getActiveGame',verifySuperAdmin,casinoGameService.getActiveGame)
router.post('/jointheGameCasino',verifySuperAdmin,casinoGameService.jointheGame)
router.post('/onGoingGAmeBet',verifySuperAdmin,casinoGameService.onGoingGAmeBet)
router.get('/onGoingGameParticipants',casinoGameService.onGoingGameParticipants)
router.get('/getCurrenTime',casinoGameService.getCurrenTime)
router.post('/stopGame',verifySuperAdmin,casinoGameService.stopGame)
router.get('/getlast10Games',verifySuperAdmin,casinoGameService.getlast10Games)
router.post('/getCompletedCasinoGame',verifySuperAdmin,casinoGameService.getCompletedCasinoGame)
router.post('/getCompletedCasionById',verifySuperAdmin,casinoGameService.getCompletedCasionById)
router.get('/userCasinoHistory',verifySuperAdmin,casinoGameService.userCasinoHistory)
router.post('/getCasinoTransactionByAccount',verifySuperAdmin,userService.getCasinoTransactionByAccount)
router.post('/getCricketTransactionByAccount',verifySuperAdmin,userService.getCricketTransactionByAccount)
router.post('/getWithdrawTransactionByAccount',verifySuperAdmin,userService.getWithdrawTransactionByAccount)
router.post('/getDepositTransactionByAccount',verifySuperAdmin,userService.getDepositTransactionByAccount)
router.post('/withdrawAccount',verifySuperAdmin,userService.withdrawAccount)
router.get('/getAllWithdraw',verifySuperAdmin,userService.getAllWithdraw)
router.get('/getAllDeposit',verifySuperAdmin,userService.getAllDeposit)
router.get('/getWithdrawTransactionByUser',verifySuperAdmin,userService.getWithdrawTransactionByUser)
router.get('/getDepositTransactionByUser',verifySuperAdmin,userService.getDepositTransactionByUser)




//===============================Admin Cricket Controller===========================
router.post('/getCricketMatchbet',verifySuperAdmin,adminCricketController.getCricketMatchbet)
router.post('/updateperOvers',verifySuperAdmin,adminCricketController.updateperOvers)
router.post('/cricketSeries',verifySuperAdmin,adminCricketController.cricketSeries)
router.get('/getCricketSeries',verifySuperAdmin,adminCricketController.getCricketSeries)
router.post('/createCricketMatch', verifySuperAdmin,adminCricketController.createCrcketMatch)
router.get('/getliveCricketmatch',verifySuperAdmin,adminCricketController.getliveCricketmatch)
router.post('/updateperBallRun',verifySuperAdmin,adminCricketController.updateperBallRun)
router.post('/updateWicket',verifySuperAdmin,adminCricketController.updateWicket)
router.post('/updateBhaveonTeam1',verifySuperAdmin,adminCricketController.updateBhaveonTeam1)
router.post('/updateBhaveonTeam2',verifySuperAdmin,adminCricketController.updateBhaveonTeam2)
router.post('/updateTwoOverSession',verifySuperAdmin,adminCricketController.updateTwoOverSession)
router.post('/updateSixOverSession',verifySuperAdmin,adminCricketController.updateSixOverSession)
router.post('/updateTenOverSession',verifySuperAdmin,adminCricketController.updateTenOverSession)
router.post('/updateTwentyOverSession',verifySuperAdmin,adminCricketController.updateTwentyOverSession)
router.post('/ballRunning',verifySuperAdmin,adminCricketController.ballRunning)
router.post('/startbetting',verifySuperAdmin,adminCricketController.startbetting)
router.post('/updateBattingTeam',verifySuperAdmin,adminCricketController.updateBattingTeam)
router.post('/getCompletedCricketGame',verifySuperAdmin,adminCricketController.getCompletedCricketGame)
router.post('/showNewSession',verifySuperAdmin,adminCricketController.showNewSession)
router.post('/showOldSession',verifySuperAdmin,adminCricketController.showOldSession)
router.post('/stopSeconds',verifySuperAdmin,adminCricketController.stopSeconds)
router.post('/setFavouriteTeam',verifySuperAdmin,adminCricketController.setFavouriteTeam)
router.post('/startForSeconds',verifySuperAdmin,adminCricketController.startForSeconds)
router.post('/marFirstInningOver',verifySuperAdmin,adminCricketController.marFirstInningOver)
//=================================api for cricket history==============
router.post('/getCricketBet',verifySuperAdmin,adminCricketHistoryController.getCricketBet)
//===================api for settling bet =================
router.post('/settle2OverSession',verifySuperAdmin,adminCricketController.settle2OverSession)
router.post('/settle6OverSession',verifySuperAdmin,adminCricketController.settle6OverSession)
router.post('/settle10OverSession',verifySuperAdmin,adminCricketController.settle10OverSession)
router.post('/settle20OverSession',verifySuperAdmin,adminCricketController.settle20OverSession)
router.post('/settleDownTeamResult',verifySuperAdmin,adminCricketController.settleDownTeamResult)

// =================api for cricket for user ===========================
router.post('/getlistofbetOnMatch',verifySuperAdmin,userCricketController.getlistofbetOnMatch)
router.get('/getListOfbet',verifySuperAdmin,userCricketController.getListOfbet)
router.get('/getCricketliveMatch',verifySuperAdmin,userCricketController.getListCricketMatch)
router.post('/getcricketMatchId',verifySuperAdmin,userCricketController.getcricketMatchId)
router.post('/betPlaceon2overyes',verifySuperAdmin,userCricketController.betPlaceon2overyes)
router.post('/betPlaceon2overNo',verifySuperAdmin,userCricketController.betPlaceon2overNo)
router.post('/betPlaceon6overNo',verifySuperAdmin,userCricketController.betPlaceon6overNo)
router.post('/betPlaceon6overYes',verifySuperAdmin,userCricketController.betPlaceon6overyes)
router.post('/betPlaceon10overNo',verifySuperAdmin,userCricketController.betPlaceon10overNo)
router.post('/betPlaceon10overYes',verifySuperAdmin,userCricketController.betPlaceon10overyes)
router.post('/betPlaceon20overYes',verifySuperAdmin,userCricketController.betPlaceon20overyes)
router.post('/betPlaceon20overNo',verifySuperAdmin,userCricketController.betPlaceon20overNo)

router.post('/betPlaceonTeam1',verifySuperAdmin,userCricketController.betPlaceonTeam1)
router.post('/betPlaceonTeam2',verifySuperAdmin,userCricketController.betPlaceonTeam2)



//aggregate===============
router.post('/aggregateBetAmountonMatch',verifySuperAdmin,adminCricketController.aggregateBetAmountonMatch)
module.exports = router;