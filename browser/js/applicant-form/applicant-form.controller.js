app.controller('applicantFormCtrl', function(formsData, $scope, $rootScope) {

  $rootScope.$broadcast('applicantView');

  $scope.formsData = formsData;

  console.log(formsData);
});
