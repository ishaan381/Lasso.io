app.config($stateProvider => {
  $stateProvider.state('description', {
    url: '/jobs/:jobId',
    templateUrl: '/js/description/description.html',
    controller: 'descriptionCtrl'
  });
});
