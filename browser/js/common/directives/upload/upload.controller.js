app.directive('upload', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/upload/upload.html',
        scope: { model: '=ngModel', options: '='},
        controller: 'uploadCtrl'
        // controller: function ($scope) {

        //     console.log($scope.options);

        //     $scope.checked = $scope.data.checked;
        //     $scope.unchecked = $scope.data.unchecked;
        //     $scope.current = $scope.unchecked;

        //     $scope.toggleChecked = function () {
        //         $scope.current = ($scope.unchecked === $scope.current) ? $scope.current = $scope.checked : $scope.current = $scope.unchecked;
        //         $scope.model = $scope.current;
        //     }


        // }
    };

});

app.controller('uploadCtrl', function(_, $rootScope, $scope, formlyVersion, $q, $http, Upload, $timeout) {

    console.log($scope.model);

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
                console.log('SUCCESS!', resp)
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
                    console.log($scope.log)
            });
        }
    };


});
