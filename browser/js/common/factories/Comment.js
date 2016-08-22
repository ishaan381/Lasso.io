app.factory('Comment', function($http) {

    var Comment = {}
    Comment.createComment = function(comment) {
        return $http.post('/api/comments', comment)
        .then(function(res) {
          return res.data
        });
    }

    return Comment
})
