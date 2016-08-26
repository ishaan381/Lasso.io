app.directive('kitRadioField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-radio-field.html',
        scope: { model: '=ngModel', question: '=' },
    };

});
