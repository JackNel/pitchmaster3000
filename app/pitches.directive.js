(function() {
  'use strict';

  angular
    .module('pitchmaster')
    .directive('allPitches', function(){

      return{
        restrict: 'EA',
        templateUrl: 'views/pitches.directive.html',
        scope: {
          pick: '=',
          action: '&'
        },
      };



    });

}());
