app.controller('kitPanelCtrl', function ($scope, $state, $stateParams, Feedback, AuthService) {
    $scope.model = {
    }
    var currentUser;

    $scope.notSubmitted = true;

    AuthService.getLoggedInUser()
    .then(function(user) {
        currentUser = user;
    })

    function generateKitModel () {
    	$scope.data.questions.forEach (question => {
    		$scope.model[question.id] = {
    			value: null
    		};
    	})
    }

    $scope.submitFeedback = function() {
        var _answers = [];

        for (var answerIndex in $scope.model) {
            _answers.push($scope.model[answerIndex])
        }

        Feedback.submitFeedback({answers: _answers, stageId: $stateParams.stageId, applicationId: $stateParams.candidateId, userId: currentUser.id})
        .then(function(feedback) {
            $scope.notSubmitted = false;
        })
    }

    generateKitModel();
});
