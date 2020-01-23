# Getting Started #

This will guide through the steps to install the App Sail CLI (command line interface) and push this repo to a new, live app
**Note: Following these steps will result in charges for the use of DigitalOcean Droplets**

## Requirements

    Docker

## Installing App Sail ##

To install the App Sail CLI, visit https://appsail.digitalocean.com and choose to Create or Launch a new app.

## Downloading the source code

To download the demo app run in your terminal:

	git clone https://github.com/digitalocean-mako/nodejs-demo.git
	cd nodejs-demo

## Deploying App ##

    sail push

It will ask for an auth key if you haven't used mako before. Retrieve it from [the auth page](https://appsail.digitalocean.com/go/auth).

Then it will ask how to configure the app.
Answer the questions as follows:

    ✓ Choose your configuration preference: Automatic...
    ✓ Node app detected, is this correct: Yes
    ✓ Use Node 10: Yes
    ✓ Do you need a database: No

After that, it will go through a deploy process. Once it's done, you can open the live app or administration dashboard by following the links provided by the App Sail CLI once the push is completed.
