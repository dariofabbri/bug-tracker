'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('ProjectsCtrl', function ($scope, projectsFactory, $modal) {

    $scope.projects = projectsFactory.list();

		$scope.openEditDialog = function (project) {

			var modalInstance = $modal.open({
				templateUrl: 'views/editprojectdialog.html',
				controller: 'EditProjectDialogCtrl',
				resolve: {
					project: function () {
						return project;
					},

					isNew: function () {
						return !project;
					}
				}
			});

			modalInstance.result.then(function () {

				$scope.projects = projectsFactory.list();
			});
		};

		$scope.openDeleteDialog = function (project) {

			var modalInstance = $modal.open({
				templateUrl: 'views/deleteprojectdialog.html',
				controller: 'DeleteProjectDialogCtrl',
				resolve: {
					project: function () {
						return project;
					}
				}
			});

			modalInstance.result.then(function () {

				$scope.projects = projectsFactory.list();
			});
		};
  });
