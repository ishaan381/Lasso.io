app.directive('toggleButton', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/toggle-button/toggle-button.html',
        scope: {model: '=ngModel', options: '=', toggles: '=toggleData', field: '=fieldData'},
        link: function (scope) {
            // console.log(scope.model);
            //scope.model = "bye"
        },
        controller: function ($scope) {
            // https://github.com/angular-ui/bootstrap/issues/1368
            $scope.radioModel = {
                value: $scope.model.value,
                label: $scope.field.label
              };
              $scope.$watch("radioModel", function (newValue) {
                $scope.model = newValue;
              })
            //   console.log($scope.toggles);

            // console.log('hi');
            // console.log($scope.options);
            // console.log($scope.model);

        }
    };

});