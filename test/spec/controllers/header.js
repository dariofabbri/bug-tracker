'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('bugTrackerApp'));

  var HeaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope,
			$location: $location
    });
  }));

  it('should have an isTabActive function', function () {
    expect(scope.isTabActive).toBeDefined();
  });

  it('should return false when calling isTabActive function for view "x"', function () {
    expect(scope.isTabActive('x')).toBe(false);
  });

  it('should return true when calling isTabActive function for view ""', function () {
    expect(scope.isTabActive('')).toBe(true);
  });
});
