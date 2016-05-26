(function(){
  'use strict';

  var officeAddin = angular.module('officeAddin');

  // load routes
  officeAddin.config(['$routeProvider', routeConfigurator]);

  function routeConfigurator($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: '/app/home/login.html',
        controller: 'loginController',
        requireADLogin: false,
      })
      .when('/logout', {
        templateUrl: '/app/home/logout.html',
        controller: 'logoutController',
        requireADLogin: false,
      })
      .when('/home', {
        templateUrl: '/app/home/home.html',
        controller: 'homeController',
        requireADLogin: false,
      })
      .otherwise({ redirectTo: "/login" });
  }
})();
