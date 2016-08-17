app.config(function ($stateProvider) {
  $stateProvider.state('editPosting.description', {
    url: '',
    templateUrl: 'js/postings/edit/description/postings.edit.description.html',
    controller: 'editDescriptionCtrl as vm',
    resolve: {
    	countries: function ($http) {
    		return $http.get('js/postings/countries.json')
    	},
        // thisJob: function (Job, $stateParams) {
        //     console.log($stateParams.id);
        //     var postingId = $stateParams.id;
        //     return Job.fetch(postingId) // fetch from stateparams
        // }
    }
  })
})
