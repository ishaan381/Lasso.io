app.factory('Company', function($http) {
    var Company = {};

    Company.fetchAll = function() {
        return $http.get('/api/companies')
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
        return $http.post('/api/companies', {
            name: company.name,
            website: company.website

            })
            .then(function(response) {
                return response.data
            })
    }

    //this deletes an entire company's page, if it doesnt check the models and association hooks
    Company.remove = function (id) {
        return $http.delete('/api/companies/' + id)
                    .then(function (response) {
                        return response.data;
                    })
    }

    return Company;
});