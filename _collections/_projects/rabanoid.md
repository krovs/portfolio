---
layout: post
title:  "🚆 Rabanoid"
subtitle: "Check the transport schedule for Rabanales (Córdoba)"
date: 2016-01-28
link: "https://github.com/krovs/rabanoid"
---

**Rabanoid** is a simple app for checking the available transport schedule for the campus of Rabanales (Córdoba, Spain) in a quick and easy way.
I know that there are apps that can do this already, but they are not as simple, quick, or material as I wanted.

![Rabanoid screenshot](/assets/images/dev/raba1.png)

The schedule data is stored in a `MySQL` database on shared hosting (`http://feluran.com/rabapi`), and the data is exposed by a [`Silex`](http://silex.sensiolabs.org/) API I made. Then, the `JSON` data is retrieved by [`Volley`](http://developer.android.com/intl/es/training/volley/index.html).
I also put a banner ad at the bottom for science.
