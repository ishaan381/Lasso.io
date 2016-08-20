app.config($stateProvider => {
  $stateProvider.state('pipeline.stage', {
    url: '/stage/:stageId?qualified',
    templateUrl: '/js/pipeline/pipeline.stage/pipeline.stage.html',
    controller: 'stageCtrl',
    resolve: {
    	hi: function ($stateParams) {
    		console.log($stateParams.qualified);
    	}
    }
  });
});
