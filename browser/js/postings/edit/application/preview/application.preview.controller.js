app.controller('previewApplicationCtrl', function(_, $scope, $timeout, $interval, formlyVersion) {

    // const vm = this; //we dont use this, why?

    $scope.originalFields = angular.copy($scope.fields);

    // function definition
    function onSubmit() {}

    // function assignment
    $scope.onSubmit = onSubmit;

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    // $scope.model = {};

    $scope.options = {};

    $scope.fields = [];

    function generateFormMainHeader() {

    }

    function generateFormPostingHeader() {
        var postingTitle = {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="preview-posting-title">Analytics Manager</h4><hr>'
        }
        var postingDetails = {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="preview-posting-details">San Francisco, CA | Analytics | Full-Time</h4>'
        }
        $scope.fields.push(postingTitle);
        $scope.fields.push(postingDetails);
    }

    function generateFormDefaults() {
        var submitTitle = {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="preview-application-title">SUBMIT YOUR APPLICATION</h4><hr>'
        }

        $scope.fields.push(submitTitle);


        for (var info in $scope.model.general) {
            var infoData = $scope.model.general[info];

            if (infoData.value === 0 || infoData.value === 1) {
                var template = '<h4 class="preview-field-label">' + infoData.label;
                template += (infoData.value === 0 ? '<span class="required">*</span>' : "") + '</h4>';

                $scope.fields.push({
                    noFormControl: true,
                    className: 'col-md-4',
                    template: template
                })
                if (infoData.label === "Resume") {
                    $scope.fields.push({
                        key: info,
                        type: 'input',
                        className: 'col-md-8 default-inputs',
                        templateOptions: {
                            type: 'text',
                            disabled: true,
                            // label: infoData.label,
                            required: (infoData.value === 0) ? true : false,
                        }
                    })
                } else {
                    $scope.fields.push({
                        key: info,
                        type: 'input',
                        className: 'col-md-8 default-inputs',
                        templateOptions: {
                            type: 'text',
                            disabled: true,

                            // label: infoData.label,
                            required: (infoData.value === 0) ? true : false,
                        }
                    })
                }
            }
        }


        var linksTitle = {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="preview-application-link-title">LINKS</h4><hr>'
        }

        $scope.fields.push(linksTitle);


        for (var link in $scope.model.links) {
            // mandatory or optional link

            var linkData = $scope.model.links[link];

            if (linkData.value === 0 || linkData.value === 1) {
                $scope.fields.push({
                    noFormControl: true,
                    className: 'col-md-4',
                    template: '<h4 class="preview-field-label preview-application-link">' + linkData.label + '</h4>'
                })
                $scope.fields.push({
                    key: link,
                    type: 'input',
                    className: 'col-md-8 default-inputs',
                    templateOptions: {
                        disabled: true,
                        type: 'text',
                        required: (linkData.value === 0) ? true : false,
                    }
                })
            }
        }
    }

    function generateFormCustoms() {

        function generateTextField(field) {
            $scope.fields.push({
                key: field.id,
                type: 'input',
                className: 'col-md-8 custom-text-input',
                templateOptions: {
                    type: 'text',
                    disabled: true
                }
            })
        }

        function generateTextBoxField(field) {
            $scope.fields.push({
                type: "textarea",
                key: field.id,
                className: 'col-md-8',
                templateOptions: {
                    rows: 4,
                    cols: 15,
                    disabled: true
                }
            })

        }

        function generateDropdownField(field) {
            $scope.fields.push({
                key: field.id,
                type: 'ui-select-single',
                className: 'col-md-8',
                templateOptions: {
                    optionsAttr: 'bs-options',
                    ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                    valueProp: 'value',
                    labelProp: 'label',
                    placeholder: 'Select an option',
                    disabled: true,
                    options: field.advanced.options.map(function(option) {
                        return { "label": option.value, "value": option.value }
                    })
                }
            })
        }

        function generateCheckBoxes(field) {
            $scope.fields.push({
                key: field.id,
                type: 'multiCheckbox',
                className: 'col-md-8',
                templateOptions: {
                    options: field.advanced.options.map(function(option) {
                        return { "label": option.value, "value": option.value };
                    }),
                    valueProp: 'value',
                    labelProp: 'label',
                    disabled: true
                }
            })
        }

        function generateRadioField(field) {
            $scope.fields.push({
                "key": field.id,
                "type": "radio",
                className: 'col-md-8',
                "templateOptions": {
                    disabled: true,
                    "options": field.advanced.options.map(function(option) {
                        return { "name": option.value, "value": option.value };
                    })
                }
            })
        }

        var toggleFieldGenerator = {
            'dropdown': generateDropdownField,
            'radio': generateRadioField,
            'text': generateTextField,
            'textbox': generateTextBoxField,
            'checkbox': generateCheckBoxes
        }

        var customsTitle = {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="preview-application-link-title">Additional Questions</h4><hr>'
        }

        $scope.fields.push(customsTitle);

        function generateTitleQuestion(field) {
            // var customTitle = {
            //     noFormControl: true,
            //     className: 'col-md-12',
            //     template: '<h4 class="preview-custom-title">' + field.basic.title + '</h4><hr>'
            // }

            // $scope.fields.push(customTitle);

            var template = '<h5 class="preview-custom-question">' + field.basic.question + '</h5>';
            $scope.fields.push({
                noFormControl: true,
                className: 'col-md-4',
                template: template
            })

        }

        $scope.model.customFields.forEach(function(data) {
            // COL-MD-4
            generateTitleQuestion(data);
            // COL-MD-8
            toggleFieldGenerator[data.field](data)
        })

    }


    function generateForm() {
        generateFormMainHeader();
        generateFormPostingHeader();
        generateFormDefaults();
        generateFormCustoms();
    }

    $scope.$parent.$watch('model', function() {

        $scope.fields = [];
        $scope.model = $scope.$parent.model;
        generateForm();
    }, true);

});
