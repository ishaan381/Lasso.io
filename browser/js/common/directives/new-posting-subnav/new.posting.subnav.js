app.directive('newsubnav', function ($rootScope, $state, AuthService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/new-posting-subnav/new-posting-subnav.html',
        link: function (scope) {

            scope.items = [
                { label: 'create a job posting', state: 'newDescription', description: "Tell applicants why it's great to work at {{companyName}}", icon: "fa fa-briefcase", auth: true },
                // { label: 'application form', state: 'editPosting.application', description: "Design the application form for this role", icon: "fa fa-pencil-square-o", auth: true},
                // { label: 'define your pipeline', state: 'editPosting.pipeline', description: "Add, customize, and standardize stages to your recruiting process", icon: "fa fa-puzzle-piece", auth: true },
                // { label: 'Advertise / Your Network', state: 'users.tours', description: "Post the job on job boards, engage recruiters, and share on social media", icon: "fa fa-comment", auth: true },
            ];

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
        }

    };

});
