'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:DeleteUserDialogCtrl
 * @description
 * # DeleteUserDialogCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('DeleteUserDialogCtrl', function ($scope, $modalInstance, user, usersFactory) {

		$scope.user = user;

		$scope.ok = function() {

			$scope.user.active = false;
			usersFactory.save($scope.user);
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
  });
