app.directive('postingCard', function($state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/posting-card/posting-card.html',
        scope: { detail: "=jobDetail" },
        link: function(scope) {
            console.log(scope.detail.published);
            scope.published = scope.detail.published ? 'published' : 'draft'
            scope.toUrl = function(published) {
              console.log(scope.detail);
                if (published) return $state.href('pipeline.stage', { id: scope.detail.id, stageId: 34});
                return $state.href('editPosting.description', { id: scope.detail.id });
            }
        }
    }
})
