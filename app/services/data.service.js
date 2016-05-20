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
      setAuthToken: setAuthToken
    };

    /** *********************************************************** */


    function getMe() {
      var deferred = $q.defer();

      var url = "https://graph.microsoft.com/v1.0/me";
      $http.get(url)
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function setAuthToken(token) {
      authToken = token;
    }

  }

})();
