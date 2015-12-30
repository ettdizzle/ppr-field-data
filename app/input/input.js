'use strict';

angular.module('myApp.input', ['ngRoute', "ngSanitize", "ngCsv"])
.controller('InputController', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://ppr-field-data.firebaseio.com/")

	$scope.showCSV = false;
	$scope.observationProperties = [];

	$scope.expts = ['SOSP', 'DENS'];
	$scope.phenologies = ['Dormant', 'Bud break', 'Leaf out >1/4 inch',
						  'In flower', 'Fruit set'];

	// Default plant info
	$scope.plantInfo = {
		site: 'Haddington',
		expt: 'SOSP',
		id: '001',
		species: '',
		plot: ''
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
			spreadX: '',
			spreadY: '',
			spreadAvg: '',
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
		// Temporerily save observer name
		var observer = $scope.observation.observer;
		// Reset default observation info
		$scope.observation = defaultObservation();
		// Restore observer name
		$scope.observation.observer = observer;
	};

	$scope.updateSpread = function() {
		$scope.observation.spreadAvg = ($scope.observation.spreadX + $scope.observation.spreadY) / 2;
	};

	$scope.prepareCSV = function() {
		// Get all data from selected site
		var allData = $firebaseObject(ref
			.child($scope.plantInfo.site)
			);

		var isNotMetaData = function(str) {
			return str != "$$conf" && str != "$id" && str != "$priority";
		};

		var excludeMetaData = function(arr) {
			return arr.filter(isNotMetaData);
		}

		allData.$loaded()
			.then(function() {
				$scope.allObservations = [];
				$scope.observationProperties = ['site', 'experiment', 'plot', 'plantId', 'species', 'date', 'observer', 'dead'];

				var experiments = excludeMetaData(Object.keys(allData));

				// iterate through experiments
				experiments.map(function(experiment) {
					// iterate through all plants
					var plants = allData[experiment]['plants'];
					for (var plant in plants) {
						//console.log(plants[plant]);
						// iterate through observations
						var observations = plants[plant]['observations'];
						for (var observation in observations) {
							// make copy of observation object
							var observationCopy = angular.copy(observations[observation]);
							// add any unique properties to the list
							$scope.observationProperties = _.union($scope.observationProperties, Object.keys(observationCopy));
							// add in relevant details
							observationCopy.site = $scope.plantInfo.site;
							observationCopy.experiment = experiment;
							observationCopy.plantId = plant;
							observationCopy.species = plants[plant]['plantInfo']['species'];
							observationCopy.plot = plants[plant]['plantInfo']['plot'];
							
							$scope.allObservations.push(observationCopy);
						}
					}
				});
			})
		.then(function() {
			$scope.showCSV = true;
		});
	};

}]);