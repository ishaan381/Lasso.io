app.config(function ($stateProvider) {
    $stateProvider.state('editPosting', {
        url: '/hire/postings/:id/edit',
        template: '<div ui-view><div>',
        abstract: true,
        // redirectTo: 'editPosting.description',
        resolve: {
        	id: ['$stateParams', function ($stateParams) {
        		console.log($stateParams.id);
        		return $stateParams.id;
        	}]
        }
    });
});