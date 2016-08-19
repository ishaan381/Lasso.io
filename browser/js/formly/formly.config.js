  app.run(function(formlyConfig) {
      // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
      formlyConfig.extras.removeChromeAutoComplete = true;

      // Configure custom types
      formlyConfig.setType({
          name: 'ui-select-single',
          extends: 'select',
          templateUrl: 'js/formly/ui-select-single.html'
      });
      formlyConfig.setType({
          name: 'ui-select-single-select2',
          extends: 'select',
          templateUrl: 'js/formly/ui-select-single-select2.html'
      });
      formlyConfig.setType({
          name: 'ui-select-single-search',
          extends: 'select',
          templateUrl: 'js/formly/ui-select-single-async-search.html'
      });

      formlyConfig.setType({
          name: 'ui-select-multiple',
          extends: 'select',
          templateUrl: 'js/formly/ui-select-multiple.html'
      });

      formlyConfig.setType({
          name: 'textEditor',
          templateUrl: 'js/formly/textAngular.html',
          wrapper: ['bootstrapLabel', 'bootstrapHasError']
      });

      formlyConfig.setType({
          name: 'toggleButton',
          templateUrl: 'js/formly/toggleButton.html',
          wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      })

      formlyConfig.setWrapper({
          name: 'panel',
          templateUrl: 'js/formly/panel.html'
      });

      formlyConfig.setType({
          name: 'toggleCheckbox',
          templateUrl: 'js/formly/toggleCheckbox.html',
          wrapper: ['bootstrapLabel', 'bootstrapHasError'],
          link: function(scope, el) {
                  const button = angular.element(el.find('toggle-checkbox')[0])
              }
      });

      formlyConfig.setType({
          name: 'upload',
          templateUrl: 'js/formly/upload.html',
          wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      });

  });
