app.controller('pipelineCtrl', function ($scope, Pipeline, $stateParams) {

  Pipeline.getStages($stateParams.id)
  .then(stages => {
    console.log(stages);
    $scope.stages = stages;
  });

});
