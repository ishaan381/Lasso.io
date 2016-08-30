app.config($stateProvider => {
  $stateProvider.state('pipeline.stage.candidate.application', {
    url: '/application',
    templateUrl: 'js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/application.html',
    controller: 'applicationPanelCtrl',
  });
});
