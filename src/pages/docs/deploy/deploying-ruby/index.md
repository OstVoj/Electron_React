---
title: "Deploying Ruby"
description: "Launch a Ruby application in few seconds."
headerTitle: "Deploy"
layout: "guide"
weight: 4
---

### Ruby

###### {$page.description}

<article id="1">

## Introduction

[Ruby](https://www.ruby-lang.org) is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

</article>

<article id="2">

## Try it yourself

Want to see the process of deploying Ruby step by step?

<div class="guide-btn-cta">
	<a class="btn btn-accent btn-sm" href="/tutorials/ruby/" target="_blank" data-senna-off>
		<span class="icon-16-external"></span>Try the tutorial
	</a>
</div>

<div class="guide-aux-cta">
	or see a <a href="https://github.com/wedeploy/boilerplate-ruby" target="_blank" data-senna-off>source code demo</a>.
</div>

</article>

<article id="3">

## Configuring

<aside>

All WeDeploy projects use similar configuration files to prepare your projects for deployment. Learn more on our page about <strong><a href="/docs/deploy/getting-started/">Getting Started with Deploying</a></strong>.

</aside>

Below is an example of a `wedeploy.json` for a Ruby container. The `id` for your services are uniquely determined by you.

```application/json
{
	"id": "myservice"
}
```

You need to place a `wedeploy.json` wherever you have a `Gemfile`. If you were deploying a Ruby application, this is what your project could look like:

```xml
myservice
├── Gemfile
└── wedeploy.json
```

</article>

## What's next?

Now you can start building your ruby based application.
