---
layout: post
title: Static Variables and Static Functions in C Programming
date: 2018-07-13 11:01:14 +0700
description: Static Variables and Static Functions in C Programming
img: static.jpg
tags: [C]
---
By default all global variables and functions are implicitly declared as <code>extern</code>, which means they're visible across translation units. A translation unit is a set of source files seen by the compiler and translated as a unit. When we use <code>static</code> on a global or local variable and on a function, it restricts the visibility of the variable and the function to the translation unit in which it's defined.

When a function is declared as static, it makes the function is only available to the file where the function defined.

<pre>
<code data-language="c">/* file main.c */

#include "header.h"

int main()
{
    hello();
    return 0;
}</code>
</pre>

<pre>
<code data-language="c">/* file func.c */

#include "header.h"

void hello()
{
    printf("HELLO WORLD\n");
}</code>
</pre>

<pre>
<code data-language="c">/* file header.h */

#include &lt;stdio.h&gt;

static void hello();</code>
</pre>

If we compile above code it fails as shown below

<pre>
$  gcc main.c func.c
In file included from main.c:1:0:
header.h:3:13: warning: 'hello' used but never defined
 static void hello();
             ^
/tmp/ccw0uSfz.o: In function `main':
main.c:(.text+0xa): undefined reference to `hello'
collect2: error: ld returned 1 exit status
</pre>

It fails in linking since function <code>hello()</code> is declared as static and its definition is accessible only within func.c file but not for main.c file.

When a variable inside a function is declared as static, it allows the variable to retain its value between calls to the
 function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

void func_1();
int a, b = 10;

int main()
{
    func_1();
    func_1();
    func_1();

    return 0;
}

void func_1()
{
    int a = 1;
    static int b = 100;
    printf("a = %d\n", a);
    printf("b = %d\n\n", b);
    a++;
    b++;
}</code>
</pre>

Output:

<pre>
a = 1
b = 100

a = 1
b = 101

a = 1
b = 102
</pre>
