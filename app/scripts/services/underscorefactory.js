'use strict';

/**
 * @ngdoc service
 * @name bugTrackerApp.underscoreFactory
 * @description
 * # underscoreFactory
 * Factory in the bugTrackerApp.
 */
angular.module('bugTrackerApp')
  .factory('_', function () {
		return window._;
  });
