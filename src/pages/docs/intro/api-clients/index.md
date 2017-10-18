---
title: "API Clients"
description: "Make requests to WeDeploy using a standardized interface."
headerTitle: "Intro"
layout: "guide"
weight: 5
---

### {$page.title}

###### {$page.description}

<article id="1">

## Introduction

You can use our API Clients for sending/receiving requests to/from WeDeploy services like [Auth](/docs/auth/getting-started/), [Email](/docs/email/getting-started/), and [Hosting](/docs/hosting/getting-started/). We built those libraries to make your life easier and adapt to your current workflow.

Below you can find a list that contains all of them, including instructions on how to install and details for each specific platform.

</article>

<article id="2">

## JavaScript (Web & Node.js)

You can use this by adding a script element in your HTML file or to load the library using NPM.

##### Installation

**CDN**

```xml
<script src="https://cdn.wedeploy.com/api/@site.version.api.javascript@/wedeploy.js"></script>
```

**NPM**

```
npm install --save wedeploy
```

##### Nuances

After installing WeDeploy using NPM, you can load this package like this:

```javascript
var WeDeploy = require('wedeploy');

// Or if you're using ES6
import WeDeploy from 'wedeploy';
```

This library is compatible with all major browsers (Chrome, Firefox, Safari, Edge, and IE10+) as well as [React Native](https://facebook.github.io/react-native/) and [React VR](https://facebook.github.io/react-vr/).

The API calls are the same in all JavaScript environments.

</article>

<article id="3">

## Swift (iOS)

In order to start using you have to add it as Cocoapod in your `Podfile`.

##### Installation

**Cocoapods**

```swift
pod 'WeDeploy'
```

##### Nuances

By default, all requests returns a promise like below.

```swift
WeDeploy
	.data("https://<serviceID>-<projectID>.wedeploy.io")
	.get(resourcePath: "movies")
	.then { movie -> Void in
		print(movie)
	}
```

You are also able to return a callback or observable. These two methods are available:

```swift
// toCallback converts a promise into a callback
WeDeploy
	.data("https://<serviceID>-<projectID>.wedeploy.io")
	.get(resourcePath: "movies")
	.toCallback { movies, error in
		// here you can check the error or the response
	}

// toObservable converts a promise into an observable
WeDeploy
	.data("https://<serviceID>-<projectID>.wedeploy.io")
	.get(resourcePath: "movies")
	.toObservable()
	.subscribe(
		onNext: { movies in
			// here you receive the movies
		},
		onError: { error in
			// oops something went wrong
		}
	)
```

</article>

<article id="4">

## Java (Android)

You just need to add the following line to your `build.gradle` file.

##### Installation

**Gradle**

```groovy
compile 'com.wedeploy:com.wedeploy.android:@site.version.api.android@'
```

##### Nuances

Before calling any method from WeDeploy, you have to build an instance first:

```text/x-java
WeDeploy weDeploy = new WeDeploy.Builder().build();
```

Then, you are able to synchronously fire requests to WeDeploy by calling `execute()`:

```text/x-java
weDeploy
	.data("https://data-datademo.wedeploy.io")
	.get("movies")
	.execute();
```

You can also fire asynchronous requests by specifying a Callback to the `execute()` method:

```text/x-java
weDeploy
	.data("https://data-datademo.wedeploy.io")
	.get("movies")
	.execute(new Callback() {
		public void onSuccess(Response response) {
			// here you receive the movies
		}

		public void onFailure(Exception e) {
			// oops something went wrong
		}
	});
```

The WeDeploy Android API is RxJava 2 compatible. This means that you can convert the request into a Single RxJava object, which emits either a success or an error event. You must add a dependency to RxAndroid in your project `build.gradle` in order to use it.

```text/x-java
weDeploy
	.data("https://data-datademo.wedeploy.io")
	.get("movies")
	.asSingle()
	.subscribeOn(Schedulers.io())
	.observeOn(AndroidSchedulers.mainThread())
	.subscribe(
		response -> {

		},
		throwable -> {

		});
```

</article>

## What's next?

* Learn more about using [Custom Domains](/docs/intro/custom-domains/).
