app.controller('candidateCtrl', function($scope, $state, $stateParams, $timeout, stage, candidate, thisJob, Stage, AuthService) {

    $scope.candidate = candidate;
    $scope.currentStage = stage;
    $scope.currTabId = 0;
    $scope.currPanelTemplate;
    $scope.candidateApp = JSON.parse(candidate.application);
    $scope.candidate.comments = $scope.candidate.comments.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

    let numStages = thisJob.stage.length;

    $scope.lastStage = $scope.currentStage.index === numStages - 1 ? true : false;

    const templateRoot = "js/pipeline/pipeline.stage/pipeline.stage.candidate/panelTemplates/";

    $scope.switchTab = switchTab;

    $scope.data;

    // note panel id is += 2 ...
    function switchTab(tabId) {
        $scope.currTabId = tabId;
        // tab is a panel
        if (tabId === 0) {
            $scope.data = { app: JSON.parse(candidate.application), appQuestions: JSON.parse(thisJob.jobApplication.fields) }
            $scope.currPanelTemplate = templateRoot + 'application.html';
        } else if (tabId === 1) {
            $scope.data = { comments: $scope.candidate.comments }
            $scope.currPanelTemplate = templateRoot + 'comments.html';
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
       // $scope.stages[stage.id].numCands
       $scope.stages.forEach(function(_stage) {
        if (_stage.id === stage.id) _stage.numCands--;
        if (_stage.id === stage.id + 1) _stage.numCands++;
       })
        Stage.moveCandidate(candidateId);
        $scope.$parent.numQualified--;
        $state.go('pipeline.stage', { stageId: stage.id });
    }

    $scope.qualifyCandidate = function(candidateId) {
        $scope.stages.forEach(function(_stage) {
            if (_stage.id === stage.id) _stage.numCands++;
        })
        Stage.qualifyCandidate(candidateId);
        $state.go('pipeline.stage', { stageId: stage.id })
        $scope.$parent.numQualified++;
        $scope.$parent.numDisqualified--;
    }

    $scope.disqualifyCandidate = function(candidateId) {
        $scope.stages.forEach(function(_stage) {
            if (_stage.id === stage.id) _stage.numCands--;
        })
        Stage.disqualifyCandidate(candidateId);
        $state.go('pipeline.stage', { stageId: stage.id });
        $scope.$parent.numDisqualified++;
        $scope.$parent.numQualified--;
    }
});
