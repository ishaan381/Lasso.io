
app.controller('candidateCtrl', function ($scope, $state, $stateParams, $timeout, stage, candidate, Stage, AuthService) {
	$scope.currentStage = stage;
  $scope.candidate = candidate;
  $scope.candidateApp = JSON.parse(candidate.application)

  $scope.isCompanyAdmin;

  AuthService.getLoggedInUser()
  .then(user => {
    $scope.isCompanyAdmin = user.isCompanyAdmin;
  })

  $scope.moveCandidate = function (candidateId) {
    Stage.moveCandidate(candidateId);
    $state.go('pipeline.stage', {stageId: stage.id})
  }

  $scope.qualifyCandidate = function (candidateId) {
    Stage.qualifyCandidate(candidateId);
    $state.go('pipeline.stage', {stageId: stage.id})
  }
});
