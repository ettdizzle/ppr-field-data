'use strict';

angular.module('myApp.input', ['ngRoute'])
.controller('InputController', ['$scope', function($scope) {
	$scope.plantInfo = {
		site: 'Haddington',
		expt: 'SOSP',
		id: '001',
		species: 'Cornus florida'
	};

	$scope.observation = {
		height: '',
		caliper: '',
		date: new Date().toLocaleDateString('en-US')
	};
}]);