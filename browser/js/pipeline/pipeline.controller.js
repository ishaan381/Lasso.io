app.controller('pipelineCtrl', function ($scope, Pipeline, $stateParams) {

  Pipeline.getStages($stateParams.jobId)
  .then(stages => {
    console.log(stages);
    $scope.stages = stages;
  });

});
