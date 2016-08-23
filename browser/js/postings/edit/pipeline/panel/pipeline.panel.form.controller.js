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
        if ($scope.selected) {
            $scope.panels = $scope.selected.panels;
            $scope.questions = $scope.panels[currentIndex].panelQuestions;
        }

    }

    $scope.$parent.$watch('tabRemoveToggle', reloadForm)

    $scope.addQuestion = function() {
        $scope.questions.push({ title: "Edit Question", description: "Add Details / Description", selectedField: "text", id: $scope.questions.length })
    }

    $scope.closeSelect = function (selected) {
        console.log(selected);
    }

    $scope.needsChoices = function (selectedField) {
        return (selectedField === 'dropdown' || selectedField === 'checkbox' || selectedField === 'radio') ? true : false
    }

    $scope.fields = [

    ];


});
