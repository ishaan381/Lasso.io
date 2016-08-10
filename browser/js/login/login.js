app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $log) {

    $scope.login = {};
    $scope.signup = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function(signupInfo) {

        console.log('signing up')
        AuthService.signup(signupInfo)
        // .then(function() {
        //     console.log('auth service signed you in')
        //     return AuthService.login(signupInfo)
        // })
        .then(function() {
            $state.go('home');
        })
        .catch(function(err) {
            console.log(err);
            $scope.error = err.message
        })


    }



});
