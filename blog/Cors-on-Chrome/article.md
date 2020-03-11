---
date: "2020-03-24"
title: "How to run Google Chrome without CORS"
tags: ["Misc"]
banner: ""
description : "You may need to run Google Chrome with CORS checks disabled. Here's how you can do it on Windows 10."
slug: 'run-google-chrome-without-cors'
---

A few days ago I came across a problem: while developing a page I was integrating some external APIs. Those APIs were misconfigured, so running the application on localhost brought me a CORS error.

Of course, I couldn't update the configurations on API's server, so I was stuck.

Then, after some research, a colleague of mine shared an article from [alfilatov.com](https://alfilatov.com/posts/run-chrome-without-cors/) where the author suggests a way to open Google Chrome washout CORS.

You can create a shortcut, as explained in his article. Otherwise, if running Windows 10, you can open a console and run

```bash
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

This command opens a new Google Chrome window and allows you to continue with your development.

![Google Chrome without CORS](https://res.cloudinary.com/bellons/image/upload/Code4IT/Chrome%20without%20CORS/google-chrome-no-cors.png)

As you can see, there is a warning stating that the flag `--disable-web-security` can bring security issues. You can just ignore it for local development.

Also, as you can see from the screenshot above, the bookmark bar is empty (because there is no associated user).
