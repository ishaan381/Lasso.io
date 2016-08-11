app.factory('App', function($http, $log) {
    var App = {};

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
        return $http.post('/api/applications/' + appId + '/comment', {
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
            $rootScope.$emit('editComment', resp.data); //so it updates comment without refresh of entire app
            return resp.data;//if we want it to work in realtime I'll come back to this when we have the front end
            //I just have to add a listener in the main js that calls a evalASync() to sync the session data with the changed server data
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
    
    return App;
});