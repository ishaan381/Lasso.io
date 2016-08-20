app.controller('stageCtrl', function ($scope, $state, Stage, $stateParams, $uibModal, $log) {

  Stage.getCandidates($stateParams.stageId)
  .then(cache => {
    $scope.candidates = cache;
    console.log($scope.candidates);
  });

  $scope.filterByDisqualified = function (candidate) {
    return candidate.rejected;
  }

  $scope.filterByQualified = function (candidate) {
    return !candidate.rejected;
  }

  $scope.filterByName = function (candidate) {
    if (!$scope.nameFilter || $scope.nameFilter === "") return true;
    var filterInput = $scope.nameFilter.toLowerCase()
    var fullName = candidate.application.fullNameField.toLowerCase();
    return fullName.indexOf(filterInput) !== -1;
  }

  $scope.qualified = true;

    $scope.sortSelection = [
      {title: 'Sort by alphabetical'},
      {title: 'Sort by date'},
      {title: 'Sort by evaluation'}
     ];

     $scope.sortBy = {};

  $scope.labels = ["\uf005", "\uf00c", "\uf00d"]
  $scope.data = [2, 1, 1];
  $scope.options = {
    tooltips: {
      enabled: true,
      caretSize: 0,
      titleFontSize: 7,
      bodyFontSize: 11,
      bodyFontFamily: 'FontAwesome'
    }
  }
});
