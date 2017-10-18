---
title: "Deploying Liferay DXP"
description: "Launch a Liferay DXP application in few seconds."
headerTitle: "Deploy"
layout: "guide"
weight: 6
---

### Liferay DXP

###### {$page.description}

<article id="1">

## Introduction

[Liferay DXP](https://www.liferay.com/digital-experience-platform) provides an architecture for companies to digitize business operations, deliver connected customer experiences, and gather actionable customer insight, with the ultimate goal of providing better customer experiences for their clients.

We give you a free 15 day trial period before you must apply a license.

</article>

<article id="2">

## Try it yourself

Want to see the process of deploying Liferay DXP step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/liferay-dxp/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/boilerplate-liferay-dxp" target="_blank" data-senna-off>source code demo</a>.
</div>

</article>

<article id="3">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an example of a `wedeploy.json` for a Liferay DXP service. The `id` for your services are uniquely determined by you.

```application/json
{
	"id": "myservice",
	"image": "wedeploy/liferay:@site.version.image.liferay@",
	"volume": "/wedeploy-container",
	"memory": 4096,
	"cpu": 3
}
```

</article>

<article id="4">

## Hot Deployment

Liferay DXP's hot deploy mechanism allows you to install themes, portlets, OSGi modules, and even a license by simply including WAR, JAR, and XML files into a `deploy` folder.

For example, if you wanted to deploy a custom JAR file, this is how your directory could look like:

```xml
myservice
├── deploy
│   └── com.liferay.wedeploy.samples.portlet-1.0.0.jar
└── wedeploy.json
```

Under the hood, those files will be copied into the `$LIFERAY_HOME/deploy` folder and automatically deployed on startup.

</article>

## What's next?

Now you can start building your Liferay DXP application.
