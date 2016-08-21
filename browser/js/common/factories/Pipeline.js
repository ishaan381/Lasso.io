app.factory('Pipeline', function ($http) {
  return {
    getStages: function (id) {
      return $http.get('/api/jobs/' + id)
      .then(res => res.data.stage);
    },

    createStages: function (array) {
      return $http.post('/api/stages', array)
      .then(res => res.data);
      },

      updateStages: function(array, id) {
        console.log('HELLLLOOOOO', id)
        return $http.put('/api/jobs/stages/'+id, array)
        .then(res => res.data);
      }
  }
})
