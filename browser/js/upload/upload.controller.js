app.controller('UploadCtrl', function($scope, Upload) {

  $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/upload',
            data: {file: file}
        }).then(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
    };
});
