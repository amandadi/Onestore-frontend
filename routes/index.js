var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/home',function(req,res){
	res.render('home',{});
});

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.get('/registration', function(req, res) {
  res.render('registration', {});
});

router.post('/registrationCheck',function(req,res){

var body=req.body;
var address=body.address;

delete body.address;
var addlist=[];
addlist.push(address);

body.userAddresses=addlist;
var data=JSON.stringify(body);

var args = {data:data,headers:{"Content-Type": "application/json"} };

client.post("http://localhost:8080/OneStoreServiceRouter/userinfo", args, function(data,response) {
      // parsed response body as js object
    console.log('**************'+data);
    // raw response
    console.log('###############'+response);
res.send('registrationsuccess');
}
    ).on('error',function(err){
            console.log('something went wrong on the request', err.request.options);
            res.send('error');
        });

});

router.get('/error', function(req, res) {
  res.render('error', {});
});

router.get('/vendor-form', function(req, res) {
  res.render('vendor-form', {});
});

router.get('/address-form', function(req,res){
	res.render('address-form',{});
});

router.get('/userHome',function(req,res){
	res.render('userHome',{});
});

module.exports = router;