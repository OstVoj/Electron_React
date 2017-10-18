---
title: "Environment Variables"
description: "When building software, we often find ourselves with the need of having different information depending if our code is running locally or in production. Instead of having to hard-code those values, we can take advantage of environment variables."
headerTitle: "Intro"
layout: "guide"
weight: 7
---

### {$page.title}

###### {$page.description}

<article id="1">

## Introduction

Environment variables are a set of dynamic placeholders that can affect the way a certain service will behave. They are dynamic because they can change according to your needs.

A good example would be credentials for a database, where each environment has its own values. The ideal solution for handling this scenario, would be using environment variables, in order to set up different configurations for different environments using the same code.

WeDeploy can help you configure environment variables in two ways, you can either [use the Console](#2) or [use the wedeploy.json](#3) file.

</article>

<article id="2">

## Using the Console

1) Go to the specific service page.
2) Click on *"Environment"*.
3) Add your keys and values.
4) Click on *"Update Environment"*.

![Using the Console](/images/docs/intro/environment-variables.png)

This will restart your service with the new environment variables.

<aside>

###### <span class="icon-16-alert"></span> Attention

If you create or update a variable on the Console, this will not automatically reflect on `wedeploy.json`. So make sure you also update your local file if you need both environments in sync.

</aside>

</article>

<article id="3">

## Using wedeploy.json

You can also define environment variables directly on your code repository by using the `wedeploy.json` files like this:

```application/json
{
	"id": "myservice",
	"env": {
		"DATABASE_USER": "root",
		"DATABASE_PASSWORD": "test"
	}
}
```

<aside>

###### <span class="icon-16-alert"></span> Attention

All environment variables specified on `wedeploy.json` will be created or updated on the Console. If there are variables specified only on Console, they will remain the same.

</aside>

</article>

## What's next?

Some WeDeploy services have pre-defined environment variables, you can learn more about it by visiting them individually:

* [**Auth Environment Variables**](/docs/auth/environment-variables/)
* [**Email Environment Variables**](/docs/email/environment-variables/)
* [**Hosting Environment Variables**](/docs/hosting/environment-variables/)
