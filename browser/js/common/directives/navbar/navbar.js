app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state, $mdDialog, $uibModal) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            scope.invitePrompt = function(ev) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/common/directives/navbar/invite.html',
                    controller: 'ModalInstaCtrl',
                    // resolve: {
                    //     items: function() {
                    //         return $scope.items;
                    //     }
                    // }
                });
            }

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

app.controller('ModalInstaCtrl', function($scope, $uibModalInstance, $http, AuthService, $timeout) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
    $scope.message = "";

    $scope.notsent = true;

    $scope.sendCode = function(email) {
        $scope.message = "Sending..."
        AuthService.getLoggedInUser()
            .then(function(user) {
                return $http.post('/api/code', { email: email, companyId: user.companyId })
            })
            .then(function(response) {
                $scope.message = "Email with verification code sent to: " + email;
                $scope.notsent = false;
                $timeout(function(){$uibModalInstance.dismiss('cancel')}, 1000)
                // $uibModalInstance.dismiss('cancel')


            })
            .catch(function(err) {
                $scope.message = "Error! please try again"

            })
    }

    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
