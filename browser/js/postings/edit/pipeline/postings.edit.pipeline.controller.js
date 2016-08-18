app.controller('editPipelineCtrl', function(_, $scope, formlyVersion, $q, $http, thisJob, $state, Pipeline) {

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

    $scope.$watch('customStages', function(newStage, oldStage) {
        $scope.customStages[0].stages.map((stage, index) => stage.id = index);
        console.log($scope.customStages[0].stages)
    }, true)

    $scope.removeStage = function(id) {
        $scope.customStages[0].stages.splice(id, 1);
    }

    $scope.submitStages = function() {
        var stageArray = [];

        stageArray.push({title: $scope.beginStage[0].stages[0].name, index: 0, jobId: thisJob.id});

        $scope.customStages[0].stages.forEach(function(stage) {
            stageArray.push({title: stage.name, index: stage.id +1, jobId: thisJob.id})
        })

        stageArray.push({title: $scope.endStage[0].stages[0].name, index: stageArray.length, jobId: thisJob.id});

        Pipeline.createStages(stageArray)
        .then(function(stages) {
            console.log(stages);
            $state.go('pipeline', {id: thisJob.id});
        })

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
            max: 10,
            stages: [
                {name: "Phone Interview", type: "custom", id: 0},
                {name: "In-Person Interview", type: "custom", id: 1},
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
