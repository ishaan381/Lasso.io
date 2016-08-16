app.config($stateProvider => {
  $stateProvider.state('pipeline', {
    url: '/hire/postings/:id/pipeline',
    templateUrl: '/js/pipeline/pipeline.html',
    controller: 'pipelineCtrl'
  });
});
