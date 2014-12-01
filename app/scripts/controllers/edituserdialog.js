'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:EditUserDialogCtrl
 * @description
 * # EditUserDialogCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('EditUserDialogCtrl', function ($scope, $injector, $modalInstance, user, isNew, usersFactory) {

		$injector.invoke(function ($controller) { $controller('ValidationCtrl', {$scope: $scope}); });

		$scope.isNew = isNew;

		$scope.user = user ? 
			angular.copy(user) : 
			{
				alias: '',
				name: '',
				surname: '',
				email: '',
				active: true
			};

		var validate = function () {

			$scope.resetValidationErrors();

			if(!$scope.user.alias) {
				$scope.setValidationError('alias', 'E\' necessario specificare un alias.');
			}

			if($scope.isNew && usersFactory.get($scope.user.alias)) {
				$scope.setValidationError('alias', 'L\'alias specificato è già in uso.');
			}

			var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!reEmail.test($scope.user.email)) {
				$scope.setValidationError('email', 'L\'indirizzo email specificato non è valido.');
			}

			return $scope.validation.__isValid;
		};

		$scope.ok = function() {

			if(!validate()) {
				return;
			}

			usersFactory.save($scope.user);
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		$scope.resetValidationErrors();
  });
