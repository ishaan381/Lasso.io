//
app.factory('Job', function($http, $log) {
    var Job = {};

    Job.fetchAll = function() {
        return $http.get('/api/jobs')
            .then(function(response) {
                return response.data;
            })
    }

    Job.getAppsForJob = function(id) {
        return $http.get('/api/jobs/'+ id +'/apps')
        .then(function(resp){
            return resp.data;
        })
    }

    Job.fetch = function(id) {
        return $http.get('/api/jobs/' + id)
        .then(res => res.data)
    }

    //doesnt work yet, this is just here for the possibility of querying
    Job.queryAllByCompany = function (id, params) {
        return $http.get('/api/jobs/company/' + id + '/?' + jQuery.param(params))
                    .then(function (response) {
                        return response.data
                    })
    }

    Job.create = function(job) {
        console.log("in factory")
        return $http.post('/api/jobs', {
                companyId: job.companyId
            })
            .then(function(response) {
                return response.data
            })
    }

    Job.edit = function(id, data) {
        return $http.put('/api/jobs/' + id, data);
    }

    Job.remove = function (id) {
        return $http.delete('/api/jobs/' + id)
            .then(function (response) {
                return response.data;
            })
    }

    return Job;
});
