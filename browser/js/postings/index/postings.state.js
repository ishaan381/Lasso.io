app.config(function ($stateProvider) {
  $stateProvider.state('postings', {
    url: '/hire/postings',
    templateUrl: '/js/postings/index/postings.html',
    controller: 'postingsCtrl as vm',
    resolve: {
    	jobs: function (Job) {
    		return Job.fetchAll();
    	}
    }
  })
});
