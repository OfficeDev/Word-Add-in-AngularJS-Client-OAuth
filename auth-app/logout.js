/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
'use strict';

var app = angular.module('authApp', ['ngRoute', 'AdalAngular']);

app.constant('azureADConfig', azureADConfig);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', 'adalAuthenticationServiceProvider', 'azureADConfig',
    function ($routeProvider, $httpProvider, $locationProvider, adalProvider, azureADConfig) {
        var logoutRedirectUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/Logout.html';
        $routeProvider.when("/logout", {
            controller: "logoutCtrl",
            templateUrl: "auth-app/logout.html",
            requireADLogin: true,
        })
        .otherwise({ redirectTo: "/logout" });

        adalProvider.init({
            clientId: azureADConfig.clientId,
            anonymousEndpoints: [],
            requireADLogin: false,
            endpoints: azureADConfig.endpoints,
            cacheLocation: 'localStorage', 
            postLogoutRedirectUri: logoutRedirectUri,
        }, $httpProvider);
    }
]);

app.controller('logoutCtrl', ['$rootScope', '$http', '$scope', 'adalAuthenticationService', '$location', function ($rootScope, $http, $scope, adalService, $location) {
    $scope.init = function () {
        //since we set requireADLogin for this route, we are guaranteed to 
        // have a token, but let's double check to be certain
        if (adalService.userInfo.isAuthenticated) {
            adalService.logOut();
        } else {
            $scope.completeAuth();
        }
    }
    
    $scope.completeAuth = function() {
        Office.context.ui.messageParent("success");
    }
}]);

// Manually bootstrap angular because we are in an Office add-in
Office.initialize = function (reason) {
    $(document).ready(function () {
        angular.bootstrap($('#container'), ['authApp']);
    });
}; 