'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('UsersCtrl', function ($scope, usersFactory, $modal) {

    $scope.users = usersFactory.list();

		$scope.openEditDialog = function (user) {

			var modalInstance = $modal.open({
				templateUrl: 'views/edituserdialog.html',
				controller: 'EditUserDialogCtrl',
				resolve: {
					user: function () {
						return user;
					},

					isNew: function () {
						return !user;
					}
				}
			});

			modalInstance.result.then(function () {

				$scope.users = usersFactory.list();
			});
		};


		$scope.openDeleteDialog = function (user) {

			var modalInstance = $modal.open({
				templateUrl: 'views/deleteuserdialog.html',
				controller: 'DeleteUserDialogCtrl',
				resolve: {
					user: function () {
						return user;
					}
				}
			});

			modalInstance.result.then(function () {

				$scope.users = usersFactory.list();
			});
		};
  });
