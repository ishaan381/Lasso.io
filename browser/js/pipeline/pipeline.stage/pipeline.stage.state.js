app.config($stateProvider => {
  $stateProvider.state('pipeline.stage', {
    url: '/stage/:stageId?qualified',
    templateUrl: '/js/pipeline/pipeline.stage/pipeline.stage.html',
    controller: 'stageCtrl',
    resolve: {
    	stage: function (thisJob, $stateParams) {
    		return thisJob.stage.filter(stage => stage.id === +$stateParams.stageId)[0];
    	}
    }
  });
});
