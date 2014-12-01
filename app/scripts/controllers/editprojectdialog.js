'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:EditProjectDialogCtrl
 * @description
 * # EditProjectDialogCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('EditProjectDialogCtrl', function ($scope, $injector, $modalInstance, project, isNew, projectsFactory) {

		$injector.invoke(function ($controller) { $controller('ValidationCtrl', {$scope: $scope}); });

		$scope.isNew = isNew;

		$scope.project = project ?
			angular.copy(project) : 
			{
				code: '',
				name: '',
				description: '',
				active: true
			};

		var validate = function() {

			$scope.resetValidationErrors();

			if(!$scope.project.code) {
				$scope.setValidationError('code', 'E\' necessario specificare un codice progetto.');
			}

			if($scope.project.code && $scope.project.code.length !== 3) {
				$scope.setValidationError('code', 'Il codice deve essere lungo tre caratteri.');
			}

			if($scope.isNew && projectsFactory.get($scope.project.code)) {
				$scope.setValidationError('alias', 'Il codice progetto specificato è già in uso.');
			}

			if(!$scope.project.name) {
				$scope.setValidationError('name', 'E\' necessario specificare il nome del progetto.');
			}

			return $scope.validation.__isValid;
		};

		$scope.ok = function() {

			if(!validate()) {
				return;
			}

			$scope.project.code = $scope.project.code.toUpperCase();

			projectsFactory.save($scope.project);
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		$scope.resetValidationErrors();
  });
