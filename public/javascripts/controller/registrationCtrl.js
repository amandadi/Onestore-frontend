'use strict';

app.controller('registrationCtrl',function($scope,$location, $http) {

  $scope.types = ['User','Vendor'];
  var userInfo;

  $scope.save = function(user){

    console.log(user);
    $http.post('/registrationCheck',user)
    .then(function(msg){

      if(msg.data=='error'){
      $location.path('/error');
      }
      console.log(msg.data);
    });

  };

 
});

