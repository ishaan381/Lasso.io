app.controller('ModalCtrl', function ($scope, $uibModal, $log, sharedModal) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'js/postings/edit/application/modal/modal-content.html',
      // templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl as vm',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      sharedModal.modal = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());

    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});