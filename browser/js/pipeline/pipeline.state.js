app.config($stateProvider => {
  $stateProvider.state('pipeline', {
    url: '/hire/:jobId',
    templateUrl: '/js/pipeline/pipeline.html',
    controller: 'pipelineCtrl'
  });
});
