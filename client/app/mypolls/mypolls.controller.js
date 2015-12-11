'use strict';
//,['chart.js']
angular.module('kinleyVotingappApp').controller('MyPollsCtrl', function ($scope, $http, Auth) {

	console.log("MyPollsCtrl " + Auth.getCurrentUser().name);
$scope.user = Auth.getCurrentUser().name;
$scope.currentTitle = "";
	$scope.list = [];
$scope.showGraph = false;
  $scope.$watch('showResult', function(newvalue, oldvalue) {
   
      $scope.showGraph = false;
//    console.log("show result has been changed "+newvalue);
  });

  $scope.$watch('listUserPolls', function(newvalue, oldvalue) {
    console.log("Value is being watched " + newvalue + " " + oldvalue);
    if (newvalue!=oldvalue) {
      console.log("Value is changed");
      $scope.userPollList = true;
      $scope.user = Auth.getCurrentUser().name;
      console.log("User is " + $scope.user);
      $scope.showGraph = false;
     
      $scope.load($scope.user);
       }
  });

  $scope.load = function(user) {
    console.log("Loading Polls for " + user + " (but not really for user)");
      $http.get('/api/pollings/user/'+user).success(function (data) {
        $scope.list = data;
        
        console.log(JSON.stringify($scope.list));
      });
    
  };

   $scope.delete = function(id) {
    console.log("deleting id " + id);
    $http.delete('/api/pollings/'+id).success(function (data){
        $scope.load($scope.user);
    });
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

   
   $scope.loadPoll = function(title) {
    console.log("loading poll " + title);
       $scope.showGraph = true;
   
    var i =0;
    while($scope.list[i].name!=title) {
      i++; 
    }
    console.log("Found Poll in position " + i);
    $scope.createGraph($scope.list[i]);
     
  };

});