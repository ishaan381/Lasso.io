app.controller('pipelineCtrl', function ($scope, stages) {

  // Pipeline.getStages($stateParams.id)
  // .then(stages => {
  //   $scope.stages = stages;
  // });

  $scope.stages = stages;

});
