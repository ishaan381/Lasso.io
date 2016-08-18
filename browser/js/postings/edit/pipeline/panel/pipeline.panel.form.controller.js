app.controller('panelFormCtrl', function(_, $scope, formlyVersion, $log, $q, $http, $state, sharedStages) {

    $scope.questions = [];

    var currentIndex;
    $scope.$parent.$watch('selectedIndex', function(newIndex) {
            if (newIndex !==  null || newIndex !==  undefined) {
                currentIndex = newIndex;
                reloadForm();
            }
        })

    function reloadForm() {
        $scope.panels = $scope.selected.panels;
        $scope.questions = $scope.panels[currentIndex].panelQuestions;
    }

    $scope.$parent.$watch('tabRemoveToggle', reloadForm)

    $scope.addQuestion = function() {
        $scope.questions.push({ title: "click to edit title or question", description: "click to edit description", selectedField: "text" })
    }

    $scope.fields = [

    ];


});
