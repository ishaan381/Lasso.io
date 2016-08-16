app.config(function ($stateProvider) {
  $stateProvider.state('editPosting.application', {
    url: '/application',
    templateUrl: 'js/postings/edit/application/customize/application.customize.html',
    controller: 'editApplicationCtrl as vm',
  })
})
