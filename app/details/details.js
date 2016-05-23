'use strict';

angular.module('photoSearchApp.details', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/details/:requestId', {
        templateUrl: 'details/template.html',
        controller: 'DetailsController'
    });
}])

.controller('DetailsController', ['$scope', '$routeParams', '$http', '$filter', '$localStorage', function ($scope, $routeParams, $http, $filter, $localStorage) {

    var id = parseInt($routeParams.requestId, 10),
        wrapper = $("#loading-wrapper");

    if (isNaN(id)) {
        $scope.error_message = "Видимо что-то случилось... Неверно указан ID запроса. Воспользуйтесь панелью слева.";
        return;
    }

    var request = $filter('getRequestById')($localStorage.requests, id);

    if (!request) {
        $scope.error_message = "Видимо что-то случилось... Запрос не найден.";
        return;
    }

    $scope.request = request;

    wrapper.show();
    $http.jsonp("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=JSON_CALLBACK&format=json&tags=" + request.tags.join(","))
        .then(
        function (response) {
            $scope.result = response.data;
        },
        function (response) {
            $scope.error_message = "Ошибка обмена данными с API Flickr. Стоит обратиться к разработчику.";
        }).finally(function () {
            wrapper.hide();
        });

    $scope.test = Request;

}]);

