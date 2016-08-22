app.config(function($stateProvider) {
    $stateProvider.state('editPosting', {
        url: '/hire/postings/:id/edit',
        template: '<div ui-view><div>',
        abstract: true,
        resolve: {
            id: ['$stateParams', function($stateParams) {
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
