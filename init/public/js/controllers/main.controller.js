
// Instantiate the controller
angular.module('autoMedic')
  .controller('mainController', mainController);

// Load our service into the controller
mainController.$inject = [
  '$scope',
  '$state',
  '$interval',
  '_med'
];

function mainController($scope, $state, $interval, _med) {


	$interval(callAtInterval, 5000); // 5 minutes, callAtInterval called

	$scope.callAtInterval = callAtInterval;
	  
	function callAtInterval() {
	    console.log('Med check');
	}

}