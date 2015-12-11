'use strict';

/** Main Controller for Voting App 
 First fullstack app so I probably put too much into this controllr 
  Lot's of refactoring could happen but it is simple enough that it 
  can survive as is
 **/
angular.module('kinleyVotingappApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, Auth) {

    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.newPoll = true;
    $scope.title = $routeParams.title;
    $scope.user = $routeParams.username;
    $scope.list = ["One", "Two", "Three"];
    $scope.crazyValue = "Thomas";
    
    $scope.showGraph = false;
    $scope.isAsking = true;

    // I am managing multiple routes come to this controller
    if ($routeParams.title && $routeParams.username) {

      $http.get('/api/pollings/'+$scope.user+"/"+$scope.title).success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings[0];
        $scope.list = $scope.awesomeThings.items;
      });
    }
    //  Really sould be the navbar managing the signup
    $scope.signup = function() {
     $http.get('/signup');
    };


    // When the vote, update the results and show them the graph of the updated results 
    $scope.vote = function() {

      var pos = 0;
      while (pos < $scope.list.length && $scope.list[pos].itemName!=$scope.radioValue)
        pos++;
      if (pos<$scope.list.length) {
        $scope.list[pos].votes++;
        $scope.awesomeThings.items = $scope.list;
        $http.put("/api/pollings/"+$scope.awesomeThings._id,$scope.awesomeThings).success( function (data) {

          $scope.showGraph = true;
          $scope.isAsking = false;
          $scope.createGraph(data);
      // switch to results screen!!!!!
     });
    }
  };


// Setting up the data so angular-chart directive can do its work
 $scope.createGraph = function(data) {
      var length = data.items.length;
      $scope.name = data.name;
      $scope.labels = [];
      $scope.data=[[]];
       $scope.series = ['Series A'];

      for (var i = 0;i<length;i++) {
        $scope.labels.push(data.items[i].itemName);
      $scope.data[0].push(data.items[i].votes);
      }
   };

    $scope.createNewPoll = true;
    $scope.listUserPolls = false;
    $scope.showResult = true;

// Need to manage the multiple views that can be displayed on this page
// Based on their button click
// Again this is an area that could be refactored to be better
    $scope.showUserPolls= function() {
      $scope.createNewPoll = false;
      $scope.listUserPolls = true;
      $scope.showResult = !$scope.showResult;

    }
  $scope.showCreatePolls = function() {
      $scope.createNewPoll = true;
      $scope.listUserPolls = false;
      $scope.showResult = !$scope.showResult;
  }

  });
