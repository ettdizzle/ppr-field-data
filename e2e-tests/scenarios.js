'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /input when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/input");
  });


  describe('input', function() {

    beforeEach(function() {
      browser.get('index.html#/input');
    });


    it('should render a horizontal form when user navigates to /input', function() {
      expect($('.form-horizontal').isPresent()).toBe(true);
    });
  });
});
