app.controller('applicantFormCtrl', function(_, $rootScope, $scope, formlyVersion, $q, $http, $stateParams, job) {



    $rootScope.$broadcast('applicantView');

    $scope.description = JSON.parse(job.jobDescription.fields);
    $scope.application = JSON.parse(job.jobApplication.fields);

    console.log($scope.description);
    console.log($scope.application);

    // FORM GENERATION

    $scope.originalFields = angular.copy($scope.fields);

    // On Form Submit
    function onSubmit() {

    }

    $scope.onSubmit = onSubmit;

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {

    };

    $scope.options = {};

    let links = $scope.application.links;

    let personalInfo = $scope.application.general;


    $scope.fields = [{
        noFormControl: true,
        className: 'col-md-12',
        template: '<h4 class="application-title">SUBMIT YOUR APPLICATION</h4><hr>'
    }];

    function generateLinks() {
        for (let link in links) {
            let inputConfig = links[link].value;
            if (inputConfig === 0 || inputConfig === 1) {
                $scope.fields.push({
                    noFormControl: true,
                    className: 'col-md-4',
                    template: '<h4 class="default-input-labels">' + links[link].label + '</h4>'
                })
                $scope.fields.push({
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
    }

    function generatePersonalInfo() {
        for (let field in personalInfo) {
            let fieldConfig = personalInfo[field].value;
            if (fieldConfig === 0 || fieldConfig === 1) {
                $scope.fields.push({
                    noFormControl: true,
                    className: 'col-md-4',
                    template: '<h4 class="default-input-labels">' + personalInfo[field].label + '<span class="required" ng-show=' + (fieldConfig === 0 ? true : false) + '>*</span></h4>'
                })
                $scope.fields.push({
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
    }

    function generateDefaults() {
        generatePersonalInfo();
        generateLinks();
    }

    generateDefaults();

});
