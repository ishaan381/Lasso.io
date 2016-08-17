app.config(function ($stateProvider) {
  $stateProvider.state('editPosting.pipeline', {
    url: '/pipeline',
    templateUrl: 'js/postings/edit/pipeline/postings.edit.pipeline.html',
    controller: 'editPipelineCtrl',
  })
})
