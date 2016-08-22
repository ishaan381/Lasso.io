app.controller('kitPanelCtrl', function ($scope, $state, $stateParams) {
    $scope.model = {
    }

    function generateKitModel () {
    	$scope.data.questions.forEach (question => {
    		$scope.model[question.id] = {
    			value: null
    		};
    	})
    }

    generateKitModel();

    // console.log($scope.model);
});
