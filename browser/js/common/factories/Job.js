
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
            .then(function(response) {
                return response.data;
            })
    }

    //not sure if we also have to specify a company field
    //also not sure if this belongs in the Job application factory
    Job.apply = function(job, app) {
        return $http.post('api/applications', {
            jobId: job.id,
            fields: app.fields
        })
        .then(function(resp) {
            $log.info(resp.data)
            return resp.data
        })
    }


    //doesnt work yet, this is just here for the possibility of querying
    Job.queryAllByCompany = function (id, params) {
        return $http.get('/api/jobs/company/' + id + '/?' + jQuery.param(params))
                    .then(function (response) {
                        return response.data
                    })
    }

    // Job.create = function(job) {
    //     console.log("in factory")
    //     return $http.post('/api/company', {
    //             // title: job.name,
    //             // location: job.location,
    //             // duration: job.duration.value,
    //             // expire_in: job.expire_in.value,
    //             // image: job.image,
    //             // description: job.description,
    //             // tags: job.tags,
    //             // price: job.price.value,
    //             // guideId: job.guideId
    //             description: job.job_description,
    //             application: job.job_application,
    //             company: job.company

    //         })
    //         .then(function(response) {
    //             return response.data
    //         })
    // }

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