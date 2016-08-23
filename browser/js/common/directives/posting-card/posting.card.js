app.directive('postingCard', function($state, Job) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/posting-card/posting-card.html',
        scope: { detail: "=jobDetail" },
        link: function(scope) {
            scope.published = scope.detail.published ? 'published' : 'draft'
            scope.toUrl = function(published) {
                if (!published) return $state.go('editPosting.description', { id: scope.detail.id });
                else return Job.getFirstStageId(scope.detail.id)
                    .then(data => {
                        if (published) return $state.go('pipeline.stage', { id: scope.detail.id, stageId: data.stageId });
                    })

            }
        }
    }
})
