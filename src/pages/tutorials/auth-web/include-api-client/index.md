---
title: "Include API Client"
description: "In this section, you'll learn how to authenticate users on the web using the WeDeploy API Client."
buttonTitle: "I included the API Client"
tutorialTitle: "Getting started with WeDeploy Auth on the web"
parentId: "auth-web"
layout: "tutorial"
time: 30
weight: 4
---

#### Include API Client

Before we can make any requests to create or sign-in any users, we must connect the WeDeploy API Client.

To do this, go back to the `ui` folder and include this script link at the bottom of the `<body>` element of these files:

<ul class="checklist">
	<li><code>index.html</code></li>
	<li><code>signup.html</code></li>
	<li><code>welcome.html</code></li>
</ul>

```xml
<script src="https://cdn.wedeploy.com/api/@site.version.api.javascript@/wedeploy.js"></script>
```
