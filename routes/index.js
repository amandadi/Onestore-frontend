var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

/* GET home page. */

var ses;
var isAuthenticate=true;

router.get('/checkUser',function(req,res){

  sessionInit(req,res);

});

router.get('/userHome/*',function(req,res, next){
    console.log("=============interceptor=============");
    var sess=req.session;
    if(sess.authenticate){

        next();
    }
    else{
        res.redirect('/login');
    }



});

router.get('/userHome',function(req,res){

  res.send('<h1>Login Sucessfull!!!!</h1>');


});

router.get('/userHome/test', function(req,res){

  res.send("<h1>test</h1>");
});


router.post('/checkUser',function(req,res){

  sessionInit(req,res);

});

function sessionInit(req, res){
  console.log('=============>>>'+req.body.email);
  ses=req.session;
  ses.authenticate=false;
  if(isAuthenticate){
  ses.authenticate=true;
  res.redirect('/userHome');
  }


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
      // parsed response body as js object
    console.log('**************'+data);
    // raw response
    console.log('###############'+response);
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