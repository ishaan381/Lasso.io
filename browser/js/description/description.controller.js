app.controller('descriptionCtrl', function(JobDescriptions, $stateParams, $scope, $rootScope) {

  $rootScope.$broadcast('applicantView');

  JobDescriptions.fetch($stateParams.jobId)
  .then(description => {
    console.log(description);
    $scope.description = description;
  });

});
