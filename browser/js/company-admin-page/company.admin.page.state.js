app.config(function ($stateProvider) {
  $stateProvider.state('pageadmin', {
    url: '/:companyId/admin',
    templateUrl: '/js/company-admin-page/company.admin.page.html',
    controller: 'PageAdmin'
  })
});