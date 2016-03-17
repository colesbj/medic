'use strict';

//This will be overridden later in the file after a build in order to load the templates, this is just a placeholder
//to keep the module happy during development
angular.module("weather-templates", []);

var weatherModule = angular.module('weatherModule', ["weather-templates"]);


weatherModule.service('weatherService', function($http) {
    var service = {
      curWeather: {},
      forecast: {},
      
      getWeather: function(location, units) {
        location = location || 'Hamilton, ON';

        if(service.curWeather[location])
          return service.curWeather[location];
        
        service.curWeather[location] = { temp: {}, clouds: null };
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&units='+units+'&cnt=5&APPID=0d975d451b33ba3b542a1dfdfe9a17e9').success(function(data) {
            if (data) {
                if (data.main) {
                    service.curWeather[location].loc = location ;
                    service.curWeather[location].temp.current = data.main.temp;
                    service.curWeather[location].temp.min = data.main.temp_min;
                    service.curWeather[location].temp.max = data.main.temp_max;

                    service.curWeather[location].temp.rise = data.sys.sunrise*1000;
                    service.curWeather[location].temp.set = data.sys.sunset*1000;

                    service.curWeather[location].temp.main = [] ;
                    for (var i = 0 ; i < data.weather.length; i++){
                      service.curWeather[location].temp.main.push(data.weather[i].main) ;
                    }
                    
                }
                service.curWeather[location].clouds = data.clouds ? data.clouds.all : undefined;
            }
        });

        return service.curWeather[location];
      },
      
    };
    return service;
});

weatherModule.filter('temp', function($filter) {
  return function(input, precision, units) {
    if (!precision) {
        precision = 0;
    }

    var unitDisplay;

    switch (units){
      case "imperial":
        unitDisplay = "F"
        break;
      case "metric":
        unitDisplay = "C"
        break;
      default:
        unitDisplay = "C"
        break;
    }

    var numberFilter = $filter('number');
    return numberFilter(input, precision) + '&deg;' + unitDisplay;
  };
});


weatherModule.directive('todaysWeather', function(weatherService){
  return {
    restrict:'AEC',
    replace:true,
    scope: {
      location:'@',
      useGoogleImages: '=',
      customSize: '=?',
      units: '@?'
    },
    templateUrl:'templates/currentWeatherDisplay.tpl.html',
    link: function(scope, iElem, iAttr) {
    	scope.$watch('location', function($http) {
	    		scope.customSize = scope.customSize || 75;
	      	scope.units = scope.units || "metric";
	      	scope.weather = weatherService.getWeather(scope.location, scope.units);				     
    		}) ;
  		}
  	}
});



weatherModule.directive('weatherDisplay', function(){
  return {
    scope:{
      weather:'=',
      customSize:'=',
      useGoogleImages:'=',
      units:'='
    },
    restrict:'E',
    replace:true,
    templateUrl:'templates/basicWeatherDisplay.tpl.html'
  };
});


weatherModule.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@',
            customSize:'=',
            useGoogleImages:'='
        },
        link: function(scope){
            scope.getIconClass = function() {
                if (scope.cloudiness < 20) {
                    return 'wi-day-sunny';
                } else if (scope.cloudiness < 90) {
                   return 'wi-day-cloudy';
                } else {
                    return 'wi-cloudy';
                }
            };
        },
        template: '<i style=\'font-size:{{customSize}}px;margin-right:16px;margin-left:16px\' ng-class=\'getIconClass()\'></i>'
    };
});

