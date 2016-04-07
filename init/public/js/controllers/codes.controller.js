angular.module('autoMedic')
  .controller('codesController', codesController);

// Load in our dependencies for this controller (we need _med!)
codesController.$inject = [
  '$scope',
  'mySocket'


  // Resolves
];
function codesController($scope, mySocket) {

  $scope.thecode = '';
  $scope.codes = [];

  $scope.onSend = onSend;

  function onSend(){
    $scope.codes.push($scope.thecode);
    console.log($scope.thecode);
    
    mySocket.emit('codes',{
       code: $scope.thecode
     }
    );

  }  


	// _med.getOne($stateParams.medID).then(function(data) {
 //   		$scope.med = data.data;
 //   		$scope.date = new Date();
      
 //   		mySocket.emit('dispense',
 //   			{
 //   				inventory:$scope.med.inventorySlot,
 //   				amount:$scope.med.dosage 
 //   		});
 //      // the amount of pills is equal to the amount then delete it
 //      if($scope.med.amount==$scope.med.dosage){
 //        _med.delete($scope.med._id);
 //        // used to update the main controller
 //        $scope.$emit('myreload',{r:1});
 //      }
 //   });


	// mySocket.on('sent',function(data){
	// 	console.log(typeof data); 
	// 	console.log(data.length); 
 //    console.log(data);
	// 	if(data == '1\r'){
	
	// 	$state.go('inventory');
	// 	}  
	// }); 

}