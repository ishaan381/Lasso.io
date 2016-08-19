app.directive('panelDropdown', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/panel-dropdown/panel-dropdown.html',
        scope: {model: '=ngModel'},
        controller: 'panelDropdownCtrl'
    };

});

app.controller('panelDropdownCtrl', function(_, $scope, $log, $q, $http, $state) {

  console.log($scope.model);

  $scope.model = "";

  $scope.addNewOption = function () {
    console.log('hi');
  }


});
