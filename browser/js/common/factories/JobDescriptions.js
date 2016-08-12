
app.factory('JobDescriptions', function($http, $log) {
    var JobDescriptions = {}

    JobDescriptions.create = function (data) {
        return $http.post('/api/jobs/descriptions', {
            fields: data.fields,
            companyId: data.companyId,
            jobId: data.jobId
        })
        .then(function (response) {
            return response.data
        })
    }

    JobDescriptions.fetch = function (id) {
        console.log(id);
        return $http.get('/api/jobs/descriptions/' + id)
                    .then(function (response) {
                        return response.data
                    })
    }

    return JobDescriptions;
});
