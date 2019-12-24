---
date: "2019-11-20"
title: "How to ping from an Azure App service"
category: "Misc"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/v1576150144/Code4IT/TCPPING/cover_tcpping.jpg"
---

> To be, or not to be (empty), that is the question..

That's a simple, yet complex, question.

First of all, when a string is not empty? Of course when there is at least one character or one number.
![Image result for null vs empty](https://i.stack.imgur.com/j9vg8.jpg)

## From scratch

Let's create a custom function to achieve this functionality.

```
public static bool IsStringEmpty(string myString){
// do something
}
```

Ok, now we have to think of how to check if the string _myString_ is empty.

Of course the string must be not null. And must not be empty. Maybe.. its length must be greater than zero?

```
public static bool IsStringEmpty(string myString){

return myString==null || myString == String.Empty || myString.Length == 0;
}
```

Ok, we should be fine. But, what if the string contains only whitespaces?

I mean, the string _"     "_, passed to the _IsStringEmpty_ method, will return true.

If that's not what we want, we should include this check on the method.  
Of course, this implies a bit of complexity to check null values.

```
public static bool IsStringEmpty(string myString){

return myString==null || myString == String.Empty || myString.Length == 0;
}
```

Ok, we covered the most important scenarios.

So we can try the method with our values:

```
using System;
using System.Collections.Generic;

public class Program
{
	public static void Main()
	{
		var arr = new List()
		{"1", null, "   ", String.Empty, "hello"};
		foreach (string txt in arr)
		{
			Console.WriteLine("IsStringEmpty? " + IsStringEmpty(txt));
		}
	}

	public static bool IsStringEmpty(string myString)
	{
		if (myString == null)
			return true;
		myString = myString.Trim();
		return myString == String.Empty || myString.Length == 0;
	}
}
```

will return

```
IsStringEmpty? False
IsStringEmpty? True
IsStringEmpty? True
IsStringEmpty? True
IsStringEmpty? False
```

Fine. Too tricky, isn't it? And we just reinvented the wheel.

## .NET, help me!

C# provides two method to achieve this result, **[String.IsNullOrEmpty](https://docs.microsoft.com/en-us/dotnet/api/system.string.isnullorempty?view=netframework-4.7.2#remarks)** and **[String.IsNullOrWhiteSpace](https://docs.microsoft.com/en-us/dotnet/api/system.string.isnullorwhitespace?view=netframework-4.7.2#remarks), **with a subtle difference.

**String.IsNullOrEmpty checks only if the string passed as parameter has at least one symbol**, so it doesn't recognize strings composed by empty characters.

**String.IsNullOrWhitespace** covers the scenario described in this post. It checks both **empty characters **and **for escape characters**.

```
string str1 = "hello";
Console.WriteLine(String.IsNullOrEmpty(str1)); //False
Console.WriteLine(String.IsNullOrWhiteSpace(str1)); //False

string str2 = null;
Console.WriteLine(String.IsNullOrEmpty(str2)); //True
Console.WriteLine(String.IsNullOrWhiteSpace(str2)); //True

string str3 = "";
Console.WriteLine(String.IsNullOrEmpty(str3)); //True
Console.WriteLine(String.IsNullOrWhiteSpace(str3)); //True

string str4 = "\n   \t   ";
Console.WriteLine(String.IsNullOrEmpty(str4)); //False
Console.WriteLine(String.IsNullOrWhiteSpace(str4)); //True

string str5 = "       ";
Console.WriteLine(String.IsNullOrEmpty(str5)); //False
Console.WriteLine(String.IsNullOrWhiteSpace(str5)); //True
```

You can see a live example [here](http://volatileread.com/utilitylibrary/snippetcompiler?id=120726).

## Wrapping up

As you can see, out of the box .Net provides you easy methods to handle your strings. You shouldn't reinvent the wheel when everything is already done.