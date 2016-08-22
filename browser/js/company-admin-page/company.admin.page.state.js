app.config(function ($stateProvider) {
  $stateProvider.state('pageadmin', {
    url: '/admin',
    templateUrl: '/js/company-admin-page/company.admin.page.html',
    controller: 'PageAdmin',
    resolve: {
    	admin: function(AuthService) {
    		return AuthService.getLoggedInUser()
    		.then(function(user) {
    			if(user) return user;
    			else{
    				return {isCompanyAdmin: false}
    			}
    		})
    	}
    }
  })
});