
app.factory('Company', function($http, $log) {
    var Company = {};

    Company.fetchAll = function() {
        return $http.get('/api/companies')
            .then(function(response) {
                return response.data;
            })
    }

    //we can use this for searching all companies, basically the roundabout method
    Company.queryAll = function(params) {
        console.log(jQuery.param(params));
        return $http.get('/api/companies?' + jQuery.param(params))
            .then(function(response) {
                return response.data;
            })
    }

    Company.getUsers = function(id) {
        return $http.get('/api/companies/' + id + '/users')
        .then(function(resp) {
            return resp.data;
        })
    }

//this gets all jobs from that company
    Company.fetch = function(id) {
        return $http.get('/api/companies/' + id)
            .then(function(response) {
                return response.data;
            })
    }

    Company.create = function(company) {
        console.log("in factory")
        return $http.post('/api/companies', {
            name: company.name,
            website: company.website

            })
            .then(function(response) {
                return response.data
            })
    }

    Company.remove = function (id) {
        return $http.delete('/api/companies/' + id)
                    .then(function (response) {
                        return response.data;
                    })
    }

    return Company;
});