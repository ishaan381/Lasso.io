app.controller('CommentPanelCtrl', function($scope, $state, $stateParams, Comment, AuthService) {

    var currentUser;

    AuthService.getLoggedInUser()
    .then(user => currentUser = user);

    $scope.input = ""
    $scope.rating = 3;
    $scope.options = {
        values: [1, 2, 3, 4, 5],
        cssBaseSelected: "fa-thumbs-up selected",
        cssBaseUnselected: "fa-thumbs-o-up unselected",
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
        cssHover        : "rating-star-hover-blue"
    };

    $scope.message = "Add approval rating: ";
    $scope.toggle = true;
    $scope.onChange = function(toggle) {
        $scope.message = toggle? "Add approval rating:": "Exclude approval rating";
    };

    $scope.disabled = !($scope.input);

    $scope.addComment = function() {
      var commentObject = {
        content: $scope.input,
        rating: $scope.toggle? $scope.rating : 0,
        applicationId: $scope.candidate.id,
        userId: currentUser.id,
        date: new Date()
      }
      Comment.createComment(commentObject)
      .then(function(comment) {
        $scope.input = "";
        $scope.data.comments.unshift(comment)
      })
    }
});
