var planner = angular.module('plan', ['ngAnimate']);

planner.controller("PlanCtrl", function($scope, $http) {

  $scope.load = function () {
    $http.get('/plans').success(function (data) {
      $scope.plans = data;
    }).error(function (data, status) {
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

  $scope.delete = function (id) {
    $http.delete("/plan/" + id).success(function () {
      $scope.load();
    });
  };

  $scope.minutesTotal = function () {
    var total = 0;
    for (var i = 0; i < $scope.plans.length; i++) {
      var plan = $scope.plans[i];
      total += (parseInt(plan.task, 10));
    }
    return total;
  }
});

planner.controller("CalcCtrl", function ($scope) {

    function timeToMinutes (ptime) {
        var parts = ptime.split(":");
        if (parts.length == 1) {
            return parts[0] * 60;
        }
        return parts[0] * 60 + parts[1];
    }

    function minutesToTime (minutes) {
        var displayMinutes = minutes%60;
        var displayHours99 = (minutes - displayMinutes)/60;
        var displayHoursString = new String(displayHours99)
        var displayHours = displayHoursString.substr(0,2);
        displayHours = parseInt(displayHours);
        return displayHours + ":" + displayMinutes;
    }

    $scope.startTime = function () {
        var taskMinutes = $scope.minutesTotal();
        var timeToLeaveMinutes = timeToMinutes($scope.timeToLeave);
        var startTimeMinutes = timeToLeaveMinutes - taskMinutes;
        $scope.realStartTime = minutesToTime(startTimeMinutes);
    }
});
