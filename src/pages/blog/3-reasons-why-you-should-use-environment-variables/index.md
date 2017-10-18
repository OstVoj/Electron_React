---
title: "3 Reasons Why You Should Use Environment Variables"
description: "There are some really big things coming down the pipe with our Beta release right around the corner, but we just couldn't wait to tell you about something we are really excited about: Environment Variables."
date: "March 29, 2017"
author: "Jonni Lundy"
image: "/images/blog/post-7--0.gif"
layout: "blog"
---

<article>

There are some really big things coming down the pipe with our Beta release right around the corner, but we just couldn't wait to tell you about something we are really excited about: **[Environment Variables](/docs/intro/environment-variables/)**.

Environments have been around for a while, mainly hiding in the deep code forests, so we wanted to highlight them and share that we wrote some fresh documentation so you can start using them right away!

<figure>
	<img src="/images/blog/post-7--0.gif" alt="Adding environment variables">
</figure>

_Here are a couple easy ways they can improve your app!_
​
#### 🚀 Change Hosting serve directory
By default, WeDeploy Hosting looks to your service's root directory to know what files to serve, but what if you are using a Gulp or Grunt build task to compile your files? No problem, just add the `WEDEPLOY_WEB_PATH` key and use the build path as your value.

**See the full list at our [Hosting Environment Variable Docs](/docs/hosting/environment-variables/)**.

#### 🔐 Integrate OAuth into your app
Want your users to log in with Facebook, Google, or Github accounts? Perfect, because that is super easy to do with WeDeploy Auth. Start by just adding a few environment variables for each provider.

**See the full list at our [Auth Environment Variable Docs](/docs/auth/environment-variables/)**.

#### 📧 Change Email provider
WeDeploy Email supplies you with an email service straight out of the box, but what if you want to use your own SMTP server? With Environment Variables, you can change the email host, username, port, and much more.

**See the full list at our [Email Environment Variable Docs](/docs/email/environment-variables/)**.

That's it! If you have any question, just [shoot us an email](mailto:team@wedeploy.com) or join the conversation on [Slack](https://chat.wedeploy.com/).

Happy coding! 💻

</article>
