app.controller('newDescriptionCtrl', function ($scope, formlyVersion) {
  var vm = this;

  vm.description = {};

  // note, these field types will need to be
  // pre-defined. See the pre-built and custom templates
  // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
  var onSubmit = function () {
    console.log('submit button pressed');
  }

  vm.onSubmit = onSubmit;

  vm.originalFields = angular.copy(vm.fields);

  vm.env = {
    angularVersion: angular.version.full,
    formlyVersion: formlyVersion
  }

  var countriesList = [
    {
      "name": 'Trinidad and Tobago',
      "code": 'TTO'
    },
    {
      "name": "Madagascar",
      "code": "MDG"
    }
  ];

  vm.descriptionFields = [
    {
      key: 'jobTitle',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Position Title',
        placeholder: ''
      }
    },
    {
      key: 'department',
      type: 'input',
      templateOptions: {
        label: 'Department'
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Job Description'
      }
    },
    {
      key: 'country',
      type: 'ui-select',
      templateOptions: {
        label: 'Country',
        valueProp: 'code',
        labelProp: 'name',
        options: countriesList
      }
    }
  ];
});
