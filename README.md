# Getting Started #

This will guide through the steps to install the App Sail CLI (command line interface) and push this repo to a new, live app

**Note: Following these steps will result in charges for the use of DigitalOcean Droplets**

## Requirements

* Docker must be installed locally on your machine, unless you choose to build remotely via Github Actions (beyond the scope of this README)
* You need a DigitalOcean account. If you don't already have one, you can sign up at https://cloud.digitalocean.com/registrations/new
    

## Installing App Sail ##

To install the App Sail CLI, visit https://appsail.digitalocean.com and choose to Create or Launch a new app. Follow the on-screen instructios for installing the CLI.

## Downloading the source code

To download the demo app run in your terminal:

	git clone https://github.com/digitalocean-appsail/nodejs-demo.git
	cd nodejs-demo

## Deploying the App ##

	sail push

It will ask for an auth key if you haven't used the sail CLI before. Retrieve it from [the auth page](https://appsail.digitalocean.com/go/auth).

Then it will ask how to configure the app.
Answer the questions as follows:

	✓ Who does this app belong to: <choose your personal account or team>
	✓ What should this app be called: nodejs-demo
	Let's configure your app for deployment:
	✓ Choose your configuration preference: Automatic...
	✓ Node app detected, is this correct: Yes
	✓ Use Node 10: Yes
	✓ Do you need a database: No

After that, it will go through a deploy process. Once it's done, you can open the live app or administration dashboard by following the links provided by the App Sail CLI once the push is completed.

## Viewing Application Logs ##

You can view your application's logs by following these steps:
1. Visit the app dashboard at https://appsail.digitalocean.com/
1. Navigate to the nodejs-demo app
1. Click "Logs"

Alternatively, from your terminal while inside your top level application directory (e.g. nodejs-demo), run:

	sail get logs --recent
	
Or to see a live stream of your logs, run:

	sail get logs

Then visit your live app in your browser to generate some log output (which you'll see in your terminal). Use ctrl-c to stop viewing your log stream in your terminal.
	
To learn more about this command, run `sail get logs -h`


## Making a Change #

Let's try making a simple change to our application and pushing that live. We'll change the body text color. Edit the file public/stylesheets/style.css so it looks like this:
```
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  color: #FF0000;
}

a {
  color: #00B7FF;
}
```

Save your changes locally, make sure you're in the top level directory of your app (e.g. nodejs-demo) and run:

	sail push
	
This push should go faster than the initial one. The old version of your application will remain live during this push, and  

## Deleting the App #

When you no longer need this sample application running live, you can delete it by following these steps:
1. Visit the app dashboard at https://appsail.digitalocean.com/
1. Navigate to the nodejs-demo app
1. Choose "App Config"->"Show More"
1. Select "Delete", type your app's name, and click "Delete App".

This will delete the app and destroy any underlying DigitalOcean Droplets. 

**Note: If you don't delete your app, charges for the use of DigitalOcean Droplets will continue to accrue.**

