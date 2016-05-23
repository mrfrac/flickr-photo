'use strict';

angular.module('photoSearchApp.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {
        templateUrl: 'edit/template.html',
        controller: 'EditController'
    });
}])

.controller('EditController', ['$scope', '$localStorage', function ($scope, $localStorage) {

}]);
