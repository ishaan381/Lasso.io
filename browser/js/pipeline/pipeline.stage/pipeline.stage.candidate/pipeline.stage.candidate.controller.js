app.controller('candidateCtrl', function($scope, $state, $stateParams, $timeout, stage, candidate, thisJob, Stage, AuthService) {

    $scope.candidate = candidate;
    $scope.currentStage = stage;
    $scope.currTabId = 0;
    $scope.currPanelTemplate;
    $scope.candidateApp = JSON.parse(candidate.application)

    const templateRoot = "js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/";

    $scope.switchTab = switchTab;

    $scope.data;


    // note panel id is += 2 ...
    function switchTab(tabId) {
        $scope.currTabId = tabId;
        // tab is a panel
        if (tabId === 0) {
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
                $scope.data = { notes: currentPanel.panelNotes }
                $scope.currPanelTemplate = templateRoot + 'notes.html'


            }
        }
    }

    switchTab(0);


    $scope.isCompanyAdmin;

    AuthService.getLoggedInUser()
        .then(user => {
            $scope.isCompanyAdmin = user.isCompanyAdmin;
        })

    $scope.moveCandidate = function(candidateId) {
        Stage.moveCandidate(candidateId);
        $state.go('pipeline.stage', { stageId: stage.id })
    }

    $scope.qualifyCandidate = function(candidateId) {
        Stage.qualifyCandidate(candidateId);
        $state.go('pipeline.stage', { stageId: stage.id })
    }
});
