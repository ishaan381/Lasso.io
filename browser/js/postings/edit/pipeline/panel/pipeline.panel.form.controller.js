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
        $scope.questions.push({ title: "Edit Question", description: "Add Details / Description", selectedField: "text" })
    }

    $scope.closeSelect = function (selected) {
        console.log(selected);
    }

    $scope.fields = [

    ];


});
