app.controller('panelMenuCtrl', function(_, $scope, formlyVersion, $timeout, $log, $q, $http, $state, sharedStages) {

    $scope.switchToNotesPanel = function() {
        var correctIndex = $scope.selectedIndex;
        $scope.selected.panels[$scope.$parent.selectedIndex] = { title: $scope.helperTitle || 'Notes', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-notes.html', panelId: $scope.selectedIndex, panelNotes: "" };
    }

    $scope.switchToFormPanel = function() {
        $scope.selected.panels[$scope.$parent.selectedIndex] = { title: $scope.helperTitle || 'Interview Kit', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-form.html', panelId: $scope.selectedIndex, panelQuestions: [] };
    }

});
