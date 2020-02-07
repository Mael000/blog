---
date: "2019-11-20"
title: "Have you ever forgotten your SQL server instance name?"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/{format}/Code4IT/TCPPING/cover_tcpping.jpg"
---
This article is just a note for something I forget the most: my LocalDB instance names.

Sometimes when I open SQL Server Management Studio (SSMS) I lose time thinking and trying to figure out what is the name of my LocalDb. 

The solution is simple: open the terminal and run `SQLLocalDb.exe i`, where _i_ stand for _information_.

Now you can see the list of configured DBs. 

To use it in SSMS remember to use _Windows Authentication_.

If you need more info about a specific instance, just run `SQLLocalDB.exe i "InstanceName"` where of course _InstanceName_ must be replaced with your real name you are looking for.

If you want to have a list of all available commands, run `SQLLocalDB.exe -?`.