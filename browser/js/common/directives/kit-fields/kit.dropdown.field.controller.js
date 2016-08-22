app.directive('kitDropdownField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-dropdown-field.html',
        scope: { model: '=ngModel', question: '=' },
        link: function(scope, element, attrs) {

        }
    };

});
