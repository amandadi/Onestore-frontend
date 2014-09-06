'use strict'

var app = angular.module('oneStore',['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/',{templateUrl: '/home', controller:'homeCtrl'});
	$routeProvider.when('/login',{templateUrl:'/login', controller:'loginCtrl'});
	$routeProvider.when('/registration',{templateUrl:'/registration',controller:'registrationCtrl'});
	$routeProvider.when('/userHome',{templateUrl:'/userHome',controller:''});
	$routeProvider.when('/error',{templateUrl:'/error',controller:''});
}]);

app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});
