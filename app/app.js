'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.input',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/input', {
		templateUrl: 'input/input.html',
		controller: 'InputController'
  });
  $routeProvider.otherwise({redirectTo: '/input'});
}]);
