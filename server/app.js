let express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
const casinoServer = require('http').createServer(app);
const casioSocket = require('socket.io')(casinoServer);
module.exports = casioSocket
// 
var mongoose  = require('mongoose');
var jwt = require('jsonwebtoken');
const viewRoutes = require('./routes/view');
const apiRoutes = require('./routes/api');
const path = require('path')

var DB = require('./db/user')
// console.log("============",DB)

var userService = require("./controller/userService")
var casinoGameService = require('./controller/casinoGameService')
var adminCricketController = require('./controller/adminCricketController')

const port =  8080;

var url = "mongodb://127.0.0.1:27017/CASINO"

    app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'public')))
//Routes of view & api
app.use('/', viewRoutes)
app.use('/api', apiRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//error show if anything wrong in db and its query
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url, { useNewUrlParser: true }).then(
  (res) => {
    console.log("Connected to Database Successfully...");
  }
).catch((er)=>{
  console.log("Connection fail to Database...",er);
})

 

app.get('/',function(req,res){
  res.send('Hello World')
})






    casinoServer.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    
    // module.exports = io