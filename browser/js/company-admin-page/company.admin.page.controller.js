'use strict';

app.controller('PageAdmin', function ($scope, $rootScope, jobs, admin, $state, AuthService, User, Company) {


	jobs.forEach(job => job.jobDescription.fields = JSON.parse(job.jobDescription.fields));
	$scope.jobs = jobs;
	Company.getUsers(admin.companyId)
	.then(function(users){
		$scope.users = users
	});

	$scope.isPageAdmin = function(){
		return admin.isCompanyAdmin;
	}

	$scope.deleteUser = function(user){
			User.delete(user)
			var index = $scope.users.indexOf(user);
			if(index !== -1) {
				$scope.users.splice(index, 1);
			}
		}

	$scope.deletePosting = function(job) {
		Job.remove(job.id);
		var index = $scope.jobs.indexOf(job);
		if(index !== -1) {
			$scope.jobs.splice(index, 1);
		}
	}
	});