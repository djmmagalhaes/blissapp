var mainApp = angular.module("myApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/connection', {
            templateUrl: 'connection.html',
            controller: 'connController'
        })
        .otherwise({
            redirectTo: '/connection'
        });
});

mainApp.controller('connController', function($scope, $http, $window) {
    $scope.conn = false;
    $http.get("https://private-anon-09dd4c09c0-blissrecruitmentapi.apiary-mock.com/health")
    .then(function(response) {
        if(response.data.status == "OK"){
            $scope.status = "on";
        } else {
            $scope.status = "off";
            $scope.conn = true;
        }
    }, function(e){
        $scope.status = "off";
        $scope.conn = true;
    });

    $scope.retry = function(){
        $window.location.reload();
    }
});