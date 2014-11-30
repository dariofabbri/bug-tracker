'use strict';

describe('Controller: CreateProjectDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('bugTrackerApp'));

  var CreateProjectDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateProjectDialogCtrl = $controller('CreateProjectDialogCtrl', {
      $scope: scope
    });
  }));
});
