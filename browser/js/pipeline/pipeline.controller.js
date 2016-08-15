app.controller('pipelineCtrl', function ($scope, Pipeline, $stateParams) {

  Pipeline.getStages($stateParams.jobId)
  .then(stages => {
    $scope.stages = stages;
  });

});
