---
title: "Migrating to Beta"
description: "We have made some fundamental changes to the way you setup your project source code and simplified the way you deploy your apps. Walk through these easy steps and your project will be ready for deployment."
headerTitle: "Deploying"
layout: "guide"
weight: 8
---

### {$page.title}

###### {$page.description}

![beta migration](/images/docs/deploy/migration--beta-migration.png)

## Introduction

On August 4th, we announced [our new Beta version of WeDeploy](/blog/wedeploy-beta-our-biggest-release-yet/). With that release we launched the new infrastructure that can be accessed by our [Console](https://console.wedeploy.com).

Along with that big infrastructure change, we also introduced other things like custom Docker images and HTTPS, which lead to a big question that you might be asking yourself: "will the projects I built on Alpha work on Beta?" The answer is "yes", but there are a few easy changes that need to be made to your projects first. Below is a guide on how to seamlessly do that!

If you have any trouble, don't hesitate to <a href="javascript:Intercom('show');">reach out to a WeDeploy human</a>, we'd love to help.

<aside>

###### <span class="icon-16-alert"></span> Attention

All Alpha projects, including the previous Dashboard, will be unavailable on **September 4th**. Make sure to migrate your projects to Beta before then.

</aside>

<article id="1">

## Configuration files

1. Delete you _project.json_. We no longer support this file.

2. Rename all _container.json_ files to _wedeploy.json_.

3. In the _wedeploy.json_, change _type_ to _image_ and add the _0.0.1_ tag.

![wedeploy.json](/images/docs/deploy/migration--wedeploy-json.png)

</article>

<article id="2">

## Java, Node.js, and Ruby

We no longer support the **Node.js**, **Java**, and **Ruby** WeDeploy images. Instead, we are releasing something called [Automatic Code Detection](/docs/deploy/gettings-started/#3).

Basically, we'll try to determine what language your project uses, so you can push any project using Node.js, Java, and Ruby, and we will build it from there.

For example, if we find a `package.json`, we'll build that as a Node.js service. In order to make sure we know where you want us to scan, we require that you place a `wedeploy.json` inside the folder of every service you want to deploy and simply declare an ID inside.

```application/json
{
	"id": "myservice"
}
```

</article>

<article id="3">

## Liferay

We also no longer support the Liferay Portal CE (Community Edition) WeDeploy image. In order to deploy Liferay Portal CE, you must do it with a _Dockerfile_ using the [liferay/portal image](https://hub.docker.com/r/liferay/portal/).

Or you can try [Liferay DXP](/docs/deploy/deploying-liferay-dxp/) which is a new service we provide. We will give you a free 15 day trial period before you must apply a license.

Here is an example of the `wedeploy.json` that you could use to deploy a Liferay DXP instance.

```application/json
{
	"id": "myservice",
	"image": "wedeploy/liferay:@site.version.image.liferay@",
	"volume": "/opt/liferay",
	"memory": 4096,
	"cpu": 3
}
```

</article>

<article id="4">

## API client

**JavaScript CDN Links**

1. Update your JavaScript CDN API links to _https_.

2. Update the version to _2.3.1_

	![CDN HTTPS](/images/docs/deploy/migration--cdn-https.png)

**API Endpoints**

1. Remove hardcoded protocols (_http://_) on API URL's.

	![API URL HTTP](/images/docs/deploy/migration--api-url-http.png)

2. Each service now has its own domain instead of being a subdomain of your project. This means you must update your API endpoints (_serviceID-projectID.wedeploy.io_).

3. Because of this domain change, we now no longer allow dashes in the project IDs.

	![API URL Service](/images/docs/deploy/migration--api-url-service.png)

</article>

<article id="5">

## Data

**Migrating Database**

If you want to migrate your data collections, you can do this manually by sending GET requests from Alpha and POST requests to Beta. If you are not familiar with that process, feel free to <a href="javascript:Intercom('show');">reach out to us</a> and we can migrate them over for you.

</article>

<article id="6">

## Auth

**OAuth Redirect**

Since your new app will have a new URL, you must update your Auth redirect URL's for your registered apps if you use OAuth providers like Google, Facebook, or Github.

**Migrating Userbase**

There is no way to manually migrate your previous users. To do so, <a href="javascript:Intercom('show');">reach out to us</a> and we can help you migrate your userbase.

</article>

<article id="7">

## Email

We made some syntax updates on the Email Javascript API to make it even more intuitive.

1. Instead of declaring your email endpoint with _.url()_, you now use _.email()_.
2. You now no longer need to add _/emails_ to the end of your URL.
3. You must add an _.auth('masterToken or userCredentials')_ after the URL.

**Sending email**

1. Change syntax from _.form('from', 'to@mail.com')_ to _.from('to@mail.com')_ for all email variables.
2. Change _.post()_ to _.send()_.

![Send Email](/images/docs/deploy/migration--send-email.png)

**Checking status**

1. Instead of including the _ID_ of the email in the URL, add it like this _.status('00000000')_
2. You no longer need to use _.get_ because the _.status_ will make the request.

![Check Status](/images/docs/deploy/migration--check-email-status.png)

</article>

<article id="8">

## Deployment

Before you had two ways of deploying code, you could either connect with GitHub or create a remote pointing to our Git server. We noticed that people loved the convenience of integrating with GitHub so [we're keeping that](/docs/deploy/continuous-deployment/), but when using our Git server the experience was not as fluid, specially the authentication step on every push.

There are now two ways to deploy your project: _[Instant Deployment](/docs/deploy/getting-started/)_ and _[Continuous Deployment](/docs/deploy/constant-deployment/)_.

This means we no longer allow deployments with our Git server.

</article>

<article id="9">

## Custom domains

Because we have removed the Home Service functionality, and consequently the project URL (_myapp.wedeploy.io_), you are now only able to set custom domains on the service level.

![Custom Domains](/images/docs/deploy/migration--custom-domains.png)

We have also created [a new way to add Custom Domains](/docs/intro/custom-domains/#2). You can now configure your root domain with our regional nameservers.

</article>

<article id="10">

## Local Development

In order to focus our efforts towards a seamless cloud-based experience, we are currently not supporting local development in Beta.

</article>

## What's Next?

You're all set! Start having fun deploying projects on [WeDeploy Beta](https://console.wedeploy.com) and let us know if we can help you in any way.
