# Getting Started #

This will guide through the steps to install the mako cli and pushing this repo to a new app

## Installing Mako ##

To install the mako cli run:

    sudo sh <<(curl -s https://mako.nyc3.digitaloceanspaces.com/install)

## Deploying App ##

    mako push

It will ask for an auth key if you haven't used mako before. Retrieve it from [the auth page](https://mako.digitalocean.com/auth).

Then it will ask how to configure the app.
Answer the questions as follows:

    ✓ Choose your configuration preference: Automatic...
    ✓ Node app detected, is this correct: Yes
    ✓ Use Node 10: Yes
    ✓ Do you need a database: No

After that, it will go through a deploy process.
