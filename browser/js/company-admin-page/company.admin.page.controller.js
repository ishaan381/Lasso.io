'use strict';

app.controller('PageAdmin', function ($scope, $rootScope, admin, $state, AuthService, User, Company) {

	Company.getUsers(admin.companyId)
	.then(function(users){
		$scope.users = users
	});

	$scope.isPageAdmin = function(){
		return admin.isCompanyAdmin;
	}

	$scope.delete = function(user){
			User.delete(user)
			var index = $scope.users.indexOf(user);
			if(index !== -1) {
				$scope.users.splice(index, 1);
			}
		}
	});