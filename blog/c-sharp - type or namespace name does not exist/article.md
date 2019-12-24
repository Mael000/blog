---
date: "2019-11-20"
title: "How to ping from an Azure App service"
category: "Misc"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/v1576150144/Code4IT/TCPPING/cover_tcpping.jpg"
---

# The mystery of the ghost Assembly

Something strange happened today.

I've developed a Class Library in .NET Framework, and tested it with the related test library.

So I've integrated the library into another project. Everything was fine, I used that library without problems. 
But all of a sudden, the horror:

`Error	CS0246	The type or namespace name 'XX' could not be found (are you missing a using directive or an assembly reference?)`.

__What?!?__ I've been using it for the whole week. I've tested it. I've added the reference, and the Intellisense works as well.

C'mon, the class is here!

Clean the solution... nothing happens.
Close Visual Studio... still nothing.
Have a coffee... well, better now.

Suddenly, a doubt: _what if I've created it in .NET Core instead of .NET Framework?_

And, obviously... no, it wasn't that.

But I was close: _the Class Library was in `.NET Framework 4.7.2` but the application was in `.NET Framework 4.7.1`_. __It was the patch version!__


So, the lesson is: _know your enemy_.

