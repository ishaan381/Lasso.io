app.directive('postingCard', function($state) {

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/posting-card/posting-card.html',
    scope: {detail: "=jobDetail"},
    link: function (scope) {
      scope.published = scope.detail.published ? 'published' : 'draft'
      scope.toUrl = function (published) {
        if (published) return $state.href('pipeline', {id: scope.detail.id});
        return $state.href('editPosting', {id: scope.detail.id});
      }
    }
  }
})
