'use strict';

angular.module('photoSearchApp', [
  'ngRoute',
  'photoSearchApp.index',
  'photoSearchApp.details',
  'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/index'});
}])

.controller('RequestsController', function($scope, $localStorage) {
  if(angular.isUndefined($localStorage.requests)){
    $localStorage.requests = initialRequests;
  }

  $scope.requests = $localStorage.requests;
})

.factory('Request', ['$localStorage', function($localStorage){
  return {
    id: 123,
    name: "sdfsdfsdf"
  }
}])

.filter('getRequestById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
});

var initialRequests = [
  {
    id: 1,
    name: "Автомобили",
    tags: ["cars", "авто"]
  },
  {
    id: 2,
    name: "Природа",
    tags: ["природа", "nature"]
  }
];
