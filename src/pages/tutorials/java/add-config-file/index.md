---
title: "Add Config File"
description: "In this section, you'll learn how to deploy an application using Java."
buttonTitle: "I created the wedeploy.json"
tutorialTitle: "Getting started with Java"
parentId: "java"
layout: "tutorial"
time: 40
weight: 3
---

#### Add Config File

Every service folder must have a `wedeploy.json` file that configures it, so let's add one file inside the sample project you just downloaded.

1. Open the `tutorial-java` folder in a code editor
2. Create a new file named `wedeploy.json`.
3. In that file, paste this code:

```application/json
{
	"id": "app",
	"memory": 2048
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
