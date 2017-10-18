---
title: "Add Config Files"
description: "In this section, you'll learn how to deploy an application using Docker."
buttonTitle: "I added the config files"
tutorialTitle: "Getting started with Docker"
parentId: "docker"
layout: "tutorial"
time: 40
weight: 3
---

#### Add Config Files

Every service folder must have a `wedeploy.json` file that configures it, so let's add two files inside the sample project you just downloaded.

##### MySQL

1. Open the `tutorial-docker` folder in a code editor.
2. Create a new file named `wedeploy.json` inside the `db` folder.
3. In that file, paste this code:

```application/json
{
	"id": "db",
	"volume": "/var/lib/mysql",
	"env": {
		"MYSQL_ROOT_PASSWORD": "passw0rd"
	}
}
```

##### Wordpress

1. Change to the `wp` folder and create another `wedeploy.json` file
3. In that file, paste this code:

```application/json
{
	"id": "wp",
	"env": {
		"WORDPRESS_DB_HOST": "db",
		"WORDPRESS_DB_USER": "root",
		"WORDPRESS_DB_PASSWORD": "passw0rd"
	}
}
```

<aside>

###### <span class="icon-16-star"></span> Pro Tip

One of the awesome things you can do in your `wedeploy.json` file is add environment variables. There are many ways to use these; one example is create a new user and password for your MySQL database.

```application/json
{
	"id": "db",
	"env": {
		"MYSQL_USER": "admin",
		"MYSQL_PASSWORD": "mypassword123"
	}
}
```

See the full list of environment variables for <a href="https://hub.docker.com/_/mysql/" target="_blank">MySQL</a> and <a href="https://hub.docker.com/_/wordpress/" target="_blank">Wordpress</a>.

</aside>
