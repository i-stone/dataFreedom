(function () {
    var dataFreedom = angular.module("dataFreedom", ['ui.bootstrap']);
    
    dataFreedom.factory('dataFreedomService', ['$http','$q', function ($http,$q) {        
        var service = {};
        service.method = 'GET';
        service.url = '/example/getdata.php';
        service.limit = 10;
        service.bigCurrentPage = 0;        

        service.fetch = function () {
            var deferred = $q.defer();            
            $http({
                method: service.method,
                url: service.url,
                params: {page: service.bigCurrentPage, limit: service.limit}
            }).success(function (data) {                
                deferred.resolve(data);                
            }).error(function (data) {                
                deferred.reject('There was an error')
            });
            return deferred.promise;
        };
        
        service.pageChanged = function () {    
             return service.fetch();            
        };
        
        return service;
               
    }]);
    
    /*
    dataFreedom.controller("dataFreedomCtrl", ['$scope', '$http', function ($scope, $http) {
        $scope.method = 'GET';
        $scope.url = '/example/getdata.php';
        $scope.limit = 10;
        $scope.bigCurrentPage = 0;

        $scope.fetch = function () {
            $http({
                method: $scope.method,
                url: $scope.url,
                params: {page: $scope.bigCurrentPage, limit: $scope.limit}
            }).success(function (data, status) {
                $scope.data = data.data;
                $scope.total = data.total;
                $scope.totalItems = data.total;
                $scope.bigTotalItems = data.total;

                $scope.maxSize = data.per_page;

                $scope.currentPage = data.current_page;
                $scope.bigCurrentPage = data.current_page;
                console.log($scope.data);
            }).error(function (data, status) {
                console.log("Request failed - ".status);
            });
        };

        $scope.pageChanged = function () {
            $scope.fetch();
            console.log('Page changed to: ' + $scope.bigCurrentPage);
        };

        $scope.fetch();
    }]);*/

})();