app.controller('newDescriptionCtrl', function (_, $scope, formlyVersion, $q, $http, countries, JobDescriptions, Job) {

    const vm = this;

    vm.countries = countries.data;
    vm.originalFields = angular.copy(vm.fields);

    function refreshAddresses(address, field) {
      var promise;
      if (!address) {
        promise = $q.when({data: {results: []}});
      }
      else {
        var endpoint = '//maps.googleapis.com/maps/api/geocode/json?components=administrative_area:' + address + '|country:' + vm.model.country
        promise = $http.get(endpoint);
      }
      return promise.then(response => {
        field.templateOptions.options = response.data.results;
      });
    }

    // function definition
    function onSubmit() {
      var companyId = 1;
      var descriptionData = {fields: JSON.stringify(vm.model), companyId: companyId};
      var jobData = {};
      JobDescriptions.create(descriptionData)
      .then(data => {
        jobData.descriptionId = data.id;
        jobData.companyId = companyId;
        return Job.create(jobData);
      })
      .then(data => {
        console.log(data);
      })
    }

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
        noFormControl: true,
        template: '<h4 class="essentials-field-label">ESSENTIALS</h4><hr>'
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
        template: '<h4 class="sections-field-label">SECTIONS<span class="sections-field-detail-label">(for requirements, responsibilities, etc.)</span></h4><hr>'
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
                    label: "Section Title"
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
        template: '<h4 class="closings-field-label">CLOSING / METADATA<span class="closings-field-detail-label"> (optional)</span></h4><hr>'
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
});
