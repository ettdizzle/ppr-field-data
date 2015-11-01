'use strict';

angular.module('myApp.input', ['ngRoute'])
.controller('InputController', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
	var ref = new Firebase("https://ppr-field-data.firebaseio.com/")

	// Default plant info
	$scope.plantInfo = {
		site: 'Haddington',
		expt: 'SOSP',
		id: '001',
		species: ''
	};

	// Update the plant info when Plant Selector fields change
	$scope.updatePlantInfo = function() {
		// load in record from Firebase
		var plantRecord = $firebaseObject(ref
			.child($scope.plantInfo.site)
			.child($scope.plantInfo.expt)
			.child('plants')
			.child($scope.plantInfo.id)
			.child('plantInfo')
		);

		// when loaded, get species
		plantRecord.$loaded().then(function() {
			$scope.plantInfo.species = plantRecord.species;
		});
	};

	// Get the plant info for the default plant
	$scope.updatePlantInfo();

	// Default observation info
	$scope.observation = {
		height: '',
		caliper: '',
		date: new Date().toLocaleDateString('en-US')
	};
}]);