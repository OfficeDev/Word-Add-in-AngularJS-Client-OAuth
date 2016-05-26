(function () {
  'use strict';

  angular.module('officeAddin').controller('homeController', ['$scope', '$location', 'dataService', 'adalAuthenticationService',
    function ($scope, $location, dataService, adalService) {
      $scope.title = "Home";
      $scope.meData = {};
      $scope.loadingEvents = false;
      $scope.init = function () {

        $scope.isAuthenticated = adalService.userInfo.isAuthenticated;
        
        $scope.userInfo = adalService.userInfo;
        if ($scope.isAuthenticated) {
          //let's make certain we have a token for the graph endpoint prior to making a call to the Graph API
          var resource = adalService.getResourceForEndpoint("https://graph.microsoft.com");
          var tokenStored = adalService.getCachedToken(resource);
          
          $scope.loadMe();
          $scope.initSpinner();
        } else {
          $location.path('/login');
        }
      };
      
      $scope.logout = function () {
          $location.path('/logout');
      };
      
      $scope.initSpinner = function() {
        if (typeof fabric === "object") {
          if ('Spinner' in fabric) {
            var element = document.querySelector('.ms-Spinner');
            if (element) {
              var component = new fabric['Spinner'](element);
            }
          }
        }
      }

      $scope.loadMe = function () {
        dataService.getMe().then(function (data) {
          $scope.meData = data;
        }, function (error) {
          $scope.meData = {};
        });

        $scope.loadEvents();
      };


      $scope.loadEvents = function () {
        $scope.loadingEvents = true;
        $scope.eventsData = [];
        dataService.getEvents().then(function (data) {
          $scope.eventsData = data.value;
          $scope.eventsLoadedOn = new Date();
          $scope.loadingEvents = false;
        }, function (error) {
          $scope.eventsData = [];
          $scope.loadingEvents = false;
        });

      }


    }]);

})();
