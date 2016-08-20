app.controller('pipelineCtrl', function ($scope, thisJob, $timeout) {

  // Pipeline.getStages($stateParams.id)
  // .then(stages => {
  //   $scope.stages = stages;
  // });

  $scope.stages = thisJob.stage;


  console.log($scope.stages);

});
