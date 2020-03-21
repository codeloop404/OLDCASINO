var DB = require('../db/cricketGame')
var USERDB = require('../db/user')

var casioSocket = require('../app')
var async = require("async");

// console.log("============12234678999=9999999999999999999===",casioSocket)
let cricketSeries = (req,res)=>{
    console.log("==============",req.body)
    var cricketSeries = DB.cricketSeries({
        seriesName: req.body.seriesName,
        seriesStartDate: req.body.seriesStartDate,
        seriesEndDate:req.body.seriesEndDate
    })
    cricketSeries.save().then((saved)=>{
        if(saved){
            res.send({status:true, message:"Series Created Successfully"})

        }
    })

}

let getCricketSeries = (req,res)=>{
    DB.cricketSeries.find().then((series)=>{
        if(series){
            res.send({status:true,game:series})
        }else{
            res.send({status:false,})
        }
    }).catch((error)=>{
        console.log("==========9999999===========",error)
    })
}
let stopSeconds = (req,res)=>{
    console.log("==================",req.body)
    try {
        DB.cricket.findById(req.body.matchId).then((game)=>{
            console.log("=======9999999============",game.showNewSession)
            if(game){
                game.disabled= true
                game.forSeconds = false
                game.save().then((saved)=>{
                    if(saved){
                        console.log("=======9999999============",game.showNewSession)
                        casioSocket.emit('perballRun',saved)
                        return res.send({status:true, message:"ho gya"})

                    }
                })
            }
        })
    } catch (error) {
        
    }
}
let showNewSession = (req,res)=>{
    console.log("==================",req.body)
    try {
        DB.cricket.findById(req.body.matchId).then((game)=>{
            console.log("=======9999999============",game.showNewSession)
            if(game){
                game.showNewSession = true
                game.save().then((saved)=>{
                    if(saved){
                        console.log("=======9999999============",game.showNewSession)
                        casioSocket.emit('perballRun',saved)
                        return res.send({status:true, message:"ho gya"})

                    }
                })
            }
        })
    } catch (error) {
        
    }
}
let showOldSession = (req,res)=>{
    console.log("==================",req.body)
    try {
        DB.cricket.findById(req.body.matchId).then((game)=>{
            console.log("=======9999999============",game.showNewSession)
            if(game){
                game.showNewSession = false
                game.save().then((saved)=>{
                    if(saved){
                        console.log("=======9999999============",game.showNewSession)
                        casioSocket.emit('perballRun',saved)
                        return res.send({status:true, message:"ho gya"})

                    }
                })
            }
        })
    } catch (error) {
        
    }
}
let getCricketMatchbet = (req,res)=>{
    DB.cricket.findOne({_id:req.body.id}).populate(['transaction']).exec(function(err, items) {
        console.log("=============123344=====sexxxx=======",items);
        if(items){
            return res.send({status:true, message:"", data:items.transaction})
        }
    });
}

let startForSeconds = (req,res)=>{
    try {
       DB.cricket.findById(req.body.matchId).then((cricket)=>{
           if(cricket){
               console.log("startForSeconds==============", new Date().getTime(),new Date().getTime() + 1000*(parseInt(req.body.seconds)))
               cricket.forSeconds = true,
               cricket.betStartingTime = new Date().getTime()
               cricket.betExpiredAt = new Date().getTime() + 1000*(parseInt(req.body.seconds))
               cricket.save().then((saved)=>{
                   if(saved){
                       console.log("========yh ho gaya ========saved",saved)
                       casioSocket.emit('perballRun',saved)
                       return res.send({status:true, message:"Started"})
                   }
               })
           }
       }) 
    } catch (error) {
        
    }
}

let createCrcketMatch = (req,res)=>{
    try {
        console.log("========================",req.body)
        DB.cricket.find({gameStatus:true}).then((cricket)=>{
            // console.log("==================",cricket.length)
            if(cricket.length >= 2){
                return  res.send({status:false, message:"There Is Already two game running"})

            }else{
                DB.cricketSeries.findById(req.body._id).then((series)=>{
                    console.log("=============123455555555================",series)
                    if(series){
                        var cricket = new DB.cricket ({
                            matchStartedAt:req.body.matchStartedAt,
                            team1:req.body.team1,
                            team2:req.body.team2,
                            // tossTeam1:req.body.tossTeam1,
                            // tossTeam2:req.body.tossTeam2,
                            overs:req.body.overs,
                            typeOfmatch:req.body.typeOfmatch,
                            matchWinTeam1:req.body.matchWinTeam1Rate,
                            matchWinTeam2:req.body.matchWinTeam2Rate,
                            createdAt:req.body.createdAt,

                        //     Sessions:[{
                        //         sessionName:"2overSession",
                        //         ovesrs:2,
                        //         yes:req.body.twoOversessionYes,
                        //         no:req.body.twoOversessionNo
                        //     },{
                        //         sessionName:"6overSession",
                        //         ovesrs:6,
                        //         yes:req.body.sixOversessionYes,
                        //         no:req.body.sixOversessionNo
                        //     },{
                        //         sessionName:"10 overSession",
                        //         ovesrs:10,
                        //         yes:req.body.tenOversessionYes,
                        //         no:req.body.tenOversessionNo
                        //     }
                        // ]
                        twoOverSession:{yes:req.body.twoOversessionYes,no:req.body.twoOversessionNo,active:true},
                        sixOverSession:{yes:req.body.sixOversessionYes,no:req.body.sixOversessionNo,active:true},
                        tenOverSession:{yes:req.body.tenOversessionYes,no:req.body.tenOversessionNo,active:false},
                        twentyOverSession:{yes:req.body.twentyOversessionYes,no:req.body.twentyOversessionNo,active:false},
                        cricketSeries:series
                        })
                        cricket.save().then((saved)=>{
                            if(!saved){
                              return  res.send({status:false})
                            }else{
                                casioSocket.emit("gameStartedCricket",saved)
                                res.send({status:true, message:"Game Has Been Strated Khel Shuru..............."})
                
                            }
                        })
                    }else{

                    }
                })
 
            }
        })
       
    } catch (error) {
        return  res.send({status:false, message:"Technical Error"})

    }
}

let getliveCricketmatch = (req,res)=>{
    DB.cricket.find({gameStatus:true}).then((cricket)=>{
        console.log("==================",cricket.length)
        if(!cricket){
            return  res.send({status:false, message:"Technical Issue"})

        }else{
            return  res.send({status:true, message:"Match", match1:cricket[0],match2:cricket[1]})

        }
    })
}

let updateBattingTeam = (req,res)=>{
    try{
        DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
            if(cricketGame){
                cricketGame.BattingTeam = req.body.firstBattingTeam
                cricketGame.ballingTeam = req.body.ballingTeam
                cricketGame.save().then((saved)=>{
                    if(saved){
                        // casioSocket.emit('perballRun',data)
            
                        // console.log("================12344555-==============",saved)
                        return res.send({status:true,message:"Updated"})
                    }
                })
            }
        })
    }catch (error) {
        
    }
}

let updateperBallRun = (req,res)=>{
    try {
        data = req.body
        casioSocket.emit('updateRunningball',data)
        DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
if(cricketGame){
    cricketGame.matchScoreRun = cricketGame.matchScoreRun+req.body.run
    cricketGame.save().then((saved)=>{
        if(saved){
            casioSocket.emit('perballRun',data)

            // console.log("================12344555-==============",saved)
            return res.send({status:true,message:"Updated"})
        }
    })
}
        })
    } catch (error) {
        
    }
}
let updateperOvers = (req,res)=>{
    try {
        data = req.body
        // casioSocket.emit('perballRun',data)
        DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
            console.log("==========================9999000overs==========",cricketGame)
if(cricketGame){
    if(cricketGame.runningBall == 5){
        cricketGame.runningOvers = cricketGame.runningOvers + 1
        cricketGame.runningBall = 0
        cricketGame.save().then((saved)=>{
            if(saved){
                // console.log("================12344555-==============",saved)
                return res.send({status:true,message:"Updated"})
            }
        })
    }
    else{
    cricketGame.runningBall = cricketGame.runningBall+req.body.runningBall
    cricketGame.save().then((saved)=>{
        if(saved){
            casioSocket.emit('perballRun',data)

            // console.log("================12344555-==============",saved)
            return res.send({status:true,message:"Updated"})
        }
    })
}
}
        })
    } catch (error) {
        
    }
}
let updateWicket = (req,res)=>{
    try {
        data = {wicket:true,}
        casioSocket.emit('updateRunningball',data)
        DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
        // console.log("===========123=======",cr)
if(cricketGame){
    cricketGame.matchWicket = cricketGame.matchWicket+req.body.wicket
    cricketGame.save().then((saved)=>{
        if(saved){
            casioSocket.emit('perballRun',data)

            // console.log("================12344555-==============",saved)
            return res.send({status:true,message:"Updated"})
        }
    })
}
        })
    } catch (error) {
        
    }
}

let updateBhaveonTeam1 = (req,res)=>{
    try {
        data = req.body
        DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
if(cricketGame){
    cricketGame.matchWinTeam1 = req.body.matchWinTeam1
    cricketGame.save().then((saved)=>{
        if(saved){
            casioSocket.emit('perballRun',data)

            // console.log("================12344555-==============",saved)
            return res.send({status:true,message:"Updated"})
        }
    })
}
        })
    } catch (error) {
        
    }
}

let updateBhaveonTeam2 = (req,res)=>{
    try {
        data = req.body
        DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
if(cricketGame){
    cricketGame.matchWinTeam2 = req.body.matchWinTeam2
    cricketGame.save().then((saved)=>{
        if(saved){
            casioSocket.emit('perballRun',data)

            // console.log("================12344555-==============",saved)
            return res.send({status:true,message:"Updated"})
        }
    })
}
        })
    } catch (error) {
        
    }
}

let updateTwoOverSession = (req,res)=>{
try {
    console.log("=====yh hai=000000000=",)
    data = req.body
    DB.cricket.findById(req.body.matchId).then((cricketGame)=>{
        console.log(cricketGame.twoOverSession,"========123=============",req.body.yes,req.body.no,cricketGame)
if(cricketGame){
cricketGame.twoOverSession.yes = req.body.yes
cricketGame.twoOverSession.no = req.body.no
cricketGame.save()
.then((saved)=>{
if(saved){
    casioSocket.emit('perballRun',data)

    console.log("================12344555-==============",saved)
    return res.send({status:true,message:"Updated"})
}
})
}
    })
} catch (error) {
    
}
}
let updateSixOverSession = async(req,res)=>{
    try {
        data = req.body
        var cricketGame = await DB.cricket.findById(req.body.matchId)
      cricketGame.sixOverSession.yes = await req.body.yes
      cricketGame.sixOverSession.no = await req.body.no
      var newcricket = await cricketGame.save()
      casioSocket.emit('perballRun',data)

      var cricketGame1 = await DB.cricket.findById(req.body.matchId)
    } catch (error) {
        
    }
    }
 let updateTenOverSession = async(req,res)=>{
        try {
            console.log("=====yh hai=000000000=updateTenOverSession",req.body)
            data = req.body
            var cricketGame = await DB.cricket.findById(req.body.matchId)
          console.log(":==========10000000000000",cricketGame)
          cricketGame.tenOverSession.yes = await req.body.yes
          cricketGame.tenOverSession.no = await req.body.no
          cricketGame.tenOverSession.active = true
          var newcricket = await cricketGame.save()
          casioSocket.emit('perballRun',data)

          console.log(":==========10000000000000============",newcricket)
        //   var cricketGame1 = await DB.cricket.findById(req.body.matchId)
          console.log(":==========10000000000000============9999999999",cricketGame1)
    
    
    
        } catch (error) {
            
        }
        }


let updateTwentyOverSession = async (req, res)=>{
    try {
        console.log("=====yh hai=000000000=updateTenOverSession",req.body)
        data = req.body
        var cricketGame = await DB.cricket.findById(req.body.matchId)
      console.log(":==========10000000000000",cricketGame)
      cricketGame.twentyOverSession.yes = await req.body.yes
      cricketGame.twentyOverSession.no = await req.body.no
      cricketGame.twentyOverSession.active= true
      var newcricket = await cricketGame.save()
      casioSocket.emit('perballRun',data)

      console.log(":==========10000000000000============",newcricket)
      var cricketGame1 = await DB.cricket.findById(req.body.matchId)
      console.log(":==========10000000000000============9999999999",cricketGame1)



    } catch (error) {
        
    }
}


let ballRunning = async(req,res)=>{
    console.log("====================",req.body)
    var data = {balPressed:true, matchId:req.body.matchId}
    // casioSocket.emit('ballrnunning',data)
    var cricketGame = await DB.cricket.findById(req.body.matchId)
    cricketGame.disabled = await true

    var newcricket = await cricketGame.save()
    casioSocket.emit('perballRun',newcricket)

    // console.log(":==========10000000000000",cricketGame)

}
let startbetting = async(req,res)=>{
    console.log("======yh ayya=====startbetting=========",req.body)
    var data = {balPressed:true, matchId:req.body.matchId}
    // casioSocket.emit('ballrnunning',data)
    var cricketGame = await DB.cricket.findById(req.body.matchId)
    cricketGame.disabled = await false
    var newcricket = await cricketGame.save()
    casioSocket.emit('perballRun',newcricket)

    console.log(":======disable============enable====10000000000000",cricketGame)

}
let getCompletedCricketGame = async(req,res)=>{
 
    try{
        console.log('================yahaayayayayyayya=======user walalallalal======',req.body)

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
        DB.cricket.countDocuments(where_search, function (err , totalCount ){
            console.log('================yahaayayayayyayya=============',where_search,err)
            if (err) {
              return  res.json({msg: "error in fetching" ,status:false})
            }
    
            DB.cricket.find(where_search,{'createdAt':1,'team1':1,'team2':1,'totalWinAmount':1,'totalBetAmount':1,'betAmount':1,'winAmount':1}).exec(function(err, docs){
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
        DB.cricket
            .countDocuments({}, function (err , totalCount ) {
                console.log('================yahaayayayayyayya=====333========',)

                console.log("==========ss",err, totalCount)
                if (err) {
                   return res.json({msg: "error in fetching"})
                }
                DB
                    .cricket
                    .find({}, {}, query, function (err , data ) {
                        console.log("=============000000000000======",err,data.length)
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

let setFavouriteTeam = async(req,res)=>{
    try {
        console.log("=================setfavouriteteam=====================999============")
        data = req.body
        DB.cricket.findById(req.body.matchId).then((match)=>{
            if(!match){

            }else{
                if(match.team1 != req.body.favouriteTeam){
                    console.log("==================",match.team1,match.team2)
                    match.team1 = req.body.favouriteTeam
                    match.team2 = req.body.unfavouriteTeam
                    console.log("===========new=======",match.team1,match.team2)

                    match.save().then((saved)=>{
                        if(saved){
                            casioSocket.emit('perballRun',data)

                        }
                    })
                    console.log(match.team1, match.team2,req.body)                    // match.save()
                }
              
            }
        })
    } catch (error) {
        
    }
}

let marFirstInningOver = async (req,res)=>{
    try {
        console.log("=================setfavouriteteam=====================999============")
        data = req.body
        var BattingTeam;
        DB.cricket.findById(req.body.matchId).then((match)=>{
            if(!match){
              
            }else{
                
                    console.log("==================",match.team1,match.team2)
                    match.firstInningOver = true
                    match.overs = 0
                    match.runningOvers = 0
                    match.runningBall = 0
                    match.matchScoreRun = 0
                    match.matchWicket = 0
                    match.settletwoOverSession = false
                    match.settlesixOverSession = false
                    match.settletenOverSession = false
                    match.settletwentyOverSession = false

                    console.log("===========new=======",match.team1,match.team2)

                    match.save().then((saved)=>{
                        if(saved){
                            casioSocket.emit('perballRun',data)

                        }
                    })
                    console.log(match.team1, match.team2,req.body)                    // match.save()
                }
              
            
        })
    } catch (error) {
        
    }
}

//===================aggregation==================
let aggregateBetAmountonMatch = async (req,res)=>{
    try {
        console.log("===222====allah wariya===000000000000000000=====",req.body,req.user.userName )

        var betlist = await   DB.cricketGame.aggregate({ $match: { $and: [   { userName: req.user.userName } ]} },{ $group: { _id : null, sum : { $sum: "$betAmount" } } });
        console.log("=======allah wariya===000000000000000000=====",betlist)
    } catch (error) {
        
    }
}
// ===========================settling bet==================
let settle2OverSession = async(req,res)=>{
    try {
        data = req.body
     var twoOverYes = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { sessionName: "twoOver"} ] } )
    //  console.log("======999999999=====99999==========",twoOverYes)
     async.each(twoOverYes, function(i, callback) {
        if( i.typeOfBet == "twoOverNo" & i.betStatus == "unsettled" ){
            if(req.body.finalrun<i.sessionScore ){
            winAmount = i.betAmount * i.betRate

            USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                if(updated){
                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                    if(masterupdated){
                        DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                            if(cricketebetSettled){

                              DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settletwoOverSession:true}}).then((cricketupdated)=>{
                               if(cricketupdated){
                                  console.log("=================60======================",cricketupdated)
                                USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                    if(userAccountupdate){
                                       console.log("=================60======================",userAccountupdate)
                                       USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                        if(masterAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           
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
            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settletwoOverSession:true}}).then((cricketupdated)=>{
                })
            })
        }
          

        }
        if( i.typeOfBet == "twoOverYes" & i.betStatus == "unsettled"){
            console.log("===3=====yes",i.sessionScore)
            if(req.body.finalrun>i.sessionScore ){
                winAmount = i.betAmount * i.betRate
                console.log("==4==no","i.sessionScore",i.sessionScore,"=========",req.body.finalrun,i.sessionScore ,i.userName,winAmount )
                USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                    if(updated){
                        USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                        if(masterupdated){
                            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                                if(cricketebetSettled){
    
                                  DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settletwoOverSession:true}}).then((cricketupdated)=>{
                                   if(cricketupdated){
                                      console.log("=================60======================",cricketupdated)
                                      USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                        if(userAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                            if(masterAccountupdate){
                                               console.log("=================60======================",userAccountupdate)
                                               
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
                DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                    DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settletwoOverSession:true}}).then((cricketupdated)=>{
                    })
                })
            }

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
    })

   

            // console.log("====================",twoOverYes,twoOverNo)


    } catch (error) {
        
    }
}
let settle6OverSession = async(req,res)=>{
    try {
        data = req.body
     var sixOverYes = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { sessionName: "sixOver"} ] } )
    //  var twoOverNo = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { typeOfBet: "twoOver"} ] } )
     console.log("======999999999","=====99999==========",sixOverYes)
     async.each(sixOverYes, function(i, callback) {

        // console.log("=========uppppppsers",i.sessionScore,req.body.finalrun)
        if( i.typeOfBet == "sixOverNo" & i.betStatus == "unsettled"){
            console.log("====no","i.sessionScore",i.sessionScore,"=========",req.body.finalrun>i.sessionScore  )
            if(req.body.finalrun<i.sessionScore  ){
            winAmount = i.betAmount * i.betRate
            USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                if(updated){
                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                    if(masterupdated){
                        DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled", betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                            if(cricketebetSettled){

                              DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount}}).then((cricketupdated)=>{
                               if(cricketupdated){
                                  console.log("=================60======================",cricketupdated)
                                  USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount},$set:{settlesixOverSession:true}}).then((userAccountupdate)=>{
                                    if(userAccountupdate){
                                       console.log("=================60======================",userAccountupdate)
                                       USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                        if(masterAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           
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
            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled", betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settlesixOverSession:true}}).then((cricketupdated)=>{
                })
            })
        }
          

        }
        if( i.typeOfBet == "sixOverYes" & i.betStatus == "unsettled"){
            console.log("========yes",i.sessionScore)
            if(req.body.finalrun>i.sessionScore  ){
                winAmount = i.betAmount * i.betRate
                USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                    if(updated){
                        USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                        if(masterupdated){
                            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                                if(cricketebetSettled){
    
                                  DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settlesixOverSession:true}}).then((cricketupdated)=>{
                                   if(cricketupdated){
                                      console.log("=================60======================",cricketupdated)
                                      USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                        if(userAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                            if(masterAccountupdate){
                                               console.log("=================60======================",userAccountupdate)
                                               
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
                DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled", betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                    DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settlesixOverSession:true}}).then((cricketupdated)=>{
                    })
                })
            }

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
    })

   

            // console.log("====================",twoOverYes,twoOverNo)


    } catch (error) {
        
    }
}
let settle10OverSession = async(req,res)=>{
    try {
        data = req.body
        console.log("========iski mammmmmmm kkka yh aya==================",data)
     var tenOverYes = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { sessionName: "tenOver"} ] } )
    //  var twoOverNo = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { typeOfBet: "twoOver"} ] } )
     console.log("======999999999","=====99999==========",tenOverYes)
     async.each(tenOverYes, function(i, callback) {

        // console.log("=========uppppppsers",i.sessionScore,req.body.finalrun)
        if( i.typeOfBet == "tenOverNo" & i.betStatus == "unsettled"){
            console.log("====no","i.sessionScore",i.sessionScore,"====0000=====",req.body.finalrun < i.sessionScore  )
            if(req.body.finalrun<i.sessionScore ){
            winAmount = i.betAmount * i.betRate
            USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                if(updated){
                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                    if(masterupdated){
                        DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                            if(cricketebetSettled){

                              DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settletenOverSession:true}}).then((cricketupdated)=>{
                               if(cricketupdated){
                                  console.log("=================60======================",cricketupdated)
                                  USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                    if(userAccountupdate){
                                       console.log("=================60======================",userAccountupdate)
                                       USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                        if(masterAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           
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
            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled", betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settletenOverSession:true}}).then((cricketupdated)=>{
                })
            })

        }
          

        }
        if( i.typeOfBet == "tenOverYes" & i.betStatus == "unsettled"){
            console.log("========yes",i.sessionScore)
            if(req.body.finalrun>i.sessionScore  ){
                winAmount = i.betAmount * i.betRate
                USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                    if(updated){
                        USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                        if(masterupdated){
                            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                                if(cricketebetSettled){
    
                                  DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settletenOverSession:true}}).then((cricketupdated)=>{
                                   if(cricketupdated){
                                      console.log("=================60======================",cricketupdated)
                                      USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                        if(userAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                            if(masterAccountupdate){
                                               console.log("=================60======================",userAccountupdate)
                                               
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
            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                console.log("=================60==har gaya====================",cricketebetSettled)
                DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settletenOverSession:true}}).then((cricketupdated)=>{
                })

            })

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
    })

   

            // console.log("====================",twoOverYes,twoOverNo)


    } catch (error) {
        
    }
}

let settle20OverSession = async(req,res)=>{
    try {
        data = req.body
     var twentyOverYes = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { sessionName: "twentyOver"} ] } )
    //  var twoOverNo = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { typeOfBet: "twoOver"} ] } )
     console.log("======999999999","=====99999==========",twentyOverYes)
     async.each(twentyOverYes, function(i, callback) {

        // console.log("=========uppppppsers",i.sessionScore,req.body.finalrun)
        if( i.typeOfBet == "twentyOverNo" & i.betStatus == "unsettled"){
            console.log("====no","i.sessionScore",i.sessionScore,"=========",req.body.finalrun>i.sessionScore  )
            if(req.body.finalrun<i.sessionScore ){
            winAmount = i.betAmount * i.betRate
            USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                if(updated){
                    USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                    if(masterupdated){
                        DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                            if(cricketebetSettled){

                              DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settletwentyOverSession:true}}).then((cricketupdated)=>{
                               if(cricketupdated){
                                  console.log("=================60======================",cricketupdated)
                                  USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                    if(userAccountupdate){
                                       console.log("=================60======================",userAccountupdate)
                                       USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                        if(masterAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           
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
            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled", betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settletwentyOverSession:true}}).then((cricketupdated)=>{
                })

            })
        }
          

        }
        if( i.typeOfBet == "twentyOverYes" & i.betStatus == "unsettled"){
            console.log("========yes",i.sessionScore)
            if(req.body.finalrun>i.sessionScore ){
                winAmount = i.betAmount * i.betRate
                USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                    if(updated){
                        USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                        if(masterupdated){
                            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                                if(cricketebetSettled){
    
                                  DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{settletwentyOverSession:true}}).then((cricketupdated)=>{
                                   if(cricketupdated){
                                      console.log("=================60======================",cricketupdated)
                                      USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                        if(userAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                            if(masterAccountupdate){
                                               console.log("=================60======================",userAccountupdate)
                                               
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
                DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled", betResult:false,finalSessionScore:req.body.finalrun}}).then((cricketebetSettled)=>{
                    DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{settletwentyOverSession:true}}).then((cricketupdated)=>{
                    })
                })
            }

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
    })

   

            // console.log("====================",twoOverYes,twoOverNo)


    } catch (error) {
        
    }
}

let settleDownTeamResult = async (req,res)=>{
    try {
        var betonTeam = await   DB.cricketGame.find( { $and: [ { game: req.body.matchId }, { typeOfBet: "betonTeam"} ] } )
                console.log("========99999999999==========",betonTeam) 
// 
        if(betonTeam.length == 0){
            DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$set:{gameStatus:false}}).then((cricketUPDATEDd)=>{
            })
        }
        // console.log("========99999999999==========",betonTeam) 
        else{
        async.each(betonTeam, function(i, callback) {
            if(i.team == req.body.team){
                winAmount = i.winAmount
                USERDB.user.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((updated)=>{
                    if(updated){
                        USERDB.user.findOneAndUpdate({userName:updated.masterAdmin},{$inc:{walletBalance:-winAmount}}).then((masterupdated)=>{
                        if(masterupdated){
                            DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:true,finalWinningTeam:req.body.team}}).then((cricketebetSettled)=>{
                                if(cricketebetSettled){
    
                                  DB.cricket.findOneAndUpdate({_id:req.body.matchId},{$inc:{winAmount:winAmount},$set:{gameStatus:false}}).then((cricketupdated)=>{
                                   if(cricketupdated){
                                      console.log("=================60======================",cricketupdated)
                                      USERDB.account.findOneAndUpdate({userName:i.userName},{$inc:{walletBalance:winAmount}}).then((userAccountupdate)=>{
                                        if(userAccountupdate){
                                           console.log("=================60======================",userAccountupdate)
                                           USERDB.account.findOneAndUpdate({userName:updated.userName},{$inc:{walletBalance:-winAmount}}).then((masterAccountupdate)=>{
                                            if(masterAccountupdate){
                                               console.log("=================60======================",userAccountupdate)
                                               
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
                DB.cricketGame.findOneAndUpdate({_id:i._id},{$set:{betStatus:"settled",betResult:false,finalWinningTeam:req.body.team}}).then((cricketebetSettled)=>{
                }) 
            }
        })
    }
    } catch (error) {
        
    }
}


module.exports = {aggregateBetAmountonMatch,marFirstInningOver,stopSeconds,showOldSession,startbetting,settleDownTeamResult,startForSeconds,setFavouriteTeam,showNewSession,settle6OverSession,settle10OverSession,settle20OverSession,settle2OverSession,getCompletedCricketGame,updateBattingTeam,getCricketMatchbet,ballRunning,updateperOvers,getCricketSeries,cricketSeries,updateTwentyOverSession,updateTenOverSession,updateSixOverSession,updateTwoOverSession,updateBhaveonTeam2,updateBhaveonTeam1,createCrcketMatch,getliveCricketmatch,updateperBallRun,updateWicket}
