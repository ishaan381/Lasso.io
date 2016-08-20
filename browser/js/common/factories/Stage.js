app.factory('Stage', function ($http) {

  let Stage = {};

  let cache;

  Stage.getCandidates = function (id) {
    return $http.get('/api/stages/' + parseInt(id) + '/candidates')
    .then(res => {

      cache = res.data;
      return cache;
    });
  }

  return Stage;
});
