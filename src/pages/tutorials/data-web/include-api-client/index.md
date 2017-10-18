---
title: "Include API Client"
description: "In this section, you'll learn how to save and get data on the web using the WeDeploy API Client."
buttonTitle: "I included the API Client"
tutorialTitle: "Getting started with WeDeploy Data on the web"
parentId: "data-web"
layout: "tutorial"
time: 30
weight: 4
---

#### Include API Client

Before we can make any requests to save or fetch data, we must connect the WeDeploy API Client.

To do this, go back to the `ui` folder and include this script link at the bottom of the `<body>` element of these files:

<ul class="checklist">
	<li><code>index.html</code></li>
	<li><code>list.html</code></li>
</ul>

```xml
<script src="https://cdn.wedeploy.com/api/@site.version.api.javascript@/wedeploy.js"></script>
```
