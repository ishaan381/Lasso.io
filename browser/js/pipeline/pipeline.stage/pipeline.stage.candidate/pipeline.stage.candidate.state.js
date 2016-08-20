app.config($stateProvider => {
  $stateProvider.state('pipeline.stage.candidate', {
    url: '/candidate/:candidateId',
    templateUrl: '/js/pipeline/pipeline.stage/pipeline.stage.candidate/pipeline.stage.candidate.html',
    controller: 'candidateCtrl'
  });
});
