app.directive('subnav', function ($rootScope, $state, AuthService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/subnav/subnav.html',
        link: function (scope) {

            scope.items = [
                { label: 'The Job', state: 'editPosting.description', description: "Tell applicants why it's great to work at {{companyName}}", icon: "fa fa-briefcase", auth: true },
                { label: 'Application Form', state: 'editPosting.application', description: "Design the application form for this role", icon: "fa fa-pencil-square-o", auth: true },
                { label: 'Advertise / Your Network', state: 'users.tours', description: "Post the job on job boards, engage recruiters, and share on social media", icon: "fa fa-comment", auth: true },
            ];

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
        }

    };

});
