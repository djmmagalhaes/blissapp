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

mainApp.controller('questionsController', function($scope, $routeParams, $http, $window, $location) {
    $scope.limit = 10;
    $scope.browsed = false;
    $scope.getting = true;
    $scope.nofilter = true;
    $scope.detail_view = false;
    $scope.share = false;
    $scope.browsing = false;
    var question_filter = $routeParams.question_filter;
    var question_id = $routeParams.question_id;
    if(question_id){
        if(angular.isNumber(Number(question_id))){
            $scope.nofilter = false;
            $scope.detail_view = true;
            $scope.share = true;
            $http.get("https://private-anon-46dbe5368f-blissrecruitmentapi.apiary-mock.com/questions/" + question_id)
            .then(function (response) {$scope.quest_detail = response.data;});
            $scope.getting = false;
        }
    } else if(typeof(question_filter) !== 'undefined'){
        document.getElementById('search').focus();
        if(angular.isString(question_filter)){
            $scope.search = question_filter;
            if(question_filter != ""){
                $scope.nofilter = false;
                $scope.share = true;
                $http.get("https://private-anon-46dbe5368f-blissrecruitmentapi.apiary-mock.com/questions?0&0&"+question_filter)
                .then(function (response) {$scope.list = response.data;});
                $scope.getting = false;
            }
        }
    }
    if($scope.nofilter){
        $http.get("https://private-anon-46dbe5368f-blissrecruitmentapi.apiary-mock.com/questions?10&0&")
        .then(function (response) {$scope.names = response.data;});
        $scope.getting = false;
    }

    $scope.submit_search = function(){
        $question_filter = "";
        $window.location.href = 'index.html#!/questions?question_filter=' + $scope.search;
    }

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

    $scope.dismiss = function(){
        $window.location.href = 'index.html#!/questions';
    }

    $scope.detail = function(id){
        $window.location.href = 'index.html#!/questions?question_id='+id;
    }
});