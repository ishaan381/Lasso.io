app.controller('descriptionCtrl', function(JobDescriptions, $stateParams, $scope, $rootScope) {

  $rootScope.$broadcast('applicantView');

  JobDescriptions.fetch($stateParams.jobId)
  .then(description => {
    $scope.description = description;
  });

});

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('indigo')
});
