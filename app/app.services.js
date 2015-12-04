(function() {
  'use strict';

  angular
    .module('pitches')
    .factory('PitchService', function($http, _, $rootScope){
      var socket =io();

      var addPitch = function(eventName, callback){
        
      }

      return{
        addPitch: addPitch,
        addComment: addComment
      };

    });


}());
