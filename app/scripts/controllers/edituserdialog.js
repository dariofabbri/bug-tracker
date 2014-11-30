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

		$injector.invoke(function ($controller) { $controller('AlertCtrl', {$scope: $scope}); });

		$scope.isNew = isNew;

		$scope.user = user || {
			alias: '',
			name: '',
			surname: '',
			email: '',
			active: true
		};

		var resetValidationErrors = function () {
			$scope.validation = {
				__isValid: true,
				alias: { cssClass: '', message: '' },
				name: { cssClass: '', message: '' },
				surname: { cssClass: '', message: '' },
				email: { cssClass: '', message: '' }
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

		var validate = function () {

			resetValidationErrors();

			if(!$scope.user.alias) {
				setValidationError('alias', 'E\' necessario specificare un alias.');
			}

			if($scope.isNew && usersFactory.get($scope.user.alias)) {
				setValidationError('alias', 'L\'alias specificato è già in uso.');
			}

			var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!reEmail.test($scope.user.email)) {
				setValidationError('email', 'L\'indirizzo email specificato non è valido.');
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

		resetValidationErrors();
  });
