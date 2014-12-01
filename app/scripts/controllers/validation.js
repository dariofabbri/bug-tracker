'use strict';

/**
 * @ngdoc function
 * @name bugTrackerApp.controller:ValidationCtrl
 * @description
 * # ValidationCtrl
 * Controller of the bugTrackerApp
 */
angular.module('bugTrackerApp')
  .controller('ValidationCtrl', function ($scope, $timeout, _) {

		$scope.alerts = []; 

		$scope.closeAlert = function(id) {
			$scope.alerts = _.reject($scope.alerts, function(alert) {
				return alert.id === id;
			});
		};

		$scope.addAlert = function(type, msg) {
			var id = _.uniqueId('alert');
			$scope.alerts.push({
				id: id,
				type: type,
				msg: msg
			});

			$timeout(function() {
				$scope.closeAlert(id);
			}, 3000);
		};

		$scope.resetValidationErrors = function () {
			$scope.validation = {
				__isValid: true,
				alias: { cssClass: '', message: '' },
				name: { cssClass: '', message: '' },
				surname: { cssClass: '', message: '' },
				email: { cssClass: '', message: '' }
			};
		};

		$scope.setValidationError = function (property, message) {
			$scope.validation[property] = { 
				cssClass: 'has-error',
				message: message
			};
			$scope.addAlert('danger', message);
			$scope.validation.__isValid = false;
		};
  });
