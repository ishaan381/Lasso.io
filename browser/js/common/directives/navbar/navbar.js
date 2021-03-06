app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state, $mdDialog, $uibModal) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
            ];

            AuthService.getLoggedInUser()
            .then(function(user){
                if (user) scope.user.isCompanyAdmin = user.isCompanyAdmin;
            });

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            scope.invitePrompt = function() {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'js/common/directives/navbar/invite.html',
                    controller: 'ModalInstaCtrl',
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
            $rootScope.$on('applicantView', function () {
                scope.hide = true;
            })

        }

    };

});

app.controller('ModalInstaCtrl', function($scope, $uibModalInstance, $http, AuthService, $timeout) {

    $scope.message = "";

    AuthService.getLoggedInUser()
    .then(function(user) {
        $scope.isAdmin = user.isCompanyAdmin;
    });

    $scope.notsent = true;

    $scope.priv = false;

    $scope.reverse = function() {
        $scope.priv = !$scope.priv;
    }

    $scope.sendCode = function(email) {
        $scope.message = "Sending..."
        AuthService.getLoggedInUser()
            .then(function(user) {
                return $http.post('/api/code', { email: email, companyId: user.companyId, isCompanyAdmin: $scope.priv })
            })
            .then(function() {
                $scope.message = "Email with verification code sent to: " + email;
                $scope.notsent = false;
                $timeout(function(){$uibModalInstance.dismiss('cancel')}, 1000)
            })
            .catch(function() {
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
