  
// Instantiate the controller
angular.module('autoMedic')
  .controller('addmedController', addmedController);

// Load our service into the controller
addmedController.$inject = [
  '$scope',
  '$state',
  '_med'
];

function addmedController($scope, $state, _med) {
  $scope.createMedication = createMedication;

  // Our form will fill this in for us
  $scope.med = { };

  function createMedication() {
    if ($scope.medForm.$valid) {
      $scope.med.inventorySlot = Math.floor((Math.random() * 8) + 1);
      $scope.med.dateAdded = new Date(); 
      _med.create($scope.med)
        .then(function() {
          //alert('Medication created successfully!');

          // Let's go to the Medication
          $state.go('inventory');
        });
    }
  }
}