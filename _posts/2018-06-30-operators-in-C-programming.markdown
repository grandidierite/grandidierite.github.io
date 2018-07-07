---
layout: post
title: Operators in C Programming
date: 2018-06-30 16:32:20 +0700
description: Operators in C Programming
img: operator.jpg
tags: [C]
---
##### Arithmetic Operators
These are used to perform mathematical calculations like addition, subtraction, multiplication, division, and modulus.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Operator</th>
<th>Description</th>
</tr>
<tr>
<td>+</td>
<td>addition operator</td>
</tr>
<tr>
<td>-</td>
<td>subtraction operator</td>
</tr>
<tr>
<td>/</td>
<td>division operator</td>
</tr>
<tr>
<td>*</td>
<td>multiplication operator</td>
</tr>
<tr>
<td>++</td>
<td>increment operator increases the integer value by one</td>
</tr>
<tr>
<td>--</td>
<td>decrement operator decreases the integer value by one</td>
</tr>
</table>
</div>

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int a=40, b=20, add, sub, mul, div, mod;
   add = a + b;
   sub = a - b;
   mul = a * b;
   div = a / b;
   mod = a % b;

   printf("%d + %d : %d\n", a, b, add);
   printf("%d - %d : %d\n", a, b, sub);
   printf("%d * %d : %d\n", a, b, mul);
   printf("%d / %d : %d\n", a, b, div);
   printf("%d mod %d : %d\n", a, b, mod);

   return 0;
}</code>
</pre>

The difference between pre/post increment or decrement operators

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Operator</th>
<th>Description</th>
</tr>
<tr>
<td>Pre increment operator (<code>++i</code>)</td>
<td>value of <code>i</code> is incremented before assigning it to the variable <code>i</code></td>
</tr>
<tr>
<td>Post increment operator (<code>i++</code>}</td>
<td>value of <code>i</code> is incremented after assigning it to the variable <code>i</code></td>
</tr>
<tr>
<td>Pre decrement operator (<code>--i</code>)</td>
<td>value of <code>i</code> is decremented before assigning it to the variable <code>i</code></td>
</tr>
<tr>
<td>Post decrement operator (<code>i--</code>)</td>
<td>value of <code>i</code> is decremented after assigning it to the variable <code>i</code></td>
</tr>
</table>
</div>

Example for pre-increment operator

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int i=0;
   while(++i < 5 )
   {
       printf("%d ",i);
   }

   return 0;
}</code>
</pre>

Output:

<pre>
1 2 3 4
</pre>

How the code works
* Step 1: value of <code>i</code> is incremented from 0 to 1 using pre-increment operator
* Step 2: this incremented value <code>1</code> is compared with <code>5</code> in while expression
* Step 3: then, this incremented value <code>1</code> is assigned to the variable <code>i</code>
* Above 3 steps is continued until while expression becomes false

Example for post-increment operator

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int i=0;
   while(i++ < 5 )
   {
       printf("%d ", i);
   }

   return 0;
}</code>
</pre>

Output:

<pre>
1 2 3 4 5
</pre>

How the code works
* Step 1: value of <code>i</code> is compared with 5 in while expression
* Step 2: then, the value of <code>i</code> is incremented from 0 to 1 using post-increment operator
* Step 3: then, this incremented value <code>1</code> is assigned to the variable <code>i</code>
* Above 3 steps is continued until while expression becomes false

Example for pre-decrement operator

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int i=10;
   while(--i > 5 )
   {
       printf("%d ",i);
   }
   return 0;
}</code>
</pre>

Output:

<pre>
9 8 7 6
</pre>

How the code works
* Step 1: value of <code>i</code> is decremented from 10 to 9 using pre-decrement operator
* Step 2: this decremented value <code>9</code> is compared with <code>5</code> in while expression
* Step 3: then, this decremented value <code>9</code> is assigned to the variable <code>i</code>
* Above 3 steps is continued until while expression becomes false

Example for post-decrement operator

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int i=10;
   while(i-- > 5 )
   {
       printf("%d ",i);
   }
   return 0;
}</code>
</pre>

Output:

<pre>
9 8 7 6 5
</pre>

How the code works
* Step 1: value of <code>i</code> is compared with 5 in while expression
* Step 2: then, the value of <code>i</code> is decremented from 10 to 9 using post-decrement operator
* Step 3: then, this decremented value <code>9</code> is assigned to the variable <code>i</code>
* Above 3 steps is continued until while expression becomes false

##### Bitwise Operators
These are used to perform bit operations on given two variables.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Operator</th>
<th>Description</th>
</tr>
<tr>
<td>&</td>
<td>binary AND operator</td>
</tr>
<tr>
<td>^</td>
<td>binary OR operator</td>
</tr>
<tr>
<td>|</td>
<td>binary XOR operator</td>
</tr>
<tr>
<td>~</td>
<td>binary NOT operator</td>
</tr>
<tr>
<td>&lt;&lt;</td>
<td>binary left shift operator</td>
</tr>
<tr>
<td>&gt;&gt;</td>
<td>binary right shift operator</td>
</tr>
</table>
</div>

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   unsigned int a = 60;	/* 60 = 0011 1100 */
   unsigned int b = 13;	/* 13 = 0000 1101 */
   int c = 0;

   c = a & b;       /* 12 = 0000 1100 */
   printf("%d & %d = %d\n", a, b, c);

   c = a | b;       /* 61 = 0011 1101 */
   printf("%d | %d = %d\n", a, b, c);

   c = a ^ b;       /* 49 = 0011 0001 */
   printf("%d ^ %d = %d\n", a, b, c);

   c = ~a;          /*-61 = 1100 0011 */
   printf("~%d = %d\n", a, c);

   c = a << 2;     /* 240 = 1111 0000 */
   printf("%d << 2 = %d\n", a, c);

   c = a >> 2;     /* 15 = 0000 1111 */
   printf("%d >> 2 = %d\n", a, c);

   return 0;
}</code>
</pre>

##### Assignment Operators
These are used to assign the values for the variables.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int a = 4, b;
   b = a;
   printf("a = %d; b = a; b = %d\n", a, b);
   b += a;
   printf("a = %d; b += a; b = %d\n", a, b);   // b += a is same as b = b + a
   b -= a;
   printf("a = %d; b -= a; b = %d\n", a, b);   // b -= a is same as b = b - a
   b *= a;
   printf("a = %d; b *= a; b = %d\n", a, b);   // b *= a is same as b = b * a
   b /= a;
   printf("a = %d; b /= a; b = %d\n", a, b);    // b /= a is same as b = b / a
   b %= a;
   printf("a = %d; b %%= a; b = %d\n", a, b);   // b %= a is same as b = b % a
   b <<= a;
   printf("a = %d; b <<= a; b = %d\n", a, b);   // b <<= a is same as b = b << a
   b >>= a;
   printf("a = %d; b >>= a; b = %d\n", a, b);   // b >>= a is same as b = b >> a
   b &= a;
   printf("a = %d; b &= a; b = %d\n", a, b);   // b &= a is same as b = b & a
   b ^= a;
   printf("a = %d; b ^= a; b = %d\n", a, b);   // b ^= a is same as b = b ^ a
   b |= a;
   printf("a = %d; b |= a; b = %d\n", a, b);   // b |= a is same as b = b | a

   return 0;
}</code>
</pre>

##### Relational Operators
These are used to compare the value of two variables.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Operator</th>
<th>Description</th>
</tr>
<tr>
<td>==</td>
<td>check if the values of two variables equal or not</td>
</tr>
<tr>
<td>!=</td>
<td>check of the values of two variables equal or not</td>
</tr>
<tr>
<td>&gt;</td>
<td>check if the value of left variable is greater than the value of right variable</td>
</tr>
<tr>
<td>&lt;</td>
<td>check if the value of left variable is less than the value of right variable</td>
</tr>
<tr>
<td>&gt;=</td>
<td>check if the value of left variable is greater than or equal to the value of right variable</td>
</tr>
<tr>
<td>&lt;=</td>
<td>check if the value of left variable is less than or equal to the value of right variable</td>
</tr>
</table>
</div>

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int a = 21;
   int b = 10;

   if( a == b ) {
     printf("%d is equal to %d\n", a, b);
   } else {
     printf("%d a is not equal to %d\n", a, b);
   }

   if ( a < b ) {
     printf("%d is less than %d\n", a, b);
   } else {
     printf("%d is not less than %d\n", a, b);
   }

   if ( a > b ) {
     printf("%d is greater than %d\n", a, b);
   } else {
     printf("%d is not greater than %d\n", a, b);
   }

   /* Lets change value of a and b */
   a = 5;
   b = 20;

   if ( a <= b ) {
     printf("%d is either less than or equal to %d\n", a, b);
   } else {
     printf("%d is neither less than nor equal to %d\n", a, b);
   }

   if ( a >= b ) {
     printf("%d is either greater than  or equal to %d\n", a, b);
   } else {
     printf("%d is neither greater than nor equal to %d\n", a, b);
   }

   return 0;
}</code>
</pre>

##### Logical Operators
These are used to perform logical operations on the given two variables.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Operator</th>
<th>Description</th>
</tr>
<tr>
<td>&&</td>
<td>logical AND operator</td>
</tr>
<tr>
<td>||</td>
<td>logical OR operator</td>
</tr>
<tr>
<td>!</td>
<td>logical NOT operator</td>
</tr>
</table>
</div>

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   int m = 40, n = 20;
   int o = 20, p = 30;
   if (m > n && m != 0)
   {
     printf("%d > %d && %d != 0\n", m, n, m);
   }
   if (o > p || p != 20)
   {
     printf("%d > %d || %d != 20\n", o, p, p);
   }
   if (!(m > n && m != 0))
   {
     printf("!(%d > %d && %d != 0)\n", m, n, m);
   }

   return 0;
}</code>
</pre>

##### Ternary Operator
The syntax of C ternary operator is as follows

<pre>
condition ? expression 1 : expression 2
</pre>

If the condition is evaluated to be true, expression 1 is evaluated. If the condition is evaluated is to be false, expression 2 is evaluated.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;stdlib&gt;

/**
 * Find min of two integers
 * @param x
 * @param y
 * @return minimum value of x and y
 */
inline int min(int x, int y) { return x <= y ? x : y; }

int main(int argc, char** argv) {
    int x = 10;
    int y = 15;

    printf("x = %d, y = %d\n", x, y);
    printf("min(x, y) = %d\n", min(x, y));

    return (0);
}</code>
</pre>