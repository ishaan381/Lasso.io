app.directive('kitTextboxField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-textbox-field.html',
        scope: { model: '=ngModel', question: '=' },
        link: function(scope, element, attrs) {
            console.log('in textbox field', scope.model, 'question', scope.question)

        }
    };

});
