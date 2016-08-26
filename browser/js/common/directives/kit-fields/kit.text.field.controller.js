app.directive('kitTextField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-text-field.html',
        scope: { model: '=ngModel', question: '=' },
    };

});
