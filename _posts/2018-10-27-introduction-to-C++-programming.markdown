---
layout: post
title: Introduction to C++ Programming
date: 2018-10-27 10:00:20 +0700
description: Introduction to C++ and How to Compile and Execute C++ Program
img: cppintroduction.jpg
tags: [C++]
---

A C++ Program always starts executing in a special function called <code>main()</code> function. Let's take a look at a
simple C++ code that would print the words "This is a simple C++ program!"

<pre>
<code data-language="c">#include &lt;iostream&gt;

int main() {
   std::cout << "This is a simple C++ program!\n";

   return 0;
}</code>
</pre>

<code>#include &lt;iostream&gt;</code> is a preprocessing directive. It adds some predefined source code to our existing
 source code before the compiler begins to process it. <code>iostream</code> is a library, a collection precompiled C++
 code that C++ programs can use.

<code>int main()</code> is the main function where program execution begins.

<code>std::cout << "This is a simple C++ program!\n";</code> causes the message "This is a simple C++ program!\n" to be
displayed on the screen.

<code>return 0;</code> terminates main() function and causes it to return the value 0 to the calling process.

There is an alternative way of writing above program:

<pre>
<code data-language="c">#include &lt;iostream&gt;

using std::cout;

int main() {
   cout << "This is a simple C++ program!\n";

   return 0;
}</code>
</pre>

The <code>using</code> directive allows us to use a shorter name for the <code>std::cout</code> printing object. The
name std stands for "standard", and the std prefix indicates that cout is part of a collection of names called the
standard namespace. The std namespace holds names for all the standard C++ types and functions that must be available to
 all standard-conforming C++ development environments.

Another way to use the shorter name for cout within a C++ program

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

int main() {
   cout << "This is a simple C++ program!\n";

   return 0;
}</code>
</pre>

###### Compile and Execute C++ Program in Linux

Open a text editor, copy and paste the above code. Save the file as simple.cpp. Open a command prompt and go to the directory where you've saved the file.

If you're using gcc compiler, you type <code>g++ simple.cpp</code> and press enter to compile your code. If there are no
errors in your code, it would generate a.out executable file. Now, type a.out to execute your program and you will see the output "This is a simple C++ program!".

<pre>
<code data-language="shell">$ g++ simple.cpp
$ ./a.out
This is a simple C++ program!</code>
</pre>
