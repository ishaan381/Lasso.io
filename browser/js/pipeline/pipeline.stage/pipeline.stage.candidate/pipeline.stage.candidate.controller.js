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


    $scope.data;
    $scope.data.comments = $scope.candidate.comments;
    $scope.data.app = JSON.parse(candidate.application);
    $scope.data.appQuestions = JSON.parse(thisJob.jobApplication.fields);
    $scope.currentStage.panels.forEach(function(panel) {
        if (panel.hasOwnProperty("panelQuestions")) {
            $scope.data.questions = panel.panelQuestions;
            panel.sref = ".feedback"
        }
        else if (panel.hasOwnProperty("panelNotes")) {
            $scope.data.notes = panel.panelNotes;
            panel.sref = ".notes"
        }
    })




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
