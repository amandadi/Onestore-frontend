var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

/* GET home page. */

var ses;
var isAuthenticate=false;



router.get('/user/*',function(req,res, next){
    console.log("=============interceptor=====userHome========");
    var sess=req.session;
    if(sess.authenticate && sess.role=='User'){

        next();
    }
    else{
        res.redirect('/login');
    }
});


router.get('/vendor/*',function(req,res, next){
    console.log("=============interceptor=======vendorHome======");
    var sess=req.session;
    if(sess.authenticate && sess.role=='Vendor'){

        next();
    }
    else{
        res.redirect('/login');
    }
});

router.get('/vendor/home',function(req,res){

  res.render('vendorHome',{});
});

router.get('/user/home',function(req,res){

  res.render('userHome',{});
});

router.get('/user/test', function(req,res){

  res.send("<h1>test</h1>");
});


router.post('/checkUser',function(req,res){

  sessionInit(req,res);

});

function sessionInit(req, res){
  
  ses=req.session;
  ses.authenticate=false;

  var data=JSON.stringify(req.body);
  var args = {data:data,headers:{"Content-Type": "application/json"} };
  client.post("http://localhost:8080/OneStoreServiceRouter/authenticate", args, function(data,response) {
        console.log("========response========"+data)
        if(data!='authenticationfail'){
          isAuthenticate=true;
          console.log('==========data========'+data);
          
          if(isAuthenticate){
          ses.authenticate=true;
          
          if(data=='User'){
          ses.role=data;
          res.redirect('/user/home');
          }
          if(data=='Vendor'){
            ses.role=data;
          res.redirect('/vendor/home');
          }
          }
          else{
            res.redirect('/login');
          }
        }


}
    ).on('error',function(err){
            console.log('something went wrong on the request', err.request.options);
            res.send('error');
        });
  
}

router.get('/', function(req, res) {
  res.render('home', {});
});

/*router.get('/home',function(req,res){
  res.render('home',{});
});*/

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.get('/registration', function(req, res) {
  res.render('registration', {});
});

router.post('/registrationCheck',function(req,res){

var body=JSON.parse(req.body.user);
var address=body.address;
console.log('$$$$$$$$$$$$$'+body);
delete body.address;
var addlist=[];
addlist.push(address);

body.userAddresses=addlist;
var data=JSON.stringify(body);
console.log("-----------------------"+data);
var args = {data:data,headers:{"Content-Type": "application/json"} };

client.post("http://localhost:8080/OneStoreServiceRouter/userinfo", args, function(data,response) {
      
res.redirect('/registrationsuccess');
}
    ).on('error',function(err){
            console.log('something went wrong on the request', err.request.options);
            res.send('error');
        });

});

router.get('/registrationsuccess',function(req, res) {
  res.send('registrationsuccess');
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

/*router.get('/userHome',function(req,res){
  res.render('userHome',{});
});*/

module.exports = router;