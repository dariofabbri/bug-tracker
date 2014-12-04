'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:EditBugDialogCtrl
 * @description
 * # EditBugDialogCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('EditBugDialogCtrl', function ($scope, $injector, $modalInstance, bug, isNew, bugsFactory, usersFactory, projectsFactory) {

		$injector.invoke(function ($controller) { $controller('ValidationCtrl', {$scope: $scope}); });

    $scope.users = usersFactory.list();
    $scope.projects = projectsFactory.list();

		$scope.isNew = isNew;

		$scope.datePickerOpened = false;

		$scope.bug = bug ? 
			angular.copy(bug) : 
			{
				id: '',
				subject: '',
				description: '',
				project: null,
				user: null,
				status: 'OPEN',
				date: null
			};

		$scope.openDatePicker = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.datePickerOpened = true;
		};

		var validate = function () {

			$scope.resetValidationErrors();

			if(!$scope.bug.subject) {
				$scope.setValidationError('subject', 'E\' necessario specificare un oggetto.');
			}

			if(!$scope.bug.project) {
				$scope.setValidationError('project', 'E\' necessario selezionare un progetto.');
			}

			if(!$scope.bug.user) {
				$scope.setValidationError('user', 'E\' necessario selezionare un utente.');
			}

			return $scope.validation.__isValid;
		};

		$scope.ok = function() {

			if(!validate()) {
				return;
			}

			$scope.bug.id = bugsFactory.generateNextId($scope.bug.project);
			bugsFactory.save($scope.bug);
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		$scope.resetValidationErrors();
  });
