/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
(function () {
  'use strict';

  // create
  var officeAddin = angular.module('officeAddin', [
    'ngRoute',
    'ngSanitize',
    'AdalAngular',
    'angularMoment' //date time formatting
  ]);
  
  officeAddin.constant('azureADConfig', azureADConfig);

  // configure
  officeAddin.config(['$routeProvider', '$httpProvider', '$locationProvider', '$logProvider', 'adalAuthenticationServiceProvider', 'azureADConfig',
    function ($routeProvider, $httpProvider, $locationProvider, $logProvider, adalProvider, azureADConfig) {
      // set debug logging to on
      if ($logProvider.debugEnabled) {
        $logProvider.debugEnabled(true);
      }

      adalProvider.init({
        //instance: 'https://login.microsoftonline.com/',
        clientId: azureADConfig.clientId,
        anonymousEndpoints: [],
        //extraQueryParameter: 'prompt=consent',
        requireADLogin: false,
        endpoints: azureADConfig.endpoints,
        cacheLocation: 'localStorage', 
      }, $httpProvider);
    }]);

  // when Office has initalized, manually bootstrap the app
  Office.initialize = function () {
    $(document).ready(function () {
      console.log('>>> Office.initialize()');
      angular.bootstrap(document.getElementById('container'), ['officeAddin']);
    
    });
  };

})();
