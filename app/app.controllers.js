(function() {
  'use strict';

  angular
    .module('pitchmaster')
    .controller('MainController', function($scope, $routeParams){

    })
    .controller('PitchController', function($scope, $routeParams, PitchService){
      var vm = this;


      vm.addPitch = function(newPitch){
        PitchService.emit('new:pitch', newPitch);
        vm.newPitch = "";
      };
      
      PitchService.on('new:pitch', function(data){
        var pitch = {
          title : data.title,
          content : data.content,
          needs : data.needs,
          author: data.author,
          comments: [],
        };

        $scope.pitches.push(pitch);

      });

      PitchService.on('all:pitches',function(data){
        $scope.pitches= data;
      });


    });

}());
