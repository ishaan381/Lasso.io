app.directive('toggleButton', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/toggle-button/toggle-button.html',
        scope: {model: '=ngModel', options: '=', toggles: '=toggleData', field: '=fieldData'},
        controller: function ($scope) {
            $scope.radioModel = {
                value: $scope.model.value,
                label: $scope.field.label
              };
              $scope.$watch("radioModel", function (newValue) {
                $scope.model = newValue;
              })
        }
    };

});