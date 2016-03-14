var planner = angular.module('plan', []);

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
        var mins = minutes%60;
        var hours = (minutes - mins)/60;
        return hours + ":" + mins;
    }

    $scope.startTime = function () {
        var taskMinutes = $scope.minutesTotal();
        var timeToLeaveMinutes = timeToMinutes($scope.timeToLeave);
        var startTimeMinutes = timeToLeaveMinutes - taskMinutes;
        $scope.realStartTime = minutesToTime(startTimeMinutes);
    }
});


   /* $scope.startTime = function () {
      $scope.timeToLeave
      var hoursArray = timeToLeave.split(":");
      var minutesEnd = parseInt(hoursArray[0]) * 60 + parseInt(hoursArray[1]);

      var newMinutes = minutesEnd - $scope.minutesTotal();
      var minutes = newMinutes % 60;
      var hours = (newTime - minutes);

      if (minutes > 0 && hours > 0) {
          return hours + ":" + minutes;
    }
  }
});*/

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
