---
date: "2019-11-20"
title: "How to ping from an Azure App service"
category: "Misc"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/v1576150144/Code4IT/TCPPING/cover_tcpping.jpg"
---

Recently I've noticed a funny (ehm...) thing.

## The guilty

_It isn't true that the inverse of a negative number is a positive number_. Or, equally, that ` (x < 0) => (-x > 0)`.

You could say "Hey, -(-5) == 5". Yes, that's true. 
We can test it this way:

```csharp
[Test]
public void TestInverse()
{
    int x = -5;
    int y = -x;
    Assert.IsTrue(y > 0);
}
```

But what if we consider __edge cases__? 

```csharp
[Test]
public void TestInverse_EdgeCase()
{
    int x = int.MinValue;
    int y = -x;
    Assert.IsTrue(y > 0);
}
```

It will fail. Miserably.

## The reason

The reason is simple: __the sign occupies space__.
In fact, the range of int is _-2,147,483,648_ to _2,147,483,647_. The inverse of _-2,147,483,648_ would cause overflow, and returns the same value.

## The lesson

Why am I pointing at this? 

Imagine you are implementing a `CompareTo(x, y)` method, you know, the usual one that returns `0` if the values are considered equal, -1 if x < y and 1 if x > y.

You could use this method to sort an array.
Now you want to sort that array descending. What to do?

This edge case explains why it is a terrible idea to use `CompareTo(-x, -y)`. Results can be unexpected.

The best solution is to simply switch the parameters: `CompareTo(y, x)`.