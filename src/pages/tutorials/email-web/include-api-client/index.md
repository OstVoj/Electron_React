---
title: "Include API Client"
description: "In this section, you'll learn how to send an email on the web using the WeDeploy API Client."
buttonTitle: "I included the API Client"
tutorialTitle: "Getting started with WeDeploy Email on the web"
parentId: "email-web"
layout: "tutorial"
time: 30
weight: 4
---

#### Include API Client

Before we can make any requests to send an email, we must connect the WeDeploy API Client.

To do this, go to `index.html` in that `ui` directory and include this script link at the bottom of the `<body>` element:

```xml
<script src="https://cdn.wedeploy.com/api/@site.version.api.javascript@/wedeploy.js"></script>
```
