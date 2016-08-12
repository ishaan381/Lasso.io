app.config(function ($stateProvider) {
  $stateProvider.state('editDescription', {
    url: '/hire/postings/:jobId/edit',
    templateUrl: 'js/postings/edit/postings.edit.description.html',
    controller: 'editDescriptionCtrl as vm',
    resolve: {
    	countries: function ($http) {
    		return $http.get('js/postings/countries.json')
    	},
        thisJob: function (Job, $stateParams) {
            var jobId = $stateParams.jobId;
            return Job.fetch(jobId) // fetch from stateparams
        }
    }
  })
})
