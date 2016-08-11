app.directive('toggleCheckbox', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/toggle-checkbox/toggle-checkbox.html',
        scope: { data: '=data'},
        link: function (scope) {
            console.log(scope.current);
            console.log(scope.data);
        	scope.checked = scope.data.checked;
        	scope.unchecked = scope.data.unchecked;
            scope.current = "";
        	scope.current = scope.unchecked;

        	scope.toggleChecked = function () {
        		scope.current = (scope.unchecked === scope.current) ? scope.current = scope.checked : scope.current = scope.unchecked;
        	}
            
        },
        controller: function ($scope) {
            console.log($scope.to);
        }
    };

});