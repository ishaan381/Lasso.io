app.directive('kitTextboxField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-textbox-field.html',
        scope: { model: '=ngModel', question: '=' },
    };

});
