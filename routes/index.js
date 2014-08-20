var express = require('express');
var router = express.Router();

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