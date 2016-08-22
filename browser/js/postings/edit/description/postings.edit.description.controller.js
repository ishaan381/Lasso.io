app.controller('editDescriptionCtrl', function (_, $scope, formlyVersion, $q, $http, countries, thisJob, Job, $state, JobDescriptions) {

    const vm = this;

    vm.countries = countries.data;

    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {};
    console.log('job:', thisJob);
    console.log('job desc:', thisJob.jobDescription);

    _.assign(vm.model, JSON.parse(thisJob.jobDescription.fields));

    vm.options = {};

    function onSubmit() {
      var descriptionData = {fields: JSON.stringify(vm.model)};
      JobDescriptions.update(thisJob.id, descriptionData)
      .then(() => $state.go('editPosting.application', {id: thisJob.id}));

    }

    // function assignment
    vm.onSubmit = onSubmit;


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

});
