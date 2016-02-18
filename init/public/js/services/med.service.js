
// Instantiate the service
angular.module('autoMedic')
  .service('_med', _med);

// All we need is $http to talk to the server
_med.$inject = [
  '$http'
];

function _med($http) {

  // What this service offers (will be built up)
  var service = { };

  // Get all of the meds
  service.getAll = function() {
    return $http.get('/meds');
  }

  // Get just one med (with an id)
  service.getOne = function(id) {
    return $http.get('/meds/' + id);
  }

  // Create a new med, with some data provided by the user
  service.create = function(med) {
    return $http.post('/meds', med);
  }

  service.update = function(id, data){
    return $http.put('/meds/'+ id, data);
  }

  // Delete the med given its identifier
  service.delete = function(id) {
    return $http.delete('/meds/' + id);
  }

  // Get all log
  service.getAllLogs = function() {
    return $http.get('/log');
  } 

  // Create a new log
  service.logPill = function(med){
    return $http.post('/log',med);
  }

  // Sends SMS message
  service.notify = function(med){
    return $http.post('/notify',med);
  }

  return service;
}