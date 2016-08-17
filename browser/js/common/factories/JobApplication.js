
app.factory('JobApplication', function($http, $log) {
    var JobApplication = {};

    JobApplication.create = function (jobApp) {
        return $http.post('/api/jobs/applications', jobApp)
        .then(function (res) {
            return res.data;
        })
    }

    JobApplication.fetch = function (jobId) {
      return $http.get('/api/jobs/applications/' + jobId)
    }


    return JobApplication;
});
