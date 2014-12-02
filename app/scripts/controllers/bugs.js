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

		$scope.filterProjects = function (projects, typed) {
			return projects.filter(function (project) {
				var matchesCode = project.code && project.code.toLowerCase().indexOf(typed.toLowerCase()) !== -1;
				var matchesName = project.name && project.name.toLowerCase().indexOf(typed.toLowerCase()) !== -1;
				var matchesDescription = project.description && project.description.toLowerCase().indexOf(typed.toLowerCase()) !== -1;

				return matchesCode || matchesName || matchesDescription;
			});
		};

		$scope.filterUsers = function (users, typed) {
			return users.filter(function (user) {
				var matchesAlias = user.alias && user.alias.toLowerCase().indexOf(typed.toLowerCase()) !== -1;
				var matchesName = user.name && user.name.toLowerCase().indexOf(typed.toLowerCase()) !== -1;
				var matchesSurname = user.surname && user.surname.toLowerCase().indexOf(typed.toLowerCase()) !== -1;
				var matchesEmail = user.email && user.email.toLowerCase().indexOf(typed.toLowerCase()) !== -1;

				return matchesAlias || matchesName || matchesSurname || matchesEmail;
			});
		};

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
