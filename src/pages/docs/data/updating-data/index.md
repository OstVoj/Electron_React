---
title: "Updating Data"
description: "Update an existing record in the database with certain attributes."
headerTitle: "Data"
layout: "guide"
weight: 7
---

### {$page.title}

###### {$page.description}

<aside>

If you are unfamiliar with our API, please visit the [API Clients](/docs/intro/api-clients/) page first to learn how to install and configure it.

</aside>

<article id="1">

## Updating existing data

Updating existing data is as simple as sending a JSON.

```javascript
WeDeploy
	.data('https://<serviceID>-<projectID>.wedeploy.io')
	.update('movies/115992383516607958', {
		"rating": 9.1
	}).then(function(movie) {
		console.log(movie);
	});
```
```swift
WeDeploy
	.data('https://<serviceID>-<projectID>.wedeploy.io')
	.update(resourcePath: "movies/115992383516607958", updatedAttributes: [
		"rating": 9.1
	])
	.then { movie in
		print(movie)
	}
```
```text/x-java
JSONObject movieJsonObject = new JSONObject()
	.put("rating", 9.1);

WeDeploy
	.data('https://data-datademo.wedeploy.io')
	.update("movies/115992383516607958", movieJsonObject)
	.execute();
```

This operation will return the updated document with the new rating:

```javascript
{
	"id":" 115992383516607958",
	"title": "Star Wars IV",
	"year": 1977,
	"rating": 9.1
}
```

</article>

## What's next?

Now that you've learned how to update, you can start [deleting data](/docs/data/deleting-data/).
