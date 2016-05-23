'use strict';

angular.module('photoSearchApp.index', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/index', {
        templateUrl: 'index/template.html',
        controller: 'IndexController'
    });
}])

.controller('IndexController', ['$scope', function ($scope) {

}]);
