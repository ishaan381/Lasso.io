app.factory('Pipeline', function ($http) {
  return {
    getStages: function (id) {
      return $http.get('/api/jobs/' + id)
      .then(res => res.data.stage);
    }
  }
})
