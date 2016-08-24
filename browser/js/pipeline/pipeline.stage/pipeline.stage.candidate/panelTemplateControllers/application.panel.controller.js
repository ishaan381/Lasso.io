app.controller('applicationPanelCtrl', function($scope, $state, $stateParams, Feedback) {
    $scope.candidateApp = $scope.data.app;
    $scope.candidateAppQuestions = $scope.data.appQuestions;
    $scope.applicationFeedback;
    $scope.finalApplicationFeedback = {};
    $scope.finalApp = [];

    // Get Feedback and format into multi-dimensional array with 
    // answers and questions attached -- stores in finalApplicationFeedback
    // DOES NOT ACCOUNT FOR MISMATCH IN LENGTH -- means all fields must be filled out
    Feedback.getFeedbackForApplication($stateParams.candidateId)
        // Feedback.getFeedbackForApplication(126)
        .then(function(feedback) {
            $scope.applicationFeedback = feedback
            $scope.applicationFeedback.forEach(function(feedback, fbIdx) {
                if ($scope.finalApplicationFeedback[fbIdx] === undefined) {
                    $scope.finalApplicationFeedback[fbIdx] = {
                        values: [],
                        interviewer: feedback.interviewer
                    };
                }
                feedback.questions.forEach(function(question, qIdx) {
                    var q = {
                        question: question,
                        answer: $scope.applicationFeedback[fbIdx].answers[qIdx]
                    }
                    $scope.finalApplicationFeedback[fbIdx].values.push(q);
                })
            })
        })

    function combineAppAnswers() {
        $scope.candidateAppQuestions.customFields.forEach(function(question) {
            $scope.finalApp.push({ question: question.basic.question, answer: $scope.candidateApp[question.id], type: question.field })
        })
    }

    combineAppAnswers();

    $scope.selectedFeedback = [];
    $scope.selectedInterviewer = "";
    $scope.display = '';

    $scope.switchDisplay = function(displayType, data) {
        $scope.display = displayType;
        if ($scope.display === 'feedback') {
            $scope.selectedFeedback = data.values;
            $scope.selectedInterviewer = data.interviewer;
        }
        if ($scope.display === 'resume') {
            var sliderWidth = document.getElementsByTagName('pageslide')[0].clientWidth;
            var containerWidth = document.getElementById('container1').clientWidth;
            var containerHeight = document.getElementById('container1').clientHeight;
            var iFrameWidth = containerWidth - sliderWidth;
            $scope.iFrameWidth = (containerWidth - sliderWidth + 15).toString() + 'px'
            $scope.iFrameHeight = containerHeight.toString() + 'px'
        }
    }

    $scope.getResumeUrl = function(data) {
        return '/uploads/' + data;
    }
    
    $scope.checked = true;
    $scope.size = '100px';
    $scope.$watch('checked', function() {
        $scope.checked = true;
    })
    $scope.toggle = function() {
        $scope.checked = $scope.checked
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
