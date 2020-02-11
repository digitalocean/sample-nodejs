# Getting Started #

These steps will get this sample application running for you using DigitalOcean.

**Note: Following these steps will result in charges for the use of DigitalOcean Droplets**

## Requirements

* Docker must be [installed locally](https://docs.docker.com/install/) on your machine, unless you choose to build remotely via Github Actions (beyond the scope of this README)
* You need a DigitalOcean account. If you don't already have one, you can sign up at https://cloud.digitalocean.com/registrations/new
    

## Installing App Sail ##

To install the App Sail CLI, visit https://cloud.digitalocean.com/appsail and choose to Create or Launch a new app. Follow the on-screen instructions for installing the CLI.

## Downloading the Sample App Source Code

To download the demo app run in your terminal:

	git clone https://github.com/digitalocean-appsail/sample-nodejs.git
	cd sample-nodejs

## Deploying the App ##

	sail push

It will ask for an auth key if you haven't used the sail CLI before. Retrieve it from [the auth page](https://cloud.digitalocean.com/appsail/auth).

Then it will ask how to configure the app.
Answer the questions as follows:

	✓ What should this app be called: sample-nodejs
	✓ Need to set any env variables: No
	Let's configure your app for deployment:
	⣷ Installing configuration generators✓ Installing configuration generators
	✓ Choose your configuration preference: Automatic...
	✓ Node app detected, is this correct: Yes
	✓ Use Node 10: Yes
	✓ Do you need a database: No


After that, it will go through a deploy process. Once it's done, you can open the live app or administration dashboard by following the links provided by the App Sail CLI once the push is completed.

## Learn More ##

You can learn more about App Sail and how to manage and update your application at https://www.digitalocean.com/docs/appsail/.


## Deleting the App #

When you no longer need this sample application running live, you can delete it by following these steps:
1. Visit the app dashboard at https://cloud.digitalocean.com/appsail
1. Navigate to the sample-nodejs app
1. Choose "App Config"->"Show More"
1. Select "Delete", type your app's name, and click "Delete App".

This will delete the app and destroy any underlying DigitalOcean Droplets. 

**Note: If you don't delete your app, charges for the use of DigitalOcean Droplets will continue to accrue. Also, even if you delete your app, a new push to your sample-nodejs repo on Github will trigger a new deploy which will result in DigitalOcean charges.**

