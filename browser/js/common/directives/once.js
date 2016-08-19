app.directive('once', function() {
  return {
    require: 'ngModel',
    scope: {
      fn: '&once'
    },
    link: function($scope, $element, $attrs, ngModel) {
      // add a listener and save the index for removal
      var idx = ngModel.$viewChangeListeners.push(function() {
        // user typed, run the function
        $scope.fn();
        // remove the listener
        ngModel.$viewChangeListeners.splice(idx, 1);
      }) - 1;
    }
  };
})