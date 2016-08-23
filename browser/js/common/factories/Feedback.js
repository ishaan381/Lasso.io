app.factory('Feedback', function($http) {

  return {

    submitFeedback: function(feedbackForm) {
      return $http.post('/api/feedback', feedbackForm)
      .then(res => res.data)
    }


  }

})
