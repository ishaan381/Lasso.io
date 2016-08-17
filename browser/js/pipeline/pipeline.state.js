app.config($stateProvider => {
  $stateProvider.state('pipeline', {
    url: '/hire/postings/{id:[0-9]+}',
    templateUrl: '/js/pipeline/pipeline.html',
    controller: 'pipelineCtrl'
  });
});
