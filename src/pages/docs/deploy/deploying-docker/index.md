---
title: "Deploying Docker"
description: "Launch a Docker application in few seconds."
headerTitle: "Deploy"
layout: "guide"
weight: 7
---

### Docker

###### {$page.description}

<article id="1">

## Introduction

[Docker](https://www.docker.com) is the world’s leading software container platform. Developers use Docker to eliminate “works on my machine” problems when collaborating on code with co-workers. Enterprises use Docker to build agile software and ship new features faster.

</article>

<article id="2">

## Try it yourself

Want to see the process of deploying Docker step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/docker/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/demo-wordpress" target="_blank" data-senna-off>source code demo</a>.
</div>

</article>

<article id="3">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an example of a `wedeploy.json` for a Docker container. The `id` for your services are uniquely determined by you.

```application/json
{
	"id": "myservice"
}
```

You need to place a `wedeploy.json` wherever you have a `Dockerfile`. If you were deploying a Wordpress site using Docker images for Wordpress and a MySQL database, this is what your project could look like:

```xml
myservice
├── db
│   ├── Dockerfile
│   └── wedeploy.json
└── wp
    ├── Dockerfile
    └── wedeploy.json
```

</article>

## What's next?

Now you can start building your docker based application.
