'use strict';
//,['chart.js']
angular.module('kinleyVotingappApp').controller('MyPollsCtrl', function ($scope, $http, Auth) {


  $scope.user = Auth.getCurrentUser().name;
  $scope.currentTitle = "";
	$scope.list = [];
  $scope.showGraph = false;

  // this is a kluge to get the right view to display when they click on the 
  // button to show their list of polls and we are already looking at the result on one poll
  $scope.$watch('showResult', function(newvalue, oldvalue) {
   
      $scope.showGraph = false;

  });

  $scope.$watch('listUserPolls', function(newvalue, oldvalue) {
    if (newvalue!=oldvalue) {

      $scope.userPollList = true;
      $scope.user = Auth.getCurrentUser().name;
      $scope.showGraph = false;
      $scope.load($scope.user);
    }
  });

  $scope.load = function(user) {

      $http.get('/api/pollings/user/'+user).success(function (data) {
        $scope.list = data;

      });
    
  };

   $scope.delete = function(id) {

    $http.delete('/api/pollings/'+id).success(function (data){
        $scope.load($scope.user);
    });
   };


   // Build the graph data for angular-char
   // This is redundant code from main, would have been better to put this into
   // its own directive
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

   
   $scope.loadPoll = function(title) {
       $scope.showGraph = true;
   
    var i =0;
    while($scope.list[i].name!=title) {
      i++; 
    }

    $scope.createGraph($scope.list[i]);
     
  };

});