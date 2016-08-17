app.controller('editApplicationCtrl', function(_, $scope, formlyVersion, $q, $http, sharedModal) {

    $scope.$watch(function() {
        return sharedModal.customFields;
    }, function (newVal, oldVal) {
        $scope.model.customFields = newVal;
    }, true)

    // FORM GENERATION 


    const vm = this;

    $scope.originalFields = angular.copy($scope.fields);

    // function definition
    function onSubmit() {

    }

    // function assignment
    $scope.onSubmit = onSubmit;

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {
        customFields: [],
    };

    $scope.options = {};

    $scope.toggleDataOption1 = [{
        label: 'mandatory',
        value: 0
    }]

    $scope.toggleDataOption2 = [{
        label: 'optional',
        value: 1
    }, {
        label: 'off',
        value: 2
    }]

    $scope.toggleDataOption3 = [{
        label: 'mandatory',
        value: 0
    }, {
        label: 'optional',
        value: 1
    }, {
        label: 'off',
        value: 2
    }]


    $scope.fields = [{
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="candidate-information-field-label">CANDIDATE INFORMATION</h4><hr>'
        }, {
            key: 'general.fullNameField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Full Name',
                toggleData: $scope.toggleDataOption1,
                fieldData: { label: 'Full Name' }
            }
        }, {
            key: 'general.emailField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Email',
                toggleData: $scope.toggleDataOption1,
                fieldData: { label: 'Email' }
            }
        }, {
            key: 'general.resumeField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Resume/CV',
                toggleData: $scope.toggleDataOption3,
                fieldData: { label: 'Resume' }

            }
        }, {
            key: 'general.phoneField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Phone',
                toggleData: $scope.toggleDataOption3,
                fieldData: { label: 'Phone' }

            }
        }, {
            key: 'general.currentCompanyField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Current Company',
                toggleData: $scope.toggleDataOption3,
                fieldData: { label: 'Current Company' }
            }
        }, {
            noFormControl: false,
            className: 'col-md-12',

            template: '<h4 class="links-field-label">LINKS</h4><hr>'
        }, {
            key: 'links.linkedInLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'LinkedIn URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'LinkedIn URL' }

            }
        }, {
            key: 'links.twitterLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Twitter URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'Twitter URL' }

            }
        }, {
            key: 'links.githubLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'GitHub URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'GitHub URL' }

            }
        }, {
            key: 'links.portfolioLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Portfolio URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'Portfolio URL' }

            }
        }, {
            key: 'links.otherLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Other Website',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'Other Website' }

            }
        }, {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="custom-questions-field-label">CUSTOM QUESTIONS</h4><hr>'
        }, {
            noFormControl: true,
            className: 'col-md-12',
            templateUrl: '/js/postings/edit/application/customize/questions-preview.html',
        }, {
            noFormControl: true,
            className: 'col-md-12',
            templateUrl: '/js/postings/edit/application/modal/modal-popup.html'
        }


    ];

});
