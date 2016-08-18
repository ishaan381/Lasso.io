app.factory('JobApplication', function($http) {
  var JobApplication = {};

  let fields = [{
    noFormControl: true,
    className: 'col-md-12',
    template: '<h4 class="section-title">PERSONAL INFO</h4>'
  }];

  function generateLinks(links) {
    for (let link in links) {
      let inputConfig = links[link].value;
      if (inputConfig === 0 || inputConfig === 1) {
        fields.push({
          noFormControl: true,
          className: 'col-md-3',
          template: '<h5 class="default-input-labels">' + links[link].label + '</h5>'
        })
        fields.push({
          key: link,
          type: 'input',
          className: 'col-md-8 default-inputs',
          templateOptions: {
            type: 'text',
            required: (inputConfig === 0) ? true : false
          }
        })
      }
    }
    fields.push({
      noFormControl: true,
      className: 'col-md-12',
      template: '<h4 class="section-title">QUESTIONS</h4>'
    })
  }

  function generatePersonalInfo(personalInfo) {
    for (let field in personalInfo) {
      let fieldConfig = personalInfo[field].value;
      if (fieldConfig === 0 || fieldConfig === 1) {
        fields.push({
          noFormControl: true,
          className: 'col-md-3',
          template: '<h5 class="default-input-labels">' + personalInfo[field].label + '<span class="required" ng-show=' + (fieldConfig === 0 ? true : false) + '>*</span></h5>'
        })
        fields.push({
          key: field,
          type: 'input',
          className: 'col-md-8 default-inputs',
          templateOptions: {
            type: 'text',
            required: (fieldConfig === 0) ? true : false
          }
        })
      }
    }
    fields.push({
      noFormControl: true,
      className: 'col-md-12',
      template: '<h4 class="section-title">LINKS</h4>'
    })
  }

  function generateCustoms(customQs) {
    customQs.forEach(obj => {

      let outerConfig;

      if (obj.field === 'text') outerConfig = 'input'
      if (obj.field === 'textbox') outerConfig = 'textarea'
      if (obj.field === 'dropdown') outerConfig = 'select'
      if (obj.field === 'radio' || obj.field === 'dropdown' || obj.field === 'checkbox') {
        obj.advanced.options.map(function(optionObj) {
          optionObj.name = optionObj.value;
        })
      }
      if (obj.field === 'checkbox') outerConfig = 'multiCheckbox'

      fields.push({
        noFormControl: true,
        className: 'col-md-3',
        template: '<h5 class="default-input-labels">' + obj.basic.question + '</h5>'
      })
      fields.push({
        key: obj.id,
        type: outerConfig || obj.field,
        className: 'col-md-8 default-inputs',
        templateOptions: {
          options: obj.advanced.options,
          rows: 8,
          cols: 15
        }
      })
    })
    }



  var JobApplication = {};

  JobApplication.create = function(jobApp) {
    return $http.post('/api/jobs/applications', jobApp)
      .then(function(res) {
        return res.data;
      })
  }

  JobApplication.fetch = function(jobId) {
    return $http.get('/api/jobs/applications/' + jobId)
  }

  JobApplication.getFields = function(application) {
    generatePersonalInfo(application.general);
    generateLinks(application.links);
    generateCustoms(application.customFields);
    return fields;
  }



  return JobApplication;
});
