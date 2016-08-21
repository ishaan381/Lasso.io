app.config($stateProvider => {
  $stateProvider.state('pipeline.stage.candidate', {
    url: '/candidate/:candidateId?test',
    templateUrl: '/js/pipeline/pipeline.stage/pipeline.stage.candidate/pipeline.stage.candidate.html',
    controller: 'candidateCtrl',
    resolve: {
      candidate: function (App, $stateParams) {
        return App.fetchApp($stateParams.candidateId);
      }
    }
  });
});
