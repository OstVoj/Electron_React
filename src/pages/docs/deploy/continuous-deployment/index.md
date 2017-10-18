---
title: "Continuous Deployment"
description: "Trigger a new deployment every time you push changes to a designated branch of your GitHub repository."
headerTitle: "Deploy"
layout: "guide"
weight: 2
---

### {$page.title}

###### {$page.description}

<article id="1">

## Create a project

1. Go to the [WeDeploy Console](https://console.wedeploy.com)
2. Click on *"New Project"* in the top right corner of the screen
3. Type a desired project name and then click *"Create Project"*

![New Project](/images/docs/deploy/new-project.png)

</article>

<article id="2">

## Connect to GitHub

1. On your project, click on *"Deployment"*
2. Go to the *"GitHub"* tab
3. Click on *"Connect to Github"* (if its your first time, you will need to authenticate with GitHub)
4. Select the repository and branch that you want to deploy
5. Click on the *"Connect Repository"* button

![Connect to GitHub](/images/docs/deploy/connect-to-github.png)

This will immediately start building and deploying your application. In the end, you'll be able to see it online in any browser.

<aside>

If you don't have a project ready to deploy, you can fork this [GitHub repository](https://github.com/wedeploy/boilerplate-hosting) and connect to it.

</aside>

</article>

## What's next?

Now you're ready to connect to GitHub and deploy any kind of application. Let's start with [Deploying Node.js](/docs/deploy/deploying-nodejs/)?
