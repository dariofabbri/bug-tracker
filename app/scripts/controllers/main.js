'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
