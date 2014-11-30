'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
