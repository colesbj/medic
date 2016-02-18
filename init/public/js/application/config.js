
// Load routes (states) for our application
angular.module('autoMedic')
  .config(config);

// What this block depends on
config.$inject = [
  '$stateProvider', // <-- From ui-router, we use this to configure our states
  '$urlRouterProvider', // <-- We use this to declare our default state
  '$cryptoProvider'
];

function config($stateProvider, $urlRouterProvider,$cryptoProvider) {

  $cryptoProvider.setCryptographyKey('ABCD123');
  // Load up our states
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })

    .state('inventory', {
      url: '/inventory',
      templateUrl: 'templates/inventory.html',
      controller: 'inventoryController',

      // Advanced: load the meds in before the state loads
      resolve: {
        meds: ['_med', function(_med) {
          return _med.getAll();
        }]
      }
    })

    .state('addmed', {
      url: '/addmed',
      templateUrl: 'templates/addmed.html',
      controller: 'addmedController'
    })

    .state('history', {
      url: '/history',
      templateUrl: 'templates/history.html',
      controller: 'historyController',

      resolve: {
        dispensed: ['_med', function(_med) {
          return _med.getAllLogs();
        }]
      }
    })
     .state('crypto',{
      url:'/crypto',
      templateUrl: 'templates/crypto.html',
      controller: 'cryptoController' 
    })

    .state('serialtest',{
      url:'/serialtest',
      templateUrl: 'templates/serialtest.html',
      controller: 'serialtestController' 
    })

    // multi state form
    .state('medform',{
      url:'/medform',
      templateUrl: 'templates/medform.html',
      controller: 'medformController'   
    })
    // 1st Step includes generic or manufactures name and the quantity of pills added 
    .state('medform.medication',{
      url:'/medication',
      templateUrl: 'templates/medform-medication.html'
    })
    // 2nd Step includes the dispensing times and how often it will be dispensed
    .state('medform.dispensinginfo',{
      url:'/dispensinginfo',
      templateUrl: 'templates/medform-dispensinginfo.html'
    })
    // 3rd Step requires the dosage (number of pills to dispense when needed)
    // skipped if frequency is set to self medication
    .state('medform.dosage',{
      url:'/dosage',
      templateUrl:'templates/medform-dosage.html'
    })
    // 4th Step requires when the medication should start
    // skipped if frequency is set to self medicate
    .state('medform.startdate',{
      url:'/startdate',
      templateUrl:'templates/medform-startdate.html'
    })
    // 5th Step is to determine if the user wants to add special instructions
    .state('medform.specialinstructions',{
      url:'/specialinstructions',
      templateUrl:'templates/medform-specialinstructions.html'
    })
    // Final Step is a Summary of the choices and the submit button 
    .state('medform.summary',{
      url:'/summary',
      templateUrl:'templates/medform-summary.html'
    })
    ;

  // Declare our default state to be the home state
  $urlRouterProvider.otherwise('/');
}