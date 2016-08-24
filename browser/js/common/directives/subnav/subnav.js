app.directive('subnav', function ($rootScope, $state, AuthService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/subnav/subnav.html',
        link: function (scope) {

            scope.items = [
                { label: 'the job', state: 'editPosting.description', description: "Tell applicants why it's great to work at your company", icon: "fa fa-briefcase", auth: true },
                { label: 'application form', state: 'editPosting.application', description: "Design the application form for this role", icon: "fa fa-pencil-square-o", auth: true },
                { label: 'define your pipeline', state: 'editPosting.pipeline', description: "Add, customize, and standardize stages to your recruiting process", icon: "fa fa-puzzle-piece", auth: true },
            ];

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
        }

    };

});
