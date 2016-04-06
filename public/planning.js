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
    $scope.startTime = function () {
        $scope.realStartTime = moment($scope.timeToLeave, 'HH:mm').subtract($scope.minutesTotal(), 'minutes').format('H:mm');
    }
});
