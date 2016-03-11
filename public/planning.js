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

  $scope.save = function () {
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

  function calcStartTime ($scope) {

    $scope.hourMinutes = function () {
      var timeToLeave = $scope.timeToLeave;
      var hoursArray = timeToLeave.split(":");
      var minutesEnd = parseInt(hoursArray[0])*60 + parseInt(hoursArray[1]);
      var newMinutes = minutesEnd - $scope.minutesTotal();
      return newMinutes;
    };

    $scope.startTime = function () {
      var newTime = $scope.hourMinutes();
      var minutes = newTime%60;
      var hours = (newTime - minutes);

      return hours + ":" + minutes;
    };
  }

});

  /*$scope.calcStartTime = function () {
    var hours = $scope.timeToLeave;
    var hoursArray = hours.split(":");
    var minutes = parseInt(hoursArray[0])*60 + parseInt(hoursArray[1]);
    newTime = minutes - $scope.minutesTotal;
    return newTime;
  };
*/
/*
  $scope.startTime = function () {
    var ttl = $scope.timeToLeave;
    var fieldArray = ttl.split(":"); //fieldarray is array [uren,minuten]
    ttl = parseInt(fieldArray[0])*60 + parseInt(fieldArray[1]);
    return ttl;
  };
 */

  /*minTot = $scope.minutesTotal();*/
