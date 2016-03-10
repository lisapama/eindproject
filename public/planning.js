var planner = angular.module('plan', []);

planner.controller("PlanCtrl", function($scope, $http) {

  $scope.load = function ()  {
    $http.get('/plans').
      success(function(data, status, headers, config) {
        $scope.plans = data;
      }).
      error(function(data, status, headers, config) {
      console.log(status);
      console.log(data);
      });
  };

  $scope.load();

  $scope.save = function ()  {
    $http.post('/plan', angular.toJson($scope.plan)).success(function () {
    	$scope.load();
    });
  };

  $scope.delete = function (id)  {
    $http.delete("/plan/" + id).success(function () {
    	$scope.load();
    });
  };

  $scope.minutesTotal = function () {
    var total = 0;
    for(var i = 0; i < $scope.plans.length; i++){
      var plan = $scope.plans[i];
      total += (parseInt(plan.task, 10));
    }
    return total;
  };
/*
  $scope.startTime = function () {
    var ttl = $scope.timeToLeave;
    var fieldArray = ttl.split(":"); //fieldarray is array [uren,minuten]
    ttl = parseInt(fieldArray[0])*60 + parseInt(fieldArray[1]);
    return ttl;
  };
 */

  /*minTot = $scope.minutesTotal();*/
});