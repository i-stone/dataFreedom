(function () {
    var app = angular.module("dataFreedom", ['ui.bootstrap']);

    app.controller("dataFreedomCtrl", ['$scope', '$http', function ($scope, $http) {
            $scope.method = 'GET';
            $scope.url = '/example/getdata.php';
            $scope.limit = 10;
            $scope.bigCurrentPage = 0;

            $scope.fetch = function () {
                $http({
                    method: $scope.method,
                    url: $scope.url,
                    params: {page: $scope.bigCurrentPage, limit: $scope.limit}
                }).
                        success(function (data, status) {
                            $scope.data = data.data;
                            $scope.total = data.total;
                            $scope.totalItems = data.total;
                            $scope.bigTotalItems = data.total;

                            $scope.maxSize = data.per_page;

                            $scope.currentPage = data.current_page;
                            $scope.bigCurrentPage = data.current_page;
                            console.log($scope.data);
                        }).
                        error(function (data, status) {
                            console.log("Request failed - ".status);
                        });
            };

            $scope.pageChanged = function () {
                $scope.fetch();
                console.log('Page changed to: ' + $scope.bigCurrentPage);
            };

            $scope.fetch();

        }]);

})();