'use strict';

/**
 * @ngdoc overview
 * @name flywheelInitApp
 * @description
 * # flywheelInitApp
 *
 * Main module of the application.
 */



var yelo= angular
  .module('flywheelInitApp', [
    'ui.router',
    'angucomplete',
    'ngAnimate',
    'datatables'
  ])



yelo.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/yelo');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
    .state('yelo', {
      url: '/yelo',
      templateUrl: 'views/app.html',
      controller:'yeloMainCtrl'
    }).state('yelo.analytics', {
      url: '/customer',
      templateUrl: 'views/yeloMain.html',
      controller:'yeloMainCtrl'
    })

});


