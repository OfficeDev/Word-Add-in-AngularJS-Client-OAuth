/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
(function () {
  'use strict';

  angular.module('officeAddin')
    .service('dataService', ['$http', '$q', dataService]);

  /**
   * Custom Angular service.
   */
  function dataService($http, $q) {
    var authToken;
    // public signature of the service
    return {
      getMe: getMe,
      getEvents: getEvents
    };

    /** *********************************************************** */

    function getMe() {
      var url = "https://graph.microsoft.com/v1.0/me";
      return callGraph(url);
    }

    function getEvents() {
      var url = "https://graph.microsoft.com/v1.0/me/events";
      return callGraph(url);
    }
    
    function callGraph(url) {
      var deferred = $q.defer();
      $http.get(url)
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(response) {
          deferred.reject(response);
        });
      return deferred.promise;
    }

  }

})();
