---
topic: sample
products:
- Word
- Office 365
languages:
- JavaScript
extensions:
  contentType: samples
  technologies:
  - Add-ins
  - OAuth 2.0
  createdDate: 5/20/2016 2:24:52 PM
---
# Office Add-in Office 365 Client Authentication for AngularJS 

The goal of Office Add-ins is to improve user productivity. You can achieve this goal with the help of third-party services. This sample is a Word add-in demonstrating client-side OAuth using AngularJS and ADAL for Angular. 

![Screenshot of a client-side auth sample running in a task pane](http://i.imgur.com/JERzS4n.png)

This add-in does not require any server-side techniques or web sockets. In Office 2016 we now have the ability to use the [dialog framework from the Office UI Namespace](https://dev.office.com/reference/add-ins/shared/officeui) to pop up a window and communicate back and forth between the pop up window and an Office Add-in task pane window.

#### Set up your environment

1. Clone the GitHub repository.
1. Ensure that you have the the gulp and bower tools installed. Open a command prompt and run `npm install -g bower gulp`.
2. Open a command prompt to the sample directory and run `npm install`.
3. Have a location to publish you add-in manifest. See [Publish your Office Add-in](http://dev.office.com/docs/add-ins/publish/publish).
4. An Office 365 developer account. If you don't have one, [join the Office 365 Developer Program and get a free 1 year subscription to Office 365](https://aka.ms/devprogramsignup).

### Register your app in Microsoft Azure

Register a web application in [Azure Management portal](https://manage.windowsazure.com) with the following configuration: 
Use [this guide](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-integrating-applications) to register an application.

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
Microsoft Azure Active Directory | Sign in and read user profile

Save the application and make note of the *client ID*.

#### Set up OAuth implicit flow 

For this application written in AngularJS, Azure AD supports the OAuth 2.0 Implicit Grant flow. The implicit flow is described in the OAuth 2.0 Specification. Its primary benefit is that it allows the app to get tokens from Azure AD without performing a backend server credential exchange. This allows the app to sign in the user, maintain session, and get tokens to other web APIs all within the client JavaScript code. More details can be found on the [Azure AD site](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-protocols-implicit/). 

1. Return to your application Configure page in Azure AD. 
2. Choose **Manage Manifest** > **Download Manifest**.
2. Save the manifest to your computer.
3. Open the manifest in a text editor.
4. Set the `oauth2AllowImplicitFlow` value to `true`.
5. Save the manifest file changes.
6. Return to Azure management portal, choose **Manage Manifest** > **Upload Manifest**. Select your manifest and upload.

### Update the client id
* Open scripts/azureADConfig.js.
* Update `clientId: '[Insert client ID here]'` with the value from your Azure AD application.

#### Run the add-in 
  
1. At the command prompt, run `gulp serve-static`.
2. Open Word, and start a new document.
3. On the **Insert** ribbon, choose **My Add-ins**, then select **SHARED FOLDER**. 
3. Select **Client-Side Auth Sample**, then choose **OK**. A new group called **Client Auth** will appear on the **Home** ribbon, with a button named **Open**.
4. Click the **Open** button. The task pane will open.
5. Press the **Login to Office 365** button and you will be able to authenticate with Office 365 credentials in the pop up window. Your calendar events will appear in the task pane.

## Questions and comments

We'd love to get your feedback about this sample. You can send your questions and suggestions to us in the [Issues](https://github.com/OfficeDev/Word-Add-in-AngularJS-Client-OAuth/issues) section of this repository.

Questions about Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/office-addins). Make sure that your questions or comments are tagged with [office-addins].
  
## Additional resources

* [Office Add-in samples](https://github.com/OfficeDev?utf8=%E2%9C%93&query=-add-in)
* [Office Add-ins platform overview](http://dev.office.com/docs/add-ins/overview/office-add-ins)
* [Get started with Office Add-ins](http://dev.office.com/getting-started/addins)

## Copyright

Copyright (c) 2016 Microsoft Corporation. All rights reserved.


This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
