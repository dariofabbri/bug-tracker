'use strict';

describe('Service: projectsFactory', function () {

  // load the service's module
  beforeEach(module('bugTrackerApp'));

  // instantiate service
  var projectsFactory;
  beforeEach(inject(function (_projectsFactory_) {
    projectsFactory = _projectsFactory_;
  }));

  it('should do something', function () {
    expect(!!projectsFactory).toBe(true);
  });

});
