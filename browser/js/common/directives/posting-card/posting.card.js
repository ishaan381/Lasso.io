app.directive('postingCard', function($state) {

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/posting-card/posting-card.html',
    scope: {detail: "=jobDetail"},
    link: function (scope) {
      console.log(scope.detail.published);
      scope.published = scope.detail.published ? 'published' : 'draft'
      scope.toUrl = function (published) {
        if (published) return $state.href('pipeline', {id: scope.detail.id});
        return $state.href('editPosting.application', {id: scope.detail.id});
      }
    }
  }
})
