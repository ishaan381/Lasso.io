app.controller('stageCtrl', function ($scope, Stage, $stateParams) {

  Stage.getCandidates($stateParams.stageId)
  .then(cache => {
    $scope.candidates = cache;
    console.log($scope.candidates);
  });

  $scope.filterByDisqualified = function (candidate) {
    return candidate.rejected;
  }

  $scope.filterByQualified = function (candidate) {
    return !candidate.rejected;
  }

  // $scope.getDisqualified = function () {
  //   return Stage.getCandidates($stateParams.stageId)
  //   .then(candidates => $scope.selectedCandidates = candidates.filter(candidate => candidate.rejected));
  // }

  $scope.qualified = true;
});
