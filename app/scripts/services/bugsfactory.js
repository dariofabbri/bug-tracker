'use strict';

/**
 * @ngdoc service
 * @name bugTrackerApp.bugsFactory
 * @description
 * # bugsFactory
 * Factory in the bugTrackerApp.
 */
angular.module('bugTrackerApp')
  .factory('bugsFactory', ['_', function (_) {

		var bugs = [];

		var deserialize = function () {
			bugs = angular.fromJson(localStorage.getItem('bug-tracker-bugs')) || [];
		};

		var serialize = function () {
			localStorage.setItem('bug-tracker-bugs', angular.toJson(bugs));
		};

		// Load first time.
		//
		deserialize();

    return {
      list: function () {

				return bugs;
      },

      search: function (id, description, project, user) {

				return _.filter(bugs, function (bug) {

					var matches = true;

					if(id) {
						matches = matches && bug.id && bug.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
					}

					if(description) {
						matches = matches &&
							(bug.subject && bug.subject.toLowerCase().indexOf(description.toLowerCase()) !== -1) || 
							(bug.description && bug.description.toLowerCase().indexOf(description.toLowerCase()) !== -1);
					}

					if(project) {
						matches = matches && bug.project && bug.project.code && bug.project.code.toLowerCase().indexOf(project.toLowerCase()) !== -1;
					}

					if(user) {
						matches = matches && bug.user && bug.user.alias && bug.user.alias.toLowerCase().indexOf(user.toLowerCase()) !== -1;
					}

					return bug.active;
				});
      },

			get: function (id) {

				return _.find(bugs, function (bug) {
					return bug.id === id;
				});
			},

			save: function (bug) {

				var existing = this.get(bug.id);
				if(existing) {
					_.extend(existing, bug);
				} else {
					bugs.push(bug);
				}

				serialize();
			}
    };
  }]);
