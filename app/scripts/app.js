'use strict';

/**
 * @ngdoc overview
 * @name flywheelInitApp
 * @description
 * # flywheelInitApp
 *
 * Main module of the application.
 */



var flywheel = angular
  .module('flywheelInitApp', [
    'ui.router',
    'angucomplete',
    'ngAnimate'
  ])



flywheel.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/drivers');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
    .state('drivers', {
      url: '/drivers',
      templateUrl: 'views/app.html'
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('drivers.messages', {
      url: '/messages',
      templateUrl: 'views/main.html',
      controller:'MainCtrl'
    })

});


