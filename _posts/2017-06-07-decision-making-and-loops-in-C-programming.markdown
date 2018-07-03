---
layout: post
title: Decision Making and Loops in C Progamming
date: 2018-06-07 13:32:20 +0700
description: Decision Making and Loops in C Progamming
img: flowcontrol.jpg
tags: [C]
---
###### if Statement

The <code>if</code> statement evaluates the test expression inside the parenthesis. If the test expresssion is evaluated
to true (nonzero), statements inside the body of <code>if</code> are executed. If the test expression is evaluated to
false, statements inside the body of <code>if</code> are skipped from execution.

<pre>
<code data-language="c">// Program to display a number if user enters negative number
// If user enters positive number, that number won't be displayed
#include &lt;stdio.h&gt;

int main() {
   int number;

   printf("Enter an integer: ");
   scanf("%d", &number);

   if(number < 0) {
      printf("You entered %d.\n", number);
   }

   printf("This is the end of the program.\n");

   return 0;
}</code>
</pre>

When you enters -3, the test expression becomes true. Hence, the text "You entered -3." is displayed on the screen. When you enters 12, the test expression becomes false and the statement inside the body of <code>if</code> is skipped.

###### if...else Statement

If the test expression is evaluated to true, statements inside the body of <code>if</code> are executed and statements inside the body of <code>else</code> are skipped. If the test expression is evaluated to false, statements inside the body of <code>else</code> are executed and statements inside the body of <code>if</code> are skipped.

<pre>
<code data-language="c">// Program to check whether an integer entered by user is even or odd
#include &lt;stdio.h&gt;

int main() {
   int number;

   printf("Enter an integer: ");
   scanf("%d", &number);

   // true if remainder is 0
   if(number % 2 == 0) {
      printf("%d is an even integer.\n", number);
   } else {
      printf("%d is an odd integer.\n", number);
   }

   printf("This is the end of the program.\n");

   return 0;
}</code>
</pre>

###### if...else if...else Statement

The <code>if...else if...else</code> statement allows you to check for multiple test expressions.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

int main() {
   int number1, number2;
   printf("Enter two integers: ");
   scanf("%d %d", &number1, &number2);

   //checks if two integers are equal.
   if(number1 == number2)
   {
       printf("Result: %d = %d.\n", number1, number2);
   }
   //checks if number1 is greater than number2.
   else if (number1 > number2)
   {
       printf("Result: %d > %d.\n", number1, number2);
   }
   // if both test expression is false
   else
   {
       printf("Result: %d < %d.\n", number1, number2);
   }

   printf("This is the end of the program.\n");

   return 0;
}</code>
</pre>

###### for Loop Statement

The syntax of <code>for</code> loop

<pre>
<code data-language="c">for(variable-initialization, condition, variable-update) {
   // Body of for loop
}</code>
</pre>

<ul>
<li>variable-initialization contain loop counter variable initialization statements. It defines starting point of the
loop</li>
<li>condition contain boolean expressions and works like <code>if...else</code>. If boolean expression is true, then executes the body of loop and terminates the loop otherwise</li>
<li>variable-update contain loop counter update statements</li>
</ul>

<pre>
<code data-language="c">// Program to calculate the sum of first n natural numbers
// Positive integers 1,2,3,...n are known as natural numbers
#include &lt;stdio.h&gt;

int main() {
   int num, count, sum = 0;

   printf("Enter a positive integer: ");
   scanf("%d", &num);

   // for loop terminates when n is less than count
   for(count = 1; count <= num; ++count)
   {
       sum += count;
   }

   printf("Sum = %d", sum);

   return 0;
}</code>
</pre>

###### while Loop Statement

The syntax of <code>while</code> loop

<pre>
<code data-language="c">while(test expression) {
   // Body of for loop
}</code>
</pre>

If the test expression is true, codes inside the body of <code>while</code> loop are executed and then the test expression is evaluated again. The process goes on until the test expression is false. When the test expression is false, the <code>while</code> loop is terminated.

<pre>
<code data-language="c">// Program to find factorial of a number
#include &lt;stdio.h&gt;

int main() {
   int number;
   long long factorial;

   printf("Enter an integer: ");
   scanf("%d",&number);

   factorial = 1;

   // loop terminates when number is less than or equal to 0
   while (number > 0)
   {
       factorial *= number;  // factorial = factorial*number;
       --number;
   }

   printf("Factorial= %lld", factorial);

   return 0;
}</code>
</pre>

###### do...while Loop Statement

The syntax of <code>do...while</code> loop

<pre>
<code data-language="c">do {
   // Body of for loop
}while(test expression)</code>
</pre>

The loop body inside the braces is executed once. Then, the test expression is evaluated. If the test expression is
true, the loop body is executed again. This process goes on until the test expression is evaluated to false and the loop will be terminated.

<pre>
<code data-language="c">// Program to add numbers until user enters zero
#include &lt;stdio.h&gt;

int main() {
   double number, sum = 0;

   // loop body is executed at least once
   do
   {
       printf("Enter a number: ");
       scanf("%lf", &number);
       sum += number;
   }
   while(number != 0.0);

   printf("Sum = %.2lf\n", sum);

   return 0;
}</code>
</pre>

###### break Statement

The <code>break</code> statement terminates the loop immediately when it is encountered.

<pre>
<code data-language="c">// Program to calculate the sum of maximum of 10 numbers
#include &lt;stdio.h&gt;

int main() {
   int i;
   double number, sum = 0.0;

   for(i=1; i <= 10; ++i)
   {
       printf("Enter a n%d: ",i);
       scanf("%lf",&number);

       // If user enters negative number, loop is terminated
       if(number < 0.0)
       {
           break;
       }

       sum += number; // sum = sum + number;
   }

   printf("Sum = %.2lf\n",sum);

   return 0;
}</code>
</pre>

###### continue Statement

The <code>continue</code> statement skips some statements inside the loop.

<pre>
<code data-language="c">// Program to calculate the sum of maximum of 10 numbers
// Negative numbers are skipped from calculation
#include &lt;stdio.h&gt;

int main() {
   int i;
   double number, sum = 0.0;

   for(i=1; i <= 10; ++i)
   {
       printf("Enter a n%d: ",i);
       scanf("%lf",&number);

       // If user enters negative number, loop is terminated
       if(number < 0.0)
       {
           continue;
       }

       sum += number; // sum = sum + number;
   }

   printf("Sum = %.2lf",sum);

   return 0;
}</code>
</pre>

###### switch...case Statement

The syntax of <code>switch...case</code>

<pre>
<code data-language="c">switch( &lt;variable&gt; ) {
case value1:
  //Block 1 Code Here
  break;

case value2:
  //Block 1 Code Here
  break;

default:
  Code to execute for not match case
  break;
}</code>
</pre>

If you're checking on the value of a single variable in <code>if...else if...else</code>, it's better to use <code>switch</code> statement. <code>switch</code> variable data type should be basic data types like <code>int</code>, <code>short</code>, etc and enumerated data type. <code>switch</code> variable data type and <code>case</code> data type should be matched. A <code>switch</code> block has many numbers of <code>case</code> statements, each case ends with colon. Each case ends with <code>break</code>, if not, it will continue executing the next case statement until a break statement is reached. The default case block executed when none of the cases is true. No break statement is needed in the default case.

<pre>
<code data-language="c">// Program to create a simple calculator
#include &lt;stdio.h&gt;

int main() {
   char operator;
   double firstNumber,secondNumber;

   printf("Enter an operator (+, -, *, /): ");
   scanf("%c", &operator);

   printf("Enter two operands: ");
   scanf("%lf %lf", &firstNumber, &secondNumber);

   switch(operator)
   {
       case '+':
           printf("%.1lf + %.1lf = %.1lf\n", firstNumber, secondNumber, firstNumber + secondNumber);
           break;

       case '-':
           printf("%.1lf - %.1lf = %.1lf\n", firstNumber, secondNumber, firstNumber - secondNumber);
           break;

       case '*':
           printf("%.1lf * %.1lf = %.1lf\n", firstNumber, secondNumber, firstNumber * secondNumber);
           break;

       case '/':
           printf("%.1lf / %.1lf = %.1lf\n", firstNumber, secondNumber, firstNumber / firstNumber);
           break;

       // operator is doesn't match any case constant (+, -, *, /)
       default:
           printf("Error! operator is not correct\n");
   }

   return 0;
}</code>
</pre>

###### goto Statement

The <code>goto</code> statement allows making an absolute jump to another point in the program. The destination point is identified by a label, which is used as an argument for the <code>goto</code> statement.

<pre>
<code data-language="c">// Program to calculate the sum and average of maximum of 5 numbers
// If user enters negative number, the sum and average of previously entered positive number is displayed
#include &lt;stdio.h&gt;

int main() {
   const int maxInput = 5;
   int i;
   double number, average, sum = 0.0;

   for(i=1; i <= maxInput; ++i)
   {
       printf("%d. Enter a number: ", i);
       scanf("%lf", &number);

       // If user enters negative number, flow of program moves to label jump
       if(number < 0.0)
           goto jump;

       sum += number; // sum = sum+number;
   }

   jump:

   average = sum / (i - 1);
   printf("Sum = %.2f\n", sum);
   printf("Average = %.2f", average);

   return 0;
}</code>
</pre>