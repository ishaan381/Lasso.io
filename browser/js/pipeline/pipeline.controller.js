app.controller('pipelineCtrl', function ($scope, Pipeline, $stateParams) {

  Pipeline.getStages($stateParams.id)
  .then(stages => {
    $scope.stages = stages;
  });

});
