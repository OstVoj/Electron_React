---
title: "Feature Overview"
description: "This is an overview of the features that make WeDeploy the easiest way to deploy and scale applications."
headerTitle: "Intro"
layout: "guide"
weight: 2
---

### {$page.title}

###### {$page.description}

<article id="1">

## Automatic code detection

WeDeploy tries to determine what language your project uses based on the file structure. We scan your directory in order to install dependencies, compile the code, and run the application.

Our automatic code detection comes with a number of pre-configured recipes for projects that contain Docker, Node.js, Ruby, or Java files.

</article>

<article id="2">

## Zero downtime deployments

Whenever a new deployment is triggered, you don't want your application to go offline until the new version is 100% ready. What you want is to minimize user interruption.

With WeDeploy you can push updates and restart your services with zero downtime.

</article>

<article id="3">

## HTTPS certificates

Every project you deploy and every service you install will automatically be given a HTTPS certificate. This means your application will safely communicate with your users without you having to configure anything.

WeDeploy also makes sure that those HTTPS certificates are valid by renewing them from time to time. That way you can always trust that your application will be secured.

</article>

<article id="4">

## High availability

WeDeploy is highly available and makes it easy for your services to be highly available too.

Mission-critical services require health monitoring, self-healing, and fault tolerance both for themselves and the platform and infrastructure they run on. WeDeploy gives you multiple layers of protection.

To achieve self-healing, WeDeploy services are monitored and restarted when they fail. Even legacy services that don’t support distribution or replication can be automatically restarted to maximize uptime and reduce service interruption.

</article>

<article id="5">

## Global DNS

We know how tedious it is to setup your domains. That's why we have a reliable and scalable DNS solution.

You can point your domains directly to our nameservers and we will automatically configure everything for you.

WeDeploy provides a DNS service across 7 different countries, including Australia, Germany, France, Netherlands, Singapore, United Kingdom, United States. Our goal is to ensure that you always have low-latency resulting in a great experience for your users and your business.

</article>

<article id="6">

## Elastic scalability

WeDeploy gives you the power to easily scale your services up and down with the turn of a dial.

You can change the number of service instances at any time and we will also autoscale the number of instances based on your site's traffic, using the WeDeploy Load Balancer.

</article>

<article id="7">

## Intuitive user interfaces

WeDeploy offers two interfaces to make it easy to monitor and manage the projects and their services.

The **[WeDeploy Console](/docs/intro/using-the-console/)** lets you monitor resource allocation, run service health checks, and more with intuitive browser-based navigation, real-time graphs, and interactive debugging tools.

The **[WeDeploy Command-line Interface (CLI)](/docs/intro/using-the-command-line/)** provides you control from the comfort of a terminal. It’s powerful, yet easily scriptable, with handy commands to interact with your projects.

</article>

## What's next?

* Learn more about using [the WeDeploy Console](/docs/intro/using-the-console/).
