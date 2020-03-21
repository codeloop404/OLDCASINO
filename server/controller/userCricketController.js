var DB = require('../db/cricketGame')
var USERDB = require('../db/user')

var casioSocket = require('../app')


let getListCricketMatch = (req,res)=>{
    try {
        DB.cricket.find({gameStatus:true}).then((matchlist)=>{
            if(!matchlist){
                return res.send({status:false, message:"Technical Error",})

            }else{
                return res.send({status:true, match:matchlist})
            }
        })
    } catch (error) {
        return res.send({status:false, message:"Technical Error", error:error})

    }
}

let getListOfbet = (req,res)=>{
    try {
        DB.cricketGame.find({userName:req.user.userName}).then((betSlip)=>{
            if(!betSlip){
                return res.send({status:false, message:"Technical Error"})

            }else{
                return res.send({status:true, betSlip:betSlip})

            }
        })
    } catch (error) {
        
    }
}

let getlistofbetOnMatch = async(req,res)=>{
    var betlist = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { userName: req.user.userName} ] } )
    // console.log("===========",betlist)
    if(betlist){
        return res.send({status:true, match:betlist})
    }else{
        return res.send({status:false, })

    }

}

let getcricketMatchId = (req, res)=>{
    try {

        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
              return res.send({status:true, match:match})
            }else{
             return res.send({status:false, message:"Technical Error"})
            }
        })
    } catch (error) {
        return res.send({status:false, message:"Technical Error", error:error})

    }
}

let betPlaceon2overyes = async(req,res)=>{
    try {
       
        console.log("==============iskimaaaaaa== 2over yes=================99999999=====",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settletwoOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                if(match.disabled == false){
                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                      
                        typeOfBet:"twoOverYes",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,
                        sessionScore:match.twoOverSession.yes,
                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"twoOver"
                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:false, message:"Bet Not Placed Bet Paused"})

            }
            }
        })
    } catch (error) {
        
    }
}

let betPlaceon2overNo = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settletwoOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"twoOverNo",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,

                        sessionScore:match.twoOverSession.no,
                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"twoOver"


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:false, message:"Bet Not Placed Bet Paused"})

            }
            }
        })
    } catch (error) {
        
    }
}

let betPlaceon6overyes = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settlesixOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"sixOverYes",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,

                        sessionScore:match.sixOverSession.yes,
                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"sixOver"


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:true, message:"Bet Not Placed Bet Paused"})

            }
        }
        })
    } catch (error) {
        
    }
}

let betPlaceon6overNo = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settlesixOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"sixOverNo",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,

                        sessionScore:match.sixOverSession.no,
                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"sixOver"


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:true, message:"Bet Not Placed Bet Paused"})

            }
        }
        })
    } catch (error) {
        
    }
}

let betPlaceon10overyes = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settletenOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                console.log("=========1=========yh haidisable", match.disabled)
                if(match.disabled == false){
                    console.log("=========2=========yh haidisable", match.disabled)

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"tenOverYes",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        sessionScore:match.tenOverSession.yes,
                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"tenOver",
                        createdAt:req.body.createdAt,



                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:true, message:"Bet Not Placed Bet Paused"})

            }
        }
        })
    } catch (error) {
        
    }
}

let betPlaceon10overNo = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settletenOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"tenOverNo",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,

                        sessionScore:match.tenOverSession.no,
                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"tenOver"


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:false, message:"Bet Not Placed Bet Paused"})

            }
        }
        })
    } catch (error) {
        
    }
}

let betPlaceon20overyes = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match.settletwentyOverSession){
                return res.send({status:false, message:"Bet Expired"})

            }
            if(match){
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"twentyOverYes",
                        betAmount:req.body.betAmount,
                        sessionScore:match.twentyOverSession.yes,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,

                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"twentyOver"


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:false, message:"Bet Not Placed Bet Paused"})
 
            }
        }
        })
    } catch (error) {
        
    }
}

let betPlaceon20overNo = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.settletwentyOverSession){
                    return res.send({status:false, message:"Bet Expired"})

                }
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"twentyOverNo",
                        betAmount:req.body.betAmount,
                        sessionScore:match.twentyOverSession.no,
                        winAmount:req.body.betAmount*2,
                        createdAt:req.body.createdAt,

                        betRate:2,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        sessionName:"twentyOver"


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                    }
                })
            }else{
                return res.send({status:false, message:"Bet Not Placed Bet Paused"})

            }
        }
        })
    } catch (error) {
        
    }
}
let betPlaceonTeam1 = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa====nakisaka=============yyyuuu===",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                        DB.cricketGame.findOne({ $and: [
                            {
                                'team': match.team1
                            },
                            {
                                userName:req.user.userName,
                            },
                            {
                                game:req.body.id
                            }

                        ]}).then((betSlip)=>{
//                             if(betSlip){
// console.log("============yh mila bet slip=============on betonteam2===========",betSlip,req.body)
//                             }else{
                              

                      var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"betonTeam",
                        betAmount:req.body.betAmount,
                        betRate:match.matchWinTeam1,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        team:match.team1,
                        winAmount:req.body.winAmount,
                        createdAt:req.body.createdAt,



                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                              console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })  
                            // }
                        })


                      
                    }
                    
                })
            }else{
                return res.send({status:false, message:"Bet Not Placed Bet Paused"})
 
            }
        }
        })
    } catch (error) {
        
    }
}

let betPlaceonTeam2 = async(req,res)=>{
    try {
        console.log("==============iskimaaaaaa=======",req.body,req.user.userName,req.user.masterAdmin)
        var masterAdminAdditionAmount = (req.body.betAmount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.betAmount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        var masterAdmin =  await USERDB.user.findOne({userName:req.body.masterAdmin})
        var superAdmin = await USERDB.user.findOne({userName:"ranjeetSuperAdmin21"})
        DB.cricket.findById(req.body.id).then((match)=>{
            if(match){
                if(match.disabled == false){

                USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
                    if(!USER){
                         return res.send({status:false, message:"TechnIcal Issue1"})
                    }else if(USER.walletBalance < req.body.amount){
                        return res.send({status:false, message:"You Dont Have Balance"})
                    }else{
                        DB.cricketGame.findOne({ $and: [
                            {
                                'team': match.team1
                            },
                            {
                                userName:req.user.userName,
                            },
                            {
                                game:req.body.id
                            }

                        ]}).then((betSlip)=>{
//                             if(betSlip){
// console.log("============yh mila bet slip========================",betSlip,req.body)
//                             }else{
                    var cricketTransaction = new DB.cricketGame({
                        typeOfBet:"betonTeam",
                        betAmount:req.body.betAmount,
                        winAmount:req.body.betAmount*2,
                        betRate:match.matchWinTeam2,
                        createdAt:req.body.createdAt,
                        user:USER,
                        game:match,
                        userName:req.user.userName,
                        battingTeam:match.BattingTeam,
                        team:match.team2,
                        winAmount:req.body.winAmount


                      })
                      cricketTransaction.save().then((saved)=>{
                          if(saved){
                            //   console.log("===============yha ayayayyay===============1==================")
                            superAdmin.walletBalance = superAdmin.walletBalance + superAdminAdditionAmount
                            superAdmin.save().then((superAdminSaved)=>{
                                if(superAdminSaved){
                                    // console.log("===============yha ayayayyay===============2==================")

                                    masterAdmin.walletBalance = masterAdmin.walletBalance+masterAdminAdditionAmount
                                    masterAdmin.save().then((masterAdminSaved)=>{
                                        if(masterAdminSaved){
                                            // console.log("===============yha ayayayyay===============3==================")

                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                            masterAdminAccount.save().then((masterAdminAccountUpdated)=>{
                                                if(masterAdminAccountUpdated){
                                                    // console.log("===============yha ayayayyay===============4==================")

                                                    account.walletBalance = account.walletBalance - req.body.betAmount
                                                    account.cricketTransaction.push(cricketTransaction)
                                                    account.save().then((userAccountUpdated)=>{
                                                        if(userAccountUpdated){
                                                            // console.log("===============yha ayayayyay===============5==================")

                                                            USER.walletBalance = USER.walletBalance - req.body.betAmount
                                                            USER.save().then((userUpdated)=>{
                                                                if(userUpdated){
                                                                    match.betAmount = match.betAmount+req.body.betAmount
                                                                    match.transaction.push(cricketTransaction)
                                                                    match.save().then((saved)=>{
                                                                        if(saved){
                                                                            return res.send({status:true, message:"Bet Placed Successfully"})

                                                                        }
                                                                    })                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                           
                          
                          }
                      })
                            // }
                        })
                        
  
                    }
                })
            }else{
                return res.send({status:true, message:"Bet Not Placed Bet Paused"})

            }
        }
        })
    } catch (error) {
        
    }
}


module.exports={getListOfbet,betPlaceonTeam2,betPlaceonTeam1,betPlaceon6overyes,betPlaceon6overNo,betPlaceon2overNo,
    getlistofbetOnMatch,betPlaceon2overyes,betPlaceon10overyes,betPlaceon10overNo,betPlaceon20overyes,betPlaceon20overNo,getListCricketMatch,getcricketMatchId}