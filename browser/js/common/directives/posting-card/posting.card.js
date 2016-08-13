app.directive('postingCard', function() {

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/posting-card/posting-card.html',
    scope: {detail: "=jobDetail"}
  }
})
