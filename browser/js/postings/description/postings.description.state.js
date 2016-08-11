app.config(function ($stateProvider) {
  $stateProvider.state('newDescription', {
    url: '/hire/:companyName/postings/new',
    templateUrl: 'js/postings/description/postings.description.html',
    controller: 'newDescriptionCtrl as vm',
    resolve: {
    	countries: function ($http) {
    		return $http.get('js/postings/description/countries.json')
    	}
    }
  })
})
