
// Instantiate the controller
angular.module('autoMedic')
  .controller('inventoryController', inventoryController);

// Load in our dependencies for this controller (we need _med!)
inventoryController.$inject = [
  '$scope',
  '_med',
  '$state',
  'mySocket',
  '$confirm',

  // Resolves
  'meds'
];
function inventoryController($scope, _med, $state,mySocket, $confirm, meds) {
  $scope.meds = meds.data;
  console.log(meds);
  $scope.deleteInfo = {};
  $scope.eventid ={};

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

    $scope.deleteInfo = med;
    //console.log($scope.deleteInfo)
    $confirm({text: 'Remove your Google Calendar?'})
      .then(function() {
        handleAuthClick(event);
      });

    mySocket.emit('delete',
        {
          inventory:$scope.meds[index].inventorySlot, 
      });

    _med.delete(med._id)
      .then(function() {

        // Medication was deleted, let's remove it from the list!
        $scope.meds.splice(index, 1);
          //reload for main controller to update
        
        $scope.$emit('myreload',{r:1});     

      });
  }

  $scope.onInsert = onInsert;

//changes the amount 
  function onInsert(med,index,data){ 
  $scope.meds[index].amount = $scope.meds[index].amount+ data;

  $scope.changeIt = { 
          'amount': $scope.meds[index].amount
        };


  _med.update(med._id, $scope.changeIt)
    .then(function(){
       $state.go('insert',{medID:med._id});
    }); 

  }

  $scope.dispensed={}; 
  $scope.dispenseMed = dispenseMed;

  
  function dispenseMed(med,index){

    //$scope.dispensed.pillName = $scope.meds[index].pillName;

    // if there is enough pill to be dispensed then dispense required amount 
    if($scope.meds[index].amount - $scope.meds[index].dosage>0){
        $scope.dispensed.pillName = $scope.meds[index].pillName;
        $scope.dispensed.dosage = $scope.meds[index].dosage; 
        $scope.dispensed.dateDispensed = new Date();

        _med.logPill($scope.dispensed)
          .then(function(){
          //change the number that there  
          $scope.edited = { 
          'amount': $scope.meds[index].amount - $scope.meds[index].dosage 
        };
          _med.notify(med); // sends an SMS message 
          _med.update(med._id, $scope.edited)
            .then(function(){
            $state.go('dispensing',{medID:med._id});
        }); 
      });

    //otherwise dispense the amount remaining      
    }else{
        $scope.dispensed.pillName = $scope.meds[index].pillName;
        $scope.dispensed.dosage = $scope.meds[index].amount;
        $scope.dispensed.dateDispensed = new Date();
        $scope.edited = {
              'dosage': 0,
              'amount': -1
            };

        _med.logPill($scope.dispensed)
          .then(function(){
            $scope.edited.dosage= $scope.meds[index].amount;
              
            _med.notify(med); // sends SMS message
            _med.update(med._id,$scope.edited).
            then(function(){
              $state.go('dispensing',{medID:med._id});
            });
          }); 

    } 
 
  }

  var CLIENT_ID = '661800350617-2qr5t7mralm37q3gqopbapubk5r81er8.apps.googleusercontent.com';

  var SCOPES = ["https://www.googleapis.com/auth/calendar"];

   $scope.handleAuthClick = handleAuthClick ;
  function handleAuthClick(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false, authuser: -1},
      loadCalendarApi);
    return false;
  }

   $scope.loadCalendarApi = loadCalendarApi ;
  function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', deleteEvent);
  }


  $scope.deleteEvent = deleteEvent ;
  function deleteEvent() {

    console.log('Delete pill name: '+$scope.deleteInfo.pillName) ;
    var q = $scope.deleteInfo.pillName ;
    var eventid ;


    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'q': q
    });

    request.execute(function(resp) {

      for (var i =0; i < $scope.deleteInfo.dispensingTime.length; i++){
        console.log(resp);

          eventid = resp.items[i].id ;
          
          var request = gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventid
          });

          request.execute(function(resp) {
              var events = resp.items;
              console.log('Deleted event: '+i); 
          });

      }

    });

  }
}