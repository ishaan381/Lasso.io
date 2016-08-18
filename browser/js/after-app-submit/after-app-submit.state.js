app.config(function ($stateProvider) {
  $stateProvider.state('afterSubmit', {
    url: '/jobs/:jobId/success',
    templateUrl: '/js/after-app-submit/after-app-submit.html',
    controller: 'afterSubmitCtrl'
  })
})
