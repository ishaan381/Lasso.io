app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});


app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.signup = {};
    $scope.companySignupInfo = {};
    $scope.error = null;


    $scope.onSignUp = true;
    $scope.onLogin = false;
    $scope.onOAuthSignUpLogin = false;

    $scope.setOnLogin = function () {
        $scope.onSignUp = false;
        $scope.onLogin = true;
        $scope.onOAuthSignUpLogin = false;
    }

    $scope.setOnSignUp = function () {
        $scope.onSignUp = true;
        $scope.onLogin = false;
        $scope.onOAuthSignUpLogin = false;
    }

    $scope.setOnOAuthSignUpLogin = function () {
        $scope.onOAuthSignUpLogin = true;
        $scope.onLogin = false;
        $scope.onSignUp = false;


    }

    $scope.sendLogin = function (loginInfo) {

        AuthService.login(loginInfo).then(function () {
            $state.go('postings');
        }).catch(function (err) {
            $scope.error = err.message;
        });

    };

    $scope.createCompany = function (createInfo) {
        AuthService.createCompany(createInfo)
        .then(function(companyInfo) {
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
})
