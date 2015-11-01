'use strict';

angular.module('myApp.input', ['ngRoute'])
.controller('InputController', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
	var ref = new Firebase("https://ppr-field-data.firebaseio.com/")

	$scope.plantInfo = {
		site: 'Haddington',
		expt: 'SOSP',
		id: '001',
	};

	var plantRecord = $firebaseObject(ref
		.child($scope.plantInfo.site)
		.child($scope.plantInfo.expt)
		.child('plants')
		.child($scope.plantInfo.id)
		.child('plantInfo')
	);

	plantRecord.$loaded().then(function() {
		$scope.plantInfo.species = plantRecord.species;
	});

	$scope.observation = {
		height: '',
		caliper: '',
		date: new Date().toLocaleDateString('en-US')
	};
}]);