(function () {
    var dataFreedom = angular.module("dataFreedom", ['ui.bootstrap']);

    dataFreedom.factory('dataFreedomService', ['$http','$q', function ($http,$q) {
        var service = {};
        service.method = 'GET';
        service.url = '/example/getdata.php';
        service.limit = 10;
        service.bigCurrentPage = 0;
        service.search = {};
        service.sort = {};

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

        return service;

    }]);

})();