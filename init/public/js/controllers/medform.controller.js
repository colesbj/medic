// Instantiate the controller
angular.module('autoMedic')
  .controller('medformController', medformController);

// Load our service into the controller
medformController.$inject = [
  '$scope',
  '$state',
  '_med'
];

function medformController($scope, $state, _med) {
  $scope.createMed= createMed;
  $state.go('medform.medication');


  // Our form will fill this in for us
  $scope.med = { };
  $scope.med.dispensingFreq= 1;// default to daily
  $scope.inputTime=[1];
  $scope.med.dispensingTime = []; // starts as an array  
  $scope.currentdate = new Date();// current date used on medform-startdate  
  $scope.med.startDate = new Date();// stores the startdate for the medication to be dispensed
  $scope.hstep = 1; 
  $scope.mstep = 1;
  $scope.ismeridian = true;
  $scope.inventoryCheck = [];
  $scope.free = null;
  $scope.counter = 1; 
  
  //used as am imventory check
  $scope.inventoryCheck = [];

  // gets all the inventory slots 
  _med.getAll().then(function(data) {
    data.data.forEach(function(elem){ 
      $scope.inventoryCheck.push(elem.inventorySlot);
    }); // obtains all the inventory slots 
      $scope.inventoryCheck.sort(); // sorts then in a array
      $scope.inventoryCheck.some(function(elem,index){
        if((index+1)!=elem){
          $scope.free = index+1;
          //console.log(index+1);
          return elem != index+1;
        }
      });
      //console.log($scope.inventoryCheck);     
});
  
  $scope.med.specialInstructions = [false,false,false,false,false,'Enter More Instructions'];
 
  //Date Picker 

  $scope.minDate = new Date();

  $scope.maxDate = new Date(2020,5,22); 
  $scope.dateOptions = { 
    formatYear: 'yy',
    startingDay: 1};
   $scope.popup1 = {
    opened: false
  };

  $scope.open = function() {
    $scope.popup1.opened = true;
  };

  //changes the number of Time inputs
  $scope.radioChange=function(){
    $scope.inputTime = [];
    $scope.med.dispensingTime = [];
    for(i =0; i<$scope.med.dispensingFreq;i++){
      $scope.inputTime[i]=i;
      $scope.med.dispensingTime[i]= new Date();
    };
  }

    $scope.timeSort=function(){
    $scope.med.dispensingTime.sort();
  }


  $scope.change=function(){
    $scope.med.specialInstructions[5] = 'Enter More Instructions';
  }


  $scope.displayFreq= ['Self Medicate','Once Daily','Twice Daily','Three Times Daily'];

  function createMed() {
    if ($scope.medicationForm.$valid) {
      //$scope.inventoryCheck =_med.getAll().data;
        if($scope.free !=null){
        $scope.med.inventorySlot = $scope.free;
      };
        $scope.med.dateAdded = new Date(); 
       _med.create($scope.med)
       .then(function() {
          // check to the medication was added to the inventory
          $state.go('inventory');
        });
      //$scope.med.inventorySlot = Math.floor((Math.random() * 8) + 1);

    }
  }
}