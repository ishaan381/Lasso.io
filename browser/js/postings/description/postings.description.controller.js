app.controller('newDescriptionCtrl', function ($scope, formlyVersion, $q, $http, countries) {
    var vm.testData;

    vm = this;
    vm.countries = countries.data;

    // function assignment
    vm.onSubmit = onSubmit;

    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {};

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
      {
        key: 'current',
        type: 'toggleCheckbox', // NOT WORKING YET
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
          "noFormControl": "true",
          "template": '<h3>SECTIONS (for requirements, responsibilities, etc.)</h3><hr>'
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
    }];

    vm.originalFields = angular.copy(vm.fields);

    function refreshAddresses(address, field) {
      console.log(address);
      console.log('hi');
      var promise;
      if (!address) {
        promise = $q.when({data: {results: []}});
      } else {
        var endpoint = '//maps.googleapis.com/maps/api/geocode/json?components=administrative_area:' + address + '|country:' + vm.model.country
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

});
