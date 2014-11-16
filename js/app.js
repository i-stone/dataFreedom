(function () {
    var app = angular.module("demo", ['dataFreedom']);

    app.controller("demoCtrl", ['$scope','$http','dataFreedomService', function ($scope,$http,dataFreedomService) {               
        
        dataFreedomService.method = 'GET';
        
        $scope.fetch=function(){
             dataFreedomService.fetch().then(function(data){
                $scope.data = data.data;
                $scope.total = data.total;
                $scope.totalItems = data.total;
                $scope.bigTotalItems = data.total;

                $scope.maxSize = data.per_page;

                $scope.currentPage = data.current_page;
                $scope.bigCurrentPage = data.current_page;                
            },function(data){
                alert(data);
            });
        };
        
        $scope.pageChanged = function () {
            dataFreedomService.bigCurrentPage = $scope.bigCurrentPage;
            dataFreedomService.pageChanged().then(function(data){
                $scope.data = data.data;
                $scope.total = data.total;
                $scope.totalItems = data.total;
                $scope.bigTotalItems = data.total;

                $scope.maxSize = data.per_page;

                $scope.currentPage = data.current_page;
                $scope.bigCurrentPage = data.current_page;                
            },function(data){
                alert(data);
            });            
        };
        
        $scope.fetch();                  
        
    }]);

})();