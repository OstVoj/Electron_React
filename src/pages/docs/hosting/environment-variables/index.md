---
title: "Environment Variables"
description: "Use environment variables to control your app."
headerTitle: "Hosting"
layout: "guide"
weight: 3
---

### {$page.title}

###### {$page.description}

<aside>

If you are unfamiliar with how you can apply this concept, please visit our main [Environment Variables](/docs/intro/environment-variables/) page.

</aside>

<article id="1">

## Reference

Here's a list of all the environment variables you can use with this service.

<div class="table-container">

| Key | Default Value | Description |
| - | - | - |
| WEDEPLOY_WEB_PATH | `/` | Path to serve static files |
| WEDEPLOY_WEB_ERROR_PATH | `/_error` | Path to serve [error pages](/docs/hosting/custom-error-pages/) |

</div>

**Usage:**

Here are the environment variables in action within a `wedeploy.json`.

```application/json
{
	"id": "myservice",
	"image": "wedeploy/hosting:@site.version.image.hosting@",
	"env": {
		"WEDEPLOY_WEB_PATH": "dist",
		"WEDEPLOY_WEB_ERROR_PATH": "myerrors",
	}
}
```


<aside>

###### <span class="icon-16-alert"></span> Attention

The folder specified in `WEDEPLOY_WEB_PATH` will be resolved relative to the folder where the `wedeploy.json` is located. In the example below, if `WEDEPLOY_WEB_PATH` is specified as `dist/`, then the `dist` folder must be next to `wedeploy.json`.

```
myapp
  ├── wedeploy.json
  ├── dist
  └── src
```

</aside>

</article>
