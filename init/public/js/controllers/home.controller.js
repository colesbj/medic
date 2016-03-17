angular.module('autoMedic')
  .controller('homeController', homeController);

homeController.$inject = [
	'$scope'
];

function homeController($scope, _med){

	$scope.weatherLocation = weatherLocation ;

	function weatherLocation(){

		console.log($scope) ;
		

	}

}
