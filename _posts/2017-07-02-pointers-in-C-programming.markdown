---
layout: post
title: Pointers in C Programming
date: 2018-07-02 13:49:10 +0700
description: Pointers in C Programming
img: pointer.jpg
tags: [C]
---
A pointer in C language is a variable which holds the address of another variable of same data type. Pointers are used to access memory and manipulate the address.

Whenever a variable is defined, a memory allocation is assigned for it to hold the assigned value. We can easily check this memory address using the &amp; symbol.

If <code>var</code> is the name of the variable, then <code>&var</code> will give its address.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main() {
   int var = 7;
   printf("Value of the variable var is: %d\n", var);
   printf("Memory address of the variable var is: %x\n", &var);

   return 0;
}</code>
</pre>
;
Like a variable, before using a pointer, you have to declare it. First, you specify the data type of the variable that the pointer point to. Second, you put an asterisk in front of the pointer name. Next you give the name for the pointer.

<pre>
<code data-language="c">int *ptr;</code>
</pre>

To initialize a pointer, you assign the memory address of another variable to the pointer.

<pre>
<code data-language="c">int a = 100;
int *ptr;
ptr = &a;</code>
</pre>

Once a pointer has been assigned the address of a variable, to access the value of the variable pointer, you use the indirection operator or dereferencing operator <code>*</code>.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
    int a, *p;  // declaring the variable and pointer
    a = 10;
    p = &a;     // initializing the pointer

    printf("value of a : %d", *p);    //this will print the value of 'a'
    printf("value of a : %d", *&a);   //this will also print the value of 'a'
    printf("address of a : %u", &a);    //this will print the address of 'a'
    printf("address of a : %u", p);     //this will also print the address of 'a'
    printf("address of p : %u", &p);    //this will print the address of 'p'

    return 0;
}</code>
</pre>

If you are not sure about which variable's address to assign to a pointer variable while declaration, it is recommended to assign a <code>NULL</code> variable to your pointer variable. A pointer which is assigned a <code>NULL</code> value is called a NULL pointer.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
    int *ptr = NULL;
    return 0;
}</code>
</pre>

##### Pointer to Pointer
When a pointer variable stores the address of another pointer variable, it's known as Pointer to Pointer variable or Double Pointer.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
    int  a = 10;
    int  *p1;   // used to store the address of a variable
    int  **p2;  // used to store the address of a variable pointer

    p1 = &a;
    p2 = &p1;

    printf("Address of a = %u\n", &a);
    printf("Address of p1 = %u\n", &p1);
    printf("Address of p2 = %u\n\n", &p2);

    // below print statement will give the address of 'a'
    printf("Value at the address stored by p2 = %u\n", *p2);

    printf("Value at the address stored by p1 = %d\n\n", *p1);

    printf("Value of **p2 = %d\n", **p2);   // read this *(*p2)

    return 0;
}</code>
</pre>

##### Pointer to Array
We can use a pointer to point to an array, and then we can use that pointer to access the array elements.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
    int i;
    int a[5] = {1, 2, 3, 4, 5};
    int *p = a;     // same as int *p = &a[0]
    for (i = 0; i < 5; i++)
    {
        printf("%d", *p);
        p++;
    }

    return 0;
}</code>
</pre>

The generalized form for using pointer with an array <code>*(a+i)</code> is the same as <code>a[i]</code>.

The generalized form for using pointer with multidimensional arrays <code>*(*(a + i) + j)</code>, which is the same as <code>a[i][j]</code>.

Pointer can also be used to create strings. Pointer variables of <code>char</code> type are treated as string.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
    char *str = "Hello";
    printf("%s\n", str);

    return 0;
}</code>
</pre>

The string created using <code>char</code> pointer can be assigned a value at runtime.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main()
{
    char *str;
    str  = "Hello"
    printf("%s\n", str);

    return 0;
}</code>
</pre>

We can also have array of pointers. Pointers are very helpful in handling character array with rows of varying length.

<pre>
<code data-language="c">char *name[3] = {
    "Adam",
    "chris",
    "Deniel"
};</code>
</pre>

##### Pointer to Structure
We can also have pointer to a single structure variable, but it is mostly used when we are dealing with array of structure variables.

A structure's member can be accessed through pointer in two ways
1. Accessing structure member through pointer by referencing pointer to another address to access the memory
2. Accessing structure member through pointer using dynamic memory allocation

Accessing structure member through pointer by referencing pointer to another address to access the memory

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
typedef struct person
{
   int age;
   float weight;
   char name[30];
};

int main()
{
    struct person person1;
    struct person *personPtr;
    personPtr = &person1;            // Referencing pointer to memory address of person1

    printf("Enter name: ");
    scanf("%s", (*personPtr).name);

    printf("Enter age: ");
    scanf("%d", &(*personPtr).age);

    printf("Enter weight: ");
    scanf("%f", &(*personPtr).weight);

    printf("Displaying: ");
    printf("%s\t%d\t%f\n", (*personPtr).name, (*personPtr).age, (*personPtr).weight);

    return 0;
}</code>
</pre>

Accessing structure member through pointer using dynamic memory allocation

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

struct person {
   int age;
   float weight;
   char name[30];
};

int main()
{
   struct person *ptr;
   int i, num;

   printf("Enter number of persons: ");
   scanf("%d", &num);

   ptr = (struct person*) malloc(num * sizeof(struct person));   // allocates the memory for n structures with pointer personPtr pointing to base address

   for(i = 0; i < num; ++i)
   {
       printf("Enter name, age and weight of the person respectively:\n");
       scanf("%s%d%f", (ptr+i)->name, &(ptr+i)->age, &(ptr+i)->weight);
   }

   printf("Displaying Infromation:\n");
   for(i = 0; i < num; ++i)
       printf("%s\t%d\t%.2f\n", (ptr+i)->name, (ptr+i)->age, (ptr+i)->weight);

   return 0;
}</code>
</pre>

##### Pointers as Function Argument
Pointer as a function argument is used to hold addresses of arguments passed during function call. This is also known as call by reference. When a function is called by reference any change made the reference variable will effect the original variable.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

void swap(int *a, int *b);

int main()
{
    int m = 10, n = 20;
    printf("m = %d\n", m);
    printf("n = %d\n\n", n);

    swap(&m, &n);    //passing address of m and n to the swap function
    printf("After Swapping:\n\n");
    printf("m = %d\n", m);
    printf("n = %d", n);
    return 0;
}

/*
    pointer 'a' and 'b' holds and
    points to the address of 'm' and 'n'
*/
void swap(int *a, int *b)
{
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}</code>
</pre>

A function can also return a pointer to the calling function.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int* larger(int*, int*);

void main()
{
    int a = 15;
    int b = 92;
    int *p;
    p = larger(&a, &b);
    printf("%d is larger", *p);
}

int* larger(int *x, int *y)
{
    if(*x > *y)
        return x;
    else
        return y;
}</code>
</pre>

##### Pointer to Function
A function pointer is a pointer that refers to the address of a function.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int sum(int x, int y)
{
    return x+y;
}

int main()
{
    int (*fp)(int, int);  // declaring a function pointer
    fp = sum;  // initializing a function pointer
    int s = fp(10, 15);
    printf("Sum is %d", s);

    return 0;
}</code>
</pre>

##### How to Read Complex C Variables
Reading C simple declarations

<pre>
<code data-language="c">int      foo[5];     // foo is an array of 5 ints
char    *foo;        // foo is a pointer to char
double   foo();      // foo is a function returning a double</code>
</pre>

<dl>
<dd><b>*</b> is read as <b>pointer to ...</b></dd>
<dd><b>[]</b> is read as <b>array of ...</b></dd>
<dd><b>()</b> is read as <b>function returning ...</b></dd>
</dl>

The "array of" <b>[]</b> and "function returning" <b>()</b> type operators have higher precedence than "pointer to"
<b>*</b>. So these are the rules to read complex variable declaration:
* always start with the variable name: foo is ...
* always end with the data type : foo is ... int
* the "filling in the middle" part can be summarized with this rule: "go right when you can, go left when you must"

We will start with a simple example

<pre>
<code data-language="c">long **foo[7];</code>
</pre>

Steps to read the declaration as follow
* start with the variable name and end with the data type: <br><span style="color:red;">long</span> **<span style="color:red;">foo</span>[7]<br><b><span style="color:red;">foo is</span> ... <span style="color:red;">long</span></b>
* then, the rule is to go right when you can: <br><span style="color:blue;">long</span> **<span style="color:blue;">foo</span><span style="color:red;">[7]</span><br><b><span style="color:blue;">foo is</span> <span style="color:red;">array of 7</span> ... <span style="color:blue;">long</span></b>
* because we've gone as far right as possible, now we go left:<br><span style="color:blue;">long</span> <span style="color:red;">**</span><span style="color:blue;">foo[7]</span><br><b><span style="color:blue;">foo is array of 7</span> <span style="color:red;">pointer to pointer to</span> <span style="color:blue;">long</span></b>

Next, we will start with a more complex example

<pre>
<code data-language="c">char *(*(**foo [][8])())[];</code>
</pre>

Steps to read the declaration as follow
* start with the variable name and end with the data type:<br><span style="color:red;">char</span> &#42;(&#42;(&#42;&#42;<span style="color:red;">foo</span> [][8])())[]<br><b><span style="color:red;">foo is</span> ... <span style="color:red;
">char</span></b>
* the rule is to go right when you can: <br><span style="color:blue;">char</span> &#42;(&#42;(&#42;&#42;<span style="color:blue;">foo</span> <span style="color:red;">[]</span>[8])())[]<br><b><span style="color:blue;">foo is</span> <span style="color:red;">array of</span> ... <span style="color:blue;">char</span></b>
* because we still can go right then we go right: <br><span style="color:blue;">char</span> &#42;(&#42;(&#42;&#42;<span style="color:blue;">foo</span> <span style="color:blue;">[]</span><span style="color:red;">[8]</span>)())[]<br><b><span style="color:blue;">foo is</span> <span style="color:blue;">array of</span> <span style="color:red;">array of 8</span> ... <span style="color:blue;">char</span></b>
* now, we've hit parenthesis used for grouping and this halts our march to the right. So we have to backtrack to the left: <br><span style="color:blue;">char</span> &#42;(&#42;(&#42;<span style="color:red;">&#42;</span><span style="color:blue;">foo</span> <span style="color:blue;">[][8]</span>)())[]<br><b><span style="color:blue;">foo is</span> <span style="color:blue;">array of array of 8</span> <span style="color:red;">pointer to</span> ... <span style="color:blue;">char</span></b>
* we still can go left: <br><span style="color:blue;">char</span> &#42;(&#42;(<span style="color:red;">&#42;</span><span style="color:blue;">&#42;</span><span style="color:blue;">foo</span> <span style="color:blue;">[][8]</span>)())[]<br><b><span style="color:blue;">foo is</span> <span style="color:blue;">array of array of 8 pointer to</span> <span style="color:red;">pointer to</span> ... <span style="color:blue;">char</span></b>
* now we've hit parenthesis used for grouping, this finished off the entire parenthesized subexpression. then we go
right again: <br><span style="color:blue;">char</span> &#42;(&#42;<span style="color:blue;">(&#42;&#42;foo[][8])</span><span style="color:red;">()</span>)[]<br><b><span style="color:blue;">foo is array of array of 8 pointer to pointer to</span> <span style="color:red;">function returning</span> ... <span style="color:blue;">char</span></b>
* again we are backtracking to the left: <br><span style="color:blue;">char</span> &#42;(<span style="color:red;">&#42;</span><span style="color:blue;">(&#42;&#42;foo[][8])</span><span style="color:blue;">()</span>)[]<br><b><span style="color:blue;">foo is array of array of 8 pointer to pointer to function returning</span> <span style="color:red;">pointer to</span> ... <span style="color:blue;">char</span></b>
* again we hit grouping parenthesis, so backtrack to the right: <br><span style="color:blue;">char</span> &#42;(<span style="color:blue;">&#42;(&#42;&#42;foo[][8])()</span>)<span style="color:red;">[]</span><br><b><span style="color:blue;">foo is array of array of 8 pointer to pointer to function returning pointer to</span> <span style="color:red;">array of</span> ... <span style="color:blue;">char</span></b>
* finally, we're left with only "pointer to" on the left: <br><span style="color:blue;">char</span> <span style="color:red;">&#42;</span><span style="color:blue;">(&#42;(&#42;&#42;foo[][8])())[]</span><br><b><span style="color:blue;">foo is array of array of 8 pointer to pointer to function returning pointer to array of</span> <span style="color:red;">pointer to</span> <span style="color:blue;">char</span></b>

Things to notice when declaring complex variables:
* can't have <b>array of function returning</b>. Use <b>array of pointer to function returning</b> instead
* Functions can't return functions. Use <b>function returning pointer to function returning</b> instead
* in arrays, only the leftmost [] can be undimensioned. <code>char foo[]</code> and <code>char foo[][5]</code> are legal, but <code>char foo[5][]</code> is not
* <code>void</code> type is restricted. <b>pointer to void</b> <code>void *foo</code> and <b>function returning void</b> <code>void foo()</code> are legal, but <b>array of void</b> <code>void char[]</code> and declaring a variable of type <code>void</code> are not legal