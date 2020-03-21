var mongoose  = require('mongoose');


const casinoSchema = new mongoose.Schema({
    createdAt: {type:String, default: new Date().toISOString().slice(0,10)},

    startedAt: {type:Number, required:true},
    gameResult:{type:Number, default:null},
    participants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    expiredAt: {type:Number, required:true},
    zeroNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    oneNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    twoNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    threeNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    fourNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    fiveNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    sixNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    sevenNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    eightNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    nineNumber:[{minimumAmount:{type:Number,default:null},maximumAmount:{type:Number,default:null},betAmount:{type:Number,default:0}}],
    gameStatus:{type:Boolean,default:true},
    transaction:[{ type: mongoose.Schema.Types.ObjectId, ref: 'casinoGame' }],
    betAmount:{type:Number,default:0},
    winAmount:{type:Number,default:0},



})


const casinoGameSchema = new mongoose.Schema({
    createdAt: {type:String, default: new Date().toISOString().slice(0,10)},
    game:{ type: mongoose.Schema.Types.ObjectId, ref: 'casino' },
    zeroNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    oneNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    twoNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    threeNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    fourNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    fiveNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    sixNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    sevenNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    eightNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    nineNumber:[{amount:{type:Number,default:null},status:{type:Boolean,default:null}}],
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    userName:{type:String, required:true},
    winAmount:{type:Number,default:0},
    betAmount:{type:Number,default:0}


})




const casino = mongoose.model('casino',casinoSchema)
const casinoGame = mongoose.model('casinoGame',casinoGameSchema)

module.exports = {casino,casinoGame}