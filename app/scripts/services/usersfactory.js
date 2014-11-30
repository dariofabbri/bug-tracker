'use strict';

/**
 * @ngdoc service
 * @name bugTrackerApp.usersFactory
 * @description
 * # usersFactory
 * Factory in the bugTrackerApp.
 */
angular.module('bugTrackerApp')
  .factory('usersFactory', ['_', function (_) {

		var users = [];

		var deserialize = function() {
			users = angular.fromJson(localStorage.getItem('bug-tracker-users')) || [];
		};

		var serialize = function() {
			localStorage.setItem('bug-tracker-users', angular.toJson(users));
		};

		// Load first time.
		//
		deserialize();

    return {
      list: function () {

				return _.filter(users, function(user) {
					return user.active;
				});
      },

			get: function (alias) {

				return _.find(users, function(user) {
					return user.alias === alias;
				});
			},

			save: function (user) {

				var existing = this.get(user.alias);
				if(existing) {
					_.extend(existing, user);
				} else {
					users.push(user);
				}

				serialize();
			}
    };
  }]);
