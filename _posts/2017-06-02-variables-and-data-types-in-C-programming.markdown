---
layout: post
title: Variables and Data Types in C Programming
date: 2018-06-04 21:02:20 +0700
description: Introduction to Variables and Data Types in C Programming
img: datatypes.jpg
tags: [C]
---
A variable is a named location in a memory where a program can manipulate the data.

<ol>Rules for naming c variable:
<li>Variable name can contain letters, digits and the underscore. Variable name must begin with letter or
underscore</li>
<li>Variable names are case sensitive. Upper and lowercase letters are distinct.</li>
<li>Variable name must not be the same as C reserved words or keywords</li>
</ol>

<ul>Examples of valid C variable names
<li>foo</li>
<li>Bar</li>
<li>BAZ</li>
<li>foo_bar</li>
<li>_foo42</li>
<li>_</li>
<li>QuUx</li>
</ul>

<ul>Examples of invalid C variable names:
<li>2foo (must not begin with a digit)</li>
<li>my foo (spaces not allowed in names)</li>
<li>$foo ($ not allowed)</li>
<li>while (keywords cannot be used as names)</li>
</ul>

Each variable in C has a specific type, which determines the size (the range of values that can be stored within that memory) and layout of the variable's memory (the set of operations that can be applied to the variable).

Basic Data Types in C
<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Macro</th>
<th>Memory (bytes)</th>
<th>Range</th>
<th>Format Specifier</th>
</tr>
<tr>
<td>short int</td>
<td>2</td>
<td>-32.768 (-2^15) to 32.767 (2^15 - 1)</td>
<td>%hd</td>
</tr>
<tr>
<td>unsigned short int</td>
<td>2</td>
<td>0 to 65.535 (2^16 - 1)</td>
<td>%hu</td>
</tr>
<tr>
<td>unsigned int</td>
<td>4</td>
<td>0 to 4.294.967.295 (2^32 - 1)</td>
<td>%u</td>
</tr>
<tr>
<td>int</td>
<td>4</td>
<td>-2.147.483.648 (-2^31) to 2.147.483.647 (2^31 - 1)</td>
<td>%d</td>
</tr>
<tr>
<td>unsigned long int</td>
<td>4</td>
<td>0 to 4.294.967.295 (2^32 - 1)</td>
<td>%lu</td>
</tr>
<tr>
<td>long int</td>
<td>4</td>
<td>-2.147.483.648 (-2^31) to 2.147.483.647 (2^31 - 1)</td>
<td>%ld</td>
</tr>
<tr>
<td>long long int</td>
<td>8</td>
<td>-2^63 to 2^63 - 1</td>
<td>%lld</td>
</tr>
<tr>
<td>unsigned long long int</td>
<td>8</td>
<td>0 to 2^64 - 1</td>
<td>%llu</td>
</tr>
<tr>
<td>signed char</td>
<td>1</td>
<td>-128 to 127</td>
<td>%c</td>
</tr>
<tr>
<td>unsigned char</td>
<td>1</td>
<td>0 to 255</td>
<td>%c</td>
</tr>
<tr>
<td>float</td>
<td>4</td>
<td>&nbsp;</td>
<td>%f</td>
</tr>
<tr>
<td>double</td>
<td>8</td>
<td>&nbsp;</td>
<td>%lf</td>
</tr>
<tr>
<td>long double</td>
<td>12</td>
<td>&nbsp;</td>
<td>%Lf</td>
</tr>
</table>
</div>

Macros defined in limits.h header define constants with the limits of basic data types.
<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>CHAR_BIT</td>
<td>number of bits in a byte</td>
</tr>
<tr>
<td>MB_LEN_MAX</td>
<td>maximum number of bytes in a multibyte character </td>
</tr>
<tr>
<td>CHAR_MIN</td>
<td>minimum value of <code>char</code></td>
</tr>
<tr>
<td>CHAR_MAX</td>
<td>maximum value of <code>char</code></td>
</tr>
<tr>
<td>SCHAR_MIN<br>
SHRT_MIN<br>
INT_MIN<br>
LONG_MIN<br>
LLONG_MIN
</td>
<td>minimum value of <code>signed char</code>, <code>short</code>, <code>int</code>, <code>long</code> and <code>long
long</code> respectively </td>
</tr>
<tr>
<td>SCHAR_MAX<br>
SHRT_MAX<br>
INT_MAX<br>
LONG_MAX<br>
LLONG_MAX
</td>
<td>maximum value of <code>signed char</code>, <code>short</code>, <code>int</code>, <code>long</code> and <code>long
long</code> respectively </td>
</tr>
<tr>
<td>UCHAR_MAX<br>
USHRT_MAX<br>
UINT_MAX<br>
ULONG_MAX<br>
ULLONG_MAX
</td>
<td>maximum value of <code>unsigned char</code>, <code>unsigned short</code>, <code>unsigned int</code>,
<code>unsigned long</code> and <code>unsigned long long</code> respectively </td>
</tr>
</table>
</div>

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;limits.h&gt;

int main() {

   printf("The number of bits in a byte %d\n", CHAR_BIT);

   printf("The minimum value of SIGNED CHAR = %d\n", SCHAR_MIN);
   printf("The maximum value of SIGNED CHAR = %d\n", SCHAR_MAX);
   printf("Storage size for SIGNED CHAR : %lu \n", sizeof(signed char));

   printf("The maximum value of UNSIGNED CHAR = %d\n", UCHAR_MAX);
   printf("Storage size for UNSIGNED CHAR : %lu \n", sizeof(unsigned char));

   printf("The minimum value of SHORT INT = %d\n", SHRT_MIN);
   printf("The maximum value of SHORT INT = %d\n", SHRT_MAX);
   printf("Storage size for SHORT INT : %lu \n", sizeof(short int));

   printf("The maximum value of UNSIGNED SHORT INT = %d\n", USHRT_MAX);
   printf("Storage size for UNSIGNED SHORT INT : %lu \n", sizeof(unsigned short int));

   printf("The minimum value of INT = %d\n", INT_MIN);
   printf("The maximum value of INT = %d\n", INT_MAX);
   printf("Storage size for INT : %lu \n", sizeof(int));

   printf("The maximum value of UNSIGNED INT = %d\n", UINT_MAX);
   printf("Storage size for UNSIGNED INT : %lu \n", sizeof(unsigned int));

   printf("The minimum value of LONG INT = %ld\n", LONG_MIN);
   printf("The maximum value of LONG INT = %ld\n", LONG_MAX);
   printf("Storage size for LONG INT : %lu \n", sizeof(long int));

   printf("The maximum value of UNSIGNED LONG INT = %lu\n", ULONG_MAX);
   printf("Storage size for UNSIGNED LONG INT : %lu \n", sizeof(unsigned long int));

   printf("The minimum value of LONG LONG INT = %lld\n", LLONG_MIN);
   printf("The maximum value of LONG LONG INT = %lld\n", LLONG_MAX);
   printf("Storage size for LONG LONG INT : %lu \n", sizeof(long long int));

   printf("The maximum value of UNSIGNED LONG LONG INT = %llu\n", ULLONG_MAX);
   printf("Storage size for UNSIGNED LONG LONG INT : %lu \n", sizeof(unsigned long long int));

   return 0;
}</code>
</pre>

Float data types in C
<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Data Type</th>
<th>Memory (bytes)</th>
<th>Range</th>
<th>Precision (decimal places)</th>
<th>Format Specifier</th>
</tr>
<tr>
<td>float</td>
<td>4</td>
<td>-1.2E-38 to -3.4E+38 and 1.2E-38 to 3.4E+38</td>
<td>6</td>
<td>%f</td>
</tr>
<tr>
<td>double</td>
<td>8</td>
<td>-2.3E-308 to -1.7E+308 and 2.3E-308 to 1.7E+308</td>
<td>15</td>
<td>%lf</td>
</tr>
<tr>
<td>long double</td>
<td>16</td>
<td>-3.3E-4932 to -1.1E+4932 and 3.3E-4932 to 1.1E+4932</td>
<td>18</td>
<td>%Lf</td>
</tr>
</table>
</div>

Macros defined in float.h header define constants with the limits of float data types.
<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>FLT_RADIX</td>
<td>the radix (integer base) used by the representation of all three floating-point types (<code>float</code>, <code>double</code>, <code>long double</code>)</td>
</tr>
<tr>
<td>DECIMAL_DIG</td>
<td>conversion from <code>long double</code> to decimal with at least DECIMAL_DIG digits and back to <code>long double</code> is the identity conversion: this is the decimal precision required to serialize/deserialize a <code>long double</code></td>
</tr>
<tr>
<td>FLT_DECIMAL_DIG<br>
DBL_DECIMAL_DIG<br>
LDBL_DECIMAL_DIG
</td>
<td>conversion from <code>float</code>/<code>double</code>/<code>long double</code> to decimal with at least FLT_DECIMAL_DIG/DBL_DECIMAL_DIG/LDBL_DECIMAL_DIG digits and back is the identity conversion: this is the decimal precision required to serialize/deserialize a floating point value</td>
</tr>
<tr>
<td>FLT_MIN<br>
DBL_MIN<br>
LDBL_MIN</td>
<td>minimum, normalized, positive value of <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_TRUE_MIN<br>
DBL_TRUE_MIN<br>
LDBL_TRUE_MIN
</td>
<td>minimum positive value of <code>float</code>, <code>double</code> and <code>long double</code> respectively</td>
</tr>
<tr>
<td>FLT_MAX<br>
DBL_MAX<br>
LDBL_MAX
</td>
<td>maximum value of <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_EPSILON<br>
DBL_EPSILON<br>
LDBL_EPSILON
</td>
<td>difference between <code>1.0</code> and the next representable value for <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_DIG<br>
DBL_DIG<br>
LDBL_DIG
</td>
<td>number of decimal digits that are guaranteed to be preserved in text to <code>float</code>/<code>double</code>/<code>long double</code> and back to text roundtrip without change due to rounding or overflow</td>
</tr>
<tr>
<td>FLT_MANT_DIG<br>
DBL_MANT_DIG<br>
LDBL_MANT_DIG
</td>
<td>number of base-FLT_RADIX digits that are in the floating-point mantissa and that can be represented without losing precision for <code>float</code>, <code>double</code> and <code>long double</code> respectively</td>
</tr>
<tr>
<td>FLT_MIN_EXP<br>
DBL_MIN_EXP<br>
LDBL_MIN_EXP
</td>
<td>minimum negative integer such that FLT_RADIX raised by power one less than that integer is a normalized <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_MIN_10_EXP<br>
DBL_MIN_10_EXP<br>
LDBL_MIN_10_EXP
</td>
<td>minimum negative integer such that 10 raised by power one less than that integer is a normalized <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_MAX_EXP<br>
DBL_MAX_EXP<br>
LDBL_MAX_EXP
</td>
<td>maximum positive integer such that FLT_RADIX raised by power one less than that integer is a normalized <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_MAX_10_EXP<br>
DBL_MAX_10_EXP<br>
LDBL_MAX_10_EXP
</td>
<td>maximum positive integer such that 10 raised by power one less than that integer is a normalized <code>float</code>, <code>double</code> and <code>long double</code> respectively </td>
</tr>
<tr>
<td>FLT_HAS_SUBNORM<br>
DBL_HAS_SUBNORM<br>
LDBL_HAS_SUBNORM
</td>
<td>whether the type supports subnormal (denormal) numbers: -1 indeterminable, 0 absent, 1 present </td>
</tr>
<tr>
<td>FLT_ROUNDS</td>
<td>rounding mode of floating-point arithmetics</td>
</tr>
<tr>
<td>FLT_EVAL_METHOD</td>
<td>use of extended precision for intermediate results: 0 not used, 1 double is used instead of float, 2: long double is used</td>
</tr>
</table>
</div>

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;float.h&gt;

int main() {
   printf("FLT_RADIX    = %d\n", FLT_RADIX);
   printf("DECIMAL_DIG  = %d\n", DECIMAL_DIG);

   printf("FLT_MIN      = %e\n", FLT_MIN);
   printf("FLT_MAX      = %e\n", FLT_MAX);
   printf("FLT_EPSILON  = %Le\n", FLT_EPSILON);
   printf("FLT_DIG      = %d\n", FLT_DIG);
   printf("FLT_MANT_DIG = %d\n", FLT_MANT_DIG);
   printf("FLT_MIN_EXP  = %d\n",  FLT_MIN_EXP);
   printf("FLT_MIN_10_EXP  = %d\n",  FLT_MIN_10_EXP);
   printf("FLT_MAX_EXP     = %d\n",  FLT_MAX_EXP);
   printf("FLT_MAX_10_EXP  = %d\n",  FLT_MAX_10_EXP);
   printf("FLT_ROUNDS      = %d\n",  FLT_ROUNDS);
   printf("FLT_EVAL_METHOD = %d\n",  FLT_EVAL_METHOD);
   printf("FLT_HAS_SUBNORM = %d\n",  FLT_HAS_SUBNORM);

   printf("DBL_MIN      = %e\n", DBL_MIN);
   printf("DBL_MAX      = %e\n", DBL_MAX);
   printf("DBL_EPSILON  = %Le\n", DBL_EPSILON);
   printf("DBL_DIG      = %d\n", DBL_DIG);
   printf("DBL_MANT_DIG = %d\n", DBL_MANT_DIG);
   printf("DBL_MIN_EXP  = %d\n",  DBL_MIN_EXP);
   printf("DBL_MIN_10_EXP  = %d\n",  DBL_MIN_10_EXP);
   printf("DBL_MAX_EXP     = %d\n",  DBL_MAX_EXP);
   printf("DBL_MAX_10_EXP  = %d\n",  DBL_MAX_10_EXP);
   printf("DBL_HAS_SUBNORM = %d\n",  DBL_HAS_SUBNORM);

   printf("LDBL_MIN      = %Le\n", LDBL_MIN);
   printf("LDBL_MAX      = %Le\n", LDBL_MAX);
   printf("LDBL_EPSILON  = %Le\n", LDBL_EPSILON);
   printf("LDBL_DIG      = %d\n", LDBL_DIG);
   printf("LDBL_MANT_DIG = %d\n", LDBL_MANT_DIG);
   printf("LDBL_MIN_EXP  = %d\n",  LDBL_MIN_EXP);
   printf("LDBL_MIN_10_EXP  = %d\n",  LDBL_MIN_10_EXP);
   printf("LDBL_MAX_EXP     = %d\n",  LDBL_MAX_EXP);
   printf("LDBL_MAX_10_EXP  = %d\n",  LDBL_MAX_10_EXP);
   printf("LDBL_HAS_SUBNORM = %d\n",  LDBL_HAS_SUBNORM);

   return 0;
}</code>
</pre>

Before using a variable, you must declare it. To declare a variable, you must specify its data type and its name. The
variable declaration statement always ends with a semicolon (;).

Example
<pre>
<code data-language="c">int count;
char ch;</code>
</pre>

C also allows you to initialize a variable when you declare it.

<pre>
<code data-language="c">int count = 10;
char ch = 'a';</code>
</pre>