var DB = require('../db/cricketGame')
var casioSocket = require('../app')


let getCricketBet = (req,res)=>{
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
                    {'createdAt' : filter},
                ]
            }
        }else{
            where_search = {
            }
        } 
        DB.cricket.countDocuments(where_search, function (err , totalCount ){
            console.log('================yahaayayayayyayya=============',where_search)
            if (err) {
                res.json({msg: "error in fetching"})
            }
            query.skip = size * (pageNo - 1)
            query.limit = size
            DB.cricket.find(where_search,{'createdAt':1,'team1':1,'team2':1,'totalBetAmount':1,'totalWinAmount':1,'sixOverSession':1,'twentyOverSession':1,'matchWinTeam1':1,'matchWinTeam2':1,'team1':1,'team2':1,'tenOverSession':1,'winAmount':1,'startedAt':1,}).exec(function(err, docs){
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
            console.log('================yahaayayayayyayya=====333========')

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
                console.log('================yahaayayayayyayya=====333========')

                console.log("==========ss",err, totalCount)
                if (err) {
                    res.json({msg: "error in fetching"})
                }
                DB
                    .cricket
                    .find({gameStatus:true}, {}, query, function (err , data ) {
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
    }
}





module.exports={getCricketBet}