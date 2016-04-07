
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

_med.getAll().then(function(data){
		$scope.med=data.data;
		$scope.newschedule =[];

		data.data.forEach(function(elem){
			elem.dispensingTime.forEach(function(element){
				$scope.temp = new Date(element); 
				$scope.newone = {
					userName:elem.userName,
					dosage:elem.dosage,
					notifyNumber:elem.notifyNumber,
					pillName:elem.pillName,
          			dispensingTime:element,
          			mytime: $scope.temp.getHours()*3600 + $scope.temp.getMinutes()*60 +$scope.temp.getSeconds(),
          			timediff:null
				}
				$scope.newschedule.push($scope.newone);
			});
		});
		$scope.newschedule.sort(function(a, b) {
	    a = new Date(a.dispensingTime);
	    b = new Date(b.dispensingTime);
	    return a<b ? -1 : a>b ? 1 : 0;
		});
	});
	
	$scope.$on('myreload',function(stuff){
	 _med.getAll().then(function(data){
		$scope.med=data.data;
		$scope.newschedule =[];

		data.data.forEach(function(elem){
			elem.dispensingTime.forEach(function(element){
				$scope.temp = new Date(element); 
				$scope.newone = {
					userName:elem.userName,
					dosage:elem.dosage,
					notifyNumber:elem.notifyNumber,
					pillName:elem.pillName,
          			dispensingTime:element,
          			mytime: $scope.temp.getHours()*3600 + $scope.temp.getMinutes()*60 +$scope.temp.getSeconds(),
          			timediff:null
				}
				$scope.newschedule.push($scope.newone);
			});
		});
		$scope.newschedule.sort(function(a, b) {
	    a = new Date(a.dispensingTime);
	    b = new Date(b.dispensingTime);
	    return a<b ? -1 : a>b ? 1 : 0;
		});
	});

	});



	$scope.thedate = new Date();

	$interval(callAtInterval, 120000); // 2 minutes, callAtInterval called

	$scope.callAtInterval = callAtInterval;
	  
	function callAtInterval() {
		$scope.date =  new Date();
		$scope.hour = $scope.date.getHours(); 
		$scope.currenttime= $scope.hour*3600+$scope.date.getMinutes()*60+$scope.date.getSeconds();
		$scope.newschedule.forEach(function(elem){
			//console.log(elem); 
			//elem.timediff=$scope.currenttime-elem.mytime;

			if(Math.abs($scope.currenttime-elem.mytime)<=60){
				_med.reminder(elem).then(function(){
					console.log(elem);
				});
				

			}

		}); 
	   
	}

}