'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:BugsCtrl
 * @description
 * # BugsCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('BugsCtrl', function ($scope, $modal, usersFactory, projectsFactory) {

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

				$scope.bugs = usersFactory.list();
			});
		};
  });
