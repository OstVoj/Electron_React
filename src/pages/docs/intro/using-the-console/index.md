---
title: "Using the Console"
description: "In this section, you'll learn how to deploy an application using WeDeploy Console."
headerTitle: "Intro"
layout: "guide"
weight: 3
---

### {$page.title}

###### {$page.description}

<article id="1">

## Introduction

The WeDeploy Console is a home for you to create, install, manage, configure, view logs, and check the status of your projects.

To get started, you first need to create a WeDeploy account by signing up through the [Console Signup Page](https://console.wedeploy.com/signup).

When you login to the Console, you will see a list of your WeDeploy projects. If you don't have any yet, don't worry, we will go over how to change that below.

![Console](/images/docs/intro/using-the-dashboard--dashboard.png)

</article>

<article id="2">

## Create a new project

To start, you must create new project by going to the button in the top right corner named _"New Project"_. Then you can type an ID for your project. Project names are permanent and cannot be changed later.

![New Project](/images/docs/intro/using-the-dashboard--new-project.png)

Once your project is created, it will show up on your Console main page. To see the details of your project, click on the name of the project.

![Project Container List](/images/docs/intro/using-the-dashboard--project-container-list.png)

</article>

<article id="3">

## Install a service

By clicking on a project, you can start monitoring and configuring your project and its services.

In each project, you can have up to three services installed. To install a new service, click on the _"Install Service"_ button in the top right corner of your project's Console screen.

![Install Container](/images/docs/intro/using-the-dashboard--install-container.png)

##### Select a service type

You must choose the type of service you want to install.

![Select a Container Type](/images/docs/intro/using-the-dashboard--select-a-container-type.png)

##### Choose an ID

Similar to project ID's, service ID's are permanent and cannot be changed later. When you have chosen an ID, click _"Install Service"_.

![Install Container Form](/images/docs/intro/using-the-dashboard--install-container-form.png)

##### Install service

Now WeDeploy will start building and deploying your service automatically.

![Container Up and Running](/images/docs/intro/using-the-dashboard--container-up-and-running.png)

</article>

<article id="4">

## View your service live

Once your service is installed, we give you a specific URL for that service that is made up with the service and project ID's (_website-strawberry.wedeploy.io_). You can always find this URL by clicking on the service in the overview section.

![URL Generated](/images/docs/intro/using-the-dashboard--url-generated.png)

</article>

## What's next?

* Learn more about using [the WeDeploy CLI](/docs/intro/using-the-command-line/).
