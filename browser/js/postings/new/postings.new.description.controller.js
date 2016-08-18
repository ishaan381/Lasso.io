app.controller('newDescriptionCtrl', function (_, $scope, formlyVersion, $q, $http, countries, JobDescriptions, Job) {

    const vm = this;

    vm.countries = countries.data;
    vm.originalFields = angular.copy(vm.fields);
    
    // function refreshAddresses(address, field) {
    //   var promise;
    //   if (!address) {
    //     promise = $q.when({data: {results: []}});
    //   }
    //   else {
    //     var endpoint = '//maps.googleapis.com/maps/api/geocode/json?components=administrative_area:' + address + '|country:' + vm.model.country
    //     promise = $http.get(endpoint);
    //   }
    //   return promise.then(response => {
    //     field.templateOptions.options = response.data.results;
    //   });
    // }

    // function definition
    function onSubmit() {
      var companyId = 1;
      var descriptionData = {fields: JSON.stringify(vm.model)};
      Job.create({companyId: companyId})
      .then(job => {
        descriptionData.jobId = job.id;
        return JobDescriptions.create(descriptionData);
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
        className: 'col-md-8',
        templateOptions: {
          type: 'text',
          label: 'Position Title',
          placeholder: 'Job Title',
          required: true,
          disabled: false
        }
      },
      {
        key: 'department',
        type: 'input',
        className: 'col-md-4',
        templateOptions: {
          type: 'text',
          label: 'Department',
          placeholder: 'Department',
          disabled: false
        }
      },
      {
        key: 'city',
        type: 'input',
        className: 'col-md-4',
        templateOptions: {
          type: 'text',
          label: 'City',
          placeholder: 'City',
          required: true
        }
      },
      {
        key: 'state',
        type: 'input',
        className: 'col-md-4',
        templateOptions: {
          type: 'text',
          label: 'State',
          placeholder: 'State',
          required: true
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
        template: '<div class="job-desc-title">Job Description</div>'
      },
      {
        key: 'description',
        type: 'textEditor',
        className: 'text-editor'
      },
      {
        noFormControl: true,
        template: '<h4 class="sections-field-label">SECTIONS <span class="sections-field-detail-label">(for requirements, responsibilities, etc.)</span></h4><hr>'
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
