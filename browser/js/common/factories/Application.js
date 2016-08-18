app.factory('App', function($http) {
    var App = {};

    App.create = function(jobId, model) {
        return $http.post('api/applications', {
            jobId: jobId,
            fields: model
        })
        .then(res => res.data);
    }

    App.fetchComments = function(appId){
        return $http.get('/api/applications/' + appId + 'allcomments')
        .then(function(resp){
            return resp.data
        })
    }

    App.fetchApp = function(appId){
        return $http.get('/api/applications/' + appId)
        .then(function(resp){
            return resp.data
        })
    }

    App.makeComment = function(comment, appId){
        return $http.post('/api/applications/comment', {
            title: comment.title,
            content: comment.content,
            applicationId: appId,
            userId: comment.userId
        })
        .then(function(resp) {
            return resp.data
        })
    }

    App.editComment = function(comment){
        return $http.put('/api/comments/' + comment.id, {
            title: comment.title,
            content: comment.content
        })
        .then(function(resp){
            return resp.data;
        })
    }

    App.removeComment = function(comment){
        return $http.delete('/api/comments/' + comment.id)
        .then(function(resp){
            return resp.data;
        })
    }

//========================================================== methods for the actual application

    App.removeApp = function(app) {
        return $http.delete('/api/applications/' + app.id)
        .then(function(resp){
            return resp.data;
        })
    }

    App.changeQualification = function(app){
        return $http.put('/api/applications/' + app.id, {
            rejected: !app.rejected
        })
        .then(function(resp){
            return resp.data;
        })
    }

    return App;
});

