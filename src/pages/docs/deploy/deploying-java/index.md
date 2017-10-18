---
title: "Deploying Java"
description: "Launch a Java application in few seconds."
headerTitle: "Deploy"
layout: "guide"
weight: 5
---

### Java

###### {$page.description}

<article id="1">

## Introduction

[Java](https://www.oracle.com/java/) is a concurrent, class-based, object-oriented language expressly designed for use in the distributed environment of the web. It is normally compiled to the binary format defined in the JVM Specification.

</article>

<article id="2">

## Try it yourself

Want to see the process of deploying Java step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/java/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/boilerplate-java" target="_blank" data-senna-off>source code demo</a>.
</div>

</article>

<article id="3">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an examples of a `wedeploy.json` for the Java container. The `id` for your services are uniquely determined by you.

```application/json
{
	"id": "myservice",
	"memory": 2048
}
```

You need to place a `wedeploy.json` wherever you have a `build.gradle`. If you were deploying a to-do list application using java, this is what your project could look like:

```xml
myservice
├── build.gradle
└── wedeploy.json
```

</article>

## What's next?

Now you can start building your Java based application.
