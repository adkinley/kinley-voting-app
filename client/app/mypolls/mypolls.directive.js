'use strict';

angular.module('kinleyVotingappApp')
  .directive('mypolls', function () {
    return {
      templateUrl: 'app/mypolls/mypolls.html',
      restrict: 'EA',
  
      link: function (scope, element, attrs) {
      }
    };
  });