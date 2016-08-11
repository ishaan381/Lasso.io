app.controller('newDescriptionCtrl', function ($scope, formlyVersion, $q, $http, countries) {
    var vm,testData;
    // $http.get('js/postings/description/countries.json')
    //      .then(function (res) {
    //       $scope.countries = res.data;
    //       console.log(res.data);
    //      })

    vm = this;
    vm.countries = countries.data;

    testData = [
      {
        "id": 1,
        "label":"Option 1"
      },
      {
        "id": 2,
        "label":"Option 2"
      },
      {
        "id": 3,
        "label":"Option 3"
      }
    ];
    
    // funcation assignment
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Mark Hayes',
      url: 'https://github.com/mhazy' // a link to your twitter/github/blog/whatever
    };
    
    vm.exampleTitle = 'UI Select (Angular 1.4+)';
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {
      // "jobTitle": null,
      // "department": null,
      // "country": null,
      // "select2Option": null,
      // "multipleOption": null,
      // "singleOptionAsync": null
    };
    
   
    vm.options = {};
    
    vm.fields = [
    {
      key: 'title',
      type: 'input',
      className: 'col-md-8',
      defaultValue: "",
      templateOptions: {
        type: 'text',
        label: 'Position Title',
        placeholder: 'Job Title'
      }
    },
    {
      key: 'department',
      type: 'input',
      className: 'col-md-4',
      templateOptions: {
        type: 'text',
        label: 'Department',
        placeholder: 'Department'
      }
    },
      {
        key: 'country',
        type: 'ui-select-single',
        className: 'country-field col-md-4',
        templateOptions: {
          optionsAttr: 'bs-options',
          ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
          label: 'Country',
          valueProp: 'code',
          labelProp: 'name',
          placeholder: 'Select a country',
          options: vm.countries
        }
      },
      {
        key: 'region',
        type: 'ui-select-single-search',
        className: 'region-field col-md-4',
        templateOptions: {
          optionsAttr: 'bs-options',
          ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
          label: 'Region',
          valueProp: 'formatted_address',
          labelProp: 'formatted_address',
          placeholder: 'Search',
          options: [],
          refresh: refreshAddresses,
          refreshDelay: 0
        }
      },
      // {
      //   key: 'region',
      //   type: 'ui-select-single-select2',
      //   className: 'region-field col-md-4',
      //   templateOptions: {
      //     optionsAttr: 'bs-options',
      //     ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
      //     label: 'State/Region',
      //     valueProp: 'id',
      //     labelProp: 'label',
      //     placeholder: 'State/Region',
      //     options: testData
      //   }
      // },
          // NOT WORKING YET
    {
      key: 'current', 
      type: 'toggleCheckbox',
      className: 'col-md-4',
      templateOptions: {
        label: 'Commitment',
        toggleData: {'unchecked': 'Part-Time', 'checked': 'Full-Time'},
      }
    },
      {
        key: 'description',
        type: 'textEditor',
        className: 'text-editor',
        templateOptions: {
          label: 'Job Description'
        }
      },
      {
        noFormControl: true,
        template: '<h3>SECTIONS (for requirements, responsibilities, etc.)</h3><hr>'
      },
      {
    "type": "repeatSection",
    "key": "sections",
    "templateOptions": {
      "btnText": "Add another section",
      "fields": [
        {
          "className": "row",
          "fieldGroup": [
            {
              "className": "col-md-12 section-title-field",
              "type": "input",
              "key": "sectionTitle",
              "templateOptions": {
                "label": "Section Title",
              }
            }
          ]
        },
        {

          "className": "row",
          "fieldGroup": [
            {
              "key": 'description',
              "type": 'textEditor',
              "className": 'text-editor col-md-12',
              "templateOptions": {
                "label": 'Section Body'
              }
            },

          ]
        }

      ]
    }
  },
      // {
      //   key: 'multipleOption',
      //   type: 'ui-select-multiple',
      //   templateOptions: {
      //     optionsAttr: 'bs-options',
      //     ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
      //     label: 'Multiple Select',
      //     valueProp: 'id',
      //     labelProp: 'label',
      //     placeholder: 'Select options',
      //     options: testData
      //   }
      // },
    ];

    vm.originalFields = angular.copy(vm.fields);
    
    function refreshAddresses(address, field) {
      console.log(address);
      console.log('hi');
      var promise;
      if (!address) {
        promise = $q.when({data: {results: []}});
      } else {
        // var params = {address: address, components: "country: vm.model.country", sensor: false};
        // console.log(params);
        // var endpoint = '//maps.googleapis.com/maps/api/geocode/json';
        var endpoint = '//maps.googleapis.com/maps/api/geocode/json?components=administrative_area:' + address + '|country:' + vm.model.country
        // promise = $http.get(endpoint, {params: params});
        promise = $http.get(endpoint);
      }
      return promise.then(function(response) {
        console.log(response.data.results);
        field.templateOptions.options = response.data.results;
      });
    }
    
    // function definition
    function onSubmit() {
      alert(JSON.stringify(vm.model), null, 2);
    }
  // var vm = this;

  // vm.description = {};

  // // note, these field types will need to be
  // // pre-defined. See the pre-built and custom templates
  // // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
  // var onSubmit = function () {
  //   console.log('submit button pressed');
  // }

  // vm.onSubmit = onSubmit;

  // vm.originalFields = angular.copy(vm.fields);

  // vm.env = {
  //   angularVersion: angular.version.full,
  //   formlyVersion: formlyVersion
  // }

  // var countriesList = [
  //   {
  //     "name": 'Trinidad and Tobago',
  //     "code": 'TTO'
  //   },
  //   {
  //     "name": "Madagascar",
  //     "code": "MDG"
  //   }
  // ];

  // vm.descriptionFields = [
  //   {
  //     key: 'jobTitle',
  //     type: 'input',
  //     templateOptions: {
  //       type: 'email',
  //       label: 'Position Title',
  //       placeholder: ''
  //     }
  //   },
  //   {
  //     key: 'department',
  //     type: 'input',
  //     templateOptions: {
  //       label: 'Department'
  //     }
  //   },
  //   {
  //     key: 'description',
  //     type: 'textarea',
  //     templateOptions: {
  //       label: 'Job Description'
  //     }
  //   },
  //   {
  //     key: 'country',
  //     type: 'ui-select',
  //     templateOptions: {
  //       label: 'Country',
  //       valueProp: 'code',
  //       labelProp: 'name',
  //       options: countriesList
  //     }
  //   }
  // ];
});