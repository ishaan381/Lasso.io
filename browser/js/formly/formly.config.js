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
          link: function(scope, el, attr) {
                  console.log(scope)
                  console.log(el);
                  const button = angular.element(el.find('toggle-checkbox')[0])
                      // console.log(button.attr('value'))
              }
              //   controller: [ '$scope', function ($scope) {
              //     $scope.formOptions = {formState: $scope.formState};
              //     console.log($scope.formOptions);
              //     console.log($scope.options);
              //     $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];

          //   }]
      });

  });
