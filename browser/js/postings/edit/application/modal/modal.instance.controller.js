// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function(_, $scope, formlyVersion, $uibModalInstance, $q, $http) {

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

    vm.options = { formState: { originalModel: vm.model } };

    vm.fields = [

        // https://github.com/formly-js/angular-formly/issues/426

        {
            key: 'field',
            type: 'ui-select-single',
            className: 'col-md-12',
            templateOptions: {
                optionsAttr: 'bs-options',
                ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                valueProp: 'value',
                labelProp: 'label',
                placeholder: 'Select a question type',
                options: [{ 'value': 'text', 'label': '<i class="fa fa-i-cursor pr-10" aria-hidden="true"></i>Text (Single Line)' },
                    { 'value': 'textbox', 'label': '<i class="fa fa-paragraph pr-10" aria-hidden="true"></i>Textbox' },
                    { 'value': 'dropdown', 'label': '<i class="fa fa-plus-square-o pr-10" aria-hidden="true"></i>Dropdown' },
                    { 'value': 'upload', 'label': '<i class="fa fa-paperclip pr-10" aria-hidden="true"></i>File Upload' },
                    { 'value': 'radio', 'label': '<i class="fa fa-stop-circle-o pr-10" aria-hidden="true"></i>Multiple Choice' },
                    { 'value': 'checkbox', 'label': '<i class="fa fa-check-square-o pr-10" aria-hidden="true"></i>Checkboxes' }
                ],
                required: true,
                onChange: resetModel
            }
        },
        {
            noFormControl: false,
            template: '<hr><br /><br />'
        }, {
            key: 'basic',
            wrapper: 'panel',
            hideExpression: '!model.field',
            templateOptions: { label: 'Basic Information' },
            className: 'modal-basic-panel col-md-12',
            fieldGroup: [{
                key: 'title',
                type: 'input',
                templateOptions: {
                    placeholder: 'Enter title ...'
                }
            }, {
                key: 'question',
                type: 'input',
                templateOptions: {
                    placeholder: 'Type your question ...'
                }

            }]
        }, {
            key: 'advanced',
            wrapper: 'panel',
            className: 'modal-advanced-panel col-md-12',
            hideExpression: '!model.field',
            templateOptions: { label: 'Options / Configuration' },
            fieldGroup: [{
                noFormControl: true,
                className: 'col-md-12',
                hideExpression: 'formState.originalModel.field !== "dropdown"',

                template: '<h5 class="advanced-panel-text">Choices</h5><hr />'
            }, {
                type: "repeatSection",
                key: "options",
                className: "dropdown-repeat",
                hideExpression: 'formState.originalModel.field !== "dropdown"',
                templateOptions: {
                    btnText: "add a dropdown option",
                    label: "Choices",
                    fields: [{
                        className: "row",
                        fieldGroup: [{
                            className: "col-md-12 section-title-field",
                            type: "input",
                            key: "value",
                            templateOptions: {
                                placeholder: 'Add a dropdown option ...'
                            }
                        }]
                    }]
                }
            }, {
                noFormControl: true,
                className: 'col-md-12',
                hideExpression: 'formState.originalModel.field !== "radio"',

                template: '<h5 class="options-panel-text">Choices</h5><hr />'
            }, {
                type: "repeatSection",
                key: "options",
                className: "dropdown-repeat",
                hideExpression: 'formState.originalModel.field !== "radio"',
                templateOptions: {
                    btnText: "add a multiple choice option",
                    label: "Choices",
                    fields: [{
                        className: "row",
                        fieldGroup: [{
                            className: "col-md-12 section-title-field",
                            type: "input",
                            key: "value",
                            templateOptions: {
                                placeholder: 'Add a multiple choice option ...'
                            }
                        }]
                    }]
                }
            }, {
                noFormControl: true,
                className: 'col-md-12',
                hideExpression: 'formState.originalModel.field !== "checkbox"',

                template: '<h5 class="options-panel-text">Choices</h5><hr />'
            }, {
                type: "repeatSection",
                key: "options",
                className: "dropdown-repeat",
                hideExpression: 'formState.originalModel.field !== "checkbox"',
                templateOptions: {
                    btnText: "add a checkbox option",
                    label: "Choices",
                    fields: [{
                        className: "row",
                        fieldGroup: [{
                            className: "col-md-12 section-title-field",
                            type: "input",
                            key: "value",
                            templateOptions: {
                                placeholder: 'Add a checkbox option ...'
                            }
                        }]
                    }]
                }
            }, ]
        }
    ];

    function resetModel() {
        vm.model.options = {};
        vm.model.basic = {};
    }

    $scope.ok = function() {
        $uibModalInstance.close(vm.model);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

});
