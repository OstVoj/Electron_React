---
title: "Getting Started"
description: "Leverage a NoSQL database with the power of WeDeploy Data."
headerTitle: "Data"
layout: "guide"
weight: 1
---

### Data

###### {$page.description}

Our Data service enables you to store data securely to a cloud database, make complex queries instantly, and consume information in real-time.

<article id="1">

## Try it yourself

Want to see the process of deploying WeDeploy Data step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/data-web/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/boilerplate-data" target="_blank" data-senna-off>source code demo</a>.
</div>

Check also the <a href="/tutorials/data-android/" target="_blank" data-senna-off>tutorial for Android</a> and the <a href="/tutorials/data-ios/" target="_blank" data-senna-off>tutorial for iOS</a>.

</article>

<article id="2">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an example of a `wedeploy.json` for a Data container.

```application/json
{
	"id": "database",
	"image": "wedeploy/data:@site.version.image.data@"
}
```

The `id` for your services are uniquely determined by you.

</article>

## What's next?

Now you can learn more about [configuring your data service](/docs/data/configuring-data/).
