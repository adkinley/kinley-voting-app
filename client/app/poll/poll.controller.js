'use strict';
//,['chart.js']
angular.module('kinleyVotingappApp').controller('PollCtrl', function ($scope, $http,$attrs,  Auth,$location) {


  $scope.value = $attrs.thevalue;
  $scope.value = "Joe;"
  $scope.question= '';
  $scope.values = [{placeholder: "Coke", name:"", pos:1}, {placeholder:"Pepsi", name:"", pos:2}];
  $scope.count = $scope.values.length;
 
  $scope.isMakingPoll = true;
  $scope.isPollLink = false;
  $scope.user = Auth.getCurrentUser().name;

  // add to the list of poll choices
   $scope.addOption = function() {
   		$scope.count++;
   		$scope.values.push({placeholder: "New Option",name:"", pos:$scope.count});;
   };
   $scope.link = ""

  $scope.$watch('createNewPoll', function(newvalue, oldvalue) {
    if (newvalue!=oldvalue) {
      $scope.isPollLink = false;
      $scope.isMakingPoll = true;
        }
  });

  $scope.$watch('showResult', function(newvalue, oldvalue) {
      $scope.isPollLink = false;
      $scope.isMakingPoll = true;
  });


$scope.submit = function() {
	var itemList =[];
	for (var i = 0;i<$scope.count;i++)
		itemList.push({itemName:$scope.values[i].name, votes:0});
  $scope.question = $scope.question.replace("?","");

	var polling ={name:$scope.question, user:Auth.getCurrentUser().name, items:itemList}; 


  $http.post("/api/pollings",polling).success( function (data) {

    /** THIS WONT WORK ON HEROKU. NEEDS TO BE GENLIZED **/
  $scope.link =$location.protocol()+"://"+$location.host() +":"+$location.port()+"/" +Auth.getCurrentUser().name+"/"+$scope.question; 

  	$scope.question= '';
   		$scope.values = [{placeholder: "Coke", name:"", pos:1}, {placeholder:"Pepsi", name:"", pos:2}];
   		$scope.count = $scope.values.length;
   	$scope.pollCreated = true;
$scope.isMakingPoll = false;
$scope.isPollLink = true;

	});
}


   $scope.invalid = function() {
   	
   	if ($scope.question==='')
   		return true;
   	var count = 0;
   	while (count < $scope.count) {
   		if ($scope.values[count].name==="")
   			return true;
   		count++;
   	}

   	return false;
   }

});

