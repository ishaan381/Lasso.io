
app.controller('applicantFormCtrl', function($rootScope, $scope, formlyVersion, $stateParams, job, App, $state, JobApplication) {

  $rootScope.$broadcast('applicantView');

    $scope.description = JSON.parse(job.jobDescription.fields);
    let application = JSON.parse(job.jobApplication.fields);

    $scope.onSubmit = function(model) {
        App.create($stateParams.jobId, model, job.jobApplication.id)
            .then(() => $state.go('afterSubmit'));
    }

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {
    };



    $scope.options = {};

    $scope.fields = JobApplication.getFields(application);


});
