/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
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
