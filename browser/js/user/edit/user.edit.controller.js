'use strict';

app.controller('UserEdit', function ($scope, $rootScope, $state, AuthService, User, $log) {

	AuthService.getLoggedInUser()
	.then(user => {
		$scope.user = user;
	});


	$scope.edit = function(){
		var login = {
			email: $scope.user.email,
			password: $scope.user.oldpassword
		}
		AuthService.login(login)
		.then( function(){
			return User.edit($scope.user)
		})
		.then(function(user){
			$rootScope.user = user;
			$scope.$evalAsync();
			$state.go('postings');
		}).catch(function (err) {
            $scope.error = err.message;
        })
	}
});