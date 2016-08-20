app.controller('candidateCtrl', function ($scope, $state, $stateParams, $timeout, stage) {

	$scope.currentStage = stage;
	console.log("STAGE BOO BOO", stage)
  $timeout(function () {
  	$scope.currentStage.title = "Hi";
  }, 5000)

});
