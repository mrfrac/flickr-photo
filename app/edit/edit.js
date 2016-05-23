'use strict';

angular.module('photoSearchApp.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {
        templateUrl: 'edit/template.html',
        controller: 'EditController'
    });
}])

.controller('EditController', ['$scope', '$localStorage', '$route', function ($scope, $localStorage, $route) {
    $scope.requests = $localStorage.requests;
    $scope.new_name = {
        text: "",
        word: /^[0-9А-яA-z- ]{1,100}$/
    };
    $scope.new_tags = {
        text: "",
        word: /([0-9А-яA-z-]{1,100})(, ([0-9А-яA-z-]{1,100}))*/
    };
    $scope.deleteRequest = function(id){
        if (confirm('Вы действительно хотите удалить запрос?')) {
            for(var i = 0; i < $localStorage.requests.length; i++){
                if($localStorage.requests[i].id == id)
                    $localStorage.requests.splice($localStorage.requests.indexOf($localStorage.requests[i]), 1);

                $route.reload();
            }
        }
    };
    $scope.add = function(){
        var max_id = 0,
            i = 0,
            l = $localStorage.requests.length;

        for(; i<l; i++){
            if($localStorage.requests[i].id > max_id)
                max_id = $localStorage.requests[i].id;
        }

        if(angular.isDefined($scope.new_name) && angular.isDefined($scope.new_tags.text)) {
            $localStorage.requests.push({
                id: max_id + 1,
                name: $scope.new_name.text,
                tags: $scope.new_tags.text.split(",")
            });
            $route.reload();
        }else{
            $scope.error_message = "Проверьте правильность введенных данных и повторите попытку";
        }
    };
}]);
