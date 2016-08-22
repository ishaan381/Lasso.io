app.config(function($stateProvider) {
  $stateProvider.state('editPosting.application', {
    url: '/application',
    templateUrl: 'js/postings/edit/application/customize/application.customize.html',
    controller: 'editApplicationCtrl',
    resolve: {
      parsedJobApp: function (thisJob, JobApplication, $stateParams) {
        if (thisJob.jobApplication) {
          return JobApplication.fetch($stateParams.id)
          .then(res => JSON.parse(res.data.fields));
        }
      }
    }
  })
})
