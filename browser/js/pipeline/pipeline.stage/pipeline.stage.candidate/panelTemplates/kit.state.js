app.config($stateProvider => {
  $stateProvider.state('pipeline.stage.candidate.feedback', {
    url: '/feedback',
    templateUrl: 'js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/kit.html',
    controller: 'kitPanelCtrl',
  });
});
