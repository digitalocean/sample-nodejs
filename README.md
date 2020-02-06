# Getting Started #

This will guide through the steps to install the App Sail CLI (command line interface) and push this repo to a new, live app

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

	✓ Who does this app belong to: <choose your personal account or team>
	✓ What should this app be called: sample-nodejs
	Let's configure your app for deployment:
	✓ Choose your configuration preference: Automatic...
	✓ Node app detected, is this correct: Yes
	✓ Use Node 10: Yes
	✓ Do you need a database: No

After that, it will go through a deploy process. Once it's done, you can open the live app or administration dashboard by following the links provided by the App Sail CLI once the push is completed.

## Viewing Application Logs ##

You can view your application's logs by following these steps:
1. Visit the app dashboard at https://cloud.digitalocean.com/appsail
1. Navigate to the sample-nodejs app
1. Click "Logs"

Alternatively, from your terminal while inside your top level application directory (e.g. sample-nodejs), run:

	sail logs --recent
	
Or to see a live stream of your logs, run:

	sail logs

Then visit your live app in your browser to generate some log output (which you'll see in your terminal). Use ctrl-c to stop viewing your log stream in your terminal.
	
To learn more about this command, run `sail logs -h`


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

Save your changes locally, make sure you're in the top level directory of your app (e.g. sample-nodejs) and run:

	sail push
	
This push should go faster than the initial one. The old version of your application will remain live during this push, and as soon as this push is complete, your live app url will point to the new version of your application. Reload your live app in your browser, and you should now see red text.  

## Forking the Sample App

It's great to see that change live on the web. But we usually want to save our code changes someplace safer than our local computer. Let's make our own copy (fork) of this sample app into our own Github account. If you don't already have one, you'll need to sign up for a free Github account. After than, follow these steps to fork this sample app:
1. Visit https://github.com/digitalocean-appsail/sample-nodejs
1. In the upper-right hand corner, click the "Fork" button
1. Login if needed, and choose your appropriate Github account
1. After a minute, the copy will finish and you'll see your very own copy of sample-nodejs in your Github account

Now let's work against our own copy of this repository:
1. On your local machine, delete the sample-nodejs directory and all of its contents. This means we'll loose our red body text color, but that's ok for this example.
1. In your browser, visit the new repository you just created in Github (e.g. <yourusername>/sample-nodejs)
1. Click the "Clone or Download" button and copy the remote URL. [Github documentation](https://help.github.com/en/github/using-git/which-remote-url-should-i-use) describes which remote URL you should use.

In your terminal:

	git clone https://github.com/<yourusername>/sample-nodejs.git
	cd sample-nodejs
	sail push
	
Now when you visit your live app URL you'll see black body text since we deleted the app directory we cloned from digitalocean-appsail/sample-nodejs and started from scratch with our fork.

## Automatically Deploying your App with Every Code Push

Oftentimes it's most convenient to deploy your app live with every code push to Github. App Sail makes it easy to use [Github Actions](https://help.github.com/en/actions) to do just that. Follow these steps to configure Github Actions to auto-deploy your app every time you `git push origin master`:

	sail init pipeline
	
And answer the guided questions:

	✓ Would you like to use GitHub Actions: Yes
	✓ Deploy from the master branch: Yes
	
Now follow the instructions in the terminal output to add your APPSAIL_TOKEN as a secret to your repository.

Following these steps has generated several configuration files that will cause Github Actions to automatically run the equivalent of a `sail push` build every time we push code to the master branch of our repository. The nice thing is that these builds will run on Github's build servers without relying at all on our local development machine. As a final step to get these Actions to work, we must commit and push these new configuration files to our repo:

	git add .github
	git add .sail
	git commit -m "App Sail Github Actions"
	git push origin master
	
With this and every subsequent push to master, our app will be deployed. To watch the action run, visit `https://github.com/<yourusername>/sample-nodejs/actions`. And once that action completes, you can visit your live app URL to see the newly deployed (but unchanged) app.

Let's modify our app one more time and push the change to Github to see Actions at work. Edit public/stylesheets/style.css so it now looks like this:

```
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

h1 {
  text-transform: uppercase;
}

a {
  color: #00B7FF;
}
```

Save your changes and run the following commands:

	git add public/stylesheets/style.css
	git commit -m "Uppercase h1"
	git push origin master
	
Now, if we visit `https://github.com/<yourusername>/sample-nodejs/actions` again we'll see that a new deploy has started. Once it finishes, we can bring up our live app URL in the browser and see our all-caps page heading.
	


## Deleting the App #

When you no longer need this sample application running live, you can delete it by following these steps:
1. Visit the app dashboard at https://cloud.digitalocean.com/appsail
1. Navigate to the sample-nodejs app
1. Choose "App Config"->"Show More"
1. Select "Delete", type your app's name, and click "Delete App".

This will delete the app and destroy any underlying DigitalOcean Droplets. 

**Note: If you don't delete your app, charges for the use of DigitalOcean Droplets will continue to accrue. Also, even if you delete your app, a new push to your sample-nodejs repo on Github will trigger a new deploy which will result in DigitalOcean charges.**

