# Getting Started #

This will guide through the steps to install the mako cli and pushing this repo to a new app

## Installing Mako ##

To install the mako cli run in your Mac terminal:

    bash <(curl -s https://mako.nyc3.digitaloceanspaces.com/install)

## Downloading the source code

To download the demo app run in your Mac terminal:

	git clone https://github.com/notxarb/nodejs-demo.git
	cd nodejs-demo

## Deploying App ##

    mako push

It will ask for an auth key if you haven't used mako before. Retrieve it from [the auth page](https://mako.digitalocean.com/auth).

Then it will ask how to configure the app.
Answer the questions as follows:

    ✓ Choose your configuration preference: Automatic...
    ✓ Node app detected, is this correct: Yes
    ✓ Use Node 10: Yes
    ✓ Do you need a database: No

After that, it will go through a deploy process. Once it's done, you can open the live app by following these steps:

	1. Go back to the auth page in your browser
	2. Click the 'Apps' link in the top left corner
	3. Select the app you just deployed
	4. Click the 'Live App' button in the top right part of the screen
