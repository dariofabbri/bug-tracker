'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('HeaderCtrl', function ($scope, $location) {

		$scope.isTabActive = function (viewLocation) {
			var currentLocation = $location.path();
			return currentLocation.replace(/(\/[^\/]+).*/, '$1') === viewLocation;
		};
  });
