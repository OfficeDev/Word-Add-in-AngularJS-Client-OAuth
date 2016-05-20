# Add-In-Word-Client-OAuth

This sample is a Word add-in demonstrating client-side OAuth using Angular JS and ADAL for Angular. 

In contrast to [other](https://github.com/OfficeDev/Office-Add-in-Nodejs-ServerAuth) [samples](https://github.com/dougperkes/Office-Add-in-AspNetMvc-ServerAuth), this add-in does not require any server-side techniques or web sockets. In Office 2016 we now have the ability to use the dialog framework to pop up a window and communicate back and forth between the pop up window and an Office add-in task pane window.


##How to run the add-in

#### Setup your environment

1. Clone the GitHub repository
2. Open a command prompt to the sample directory and run `npm install`.
3. Have a location to publish you add-in manifest. I prefer using a [network shared folder technique](https://dev.office.com/docs/add-ins/publish/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins).

#### Run the add-in 
  
1. At the command prompt run `gulp serve-static`
2. Open Word, click **My Add-ins**, then select **SHARED FOLDER**. 
3. Select **Client-Side Auth Sample**, then click **OK**
4. The task pane will open and you will be able to authenticate with Office 365 credentials in the pop up window.

## More coming soon

### Set up the Azure AD Application

* Implicit login
* Two login pages

### About the sample

* ADAL and ADAL for Angular
* Dialog Framework