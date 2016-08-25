app.controller('stageCtrl', function($scope, $state, Stage, $stateParams, $uibModal, $log, stage) {

    $scope.currentStage = stage;
    $scope.currentStageId = $stateParams.stageId

    var avatarColors = ['#745296', '#632A50', '#e91e63', '#00695c', '#ef6c00', '#607d8b']

    Stage.getCandidates($stateParams.stageId)
        .then(cache => {
            $scope.candidates = cache;
            $scope.numQualified = $scope.candidates.filter(candidate => !candidate.rejected).length;
            $scope.numDisqualified = $scope.candidates.filter(candidate => candidate.rejected).length;
            $scope.candidates.forEach((candidate, index) => {
                candidate.avatarColor = avatarColors[index % 6]
                candidate.date = moment(candidate.createdAt).calendar();
            })
        });

    // Restful Routing
    if ($stateParams.qualified === "true") {
        $scope.qualified = true;
    } else if ($stateParams.qualified === "false") {
        $scope.qualified = false;
    }

    $scope.filterByDisqualified = function(candidate) {
        return candidate.rejected;
    }

    $scope.filterByQualified = function(candidate) {
        return !candidate.rejected;
    }

    $scope.filterByName = function(candidate) {
        if (!$scope.nameFilter || $scope.nameFilter === "") return true;
        var filterInput = $scope.nameFilter.toLowerCase()
        var fullName = candidate.application.fullNameField.toLowerCase();
        return fullName.indexOf(filterInput) !== -1;
    }

    $scope.getInitials = function (fullName) {
        return fullName.split(' ').map(function (s) { return s.charAt(0); }).join('');

    }

    $scope.selectedCandidateId;

    $scope.setActiveCandidate = function (candidateId) {
        $scope.selectedCandidateId = candidateId;
    }

    $scope.resetActiveCandidate = function () {
        $scope.selectedCandidateId = null;
    }

    $scope.addActiveClass = function (candidateId) {
        return {
            'selected-candidate': candidateId === $scope.selectedCandidateId
        }
    }

    $scope.sortSelection = [
        { title: 'Sort by alphabetical' },
        { title: 'Sort by date' },
        { title: 'Sort by evaluation' }
    ];

    $scope.sortBy = {};

    $scope.labels = ["\uf005", "\uf00c", "\uf00d"]
    $scope.data = [2, 1, 1];
    $scope.options = {
        tooltips: {
            enabled: true,
            caretSize: 0,
            titleFontSize: 7,
            bodyFontSize: 11,
            bodyFontFamily: 'FontAwesome'
        }
    }
});
