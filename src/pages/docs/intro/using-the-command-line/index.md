---
title: "Using the Command-line"
description: "The WeDeploy Command-Line Interface is a tool for helping you to use the WeDeploy platform by providing support for things like creating, managing, and scaling applications."
headerTitle: "Intro"
layout: "guide"
weight: 4
---

### Using the CLI

###### {$page.description}

<article id="1">

## Install

If you use a Unix-like system such as macOS or Linux, open your terminal and run:

```xml
curl https://cdn.wedeploy.com/cli/latest/wedeploy.sh -sL | bash
```

If you use Windows, check the [Windows amd64 installer](https://bin.equinox.io/c/8WGbGy94JXa/cli-stable-windows-amd64.msi). For other systems, see a list of [all builds available](https://dl.equinox.io/wedeploy/cli/stable).

</article>

<article id="2">

## Login to your account

There are two ways you can authenticate, the first option will open up your browser and authenticate you from there:

```xml
we login
```

If you already have an account, it will redirect you to a success page. If you don't have an account yet, you must sign up and confirm your email.

The second option only works if you already have an account and requires you to manually type your email and password:

```xml
we login --no-browser
```

</article>

<article id="3">

## Logout from your account

In order to switch between different accounts, you can logout from an account by running:

```xml
we logout
```

Note: this will not logout on your browser, only on the terminal.

</article>

<article id="4">

## Deploy projects or services

To deploy a folder using a random project ID, type:

```xml
we deploy
```

Deploy a folder to a specific project:

```xml
we deploy --project <projectID>
```

Deploy to a specific service inside of a project:

```xml
we deploy --project <projectID> --service <serviceID>
```

Alternatively, you can deploy to a service by passing the full URL:

```xml
we deploy --url <serviceID>-<projectID>.wedeploy.io
```

</article>

<article id="5">

## Show logs of the services

You can check the logs of an entire project:

```xml
we log --project <projectID>
```

Or you can see the logs of a specific service inside of a project:

```xml
we log --project <projectID> --service <serviceID>
```

Alternatively, you can see the logs of a service by passing the full URL:

```xml
we log --url <serviceID>-<projectID>.wedeploy.io
```

</article>

<article id="6">

## Manage custom domains

Get the list of custom domains for a particular service:

```xml
we domain --project <projectID> --service <serviceID>
```

Add a custom domain to a service:

```xml
we domain add example.com --project <projectID> --service <serviceID>
```

Remove custom domain from a service:

```xml
we domain rm example.com --project <projectID> --service <serviceID>
```

Alternatively, you can run those same commands by passing the full URL:

```xml
we domain --url <serviceID>-<projectID>.wedeploy.io
```

</article>

<article id="7">

## Manage environment variables

Get the list of environment variables for a particular service:

```xml
we env --project <projectID> --service <serviceID>
```

Add an environment variable to a service:

```xml
we env set SOME_KEY somevalue --project <projectID> --service <serviceID>
```

Remove environment variable from a service:

```xml
we env rm SOME_KEY --project <projectID> --service <serviceID>
```

Alternatively, you can run those same commands by passing the full URL:

```xml
we env --url <serviceID>-<projectID>.wedeploy.io
```

</article>

<article id="8">

## List projects or services

See the full list of projects and services you own or collaborator with:

```xml
we list
```

List the services that are contained on a project:

```xml
we list --project <projectID>
```

Check a specific service inside of a project:

```xml
we list --project <projectID> --service <serviceID>
```

Alternatively, check a specific service by passing the full URL:

```xml
we list --url <serviceID>-<projectID>.wedeploy.io
```

</article>

<article id="9">

## Delete projects or services

You can delete an entire project:

```xml
we delete --project <projectID>
```

Or you can delete a specific service inside of a project:

```xml
we delete --project <projectID> --service <serviceID>
```

Alternatively, you can delete a service by passing the full URL:

```xml
we delete --url <serviceID>-<projectID>.wedeploy.io
```

</article>

<article id="10">

## Open the console

To quickly open the console in your browser, type:

```xml
we console
```

</article>

<article id="11">

## Update the CLI

In order to update the command-line to the latest version, run:

```xml
we update
```

If you're feeling adventurous, you can try the unstable version for breaking changes:

```xml
we update --channel unstable
```

</article>

## What's next?

* Learn more about using [the WeDeploy API Client](/docs/intro/api-clients/).
