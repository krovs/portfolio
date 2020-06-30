---
layout: writeup
title: Micro-CMS v1
date: 08-06-2020
difficulty: Easy (2/flag)
skills: Web
progress: 4/4
type: H1CTF
---


## Hints

### Flag0

- Try creating a new page
- How are pages indexed?
- Look at the sequence of IDs
- If the front door doesn't open, try the window
- In what ways can you retrieve page contents?

### Flag1

- Make sure you tamper with every input
- Have you tested for the usual culprits?  XSS, SQL injection, path injection
- Bugs often occur when an input should always be one type and turns out to be another
- Remember, form submissions aren't the only inputs that come from browsers

### Flag2

- Sometimes a given input will affect more than one page
- The bug you are looking for doesn't exist in the most obvious place this input is shown

### Flag3

* Script tags are great, but what other options do you have?

------

## Flag1

![image-20200607123544950](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607123544950.png)

We land on a little CMS where we can see, edit or create posts.

Let's edit the first one and check for some XSS.

![image-20200607124311814](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607124311814.png)

![image-20200607124335570](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607124335570.png)

The form is updated but we don't get any alert, let's see in the main page.

Ok, the page shows two alerts, a flag and the  title form.

![image-20200607124457139](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607124457139.png)



## Flag2

Same thing with the second post

![image-20200607131737114](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607131737114.png)

This time we have a button, so we can check for XSS on the onclick event.

![image-20200607131954867](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607131954867.png)

We test the button and the alert is shown

![image-20200607132102331](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607132102331.png)

But loading the main page doesn't give us much...

Wait, if we go back and look at the source code, now the button has a flag parameter with the flag inside!

![image-20200607132617764](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607132617764.png)



## Flag3

Let's check in the edit page for SQLi trying with a quote in the url.

![image-20200607125736903](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607125736903.png)

There we have another flag!

I tried to exploit that a little more but I didn't get anything...



## Flag0

The only thing left to try is to create a new post.

After that, we can see at the main page the new post with its new id...9, so there has to be something in the middle.

If we try to visit the post, we get a 404 but for the 5, which is forbidden. We can't see it but, can we edit it?

![image-20200607133055541](/assets/images/h1ctf/micro-cms_v1.assets/image-20200607133055541.png)