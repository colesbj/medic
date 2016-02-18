// Instantiate the service
angular.module('autoMedic')
  .service('mySocket', function (socketFactory) {
    return socketFactory();
  });