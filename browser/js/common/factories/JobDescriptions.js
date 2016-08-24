
app.factory('JobDescriptions', function($http) {
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
        return $http.get('/api/jobs/descriptions/' + id)
        .then(function (response) {
            return JSON.parse(response.data.fields);
        });
    }

    JobDescriptions.update = function (id, data) {
        return $http.put('/api/jobs/descriptions/' + id, {
            fields: data.fields
        })
        .then(res => res.data);
    }

    return JobDescriptions;
});
