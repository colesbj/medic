angular.module('autoMedic')
  .controller('scheduleController', scheduleController);

scheduleController.$inject = [
	'$scope',
	'$interval',
	'_med'
];

function scheduleController($scope,$interval, _med){
// 	_med.getSchedule().then(function(data){
//     $scope.myid = data.data[0]._id;
//     $scope.schedule = data.data[0].schedule;
//     //$scope.schedule.splice(0,1);
//    	$scope.schedule.sort(function(a, b) {
//     a = new Date(a.dispensingTime);
//     b = new Date(b.dispensingTime);
//     return a<b ? -1 : a>b ? 1 : 0;
// 	});
// });
/*
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

	 $scope.currentdate = new Date();
	// $scope.hour = $scope.date.getHours(); 
	// $scope.currenttime= $scope.hour*3600+$scope.date.getMinutes()*60+$scope.date.getSeconds(); 

	//$scope.mynum = Math.abs(-6);



	//$interval(callnow, 120000); // 2 minutes, callAtInterval called

	//$scope.callAnow = callnow;
	  
	function callnow() {
	    $scope.date =  new Date();
		$scope.hour = $scope.date.getHours(); 
		$scope.currenttime= $scope.hour*3600+$scope.date.getMinutes()*60+$scope.date.getSeconds();
		$scope.newschedule.forEach(function(elem){
			//console.log(elem); 
			//elem.timediff=$scope.currenttime-elem.mytime;

			if(Math.abs($scope.currenttime-elem.mytime)<=60){
				_med.notify(elem).then(function(){
					console.log(elem);
				});
				

			}

		}); 
	   }

	// }

	// $scope.schedule.forEach(function(elem,index){
	// 	if(elem.pillName == "Viagra"){
	// 		$scope.schedule.splice(index,1);
	// 	}
	// });
  */

}
