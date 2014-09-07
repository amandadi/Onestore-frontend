'use strict';

angular.module('registration',[]).controller('registrationCtrl',function($scope,$location, $http) {

  $scope.types = ['User','Vendor'];
  var userInfo;

  $scope.save = function(user){

    console.log(user);
    $http.post('/registrationCheck',user)
    .then(function(msg){
      console.log(msg);
      if(msg.data=='error'){
      $location.path('/error');
      }
      console.log(msg.data);
    });

  };

 
}).directive("passwordVerify", function() {
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


