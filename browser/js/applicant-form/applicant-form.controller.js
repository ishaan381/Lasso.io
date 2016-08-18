app.controller('applicantFormCtrl', function(_, $rootScope, $scope, formlyVersion, $q, $http, $stateParams, job, App, $state, JobApplication) {

  $rootScope.$broadcast('applicantView');

  $scope.description = job.description;
  let application = job.application;

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
