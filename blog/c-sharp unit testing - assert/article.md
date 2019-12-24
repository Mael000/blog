---
date: "2019-11-20"
title: "How to ping from an Azure App service"
category: "Misc"
tags: ['Talks', 'Career']
banner: "https://res.cloudinary.com/bellons/image/upload/v1576150144/Code4IT/TCPPING/cover_tcpping.jpg"
---

You know, Unit Tests are our friends. Usually skipped, often misused, but they are still with us.  
With or without mocks, they can help us while creating an application, ensuring that the methods we create do what they are supposed to do.

In this series I'm going to dive into basic concepts of the MS Test Framework. I'll show you some important concepts often ignored.

In this article I'll analyze the **Assert** class and some of the methods that are ignored or misunderstood.  
In the second article of this series I'll explain another useful class that only few people use in their test: the **StringAssert** class.  
Another class to keep in mind **CollectionAssert**, that will be the topic of the third part of this series -spoiler alert: it is about collections!  
Let's have a go!

WAIT A MINUTE! This will be a loooong post, but don't panic, that's just because there are lots of examples!

![](https://media.giphy.com/media/3o6Ztl3rRVq6yZ5MT6/giphy.gif)

## Basic concepts

With Visual Studio we can create Unit Tests for our projects. Here's a simple example:

```csharp
[TestMethod()]  
 public void MyFirstTest()  
 {  
     Assert.IsTrue(true);  
 }
 ```

This is a terribly, terribly, dumb test: it checks if _true_ is true.

As you can see, the Assert class contains static methods, and it says if the test will pass or will fail.

Note: **the Assert class is not native of C#: its namespace is** **_Microsoft.VisualStudio.TestTools.UnitTesting_****.**

Note 2: you cannot inherit this class since it is **sealed**.

This class provides the most general checks, those based on equality and general assertions. You can find the documentation [at this page](https://docs.microsoft.com/en-us/dotnet/api/microsoft.visualstudio.testtools.unittesting.assert?view=mstest-net-1.2.0).

For almost every method I'll show in this article there is a specular method that checks if the condition is not verified. For Assert.IsTrue there is Assert.IsFalse, for Assert.AreEqual there is Assert.AreNotEqual and so on. The only exception here is the _ThrowsException_ method.

Every method has two overrides that allow you to add an error message as a string and to provide custom parameters to pass to the string, in order to format it like you do with _String.Format_.

## Assert.IsTrue

With these methods you can check if a generic condition is true or false.

```
[TestMethod]  
 public void TestIsTrue()  
 {  
     int x = 20;  
     Assert.IsTrue(x > 15);  
 }
 ```
## Assert.AreEqual

This methods checks if the two parameters have the same value or not.

There are lots of overloads for this method, depending on the type of parameters under the microscope.

For each type passed as parameter there are different parameters.

### Int

```csharp
[TestMethod]  
 public void TestInt()  
 {  
     var expected = 15;  
     var actual = 3 * 5;  
     Assert.AreEqual(expected, actual);  
 }
 ```
You can check if two Int are equals. But you can use also Int16, Int32 and Int64 to be compared:

```csharp
[TestMethod]  
 public void TestIntWithDifferentTypes()  
 {  
     Int32 expected = 15;  
     Int64 actual = 3 * 5;  
     Assert.AreEqual(expected, actual);  
 }
 ```

### Single and Double

Since the values are always rounded in a way that depends on the inner representation of the Single and Double data type, you must specify a third value for the comparison: the **delta**.

So, the test will fail if the actual value differs more than _delta_ from the expected value.

```csharp
[TestMethod]  
 public void TestOnDouble()  
 {  
     double expected_double = 12.3566d;  
     double actual_double = 12.358d;  
     Assert.AreEqual(expected_double, actual_double, 0.05d);//OK   
     Assert.AreEqual(expected_double, actual_double, 0.000005d); //KO  
 }
 ```

```csharp
[TestMethod]  
 public void TestOnSingle()  
 {  
     float expected_float = 0.0557f;  
     float actual_float = 0.055652f;  
     Assert.AreEqual(expected_float, actual_float, 0.001); //OK     
     Assert.AreEqual(expected_float, actual_float, 0.00000001); //KO  
 }
 ```

### String

This overload was made for the simple comparison of strings.

```csharp
[TestMethod]  
 public void TestOnStrings()  
 {  
     string expected = "FOO";  
     string actual = "foo".ToUpper();  
     Assert.AreEqual(expected, actual);  
 }
 ```

#### Case sensitivity

With a boolean you can specify whether the comparison must ignore case or not.

```csharp
[TestMethod]  
 public void TestOnCaseInsensitiveStrings()  
 {  
     string expected = "FOO";  
     string actual = "foo";  
     Assert.AreEqual(expected, actual, true); //OK  
 }
 ```

#### CultureInfo

Sometimes you need to check if two strings are equals according to a specific culture. Well, you can add a _CultureInfo_ parameter to the method to achieve the result. 

You might think "Do I really need to check for the culture?". Usually not, unless you are Turkish.

#### The _Turkish i problem_

Have you ever heard of the _Turkish I problem_? In short, **for the Turkish alphabet the uppercase ****_i_** **is not****_I_****, but** **_İ_**. You can see a more detailed article [here](https://haacked.com/archive/2012/07/05/turkish-i-problem-and-why-you-should-care.aspx).

So when comparing strings you should keep this problem in mind.

```csharp
[TestMethod]  
 public void TestOnTurkishI()  
 {  
     var turkishCulture = CultureInfo.CreateSpecificCulture("tr-TR");  
     var baseString = "i love you";  
     var turkishToUpperString = baseString.ToUpper(turkishCulture);  
     var turkishUpperString = "İ LOVE YOU";  
     var baseToUpperString = baseString.ToUpper();  
     Assert.AreEqual(turkishToUpperString, turkishUpperString, false, turkishCulture); //OK     
     Assert.AreEqual(baseToUpperString, turkishToUpperString); //KO  
 }
 ```

### Object

With objects things get a bit more complicated. Let's say we have this class:

```csharp
class User  
 {  
     public int Id { get; set; }  
     public string Username { get; set; }  
 }
 ```

Now have a look at this test:

```csharp
[TestMethod]  
 public void TestAreEqualObjects()  
 {  
     User expected = new User() { Id = 1, Username = "Tetris" };  
     User actual = new User() { Id = 1, Username = "Tetris" };  
     Assert.AreEqual(expected, actual);  
 }
 ```

Will the test pass? The answer is... **NO**. Why?

Well, the two objects look identical, and have the same values for every field. But they refer to different memory location. As you know, equality on objects is made on the object reference - [here](https://coding.abel.nu/2014/09/net-and-equals/) a really good article. 

So? How can we pass the test?

#### Override Equals

The solution is to override the _Equals_ method of the _Object_ class. This will let you specify a custom way to compare two object without comparing the object reference.  
First of all I've created a new class, UpdatedUser, that is similar to the User class seen before but with an override of the _Equals_ method.

```csharp
private class UpdatedUser  
 {  
     public int Id { get; set; }  
     public string Username { get; set; }  
     public override bool Equals(object obj)  
     {  
         return Id == ((UpdatedUser)obj).Id;  
     }  
 }
 ```

Now we can play with this new class.

```csharp
[TestMethod]  
 public void TestAreEqualObjectsWithOverride()  
 {  
     UpdatedUser expected = new UpdatedUser() { Id = 1, Username = "Tetris" };  
     UpdatedUser actual = new UpdatedUser() { Id = 1, Username = "Tetris" };  
     Assert.AreEqual(expected, actual);  
 }
 ```

### Struct

And what about structs? Oh, come on, who uses structs?? Well, who am I to judge you? :)

![](https://media.giphy.com/media/fGnPmGqbBaB1e/giphy.gif)


Ok, seriously. Structs are just like value types, so the equality check is simpler:

```csharp
private struct Employee  
 {  
     public int Id { get; set; }  
     public int Age { get; set; }  
 }
 ```

## Assert.AreSame

This method checks if the references of the two values are the same. 

```csharp
[TestMethod]  
 public void TestAreEqualsStructs()  
 {  
     var a = new Employee() { Id = 1, Age = 35 };  
     var b = new Employee() { Id = 1, Age = 35 };  
     Assert.AreEqual(a, b);  
 }
 ```

As you can see, _a_ and _b_ are exactly the same struct, so the override of the _Equals_ method is not necessary. With this method you can verify by yourself that when adding an element in a List you are adding a reference to an object, not cloning that one:

```csharp
[TestMethod]  
 public void TestAreSameObjectsInList()  
 {  
     User expected = new User() { Id = 2, Username = "Rocky" };  
     List userList = new List();  
     userList.Add(expected);  
     User actual = userList.First();  
     Assert.AreSame(expected, actual);  
 }
 ```

## Assert.IsInstanceOfType

Well, you can imagine what this method does... In the examples below I'll show you also the _IsNotInstanceOfType_ method, just to have a countercheck on what is inheritance. In fact, in this example I created the _AdminUser_ class that extends the _User_ class seen before.

```csharp
private class AdminUser : User  
 {  
     public string Department { get; set; }  
 }
 ```

```csharp
[TestMethod]  
 public void TestInstanceOfType()  
 {  
     User user = new AdminUser()  
     {  
         Id = 1,  
         Username = "BigBoss",  
         Department = "Olympus"  
     };  
     Assert.IsInstanceOfType(user, typeof(AdminUser));  
 }  
 [TestMethod]  
 public void TestNotInstanceOfType()  
 {  
     User user = new User() { Id = 2, Username = "SimpleMan" };  
     Assert.IsNotInstanceOfType(user, typeof(AdminUser));  
 }
 ```

## Assert.IsNull

It's not difficult to guess what this method checks...

```csharp
[TestMethod]  
 public void TestIsNull()  
 {  
     string nullString = null;  
     Assert.IsNull(nullString);  
 }
 ```

## Assert.ThrowsException

Until now we assumed that all our methods return a value, and that we should just check if that value is correct. But some times methods throw exceptions, and we have to handle them.   
That's why this method comes handy.

Suppose you have a simple method like this one:

```csharp
public bool IsAuthorized(string username)  
 {  
     if (String.IsNullOrWhiteSpace(username))  
     {  
         throw new Exception();  
     }  
     return true;  
 }
 ```

We know that the method won't fail if you pass a username. But we also want to ensure that in a specific case it will throw an exception.   
And we can check it this way:

```csharp
[TestMethod]  
 public void TestThrowsException()  
 {  
     string userName = null;  
     Assert.ThrowsException(() => IsAuthorized(userName));  
 }
 ```

Perfect! Or not?  
What if the exception thrown is not of the same type of the one expected?  
Let's modify the _IsAuthorized_ method.

```csharp
public bool IsAuthorized(string username)  
 {  
     if (String.IsNullOrWhiteSpace(username))  
     {  
         throw new ArgumentNullException();  
     }  
     return true;  
 }
 ```

This way we are giving more information on why the method fails. But the test seen before will fail, because that's not the exception expected (we are expecting an _Exception_ but we receive an _ArgumentNullException_).

Is there a way to create generic tests?  
Well... no.

Just look at what happens into the _ThrowsException_ method and find out why.

```csharp
public static T ThrowsException(Action action, string message, params object[] parameters) where T : Exception  
 {  
     string empty = string.Empty;  
     if (action == null)  
     {  
         throw new ArgumentNullException("action");  
     }  
     if (message == null)  
     {  
         throw new ArgumentNullException("message");  
     }  
     try  
     {  
         action();  
     }  
     catch (Exception ex)  
     {  
         if (!typeof(T).Equals(((object)ex).GetType()))  
         {  
             empty = string.Format(CultureInfo.CurrentCulture, FrameworkMessages.WrongExceptionThrown, ReplaceNulls(message), typeof(T).get_Name(), ((object)ex).GetType().get_Name(), ex.Message, ex.StackTrace);  
             HandleFail("Assert.ThrowsException", empty, parameters);  
         }  
         return (T)ex;  
     }  
     empty = string.Format(CultureInfo.CurrentCulture, FrameworkMessages.NoExceptionThrown, new object[2]  
     {  
 ReplaceNulls(message),  
 typeof(T).get_Name()  
     });  
     HandleFail("Assert.ThrowsException", empty, parameters);  
     return null;  
 }
 ```

## Wrapping Up

This was a long article, I know. But here I have listed a few methods I don't see used as much as they should. As I said before, nearly every method has it's negative counterpart, so you have a rich set of checks to use.

In the next article we'll have a look at the _StringAssert_ class, that's -obviously- specific for strings.