app.directive('comment', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/pipeline-templates/comment.html',
        scope: {comment: "=commentData"},
        controller: 'commentCtrl'
    };

});

app.controller('commentCtrl', function(_, $scope, $log, $q, $http, $state) {

  $scope.content = $scope.comment.content;
  $scope.author = $scope.comment.author;
  // $scope.date = $scope.comment.date;
  // $scope.rating = $scope.comment.rating;


});
