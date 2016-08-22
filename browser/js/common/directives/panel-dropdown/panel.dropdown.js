app.directive('panelDropdown', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/panel-dropdown/panel-dropdown.html',
        scope: { choices: '=ngModel' },
        controller: 'panelDropdownCtrl',
        link: function(scope, element, attrs) {
            // for persistence
            if (scope.choices) {
                scope.choices = scope.choices;
            } else {
                scope.choices = [{ value: '' }];
            }

            scope.addNewChoice = function() {
                var newItemNo = scope.choices.length + 1;
                scope.choices.push({ 'id': 'choice' + newItemNo });
            };

            scope.removeChoice = function() {
                var lastItem = scope.choices.length - 1;
                scope.choices.splice(lastItem);
                if (scope.choices.length === 0) {
                  scope.addNewChoice();
                }
            };

        }
    };

});

app.controller('panelDropdownCtrl', function(_, $scope, $log, $q, $http, $state) {

    // console.log($scope.model);

    // $scope.model = "";

    // $scope.addNewOption = function () {
    //   $scope.model = "hi";
    // }


});
