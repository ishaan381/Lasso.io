
app.controller('postingsCtrl', function(_, $scope, $q, jobs, AuthService) {

    jobs.forEach(job => job.jobDescription.fields = JSON.parse(job.jobDescription.fields));

    $scope.jobs = jobs;

    const sort = function(property) {
        $scope.jobs = jobs.sort((job1, job2) => {
            return job1.jobDescription.fields[property].charCodeAt(0) - job2.jobDescription.fields[property].charCodeAt(0)
        })
    }

    $scope.chunkJobs = function(property) {

      $scope.chunkedJobs = [];

      sort(property);

      let startVal = $scope.jobs[0].jobDescription.fields[property];
      let startIndex = 0;

      $scope.chunkedJobs[startIndex] = {
          jobs: [],
          category: startVal
      }

      $scope.jobs.forEach(job => {
          if (job.jobDescription.fields[property] === startVal) {

              $scope.chunkedJobs[startIndex].jobs.push(job);

          } else {
              startIndex++;
              startVal = job.jobDescription.fields[property];

              $scope.chunkedJobs[startIndex] = {
                  jobs: [],
                  category: startVal
              }

              $scope.chunkedJobs[startIndex].jobs.push(job);

          }
      })
    }

    if (jobs.length) {
      $scope.chunkJobs('department');
      $scope.hasPosting = true;
    }
    else {
      $scope.hasPosting = false;
    }

    $scope.isAdmin;

    AuthService.getLoggedInUser()
    .then(user => $scope.isAdmin = user.isCompanyAdmin);

});
