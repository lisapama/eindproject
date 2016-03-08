
angular.module('plan', []).controller("PlanCtrl", function($scope, $http) {

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
});

