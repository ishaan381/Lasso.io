app.config($stateProvider => {
  $stateProvider.state('pipeline', {
    url: '/hire/postings/:jobId',
    templateUrl: '/js/pipeline/pipeline.html',
    controller: 'pipelineCtrl'
  });
});
