---
layout: writeup
title: Micro-CMS v2
date: 09-06-2020
difficulty: Moderate (3/flag)
skills: Web
progress: 3/3
type: H1CTF
---


## Hints

### Flag0

- Regular users can only see public pages
- Getting admin access might require a more perfect union
- Knowing the password is cool, but there are other approaches that might be easier

### Flag1

- What actions could you perform as a regular user on the last level, which you can't now?
- Just because request fails with one method doesn't mean it will fail with a different method
- Different requests often have different required authorization

### Flag2

- Credentials are secret, flags are secret. Coincidence?

------

![image-20200607133313939](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607133313939.png)

As we can see at page 1, this is an upgraded version of the previous flags now with user authentication.

![image-20200607133503423](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607133503423.png)

## Flag0

![image-20200607133548605](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607133548605.png)

We have to be logged in for us to be able to edit the post. 

First, we can try to log in using admin/admin, just in case...but no luck.

But, could this form be injectable? Trying with a '  in the username field returns an error:

![image-20200607171928045](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607171928045.png)

This is vulnerable to SQLi and not only that, we now know the name of the table, admins.

Using Burpsuite I tried to get the password.

So, if we look at the error, the query is trying to get a password given a username, so let's give it one of our choice.

```
username='UNION SELECT 'password' AS password FROM admins WHERE '1'='1&password=password
```

![image-20200607173910257](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607173910257.png)

Now, we can see a new page 'Private Page' back in the post list.

![image-20200607174650538](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607174650538.png)

An iside, the flag!

![image-20200607174725996](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607174725996.png)



## Flag1

For this one, a hint is telling us to notice a method we can't perform now but we could in version 1. This has to be POST.

First, with the OPTIONS method we can see if the response specifies the available methods to confirm POST.

![image-20200607175521292](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607175521292.png)

And we see HEAD, GET, POST and OPTIONS

And requesting a POST...

![image-20200607175638313](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607175638313.png)



## Flag2

For this flag, we have two routes, SQLi and brute force with Burpsuite. I chose the second one.

First, we have to guess the password with  the Burp Intruder using 

```
' OR password like '%x'# as username
```

**x** is gonna change from **a** to **z** and only one is gonna be correct, we are gonna know it because of the *Invalid Password* message in the response. 

Every time we get *Invalid Password* instead of *Unknown User*, we get another letter and move the **x** to the left.

![image-20200607190140002](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607190140002.png)

![image-20200607190235586](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607190235586.png)

![image-20200607190658229](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607190658229.png)

```
'%x'

'%xo'

'%xdo'

'%xndo'

'%xendo'

'%xsendo'

'%xosendo'
```

We got it, the password, in my case, is **rosendo**.

Lastly, we need the username by using:

```
' OR password = 'password'#
```

as username, and rosendo as password and we get the last flag!

![image-20200607191546311](/assets/images/h1ctf/micro-cms_v2.assets/image-20200607191546311.png)