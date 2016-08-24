app.directive('newsubnav', function ($rootScope, $state, AuthService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/new-posting-subnav/new-posting-subnav.html',
        link: function (scope) {

            scope.items = [
                { label: 'create a job posting', state: 'newDescription', description: "Tell applicants why it's great to work at {{companyName}}", icon: "fa fa-briefcase", auth: true },

            ];

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
        }

    };

});
