app.controller('dndCtrl', function(_, $scope, formlyVersion, $q, $http, sharedModal) {

    // Used in questions-preview.html by the drag-and-drop directive.
    $scope.lists = [{
        label: "Preview",
        questions: []
    }];

    /*
        // ---
        // WATCHERS.
        // ---
    */

    // Watches service for a new modal saved from modal popup.
    // See ::modal.controller.js which saves the modal instance into sharedModal.modal.
    // Pushes to questions list, which updates view.
    $scope.$watch(function() {
        return sharedModal.modal;
    }, function(newCustomField, oldVal) {
        if (newCustomField) {
            $scope.lists[0].questions.push(newCustomField);
        }
    })

    // Watches service for a pre-existing custom fields resolved from database.
    // Adds to questions list if it does, which updates view.
    // Comes from ^editApplicationCtrl
    // Note: should we unbind this?
    $scope.$watch(function() {
        return sharedModal.customFields;
    }, function(newVal) {
        console.log('wow');
        $scope.lists[0].questions = newVal;
    })

    // Watches questions list for updates. Adds incremented ID / tag to each custom field.
    // Updates sharedModal.customFields service which ^editApplicationCtrl is $watch-ing.

    $scope.$watch('lists', function(newVal) {
        $scope.lists[0].questions.forEach(function(question, idx) {
            question.id = 'custom-field-' + idx;
        })
        sharedModal.customFields = $scope.lists[0].questions;
    }, true)

    // Sets sharedModal.modal to null if state change --> if user had not saved changes
    // but has "saved" a modal instance.

    $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
        sharedModal.modal = null;
    });

    // Gets Font Awesome icon (used in questions-preview.html)

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

    /*
        // ---
        // DEBUG Drag and Drop directive.
        // ---
    */

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
