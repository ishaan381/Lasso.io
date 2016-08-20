app.controller('candidateCtrl', function ($scope, $state, $stateParams, candidate) {
  $scope.candidate = candidate;
  console.log(candidate);
});
