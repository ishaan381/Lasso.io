app.config($stateProvider => {
  $stateProvider.state('pipeline.stage.candidate.comments', {
    url: '/comments',
    templateUrl: 'js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/comments.html',
    controller: 'CommentPanelCtrl',
  });
});
