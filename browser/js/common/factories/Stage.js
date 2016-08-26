app.factory('Stage', function ($http, AuthService) {

  let Stage = {};

  let cache;

  Stage.getCandidates = function (id) {
    return $http.get('/api/stages/' + parseInt(id) + '/candidates')
    .then(res => {

      cache = res.data;
      return cache;
    });
  }

  Stage.numCandidates = function(stage){
    return $http.get('/api/stages/' + stage.id + '/numCandidates')
    .then(res => res.data);
  }

  Stage.moveCandidate = function (candidateId) {

    let applicant = cache.find(candidate => {
      return candidate.id === candidateId;
    })

    applicant.stageId++;

    cache.splice(cache.indexOf(applicant), 1)

    return $http.put('/api/applications/' + candidateId, {stageId: applicant.stageId})
    .then(res => res.data);

  }

  Stage.qualifyCandidate = function (candidateId) {

    let applicant = cache.find(candidate => candidate.id === candidateId);
    applicant.rejected = false;
    return $http.put('/api/applications/' + candidateId, {rejected: false})
    .then(res => res.data);

  }

  Stage.disqualifyCandidate = function (candidateId) {
    let applicant = cache.find(candidate => candidate.id === candidateId);
    applicant.rejected = true;
    return $http.put('/api/applications/' + candidateId, {rejected: true})
    .then(res => res.data);
  }

  return Stage;
});
