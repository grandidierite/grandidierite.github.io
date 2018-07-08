---
layout: post
title: Dynamic Memory Allocation in C Programming
date: 2018-07-08 13:32:20 +0700
description: Dynamic Memory Allocation in C Programming
img: dynamic.jpg
tags: [C]
---
The process of allocating memory at runtime is known as dynamic memory allocation. Library routines known as memory management functions are used for allocating and freeing memory during execution of a program. These functions are defined in stdlib.h header file.

Global variables, static variables, and program instructions get their memory in permanent storage area whereas local variables are stored in a memory area called stack.

The memory space between these two region is known as Heap area. This region is used for dynamic memory allocation during execution of the program. The size of heap keep changing

Up until now in our programs, we have been using static memory allocation. In static memory allocation the size of the program is fixed, we cannot increase or decrease size while the program is running.

##### The malloc() Function
<code>malloc()</code> function is used for allocating block of memory at runtime. This function reserves a block of memory of the given size and returns a pointer of type <code>void</code>. This means that we can assign it to any type of pointer using typecasting. If it fails to allocate enough space as specified, it returns a <code>NULL</code> pointer.

Syntax

<pre>
<code data-language="c">void *malloc(size_t size);</code>
</pre>

This function accepts a single argument called <code>size</code> which is of type <code>size_t</code>. The <code>size_t</code> is defined as <code>unsigned int</code> in <code>stdlib.h</code>.

If successful, <code>malloc()</code> returns a void pointer. Before you can use the pointer you must cast it to the appropriate type.

<pre>
<code data-language="c">int *p; // p is pointer to int or (int*)
p = (int*)malloc(20); // allocate 20 bytes</code>
</pre>

This statement allocates 20 contagious bytes of memory from the heaps and assigns the address of the first byte to variable <code>p</code>.

As we know the size of data types in C vary from system to system, that's why <code>malloc()</code> function is used in conjunction with the <code>sizeof</code> operator.

<pre>
<code data-language="c">int *p; // p is pointer to int or (int*)
p = (int*)malloc(5*sizeof(int)); // allocate sufficient memory for 5 integers</code>
</pre>

When the heap runs out of free space, <code>malloc()</code> function returns <code>NULL</code>. So before using the pointer variable in any way,we must first always check the value returned by <code>malloc()</code> function.

<pre>
<code data-language="c">if(p == NULL)
{
    printf("Memory allocation failed");
    exit(1); // exit the program
}</code>
</pre>

The following example demonstrates how to use the <code>malloc()</code> function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#include&lt;stdlib.h&gt;

int main()
{
    float *p, sum = 0;
    int i, n;

    printf("Enter the number of students: ");
    scanf("%d", &n);

    // allocate memory to store n variables of type float
    p = (float*)malloc(n*sizeof(float));

    // if dynamic allocation failed exit the program
    if(p==NULL)
    {
        printf("Memory allocation failed");
        exit(1); // exit the program
    }

    // ask the student to enter marks
    for(i = 0; i < n; i++)
    {
        printf("Enter marks for %d student: ", i+1);
        scanf("%f", p+i);
    }

    // calculate sum
    for(i = 0; i < n; i++)
    {
        sum += *(p+i);
    }

    printf("\nAverage marks = %.2f\n", sum/n);

    return 0;
}</code>
</pre>

##### The calloc() Function
<code>calloc()</code> is another memory allocation function that is used for allocating memory at runtime. <code>calloc()</code> function is normally used for allocating memory to derived data types such as arrays and structures. If it fails to allocate enough space as specified, it returns a <code>NULL</code> pointer.

Syntax

<pre>
<code data-language="c">void *calloc(size_t n, size_t size);</code>
</pre>

It accepts two arguments where the first argument is the number of the element, and the second argument is the size of the elements. Let's say we want to allocate memory for 5 integers, in this case, 5 is the number of the elements and the size of each element is 4 bytes (may vary from system to system). Here is how you can allocate memory for 5 integers using <code>calloc()</code>.

<pre>
<code data-language="c">int *p;
p = (int*)calloc(5, 4);</code>
</pre>

This allocates 20 bytes of contagious memory space from the heap and assigns the address of first allocated byte to pointer variable <code>p</code>.

You can achieve the same thing using <code>malloc()</code> function.

<pre>
<code data-language="c">int *p;
p = (int*)malloc(5 * 4);</code>
</pre>

To the code more portable and more readable <code>sizeof</code> operator is used in conjunction with <code>calloc()</code>.

<pre>
<code data-language="c">int *p;
p = (int*)calloc(5, sizeof(int));</code>
</pre>

The difference between <code>calloc()</code> and <code>malloc()</code> function is that memory allocated by <code>malloc
()</code> contains garbage value while memory allocated by <code>calloc()</code> is always initialized to 0.

The following example demonstrates how to use the <code>calloc()</code> function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#include&lt;stdlib.h&gt;

int main()
{
    int *p, i, n;

    printf("Enter the size of the array: ");
    scanf("%d", &n);

    p = (int*)calloc(n, sizeof(int));

    if(p==NULL)
    {
        printf("Memory allocation failed");
        exit(1); // exit the program
    }

    for(i = 0; i < n; i++)
    {
        printf("Enter %d element: ", i);
        scanf("%d", p+i);
    }
    printf("\nprinting array of %d integers\n\n", n);

    // calculate sum
    for(i = 0; i < n; i++)
    {
        printf("%d ", *(p+i));
    }

    return 0;
}</code>
</pre>

##### The realloc() Function
The <code>realloc()</code> function allows you to change the size of the memory block allocated by the <code>malloc()</code> or <code>calloc()</code> function.

Syntax

<pre>
<code data-language="c">void *realloc(void *ptr, size_t newsize);</code>
</pre>

<code>realloc()</code> function accepts two arguments, the first argument is a pointer to the first byte of memory that was previously allocated using <code>malloc()</code> or <code>calloc()</code> function. The second argument specifies the new size of the block in bytes, which may be smaller or larger than the original size.

<pre>
<code data-language="c">int *p;
p = (int*)malloc(5*sizeof(int)); // allocate memory for 5 integers

// allocate memory for 6 more integers integers i.e a total of 11 integers
p = (int*)realloc(p, 11*sizeof(int));</code>
</pre>

If <code>realloc()</code> fails to expand memory as requested then it retuns <code>NULL</code>, the data in the old
memory remains unaffected.

The following example demonstrates how to use <code>realloc()</code> function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#include&lt;stdlib.h&gt;

int main()
{
    int *p, i, n;

    printf("Initial size of the array is 4\n\n");
    p = (int*)calloc(4, sizeof(int));

    if(p==NULL)
    {
        printf("Memory allocation failed");
        exit(1); // exit the program
    }

    for(i = 0; i < 4; i++)
    {
        printf("Enter element at index %d: ", i);
        scanf("%d", p+i);
    }

    printf("\nIncreasing the size of the array by 5 elements ...\n ");

    p = (int*)realloc(p, 9 * sizeof(int));

    if(p==NULL)
    {
        printf("Memory allocation failed");
        exit(1); // exit the program
    }

    printf("\nEnter 5 more integers\n\n");

    for(i = 4; i < 9; i++)
    {
        printf("Enter element at index %d: ", i);
        scanf("%d", p+i);
    }

    printf("\nFinal array: \n\n");

    for(i = 0; i < 9; i++)
    {
        printf("%d ", *(p+i) );
    }

    return 0;
}</code>
</pre>

##### The free() Function
Memory is a limited resource, therefore, you should always deallocate or release the memory back when it is no longer
used. To deallocate the memory that you have allocated, you use the <code>free()</code> function.

Syntax

<pre>
<code data-language="c">void free(void *ptr)</code>
</pre>

<code>free()</code> accepts one argument which is the pointer to a memory block previously allocated using <code>malloc()</code> or <code>calloc()</code> function.

The following example shows how to use <code>free()</code> function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#include&lt;stdlib.h&gt;

int main()
{
    int *p, i, n;

    printf("Initial size of the array is 4\n\n");
    p = (int*)calloc(4, sizeof(int));

    if(p==NULL)
    {
        printf("Memory allocation failed");
        exit(1); // exit the program
    }

    for(i = 0; i < 4; i++)
    {
        printf("Enter element at index %d: ", i);
        scanf("%d", p+i);
    }

    printf("\nIncreasing the size of the array by 5 elements ...\n ");

    p = (int*)realloc(p, 9 * sizeof(int));

    if(p==NULL)
    {
        printf("Memory allocation failed");
        exit(1); // exit the program
    }

    printf("\nEnter 5 more integers\n\n");

    for(i = 4; i < 9; i++)
    {
        printf("Enter element at index %d: ", i);
        scanf("%d", p+i);
    }

    printf("\nFinal array: \n\n");

    for(i = 0; i < 9; i++)
    {
        printf("%d ", *(p+i) );
    }

    printf("Deallocate allocated memory ...\n ");
    free(p);

    return 0;
}</code>
</pre>