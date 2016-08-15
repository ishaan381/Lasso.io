app.controller('editDescriptionCtrl', function (_, $scope, formlyVersion, $q, $http, countries, thisJob) {

    const vm = this;

    vm.countries = countries.data;

    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {
    };

    console.log(thisJob.jobDescription);
    _.assign(vm.model, JSON.parse(thisJob.jobDescription.fields));

    vm.options = {};

    vm.fields = [
      {
        noFormControl: true,
        template: '<h4 class="essentials-field-label">ESSENTIALS </h4><hr>'
      },
      {
        key: 'title',
        type: 'input',
        className: 'col-md-8 col-sm-12',
        templateOptions: {
          type: 'text',
          label: 'Position Title',
          placeholder: 'Job Title',
          required: true,
        }
      },
      {
        key: 'department',
        type: 'input',
        className: 'col-md-4 col-sm-12',
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
          options: vm.countries,
          required: true
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
        key: 'commitment',
        type: 'toggleCheckbox',
        className: 'col-md-4',
        defaultValue: 'Part-Time',
        templateOptions: {
          label: 'Commitment',
          toggleData: {'unchecked': 'Part-Time', 'checked': 'Full-Time'},
        }
      },
      {
        noFormControl: true,
        className: 'col-md-12 description-field-label',
        template: '<p>Job Description</p>'
      },
      {
        key: 'description',
        type: 'textEditor',
        className: 'text-editor'
      },
      {
        noFormControl: true,
        template: '<h4 class="sections-field-label">SECTIONS <span class="sections-field-detail-label"> (for requirements, responsibilities, etc.)</span></h4><hr>'
      },
      {
        type: "repeatSection",
        key: "sections",
        templateOptions: {
          btnText: "add a section",
          fields: [
            {
              className: "row",
              fieldGroup: [
                {
                  className: "col-md-12 section-title-field",
                  type: "input",
                  key: "sectionTitle",
                  templateOptions: {
                    label: "Section Title",
                  }
                }
              ]
            },
            {
              className: "row",
              fieldGroup: [
                {
                  key: 'description',
                  type: 'textEditor',
                  className: 'text-editor col-md-12',
                  templateOptions: {
                    label: 'Section Body'
                  }
                }
              ]
            }
          ]
        }
      },
      {
        noFormControl: true,
        template: '<h4 class="closings-field-label">CLOSING / METADATA <span class="closings-field-detail-label"> (optional)</span></h4><hr>'
      },
      {
        type: "textarea",
        key: "closing",
        className: "closing-field",
        templateOptions: {
          placeholder: "Add a closing ...",
          rows: 4,
          cols: 15
        }
      }
    ];

    vm.originalFields = angular.copy(vm.fields);

    function refreshAddresses(address, field) {
      var promise;
      if (!address) {
        if (vm.model.region) {
          promise = $q.when({data: {results: [{'formatted_address': vm.model.region}]}})
        }
        else {
          promise = $q.when({data: {results: []}});
        }
      }
      else {
        var endpoint = '//maps.googleapis.com/maps/api/geocode/json?components=administrative_area:' + address + '|country:' + vm.model.country
        promise = $http.get(endpoint);
      }
      return promise.then(response => {
        field.templateOptions.options = response.data.results;
      });
    }

});
