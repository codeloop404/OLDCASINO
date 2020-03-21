var DB = require('../db/user')

const bcrypt = require('bcrypt');

let addUser = (req, res)=>{
    if(req.body.userName == null || req.body.userName == undefined || req.body.password == null || req.body.password == undefined){
        return res.send({status:false, message:"Please Provide All Required Information"})
    }else{
        DB.user.findOne({userName:req.user.userName}).then((USER)=>{
            if(!USER){
                return res.send({status:false, message:"Technical Error"})

            }
            else if(USER.walletBalance < req.body.walletBalance){
                return res.send({status:false, message:"Fill Your Account"})

            }
            else{
                DB.account.findOne({userName:req.user.userName}).then((masterAccount)=>{
                    if(!masterAccount){

                    }else{
                        DB.user.findOne({userName:req.body.userName}).then((user)=>{
                            if(!user){
                                bcrypt.hash(req.body.password, 10).then(function(hash) {
                                    var user = new DB.user ({
                                        userName: req.body.userName,
                                        password: hash,
                                        walletBalance:req.body.walletBalance,
                                        masterAdmin:req.user.userName,
                                        userType: 1,
                                        
                                    })
                                    var deposit = new DB.deposit({
                                        userName:req.body.userName,
                                        accountHolderName: user,
                                        amount:req.body.walletBalance

                                    })
                                    var account = new DB.account({
                                        userName:req.body.userName,
                                        accountHolderName: user,
                                        walletBalance:req.body.walletBalance,
                                        amountDepositedByMaster:req.body.walletBalance,
                                        userType: true,
                                        depositTransaction:deposit

                                    })
                                    deposit.save()
                                    masterAccount.walletBalance = masterAccount.walletBalance - req.body.walletBalance
                                    masterAccount.save()
                                    account.save()
                                    console.log("==========1234========",user)
                                    user.save().then((saved)=>{
                                        if(!saved){
                                            return res.send({status:false, message:"Technical Error"})
                    
                                        }else{
                                            USER
                                            .ref
                                            .push(user);
                                        USER.save().then((resp)=>{
                                            console.log("=====12342323========",resp)
                                            if(!resp){
                                                return res.send({status:false, message:"Technical Error"})
                        
                                            }else{
                                                DB.user.findOneAndUpdate({userName:req.user.userName},{$inc:{walletBalance:-req.body.walletBalance}}).then((adminbalaceupdated)=>{
                                                    if(!adminbalaceupdated){
                                                        return res.send({status:false, message:"Technical Error"})
        
                                                    }else{
                                                        return res.send({status:true, message:"User Added Sucessfully"})
        
                                                    }
                                                })
        
                                                // return res.send({status:true, message:"User Added Sucessfully"})
                                            }
                                        }).catch((error)=>{
                                            console.log("========error=========",error)
                                        });
        
                                            
                    
                                        }
                                    })
                    
                                })
                            }else{
                                return res.send({status:false, message:"User EXIST"})
                            }
                        })
                    }
                })
               
            }
        })
   
}
}

let loginUser = (req,res)=>{
    console.log("====itegrated",req.body)
    if(req.body.userName == null || req.body.userName == undefined || req.body.password == undefined || req.body.password == null){
              return res.send({status:false, message:"Please provide All Informatio"})
    }
    else{
        DB.user.findOne({userName:req.body.userName}).then((user)=>{
            if(!user){
                return res.send({status:false, message:"User Not Found"})

            }if(user.blocked){
                return res.send({status:false, message:"Your Account Has Benen Blocked Kindly Contact To Provider"})

            }
             if(user.superAdmin){
                bcrypt.compare(req.body.password, user.password, function(err, response) {
                    if(err){
                      return  res.send({status:false, message:"Please Try After Some Time"})
                    }else if(response == true){
                        const token = user.generateJwt()
                       return res.send({status:true, message:"Login SucessfullY", superAdmintoken:token, superAdmin:true})
                    }
                    else{

                     return   res.send({status:false, message:"Please Enter Correct Password"})
                    }
                }); 
            }
            else{
                if(user.userType == 0){
                bcrypt.compare(req.body.password, user.password, function(err, response) {
                    if(err){
                     return   res.send({status:false, message:"Please Try After Some Time"})
                    }else if(response == true){
                        const token = user.generateJwt()
                      return  res.send({status:true, message:"Login SucessfullY", masterAdmintoken:token, masterAdmin:true})
                    }
                    else{

                       return res.send({status:false, message:"Please Enter Correct Password"})
                    }
                });

            }
            else if(user.userType == 1){
                bcrypt.compare(req.body.password, user.password, function(err, response) {
                    if(err){
                    return    res.send({status:false, message:"Please Try After Some Time"})
                    }else if(response == true){
                        const token = user.generateJwt()
                      return  res.send({status:true, message:"Login SucessfullY", usertoken:token, user:true})
                    }
                    else{

                      return  res.send({status:false, message:"Please Enter Correct Password"})
                    }
                });
            }
            
        }
        })
    }
}

let addMasterAdmin = (req, res)=>{
    console.log("==================this is coming========",req.body)
    if(req.body.userName == null || req.body.userName == undefined || req.body.password == null || req.body.password == undefined){
        return res.send({status:false, message:"Please Provide All Required Information"})
    }else{
        DB.user.findOne({userName:req.user.userName}).then((superadmin)=>{
            if(!superadmin){
                return res.send({status:false, message:"You Are Not Authanticated"})

            }else{
                DB.user.findOne({userName:req.body.userName}).then((user)=>{
                    if(!user){
                        bcrypt.hash(req.body.password, 10).then(function(hash) {
                            var masterAdmin = new DB.user ({
                                userName: req.body.userName,
                                masterAdmin:req.user.userName,
                                walletBalance:req.body.walletBalance,
                                password: hash,
                                userType: 0,
                                Commission:req.body.Commission

                                
                            })
                            var deposit = new DB.deposit({
                                userName:req.body.userName,
                                accountHolderName: user,
                                amount:req.body.walletBalance

                            })
                            var account = new DB.account({
                                userName:req.body.userName,
                                accountHolderName: masterAdmin,
                                walletBalance:req.body.walletBalance,
                                amountDepositedByMaster:req.body.walletBalance,
                                userType: false,
                                depositTransaction:deposit
                            })
                            deposit.save()
                            account.save()
                            masterAdmin.save().then((saved)=>{
                            
                                if(!saved){
                                    return res.send({status:false, message:"Technical Error"})
            
                                }else{
                                    DB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:-req.body.walletBalance}}).then((adminbalaceupdated)=>{
                                        if(!adminbalaceupdated){
                                            return res.send({status:false, message:"Technical Error"})

                                        }else{

                                            return res.send({status:true, message:"Master Admin Added Sucessfully"})

                                        }
                                    })

                                            // return res.send({status:true, message:"Master Admin Added Sucessfully"})
            
                                }
                            }).catch((error)=>{
                                console.log("=============yh hai error===========",error)
                            })
            
                        })
                    }else{
                        return res.send({status:false, message:"This Username Is already regiterd"})
                    }
                })
            }
        })

   
}
}
// let addMasterAdmin = (req, res)=>{
//     console.log("==================this is coming========",req.body)
//     if(req.body.userName == null || req.body.userName == undefined || req.body.password == null || req.body.password == undefined){
//         return res.send({status:false, message:"Please Provide All Required Information"})
//     }else{
//         // DB.user.findOne({userName:req.user.userName}).then((superadmin)=>{
//             // if(!superadmin){
//             //     return res.send({status:false, message:"You Are Not Authanticated"})

//             // }else{
//                 DB.user.findOne({userName:req.body.userName}).then((user)=>{
//                     if(!user){
//                         bcrypt.hash(req.body.password, 10).then(function(hash) {
//                             var masterAdmin = new DB.user ({
//                                 userName: req.body.userName,
//                                 masterAdmin:"SuperAdmin",
//                                 walletBalance:req.body.walletBalance,
//                                 password: hash,
//                                 userType: 0,
//                                 // createdAt: new Date(),
//                                 Commission:req.body.Commission

                                
//                             })
//                             masterAdmin.save().then((saved)=>{
                            
//                                 if(!saved){
//                                     return res.send({status:false, message:"Technical Error"})
            
//                                 }else{
//                                     // DB.user.findOneAndUpdate({userName:"ranjeetSuperAdmin21"},{$inc:{walletBalance:-req.body.walletBalance}}).then((adminbalaceupdated)=>{
//                                     //     if(!adminbalaceupdated){
//                                     //         return res.send({status:false, message:"Technical Error"})

//                                     //     }else{
//                                     //         return res.send({status:true, message:"Master Admin Added Sucessfully"})

//                                     //     }
//                                     // })

//                                             return res.send({status:true, message:"Master Admin Added Sucessfully"})
            
//                                 }
//                             }).catch((error)=>{
//                                 console.log("=============yh hai error===========",error)
//                             })
            
//                         })
//                     }else{
//                         return res.send({status:false, message:"This Username Is already regiterd"})
//                     }
//                 })
//             // }
//         // })

   
// }
// }

let getAllMasterUsers = (req,res)=>{
    try {
        DB
        .user
        .findOne({userName:req.user.userName})
        .populate(['ref'])
        .exec(function (err , transaction ) {
        //   console.log("==================",err,transaction.ref)
          if(err){
              res.send({status:false, message:"Technical Error"})
          }else{
            res.send({status:true, message:"Technical Error",userList:transaction.ref})
          }
        })
  
    } catch (error) {
        res.send({status:false, message:"Technical Error"})

    }
}

let getAllUsers = (req,res)=>{
    DB.user.find({userType:1}).then((user)=>{
        if(!user){
            res.send({status:false, message:"Technical Error"})

        }else{
            res.send({status:true, message:"Technical Error",userList:user})

        }
    })
}

let getAllMasterAdmin = (req,res)=>{
    console.log("======yh ayayyya================eeeeeeeegetall master",req.body)
    // try {
    //     DB.user.find({userType:0}).then((user)=>{
    //         if(!user){
    //             res.send({status:false, message:"Technical Error"})
    
    //         }else{
    //             res.send({status:true, message:"Sucessfull",userList:user})
    
    //         }
    //     })
    // } catch (error) {
        
    // }
    try{
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
                    {'userName' : filter},
                    {'createdAt' : filter},
                ]
            }
        }else{
            where_search = {
            }
        } 
        DB.user.countDocuments(where_search, function (err , totalCount ){
            console.log('================yahaayayayayyayya=============')
            if (err) {
                res.json({msg: "error in fetching"})
            }
    
            DB.user.find(where_search,{'userName':1,'walletBalance':1,'masterAdmin':1,'createdAt':1}).exec(function(err, docs){
               console.log('=======yh chal raha name',docs)
                if (err) {
                    // logger.info("paginatin", err)
                    res.json({msg: "error"})
                } 
    
                else {
                    var totalPages = Math.ceil(totalCount / size)
                    var response = {
                        "message": docs,
                        "pages": totalPages
                    };
                }
                res.json(response);
               var all_items = docs;
    
            });
        })
    
        }
        else{
            // console.log('================yahaayayayayyayya=====333========')

        if (pageNo < 0 || pageNo === 0) {
            console.log('================yahaayayayayyayya=====000000300000========')

            return res.json({msg: "invalid"})
        }
        // console.log(size,pageNo,'pageNo ')
        // console.log('================yahaayayayayyayya=====333========')

        // query.skip = size * (pageNo - 1)
        // query.limit = size
        console.log('================yahaayayayayyayya=====30000000033========',query)
        DB.user
            .countDocuments({}, function (err , totalCount ) {
                console.log('================yahaayayayayyayya=====333========')

                console.log("==========ss",err, totalCount)
                if (err) {
                    res.json({msg: "error in fetching"})
                }
                DB
                    .user
                    .find({userType:0}, {}, query, function (err , data ) {
                        console.log("=============000000000000======",err,data)
                        if (err) {
                            res.json({msg: "error"})
                        } else {
                            var totalPages = Math.ceil(totalCount / size)
                            // console.log("uuuuuuuuuuu", totalPages)
                            var response = {
                                "error": false,
                                "message": data,
                                "pages": totalPages
                            };
                        }
                        res.json(response);
                    });
            })
        }
    }catch(err){
        res.send({status:false, msg:'techtx'})
        // logger.info("pagination err:-"+ err)
    }

}


 let blockUser = (req,res)=>{
     try {
         DB.user.findById(req.body.id).then((user)=>{
             if(!user){
                 return  res.send({status:false, message:"Technical Error"})
             }else{
                 user.blocked = true
                 user.save().then((saved)=>{
                     if(!saved){
                        return  res.send({status:false, message:"Technical Error"})
 
                     }else{
                        return  res.send({status:true, message:"User Blocked Successfully"})

                     }
                 })
             }
         })
     } catch (error) {
        return  res.send({status:false, message:"Technical Error"})

     }
 }


 let unblockUser = (req,res)=>{
    try {
        DB.user.findById(req.body.id).then((user)=>{
            if(!user){
                return  res.send({status:false, message:"Technical Error"})
            }else{
                user.blocked = false
                user.save().then((saved)=>{
                    if(!saved){
                       return  res.send({status:false, message:"Technical Error"})

                    }else{
                       return  res.send({status:true, message:"User Unblocked Successfully"})

                    }
                })
            }
        })
    } catch (error) {
       return  res.send({status:false, message:"Technical Error"})

    }
 }
let getUserbyuserName = (req,res)=>{
    console.log("=============yha aya=============",req.body)
    try {
        DB.user.findById(req.body.id).then((user)=>{
            if(!user){
                return  res.send({status:false, message:"Technical Error"})
            }else{
               return  res.send({status:true, user:user})
           
            }
        })
    } catch (error) {
        
    }
}

let getMasterByUser = (req,res)=>{
    try {
        console.log("=============yha aya========999999999=====",req.body)

        DB.user.findById(req.body.id).then((user)=>{
            if(!user){
                return  res.send({status:false, message:"Technical Error"})
            }else{
               DB.user.findOne({userName:user.masterAdmin}).then((masterAdmin)=>{
                   if(!masterAdmin){

                   }else{
                       return res.send({status:true, masterAdminComission:masterAdmin.Commission})
                   }
               })
           
            }
        })
    } catch (error) {
        
    }
}

let getAccountDetail = (req,res)=>{
    try{
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
                    {'userName' : filter},
                    {'createdAt' : filter},
                ]
            }
        }else{
            where_search = {
            }
        } 
        DB.account.countDocuments(where_search, function (err , totalCount ){
            console.log('================yahaayayayayyayya=============',where_search)
            if (err) {
                res.json({msg: "error in fetching"})
            }
    
            DB.account.find(where_search,{'userName':1,'walletBalance':1,'amountDepositedByMaster':1,'createdAt':1}).exec(function(err, docs){
               console.log('=======yh chal raha name',docs)
                if (err) {
                    // logger.info("paginatin", err)
                    res.json({msg: "error"})
                } 
    
                else {
                    var totalPages = Math.ceil(totalCount / size)
                    var response = {
                        "message": docs,
                        "pages": totalPages
                    };
                }
                res.json(response);
               var all_items = docs;
    
            });
        })
    
        }
        else{
            // console.log('================yahaayayayayyayya=====333========')

        if (pageNo < 0 || pageNo === 0) {
            console.log('================yahaayayayayyayya=====000000300000========')

            return res.json({msg: "invalid"})
        }
        // console.log(size,pageNo,'pageNo ')
        // console.log('================yahaayayayayyayya=====333========')

        // query.skip = size * (pageNo - 1)
        // query.limit = size
        console.log('================yahaayayayayyayya=====30000000033========',query)
        DB.account
            .countDocuments({}, function (err , totalCount ) {
                console.log('================yahaayayayayyayya=====333========')

                console.log("==========ss",err, totalCount)
                if (err) {
                    res.json({msg: "error in fetching"})
                }
                DB
                    .account
                    .find({}, {}, query, function (err , data ) {
                        console.log("=============000000000000======",err,data)
                        if (err) {
                            res.json({msg: "error"})
                        } else {
                            var totalPages = Math.ceil(totalCount / size)
                            // console.log("uuuuuuuuuuu", totalPages)
                            var response = {
                                "error": false,
                                "message": data,
                                "pages": totalPages
                            };
                        }
                        res.json(response);
                    });
            })
        }
    }catch(err){
        res.send({status:false, msg:res.__('techtx')})
        logger.info("pagination err:-"+ err)
    }
}

let getAccountDetailofUser = async (req,res)=>{
    try {
      var userAccount = await  DB .account.find({userType:true})
      if(userAccount){
            return res.send({status:true, data:userAccount})
      }else{
        return res.send({status:false, message:"UserAcccount"})

      }
    } catch (error) {
        
    }
} 
let getAccountDetailofClient = async (req,res)=>{
    try {
      var userAccount = await  DB .account.find({userType:false})
      if(userAccount){
            return res.send({status:true, data:userAccount})
      }else{
        return res.send({status:false, message:"UserAcccount"})

      }
    } catch (error) {
        
    }
} 


let getCasinoTransactionByAccount = (req,res)=>{ 
    DB.account.findOne({_id:req.body.id}).populate(['casinotransaction']).exec(function(err, items) {
        console.log("=============123344=====sexxxx=======",items);
        if(items){
            return res.send({status:true, message:"", data:items.casinotransaction})
        }
    });
}

let getCricketTransactionByAccount = (req,res)=>{ 
    DB.account.findOne({_id:req.body.id}).populate(['cricketTransaction']).exec(function(err, items) {
        console.log("=============123344=====sexxxx=======",items);
        if(items){
            return res.send({status:true, message:"", data:items.cricketTransaction})
        }
    });
}

let getDepositTransactionByAccount = (req,res)=>{ 
    DB.account.findOne({_id:req.body.id}).populate(['depositTransaction']).exec(function(err, items) {
        console.log("=============123344=getDepositTransactionByAccount====sexxxx=======",items);
        if(items){
            return res.send({status:true, message:"", data:items.depositTransaction})
        }
    });
}
let getWithdrawTransactionByAccount = (req,res)=>{ 
    DB.account.findOne({_id:req.body.id}).populate(['withdraw']).exec(function(err, items) {
        console.log("=============123344=====sexxxx=======",items);
        if(items){
            return res.send({status:true, message:"", data:items.casinotransaction})
        }
    });
}


let getDepositTransactionByUser = async(req,res)=>{ 
    try {
        var deposit = await DB.deposit.find({userName:req.user.userName})
        console.log(deposit)
        if(deposit){
         return res.send({status:true, message:"", data:deposit})
 
        }else{
         return res.send({status:false, message:"", })
 
        }
     } catch (error) {
         
     }
}
let getWithdrawTransactionByUser = async(req,res)=>{ 
    try {
        var withdraw = await DB.withdraw.find({userName:req.user.userName})
        console.log(withdraw)
        if(withdraw){
         return res.send({status:true, message:"", data:withdraw})
 
        }else{
         return res.send({status:false, message:"", })
 
        }
     } catch (error) {
         
     }
}

let changePassword = (req,res)=>{
    try {
        console.log("======iski maa ka change password=================",req.body,req.body.userid)
        DB.user.findById(req.body.userid).then((changeuser)=>{
            console.log(changeuser,"millllllllaaaa")
            if(!changeuser){
                return res.send({status:false, message:"User Not Found"})

            }else{
                bcrypt.hash(req.body.password, 10).then(function(hash) {
                    changeuser.password  = hash
                    changeuser.save().then((saved)=>{
                        if(!saved){
                            return res.send({status:false, message:"Not Updated Successfully"})

                        }else{
                            return res.send({status:true, message:"Updated Successfully"})
                        }
                    })
                })

            }
        }).catch((error)=>{
            console.log("catch=========",error)
        })
    } catch (error) {
        console.log("try =========catch=========",error)

    }
}
let changePasswordbyUser = (req,res)=>{
    try {
        console.log("======iski maa ka change password=================",req.body,req.body.userid)
        DB.user.findById(req.user._id).then((changeuser)=>{
            console.log(changeuser,"millllllllaaaa")
            if(!changeuser){
                return res.send({status:false, message:"User Not Found"})

            }else{
                bcrypt.hash(req.body.password, 10).then(function(hash) {
                    changeuser.password  = hash
                    changeuser.save().then((saved)=>{
                        if(!saved){
                            return res.send({status:false, message:"Not Updated Successfully"})

                        }else{
                            return res.send({status:true, message:"Updated Successfully"})
                        }
                    })
                })

            }
        }).catch((error)=>{
            console.log("catch=========",error)
        })
    } catch (error) {
        console.log("try =========catch=========",error)

    }
}

let fillAccount = (req,res)=>{
    try {
        // DB.user.findOneAndUpdate({userName:req.user.userName},{$inc:{walletBalance:-req.body.walletBalance}}).then((adminbalaceupdated)=>{

       DB.user.findOneAndUpdate({_id:req.body.userid},{$inc:{walletBalance:req.body.fillAmount}}).then((userUpdated)=>{
           if(userUpdated){
            DB.user.findOneAndUpdate({userName:userUpdated.masterAdmin},{$inc:{walletBalance:-req.body.fillAmount}}).then((masterUpdated)=>{
                if(masterUpdated){
                    // return res.send({status:true, message:"Wallet Updated"})
                    DB.account.findOne({userName:userUpdated.userName}).then((userAccount)=>{
                        if(userAccount){
                            var deposit = new DB.deposit({
                                userName:userUpdated.userName,
                                accountHolderName: userUpdated,
                                amount:req.body.fillAmount

                            })
                            deposit.save()
                            userAccount.depositTransaction.push(deposit)
                            userAccount.walletBalance =  parseInt(userAccount.walletBalance )+ parseInt (req.body.fillAmount)
                            userAccount.amountDepositedByMaster = parseInt (userAccount.amountDepositedByMaster) +parseInt( req.body.fillAmount)
                            userAccount.lastDepositDate = new Date().toISOString().substring(0, 10)
                            userAccount.save().then((usersaved)=>{
                                if(usersaved){
                                    masterUpdated.walletBalance =  parseInt(masterUpdated.walletBalance ) - parseInt(req.body.fillAmount)
                                    // masterUpdated.amountDepositedByMaster = parseInt(masterUpdated.amountDepositedByMaster) + parseInt(req.body.fillAmount)
                                    // masterUpdated.lastDepositDate = new Date().toISOString().substring(0, 10)
                                    masterUpdated.save().then((mastersaved)=>{
                                        if(mastersaved){
                                        return res.send({status:true, message:"Wallet Updated"})
   
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    return res.send({status:false, message:"Technical Error"})

                }
            })

           }else{
            return res.send({status:false, message:"Technical Error"})
  
           }
       }) 
    } catch (error) {
        
    }
}

let withdrawAccount = (req,res)=>{
    try {
        // DB.user.findOneAndUpdate({userName:req.user.userName},{$inc:{walletBalance:-req.body.walletBalance}}).then((adminbalaceupdated)=>{

       DB.user.findOneAndUpdate({_id:req.body.userid},{$inc:{walletBalance:-req.body.fillAmount}}).then((userUpdated)=>{
           if(userUpdated){
            DB.user.findOneAndUpdate({userName:userUpdated.masterAdmin},{$inc:{walletBalance:+req.body.fillAmount}}).then((masterUpdated)=>{
                if(masterUpdated){
                    // return res.send({status:true, message:"Wallet Updated"})
                    DB.account.findOne({userName:userUpdated.userName}).then((userAccount)=>{
                        if(userAccount){
                            var withdraw = new DB.withdraw({
                                userName:userUpdated.userName,
                                accountHolderName: userUpdated,
                                amount:req.body.fillAmount

                            })
                            withdraw.save()
                            userAccount.withdrawTransaction.push(withdraw)
                            userAccount.walletBalance =  parseInt(userAccount.walletBalance ) - parseInt (req.body.fillAmount)
                            userAccount.amountDepositedByMaster = parseInt (userAccount.amountDepositedByMaster) -parseInt( req.body.fillAmount)
                            userAccount.lastDepositDate = new Date().toISOString().substring(0, 10)
                            userAccount.save().then((usersaved)=>{
                                if(usersaved){
                                    masterUpdated.walletBalance =  parseInt(masterUpdated.walletBalance ) + parseInt(req.body.fillAmount)
                                    // masterUpdated.amountDepositedByMaster = parseInt(masterUpdated.amountDepositedByMaster) + parseInt(req.body.fillAmount)
                                    // masterUpdated.lastDepositDate = new Date().toISOString().substring(0, 10)
                                    masterUpdated.save().then((mastersaved)=>{
                                        if(mastersaved){
                                        return res.send({status:true, message:"Wallet Updated"})
   
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    return res.send({status:false, message:"Technical Error"})

                }
            })

           }else{
            return res.send({status:false, message:"Technical Error"})
  
           }
       }) 
    } catch (error) {
        
    }
}

let updateStakeClient = (req,res)=>{
    try {
        DB.user.findOneAndUpdate({_id:req.body.userid},{$set:{Commission:req.body.Commission}}).then((userUpdated)=>{
            if(userUpdated){
                return res.send({status:true, message:"Stake Updated"})

            }else{
                return res.send({status:false, message:"Stake Not Updated"})

            }

        })
        } catch (error) {
        
    }
}


let getAllDeposit = async(req,res)=>{
    try {
       var deposit = await DB.deposit.find()
       console.log(deposit)
       if(deposit){
        return res.send({status:true, message:"", data:deposit})

       }else{
        return res.send({status:false, message:"", })

       }
    } catch (error) {
        
    }
}

let getAllWithdraw = async(req,res)=>{
    try {
       var withdraw = await DB.withdraw.find()
       console.log(withdraw)
       if(withdraw){
        return res.send({status:true, message:"", data:withdraw})

       }else{
        return res.send({status:false, message:"", })

       }
    } catch (error) {
        
    }
}






module.exports = {getWithdrawTransactionByUser,getDepositTransactionByUser,getAllWithdraw,getAllDeposit,withdrawAccount,getWithdrawTransactionByAccount,getDepositTransactionByAccount,updateStakeClient,getAccountDetailofClient,getAccountDetailofUser,changePasswordbyUser,fillAccount,changePassword,getCricketTransactionByAccount,getCasinoTransactionByAccount,getAccountDetail,getMasterByUser,getUserbyuserName,blockUser,addUser,addMasterAdmin,loginUser,getAllMasterUsers,getAllUsers,getAllMasterAdmin,unblockUser}