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
        location = location || 'Hamilton, ON, Canada';

        if(service.curWeather[location])
          return service.curWeather[location];
        
        service.curWeather[location] = { temp: {}, clouds: null };
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&units='+units+'&cnt=5&APPID=0d975d451b33ba3b542a1dfdfe9a17e9').success(function(data) {
            if (data) {
                if (data.main) {
                    //console.log(data);
                    service.curWeather[location].loc = location ;
                    service.curWeather[location].temp.current = data.main.temp;
                    service.curWeather[location].temp.min = data.main.temp_min;
                    service.curWeather[location].temp.max = data.main.temp_max;

                    service.curWeather[location].rain = data.rain;

                    service.curWeather[location].temp.rise = data.sys.sunrise*1000;
                    service.curWeather[location].temp.set = data.sys.sunset*1000;

                    service.curWeather[location].temp.wind = data.wind.speed*3.6;

                    var wDeg = data.wind.deg;
                    var wDir = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] ;
                    var d = 45;

                    for ( var i = 0 ; i < 8 ;i++) {
                      if( wDeg > (i-1/2)*d && wDeg < (i+1/2)*d )
                        service.curWeather[location].temp.wDirection = wDir[i];
                    }


                    service.curWeather[location].temp.main = [] ;

                    for (var i = 0 ; i < data.weather.length; i++){
                      service.curWeather[location].temp.main.push(data.weather[i].main) ;
                    }

                    service.curWeather[location].id = data.weather[0].id ;

                }
                service.curWeather[location].clouds = data.clouds ? data.clouds.all : undefined;
            }
        });

        return service.curWeather[location];
      },
      
    };
    return service;
});


weatherModule.filter('wind', function($filter) {
  return function(input, precision) {
    if (!precision) {
        precision = 2;
    }
    var numberFilter = $filter('number');
    return numberFilter(input, precision) ;
  };
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
      change:'@',
      useGoogleImages: '=',
      customSize: '=?',
      units: '@?'
    },
    templateUrl:'templates/basicWeatherDisplay.tpl.html',
    link: function(scope, iElem, iAttr) {

    	scope.$watch('change', function($http) {
          console.log('Weather updated');
	    		scope.customSize = scope.customSize || 75;
	      	scope.units = scope.units || "metric";
          //if(weatherService.getWeather(scope.location, scope.units)) { 
	      	  scope.weather = weatherService.getWeather(scope.location, scope.units);				
          //}     
    		}) ;

  		}
  	}
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

weatherModule.directive('weatherIconGoogle', function() {
    return {
        restrict: 'AEC', replace: true,
        scope: {
            id: '@',
            cloudiness: '@',
            customSize:'=',
            useGoogleImages:'='
        },
        link: function(scope){
            scope.imgurl = function() {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if (scope.id < 20) {
                    return baseUrl + 'sunny.png';
                } else if (scope.id == 801) {
                   return baseUrl + 'partly_cloudy.png';
                } else if (scope.id >=500 && scope.id < 533) {
                   return baseUrl + 'rain.png';
                } else if (scope.id >=700 && scope.id < 782) {
                   return baseUrl + 'mist.png';
                } else if (scope.id >=600 && scope.id < 623) {
                   return baseUrl + 'snow.png';
                } else if (scope.id >=802 && scope.id < 805) {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<img style=\'height:{{customSize}}px;width:{{customSize}}px\' ng-src=\'{{ imgurl() }}\'>'
    };
});
