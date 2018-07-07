---
layout: post
title: Constants and Arrays in C Programming
date: 2018-07-01 11:19:20 +0700
description: Constants and Arrays in C Programming
img: array.jpg
tags: [C]
---
##### Constants
C constants are also like normal variables. But only difference is, their values cannot be modified once they are defined. Constants refer to fixed values. They are also called as literals. If you try to change constant values after defining, it will produce errors.

There are two simple ways in C to define constants
* using <code>#define</code> preprocessor
* using <code>const</code> keyword

By convention, the name of constants are in upper case.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define PI 3.14159

int main() {
   int diameter = 20;

   /* calculate square of a circle */
   double square = PI * diameter;

   printf("Square of the circle is %8.2f\n",square);

   /* total value of a product */
   const double TAXRATE = 0.1;
   double net = 100;

   double total = net + net * TAXRATE;

   printf("Total = %8.2f\n",total);

   return 0;
}</code>
</pre>

##### Declaring Arrays
An array is a data structure that stores a collection of values of the same type.

In order to declare an array, you need to specify
* the data type of the array's elements
* the name of the array
* the number of elements that array may contain

For example, you can declare an array that holds 10 integers as follows:

<pre>
<code data-language="c">int a[10];</code>
</pre>

When you declare an array, the compiler allocates a memory block that holds the entire array. The array elements are stored sequentially in the memory.

Index of an array starts from 0 to size of array - 1. The first element of <code>a</code> array will be stored at <code>a[0]</code> address and the last element will occupy <code>a[9]</code>.

##### Initializing Arrays
You can initialize an array in C either one by one

<pre>
<code data-language="c">int a[5];
a[0] = 2;
a[1] = 1;
a[2] = 3;
a[3] = 7;
a[4] = 8;</code>
</pre>

or using a single statement

<pre>
<code data-language="c">int a[5] = {2,1,3,7,8};</code>
</pre>

The number of values between braces {} cannot be larger than the number of elements between square brackets [].

If you omit the size of the array, the compiler will create an array with the size that is sufficient enough to hold the initialized values.

<pre>
<code data-language="c">int a[] = {2,1,3,7,8};</code>
</pre>

If you initialize just only few array elements, you will not know exact values of the uninitialized elements when the program executes

<pre>
<code data-language="c">int a[5] = {2,1,3};</code>
</pre>

The <code>a[3]</code> and <code>a[4]</code> can hold any integer values.

##### Accessing Array Elements
You can access an individual element of the array by using the array name followed by the index of the element within square brackets

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
   const int SIZE = 5;
   int a[SIZE];
   int i;
   for(i = 0; i < SIZE; i++)
   {
       a[i] = i;
       printf("a[%d] = %d\n",i,a[i]);
   }
}</code>
</pre>

##### Declaring and Initializing Multidimensional Arrays
You can declare a multidimensional array as follows

<pre>
 <code data-language="c">int matrix[3][3];</code>
</pre>

You can initialize a multidimensional array as follows

<pre>
<code data-language="c">int matrix[3][3] =
{
   {11,12,13},
   {21,22,23},
   {32,31,33},
};</code>
</pre>

In the following example, first, we declare a two-dimensional array of integers with two rows and three columns. Next we use the <code>scanf()</code> function to read the number from user's inputs. Then, we display the array content on the screen.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

const int ROW = 2;
const int COLUMN = 3;

void fill_array(int (*pm)[COLUMN],int row);
void display(int m[][COLUMN],int row);

int main()
{
    int i, j;
    int m[ROW][COLUMN];

    /* fill array's elements */
    fill_array(m, ROW);

    /* display array's elements */
    display(m, ROW);

    return 0;
}

void fill_array(int (*pm)[COLUMN],int row)
{

    int i, j;
    printf("Please fill the array's content:\n");

    /* fill array's elements */
    for(i = 0; i < row; i++)
    {
        for(j = 0; j < COLUMN; j++)
        {
            printf("\nm[%d][%d]:",i,j);
            scanf("%d",&pm[i][j]);
        }
    }
}

void display(int m[][COLUMN],int row)
{
    int i, j;
    printf("Array's content:\n");

    /* display array's elements */
    for(i = 0; i < row; i++)
    {
        for(j = 0; j < COLUMN; j++)
        {
            printf("%d\t",m[i][j]);
        }
        printf("\n");
    }

}</code>
</pre>
