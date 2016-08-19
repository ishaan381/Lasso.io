app.controller('applicantFormCtrl', function(_, $rootScope, $scope, formlyVersion, $q, $http, $stateParams, job, App, $state, JobApplication) {

  $rootScope.$broadcast('applicantView');

  console.log(job);

  $scope.description = JSON.parse(job.jobDescription.fields);
  let application = JSON.parse(job.jobApplication.fields);

  $scope.onSubmit = function(model) {
    App.create($stateParams.jobId, model)
      .then(() => $state.go('afterSubmit'));
  }

  $scope.env = {
    angularVersion: angular.version.full,
    formlyVersion: formlyVersion
  };

  $scope.model = {};

  $scope.options = {};

  $scope.fields = JobApplication.getFields(application);


});
