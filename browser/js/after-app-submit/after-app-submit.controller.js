app.controller('afterSubmitCtrl', function ($rootScope) {
  $rootScope.$broadcast('applicantView');
});
