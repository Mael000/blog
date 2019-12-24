---
date: "2019-11-20"
title: "How to ping from an Azure App service"
category: "Misc"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/v1576150144/Code4IT/TCPPING/cover_tcpping.jpg"
---

# Few things I learned at Global Azure Bootcamp 2019 in Turin - API Gateways
Saturday, April 27th, I took part of the Global Azure Bootcamp. This event took place around the world, and the event I attended was the one in Turin, organized by [Welol](http://welol.it/). 

In the [event](http://azurebootcamptorino.welol.it/global-azure-bootcamp-torino-2019/)  we talked about many things related to the Azure universe, including .NET Core, DevOps, AI, Containers.

Here's the first part of what I learnt during the day. 

## API Gateways
### Overview

API Gateways allow you to create services with completely different technologies: in fact one of the best practices is to have all the APIs detached from the others, so that having different stacks is definitely not a problem. Since those services can live on their own, you can make them very small and provide common functionalities at API Gateway level: examples are documentation, error handling, authentication and general logging. 

There are few services that provide different complexity at different prices, like [Amazon API Management](https://azure.microsoft.com/en-us/services/api-management/), [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and [Ocelot](https://github.com/ThreeMammals/Ocelot).

### UI Composition
Another interesting thing to do with API Gateways is UI Composition. 

Imagine that you must show info that come from different services, for example the list of available products with few details about the product itself and info about the seller. You can handle this problem in 3 ways:

1. call an API to get the list of all products an then call, for each product, another API to get the additional info, doing those operations directly from the client;
2. create a single API function that returns all the info;
3. use a Gateway that deals with all the operations from the backend and then returns the result as requested by the client.

The method #1 is of course the slowest from client perspective. #2 is probably the most used in monolithic applications. #3 is optimal for microservice-based applications, considering that those microservices should return the minimum results possible to avoid overengineering. 

### Ocelot
The project used for explaining API Gateways was [Ocelot](https://github.com/ThreeMammals/Ocelot). It is an open source project that supports .NET Core. You can find the documentation [here](https://ocelot.readthedocs.io/en/latest/).

It is an interesting project, easy to use and great to have an idea of what an API Gateway is. The definition of exposed functions is defined through a JSON file, which defines available routes and additional customizations. 

### Workaround for making public APIs private
APIs, being available through web, are by default discoverable (obviously excluding those on an intranet). But you might want to "hide" endpoints and provide access only to API Gateways. How can you do this? 

There's a quick and dirty workaround: insert a GUID in the URL. So if you want to obscure this endpoint:

_http://mysite.com/api/users/getById_

you can modify the URL like this: 

_http://mysite.com/api/07ec5ecc-46db-4a5b-9000-c994792f364b/users/getById_

This way the API are available online but not easily discoverable.

I know, this workaround is dirty. Personally I don't like it, but it works.

### SSL Termination
Since an API Gateway sits in front of your backend, a nice idea is to implement SSL Termination here. But... __what is SSL Termination__? Let's take a step back.
When you secure your website with SSL you send encrypted data "on the wire" and decrypt and verify the message on the endpoints. This means that every time you request a resource from a server, the request must be decrypted before the usage. Decryption is an intensive process, and server resources will be used not only to elaborate the request but also to decrypt the message, slowing down the entire process. 

With SSL Termination you move the burden of decryption from the server to the load balancer, or in this case the Gateway. This means that when a request is done, the server "in the middle" decrypts the message, sends the plain message to the server that will do less work. 

Another advantage of this technique is the simplified management of SSL certificates: while before you have to install that on each server, now you can use it only on the "exposed" endpoint.

Of course, when the internal servers are in the same LAN there are more advantages.

## Final words
API Gateways are useful when you have to share APIs with external clients, but for a simple application I think they add more difficulties than benefits. However, looking at the microservices world, a basic knowledge of this kind of technology is fundamental to create a scalable architecture.

## What's next
In the next article I'll explain what I learnt about Entity Framework performance, and how even a simple trick can speed up the loading time.