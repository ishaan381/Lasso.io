app.controller('UploadCtrl', function($scope, Upload) {

  $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        console.log('uploading!')
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/upload',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    // for multiple files:
    // $scope.uploadFiles = function (files) {
    //   if (files && files.length) {
    //     for (var i = 0; i < files.length; i++) {
    //       Upload.upload({..., data: {file: files[i]}, ...})...;
    //     }
    //     // or send them all together for HTML5 browsers:
    //     Upload.upload({..., data: {file: files}, ...})...;
    //   }
    // }
});
