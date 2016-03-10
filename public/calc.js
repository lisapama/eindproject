var app = angular.module("MyApp", []);

app.controller("Calculator", function ($scope) {
    $scope.lijst = [1, 2, 3, 4];

    $scope.displayText = "";

    $scope.number = function (number) {

        $scope.nieuweText = "" + $scope.displayText + number;
        $scope.displayText = $scope.nieuweText;

        console.log($scope.nieuweText);
    }

    $scope.operator = function (operator) {

        $scope.getalText = $scope.displayText;
        $scope.usedOperator = operator;
        $scope.displayText = "";

        console.log($scope.usedOperator);
    }

    $scope.calculate = function () {

        getal1 = parseInt($scope.getalText);
        getal2 = parseInt($scope.nieuweText);

        $scope.antwoord;

        if ($scope.usedOperator == '+') {
            antwoord = getal1 + getal2;
        }
        if ($scope.usedOperator == '-') {
            antwoord = getal1 - getal2;
            console.log("-");
        }
        if ($scope.usedOperator == '/') {
            antwoord = getal1 / getal2;
            console.log("/");
        }
        if ($scope.usedOperator == '*') {
            antwoord = getal1 * getal2;
            console.log("*");
        }

        $scope.displayText = antwoord;
    }

    $scope.reset = function () {
        $scope.displayText = "";
        $scope.getalText = "";
    }

});