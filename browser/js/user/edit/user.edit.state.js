app.config(function ($stateProvider) {
    $stateProvider.state('useredit', {
        url: '/edit',
        templateUrl: 'js/user/edit/user.edit.html',
        controller: 'UserEdit'
        });
});