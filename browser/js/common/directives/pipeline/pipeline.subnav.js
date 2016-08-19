app.directive('pipelineSubnav', function () {
    return {
      restrict: 'E',
      templateUrl: 'js/common/directives/pipeline/pipeline.subnav.html',
      scope: {
        stages: '='
      }
    }
});
