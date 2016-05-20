(function () {
  'use strict';

  // create
  var officeAddin = angular.module('officeAddin', [
    'ngRoute',
    'ngSanitize',
    'AdalAngular'
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
        endpoints: azureADConfig.endpoints,
        cacheLocation: 'localStorage', 
      }, $httpProvider);
    }]);
    
//  officeAddin.factory('graphHttpInterceptor', ['$q', '$rootScope', '$injector',
//     function ($q, $rootScope, $injector) {
//         return {
//             'response': function (response) {
//                 if (response.config.url.search(/graph\.microsoft\.com/) !== -1) {
//                     if ($rootScope.requestLog == null) $rootScope.requestLog = [];
//                     response.completedOn = new Date();
//                     $rootScope.requestLog.unshift(response);
//                 }
//                 return response;
//             },
//             'responseError': function (response) {
//                 if (response.config.url.search(/graph\.microsoft\.com/) !== -1) {
//                     if ($rootScope.requestLog == null) $rootScope.requestLog = [];
//                     response.completedOn = new Date();
//                     $rootScope.requestLog.unshift(response);
//                 }
//                 return response;
//             }
//         }
//     }
// ]);

// officeAddin.config(function ($httpProvider) {
//     $httpProvider.interceptors.push('graphHttpInterceptor');
// });

Logging = {
    level: 3,
    log: function (message) {
        console.log(message);
    }
};


  // when Office has initalized, manually bootstrap the app
  Office.initialize = function () {
    $(document).ready(function () {
    console.log('>>> Office.initialize()');
    angular.bootstrap(document.getElementById('container'), ['officeAddin']);
    });
  };

})();
