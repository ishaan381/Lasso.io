app.controller('editPipelineCtrl', function (_, $scope, formlyVersion, $q, $http, thisJob) {

    $scope.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    $scope.model = {
    };
    console.log('job:', thisJob);
    console.log('job desc:', thisJob.jobDescription);

    $scope.options = {};

    $scope.fields = [

    ]


     $scope.lists = [
        {
            label: "Men",
            allowedTypes: ['man'],
            max: 4,
            people: [
                {name: "Bob", type: "man"},
                {name: "Charlie", type: "man"},
                {name: "Dave", type: "man"}
            ]
        }
    ];

    // Model to JSON for demo purpose
    $scope.$watch('lists', function(lists) {
        $scope.modelAsJson = angular.toJson(lists, true);
    }, true);

});
