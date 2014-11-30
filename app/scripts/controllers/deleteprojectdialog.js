'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:DeleteProjectDialogCtrl
 * @description
 * # DeleteProjectDialogCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('DeleteProjectDialogCtrl', function ($scope, $modalInstance, project, projectsFactory) {

		$scope.project = project;

		$scope.ok = function() {

			$scope.project.active = false;
			projectsFactory.save($scope.project);
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
  });
