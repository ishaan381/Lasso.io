app.config(function ($stateProvider) {
  $stateProvider.state('editPosting.application', {
    url: '/application',
    templateUrl: 'js/postings/edit/application/postings.edit.application.html',
    controller: 'editApplicationCtrl as vm',
    resolve: {
    	countries: function ($http) {
    		return $http.get('js/postings/countries.json')
    	}
    }
  })
})
