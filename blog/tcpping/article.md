---
date: "2019-12-13"
title: "How to ping from an Azure App service with TCPPING"
tags: ['Azure']
banner: "https://res.cloudinary.com/bellons/image/upload/{format}/Code4IT/Covers/tcpping.jpg"
description: "Maybe you are used to ping a service to check whether it responds or not. It works well using a local console, but within the Azure portal you must use another command: tcpping."
slug: "tcpping-azure-portal"
---

Probably you already know what __ping__ is: it is a command that you can run on your terminal to see if a host is up and running. 
 

It works by sending some packets to the host and waiting for a response, and it measures the round-trip time that the message takes to go to the host and come back to the client.

![A round trip example](https://media.giphy.com/media/g8A6kKFew4w0w/giphy.gif)

An example can be 

```
ping code4it.wordpress.com
```

that can return something like


```
Pinging lb.wordpress.com [192.0.78.13] with 32 bytes of data:

Reply from 192.0.78.13: bytes=32 time=2ms TTL=58

Reply from 192.0.78.13: bytes=32 time=3ms TTL=58

Reply from 192.0.78.13: bytes=32 time=3ms TTL=58

Reply from 192.0.78.13: bytes=32 time=3ms TTL=58

Ping statistics for 192.0.78.13:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),

Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 3ms, Average = 2ms
```


__PSSS! Remember not to use HTTPS!!__

## ICMP

More in detail, it sends an ICMP echo request to a specified interface and waits for a reply.

Just as a reminder, [ICMP (_Internet Control Message Protocol_)](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol) is a network protocol that is at the same level as TCP and UDP on the networking stack, but it is typically not used for exchanging data between endpoints but only for sharing errors or information.

## Azure and ICMP

The problem comes when you want to ping a service hosted on Azure: in order to avoid DDoS attacks, the Azure team decided to block ICMP packets.

As [stated by the Azure Networking Team](https://feedback.azure.com/forums/217313-networking/suggestions/3346609-icmp-support-for-azure-websites-roles-cloud-serv):
> Unfortunately ICMP presents risks and problems for our underlying network infrastructure.

So you cannot ping them. 

In fact, if you try it from your system, you will receive __Request time out__.

But at least you can try to reach it using a browser!

## A simple use case

Let's say that you have a website, _mysite.azurewebsites.net_, that must communicate with an API hosted at _myapi.azurewebsites.net_. Now you want to check if the networking between the two systems works well and check if everything is well configured.

Of course, you can't open a browser _inside_ the Azure portal. So what?


## TCPPing - the solution for you

If you try to ping _myapi_ from Azure, you won't receive a __Request time out__, but a different error: 

```
Unable to contact IP driver. General failure
```

![Unable to contact IP driver](https://res.cloudinary.com/bellons/image/upload/Code4IT/TCPPING/ping_console.png)

That's because the ping command has directly been disabled.

So how can we solve it?

Well, the solution is pretty easy! There is a command called __tcpping__ that allows you to do something similar, and that can be called by both the Console and the Kudu advanced tool, accessible in the Development Tools section.

By running `tcpping myapi.azurewebsites.net`, you can get something similar:

```
Connected to myapi.azurewebsites.net:80, time taken: 171ms

Connected to myapi.azurewebsites.net:80, time taken: 109ms

Connected to myapi.azurewebsites.net:80, time taken: 109ms

Connected to myapi.azurewebsites.net:80, time taken: 109ms

Complete: 4/4 successful attempts (100%). Average success time: 124.5ms
```

That, in the console, looks like this:

![tcpping example](https://res.cloudinary.com/bellons/image/upload/v1576150918/Code4IT/TCPPING/tcpping_console.png)

If you wanna have more info about this command, you can simply type `tcpping`.

First of all, it explains what it is: _Opens a TCP socket to a target host:port and returns whether the initial handshake was successful and a connection was established_.

That's the way to avoid ICMP packets! Just use TCP!

There are also some flags that can be set:

* _-n_: the number of pings to perform. If not specified, the value is 4
* _-t_: loop infinitely
* _-s_: run for the specified seconds

## Conclusion

Here we've seen how you can ping an Azure App Service inside the Azure Portal. This is a tiny tool that you must know if you want to check if your architecture is well configured. Do you know other ways?
