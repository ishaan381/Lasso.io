app.controller('panelNotesCtrl', function(_, $scope, formlyVersion, $log, $q, $http, $state, sharedStages) {

    $scope.questions = [];

    var currentIndex;

    $scope.$parent.$watch('selectedIndex', function(newIndex) {
        if (newIndex !== null || newIndex !== undefined) {
            currentIndex = newIndex;
            reloadNotes();
        }
    })
    // NECESSARY ... do not remove
    $scope.$watch('notes', function(newNotes) {
        $scope.panels[$scope.selectedIndex].panelNotes = newNotes;
    })

    function reloadNotes() {
        $scope.panels = $scope.selected.panels;
        $scope.notes = $scope.panels[currentIndex].panelNotes;
    }

    $scope.$parent.$watch('tabRemoveToggle', reloadNotes)

});