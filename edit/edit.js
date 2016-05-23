'use strict';

var name_pattern = /^[0-9А-яA-z- ]{1,100}$/,
    tags_pattern = /([0-9А-яA-z-]{1,100})(, ([0-9А-яA-z-]{1,100}))*/;

angular.module('photoSearchApp.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {
        templateUrl: 'edit/template.html',
        controller: 'EditController'
    });
}])

.controller('EditController', ['$scope', '$localStorage', '$route', '$filter', function ($scope, $localStorage, $route, $filter) {
    $scope.requests = $localStorage.requests;
    $scope.new_name = {
        text: "",
        word: name_pattern
    };
    $scope.new_tags = {
        text: "",
        word: tags_pattern
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

    $scope.edit = function(id){
        $scope.edit_request = $filter('getRequestById')($localStorage.requests, id);
        $scope.edit_id = {
            text: $scope.edit_request.id
        };
        $scope.edit_name = {
            text: $scope.edit_request.name,
            word: name_pattern
        };
        $scope.edit_tags = {
            text: $scope.edit_request.tags.join(","),
            word: tags_pattern
        };

        if($("#createFormBlock").is(":visible"))
            $("#createFormBlock").hide(100);

        if($("#editFormBlock").is(":visible"))
            $("#editFormBlock").hide(100);

        $("#editFormBlock").show(250);
    };
    $scope.update = function(){
        if(angular.isDefined($scope.edit_id.text) && angular.isDefined($scope.edit_name.text) && angular.isDefined($scope.edit_tags.text)){
            for(var i = 0; i < $localStorage.requests.length; i++){
                if($localStorage.requests[i].id == parseInt($scope.edit_id.text)){
                    $localStorage.requests[i] = {
                        id: parseInt($scope.edit_id.text),
                        name: $scope.edit_name.text,
                        tags: $scope.edit_tags.text.split(",")
                    };

                    $route.reload();
                    break;
                }
            }
        } else {
            $scope.error_message = "Проверьте правильность введенных данных и повторите попытку";
        }
    };
}]);
