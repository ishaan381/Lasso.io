app.controller('editPipelineCtrl', function(_, $scope, formlyVersion, $q, $http, thisJob) {

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {};
    console.log('job:', thisJob);
    console.log('job desc:', thisJob.jobDescription);

    $scope.options = {};

    $scope.addStage = function() {
        $scope.customStages[0].stages.push({name: "", type: "custom"})
    }

    $scope.fields = [

    ]

    $scope.beginStage = [{
        label: "Men",
        max: 1,
        allowedTypes: ['begin'],
        stages: [
            { name: "Applied", type: "begin" }
        ]
    }]

     $scope.customStages = [
        {
            label: "Men",
            allowedTypes: ['custom'],
            max: 4,
            stages: [
                {name: "Phone Interview", type: "custom"},
                {name: "In-Person Interview", type: "custom"},
            ]
        }
    ];
    $scope.endStage = [{
        label: "Men",
        allowedTypes: ['end'],
        max: 1,
        stages: [
            { name: "Hired", type: "end" }
        ]
    }]

    // Model to JSON for demo purpose
    $scope.$watch('lists', function(lists) {
        $scope.modelAsJson = angular.toJson(lists, true);
    }, true);

});
