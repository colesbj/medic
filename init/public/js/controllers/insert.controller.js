angular.module('autoMedic')
  .controller('insertController', insertController);

// Load in our dependencies for this controller (we need _med!)
insertController.$inject = [
  '$scope',
  '$stateParams',
  '$state',
  '_med',
  'mySocket'


  // Resolves
];
function insertController($scope, $stateParams,$state, _med,mySocket) {

  $scope.showInstruction = false; 

	_med.getOne($stateParams.medID).then(function(data) {
   		$scope.med = data.data;
   		mySocket.emit('insert',
   			{
   				inventory:$scope.med.inventorySlot
   		});
   });

  

	mySocket.on('sent',function(data){
		console.log(typeof data); 
		console.log(data.length); 
    console.log(data);
		if(data == '021\r'){
	     $scope.showInstruction = true;
		
		}  
	}); 

  



}