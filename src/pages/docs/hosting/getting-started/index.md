---
title: "Getting Started"
description: "Serve static files easily using WeDeploy Hosting."
headerTitle: "Hosting"
layout: "guide"
weight: 1
---

### Hosting

###### {$page.description}

<article id="1">

## Introduction

Our Hosting service allows you to deliver HTML, CSS, JavaScript, or any other static files using powerful static hosting. It's super fast and will save you a lot of time.

</article>

<article id="2">

## Try it yourself

Want to see the process of deploying WeDeploy Hosting step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/hosting/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/boilerplate-hosting" target="_blank" data-senna-off>source code demo</a>.
</div>

</article>

<article id="3">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an example of a `wedeploy.json` for a Hosting container.

```application/json
{
	"id": "ui",
	"image": "wedeploy/hosting:@site.version.image.hosting@"
}
```

The `id` for your services are uniquely determined by you.

</article>

## What's next?

Now you can learn more about **[custom error pages](/docs/hosting/custom-error-pages/)**.
