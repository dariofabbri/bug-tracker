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

		$injector.invoke(function ($controller) { $controller('AlertCtrl', {$scope: $scope}); });

		$scope.isNew = isNew;

		$scope.project = project || {
			code: '',
			name: '',
			description: '',
			active: true
		};

		var resetValidationErrors = function () {
			$scope.validation = {
				__isValid: true,
				code: { cssClass: '', message: '' },
				name: { cssClass: '', message: '' },
				description: { cssClass: '', message: '' }
			};
		};

		var setValidationError =function (property, message) {
			$scope.validation[property] = { 
				cssClass: 'has-error',
				message: message
			};
			$scope.addAlert('danger', message);
			$scope.validation.__isValid = false;
		};

		var validate = function() {

			resetValidationErrors();

			if(!$scope.project.code) {
				setValidationError('code', 'E\' necessario specificare un codice progetto.');
			}

			if($scope.isNew && projectsFactory.get($scope.project.code)) {
				setValidationError('alias', 'Il codice progetto specificato è già in uso.');
			}

			return $scope.validation.__isValid;
		};

		$scope.ok = function() {

			if(!validate()) {
				return;
			}

			projectsFactory.save($scope.project);
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		resetValidationErrors();
  });
