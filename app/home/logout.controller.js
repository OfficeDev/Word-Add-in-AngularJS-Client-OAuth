/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
(function () {
  'use strict';

  angular.module('officeAddin').controller('logoutController', ['$scope', '$q', '$location', 'adalAuthenticationService', 
  function ($scope, $q, $location, adalService) {
    $scope.title = "Please Login";
        
    $scope.init = function () {
      $scope.isAuthenticated = adalService.userInfo.isAuthenticated;
      $scope.userInfo = adalService.userInfo;
      if ($scope.isAuthenticated) {
          //$location.path('/home');
      } else {
        $location.path('/login');
      }
    };

    $scope.startLogout = function () {
      //can't use angular routes because of the way the dialog intercepts and rewrites the path
      showLoginPopup("/Logout.html")
        .then(function successCallback(response) {
          // authentication has succeeded but to get the authenication context for the 
          // user which is stored in localStorage we need to reload the page.
          window.location.reload();
        }, function errorCallback(response) {
        });
    };

    var _dlg;
    var _dlgDefer;

    var showLoginPopup = function (url) {
      _dlgDefer = $q.defer();

      var fullUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') +
        url;
      Office.context.ui.displayDialogAsync(fullUrl,
        { height: 40, width: 40, requireHTTPS: true },
        function (result) {
          console.log("dialog has initialized. wiring up events");
          _dlg = result.value;
          _dlg.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, processMessage);
            /*Events are sent by the platform in response to user actions or errors. For example, the dialog is closed via the 'x' button*/
          _dlg.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogEventReceived, dialogEventHandler);
    });

      return _dlgDefer.promise;
    }

    var processMessage = function (arg) {
      var msg = arg.message;
      console.log("Message received in processMessage");
      if (msg && msg === "success") {
        //we now have a valid auth token in the localStorage
        _dlg.close();
        _dlgDefer.resolve();
      } else {
        //something went wrong with authentication
        _dlg.close();
        console.log("Authentication failed: " + arg.message);
        _dlgDefer.reject();
      }
    };
    
    var dialogEventHandler = function (arg) {
      //resolve the deferred with any changes to the dialog to the page can reload 
      _dlgDefer.resolve();
    };
    

  }]);

})();
