(function() {
  'use strict';

  angular
    .module('pitchmaster', [
      'ngRoute',
      'underscore',
      'ui.bootstrap',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/',{
          template:'<img src="">',
          controller: 'MainController'
        })
        .when('/addPitch',{
          templateUrl: 'views/form.html',
          controller: 'PitchController as pitchCtrl'
        })
        .when('/pitches',{
          templateUrl: 'views/list.html',
          controller: 'PitchController as pitchCtrl'
        })
        .when('/404',{
          template: '<h1>Sorry page not found. No final project for you!</h1>'
        })
        .otherwise({redirectTo: '/404'});
      });

    angular
      .module('underscore', [])
      .factory('_', function($window){
        return $window._;
      });

}());
