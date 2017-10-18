---
title: "Deleting Data"
description: "Destroy an existing field, document or collection in the database."
headerTitle: "Data"
layout: "guide"
weight: 8
---

### {$page.title}

###### {$page.description}

<aside>

If you are unfamiliar with our API, please visit the [API Clients](/docs/intro/api-clients/) page first to learn how to install and configure it.

</aside>

<article id="1">

## Deleting existing data

To delete a field or an entire collection, we use the delete method:

```javascript
var data = WeDeploy.data('https://<serviceID>-<projectID>.wedeploy.io');

data.delete('movies/star_wars_v/title');

data.delete('movies/star_wars_v');

data.delete('movies');
```
```swift
let data = WeDeploy.data('https://<serviceID>-<projectID>.wedeploy.io')

data.delete(collectionOrResourcePath: "movies/star_wars_v/title")

data.delete(collectionOrResourcePath: "movies/star_wars_v")

data.delete(collectionOrResourcePath: "movies")
```
```text/x-java
WeDeployData data = WeDeploy.data('https://data-datademo.wedeploy.io');

data.delete("movies/star_wars_v/title");

data.delete("movies/star_wars_v");

data.delete("movies");
```

</article>
