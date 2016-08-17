app.config($stateProvider => {
  $stateProvider.state('pipeline', {
    url: '/hire/postings/:jobId/pipeline',
    templateUrl: '/js/pipeline/pipeline.html',
    controller: 'pipelineCtrl'
  });
});
