---
layout: post
title: Introduction to C Programming
date: 2018-06-02 13:32:20 +0700
description: Basic Parts of C Programs and How to Compile and Execute C Program
img: introduction.jpg
tags: [C]
---
<ol>A C Program basically consists of the following parts:
<li>Preprocessor</li>
<li>Functions</li>
<li>Variables</li>
<li>Comments</li></ol>

A C Program always starts executing in a special function called <code>main()</code> function. Let's take a look at a
simple C code that would print the words "Hello World"

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main() {
   /* my first program in C */
   printf("Hello, World! \n");

   return 0;
}</code>
</pre>

<ol>Let's examine the program:
<li>The first line of the program <code>#include &lt;stdio.h&gt;</code> is a preprocessor command, which tells the C compiler to include stdio.h file before going to compilation</li>
<li>The next line <code>int main()</code> is the main function where the program execution begins</li>
<li>The next line <code>/* ... */</code> is a comment in C and will be ignored by the compiler</li>
<li>The next line <code>printf(...)</code> is another function declared in stdio.h file which will display the message
"Hello, Word!"</li>
<li>The next line <code>return 0;</code> terminates the main() function and returns the value 0</li></ol>

###### Compile and Execute C Program in Linux

Open a text editor, copy and paste the above code. Save the file as hello.c. Open a command prompt and go to the directory where you've saved the file.

If you're using gcc compiler, you type <code>gcc hello.c</code> and press enter to compile your code. If there are no errors in your code, it would generate a.out executable file. Now, type a.out to execute your program and you will see the output "Hello, World!".

![Compile C program using gcc compiler](/assets/img/gcc.jpg){:class="img-responsive"}

If you're using clang compiler, you type <code>clang hello.c</code> and press enter to compile your code. If there are no errors in your code, it would generate a.out executable file. Now, type a.out to execute your program and you will
see the output "Hello, World!".

![Compile C program using clang compiler](/assets/img/clang.jpg){:class="img-responsive"}