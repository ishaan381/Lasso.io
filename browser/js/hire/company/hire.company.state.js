app.config(function ($stateProvider) {
  $stateProvider.state('companyDashboard', {
    url: '/hire/:companyName',
    templateUrl: 'js/hire/company/dashboard.html'
  });
});
