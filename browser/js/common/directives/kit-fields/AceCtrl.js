app.controller('AceCtrl', function ($scope) {
// The modes
  $scope.modes = ['Javascript', 'Java', 'Python', 'C++', 'Ruby', 'SQL', 'PHP'];
  $scope.mode = $scope.modes[0];
 
  // The ui-ace option
  $scope.aceOption = {
    mode: $scope.mode.toLowerCase(),
    onLoad: function (_ace) {
 
      // HACK to have the ace instance in the scope...
      $scope.modeChanged = function () {
        _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
      };
 
    }
  };
 
  // Initial code content...
  $scope.aceModel = '';
 
});