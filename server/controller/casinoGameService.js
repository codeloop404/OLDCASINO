var casioSocket = require('../app')
var DB = require('../db/numberGame')
var USERDB = require('../db/user')
var async = require("async");
// var casioSocket = require('../app')
// console.log("============12234678999=9999999999999999999===",casioSocket)
// USERDB.account.findOne({userName:"user1"}).then((account)=>{
//     console.log("============12234678999=9999999999999999999===",account)

// })
let startGame = (req,res)=>{
    try {
        var casino = new DB.casino ({
            startedAt: new Date().getTime(),
            expiredAt: new Date().getTime()+3600000,
            zeroNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            oneNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            twoNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            threeNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            fourNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            fiveNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            sixNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            sevenNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            eightNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            nineNumber:[{minimumAmount:9,maximumAmount:10000,betAmount:0}],
            gameStatus:true
 
        })
        casino.save().then((saved)=>{
            if(!saved){
                res.send({status:false})
            }else{
                casioSocket.emit('casinogamestarted',saved)
                res.send({status:true, message:"Game Has Been Strated Khel Shuru..............."})

            }
        })
    } catch (error) {
        
    }
}
let getlast10Games = async(req,res)=>{
    try {
        console.log("========.find({}).sort({_id:-1}).limit(5)=============")
     var last10data = await   DB.casino.find({gameStatus:false}).sort({_id:-1}).limit(10);
     if(last10data){
        res.send({status:true, message:"",data:last10data})

     }else{
        res.send({status:false, message:"",})

     }
        // .find({}).sort({_id:-1}).limit(5);
    } catch (error) {
        
    }
}
let getActiveGame =(req,res)=>{
    try {
        DB.casino.findOne({gameStatus:true}).then((activegame)=>{
            if(!activegame){
               return res.send({status:false})

            }
            else{
              return  res.send({status:true,game:activegame})

            }
        })
    } catch (error) {
        return res.send({status:false})
    }
}
let jointheGame = async(req,res)=>{
    console.log("========================req.body.id==================",req.user.userName)
    try {
        var masterAdminAdditionAmount = (req.body.amount)*(req.body.masterAdminComission/100)
        var superAdminAdditionAmount = req.body.amount - masterAdminAdditionAmount
        var account = await USERDB.account.findOne({userName:req.user.userName})
        var masterAdminAccount = await USERDB.account.findOne({userName:req.body.masterAdmin})
        console.log("==========accountssssssssssssss===",masterAdminAccount)
        
        USERDB.user.findOne({userName:req.user.userName}).then((USER)=>{
            if(!USER){
                 return res.send({status:false, message:"TechnIcal Issue1"})
            }else if(USER.walletBalance < req.body.amount){
                return res.send({status:false, message:"You Dont Have Balance"})

            }
            else{
                DB
                .casino
                .findOne({_id:req.body.id})
                .populate(['ref'])
                .exec(function (err , game ) {
                    if(err){
                    // console.log("============122442442424424=========",err,game)
                    return res.send({status:false, message:"TechnIcal Issue1"})

                    }
                    if(game){
                        // console.log(game.participants, req.user._id,   game.participants.includes(req.user._id))
                        // game.participants.includes(req.user._id)
                        if(game.participants.includes(req.user._id)){
                            // console.log("==========yha aya=========1============",game)
                            DB.casinoGame.findOne({ $and:[ {'game':req.body.id}, {'userName':req.user.userName} ]}).then((casino)=>{
                                console.log("yh-============77777777889000==========",casino)
                            // DB.casinoGame.findOne({userName:req.user.userName}).then((casino)=>{
                                if(!casino){
                                    // console.log("==========yha aya=========2============")
                                    return res.send({status:false, message:"TechnIcal Issue2"})


                                }else{
                                    // console.log("==========yha aya=========3============",req.body)
                                    if(req.body.number ==0){
                                        // console.log("==========yha aya=========4============",casino.zeroNumber[0].status)
                                        if(casino.zeroNumber[0].status){
                                            casino.betAmount = casino.betAmount +req.body.amount
                                            casino.zeroNumber[0].amount= casino.zeroNumber[0].amount+req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue3"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount
                                                    game.zeroNumber[0].betAmount=game.zeroNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue4"})

                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()

                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue5"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                        console.log("=============technicalll issue 6====^^^^^^^^^^^^^^^^^^^",adminbalaceupdated)
                                                                        if(!adminbalaceupdated){
                                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                                        }
                                                                        else{
                                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
                                                                                console.log("=============technicalll issue 6====^^^^^^^^^^&&&&&&&&&&&&&&&&&&&^^^^^^^^^",masteradminbalaceupdated)

                                                                                if(!masteradminbalaceupdated){
                                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                                }else{
                                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                                }
                                                                            })

                                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                                        }
                                                                    })
                                                                    // return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                           

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.zeroNumber[0].status,casino.zeroNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.zeroNumber[0].status=true
                                            casino.zeroNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue7"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.zeroNumber[0].betAmount=game.zeroNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue8"})

                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue9"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6=00000000000===",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
                                                                                    console.log("=============technicalll issue 6=00000000000=99999999999999999==",adminbalaceupdated)

                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            
                                        }
                                    }
                                    if(req.body.number ==1){
                                        // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.zeroNumber[0].amount)
                                        if(casino.oneNumber[0].status){
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.oneNumber[0].amount= casino.oneNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue11"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.oneNumber[0].betAmount=game.oneNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue12"})

                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue13"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====----------**************",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
                                                                                    console.log("========***************&&&&&&&&&**********=====technicalll issue 6====----------**************",masteradminbalaceupdated)

                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.oneNumber[0].status=true
                                            casino.oneNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue15"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.oneNumber[0].betAmount=game.oneNumber[0].betAmount+req.body.amount
                                            game.save().then((gasved)=>{
                                                if(!gasved){
                                                    return res.send({status:false, message:"TechnIcal Issue16"})

                                                }else{
                                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                    masterAdminAccount.save()
                                                    account.walletBalance = account.walletBalance - req.body.amount
                                                    account.save()
                                                    USER.walletBalance = USER.walletBalance - req.body.amount
                                                    USER.save().then((usersaved)=>{
                                                        if(!usersaved){
                                                            return res.send({status:false, message:"TechnIcal Issue17"})

                                                        }else{
                                                            USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                    console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                    if(!adminbalaceupdated){
                                                                        return res.send({status:false, message:"TechnIcal Issue6"})

                                                                    }
                                                                    else{
                                                                        USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                            if(!masteradminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})

                                                                            }else{
                                                                                return res.send({status:true, message:"BetPlace Successfully"})

                                                                            }
                                                                        })

                                                                        // return res.send({status:true, message:"BetPlace Successfully"})

                                                                    }
                                                                })
                                                        }
                                                    })
                                                    // return res.send({status:true, message:"BetPlace Successfully"})
                                                }
                                            })
                                                }})
                                            
                                        }

                                    }
                                    if(req.body.number ==2){
                                        // console.log("==========yha aya=========6============",casino.twoNumber)
                                        if(casino.twoNumber[0].status){
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            
                                            casino.betAmount = casino.betAmount +req.body.amount
                                            casino.twoNumber[0].amount= casino.twoNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue19"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.twoNumber[0].betAmount=game.twoNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue20"})
        

                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue21"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.twoNumber[0].status=true
                                            casino.twoNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue13"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.twoNumber[0].betAmount=game.twoNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue23"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue24"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                           
                                        }

                                    }
                                    if(req.body.number ==3){
                                        // console.log("==========yha aya=========3============",casino.threeNumber)
                                        if(casino.threeNumber[0].status){
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.threeNumber[0].amount= casino.threeNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue26"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.threeNumber[0].betAmount=game.threeNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue27"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue28"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                           

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.threeNumber[0].status=true
                                            casino.threeNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue30"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.threeNumber[0].betAmount=game.threeNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue31"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue32"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                           
                                        }

                                    }
                                    if(req.body.number ==4){
                                        // console.log("==========yha aya=========3============",casino.fourNumber)
                                        if(casino.fourNumber[0].status){
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.fourNumber[0].amount= casino.fourNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue34"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.fourNumber[0].betAmount=game.fourNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue35"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue36"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                           

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.fourNumber[0].status=true
                                            casino.fourNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue38"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.fourNumber[0].betAmount=game.fourNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue39"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue40"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            
                                        }

                                    }
                                    if(req.body.number ==5){
                                        // console.log("==========yha aya=========3============",casino.fiveNumber)
                                        if(casino.fiveNumber[0].status){
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.fiveNumber[0].amount= casino.fiveNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue42"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.fiveNumber[0].betAmount=game.fiveNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue43"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue44"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.fiveNumber[0].status=true
                                            casino.fiveNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue46"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.fiveNumber[0].betAmount=game.fiveNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue47"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue48"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            
                                        }

                                    }
                                    if(req.body.number ==6){
                                        console.log("==========yha aya=========3============",casino.sixNumber)
                                        if(casino.sixNumber[0].status){
                                            console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.sixNumber[0].amount= casino.sixNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue50"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.sixNumber[0].betAmount=game.sixNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue51"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue52"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.sixNumber[0].status=true
                                            casino.sixNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue54"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.sixNumber[0].betAmount=game.sixNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue55"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue56"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                           
                                        }

                                    }
                                    if(req.body.number ==7){
                                        console.log("==========yha aya=========3====99999999999999999999999999999999========",casino.sevenNumber)
                                        if(casino.sevenNumber[0].status){
                                            console.log("==========yha aya=========10000000000000000000============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.sevenNumber[0].amount= casino.sevenNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue58"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.sevenNumber[0].betAmount=game.sevenNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue58"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue59"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                          

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.sevenNumber[0].status=true
                                            casino.sevenNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue61"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.sevenNumber[0].betAmount=game.sevenNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue62"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue63"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                          
                                        }

                                    }
                                    if(req.body.number ==8){
                                        console.log("==========yha aya=========3============",casino.eightNumber)
                                        if(casino.eightNumber[0].status){
                                            console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.eightNumber[0].amount= casino.eightNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue65"})

                                                }else{
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.eightNumber[0].betAmount=game.eightNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue66"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue67"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                          

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.eightNumber[0].status=true
                                            casino.eightNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue69"})

                                                }else
                                                {
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.eightNumber[0].betAmount=game.eightNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue70"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue71"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                            
                                        }

                                    }
                                    if(req.body.number ==9){
                                        console.log("==========yha aya=========3============",casino.nineNumber)
                                        if(casino.nineNumber[0].status){
                                            console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.nineNumber[0].amount= casino.nineNumber[0].amount +req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue73"})

                                                }else
                                                {
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    game.nineNumber[0].betAmount=game.nineNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue74"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue75"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })

                                                }})
                                       

                                        }else{
                                            // console.log("==========yha aya=========5============",casino.oneNumber[0].status,casino.oneNumber[0].amount)
                                            casino.betAmount = casino.betAmount +req.body.amount

                                            casino.nineNumber[0].status=true
                                            casino.nineNumber[0].amount=req.body.amount
                                            casino.save().then((csav)=>{
                                                if(!csav){
                                                    return res.send({status:false, message:"TechnIcal Issue77"})

                                                }else
                                                {
                                                    game.betAmount = game.betAmount +req.body.amount

                                                    
                                                    game.nineNumber[0].betAmount=game.nineNumber[0].betAmount+req.body.amount
                                                    game.save().then((gasved)=>{
                                                        if(!gasved){
                                                            return res.send({status:false, message:"TechnIcal Issue78"})
        
                                                        }else{
                                                            masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                                            masterAdminAccount.save()
                                                            account.walletBalance = account.walletBalance - req.body.amount
                                                            account.save()
                                                            USER.walletBalance = USER.walletBalance - req.body.amount
                                                            USER.save().then((usersaved)=>{
                                                                if(!usersaved){
                                                                    return res.send({status:false, message:"TechnIcal Issue79"})

                                                                }else{
                                                                    USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                                        // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                                            console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                                            if(!adminbalaceupdated){
                                                                                return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                            }
                                                                            else{
                                                                                USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{
    
                                                                                    if(!masteradminbalaceupdated){
                                                                                        return res.send({status:false, message:"TechnIcal Issue6"})
    
                                                                                    }else{
                                                                                        return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                                    }
                                                                                })
    
                                                                                // return res.send({status:true, message:"BetPlace Successfully"})
    
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            // return res.send({status:true, message:"BetPlace Successfully"})
                                                        }
                                                    })
                                                }})
                                           
                                        }
 
                                    }
                                }
                            })
                        }else{
                            console.log("====1=333333=======",req.body)
                            if(req.body.number==0){
                            var casinoGame = new DB.casinoGame({
                                game:game,
                                zeroNumber:[{amount:req.body.amount,status:true}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount

                                // transaction:game
                            })
                            console.log("====2========",account)

                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue81"})


                                }
                                else{ 
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.ongoingCasinoGame = casinoGame
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue82"})
                                    }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.zeroNumber[0].betAmount=game.zeroNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue83"})
      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==1){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:req.body.amount,status:true}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount

                                // transaction:game

                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                
                                    return res.send({status:false, message:"TechnIcal Issue85"})

                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue86"})
                                    }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.oneNumber[0].betAmount=game.oneNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue87"})
      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })
                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==2){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:req.body.amount,status:true}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount

                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue90"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue91"})

                                      }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.twoNumber[0].betAmount=game.twoNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue92"})
      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==3){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:req.body.amount,status:true}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount


                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue94"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue95"})

                                      }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.threeNumber[0].betAmount=game.threeNumber[0].betAmount+req.body.amount
                                          game.transaction.push(casinoGame)
                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue96"})

      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==4){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:req.body.amount,status:true}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount


                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue98"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue99"})

                                      }else{
                                        account.walletBalance = account.walletBalance - req.body.amount
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.fourNumber[0].betAmount=game.fourNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue100"})

      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==5){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:req.body.amount,status:true}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount

                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue102"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue103"})
                                    }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.fiveNumber[0].betAmount=game.fiveNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue104"})
      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })
                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==6){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:req.body.amount,status:true}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount

                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue"})

                                      }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.sixNumber[0].betAmount=game.sixNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue"})

      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==7){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:req.body.amount,status:true}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount


                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue"})

                                      }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.sevenNumber[0].betAmount=game.sevenNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue"})

      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        if(req.body.number==8){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:req.body.amount,status:true}],
                                nineNumber:[{amount:0,status:false}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount


                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                    return res.send({status:false, message:"TechnIcal Issue"})


                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount

                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue"})

                                      }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.eightNumber[0].betAmount=game.eightNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue"})

      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })

                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        // if(req.body.number==8){
                        //     var casinoGame = new DB.casinoGame({
                        //         createdAt: new Date().getTime(),
                        //         game:game,
                        //         zeroNumber:[{amount:0,status:false}],
                        //         oneNumber:[{amount:0,status:false}],
                        //         twoNumber:[{amount:0,status:false}],
                        //         threeNumber:[{amount:0,status:false}],
                        //         fourNumber:[{amount:0,status:false}],
                        //         fiveNumber:[{amount:0,status:false}],
                        //         sixNumber:[{amount:0,status:false}],
                        //         sevenNumber:[{amount:0,status:false}],
                        //         eightNumber:[{amount:req.body.amount,status:true}],
                        //         nineNumber:[{amount:0,status:false}],
                        //         user:USER,
                        //         userName:req.user.userName,

                        //     })
                        //     console.log("====2========",)
                        //     casinoGame.save().then((saved)=>{
                        //         if(!saved){
                                
                        //             return res.send({status:false, message:"TechnIcal Issue"})

                        //         }
                        //         else{
                        //             USER.walletBalance = USER.walletBalance - req.body.amount

                        //             USER.ongoingCasinoGame = casinoGame
                        //           USER.save().then((usersaved)=>{
                        //               if(!usersaved){
                        //                 console.log("====3========",)
                        //                 return res.send({status:false, message:"TechnIcal Issue"})
                        //             }else{
                        //                 game.eightNumber[0].betAmount=game.eightNumber[0].betAmount+req.body.amount
                        //                 game.transaction.push(casinoGame)

                        //                   game.participants.push(casinoGame)
                        //                   game.save().then((casinosaved)=>{
                        //                       if(!casinosaved){
                        //                         console.log("====4========",)
                        //                         return res.send({status:false, message:"TechnIcal Issue"})

      
                        //                       }else{
                        //                         console.log("====5========",)
                        //                         USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                        //                             // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                        //                                 console.log("=============technicalll issue 6====",adminbalaceupdated)
                        //                                 if(!adminbalaceupdated){
                        //                                     return res.send({status:false, message:"TechnIcal Issue6"})

                        //                                 }
                        //                                 else{
                        //                                     USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                        //                                         if(!masteradminbalaceupdated){
                        //                                             return res.send({status:false, message:"TechnIcal Issue6"})

                        //                                         }else{
                        //                                             return res.send({status:true, message:"BetPlace Successfully"})

                        //                                         }
                        //                                     })

                        //                                     // return res.send({status:true, message:"BetPlace Successfully"})

                        //                                 }
                        //                             })

                        //                       }
                        //                   })
                        //               }
                        //           })
                        //         }
                        //     })
                        // }
                        if(req.body.number==9){
                            var casinoGame = new DB.casinoGame({
                                // createdAt: new Date().getTime(),
                                game:game,
                                zeroNumber:[{amount:0,status:false}],
                                oneNumber:[{amount:0,status:false}],
                                twoNumber:[{amount:0,status:false}],
                                threeNumber:[{amount:0,status:false}],
                                fourNumber:[{amount:0,status:false}],
                                fiveNumber:[{amount:0,status:false}],
                                sixNumber:[{amount:0,status:false}],
                                sevenNumber:[{amount:0,status:false}],
                                eightNumber:[{amount:0,status:false}],
                                nineNumber:[{amount:req.body.amount,status:true}],
                                user:USER,
                                userName:req.user.userName,
                                betAmount : req.body.amount


                            })
                            console.log("====2========",)
                            casinoGame.save().then((saved)=>{
                                if(!saved){
                                
                                    return res.send({status:false, message:"TechnIcal Issue"})

                                }
                                else{
                                    masterAdminAccount.walletBalance = masterAdminAccount.walletBalance+masterAdminAdditionAmount
                                    masterAdminAccount.save()
                                    account.walletBalance = account.walletBalance - req.body.amount
                                    account.casinotransaction.push(casinoGame)
                                    account.save()
                                    USER.walletBalance = USER.walletBalance - req.body.amount

                                    USER.ongoingCasinoGame = casinoGame
                                  USER.save().then((usersaved)=>{
                                      if(!usersaved){
                                        console.log("====3========",)
                                        return res.send({status:false, message:"TechnIcal Issue"})

                                      }else{
                                        game.betAmount = game.betAmount +req.body.amount

                                        game.nineNumber[0].betAmount=game.nineNumber[0].betAmount+req.body.amount
                                        game.transaction.push(casinoGame)

                                          game.participants.push(USER)
                                          game.save().then((casinosaved)=>{
                                              if(!casinosaved){
                                                console.log("====4========",)
                                                return res.send({status:false, message:"TechnIcal Issue"})
      
                                              }else{
                                                console.log("====5========",)
                                                USERDB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:superAdminAdditionAmount}}).then((adminbalaceupdated)=>{

                                                    // USERDB.user.findOneAndUpdate({userName:"ragwendra894"},{$inc:{walletBalance:req.body.amount}}).then((adminbalaceupdated)=>{
                                                        console.log("=============technicalll issue 6====",adminbalaceupdated)
                                                        if(!adminbalaceupdated){
                                                            return res.send({status:false, message:"TechnIcal Issue6"})

                                                        }
                                                        else{
                                                            USERDB.user.findOneAndUpdate({userName:USER.masterAdmin},{$inc:{walletBalance:masterAdminAdditionAmount}}).then((masteradminbalaceupdated)=>{

                                                                if(!masteradminbalaceupdated){
                                                                    return res.send({status:false, message:"TechnIcal Issue6"})

                                                                }else{
                                                                    return res.send({status:true, message:"BetPlace Successfully"})

                                                                }
                                                            })

                                                            // return res.send({status:true, message:"BetPlace Successfully"})

                                                        }
                                                    })
                                              }
                                          })
                                      }
                                  })
                                }
                            })
                        }
                        
                    }
                    }
                })
            }
        })
     
    } catch (error) {
        
    }
}

let onGoingGAmeBet = (req,res)=>{
    console.log("====================")
    try {
        DB.casinoGame.findOne({ $and:[ {'game':req.body.gameId}, {'userName':req.user.userName} ]}).then((game)=>{
            if(!game){

            }else{
                res.send({status:true,message:"",game:game})
            }
        })
    } catch (error) {
        
    }
}
 
let onGoingGameParticipants = (req,res)=>{
    try {
        DB.casino.findOne({gameStatus:true}).populate(['transaction']).exec(function (err , participants ){
            if(err){
              console.log(err)
              return res.send({status:false, message:"Technical Error"})
            }else if(participants){
            //  console.log(participants.transaction)
             return res.send({status:true, transaction:participants.transaction})
            }

        })
    } catch (error) {
        
    }
}

let stopGame =async (req,res)=>{
    // console.log("================yyyyyyyyyyyyyyyyyy=================",req.body)
    let games = []
    try {
        DB.casino.findById(req.body.id).then((game)=>{
            if(!game){

            }else{
               game.gameResult=req.body.gameResult
               game.expiredAt= new Date().getTime() 
               game.gameStatus= false
               console.log("================yyyyyyyyyyyyyyyyyy========1=========",req.body)

               game.save().then((saved)=>{
                   if(!saved){

                   }else{
                       data = {gameResult:req.body.gameResult}
                       casioSocket.emit('result-casiono', data);
                    DB.casino.findById(req.body.id).populate(['transaction']).exec(async function (err , participants ){
                     if(err){

                     }
                     else{
                        console.log("================yyyyyyyyyyyyyyyyyy==========2=======",games)

                         games = await participants.transaction
                     async.each(games, function(user, callback) {
                       if(user){
                        console.log("================yyyyyyyyyyyyyyyyyy==========333=======",req.body)
                        if(req.body.gameResult == 0 && user.zeroNumber[0].status == true){
                            var winamount = user.zeroNumber[0].amount*9.5
                             
                        //    console.log("==========yh jeeta=========1",user)
                           USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:user.zeroNumber[0].amount*9.5}}).then((updated)=>{
                            //    console.log("==============dis is maa ka",winamount)
                               if(updated){
                                USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                    // console.log("========123=====",adminupdated)
                                    if(updated){
                                        // callback()
                                        DB.casino.findByIdAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                            if(windamountupdate){
                                                DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:user.zeroNumber[0].amount*9.5}}).then((acoountupdated)=>{
                                                              if(acoountupdated){
                                                                  USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{

                                                                  })
                                                              }
                                                            })
                                                        }
                                                }).catch((error)=>{
                                                    console.log("==============123=========",error)
                                                })
                                            }
                                        })
                                    }
                                }).catch((error)=>{
                                    console.log("=====123======errorrrrr123333333333===",error)
                                })
                            }
                           })
                        }
                       
                         if(req.body.gameResult == 1 && user.oneNumber[0].status == true){
                            // console.log("==========yh jeeta=========3",user.oneNumber[0].amount*9.5)
                            var winamount = user.oneNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                // console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        // console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winamount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                  USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                      
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
                         if(req.body.gameResult == 2 && user.twoNumber[0].status == true){
                            // console.log("==========yh jeeta=========3",user.userName)
                            var winamount = user.twoNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                // console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        // console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         if(req.body.gameResult == 3 && user.threeNumber[0].status == true){
                            // console.log("==========yh jeeta=========4",)
                            var winamount = user.threeNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                // console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        // console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         }if(req.body.gameResult == 4 && user.fourNumber[0].status == true){
                            console.log("==========yh jeeta=========",user.userName)
                            var winamount = user.fourNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         if(req.body.gameResult == 5 && user.fiveNumber[0].status == true){
                            console.log("==========yh jeeta=========5",user.userName)
                            var winamount = user.fiveNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         }if(req.body.gameResult == 6 && user.sixNumber[0].status == true){
                            console.log("==========yh jeeta=========6",user.userName)
                            var winamount = user.sixNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                // console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        console.log("========123=====66666666666666666666666666666666666666666666666666",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         console.log("==========yh jeeta=========777777777777777777777777",user.userName,req.body.gameResult == 7 && user.sevenNumber[0].status == true)

                         if(req.body.gameResult == 7 && user.sevenNumber[0].status == true){
                            console.log("==========yh jeeta=========777777777777777777777777",user.userName)
                            var winamount = user.sevenNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                // console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        console.log("========123=====777777777777777777777777777777777777777777777777",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         if(req.body.gameResult == 8 && user.eightNumber[0].status == true){
                            // console.log("==========yh jeeta=========8",user.userName)
                            var winamount = user.eightNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                // console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        // console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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
                         if(req.body.gameResult == 9 && user.nineNumber[0].status == true){
                            console.log("==========yh jeeta=========9",user.userName)
                            var winamount = user.nineNumber[0].amount*9.5
                            USERDB.user.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((updated)=>{
                                console.log("========123=====",updated)
                                if(updated){
                                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((adminupdated)=>{
                                        console.log("========123=====",adminupdated)
                                        if(updated){
                                            DB.casino.findOneAndUpdate({_id:req.body.id},{$inc:{winAmount:winamount}}).then((windamountupdate)=>{
                                                if(windamountupdate){
                                                    DB.casinoGame.findOneAndUpdate({game:req.body.id},{$inc:{winAmount:winamount}}).then((casinogamewinamountupdated)=>{
                                                        if(casinogamewinamountupdated){
                                                            USERDB.account.findOneAndUpdate({userName:user.userName},{$inc:{walletBalance:winamount}}).then((acoountupdated)=>{
                                                                if(acoountupdated){
                                                                    USERDB.account.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winamount}}).then((masterAdminaccountupdated)=>{
                                                                        
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


                       }else{
                           callback()
                       }
                      }, function(err) {
                        // if any of the file processing produced an error, err would equal that error
                        if( err ) {
                          // One of the iterations produced an error.
                          // All processing will now stop.
                          console.log('A file failed to process');
                        } else {
                          console.log('All files have been processed successfully');
                        }
                    });
                     
                        //  console.log(game)
                     }
                    })
 
                   }
               })
            }
        })
    } catch (error) {
        
    }
}

let getCurrenTime = async(req,res)=>{
    var time = await new Date().getTime()
    return res.send({time:time, status:true})

}

let getCompletedCasinoGame = async(req,res)=>{
    // try {
    //     DB.casino.find({gameStatus:false}).then((comletedGame)=>{
    //         // console.log(comletedGame,"comletedGame")
    //         if(!comletedGame){
    //             return res.send({ status:false})

    //         }else{
    //             console.log(comletedGame,"comletedGame")

    //             return res.send({ status:true,data:comletedGame})
    //         }
    //     })
    // } catch (error) {
        
    // }
    try{
        console.log('================yahaayayayayyayya=============',req.body)

        var pageNo = parseInt(req.body.offset)
        var size = parseInt(req.body.limit)
        const search  = req.body.search
        var query  = {}
        var  where_search = {};
        var sort_query = {};
         const page  = 1
         const per_page =  10;
        const start = (page * per_page);
        if(search != '' ){
            if( search != '' ){
           
            var filter = new RegExp(search);
            where_search = {
                '$or' : [
                    {'createdAt' : filter},
                ]
            }
        }else{
            where_search = {
            }
        } 
        DB.casino.countDocuments(where_search, function (err , totalCount ){
            console.log('================yahaayayayayyayya=============',where_search,err)
            if (err) {
              return  res.json({msg: "error in fetching" ,status:false})
            }
            query.skip = size * (pageNo - 1)
            query.limit = size
            DB.casino.find(where_search,{'createdAt':1,'gameResult':1,'zeroNumber':1,'oneNumber':1,'twoNumber':1,'threeNumber':1,'fourNumber':1,'fiveNumber':1,'sixNumber':1,'eightNumber':1,'nineNumber':1,'sevenNumber':1,'':1,'winAmount':1,'startedAt':1,'betAmount':1},query).exec(function(err, docs){
               console.log('=======yh chal raha name', err,docs)
                if (err) {
                    // logger.info("paginatin", err)
                  return  res.json({msg: "error",status:false})
                } 
    
                else {
                    var totalPages = Math.ceil(totalCount / size)
                    var response = {
                        "message": docs,
                        "pages": totalPages,
                        status:true
                    };
                    return  res.json(response);
               var all_items = docs;
                }

    
            });
        })
    
        }
        else{
            // console.log('================yahaayayayayyayya=====333========')

        if (pageNo < 0 || pageNo === 0) {
            console.log('================yahaayayayayyayya=====000000300000========')

            return res.json({msg: "invalid"})
        }
        console.log(size,pageNo,'pageNo ')
        // console.log('================yahaayayayayyayya=====333========')

        query.skip = size * (pageNo - 1)
        query.limit = size
        console.log('================yahaayayayayyayya=====30000000033========',query)
        DB.casino
            .countDocuments({}, function (err , totalCount ) {
                console.log('================yahaayayayayyayya=====333========')

                console.log("==========ss",err, totalCount)
                if (err) {
                   return res.json({msg: "error in fetching"})
                }
                DB
                    .casino
                    .find({gameStatus:false}, {}, query, function (err , data ) {
                        // console.log("=============000000000000======",err,data)
                        if (err) {
                            res.json({msg: "error"})
                        } else {
                            var totalPages = Math.ceil(totalCount / size)
                            // console.log("uuuuuuuuuuu", totalPages)
                            var response = {
                                "error": false,
                                "message": data,
                                "pages": totalPages,
                                status:true
                            };
                        }
                        res.json(response);
                    });
            })
        }
    }catch(err){
        console.log(err)
      return  res.send({status:false, msg:err})
    }
}

let getCompletedCasionById =(req,res)=>{
    console.log("==========yha aya=========")
    try {
        DB.casino.findById(req.body.id).populate(['transaction']).exec(function (err , participants ){
            // console.log(err,participants,"========8900000000========")

            if(err){
            //   console.log(err,participants,"========8900000000========")
              return res.send({status:false, message:"Technical Error"})
            }else if(participants){
            //  console.log(participants.transaction)
             return res.send({status:true, transaction:participants.transaction})
            }

        })
    } catch (error) {
        
    }
}


let userCasinoHistory = (req,res)=>{
    try {
        DB.casinoGame.find({userName:req.user.userName}).then((comletedGame)=>{
            if(!comletedGame){

            }else{
                res.send({status:true, data:comletedGame})
            }
        })
    } catch (error) {
        
    }
    }

module.exports={getlast10Games,userCasinoHistory,getCompletedCasionById,getCompletedCasinoGame,getCurrenTime,stopGame,startGame,getActiveGame,jointheGame,onGoingGAmeBet,onGoingGameParticipants}
