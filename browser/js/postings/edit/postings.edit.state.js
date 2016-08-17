app.config(function($stateProvider) {
    $stateProvider.state('editPosting', {
        url: '/hire/postings/:id/edit',
        template: '<div ui-view><div>',
        abstract: true,
        // redirectTo: 'editPosting.description',
        resolve: {
            id: ['$stateParams', function($stateParams) {
                console.log($stateParams.id);
                return $stateParams.id;
            }],
            thisJob: function(Job, $stateParams) {
                console.log($stateParams.id);
                var postingId = $stateParams.id;
                return Job.fetch(postingId) // fetch from stateparams
            }
        }
    });
});
