app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});


app.controller('LoginCtrl', function ($scope, AuthService, $state) {


    $scope.login = {};
    $scope.signup = {};
    $scope.companySignupInfo = {};
    $scope.error = null;


    $scope.onLogin = true;

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

        AuthService.checkCode(signupInfo.code)
        .then(function(companyInfo) {
            return AuthService.signup({password: signupInfo.password, email: signupInfo.email, companyId: companyInfo.data.companyId, isCompanyAdmin: companyInfo.data.isCompanyAdmin, firstName: signupInfo.firstName, lastName: signupInfo.lastName});
        })
        .then(function() {
            $state.go('postings');
        })
        .catch(function(err) {
            $scope.error = err.message
        })


    }
});
