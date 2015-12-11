'use strict';

angular.module('kinleyVotingappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/:username/:title', {
      	templateUrl: 'app/main/pollresult.html',
     	controller: 'MainCtrl'
      })
      ;
  });