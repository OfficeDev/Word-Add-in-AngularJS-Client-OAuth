# Office Add-in Office 365 Client Authentication for Angular.js 

A goal of many Microsoft Office add-ins is to improve user productivity. You can get closer to achieving this goal with the help of third-party services. This sample is a Word add-in demonstrating client-side OAuth using Angular JS and ADAL for Angular. 

![](http://i.imgur.com/JERzS4n.png)

In contrast to [other](https://github.com/OfficeDev/Office-Add-in-Nodejs-ServerAuth) [samples](https://github.com/dougperkes/Office-Add-in-AspNetMvc-ServerAuth), this add-in does not require any server-side techniques or web sockets. In Office 2016 we now have the ability to use the dialog framework to pop up a window and communicate back and forth between the pop up window and an Office add-in task pane window.

##Run the add-in

#### Setup your environment

1. Clone the GitHub repository
1. Ensure you have the the gulp and bower tools installed. Open a command prompt and run `npm install -g bower gulp`.
2. Open a command prompt to the sample directory and run `npm install`.
3. Have a location to publish you add-in manifest. I prefer using a [network shared folder technique](https://dev.office.com/docs/add-ins/publish/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins).

#### Run the add-in 
  
1. At the command prompt run `gulp serve-static`
2. Open Word, click **My Add-ins**, then select **SHARED FOLDER**. 
3. Select **Client-Side Auth Sample**, then click **OK**
4. The task pane will open and you will be able to authenticate with Office 365 credentials in the pop up window.

### Register your app in Azure

Register a web application in [Azure Management portal](https://manage.windowsazure.com) with the following configuration:

Parameter | Value
---------|--------
Name | add-in-word-client-oauthweb
Type | Web application and/or web API
Sign-on URL | https://localhost:8443/Auth.html
App ID URI | https://[your azure ad tenant name].onmicrosoft.com/Add-In-Word-Client-OAuthWeb
Reply URL | https://localhost:8443/index.html, https://localhost:8443/Auth.html

Add the following permissions:

Application | Delegated Permissions
---------|--------
Microsoft Graph | Read User Calendars
Windows Azure Active Directory | Sign in and read user profile

Save the application, take note of the *client ID*

#### Set up OAuth implicit flow 

For this applications written in AngularJS, Azure AD supports the OAuth 2.0 Implicit Grant flow. The implicit flow is described in the OAuth 2.0 Specification. Its primary benefit is that it allows the app to get tokens from Azure AD without performing a backend server credential exchange. This allows the app to sign in the user, maintain session, and get tokens to other web APIs all within the client JavaScript code. More details can be found on the [Azure AD site](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-protocols-implicit/). 

1. Return to your application Configure page in Azure AD. 
2. Click **Manage Manifest**, then **Download Manifest**
2. Save the manifest to your computer.
3. Open the manifest in a text editor.
4. Set the `oauth2AllowImplicitFlow` value to `true`.
5. Save the manifest file changes.
6. Return to Azure management portal, click **Manage Manifest**, then **Upload Manifest**. Select your manifest and upload.

### Update the client id.
    * Open scripts/azureADConfig.js
    * Update `clientId: 'd8bd9878-95f3-48a8-80d9-b5484c4b86b4'` with the value from your Azure AD application


## Questions and comments

We'd love to get your feedback about this sample. You can send your questions and suggestions to us in the [Issues](https://github.com/dougperkes/Add-In-Word-Client-OAuth/issues) section of this repository.

Questions about Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/office-addins). Make sure that your questions or comments are tagged with [office-addins].
  
## Additional resources

* [More add-in samples](https://github.com/OfficeDev?utf8=%E2%9C%93&query=-add-in)
* [Office add-ins](http://msdn.microsoft.com/library/office/jj220060.aspx)
* [Anatomy of an add-in](https://msdn.microsoft.com/library/office/jj220082.aspx#StartBuildingApps_AnatomyofApp)
