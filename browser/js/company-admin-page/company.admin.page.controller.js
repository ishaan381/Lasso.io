'use strict';

app.controller('PageAdmin', function ($scope, $rootScope, $state, AuthService, User, Company) {

	AuthService.getLoggedInUser()
	.then(user => {
		$scope.user = user;
	});

	$scope.getUsers = function(){
		return Company.getUsers($scope.company)
		.then(function(users){
			$scope.users = users;
		})
	};


	$scope.isPageAdmin = function(){
		return $scope.user.isCompanyAdmin;
	}

});