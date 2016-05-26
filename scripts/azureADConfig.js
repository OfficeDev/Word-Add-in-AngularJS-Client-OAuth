// let's put the azureADConfig in a re-usable place and at the top for easy access
var azureADConfig = {
    clientId: 'd8bd9878-95f3-48a8-80d9-b5484c4b86b4',
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
