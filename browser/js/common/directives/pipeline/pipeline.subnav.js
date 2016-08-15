app.directive('pipelineSubnav', function () {
    return {
      restrict: 'E',
      templateUrl: 'js/common/directives/pipeline/pipeline.subnav.html',
      scope: {
        latterStages: '=stages'
      },
      link: function (scope) {
        scope.stages = [
          { label: 'Pool'},
          { label: 'Recruiter Screen'},
          { label: 'Phone Screen'},
          { label: 'Skype Interview'},
          { label: 'On-site Interview'},
          { label: 'Offer'}
        ];
      }
    }
});
