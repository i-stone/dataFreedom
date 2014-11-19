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
        
        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        */ 
       var param = function(obj) {
         var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

         for(name in obj) {
           value = obj[name];

           if(value instanceof Array) {
             for(i=0; i<value.length; ++i) {
               subValue = value[i];
               fullSubName = name + '[' + i + ']';
               innerObj = {};
               innerObj[fullSubName] = subValue;
               query += param(innerObj) + '&';
             }
           }
           else if(value instanceof Object) {
             for(subName in value) {
               subValue = value[subName];
               fullSubName = name + '[' + subName + ']';
               innerObj = {};
               innerObj[fullSubName] = subValue;
               query += param(innerObj) + '&';
             }
           }
           else if(value !== undefined && value !== null)
             query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
         }

         return query.length ? query.substr(0, query.length - 1) : query;
       };

        service.fetch = function () {
            var deferred = $q.defer();
            $http({
                method: service.method,
                url: service.url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                   return param(obj);
                },
                data:{search:service.search,sort:service.sort},
                params: {
                    page: service.bigCurrentPage,
                    limit: service.limit                                        
                }
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