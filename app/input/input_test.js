'use strict';

describe('myApp.input module', function() {

  beforeEach(module('myApp.input'));

  describe('input controller', function(){
  	var scope, inputCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            inputCtrl = $controller('InputController', {$scope: scope});
        }));

    it('should be defined', function() {
      //spec body
      expect(inputCtrl).toBeDefined();
    });

  });
});