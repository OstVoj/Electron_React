---
title: "Add Config File"
description: "In this section, you'll learn how to deploy an application using Liferay DXP."
buttonTitle: "I added the config files"
tutorialTitle: "Getting started with Liferay DXP"
parentId: "liferay-dxp"
layout: "tutorial"
time: 40
weight: 3
---

#### Add Config File

Every service folder must have a `wedeploy.json` file that configures it, so let's add one file inside the sample project you just downloaded.

1. Open the `tutorial-liferay-dxp` folder in a code editor
2. Create a new file named `wedeploy.json`.
3. In that file, paste this code:

```application/json
{
	"id": "app",
	"image": "wedeploy/liferay:@site.version.image.liferay@",
	"volume": "/opt/liferay",
	"memory": 4096,
	"cpu": 3
}
```

<aside>

###### <span class="icon-16-star"></span> Pro Tip

One of the awesome things you can do in your `wedeploy.json` file is add environment variables. There are many ways to use these; one example is to provide credentials for a external database.

```application/json
{
	"id": "app",
	"env": {
		"DB_USER": "us3rname",
		"DB_PASSWORD": "passw0rd",
	}
}
```

</aside>
