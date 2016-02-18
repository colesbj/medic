// Instantiate the controller
angular.module('autoMedic')
  .controller('cryptoController', cryptoController);

// Load our service into the controller
cryptoController.$inject = [
  '$scope',
  '$crypto'
];

function cryptoController($scope,$crypto) {
  $scope.done = done;
  $scope.updating = updating;

  function done(){
    $scope.encrypted = $crypto.encrypt($scope.mytext, 'some custom key');
    //$scope.decrypted = $crypto.decrypt($scope.encrypted, 'some custom key');
  }
 
 function updating(){
    $scope.decrypted = $crypto.decrypt($scope.newtext, 'some custom key');
 } 
    
}