app.directive('upload', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/upload/upload.html',
        scope: { model: '=ngModel', options: '='},
        controller: 'uploadCtrl'
    };

});

app.controller('uploadCtrl', function(_, $rootScope, $scope, formlyVersion, $q, $http, Upload, $timeout) {

    $scope.$watch('file', function() {
        if ($scope.file != null) {
            $scope.upload($scope.file);
        }
    });

    $scope.upload = function(file) {

        if (!file.$error) {
            Upload.upload({
                url: '/api/upload',
                data: {
                    username: $scope.username,
                    file: file
                }
            }).then(function(resp) {
                $scope.model = resp.data;
                $timeout(function() {
                    $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                });
            }, null, function(evt) {
                var progressPercentage = parseInt(100.0 *
                    evt.loaded / evt.total);
                $scope.log = 'progress: ' + progressPercentage +
                    '% ' + evt.config.data.file.name + '\n' +
                    $scope.log;
            });
        }
    };


});
