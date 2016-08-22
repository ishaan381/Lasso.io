app.directive('kitScorecardField', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/kit-fields/kit-scorecard-field.html',
        scope: { model: '=ngModel', question: '=' },
        link: function(scope, element, attrs) {
            console.log('in scorecard field', scope.model, 'question', scope.question)
            scope.model = {
            }
            scope.logRating = function (option, index) {
                console.log(option, index);
                scope.model[option] = index;
            }

            // proud of this
            scope.getClass = function (option, index) {
                return {
                    clicked: scope.model[option] === index,
                    bad: index === 0 || index === 1,
                    good: index === 2 || index === 3
                };
            }
        }
    };

});
