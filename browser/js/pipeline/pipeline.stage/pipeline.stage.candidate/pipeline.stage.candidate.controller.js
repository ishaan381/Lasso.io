app.controller('candidateCtrl', function($scope, $state, $stateParams, $timeout, stage, candidate, thisJob) {

	console.log(candidate);
    $scope.candidate = candidate;
    $scope.currentStage = stage;
    $scope.currTabId = 0;
    $scope.currPanelTemplate;

    const templateRoot = "js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/";

    $scope.switchTab = switchTab;

    $scope.data;


    // note panel id is += 2 ...
    function switchTab(tabId) {
        $scope.currTabId = tabId;
        // tab is a panel
        if (tabId === 0) {
        	console.log(candidate)
            $scope.data = { comments: candidate.comments }
            $scope.currPanelTemplate = templateRoot + 'comments.html';
        } else if (tabId === 1) {
            $scope.data = { app: candidate.application, appQuestions: thisJob.jobApplication }
            $scope.currPanelTemplate = templateRoot + 'application.html';
            
        } else if (tabId > 1) {
            var currentPanel = $scope.currentStage.panels[tabId - 2];
            if (currentPanel.hasOwnProperty("panelQuestions")) {
                $scope.data = { questions: currentPanel.panelQuestions }
                $scope.currPanelTemplate = templateRoot + 'kit.html'
            } else if (currentPanel.hasOwnProperty('panelNotes')) {
                $scope.data = {notes: currentPanel.panelNotes}
                $scope.currPanelTemplate = templateRoot + 'notes.html'
                

            }
        }
    }

    switchTab(0);


    console.log("STAGE BOO BOO", stage)

});
