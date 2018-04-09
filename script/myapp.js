var mainApp = angular.module("myApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/connection', {
            templateUrl: 'connection.html',
            controller: 'connController'
        })
        .when('/questions', {
            templateUrl: 'questions.html',
            controller: 'questionsController'
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
            $window.location.href = 'index.html#!/questions';
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

mainApp.controller('questionsController', function($scope, $routeParams, $http, $window, $location) {
    $scope.limit = 10;
    $scope.browsed = false;
    $scope.getting = true;
    $http.get("https://private-anon-46dbe5368f-blissrecruitmentapi.apiary-mock.com/questions?10&0&")
    .then(function (response) {$scope.names = response.data;});
    $scope.getting = false;

    $scope.getmore = function(){
        var aux = $scope.limit;
        $scope.news = 0;
        var rep;
        $scope.browsing = true;
        $scope.browsed = false;
        $scope.limit += 10;
        $http.get("https://private-anon-46dbe5368f-blissrecruitmentapi.apiary-mock.com/questions?"+$scope.limit+"&"+aux+"&")
        .then(function (response) {
            for(key in response.data){
                if(!$scope.names[key]){
                    $scope.names += response.data[key];
                    $scope.news++;
                }
            }
        });
        $scope.browsing = false;
        $scope.browsed = true;
    }
});