(function() {
  'use strict';

  angular
    .module('pitchmaster')
    .controller('MainController', function($scope, $routeParams){

    })
    .controller('PitchController', function($scope, $routeParms, PitchService){
      var vm = this;
      PitchService.getPitches().then(function(pitches){
        vm.pitches = pitches;
      });

      vm.addPitch = function(newPitch){
        PitchService.emit(newPitch);
      };

      vm.addComment = function(pitch, comment){
        PitchService.addPitch(pitch,comment);
      };
    });

}());
