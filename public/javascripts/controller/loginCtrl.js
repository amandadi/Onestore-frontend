'use strict'

app.controller('loginCtrl', function($scope,$location){

	$scope.login=function(user){
		console.log(user);
		$location.path('/userHome');
	};
});