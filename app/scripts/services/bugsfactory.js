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

      search: function (filter) {

				return _.filter(bugs, function (bug) {

					var matches = true;

					if(filter.id) {
						matches = matches && bug.id && bug.id.toLowerCase().indexOf(filter.id.toLowerCase()) !== -1;
					}

					if(filter.description) {
						matches = matches &&
							(bug.subject && bug.subject.toLowerCase().indexOf(filter.description.toLowerCase()) !== -1) || 
							(bug.description && bug.description.toLowerCase().indexOf(filter.description.toLowerCase()) !== -1);
					}

					if(filter.project) {
						matches = matches && bug.project && bug.project.code && bug.project.code.toLowerCase().indexOf(filter.project.toLowerCase()) !== -1;
					}

					if(filter.user) {
						matches = matches && bug.user && bug.user.alias && bug.user.alias.toLowerCase().indexOf(filter.user.toLowerCase()) !== -1;
					}

					return matches;
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
			},

			generateNextId: function (project) {

				// Filter all bugs attached to the specified project.
				//
				var filtered = _.filter(bugs, function (bug) {
					return bug.project.code === project.code;
				});

				// Extract numeric parts of the ids.
				//
				var numbers = _.map(filtered, function (bug) {
					
					var re = /[^-]+-(\d+)/g;
					var match = re.exec(bug.id);
					return parseInt(match[1]);
				});

				// Find the biggest numeric part of the ids.
				//
				var max = _.max(numbers);


				return project.code + '-' + (max === -Infinity ? 1 : max + 1);
			}
    };
  }]);
