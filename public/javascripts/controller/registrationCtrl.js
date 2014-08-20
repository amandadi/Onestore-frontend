'use strict';

app.controller('registrationCtrl',function($scope,$location) {

  $scope.types = ['User','Vendor'];
  var userInfo;
  $scope.save = function(user){
    console.log(user);
  };

  $scope.getCssClasses = function(ngModelContoller) {
    return {
      error: ngModelContoller.$invalid && ngModelContoller.$dirty,
      success: ngModelContoller.$valid && ngModelContoller.$dirty
    };
  };
  
  $scope.showError = function(ngModelController, error) {
    return ngModelController.$error[error];
  };
});