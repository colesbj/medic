angular.module('autoMedic')
  .controller('historyController', historyController);

historyController.$inject = [
	'$scope',
	'_med',

	'dispensed'
];

function historyController($scope, _med, dispensed){
	$scope.dispensed = dispensed.data;

}
