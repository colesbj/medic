angular.module('autoMedic')
  .controller('serialtestController', serialtestController);

serialtestController.$inject = [
	'$scope',
	'mySocket'

];

function serialtestController($scope,mySocket){
	$scope.ledOn = function(){
		$scope.LEDState = "ON";
		mySocket.emit('led:on');
		console.log('ON'); 
	};
	$scope.ledOff = function(){
		$scope.LEDState = "OFF";
		mySocket.emit('led:off');
		console.log('off');
	};
	mySocket.on('sent',function(data){
		$scope.PINState = data; 
	}); 
}