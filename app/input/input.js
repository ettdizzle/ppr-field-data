'use strict';

angular.module('myApp.input', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/input', {
	templateUrl: 'input/input.html',
	controller: 'InputController'
  });
}])

.controller('InputController', ['$scope', function($scope) {

}]);