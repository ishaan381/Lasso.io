app.config(function ($stateProvider) {
  $stateProvider.state('newDescription', {
    url: '/hire/postings/new',
    templateUrl: 'js/postings/new/postings.new.description.html',
    controller: 'newDescriptionCtrl as vm',
    resolve: {
    	countries: function ($http) {
    		return $http.get('js/postings/countries.json')
    	}
    }
  })
})
