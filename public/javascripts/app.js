'use strict'

var app = angular.module('oneStore',['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/',{templateUrl: '/home', controller:'homeCtrl'});
	$routeProvider.when('/login',{templateUrl:'/login', controller:'loginCtrl'});
	$routeProvider.when('/registration',{templateUrl:'/registration',controller:'registrationCtrl'});
	$routeProvider.when('/userHome',{templateUrl:'/userHome',controller:''});
}]);