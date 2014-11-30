'use strict';

describe('Controller: EditUserDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('bugTrackerApp'));

  var EditUserDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditUserDialogCtrl = $controller('EditUserDialogCtrl', {
      $scope: scope
    });
  }));
});
