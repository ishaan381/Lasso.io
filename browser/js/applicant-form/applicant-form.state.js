app.config($stateProvider => {
  $stateProvider.state('applicantForm', {
    url: '/jobs/:jobId/apply',
    templateUrl: '/js/applicant-form/applicant-form.html',
    controller: 'applicantFormCtrl',
    resolve: {
      job: function (Job, $stateParams) {
        return Job.fetch($stateParams.jobId)
      }
    }
  });
});


