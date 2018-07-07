---
layout: post
title: Functions in C Programming
date: 2018-07-07 23:05:20 +0700
description: Functions in C Programming
img: function.jpg
tags: [C]
---
A function is a block of code that performs particular task.

Functions are used for to prevent writing the same line of code for more than once in a program.

C functions can be classified into two categories
1. library functions
2. user-defined functions

Library functions are functions which are already defined in C library. You just need to include appropriate header
files to use these functions. They are already declared and defined in C libraries.

User-defined functions are functions which are defined by the user at the time of writing program. There are 4 different types of user-defined functions
1. function with no arguments and no return value
2. function with no arguments and a return value
3. function with arguments and no return value
4. function with arguments and a return value

###### Function with no arguments and no return value

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

void greatNum();       // function declaration

int main()
{
    greatNum();        // function call
    return 0;
}

void greatNum()        // function definition
{
    int i, j;
    printf("Enter 2 numbers that you want to compare...");
    scanf("%d%d", &i, &j);
    if(i > j) {
        printf("The greater number is: %d\n", i);
    }
    else {
        printf("The greater number is: %d\n", j);
    }
}</code>
</pre>

###### Function with no arguments and a return value

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int greatNum();       // function declaration

int main()
{
    int result;
    result = greatNum();        // function call
    printf("The greater number is: %d\n", result);
    return 0;
}

int greatNum()        // function definition
{
    int i, j, greaterNum;
    printf("Enter 2 numbers that you want to compare...");
    scanf("%d%d", &i, &j);
    if(i > j) {
        greaterNum = i;
    }
    else {
        greaterNum = j;
    }
    // returning the result
    return greaterNum;
}</code>
</pre>

###### Function with arguments and no return value

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

void greatNum(int a, int b);       // function declaration

int main()
{
    int i, j;
    printf("Enter 2 numbers that you want to compare...");
    scanf("%d%d", &i, &j);
    greatNum(i, j);        // function call
    return 0;
}

void greatNum(int x, int y)        // function definition
{
    if(x > y) {
        printf("The greater number is: %d\n", x);
    }
    else {
        printf("The greater number is: %d\n", y);
    }
}</code>
</pre>

###### Function with arguments and a return value

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int greatNum(int a, int b);       // function declaration

int main()
{
    int i, j, result;
    printf("Enter 2 numbers that you want to compare...");
    scanf("%d%d", &i, &j);
    result = greatNum(i, j); // function call
    printf("The greater number is: %d\n", result);
    return 0;
}

int greatNum(int x, int y)        // function definition
{
    if(x > y) {
        return x;
    }
    else {
        return y;
    }
}</code>
</pre>

##### Recursion
Recursion is the process of calling a function within the same function again and again till the condition is satisfied.

The recursive function works in two phases:
1. <b>winding phase</b>, in winding phase the recursive function keeps calling itself. This phase ends when the base
condition is reached
2. <b>unwinding phase</b>, when the base condition is reached, unwinding phase starts and returns back to the original
call

Let's take a look at the example

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

void rec();

int main()
{
    rec(1);

    return 0;
}

void rec(int n)
{
    printf("Winding phase: Level = %d\n", n);

    if(n<3)
    {
        rec(n+1);
    }

    printf("Unwinding phase: Level = %d\n", n);
}</code>
</pre>

Ouput:

<pre>
Winding phase: Level = 1
Winding phase: Level = 2
Winding phase: Level = 3
Unwinding phase: Level = 3
Unwinding phase: Level = 2
Unwinding phase: Level = 1
</pre>

Here is an simple example using a recursive function

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int factorial(int x);       //declaring the function

void main()
{
    int a, b;

    printf("Enter a number...");
    scanf("%d", &a);
    b = factorial(a);       //calling the function named factorial
    printf("%d", b);
    printf("\n");
}

int factorial(int x) //defining the function
{
    int r = 1;
    if(x == 1)
        return 1;
    else
        r = x*factorial(x-1);       //recursion, since the function calls itself

    return r;
}</code>
</pre>

There are two types of function calls
1. call by value
2. call by reference

##### Call by Value
In this method we pass a copy of the variable and not the actual variable to the called function. So, any change made to the copy of the variable in the called function does not affect the original variable.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

void calc(int x);

int main()
{
    int x = 10;
    printf("Value of x before function call: %d\n", x);

    calc(x);
    printf("Value of num after function call: %d\n", x);

    return 0;
}

void calc(int x)
{
    // changing the value of 'x'
    x = x + 10 ;
}</code>
</pre>

Output:

<pre>
Value of x before function call: 10
Value of x after function call: 10
</pre>

We can see that the value of <code>x</code> is not changed after the function call. Let's say <code>x</code> variable is saved in memory location 1000 and the parameter <code>x</code> of the function is at memory location 2000. When the value <code>x</code> is passed to the function, 10 is saved in the location 2000. Then, we add 10 to parameter <code>x</code> inside the <code>calc()</code> function. So the new value at location 2000 becomes 20 and the value at location 1000 remains unchanged.

##### Call by Reference
In this case, we pass the address of variable to the called function.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

void calc(int *x);

int main()
{
    int x = 10;
    printf("Value of x before function call: %d\n", x);

    calc(&x);
    printf("Value of num after function call: %d\n", x);

    return 0;
}

void calc(int *x)
{
    // changing the value of 'x'
    *x = *x + 10 ;
}</code>
</pre>

Output:

<pre>
Value of x before function call: 10
Value of x after function call: 20
</pre>

We can see that the value of <code>x</code> is changed. Let's say the value of <code>x</code> is stored at memory location 1000 and the parameter <code>x</code> of the function is at memory location 2000. When we are calling the <code>calc()</code> function, we are passing the address of <code>x</code> to the function. So the address of the <code>x</code> variable is stored in function parameter <code>x</code> in memory location 2000. Inside the function <code>calc()</code>, we add 10 to the value at the address stored in function parameter <code>x</code>. In other words, we add 10 to the value at memory location 1000. So the new value at location 1000 becomes 20.
