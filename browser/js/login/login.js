app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $log, Upload, $timeout) {

    $scope.login = {};
    $scope.signup = {};
    $scope.companySignupInfo = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        AuthService.login(loginInfo).then(function () {
            $state.go('postings');
        }).catch(function (err) {
            $scope.error = err.message;
        });

    };

    $scope.createCompany = function (createInfo) {
        AuthService.createCompany(createInfo)
        .then(function() {
            $state.go('postings');
        })
        .catch(function(err) {
            $scope.error = err.message;
        })
    }

    $scope.sendSignup = function(signupInfo) {

        console.log('signing up')
        AuthService.checkCode(signupInfo.code)
        .then(function(companyInfo) {
            //console.log("THIRD CONSOLE LOG", companyId)
            return AuthService.signup({password: signupInfo.password, email: signupInfo.email, companyId: companyInfo.data.id})
        })
        .then(function() {
            $state.go('postings');
        })
        .catch(function(err) {
            console.log(err);
            $scope.error = err.message
        })


    }
});
