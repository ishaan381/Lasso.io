//
app.factory('Job', function($http, $log) {
    var Job = {};

    Job.fetchAll = function() {
        return $http.get('/api/jobs')
            .then(function(response) {
                return response.data;
            })
    }

    //we can use this for searching all jobs, basically the roundabout method
    Job.queryAll = function(params) {
        console.log(jQuery.param(params));
        return $http.get('/api/jobs?' + jQuery.param(params))
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
        .then(job => {
            return {
                description: JSON.parse(job.jobDescription.fields),
                application: JSON.parse(job.jobApplication.fields)
            }
        })

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

    // Job.edit = function(job) {
    //     return $http.put('/api/jobs/' + job.id, {

    //     })
    // }

    Job.remove = function (id) {
        return $http.delete('/api/jobs/' + id)
            .then(function (response) {
                return response.data;
            })
    }

    return Job;
});
