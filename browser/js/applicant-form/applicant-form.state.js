app.config($stateProvider => {
  $stateProvider.state('applicantForm', {
    url: '/jobs/:jobId/apply',
    templateUrl: '/js/applicant-form/applicant-form.html',
    controller: 'applicantFormCtrl',
    resolve: {
      formsData: function (JobApplication, $stateParams) {
        return JobApplication.fetch($stateParams.jobId)
        .then(res => res.data);
      }
    }
  });
});


