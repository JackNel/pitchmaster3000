(function() {
  'use strict';

  angular
    .module('pitches')
    .factory('PitchService', function($http, _){


      return{
        addPitch: addPitch,
        addComment: addComment
      };

    });


}());
