
// Instantiate the controller
angular.module('autoMedic')
  .controller('inventoryController', inventoryController)


// Load in our dependencies for this controller (we need _med!)
inventoryController.$inject = [
  '$scope',
  '_med',

  // Resolves
  'meds'
];

function inventoryController($scope, _med, meds) {
  $scope.meds = meds.data;
  console.log(meds);


  $scope.currentIndex = 0 ;
  $scope.setCurrentMedIndex = function (index) {
    $scope.currentIndex = index;
  } ;
  $scope.isCurrentMedIndex = function (index) {
    return $scope.currentIndex === index ;
  } ;

  $scope.nextMed = function() {
    $scope.currentIndex = ($scope.currentIndex < $scope.meds.length -1) ? ++$scope.currentIndex : 0 ;
  } ;
  $scope.prevMed = function() {
    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.meds.length-1 ;
  } ;


  $scope.deleteMed = deleteMed;

  function deleteMed(med, index) {


    $scope.currentIndex = --$scope.currentIndex ;

    _med.delete(med._id)
      .then(function() {

        // Medication was deleted, let's remove it from the list!
        $scope.meds.splice(index, 1);
      });
  }

  $scope.dispensed={}; 
  $scope.dispenseMed = dispenseMed;
  
  function dispenseMed(med,index){
    console.log(index) ;
    console.log(meds[index]) ;
    $scope.dispensed.pillName = $scope.meds[index].pillName;
    $scope.dispensed.dosage = 1;
    $scope.dispensed.dateDispensed = new Date();
    _med.logPill($scope.dispensed)
      .then(function(){
        $scope.edited = { 
        'amount': --$scope.meds[index].amount};
        _med.notify(med);
        _med.update(med._id, $scope.edited); 
      });
  }
}