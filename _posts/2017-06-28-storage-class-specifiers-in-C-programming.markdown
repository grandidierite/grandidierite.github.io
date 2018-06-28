---
layout: post
title: Storage Class Specifiers in C Programming
date: 2018-06-28 15:32:20 +0700
description: Storage Class Specifiers in C Programming
img: storage.jpg
tags: [C]
---
Storage class specifiers in C language tells the compiler where to store a variable, how to store the variable, what is the initial value of the variable and lifetime of the variable.

There are 4 storage class specifiers in C language
1. auto
2. extern
3. static
4. register

##### The auto Storage Specifier
Variables which are defined within a function or a block (block is a section of code which is grouped together) by default belong to the auto storage class. These variables are also called local variables because they are local to the function and by default assigned some garbage value. Since these variables are declared inside a function, therefore these can only be accessed inside that function. There is no need to put 'auto' while declaring these variables because these are by default auto. auto storage class variables are deleted when the block in which the variables were declared exits.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int sum(int n1, int n2){
  int s;        // by default auto
  s = n1+n2;
  return s;
}
int main(){
  int i = 2, j = 3, k;       // by default auto
  k = sum(i, j);
  printf("sum is : %d\n", k);
  return 0;
}</code>
</pre>

The auto storage class variables characteristics
* Storage place : CPU memory
* Initial/default value : garbage value
* Scope : local
* Lifetime : within the function only

##### The extern Storage Specifier
The extern storage specifier simply tells us that the variable is defined elsewhere and not within the same block where it is used. Basically, the value is assigned to it in a different block and it can be overwritten or changed in a different block as well. So the extern variable is a global variable initialized with a legal value where it is declared in order to be used elsewhere. It can be accessed within any function/block. The variables inside function/block can be made extern as well. It simply tells that we are not initializing a new variable but instead we are using or accessing the global variable.

<pre>
<code data-language="c">/*
 * File : extern_var.h
 */

int count = 9; /* declaration and initialization of variable count */

void incrementCount() {
   ++count;
}</code>
</pre>

<pre>
<code data-language="c">/*
 * File : extern_var.c
 */

#include &lt;stdio.h&gt;
#include "extern_var.h"    /* including extern_var.h */

extern int count;   /* declaration of variable 'count' */

int main() {
    printf("count : %d\n", count);
    count = 3;
    incrementCount();
    printf("count : %d\n", count);
    return 0;
}</code>
</pre>

The extern storage class variables characteristics
* Storage place : CPU memory
* Initial/default value : zero
* Scope : global
* Lifetime : till the main program exits

##### The static Storage Specifier
This storage specifier is used to declare static variables. Static variables have a property of preserving their value even after they are out their scope. A static variable remains in memory while the program is running. A normal or auto variable is destroyed when the function call where the variable was declared is over.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
int counting()
{
  static int count = 0;
  count++;
  return count;
}

int main()
{
  printf("%d ", counting());
  printf("%d ", counting());
  printf("\n");
  return 0;
}</code>
</pre>

Output: <samp>1 2</samp>

What if we use a normal or auto variable instead?

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
int counting()
{
  int count = 0;
  count++;
  return count;
}

int main()
{
  printf("%d ", counting());
  printf("%d ", counting());
  printf("\n");
  return 0;
}</code>
</pre>

Output: <samp>1 1</samp>

Static variables are allocated memory in data segment, not stack segment.

Static variables are initialized as 0 if not initialized explicitly.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
int main()
{
    static int x;
    int y;
    printf("%d \n %d \n", x, y);
}</code>
</pre>

Ouput: <br><samp>0<br>{garbage_value}</samp>

Static variables can only be initialized using constant literals. For example, the following program fails in compilation.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
int initializer(void)
{
    return 50;
}

int main()
{
    static int i = initializer();
    printf("The value of i = %d\n", i);

    return 0;
}</code>
</pre>

Output:
<pre>
example.c: In function ?main?:
example.c:9:20: error: initializer element is not constant
     static int i = initializer();
</pre>

The static storage class variables characteristics
* Storage place : CPU memory
* Initial/default value : zero
* Scope : local
* Lifetime : retains its value in memory

##### The register Storage Specifier
Register storage class variables have the same functionality as auto storage class variables. The only difference is that the compiler tries to store these variables in the register of the microprocessor. This makes the use of register variables to be much faster than the variables stored in memory during the runtime of the program.

The register storage class variables characteristics
* Storage place : register memory
* Initial/default value : garbage value
* Scope : local
* Lifetime : within the function only

