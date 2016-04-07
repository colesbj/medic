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
      
   		mySocket.emit('dispense',
   			{
   				inventory:$scope.med.inventorySlot,
   				amount:$scope.med.dosage 
   		});
      // the amount of pills is equal to the amount then delete it
      if($scope.med.amount==-1){
        _med.delete($scope.med._id);
        // used to update the main controller
        $scope.$emit('myreload',{r:1});
      }
   });


	mySocket.on('sent',function(data){
		console.log(typeof data); 
		console.log(data.length); 
    console.log(data);
		if(data == '011\r'){
	
		$state.go('inventory');
		}  
	}); 

}