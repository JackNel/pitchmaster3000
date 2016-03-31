(function() {
  'use strict';

  angular
    .module('pitchmaster')
    .controller('MainController', function($scope, $routeParams) {

    })
    .controller('PitchController', function($http, $scope, $route, $routeParams, PitchService) {
      var vm = this;
      vm.pitches = [];

      vm.getPitches = function() {
        PitchService.on('all:pitches', function(data) {
          vm.pitches = data;
        });
      };
      vm.getPitches();

      vm.addPitch = function(newPitch) {
        PitchService.emit('new:pitch', newPitch);
        vm.newPitch = {title: "", content "", needs: "", author: ""};
      };
      vm.putComment = function(pitch){
        PitchService.emit('new:comment', pitch);
        vm.newComment = "";
      };
      PitchService.on('new:pitch', function(data) {
        var pitch = {
          title: data.title,
          content: data.content,
          needs: data.needs,
          author: data.author,
          comments: [],
        };

        vm.pitches.push(pitch);

      });

    vm.addComment = function(pitch, newComment){
      console.log('fire');
      pitch.comments.push(newComment);
      vm.putComment(pitch);
      console.log(pitch);

      vm.newComment="";
    };
    });

}());
