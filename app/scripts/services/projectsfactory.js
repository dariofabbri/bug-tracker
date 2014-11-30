'use strict';

/**
 * @ngdoc service
 * @name bugTrackerApp.projectsFactory
 * @description
 * # projectsFactory
 * Factory in the bugTrackerApp.
 */
angular.module('bugTrackerApp')
  .factory('projectsFactory', ['_', function (_) {

		var projects = [];

		var deserialize = function() {
			projects = angular.fromJson(localStorage.getItem('bug-tracker-projects')) || [];
		};

		var serialize = function() {
			localStorage.setItem('bug-tracker-projects', angular.toJson(projects));
		};

		// Load first time.
		//
		deserialize();

    return {
      list: function () {

				return _.filter(projects, function(project) {
					return project.active;
				});
      },

			get: function (code) {

				return _.find(projects, function(project) {
					return project.code === code;
				});
			},

			save: function (project) {

				var existing = this.get(project.code);
				if(existing) {
					_.extend(existing, project);
				} else {
					projects.push(project);
				}

				serialize();
			}
    };
  }]);
