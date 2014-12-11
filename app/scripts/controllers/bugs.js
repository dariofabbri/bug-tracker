'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:BugsCtrl
 * @description
 * # BugsCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('BugsCtrl', function ($scope, $modal, bugsFactory, usersFactory, projectsFactory) {

    $scope.users = usersFactory.list();
    $scope.projects = projectsFactory.list();

		$scope.openEditDialog = function (bug) {

			var modalInstance = $modal.open({
				templateUrl: 'views/editbugdialog.html',
				controller: 'EditBugDialogCtrl',
				resolve: {
					bug: function () {
						return bug;
					},

					isNew: function () {
						return !bug;
					}
				}
			});

			modalInstance.result.then(function () {

				$scope.bugs = bugsFactory.list($scope.filter);
			});
		};

		$scope.applyFilter = function () {

			$scope.bugs = bugsFactory.search($scope.filter);
		};

		$scope.clearFilter = function () {

			$scope.filter = {};
			$scope.applyFilter();
		};

		// Preload the bugs list.
		//
		$scope.clearFilter();
  });
