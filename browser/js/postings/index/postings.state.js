app.config(function ($stateProvider) {
  $stateProvider.state('postings', {
    url: '/hire/postings',
    templateUrl: '/js/postings/index/postings.html',
    controller: 'postingsCtrl as vm',
    resolve: {
    	jobs: function (Company, AuthService) {
            return AuthService.getLoggedInUser()
            .then(user => {
                if (user) return Company.fetch(user.companyId)
            })
            .then(company => company.job)
    	}
    }
  })
});
