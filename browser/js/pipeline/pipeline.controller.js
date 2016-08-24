app.controller('pipelineCtrl', function($scope, thisJob, Stage) {

    $scope.stages = thisJob.stage;

    $scope.stages.forEach(function(stage) {
        Stage.getCandidates(stage.id).then(function(num) {
            stage.numCands = num.filter(candidate => !candidate.rejected).length;
        })
    })
});
