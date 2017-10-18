---
title: "Deploying Node.js"
description: "Launch a Node.js application in few seconds."
headerTitle: "Deploy"
layout: "guide"
weight: 3
---

### Node.js

###### {$page.description}

<article id="1">

## Introduction

[Node.js](https://nodejs.org) is an open-source, cross-platform runtime for developing server-side web applications using JavaScript. It has an event-driven architecture capable of asynchronous I/O.

</article>

<article id="2">

## Try it yourself

Want to see the process of deploying Node.js step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/nodejs/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/boilerplate-nodejs" target="_blank" data-senna-off>source code demo</a>.
</div>

</article>

<article id="3">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an example of a `wedeploy.json` for a Node.js container. The `id` for your services are uniquely determined by you.

```application/json
{
	"id": "myservice"
}
```

You need to place a `wedeploy.json` wherever you have a `package.json`. If you were deploying a Node.js application, this is what your project could look like:

```xml
myservice
├── index.js
├── package.json
└── wedeploy.json
```

**Ports**

By default, we watch port 80 for you Node.JS services. If you want to designate a different port (like `3000`), you must do that in the `wedeploy.json`.

```application/json
{
	"id": "myservice",
	"port": 3000
}
```

</article>

## What's next?

Now you can start building your Node.js based application.
