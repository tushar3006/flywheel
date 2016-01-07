var flywheel = angular.module();


flywheel.controller('MainController',function(){


});

flywheel.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    template: '<p>Hello, world!</p>'
  })
})i
