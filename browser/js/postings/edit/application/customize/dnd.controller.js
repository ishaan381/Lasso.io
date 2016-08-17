app.controller('dndCtrl', function(_, $scope, formlyVersion, $q, $http, sharedModal) {
    $scope.lists = [{
        label: "Preview",
        questions: []
    }];

    $scope.$watch(function() {
        return sharedModal.modal;
    }, function(newCustomField, oldVal) {
        if (newCustomField) {
            // ADD IDS TO CUSTOM FIELDS
            newCustomField.id = $scope.lists[0].questions.length;
            // ADD TO FORM MODEL
            // $scope.model.customFields.push(newCustomField);
            // ADD TO VIEW (QUESTIONS-PREVIEW.HTML)
            $scope.lists[0].questions.push(newCustomField);
            console.log($scope.lists[0]);
        }
    })

    $scope.$watch('lists', function(newVal) {
        console.log('updated');
        $scope.lists[0].questions.forEach(function (question, idx) {
            question.id = 'custom-field-' + idx;
        })
        sharedModal.customFields = $scope.lists[0].questions;
    }, true)

    $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
        sharedModal.modal = null;
    });

    $scope.getFieldIcon = function(value) {
        switch (value) {
            case 'text':
                return '<i class="fa fa-i-cursor pr-10" aria-hidden="true"></i>';
            case 'textbox':
                return '<i class="fa fa-paragraph pr-10" aria-hidden="true"></i>';
            case 'dropdown':
                return '<i class="fa fa-plus-square-o pr-10" aria-hidden="true"></i>';
            case 'upload':
                return '<i class="fa fa-paperclip pr-10" aria-hidden="true"></i>';
            case 'radio':
                return '<i class="fa fa-stop-circle-o pr-10" aria-hidden="true"></i>';
            case 'checkbox':
                return '<i class="fa fa-check-square-o pr-10" aria-hidden="true"></i>';
        }
    }

    // DEBUG DND
    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
        $scope.logListEvent('dropped at', event, index, external, type);

        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;
    };

    $scope.logEvent = function(message, event) {
        console.log(message, '(triggered by the following', event.type, 'event)');
        console.log(event);
    };

    $scope.logListEvent = function(action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element is ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };
    console.log($scope.lists);

});
