app.controller('panelCtrl', function(_, $scope, formlyVersion, $log, $q, $http, $state, sharedStages) {

    // Watches selected stage in sharedStages factory.
    // On new selected stage, set panel tabs for stage
    // on $scope on var tabs.
    $scope.$watch(function() {
        return sharedStages.selectedStage;
    }, function(newSelectedStage, oldSelectedStage) {
        if (newSelectedStage) {
            tabs = newSelectedStage.panels;
            $scope.tabs = newSelectedStage.panels;
        }
    }, true)

    // Watches tabs for add / delete.
    // On change, set selectedStage panel to be new panel tabs in
    //  sharedStages service.

    $scope.$watch('tabs', function(newTabs, oldTabs) {
        if (newTabs) {
            if (sharedStages.selectedStage) {
                sharedStages.selectedStage.panels = newTabs;
            }
        }
    }, true)

    // Some Tab Logic

    var tabs = [
            { title: 'Instruction', content: "Some instructions.", templateUrl: '/js/postings/edit/pipeline/panel-templates/default-form.html', panelId: 0, panelQuestions: [] },
        ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old) {
    });

    $scope.addTab = function() {
        tabs.push({ title: 'Interview Kit', templateUrl: '/js/postings/edit/pipeline/panel-templates/default-form.html', panelId: tabs.length, panelQuestions: [] })
        $scope.selectedIndex = tabs.length - 1;
        console.log('After push', $scope.selectedIndex, tabs.length)
    };

    $scope.tabRemoveToggle = true;

    $scope.removeTab = function(tab) {
        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);

        tabs.forEach(function(tab, index) {
            tab.panelId = index;
        })

        $scope.tabRemoveToggle = !$scope.tabRemoveToggle;
    };
});
