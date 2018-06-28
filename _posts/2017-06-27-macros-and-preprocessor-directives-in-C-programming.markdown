---
layout: post
title: Preprocessor Directives and Macros in C Programming
date: 2018-06-27 16:14:10 +0700
description: Preprocessor Directives and Macros in C Programming
img: directive.jpg
tags: [C]
---
The C Preprocessor, often known as CPP is a macro processor that is used by the C compiler to transform your program before compilation. It is called a macro processor because it allows you to define macros.

Preprocessor directives begin with a &#35; symbol. Preprocessor directives are used to define and replace tokens in the text and also used to insert the contents of other files into the source file. In C program, collection of all keywords, identifiers, operators, special symbols, constants, strings and data values are called as tokens.

##### &#35;define Directive
This directive defines macros. There are two types of macros: those with parameters and those without parameters.

Example of macro without parameters

<pre>
 <code data-language="c">// Program to display the area of circle
 #include &lt;stdio.h&gt;
 #define PI 3.1415
 int main() {
    float radius, area;

    printf("Enter the radius of circle: ");
    scanf("%d", &radius);

    area = PI*radius*radius;
    printf("Area of circle = %.2f\n", area);

    return 0;
 }</code>
</pre>

In pre-processing stage, <code>PI</code> will be replaced by <code>3.14</code>, so <code>PI*radius*radius</code> will be <code>3.14*radius*radius</code>.

Example of macro with parameters

<pre>
 <code data-language="c">// Program to display the area of circle
 #include &lt;stdio.h&gt;
 #define PI 3.1415
 #define circleArea(r) (PI*r*r)
 int main() {
    int radius;
    float area;

    printf("Enter the radius of circle: ");
    scanf("%d", &radius);

    area = circleArea(radius);
    printf("Area of circle = %.2f\n", area);

    return 0;
 }</code>
</pre>

In pre-processing stage, <code>circleArea(radius)</code> will be replaced by <code>3.14*r*r</code>.

Macros are often used to execute a sequence of multiple statements as a group. When multiple statements are used in a macro, they should be bound in a <code>do-while</code> loop syntactically, so the macro can appear safely inside a statement block that doesn't use braces (when a statement block uses braces, then multiple statements in a macro will expand correctly event without a <code>do-while</code> loop).

In this noncompliant code example, the macro contains multiple unbound statements

<pre>
 <code data-language="c">#include &lt;stdio.h&gt;
 #define SWAP(x, y) \
   tmp = x; \
   x = y; \
   y = tmp

 int main() {
    int x, y, z, tmp;
    if (z == 0)
      SWAP(x, y);

    return 0;
 }</code>
</pre>

It will expand to the following, which is certainly not what the programmer intended

<pre>
 <code data-language="c">#include &lt;stdio.h&gt;
 #define SWAP(x, y) \
   tmp = x; \
   x = y; \
   y = tmp

 int main() {
    int x, y, z, tmp;
    if (z == 0)
      tmp = x;
    x = y;
    y = tmp;

    return 0;
 }</code>
</pre>

Next, in this noncompliant code example, the macro contains multiple statements bounded with a curly parenthesis

<pre>
 <code data-language="c">#include &lt;stdio.h&gt;
 #define SWAP(x, y) { tmp = (x); (x) = (y); (y) = tmp; }

 int main() {
    int x, y, z, tmp;
    if (x > y)
      SWAP(x, y);  /* Branch 1 */
     else
       do_something();  /* Branch 2 */

    return 0;
 }</code>
</pre>

the macro will fail to expand and will be interpreted as an if statement with only one branch

<pre>
 <code data-language="c">#include &lt;stdio.h&gt;
 #define SWAP(x, y) { tmp = (x); (x) = (y); (y) = tmp; }

 int main() {
    int x, y, z, tmp;
    if (x > y) { /* Single-branch if-statement!!! */
      tmp = x;   /* The one and only branch consists */
      x = y;     /* of the block. */
      y = tmp;
    }
    ;            /* Empty statement */
    else         /* ERROR!!! "parse error before else" */
      do_something();

    return 0;
 }</code>
</pre>

So what is the compliant solution for this case? That is wrapping the macro inside a <code>do-while</code> loop.

<pre>
 <code data-language="c">#include &lt;stdio.h&gt;
 #define SWAP(x, y) \
   do { \
     tmp = (x); \
     (x) = (y); \
     (y) = tmp; } \
   while (0)

 int main() {
    int x, y, z, tmp;
    if (x > y)
      SWAP(x, y);
    else
      do_something();

    return 0;
 }</code>
</pre>

The <code>do-while</code> will always be executed exactly once.

##### &#35;include Directive
The &#35;include directive is used to include header files to a C program. &#35;include directive has two variants:
<code>#include &lt;file&gt;</code> and <code>#include "file"</code>.

<code>#include &lt;file&gt;</code> searches for a file named <i>file</i> in a defined places by compiler. GCC compiler looks in several different places for headers. You can see where it looks for header files by using this command

<pre>
 <code data-language="c">cpp -v</code>
</pre>

![Include directories](/assets/img/include.jpg){:class="img-responsive"}

<code>#include "file"</code> searches for a file named <i>file</i> first in the directory containing the current file, if it's still not found then it continues in the defined places by compiler.

If you want to add additional directories to the search path, you can specify multiple <code>-I<i>dir</i></code> options.

If a header file happens to be included twice, the compiler will process its content twice. This is very likely to cause error. The standard wy to prevent this is to enclose the entire real contents of the file in a conditional, like this

<pre>
 <code data-language="c">/* File foo.  */
 #ifndef FILE_FOO_SEEN
 #define FILE_FOO_SEEN

 the entire file

 #endif /* !FILE_FOO_SEEN */</code>
</pre>

##### &#35;ifdef Directive
The &#35;ifdef directive checks for the existence of macro defenitions.

The following example defines <code>MAX_LEN</code> to be 75 if <code>EXTENDED</code> is defined for the preprocessor. Otherwise, <code>MAX_LEN</code> is defined to be 50.

<pre>
 <code data-language="c">#ifdef EXTENDED
 #   define MAX_LEN 75
 #else
 #   define MAX_LEN 50
 #endif</code>
</pre>

##### &#35;ifndef Directive
The &#35;ifndef directive checks whether a macro is not defined.

The following example defines <code>MAX_LEN</code> to be 50 if <code>EXTENDED</code> is not defined for the preprocessor. Otherwise, <code>MAX_LEN</code> is defined to be 75.

<pre>
 <code data-language="c">#ifndef EXTENDED
 #   define MAX_LEN 50
 #else
 #   define MAX_LEN 75
 #endif</code>
</pre>

##### &#35;if Directive
The &#35;if directive allows you to test the value of an arithmetic expression, rather than the mere existence of one macro.

The expression of &#35;if directive may contain
* integer constants
* character constants
* arithmetic operators for addition, subtraction, multiplication, division, bitwise operations, shifts, comparisons, and logical operations
* Uses of the <code>defined</code> operator, which lets you check whether macros are defined
* Identifiers that are not macros is considered false (zero), function-like macros used without their function call parentheses are also treated as false (zero)

<pre>
 <code data-language="c">#if DLEVEL > 5
     #define SIGNAL  1
     #if STACKUSE == 1
         #define STACK   200
     #else
         #define STACK   100
     #endif
 #else
     #define SIGNAL  0
     #if STACKUSE == 1
         #define STACK   100
     #else
         #define STACK   50
     #endif
 #endif
 #if DLEVEL == 0
     #define STACK 0
 #elif DLEVEL == 1
     #define STACK 100
 #elif DLEVEL > 5
     display( debugptr );
 #else
     #define STACK 200
 #endif</code>
</pre>

##### &#35;undef Directive
If a macro ceases to be useful, it may be undefined with &#35;undef directive.

<pre>
 <code data-language="c">#undef MAX_LEN</code>
</pre>

##### &#35;line Directive
The &#35;line directive supplies line numbers for compiler messages. It causes the compiler to view the line number of the next source line as the specified number.

You can use &#35;line directives to make the compiler provide more meaningful error messages.

<pre>
 <code data-language="c">#include &lt;stdio.h&gt;
 #define LINE200 200

 int main(void)
 {
    func_1();
    func_2();
 }

 #line 100
 func_1()
 {
    printf("Func_1 - the current line number is %d\n",__LINE__);
 }

 #line LINE200
 func_2()
 {
    printf("Func_2 - the current line number is %d\n",__LINE__);
 }</code>
</pre>

##### &#35;error Directive
The &#35;error directive causes the preprocessor to generate an error message and causes the compilation to fail.

<pre>
 <code data-language="c">#define BUFFER_SIZE 255

 #if BUFFER_SIZE < 256
 #error "BUFFER_SIZE is too small."
 #endif</code>
</pre>

##### &#35;warning Directive
The &#35;warning directive is like &#35;error, but causes the preprocessor to issue a warning and continue preprocessing.

##### &#35; Operator
The &#35; operator converts a parameter of a function-like macro into a character string literal. For example, if macro <code>ABC</code> is defined using the following directive:

<pre>
 <code data-language="c">#define ABC(x)   #x</code>
</pre>

all subsequent invocations of the macro <code>ABC</code> would be expanded into a character string literal containing the argument passed to <code>ABC</code>. <code>ABC(100)</code> would be expanded into a character string <code>"100"</code> and <code>ABC(Hello World)</code> would be expanded into <code>"Hello World"</code>.

The &#35; operator rules in a function-like macro
* white-space characters that appear after or before the argument passed to the macro are deleted
* multiple white-space characters embedded within the argument passed to the macro are replaced by a single space character
* if the argument passed to the macro contains a string literal and if a backslash &#92; character appears within the literal, a second &#92; character is inserted before the original &#92; when the macro is expanded
* if the argument passed to the macro contains a &quot; (double quotation mark) character, a &#92; is inserted before the &quot; when the macro is expanded
* the conversion of an argument into a string literal occurs before macro expansion on that argument
* if more than one &#35; operator appears in the replacement list of a macro definition, the order of evaluation of the operators is not defined
* if the result of the macro expansion is not a valid character string literal, the behaviour is undefined

<pre>
<code data-language="c">#define STR(x)        #x
#define XSTR(x)       STR(x)
#define ONE           1</code>
</pre>

<table>
<tr>
<th>Invocation</th>
<th>Result of Macro Expansion</th>
</tr>
<tr>
<td><code>STR(\n "\n" '\n')</code></td>
<td><code>"\n \"\\n\" '\\n'"</code></td>
</tr>
<tr>
<td><code>STR(ONE)</code></td>
<td><code>"ONE"</code></td>
</tr>
<tr>
<td><code>XSTR(ONE)</code></td>
<td><code>"1"</code></td>
</tr>
<tr>
<td><code>XSTR("hello")</code></td>
<td><code>"\"hello\""</code></td>
</tr>
</table><br>

##### null directive (&#35;)
The null directive performs no action. It consists of a single &#35; on a line of its own.

In the following example, if <code>MINVAL</code> is a defined macro name, no action is performed. If <code>MINVAL</code> is not defined, it is defined 1.

<pre>
<code data-language="c">#ifdef MINVAL
  #
#else
  #define MINVAL 1
#endif</code>
</pre>

##### &#35;&#35; Operator
The &#35;&#35; (double number sign) operator concatenates two tokens in a macro invocation (text and/or arguments) given in a macro definition.

The &#35;&#35; (double number sign) operator rules
* concatenation take place before any macros in arguments are expanded
* if more than one &#35;&#35; operator appears in the replacement list of a macro definition, the order of evaluation of the operators is not defined

<pre>
<code data-language="c">#define ArgArg(x, y)          x##y
#define ArgText(x)            x##TEXT
#define TextArg(x)            TEXT##x
#define TextText              TEXT##text
#define Jitter                1
#define bug                   2
#define Jitterbug             3</code>
</pre>

<table>
<tr>
<th>Invocation</th>
<th>Result of Macro Expansion</th>
</tr>
<tr>
<td><code>ArgArg(lady, bug)</code></td>
<td><code>ladybug</code></td>
</tr>
<tr>
<td><code>ArgText(con)</code></td>
<td><code>conTEXT</code></td>
</tr>
<tr>
<td><code>TextArg(book)</code></td>
<td><code>TEXTbook</code></td>
</tr>
<tr>
<td><code>TextText</code></td>
<td><code>TEXTtext</code></td>
</tr>
<tr>
<td><code>ArgArg(Jitter, bug)</code></td>
<td><code>3</code></td>
</tr>
</table><br>


##### Predefined Macros
There are some predefined macros in C programming.

<table>
<tr>
<th>Predefined Macro</th>
<th>Description</th>
</tr>
<tr>
<td><code>__DATE__</code></td>
<td>String containing the current date</td>
</tr>
<tr>
<td><code>__FILE__</code></td>
<td>String containing the file name</td>
</tr>
<tr>
<td><code>__LINE__</code></td>
<td>Integer representing the current line number</td>
</tr>
<tr>
<td><code>__TIME__</code></td>
<td>String containing the current time</td>
</tr>
<tr>
<td><code>__STDC__</code></td>
<td>The integer 1 indicates that the C compiler supports the ISO C standard</td>
</tr>
</table>
<br>
<pre>
<code data-language="c">#include &lt;stdio.h&gt;
int main()
{
   printf("Current time: %s\n",__TIME__);
   printf("Current time: %s\n",__DATE__);
   printf("Current time: %s\n",__FILE__);
   printf("Current time: %d\n",__LINE__);
   printf("Current time: %d\n",__STDC__);

   return 0;
}</code>
</pre>