app.controller('kitPanelCtrl', function ($scope, $state, $stateParams, Feedback) {
    $scope.model = {
    }

    function generateKitModel () {
    	$scope.data.questions.forEach (question => {
    		$scope.model[question.id] = {
    			value: null
    		};
    	})
    }

    $scope.submitFeedback = function() {
        console.log("SUBMITTING FEEDBACK!!", $stateParams)
        var _answers = [];

        for (var answerIndex in $scope.model) {
            _answers.push($scope.model[answerIndex])
        }

        Feedback.submitFeedback({answers: _answers, stageId: $stateParams.stageId, applicationId: $stateParams.candidateId})
        .then(function(feedback) {
            console.log(feedback)
        })
    }

    generateKitModel();

    // console.log($scope.model);
});
