app.config($stateProvider => {
  $stateProvider.state('pipeline.stage.candidate.notes', {
    url: '/notes',
    templateUrl: 'js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/notes.html'
  });
});
