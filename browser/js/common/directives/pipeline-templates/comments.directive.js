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
  $scope.date = moment($scope.comment.date).calendar();
  $scope.rating = $scope.comment.rating;

  $scope.options = {
    values    : [ 1, 2, 3, 4, 5 ],
    cssBaseSelected     : "fa-thumbs-up selected",
    cssBaseUnselected   : "fa-thumbs-o-up unselected",
    readonly  : true,
    applyHoverCss : false,
    cssValuesSelected   : [
            "first-selected",
            "second-selected",
            "third-selected",
            "fourth-selected",
            "fifth-selected"],
        cssValuesUnselected : [
            "first-unselected",
            "second-unselected",
            "third-unselected",
            "fourth-unselected",
            "fifth-unselected"],
  };


});
