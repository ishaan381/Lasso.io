app.controller('editPipelineCtrl', function(_, $scope, formlyVersion, $q, $http, thisJob, $state, Pipeline, sharedStages) {

    $scope.stages = [];


    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {};

    $scope.options = {};

    $scope.addStage = function() {
        $scope.customStages[0].stages.push({
            title: "",
            type: "custom",
            panels: [
                { title: 'Select A Helper', templateUrl: '/js/postings/edit/pipeline/panel-templates/menu-selection.html', panelId: 0 }
            ]
        })
    }

    $scope.$watch('customStages', function(newStage, oldStage) {
        $scope.customStages[0].stages.map((stage, index) => stage.id = index);
        repopulateStages();
    }, true)

    $scope.selectedCb = function(item) {
        $scope.selected = item;
        sharedStages.selectedStage = item;
    }

    $scope.removeStage = function(id) {
        $scope.customStages[0].stages.splice(id, 1);
        console.log($scope.customStages[0].stages);
        console.log(id)
    }

    $scope.submitStages = function() {
        var stageArray = [];

        var beginStage = $scope.beginStage[0].stages[0];
        stageArray.push({ title: beginStage.title, index: 0, jobId: thisJob.id, panels: beginStage.panels});

        $scope.customStages[0].stages.forEach(function(stage) {
            stageArray.push({ title: stage.title, index: stage.id + 1, jobId: thisJob.id, panels: stage.panels})
        })

        var endStage = $scope.endStage[0].stages[0];
        stageArray.push({ title: endStage.title, index: stageArray.length, jobId: thisJob.id, panels: endStage.panels});

        console.log(stageArray);

        Pipeline.createStages(stageArray)
        .then(function() {
            $state.go('pipeline', {id: thisJob.id});
        })


    }

    $scope.beginStage = [{
        max: 1,
        allowedTypes: ['begin'],
        stages: [{
            name: "Applied",
            type: "begin",
            panels: [
                { title: 'Notes', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-notes.html', panelId: 0, panelNotes: "" }

                // { title: 'Select A Helper', templateUrl: '/js/postings/edit/pipeline/panel-templates/menu-selection.html', panelId: 0 },
            ]
        }]
    }]

    $scope.customStages = [{
        allowedTypes: ['custom'],
        max: 10,
        stages: [{
            name: "Phone Interview",
            type: "custom",
            id: 0,
            panels: [
                { title: 'Interviewer Instructions', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-notes.html', panelId: 0, panelNotes: "" },
                { title: 'Interview Kit', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-form.html', panelId: 1, panelQuestions: [] },

            ]
        }, {
            name: "In-Person Interview",
            type: "custom",
            id: 1,
            panels: [
                { title: 'Interviewer Instructions', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-notes.html', panelId: 0, panelNotes: "" },
                { title: 'Interview Kit', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-form.html', panelId: 1, panelQuestions: [] },
            ]
        }, ]
    }];
    $scope.endStage = [{
        allowedTypes: ['end'],
        max: 1,
        stages: [{
            name: "Offer",
            type: "end",
            panels: [
                { title: 'Notes', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-notes.html', panelId: 0, panelNotes: "" }

                // { title: 'Select A Helper', templateUrl: '/js/postings/edit/pipeline/panel-templates/menu-selection.html', panelId: 0 }
            ]
        }]
    }]

    if (thisJob.stage) {
    console.log('in here');
    var stages = thisJob.stage;
    console.log(stages, $scope.beginStage);
    $scope.beginStage[0].stages[0] = stages[0];

    $scope.customStages[0].stages = [];

    for (var i = 1; i < stages.length - 1; i++) {
        $scope.customStages[0].stages.push(stages[i]);
    }

    $scope.endStage[0].stages[0] = stages[stages.length - 1];

    populateStages();
   }

    function populateStages() {
        $scope.beginStage[0].stages.forEach(function(stage) {
            $scope.stages.push(stage);
        })
        $scope.customStages[0].stages.forEach(function(stage) {
            $scope.stages.push(stage);
        })
        $scope.endStage[0].stages.forEach(function(stage) {
            $scope.stages.push(stage);
        })

        $scope.stages.forEach(function(stage, idx) {
            stage.stageId = idx;
        })
    }

    function repopulateStages() {
        $scope.stages = [];
        populateStages();
    }



    $scope.$watch('stages', function(newVal, oldVal) {
        sharedStages.stages = newVal;
    }, true)

    populateStages();


});
