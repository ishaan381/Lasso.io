app.config($stateProvider => {
  $stateProvider.state('pipeline.stage', {
    url: '/?stageId',
    templateUrl: '/js/pipeline/pipeline.stage/pipeline.stage.html',
    controller: 'stageCtrl'
  });
});
