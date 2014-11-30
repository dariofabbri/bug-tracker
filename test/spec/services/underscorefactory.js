'use strict';

describe('Service: _', function () {

  // load the service's module
  beforeEach(module('bugTrackerApp'));

  // instantiate service
  var _;
  beforeEach(inject(function (___) {
    _ = ___;
  }));

  it('should have a working max function', function () {
    expect(_.max([7, 3, 9, 4])).toBe(9);
  });

});
