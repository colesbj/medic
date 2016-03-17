angular.module('autoMedic')
  .controller('dispensingController', dispensingController);

// Load in our dependencies for this controller (we need _med!)
dispensingController.$inject = [
  '$scope',
  '$stateParams',
  '$state',
  '_med',
  'mySocket'


  // Resolves
];
function dispensingController($scope, $stateParams,$state, _med,mySocket) {

	_med.getOne($stateParams.medID).then(function(data) {
   		$scope.med = data.data;
   		$scope.date = new Date();
   });

	mySocket.on('sent',function(data){
		console.log(typeof data); 
		console.log(data.length); 
		if(data == 'HIGH\r'){
	
		$state.go('inventory');
		}  
	}); 

}