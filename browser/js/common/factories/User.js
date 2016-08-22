'use-strict'

app.factory('User', function($http, $rootScope) {

  var User = {};

  User.fetchAll = function () {
    return $http.get('/api/users/')
                .then(user => user.data)
  }
 
  User.getUserInfo = function (id) {
    return $http.get('/api/user/' + id)
                .then(user => user.data)
  }

  User.create = function(user){
    return $http.post('/api/users', {
                email: user.email,
                password: user.password
            })
            .then(function(response) {
                return response.data
            })
  }

  User.edit = function(user) {
      return $http.put('/api/users/' + user.id, {
               email: user.email,
               password: user.newpassword
            })
            .then(function(resp){
              return resp.data;
            })
  }

  User.delete = function(user) {
      return $http.delete('api/users/' + user.id)
        .then(function(resp){
          return resp.data;
        })
  }


  return User;
})