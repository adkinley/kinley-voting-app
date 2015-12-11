'use strict';
//,['chart.js']
angular.module('kinleyVotingappApp').controller('PollCtrl', function ($scope, $http,$attrs,  Auth) {

$scope.value = $attrs.thevalue;
	console.log("PollCtrl " + $scope.value);
$scope.value = "Joe;"
	$scope.question= '';
   $scope.values = [{placeholder: "Coke", name:"", pos:1}, {placeholder:"Pepsi", name:"", pos:2}];
   $scope.count = $scope.values.length;
 
$scope.isMakingPoll = true;
$scope.isPollLink = false;
 $scope.user = Auth.getCurrentUser().name;
 console.log("In Create Poll User is " + $scope.user);
   $scope.addOption = function() {
   		console.log("Add Option");
   		$scope.count++;
   		$scope.values.push({placeholder: "New Option",name:"", pos:$scope.count});;
   };
$scope.link = ""

  $scope.$watch('createNewPoll', function(newvalue, oldvalue) {
    console.log("Identified Change to createNewPoll " + newvalue + " " + oldvalue);
    if (newvalue!=oldvalue) {
      console.log("Value is changed");
      $scope.isPollLink = false;
      $scope.isMakingPoll = true;

        }
  });

  $scope.$watch('showResult', function(newvalue, oldvalue) {
      $scope.isPollLink = false;
      $scope.isMakingPoll = true;
   
    console.log("show result has been changed "+newvalue);
  });


$scope.submit = function() {
	var itemList =[];
	for (var i = 0;i<$scope.count;i++)
		itemList.push({itemName:$scope.values[i].name, votes:0});
  $scope.question = $scope.question.replace("?","");
  console.log("That's right I said the  user was " + $scope.user);
	var polling ={name:$scope.question, user:$scope.user, items:itemList}; 

	console.log("Submitting " +JSON.stringify(polling));
  $http.post("/api/pollings",polling).success( function (data) {

    /** THIS WONT WORK ON HEROKU. NEEDS TO BE GENERLIZED **/
  $scope.link ="http://localhost:9000/" +$scope.user+"/"+$scope.question; 

	   console.log("Success Post");
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
   	console.log("Validate returns true");
   	return false;
   }
 $scope.labels = ['Monday', 'Tuesday'];
  $scope.series = ['Series A'];

  $scope.data = [
    [5, 3]
  ];

});

