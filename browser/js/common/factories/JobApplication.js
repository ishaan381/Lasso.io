
app.factory('JobApplication', function($http, $log) {
    var JobApplication = {};

    JobApplication.create = function (jobApp) {
        return $http.post('/api/jobs/applications', jobApp)
        .then(function (res) {
            return res.data;
        })
    }


    return JobApplication;
});
