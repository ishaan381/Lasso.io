app.directive('kitCodeField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-code-field.html',
        scope: { model: '=ngModel', question: '=' },
        link: function(scope, element, attrs) {
            console.log('in code field', scope.model, 'question', scope.question)
        }
    };

});
