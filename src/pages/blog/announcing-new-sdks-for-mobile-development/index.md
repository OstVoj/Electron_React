---
title: "Announcing new SDKs for Mobile Development"
description: "Are you an Android or iOS developer? Do you need to deploy services quickly and easily to the cloud and focus on your mobile apps? Well today is a big day for you!"
date: "May 26, 2017"
author: "Jose M. Navarro"
image: "/images/blog/post-11--0.png"
layout: "blog"
---

<article>

{$page.description}

<figure>
	<img src="/images/blog/post-11--0.png" alt="New SDK's for mobile development">
</figure>

Nowadays, we live in a world full of devices. From watching movies on your Apple TV, Receiving notifications on your smart watch, or reading books on your Kindle, we rarely go anywhere without our devices. It doesn't seem to be slowing down either; more and more devices are being built and more and more services are being created for them.

> Mobile and web development just isn't enough, we are entering an age of multi-device development.

That's why WeDeploy was born with more than web development in mind. We understood that as more and more devices consumed API's, this would be the future of development.

We didn't want to just use raw HTTP requests, so we built API Clients that could be called easily and safely. You already know about our [JavaScript client](/docs/intro/api-clients/#1), but starting today, there are two new kids on the block.

**Introducing the new WeDeploy <a data-senna-off target="_blank" href="/docs/intro/api-clients/#2">iOS (Swift)</a> and <a data-senna-off target="_blank" href="/docs/intro/api-clients/#3">Android (Java)</a> SDKs.**

With them, you will be able to build apps for the following platforms:

* **Apple**: iOS (iPhone, iPad, iPod Touch), watchOS (AppleWatch), tvOS (AppleTV), macOS (CarPlay and Desktop apps).
* **Google**: Android phones and tablets, Android Wear, Android TV, Android Auto and any platform that supports Java!

<figure>
	<img src="/images/blog/post-11--1.gif" alt="Realtime communication across devices">
</figure>


#### What can I do on those mobile platforms?

Mainly, the clients provides you access to:

- **Data service**: Search inside your schema-less database or communicate in realtime with other apps, not matter the platform, using WebSockets under the hood. <br><em>↳ See <a data-senna-off target="_blank" href="/tutorials/data-ios/">iOS (Swift)</a> and <a data-senna-off target="_blank" href="/tutorials/data-android/">Android (Java)</a> tutorials.</em><br><br>
- **Auth service**: Create or authenticate users, reset passwords or sign-in using Google, Facebook or Github's OAuth2. <br><em>↳ See <a data-senna-off target="_blank" href="/tutorials/auth-ios/">iOS (Swift)</a> and <a data-senna-off target="_blank" href="/tutorials/auth-android/">Android (Java)</a> tutorials.</em><br><br>
- **Email service**: Send emails directly from your app and check their delivery status. <br><em>↳ See <a data-senna-off target="_blank" href="/tutorials/email-ios/">iOS (Swift)</a> and <a data-senna-off target="_blank" href="/tutorials/email-android/">Android (Java)</a> tutorials.</em><br><br>
- **Raw HTTP Requests**: and if you would like to build your own HTTP requests, you can using our fluent API.


#### How do I start

Just use the regular package managers for each platform.

```Podfile
target 'MyApp' do
  use_frameworks!

  ... rest of your dependencies ...
  pod 'WeDeploy'
end
```
```build.gradle
dependencies {
	... rest of your dependencies ...
    compile 'com.wedeploy:com.wedeploy.android:@site.version.api.android@'
}
```

#### It's that easy!

So, the only thing left to do is to go to the [documentation](/docs/) and start deploying your mobile apps!

Don't forget to let us know how it goes! You can connect with us on [Twitter](https://twitter.com/wedeploy) or join our community on [Slack](https://chat.wedeploy.com).

</article>
