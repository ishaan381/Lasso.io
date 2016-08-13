app.controller('postingsCtrl', function (_, $scope, $q, $http, jobs) {
  jobs.forEach(job => job.jobDescription.fields = JSON.parse(job.jobDescription.fields));

  $scope.jobs = jobs;

});
