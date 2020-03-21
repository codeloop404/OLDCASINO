var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    console.log('checking')
   res.render('index')
})

router.get('/login',(req,res) =>{
    res.render('login')
})

router.get('/contact', (req,res) => {
    res.render('contact-us')
})

router.get('/faq', (req,res) => {
    res.render('faq')
})

router.get('/howitworks', (req,res) => {
    res.render('how-it-works')
})

router.get('/status2', (req,res) => {
    res.render('status-2')
})

router.get('/status3', (req,res) => {
    res.render('status-3')
})

router.get('/status4', (req,res) => {
console.log('status 444444',req.headers.cookie)
// if(req.headers.cookie){
//     res.render('status-3')
// }else{
    res.render('status-4')
// }
})

router.get('/status5', (req,res) => {
    res.render('status-5')
})

router.get('/status6', (req,res) => {
    res.render('status-6')
})

router.get('/status', (req,res) => {
    res.render('status')
})


module.exports = router;