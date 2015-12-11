'use strict';

angular.module('kinleyVotingappApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, Auth) {
    console.log("Main Controller Exec");
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

    console.log("Title is " + $scope.title);
if ($routeParams.title && $routeParams.username) {
  console.log("Title is " + $scope.title);
    $http.get('/api/pollings/'+$scope.user+"/"+$scope.title).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings[0];
       $scope.list = $scope.awesomeThings.items;
 console.log("List is " +JSON.stringify($scope.awesomeThings));
     console.log("List is " + $scope.awesomeThings.items);
    });
}
    $scope.signup = function() {
     $http.get('/signup');
    };

    $scope.vote = function() {
      //TODO  write update votecount method in server
      // send them to results page with graph

      console.log("Submit vote for " + $scope.radioValue);

  console.log("Tryign to increment " + $scope.radioValue);
  var pos = 0;
  while (pos < $scope.list.length && $scope.list[pos].itemName!=$scope.radioValue)
    pos++;
  if (pos<$scope.list.length) {
    $scope.list[pos].votes++;
    $scope.awesomeThings.items = $scope.list;
      $http.put("/api/pollings/"+$scope.awesomeThings._id,$scope.awesomeThings).success( function (data) {
     console.log("Success Put");
     console.log(JSON.stringify(data));
      $scope.showGraph = true;
      $scope.isAsking = false;
      $scope.createGraph(data);
      // switch to results screen!!!!!
     });
    }
  };


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
    console.log("Show graphi s " + $scope.showGraph);
   };


    /*$scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/

    $scope.createNewPoll = true;
    $scope.listUserPolls = false;
    $scope.showResult = true;

    $scope.showUserPolls= function() {
      $scope.createNewPoll = false;
      $scope.listUserPolls = true;
      $scope.showResult = !$scope.showResult;
     console.log("value of show result in maine is " + $scope.showResult);
    }
  $scope.showCreatePolls = function() {
      $scope.createNewPoll = true;
      $scope.listUserPolls = false;
      $scope.showResult = !$scope.showResult;
  }

  });
