var mongoose  = require('mongoose');


const CricketSeries = new mongoose.Schema({
    seriesName:{type:String, required:true},
    seriesStartDate:{type:String, },
    seriesEndDate:{type:String}

})

const cricketSchema = new mongoose.Schema({
    createdAt: {type:String, default: null,required:true},
    matchStartedAt:{type:String,required:true},
    team1:{type:String,required:true},
    team2:{type:String,required:true},
    tossTeam1:{type:Number,},
    tossTeam2:{type:Number,},
    overs:{type:Number,required:true},
    runningOvers:{type:Number,default:0},
    runningBall:{type:Number,default:0},
    typeOfmatch:{type:String, required:true},
    matchWinTeam1:{type:Number, required:true},
    matchWinTeam2:{type:Number, required:true},
    twoOverSession:{yes:Number,no:Number,active:Boolean},
    sixOverSession:{yes:Number,no:Number,active:Boolean},
    tenOverSession:{yes:Number,no:Number,active:Boolean},
    twentyOverSession:{yes:Number,no:Number,active:Boolean},
    matchScoreRun:{type:Number,default:0},
    matchWicket:{type:Number,default:0},
    gameStatus:{type:Boolean,default:true},
    BattingTeam:{type:String,default:null},
    ballingTeam:{type:String,default:null},
    firstInningOver:{type:Boolean,default:false},
    cricketSeries:{type: mongoose.Schema.Types.ObjectId, ref: 'cricket' },
    transaction:[{ type: mongoose.Schema.Types.ObjectId, ref: 'cricketGame' }],
    totalBetAmount:{type:Number,default:0},
    totalWinAmount:{type:Number,default:0},
    betActive:{type:Boolean,default:true},
    betAmount:{type:Number, default:0},
    winAmount:{type:Number,default:0},
    betStartingTime:{type:Number,default:0},
    betExpiredAt:{type:Number,default:0},
    forSeconds:{type:Boolean,default:false},
    showNewSession:{type:Boolean,default:false},
    disabled:{type:Boolean,default:false},
    settletwoOverSession:{type:Boolean, default:false},
    settlesixOverSession:{type:Boolean, default:false},
    settletenOverSession:{type:Boolean, default:false},
    settletwentyOverSession:{type:Boolean, default:false}


})


const cricketGameSchema = new mongoose.Schema({
    createdAt: {type:String, default: null,required:true},
    typeOfBet:{type:String, required:true},
    betAmount:{type:Number,required:true},
    sessionName:{type:String},
    battingTeam:{type:String,required:true},
    betRate:{type:Number,required:true},
    sessionScore:{type:Number,default:0},
    winAmount:{type:Number,default:0},
    betResult:{type:Boolean,default:false},
    betStatus:{type:String,default:"unsettled"},
    userName:{type:String,required:true},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    game:{ type: mongoose.Schema.Types.ObjectId, ref: 'cricket' },
    team:{type:String,},
    finalSessionScore:{type:Number,default:0},
    finalWinningTeam:{type:String,default:null}



})



const cricketSeries = mongoose.model('cricketSeries',CricketSeries)
const cricket = mongoose.model('cricket',cricketSchema)
const cricketGame = mongoose.model('cricketGame',cricketGameSchema)

module.exports = {cricket,cricketGame,cricketSeries}