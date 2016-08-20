
app.controller('applicantFormCtrl', function($rootScope, $scope, formlyVersion, $stateParams, job, App, $state, JobApplication) {

  $rootScope.$broadcast('applicantView');

    $scope.description = JSON.parse(job.jobDescription.fields);
    let application = JSON.parse(job.jobApplication.fields);

    $scope.onSubmit = function(model) {
        App.create($stateParams.jobId, model)
            .then(() => $state.go('afterSubmit'));
    }

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {
    };



    $scope.options = {};

    $scope.fields = JobApplication.getFields(application);


    // $scope.$watch('file', function() {
    //     if ($scope.file != null) {
    //         $scope.upload($scope.file);
    //     }
    // });

    // $scope.upload = function(file) {

    //     if (!file.$error) {
    //         Upload.upload({
    //             url: '/api/upload',
    //             data: {
    //                 username: $scope.username,
    //                 file: file
    //             }
    //         }).then(function(resp) {
    //             console.log('SUCCESS!', resp)
    //             $timeout(function() {
    //                 $scope.log = 'file: ' +
    //                     resp.config.data.file.name +
    //                     ', Response: ' + JSON.stringify(resp.data) +
    //                     '\n' + $scope.log;
    //             });
    //         }, null, function(evt) {
    //             var progressPercentage = parseInt(100.0 *
    //                 evt.loaded / evt.total);
    //             $scope.log = 'progress: ' + progressPercentage +
    //                 '% ' + evt.config.data.file.name + '\n' +
    //                 $scope.log;
    //                 console.log($scope.log)
    //         });
    //     }
    // };


});
