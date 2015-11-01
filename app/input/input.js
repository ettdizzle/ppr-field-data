'use strict';

angular.module('myApp.input', ['ngRoute'])
.controller('InputController', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://ppr-field-data.firebaseio.com/")

	$scope.expts = ['SOSP', 'DENS']

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

	// helper function to add leading zeros to string number
	// good for any 3 digit number
	// e.g. '1' --> '001'
	var leadZero = function(strNum) {
		if (strNum.length === 1) {
			return "00" + strNum;
		} else if (strNum.length === 2) {
			return "0" + strNum;
		} else {
			return strNum;
		}
	};

	// helper function to increment string
	// e.g. '001' --> '002'
	var inc = function(strNum) {
		var intNum = parseInt(strNum, 10) + 1;
		return leadZero(intNum.toString());
	};

	// helper function to decrement string
	// e.g. '004' --> '003'
	var dec = function(strNum) {
		var intNum = parseInt(strNum, 10) - 1;
		
		if (intNum > 0) {
			return leadZero(intNum.toString());
		} else {
			return '001';
		}
	};

	$scope.incPlantId = function() {
		$scope.plantInfo.id = inc($scope.plantInfo.id);
		$scope.updatePlantInfo();
	};

	$scope.decPlantId = function() {
		$scope.plantInfo.id = dec($scope.plantInfo.id);
		$scope.updatePlantInfo();
	};

	// Default observation info
	var defaultObservation = function() {
		return {
			height: '',
			caliper: '',
			date: new Date().toLocaleDateString('en-US')
		};
	};

	$scope.observation = defaultObservation();

	$scope.saveObservation = function() {
		var observations = $firebaseArray(ref
			.child($scope.plantInfo.site)
			.child($scope.plantInfo.expt)
			.child('plants')
			.child($scope.plantInfo.id)
			.child('observations')
		);

		// save record to Firebase
		observations.$add($scope.observation);
		// Move to next plant
		$scope.incPlantId();
		// Reset default observation info
		$scope.observation = defaultObservation();
	};


}]);