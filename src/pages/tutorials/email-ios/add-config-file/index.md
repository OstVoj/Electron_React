---
title: "Add Config File"
description: "In this section, you'll learn how to send an email on iOS using the WeDeploy API Client."
buttonTitle: "I added the config file"
tutorialTitle: "Getting started with WeDeploy Email on iOS"
parentId: "email-ios"
layout: "tutorial"
time: 60
weight: 3
---

#### Add Config File

Every service folder must have a `wedeploy.json` file that configures it, so let's add a file inside the sample project you just downloaded.

1. Open the `tutorial-email-ios` folder in a code editor.
2. Create a new file inside of the `email` folder and name it `wedeploy.json`.
3. Inside of that file, paste this code.

```application/json
{
	"id": "msgs",
	"image": "wedeploy/email:@site.version.image.email@"
}
```

<aside>

###### <span class="icon-16-star"></span> Pro Tip

Another thing you can do in your `wedeploy.json` file is add environment variables. There are many ways to use these, one example is to change to a unique email provider.

```application/json
{
	"id": "msgs",
	"image": "wedeploy/email:@site.version.image.email@",
	"env" {
		"EMAIL_HOST": "host294.mailrave.com"
	}
}
```

See the full list of <a href="/docs/email/environment-variables/" target="_blank">Environment Variables for Email</a>.

</aside>
