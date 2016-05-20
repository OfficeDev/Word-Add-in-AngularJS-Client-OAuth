(function(){
  'use strict';

  var officeAddin = angular.module('officeAddin');

  // load routes
  officeAddin.config(['$routeProvider', routeConfigurator]);

  function routeConfigurator($routeProvider){
    $routeProvider
      .when('/home', {
        templateUrl: '/app/home/home.html',
        controller: 'homeController',
        requireADLogin: false,
      })
      .otherwise({ redirectTo: "/home" });
  }
})();
