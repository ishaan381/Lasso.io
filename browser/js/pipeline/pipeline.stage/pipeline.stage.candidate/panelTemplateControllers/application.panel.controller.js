app.controller('applicationPanelCtrl', function($scope, $state, $stateParams) {
    $scope.candidateApp = $scope.data.app;
    $scope.candidateAppQuestions = $scope.data.appQuestions;
    $scope.finalApp = [];
    console.log($scope.candidateAppQuestions);
    // $scope.candidateApp.

    function combineAppAnswers () {
        $scope.candidateAppQuestions.customFields.forEach (function (question) {
            $scope.finalApp.push({question: question.basic.question, answer: $scope.candidateApp[question.id], type: question.field})
        })
    }

    combineAppAnswers();
    console.log($scope.finalApp);

    $scope.display = '';

    $scope.switchDisplay = function (displayType, data) {
        $scope.display = displayType;
        console.log(data);
    }

    console.log($scope.candidateApp);
    console.log($scope.candidateAppQuestions);
    $scope.checked = false;
    $scope.size = '100px';
    $scope.toggle = function() {
        $scope.checked = !$scope.checked
    }
    $scope.mockRouteChange = function() {
        $scope.$broadcast('$locationChangeStart');
    }
    $scope.onopen = function() {
        alert('Open');
    }
    $scope.onclose = function() {
        alert('Close');
    }
});
