/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// let's put the azureADConfig in a re-usable place and at the top for easy access
var azureADConfig = {
    clientId: '{Insert client ID here}',
    endpoints: {
        // Map the location of a request to an API to a the identifier of the associated resource
        'https://graph.microsoft.com': 'https://graph.microsoft.com'
    }
};


// Debug logging for ADAL
Logging.log = function(msg) {
    console.log(msg);
};
Logging.level = 3;
