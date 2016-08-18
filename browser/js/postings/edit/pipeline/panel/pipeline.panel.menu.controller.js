app.controller('panelMenuCtrl', function(_, $scope, formlyVersion, $timeout, $log, $q, $http, $state, sharedStages) {

    $scope.switchToNotesPanel = function() {
        console.log('Selected Index', $scope.selectedIndex)
        var correctIndex = $scope.selectedIndex;
        $scope.selected.panels[$scope.$parent.selectedIndex] = { title: $scope.helperTitle || 'Notes', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-notes.html', panelId: $scope.selectedIndex, panelNotes: "" };
        console.log('After', $scope.selectedIndex);
        // $timeout(function () {
        //     $scope.selectedIndex = correctIndex;
        //     console.log('1', $scope.selectedIndex);
        //     console.log('2', correctIndex);
        //     console.log('done');
        // }, 1000)
    }

    $scope.switchToFormPanel = function() {
        $scope.selected.panels[$scope.$parent.selectedIndex] = { title: $scope.helperTitle || 'Interview Kit', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-form.html', panelId: $scope.selectedIndex, panelQuestions: [] };
    }

});
