angular.module('registration', []).controller('RegisterControl', function($scope) {

  $scope.json

  $scope.types = ['User','Vendor'];

  $scope.go = function ( path ) {
  $location.path( path );
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
