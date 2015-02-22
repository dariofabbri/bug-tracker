'use strict';

/**
 * @ngdoc overview
 * @name bugTrackerApp
 * @description
 * # bugTrackerApp
 *
 * Main module of the application.
 */
angular
  .module('bugTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ui.bootstrap',
		'ngAria'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/bugs', {
        templateUrl: 'views/bugs.html',
        controller: 'BugsCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
