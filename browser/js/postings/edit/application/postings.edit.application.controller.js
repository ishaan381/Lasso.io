app.controller('editApplicationCtrl', function(_, $scope, formlyVersion, $q, $http, JobDescriptions, Job, sharedModal) {

    // WATCH FOR MODAL CHANGES SHARING SERVICE 
    $scope.$watch(function() {
        return sharedModal.modal;
    }, function(newVal, oldVal) {
        if (newVal) {
            if (!vm.model.customFields) {
                vm.model.customFields = [];
                vm.model.customFields.push(newVal);
            } else {
                vm.model.customFields.push(newVal);
            }
        }
    })

    // CUSTOM QUESTIONS PREVIEW DRAGGABLE THINGY

    $scope.lists = [
        {
            label: "Preview",
            allowedTypes: ['man'],
            max: 4,
            people: [
                {name: "Bob", type: "man"},
                {name: "Charlie", type: "man"},
                {name: "Dave", type: "man"}
            ]
        }
    ];

    // Model to JSON for demo purpose
    $scope.$watch('lists', function(lists) {
        $scope.modelAsJson = angular.toJson(lists, true);
    }, true);


    // FORM GENERATION 


    const vm = this;

    vm.originalFields = angular.copy(vm.fields);

    // function definition
    function onSubmit() {

    }

    // function assignment
    vm.onSubmit = onSubmit;

    vm.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    vm.model = {};

    vm.options = {};

    vm.toggleDataOption1 = [{
        label: 'mandatory',
        value: 0
    }]

    vm.toggleDataOption2 = [{
        label: 'optional',
        value: 1
    }, {
        label: 'off',
        value: 2
    }]

    vm.toggleDataOption3 = [{
        label: 'mandatory',
        value: 0
    }, {
        label: 'optional',
        value: 1
    }, {
        label: 'off',
        value: 2
    }]


    vm.fields = [{
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="candidate-information-field-label">CANDIDATE INFORMATION</h4><hr>'
        }, {
            key: 'hasFullNameField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Full Name',
                toggleData: vm.toggleDataOption1
            }
        }, {
            key: 'hasEmailField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Email',
                toggleData: vm.toggleDataOption1
            }
        }, {
            key: 'hasResumeField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Resume/CV',
                toggleData: vm.toggleDataOption3
            }
        }, {
            key: 'hasPhoneField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Phone',
                toggleData: vm.toggleDataOption3
            }
        }, {
            key: 'hasCurrentCompanyField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Current Company',
                toggleData: vm.toggleDataOption3
            }
        }, {
            noFormControl: false,
            className: 'col-md-12',

            template: '<h4 class="links-field-label">LINKS</h4><hr>'
        }, {
            key: 'hasLinkedInLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'LinkedIn URL',
                toggleData: vm.toggleDataOption2
            }
        }, {
            key: 'hasTwitterLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Twitter URL',
                toggleData: vm.toggleDataOption2
            }
        }, {
            key: 'hasGithubLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'GitHub URL',
                toggleData: vm.toggleDataOption2
            }
        }, {
            key: 'hasPortfolioLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Portfolio URL',
                toggleData: vm.toggleDataOption2
            }
        }, {
            key: 'hasOtherLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Other Website',
                toggleData: vm.toggleDataOption2
            }
        }, {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="custom-questions-field-label">CUSTOM QUESTIONS</h4><hr>'
        }, 
        {
          noFormControl: true,
          className: 'col-md-12',
          templateUrl: '/js/postings/edit/application/questions-preview.html',
        },
        {
            noFormControl: true,
            className: 'col-md-12',
            templateUrl: '/js/postings/edit/application/modal-popup.html'
        }


    ];

});
