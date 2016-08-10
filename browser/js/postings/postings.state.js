app.config(function ($stateProvider) {
  $stateProvider.state('postings', {
    url: '/hire/:companyName/postings',
    template: 'js/postings/postings.html',
  })
});
