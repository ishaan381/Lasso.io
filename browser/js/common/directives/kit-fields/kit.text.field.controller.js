app.directive('kitTextField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-text-field.html',
        scope: { model: '=ngModel', question: '=' },
        link: function(scope, element, attrs) {
            console.log('in text field', scope.model, 'question', scope.question)

        }
    };

});
