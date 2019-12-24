---
date: "2019-11-20"
title: "How to ping from an Azure App service"
category: "Misc"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/v1576150144/Code4IT/TCPPING/cover_tcpping.jpg"
---

# Angular 7 - so you want to start a new project?

Before reading this article, be sure you know what Node.js, NPM and Angular are. If you are not sure, [here's a short reminder.](https://code4it.wordpress.com/2018/10/25/nodejs-npm-angular/)

## Getting started

In this article I'm gonna use the Angular CLI (Command line interface) in order to create a simple Angular project. I have the version 6.2.0 of @angular/cli installed on my system. I know, Angular CLI v7 has recently been released, but these options are still valid.

## ng new

The ng new command allows you to create a new Angular project. You have to navigate to the folder that will contain the project and run the command **ng new**. It will create the folder _project_name_ with the Angular project in it. There are few options that you can specify when creating the project, and you can see the list with the option --help.

### help

Run the command above. You'll see something like this:

![ng new](https://res.cloudinary.com/bellons/image/upload/v1566593395/Code4IT/Start%20new%20Angular%20project/ng-new_yshndw.png)
 
This is the list of available options. In this article I'll show you the most important ones, for me, to have a go with a project.

### dry-run

One of the least used options (but one of the most useful) is _--dry-run_, that gives you a preview of the file generated with the command without really creating the files.
 
 ![ng new dry-run](https://res.cloudinary.com/bellons/image/upload/v1566593436/Code4IT/Start%20new%20Angular%20project/ng-new-dry-run_xnkqok.png)
 

As you can see in the above picture, the _--dry-run_ (or the alias -d) shows you the file that would be created if you run the command without the --dry-run option. The yellow note confirms that the files weren't actually created, but that was a simulation.

This is also confirmed by the fact that, looking up for the my-first-project dir, this doesn't exist.

### skip-install

If you want to create a project without losing time with the installation of the node modules, _--skip-install_ is your choice.

With this option the project will contain only the files, but packages won't be available until you run the _npm install_ command.

### style

With the _style_ option you can define the style of your style files for your project. The default is css, but you can specify your favourite kind with the command

`_ng new my-project --syle=style-extension_`

Common sense makes you think that the available values would be css, scss and less, but the fact is that you can specify whatever you want, even not existing style format.

In the example below I set the value to _foo_.

 ![ng new style foo](https://res.cloudinary.com/bellons/image/upload/v1566593493/Code4IT/Start%20new%20Angular%20project/ng-new-style-foo_z1ias2.png) 
 
### routing

Routing is one of the key of the success of Angular, and of course of Angular-based sites.

With the _--routing_ option you can tell the CLI to create the Routing Module and to add it to the AppModule.

 ![ng new routing](https://res.cloudinary.com/bellons/image/upload/v1566593528/Code4IT/Start%20new%20Angular%20project/ng-new-routing_v4sils.png)

 

### prefix

The default prefix for the directives is _app_: you can find it in the AppComponent selector (app-root) and in every component or directive you create with the CLI.

To change the default prefix you can use the --prefix option:

`_ng new my-project --prefix=foo_`

This will set the default prefix to _foo_ for the whole application, updating also the corresponding property in the _angular.json_ file.
![ng new prefix](https://res.cloudinary.com/bellons/image/upload/v1566593565/Code4IT/Start%20new%20Angular%20project/ng-new-prefix_xa87mr.png)

Note: the prefix isn't about the name of the components and directives, but only the way they are referenced in the templates.

### inline-style

Sometimes you don't want to create files for styles. The --inline-style will prevent it.

Using this option the styles will be created directly in the component metadata. The styles file won't be created at all.

Notice that this option refers only to the component styles. The default style of the application (the one whose extension can be defined with the _--style_ option) will be created as usual.

### inline-template

Similar to the inline-style option, inline-template won't create the HTML file but will allow you to add HTML structure directly in the component.

## Wrapping up

In this article I gave a glimpse of what the cli can do for you when creating a new project. There are few more options available, but I think that the most useful are the ones listed above.