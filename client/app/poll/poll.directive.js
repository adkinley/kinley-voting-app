'use strict';

angular.module('kinleyVotingappApp')
  .directive('poll', function () {
    return {
      templateUrl: 'app/poll/poll.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	
      }
    };
  });