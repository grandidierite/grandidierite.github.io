---
layout: post
title: Standard Library Functions in C Programming
date: 2018-07-07 19:05:20 +0700
description: Standard Library Functions in C Programming
img: library.jpg
tags: [C]
---
A function is a block of code that performs particular task.

Functions are used for to prevent writing the same line of code for more than once in a program.

C functions can be classified into two categories
1. library functions
2. user-defined functions

Library functions are functions which are already defined in C library. You just need to include appropriate header
files to use these functions. They are a;ready declared and defined in C libraries.

Below is the list Standard Library Functions in the C Language

<div style="overflow:scroll;">
<table class="table">
<thead>
<tr>
<th>Function</th>
<th>System Include File</th>
<th>Function Prototype</th>
<th>Description</th>
</tr>
</thead>

<tbody>
<tr>
<td>abort</td>
<td>stdlib.h</td>
<td><code>void abort(void);</code></td>
<td>Stops a program abnormally.</td>
</tr>
<tr>
<td>abs</td>
<td>stdlib.h</td>
<td><code>int abs(int n);</code></td>
<td>Calculates the absolute value of an integer argument <em>n</em>.</td>
</tr>
<tr>
<td>acos</td>
<td>math.h</td>
<td><code>double acos(double x);</code></td>
<td>Calculates the arc cosine of <em>x</em>.</td>
</tr>
<tr>
<td>asctime</td>
<td>time.h</td>
<td><code>char *asctime(const struct tm *time);</code></td>
<td>Converts the <em>time</em> that is stored as a structure to a character string.</td>
</tr>
<tr>
<td>asctime_r</td>
<td>time.h</td>
<td><code>char *asctime_r (const struct tm *tm, char *buf);</code></td>
<td>Converts <em>tm</em> that is stored as a structure to a character string. (Restartable version of asctime.)</td>
</tr>
<tr>
<td>asin</td>
<td>math.h</td>
<td><code>double asin(double <em>x</em>);</code></td>
<td>Calculates the arc sine of <em>x</em>.</td>
</tr>
<tr>
<td>assert</td>
<td>assert.h</td>
<td><code>void assert(int expression);</code></td>
<td>Prints a diagnostic message and ends the program if the expression is false.</td>
</tr>
<tr>
<td>atan</td>
<td>math.h</td>
<td><code>double atan(double x);</code></td>
<td>Calculates the arc tangent of <em>x</em>.</td>
</tr>
<tr>
<td>atan2</td>
<td>math.h</td>
<td><code>double atan2(double y, double x);</code></td>
<td>Calculates the arc tangent of <em>y/x</em>.</td>
</tr>
<tr>
<td>atexit</td>
<td>stdlib.h</td>
<td><code>int atexit(void (*func)(void));</code></td>
<td>Registers a function to be called at normal termination.</td>
</tr>
<tr>
<td>atof</td>
<td>stdlib.h</td>
<td><code>double atof(const char *string);</code></td>
<td>Converts <em>string</em> to a double-precision floating-point value.</td>
</tr>
<tr>
<td>atoi</td>
<td>stdlib.h</td>
<td><code>int atoi(const char *string);</code></td>
<td>Converts <em>string</em> to an integer.</td>
</tr>
<tr>
<td>atol</td>
<td>stdlib.h</td>
<td><code>long int atol(const char *string);</code></td>
<td>Converts <em>string</em> to a long integer.</td>
</tr>
<tr>
<td>bsearch</td>
<td>stdlib.h</td>
<td><code>void *bsearch(const void *key, const void *base, size_t num, size_t size, int (*compare) (const void *element1, const void *element2));</code></td>
<td>Performs a binary search on an array of <em>num</em> elements, each of <em>size</em> bytes. The array must be sorted in ascending order by the function pointed to by <em>compare</em>.</td>
</tr>
<tr>
<td>btowc</td>
<td>
stdio.h<br>
wchar.h</td>
<td><code>wint_t btowc(int c);</code></td>
<td>Determines whether <em>c</em> constitues a valid multibyte character in the initial shift state.</td>
</tr>
<tr>
<td>calloc</td>
<td>stdlib.h</td>
<td><code>void *calloc(size_t <em>num</em>, size_t size);</code></td>
<td>Reserves storage space for an array of <em>num</em> elements, each of size <em>size</em>, and initializes the values of all elements to 0.</td>
</tr>
<tr>
<td>catclose<sup>6</sup></td>
<td>nl_types.h</td>
<td><code>int catclose (nl_catd catd);</code></td>
<td>Closes a previously opened message catalog.</td>
</tr>
<tr>
<td>catgets<sup>6</sup></td>
<td>nl_types.h</td>
<td><code>char *catgets(nl_catd catd, int set_id, int msg_id, const char *s);</code></td>
<td>Retrieves a message from an open message catalog.</td>
</tr>
<tr>
<td>catopen<sup>6</sup></td>
<td>nl_types.h</td>
<td><code>nl_catd catopen (const char *name, int oflag);</code></td>
<td>Opens a message catalog, which must be done before a message can be retrieved.</td>
</tr>
<tr>
<td>ceil</td>
<td>math.h</td>
<td><code>double ceil(double x);</code></td>
<td>Calculates the double value representing the smallest integer that is greater than or equal to <em>x</em>.</td>
</tr>
<tr>
<td>clearerr</td>
<td>stdio.h</td>
<td><code>void clearerr(FILE *stream);</code></td>
<td>Resets the error indicators and the end-of-file indicator for <em>stream</em>.</td>
</tr>
<tr>
<td>clock</td>
<td>time.h</td>
<td><code>clock_t clock(void);</code></td>
<td>Returns the processor time that has elapsed since the job was started.</td>
</tr>
<tr>
<td>cos</td>
<td>math.h</td>
<td><code>double cos(double x);</code></td>
<td>Calculates the cosine of <em>x</em>.</td>
</tr>
<tr>
<td>cosh</td>
<td>math.h</td>
<td><code>double cosh(double x);</code></td>
<td>Calculates the hyperbolic cosine of <em>x</em>.</td>
</tr>
<tr>
<td>ctime</td>
<td>time.h</td>
<td><code>char *ctime(const time_t *time);</code></td>
<td>Converts <em>time</em> to a character string.</td>
</tr>
<tr>
<td>ctime64</td>
<td>time.h</td>
<td><code>char *ctime64(const time64_t *time);</code></td>
<td>Converts <em>time</em> to a character string.</td>
</tr>
<tr>
<td>ctime_r</td>
<td>time.h</td>
<td><code>char *ctime_r(const time_t *time, char *buf);</code></td>
<td>Converts <em>time</em> to a character string. (Restartable version of ctime.)</td>
</tr>
<tr>
<td>ctime64_r</td>
<td>time.h</td>
<td><code>char *ctime64_r(const time64_t *time, char *buf);</code></td>
<td>Converts <em>time</em> to a character string. (Restartable version of ctime64.)</td>
</tr>
<tr>
<td>difftime</td>
<td>time.h</td>
<td><code>double difftime(time_t time2, time_t time1);</code></td>
<td>Computes the difference between <em>time2</em> and <em>time1</em>.</td>
</tr>
<tr>
<td>difftime64</td>
<td>time.h</td>
<td><code>double difftime64(time64_t time2, time64_t time1);</code></td>
<td>Computes the difference between <em>time2</em> and <em>time1</em>.</td>
</tr>
<tr>
<td>div</td>
<td>stdlib.h</td>
<td><code>div_t div(int numerator, int denominator);</code></td>
<td>Calculates the quotient and remainder of the division of <em>numerator</em> by <em>denominator</em>.</td>
</tr>
<tr>
<td>erf</td>
<td>math.h</td>
<td><code>double erf(double x);</code></td>
<td>Calculates the error function of  <em>x</em>.</td>
</tr>
<tr>
<td>erfc</td>
<td>math.h</td>
<td><code>double erfc(double x);</code></td>
<td>Calculates the error function for large values of <em>x</em>.</td>
</tr>
<tr>
<td>exit</td>
<td>stdlib.h</td>
<td><code>void exit(int status);</code></td>
<td>Ends a program normally.</td>
</tr>
<tr>
<td>exp</td>
<td>math.h</td>
<td><code>double exp(double x);</code></td>
<td>Calculates the exponential function of a floating-point argument <em>x</em>.</td>
</tr>
<tr>
<td>fabs</td>
<td>math.h</td>
<td><code>double fabs(double x);</code></td>
<td>Calculates the absolute value of a floating-point argument <em>x</em>.</td>
</tr>
<tr>
<td>fclose</td>
<td>stdio.h</td>
<td><code>int fclose(FILE *stream);</code></td>
<td>Closes the specified <em>stream</em>.</td>
</tr>
<tr>
<td>fdopen</td>
<td>stdio.h</td>
<td><code>FILE *fdopen(int handle, const char *type);</code></td>
<td>Associates an input or output stream with the file identified by handle.</td>
</tr>
<tr>
<td>feof</td>
<td>stdio.h</td>
<td><code>int feof(FILE *stream);</code></td>
<td>Tests whether the end-of-file flag is set for a given <em>stream</em>.</td>
</tr>
<tr>
<td>ferror</td>
<td>stdio.h</td>
<td><code>int ferror(FILE *stream);</code></td>
<td>Tests for an error indicator in reading from or writing to <em>stream</em>.</td>
</tr>
<tr>
<td>fflush</td>
<td>stdio.h</td>
<td><code>int fflush(FILE *stream);</code></td>
<td>Writes the contents of the buffer associated with the output <em>stream</em>.</td>
</tr>
<tr>
<td>fgetc</td>
<td>stdio.h</td>
<td><code>int fgetc(FILE *stream);</code></td>
<td>Reads a single unsigned character from the input <em>stream</em>.</td>
</tr>
<tr>
<td>fgetpos</td>
<td>stdio.h</td>
<td><code>int fgetpos(FILE *stream, fpos_t *pos);</code></td>
<td>Stores the current position of the file pointer associated with <em>stream</em> into the object pointed to by <em>pos</em>.</td>
</tr>
<tr>
<td>fgets</td>
<td>stdio.h</td>
<td><code>char *fgets(char *string, int n, FILE *stream);</code></td>
<td>Reads a string from the input <em>stream</em>.</td>
</tr>
<tr>
<td>fgetwc</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>wint_t fgetwc(FILE *stream);</code></td>
<td>Reads the next multibyte character from the input stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>fgetws</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>wchar_t *fgetws(wchar_t *wcs,  int n, FILE *stream);</code></td>
<td>Reads wide characters from the stream into the array pointed to by <em>wcs</em>.</td>
</tr>
<tr>
<td>fileno</td>
<td>stdio.h</td>
<td><code>int fileno(FILE *stream);</code></td>
<td>Determines the file handle currently associated with <em>stream</em>.</td>
</tr>
<tr>
<td>floor</td>
<td>math.h</td>
<td><code>double floor(double x);</code></td>
<td>Calculates the floating-point value representing the largest integer less than or equal to <em>x</em>.</td>
</tr>
<tr>
<td>fmod</td>
<td>math.h</td>
<td><code>double fmod(double x, double y);</code></td>
<td>Calculates the floating-point remainder of <em>x/y</em>.</td>
</tr>
<tr>
<td>fopen</td>
<td>stdio.h</td>
<td><code>FILE *fopen(const char *filename, const char *mode);</code></td>
<td>Opens the specified file.</td>
</tr>
<tr>
<td>fprintf</td>
<td>stdio.h</td>
<td><code>int fprintf(FILE *stream, const char *format-string, ...);</code></td>
<td>Formats and prints characters and values to the output <em>stream</em>.</td>
</tr>
<tr>
<td>fputc</td>
<td>stdio.h</td>
<td><code>int fputc(int c, FILE *stream);</code></td>
<td>Prints a character to the output <em>stream</em>.</td>
</tr>
<tr>
<td>fputs</td>
<td>stdio.h</td>
<td><code>int fputs(const char *string, FILE *stream);</code></td>
<td>Copies a string to the output <em>stream</em>.</td>
</tr>
<tr>
<td>fputwc</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>wint_t fputwc(wchar_t wc,  FILE *stream);</code></td>
<td>Converts the wide character <em>wc</em> to a multibyte character and writes it to the output stream pointed to by <em>stream</em> at the current position.</td>
</tr>
<tr>
<td>fputws</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>int fputws(const wchar_t *wcs, FILE *stream);</code></td>
<td>Converts the wide-character string <em>wcs</em> to a multibyte-character string and writes it to <em>stream</em> as a multibyte character string.</td>
</tr>
<tr>
<td>fread</td>
<td>stdio.h</td>
<td><code>size_t fread(void *buffer, size_t size, size_t count, FILE *stream);</code></td>
<td>Reads up to <em>count</em> items of <em>size</em> length from the input <em>stream</em>, and stores them in
<em>buffer</em>.</td>
</tr>
<tr>
<td>free</td>
<td>stdlib.h</td>
<td><code>void free(void *ptr);</code></td>
<td>Frees a block of storage.</td>
</tr>
<tr>
<td>freopen</td>
<td>stdio.h</td>
<td><code>FILE *freopen(const char *filename, const char *mode, FILE *stream);</code></td>
<td>Closes <em>stream</em>, and reassigns it to the file specified.</td>
</tr>
<tr>
<td>frexp</td>
<td>math.h</td>
<td><code>double frexp(double x, int *expptr);</code></td>
<td>Separates a floating-point number into its mantissa and exponent.</td>
</tr>
<tr>
<td>fscanf</td>
<td>stdio.h</td>
<td><code>int fscanf(FILE *stream, const char *format-string, ...);</code></td>
<td>Reads data from <em>stream</em> into locations given by <em>arg-list</em>.</td>
</tr>
<tr>
<td>fseek</td>
<td>stdio.h</td>
<td><code>int fseek(FILE *stream, long int offset, int origin);</code></td>
<td>Changes the current file position associated with <em>stream</em> to a new location.</td>
</tr>
<tr>
<td>fsetpos</td>
<td>stdio.h</td>
<td><code>int fsetpos(FILE *stream, const fpos_t *pos);</code></td>
<td>Moves the current file position to a new location determined by <em>pos</em>.</td>
</tr>
<tr>
<td>ftell</td>
<td>stdio.h</td>
<td><code>long int ftell(FILE *stream);</code></td>
<td>Gets the current position of the file pointer.</td>
</tr>
<tr>
<td>fwide</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>int fwide(FILE *stream, int mode);</code></td>
<td>Determines the orientation of the stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>fwprintf</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>int fwprintf(FILE *stream, const wchar_t *format, ...);</code></td>
<td>Writes output to the stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>fwrite</td>
<td>stdio.h</td>
<td><code>size_t fwrite(const void *buffer, size_t size, size_t count, FILE *stream);</code></td>
<td>Writes up to <em>count</em> items of <em>size</em> length from <em>buffer</em> to <em>stream</em>.</td>
</tr>
<tr>
<td>fwscanf</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>int fwscanf(FILE *stream, const wchar_t *format, ...)</code></td>
<td>Reads input from the stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>gamma</td>
<td>math.h</td>
<td><code>double gamma(double x);</code></td>
<td>Computes the Gamma Function</td>
</tr>
<tr>
<td>getc<sup>1</sup></td>
<td>stdio.h</td>
<td><code>int getc(FILE *stream);</code></td>
<td>Reads a single character from the input <em>stream</em>.</td>
</tr>
<tr>
<td>getchar</td>
<td>stdio.h</td>
<td><code>int getchar(void);</code></td>
<td>Reads a single character from <em>stdin.</em></td>
</tr>
<tr>
<td>getenv</td>
<td>stdlib.h</td>
<td><code>char *getenv(const char *varname);</code></td>
<td>Searches environment variables for <em>varname</em>.</td>
</tr>
<tr>
<td>gets</td>
<td>stdio.h</td>
<td><code>char *gets(char *buffer);</code></td>
<td>Reads a string from <em>stdin</em>, and stores it in <em>buffer</em>.</td>
</tr>
<tr>
<td>getwc</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>wint_t getwc(FILE *stream);</code></td>
<td>Reads the next multibyte character from  <em>stream</em>, converts it to a wide character and advances the associated file position indicator for <em>stream</em>.</td>
</tr>
<tr>
<td>getwchar</td>
<td>wchar.h</td>
<td><code>wint_t getwchar(void);</code></td>
<td>Reads the next multibyte character from stdin, converts it to a wide character, and advances the associated file position indicator for stdin.</td>
</tr>
<tr>
<td>gmtime</td>
<td>time.h</td>
<td><code>struct tm *gmtime(const time_t *time);</code></td>
<td>Converts a <em>time</em> value to a structure of type tm.</td>
</tr>
<tr>
<td>gmtime64</td>
<td>time.h</td>
<td><code>struct tm *gmtime64(const time64_t *time);</code></td>
<td>Converts a <em>time</em> value to a structure of type tm.</td>
</tr>
<tr>
<td>gmtime_r</td>
<td>time.h</td>
<td><code>struct tm *gmtime_r (const time_t *time, struct tm *result);</code></td>
<td>Converts a <em>time</em> value to a structure of type tm. (Restartable version of gmtime.)</td>
</tr>
<tr>
<td>gmtime64_r</td>
<td>time.h</td>
<td><code>struct tm *gmtime64_r (const time64_t *time, struct tm *result);</code></td>
<td>Converts a <em>time</em> value to a structure of type tm. (Restartable version of gmtime64.)</td>
</tr>
<tr>
<td>hypot</td>
<td>math.h</td>
<td><code>double hypot(double side1, double side2);</code></td>
<td>Calculates the hypotenuse of a right-angled triangle with sides of length <em>side1</em> and <em>side2</em>.</td>
</tr>
<tr>
<td>isalnum</td>
<td>ctype.h</td>
<td><code>int isalnum(int c);</code></td>
<td>Tests if <em>c</em> is alphanumeric.</td>
</tr>
<tr>
<td>isalpha</td>
<td>ctype.h</td>
<td><code>int isalpha(int c);</code></td>
<td>Tests if <em>c</em> is alphabetic.</td>
</tr>
<tr>
<td>isascii</td>
<td>ctype.h</td>
<td><code>int isascii(int c);</code></td>
<td>Tests if <em>c</em> is within the 7-bit US-ASCII range.</td>
</tr>
<tr>
<td>iscntrl</td>
<td>ctype.h</td>
<td><code>int iscntrl(int c);</code></td>
<td>Tests if <em>c</em> is a control character.</td>
</tr>
<tr>
<td>isdigit</td>
<td>ctype.h</td>
<td><code>int isdigit(int c);</code></td>
<td>Tests if <em>c</em> is a decimal digit.</td>
</tr>
<tr>
<td>isgraph</td>
<td>ctype.h</td>
<td><code>int isgraph(int c);</code></td>
<td>Tests if <em>c</em> is a printable character excluding the space.</td>
</tr>
<tr>
<td>islower</td>
<td>ctype.h</td>
<td><code>int islower(int c);</code></td>
<td>Tests if <em>c</em> is a lowercase letter.</td>
</tr>
<tr>
<td>isprint</td>
<td>ctype.h</td>
<td><code>int isprint(int c);</code></td>
<td>Tests if <em>c</em> is a printable character including the space.</td>
</tr>
<tr>
<td>ispunct</td>
<td>ctype.h</td>
<td><code>int ispunct(int c);</code></td>
<td>Tests if <em>c</em> is a punctuation character.</td>
</tr>
<tr>
<td>isspace</td>
<td>ctype.h</td>
<td><code>int isspace(int c);</code></td>
<td>Tests if <em>c</em> is a whitespace character.</td>
</tr>
<tr>
<td>isupper</td>
<td>ctype.h</td>
<td><code>int isupper(int c);</code></td>
<td>Tests if <em>c</em> is an uppercase letter.</td>
</tr>
<tr>
<td>iswalnum</td>
<td>wctype.h</td>
<td><code>int iswalnum (wint_t wc);</code></td>
<td>Checks for any alphanumeric wide character.</td>
</tr>
<tr>
<td>iswalpha</td>
<td>wctype.h</td>
<td><code>int iswalpha (wint_t wc);</code></td>
<td>Checks for any alphabetic wide character.</td>
</tr>
<tr>
<td>iswcntrl</td>
<td>wctype.h</td>
<td><code>int iswcntrl (wint_t wc);</code></td>
<td>Tests for any control wide character.</td>
</tr>
<tr>
<td>iswctype</td>
<td>wctype.h</td>
<td><code>int iswctype(wint_t wc, wctype_t wc_prop);</code></td>
<td>Determines whether or not the wide character wc has the property wc_prop.</td>
</tr>
<tr>
<td>iswdigit</td>
<td>wctype.h</td>
<td><code>int iswdigit (wint_t wc);</code></td>
<td>Checks for any decimal-digit wide character.</td>
</tr>
<tr>
<td>iswgraph</td>
<td>wctype.h</td>
<td><code>int iswgraph (wint_t wc);</code></td>
<td>Checks for any printing wide character except for the wide-character space.</td>
</tr>
<tr>
<td>iswlower</td>
<td>wctype.h</td>
<td><code>int iswlower (wint_t wc);</code></td>
<td>Checks for any lowercase wide character.</td>
</tr>
<tr>
<td>iswprint</td>
<td>wctype.h</td>
<td><code>int iswprint (wint_t wc);</code></td>
<td>Checks for any printing wide character.</td>
</tr>
<tr>
<td>iswpunct</td>
<td>wctype.h</td>
<td><code>int iswpunct (wint_t wc);</code></td>
<td>Test for a wide non-alphanumeric, non-space character.</td>
</tr>
<tr>
<td>iswspace</td>
<td>wctype.h</td>
<td><code>int iswspace (wint_t wc);</code></td>
<td>Checks for any wide character that corresponds to an implementation-defined set of wide characters for which iswalnum is false.</td>
</tr>
<tr>
<td>iswupper</td>
<td>wctype.h</td>
<td><code>int iswupper (wint_t wc);</code></td>
<td>Checks for any uppercase wide character.</td>
</tr>
<tr>
<td>iswxdigit</td>
<td>wctype.h</td>
<td><code>int iswxdigit (wint_t wc);</code></td>
<td>Checks for any hexadecimal digit character.</td>
</tr>
<tr>
<td>isxdigit</td>
<td>wctype.h</td>
<td><code>int isxdigit(int c);</code></td>
<td>Tests if <em>c</em> is a hexadecimal digit.</td>
</tr>
<tr>
<td>j0</td>
<td>math.h</td>
<td><code>double j0(double x);</code></td>
<td>Calculates the Bessel function value of the first kind of order 0.</td>
</tr>
<tr>
<td>j1</td>
<td>math.h</td>
<td><code>double j1(double x);</code></td>
<td>Calculates the Bessel function value of the first kind of order 1.</td>
</tr>
<tr>
<td>jn</td>
<td>math.h</td>
<td><code>double jn(int n, double x);</code></td>
<td>Calculates the Bessel function value of the first kind of order <em>n</em>.</td>
</tr>
<tr>
<td>labs</td>
<td>stdlib.h</td>
<td><code>long int labs(long int n);</code></td>
<td>Calculates the absolute value of <em>n</em>.</td>
</tr>
<tr>
<td>ldexp</td>
<td>math.h</td>
<td><code>double ldexp(double x, int exp);</code></td>
<td>Returns the value of <em>x</em> multiplied by (2 to the power of <em>exp</em>).</td>
</tr>
<tr>
<td>ldiv</td>
<td>stdlib.h</td>
<td><code>ldiv_t ldiv(long int numerator, long int denominator);</code></td>
<td>Calculates the quotient and remainder of <em>numerator</em>/<em>denominator</em>.</td>
</tr>
<tr>
<td>localeconv</td>
<td>locale.h</td>
<td><code>struct lconv *localeconv(void);</code></td>
<td>Formats numeric quantities in struct lconv according to the current locale.</td>
</tr>
<tr>
<td>localtime</td>
<td>time.h</td>
<td><code>struct tm *localtime(const time_t *timeval);</code></td>
<td>Converts <em>timeval</em> to a structure of type tm.</td>
</tr>
<tr>
<td>localtime64</td>
<td>time.h</td>
<td><code>struct tm *localtime64(const time64_t *timeval);</code></td>
<td>Converts <em>timeval</em> to a structure of type tm.</td>
</tr>
<tr>
<td>localtime_r</td>
<td>time.h</td>
<td><code>struct tm *localtime_r (const time_t *timeval, struct tm *result);</code></td>
<td>Converts a <em>time</em> value to a structure of type <em>tm</em>. (Restartable version of localtime.)
</td>
</tr>
<tr>
<td>localtime64_r</td>
<td>time.h</td>
<td><code>struct tm *localtime64_r (const time64_t *timeval, struct tm *result);</code></td>
<td>Converts a <var class="pv">time</var> value to a structure of type <var class="pv">tm</var>. (Restartable version of localtime64.)</td>
</tr>
<tr>
<td>log</td>
<td>math.h</td>
<td><code>double log(double x);</code></td>
<td>Calculates the natural logarithm of <em>x</em>.</td>
</tr>
<tr>
<td>log10</td>
<td>math.h</td>
<td><code>double log10(double x);</code></td>
<td>Calculates the base 10 logarithm of <em>x</em>.</td>
</tr>
<tr>
<td>longjmp</td>
<td>setjmp.h</td>
<td><code>void longjmp(jmp_buf env, int value);</code></td>
<td>Restores a stack environment previously set in <em>env</em> by the setjmp function.</td>
</tr>
<tr>
<td>malloc</td>
<td>stdlib.h</td>
<td><code>void *malloc(size_t size);</code></td>
<td>Reserves a block of storage.</td>
</tr>
<tr>
<td>mblen</td>
<td>stdlib.h</td>
<td><code>int mblen(const char *string, size_t n);</code></td>
<td>Determines the length of a multibyte character <em>string</em>.</td>
</tr>
<tr>
<td>mbrlen</td>
<td>wchar.h</td>
<td><code>int mbrlen (const char *s, size_t n, mbstate_t *ps);</code></td>
<td>Determines the length of a multibyte character. (Restartable version of mblen.)</td>
</tr>
<tr>
<td>mbrtowc</td>
<td>wchar.h</td>
<td><code>int mbrtowc (wchar_t *pwc, const char *s, size_t n, mbstate_t *ps);</code></td>
<td>Convert a multibyte character to a wide character (Restartable version of mbtowc.)</td>
</tr>
<tr>
<td>mbsinit</td>
<td>wchar.h</td>
<td><code>int mbsinit (const mbstate_t *ps);</code></td>
<td>Test state object <var class="pv">*ps</var> for initial state.</td>
</tr>
<tr>
<td>mbsrtowcs</td>
<td>wchar.h</td>
<td><code>size_t mbsrtowc (wchar_t *dst, const char **src, size_t len, mbstate_t *ps);</code></td>
<td>Convert multibyte string to a wide character string. (Restartable version of mbstowcs.)</td>
</tr>
<tr>
<td>mbstowcs</td>
<td>stdlib.h</td>
<td><code>size_t mbstowcs(wchar_t *pwc, const char *string, size_t n);</code></td>
<td>Converts the multibyte characters in <em>string</em> to their corresponding wchar_t codes, and stores not more than <em>n</em> codes in <em>pwc</em>.</td>
</tr>
<tr>
<td>mbtowc</td>
<td>stdlib.h</td>
<td><code>int mbtowc(wchar_t *pwc, const char *string, size_t n);</code></td>
<td>Stores the wchar_t code corresponding to the first <em>n</em> bytes of multibyte character <em>string</em> into the wchar_t character <em>pwc</em>.</td>
</tr>
<tr>
<td>memchr</td>
<td>string.h</td>
<td><code>void *memchr(const void *buf, int c, size_t count);</code></td>
<td>Searches the first <em>count</em> bytes of <em>buf</em> for the first occurrence of <em>c</em> converted to an unsigned character.</td>
</tr>
<tr>
<td>memcmp</td>
<td>string.h</td>
<td><code>int memcmp(const void *buf1, const void *buf2, size_t count);</code></td>
<td>Compares up to <em>count</em> bytes of <em>buf1</em> and <em>buf2</em>.</td>
</tr>
<tr>
<td>memcpy</td>
<td>string.h</td>
<td><code>void *memcpy(void *dest, const void *src, size_t count);</code></td>
<td>Copies <em>count</em> bytes of <em>src</em> to <em>dest</em>.</td>
</tr>
<tr>
<td>memmove</td>
<td>string.h</td>
<td><code>void *memmove(void *dest, const void *src, size_t count);</code></td>
<td>Copies <em>count</em> bytes of <em>src</em> to <em>dest</em>.  Allows copying between objects that overlap.</td>
</tr>
<tr>
<td>memset</td>
<td>string.h</td>
<td><code>void *memset(void *dest, int c, size_t count);</code></td>
<td>Sets <em>count</em> bytes of <em>dest</em> to a value <em>c</em>.</td>
</tr>
<tr>
<td>mktime</td>
<td>time.h</td>
<td><code>time_t mktime(struct tm *time);</code></td>
<td>Converts local <em>time</em> into calendar time.</td>
</tr>
<tr>
<td>mktime64</td>
<td>time.h</td>
<td><code>time64_t mktime64(struct tm *time);</code></td>
<td>Converts local <em>time</em> into calendar time.</td>
</tr>
<tr>
<td>modf</td>
<td>math.h</td>
<td><code>double modf(double x, double *intptr);</code></td>
<td>Breaks down the floating-point value <em>x</em> into fractional and integral parts.</td>
</tr>
<tr>
<td>nextafter</td>
<td>math.h</td>
<td><code>double nextafter(double x, double y);</code></td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nextafterl</td>
<td>math.h</td>
<td><code>long double nextafterl(long double x, long double y);</code></td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nexttoward</td>
<td>math.h</td>
<td><code>double nexttoward(double x, long double y);</code></td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nexttowardl</td>
<td>math.h</td>
<td><code>long double nexttowardl(long double x, long double y);</code></td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nl_langinfo</td>
<td>langinfo.h</td>
<td><code>char *nl_langinfo(nl_item item);</code></td>
<td>Retrieve from the current locale the string that describes the requested information specified by <em>item</em>
.</td>
</tr>
<tr>
<td>perror</td>
<td>stdio.h</td>
<td><code>void perror(const char *string);</code></td>
<td>Prints an error message to stderr.</td>
</tr>
<tr>
<td>pow</td>
<td>math.h</td>
<td><code>double pow(double x, double y);</code></td>
<td>Calculates the value <em>x</em> to the power <em>y</em>.</td>
</tr>
<tr>
<td>printf</td>
<td>stdio.h</td>
<td><code>int printf(const char *format-string, ...);</code></td>
<td>Formats and prints characters and values to stdout.</td>
</tr>
<tr>
<td>putc</td>
<td>stdio.h</td>
<td><code>int putc(int c, FILE *stream);</code></td>
<td>Prints <em>c</em> to the output <em>stream</em>.</td>
</tr>
<tr>
<td>putchar</td>
<td>stdio.h</td>
<td><code>int putchar(int c);</code></td>
<td>Prints <em>c</em> to stdout.</td>
</tr>
<tr>
<td>putenv</td>
<td>stdlib.h</td>
<td><code>int *putenv(const char *varname);</code></td>
<td>Sets the value of an environment variable by altering an existing variable or creating a new one.</td>
</tr>
<tr>
<td>puts</td>
<td>stdio.h</td>
<td><code>int puts(const char *string);</code></td>
<td>Prints a string to stdout.</td>
</tr>
<tr>
<td>putwc</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>wint_t putwchar(wchar_t wc,  FILE *stream);</code></td>
<td>Converts the wide character <em>wc</em> to a multibyte character, and writes it to the stream at the current position.</td>
</tr>
<tr>
<td>putwchar</td>
<td>wchar.h</td>
<td><code>wint_t putwchar(wchar_t wc);</code></td>
<td>Converts the wide character <em>wc</em> to a multibyte character and writes it to stdout.</td>
</tr>
<tr>
<td>qsort</td>
<td>stdlib.h</td>
<td><code>void qsort(void *base, size_t num, size_t width, int(*compare)(const void *element1, const void *element2));</code></td>
<td>Performs a quick sort of an array of <em>num</em> elements, each of <em>width</em> bytes in size.</td>
</tr>
<tr>
<td>raise</td>
<td>signal.h</td>
<td><code>int raise(int sig);</code></td>
<td>Sends the signal <em>sig</em> to the running program.</td>
</tr>
<tr>
<td>rand</td>
<td>stdlib.h</td>
<td><code>int rand(void);</code></td>
<td>Returns a pseudo-random integer.</td>
</tr>
<tr>
<td>rand_r</td>
<td>stdlib.h</td>
<td><code>int rand_r(void);</code></td>
<td>Returns a pseudo-random integer. (Restartable version)</td>
</tr>
<tr>
<td>realloc</td>
<td>stdlib.h</td>
<td><code>void *realloc(void *ptr, size_t size);</code></td>
<td>Changes the <em>size</em> of a previously reserved storage block.</td>
</tr>
<tr>
<td>regcomp</td>
<td>regex.h</td>
<td><code>int regcomp(regex_t *preg, const char *pattern, int cflags);</code></td>
<td>Compiles the source regular expression pointed to by <em>pattern</em> into an executable version and stores it in the location pointed to by <em>preg</em>.</td>
</tr>
<tr>
<td>regerror</td>
<td>regex.h</td>
<td><code>size_t regerror(int errcode, const regex_t *preg, char *errbuf,  size_t errbuf_size);</code></td>
<td>Finds the description for the error code <em>errcode</em> for the regular expression <em>preg</em>.</td>
</tr>
<tr>
<td>regexec</td>
<td>regex.h</td>
<td><code>int regexec(const regex_t *preg, const char *string, size_t nmatch, regmatch_t *pmatch, int eflags);</code></td>
<td>Compares the null-ended string <em>string</em> against the compiled regular expression <em>preg</em> to find a match between the two.</td>
</tr>
<tr>
<td>regfree</td>
<td>regex.h</td>
<td><code>void regfree(regex_t *preg);</code></td>
<td>Frees any memory that was allocated by regcomp to implement the regular expression <em>preg</em>.</td>
</tr>
<tr>
<td>remove</td>
<td>stdio.h</td>
<td><code>int remove(const char *filename);</code></td>
<td>Deletes the file specified by <em>filename</em>.</td>
</tr>
<tr>
<td>rename</td>
<td>stdio.h</td>
<td><code>int rename(const char *oldname, const char *newname);</code></td>
<td>Renames the specified file.</td>
</tr>
<tr>
<td>rewind</td>
<td>stdio.h</td>
<td><code>void rewind(FILE *stream);</code></td>
<td>Repositions the file pointer associated with <em>stream</em> to the beginning of the file.</td>
</tr>
<tr>
<td>scanf</td>
<td>stdio.h</td>
<td><code>int scanf(const char *format-string, ...);</code></td>
<td>Reads data from stdin into locations given by <em>arg-list</em>.</td>
</tr>
<tr>
<td>setbuf</td>
<td>stdio.h</td>
<td><code>void setbuf(FILE *stream, char *buffer);</code></td>
<td>Controls buffering for <em>stream</em>.</td>
</tr>
<tr>
<td>setjmp</td>
<td>setjmp.h</td>
<td><code>int setjmp(jmp_buf env);</code></td>
<td>Saves a stack environment that can be subsequently restored by longjmp.</td>
</tr>
<tr>
<td>setlocale</td>
<td>locale.h</td>
<td><code>char *setlocale(int category, const char *locale);</code></td>
<td>Changes or queries variables defined in the <em>locale</em>.</td>
</tr>
<tr>
<td>setvbuf</td>
<td>stdio.h</td>
<td><code>int setvbuf(FILE *stream, char *buf, int type, size_t size);</code></td>
<td>Controls buffering and buffer <em>size</em> for <em>stream</em>.</td>
</tr>
<tr>
<td>signal</td>
<td>signal.h</td>
<td><code>void(*signal (int sig, void(*func)(int))) (int);</code></td>
<td>Registers func as a signal handler for the signal sig.</td>
</tr>
<tr>
<td>sin</td>
<td>math.h</td>
<td><code>double sin(double x);</code></td>
<td>Calculates the sine of <em>x</em>.</td>
</tr>
<tr>
<td>sinh</td>
<td>math.h</td>
<td><code>double sinh(double x);</code></td>
<td>Calculates the hyperbolic sine of <em>x</em>.</td>
</tr>
<tr>
<td>snprintf</td>
<td>stdio.h</td>
<td><code>int snprintf(char *outbuf, size_t n, const char*, ...)</code></td>
<td>Same as sprintf except that the function will stop after n characters have been written to outbuf.</td>
</tr>
<tr>
<td>sprintf</td>
<td>stdio.h</td>
<td><code>int sprintf(char *buffer, const char *format-string, ...);</code></td>
<td>Formats and stores characters and values in <em>buffer</em>.</td>
</tr>
<tr>
<td>sqrt</td>
<td>math.h</td>
<td><code>double sqrt(double x);</code></td>
<td>Calculates the square root of <em>x</em>.</td>
</tr>
<tr>
<td>srand</td>
<td>stdlib.h</td>
<td><code>void srand(unsigned int seed);</code></td>
<td>Sets the <em>seed</em> for the pseudo-random number generator.</td>
</tr>
<tr>
<td>sscanf</td>
<td>stdio.h</td>
<td><code>int sscanf(const char *buffer, const char *format, ...);</code></td>
<td>Reads data from <em>buffer</em> into the locations given by <em>arg-list</em>.</td>
</tr>
<tr>
<td>strcasecmp</td>
<td>strings.h</td>
<td><code>int srtcasecmp(const char *string1, const char *string2);</code></td>
<td>Compares strings without case sensitivity.</td>
</tr>
<tr>
<td>strcat</td>
<td>string.h</td>
<td><code>char *strcat(char *string1, const char *string2);</code></td>
<td>Concatenates <em>string2</em> to <em>string1</em>.</td>
</tr>
<tr>
<td>strchr</td>
<td>string.h</td>
<td><code>char *strchr(const char *string, int c);</code></td>
<td>Locates the first occurrence of <em>c</em> in <em>string</em>.</td>
</tr>
<tr>
<td>strcmp</td>
<td>string.h</td>
<td><code>int strcmp(const char *string1, const char *string2);</code></td>
<td>Compares the value of <em>string1</em> to <em>string2</em>.</td>
</tr>
<tr>
<td>strcoll</td>
<td>string.h</td>
<td><code>int strcoll(const char *string1, const char *string2);</code></td>
<td>Compares two strings using the collating sequence in the current locale.</td>
</tr>
<tr>
<td>strcpy</td>
<td>string.h</td>
<td><code>char *strcpy(char *string1, const char *string2);</code></td>
<td>Copies <em>string2</em> into <em>string1</em>.</td>
</tr>
<tr>
<td>strcspn</td>
<td>string.h</td>
<td><code>size_t strcspn(const char *string1, const char *string2)</code>;</td>
<td>Returns the length of the initial substring of <em>string1</em> consisting of characters not contained in
<em>string2</em>.</td>
</tr>
<tr>
<td>strerror</td>
<td>string.h</td>
<td><code>char *strerror(int errnum);</code></td>
<td>Maps the error number in <em>errnum</em> to an error message string.</td>
</tr>
<tr>
<td>strfmon</td>
<td>wchar.h</td>
<td><code>int strfmon (char *s, size_t maxsize, const char *format, ...);</code></td>
<td>Converts monetary value to string.</td>
</tr>
<tr>
<td>strftime</td>
<td>time.h</td>
<td><code>size_t strftime (char *dest, size_t maxsize, const char *format, const struct tm *timeptr);</code></td>
<td>Stores characters in an array pointed to by <em>dest</em>, according to the string determined by <em>format</em>
.</td>
</tr>
<tr>
<td>strlen</td>
<td>string.h</td>
<td><code>size_t strlen(const char *string);</code></td>
<td>Calculates the length of <em>string</em>.</td>
</tr>
<tr>
<td>strncasecmp</td>
<td>strings.h</td>
<td><code>int strncasecmp(const char *string1, const char *string2, size_t count);</code></td>
<td>Compares strings without case sensitivity.</td>
</tr>
<tr>
<td>strncat</td>
<td>string.h</td>
<td><code>char *strncat(char *string1, const char *string2, size_t count);</code></td>
<td>Concatenates up to <em>count</em> characters of <em>string2</em> to <em>string1</em>.</td>
</tr>
<tr>
<td>strncmp</td>
<td>string.h</td>
<td><code>int strncmp(const char *string1, const char *string2, size_t count);</code></td>
<td>Compares up to <em>count</em> characters of <em>string1</em> and <em>string2</em>.</td>
</tr>
<tr>
<td>strncpy</td>
<td>string.h</td>
<td><code>char *strncpy(char *string1, const char *string2, size_t count);</code></td>
<td>Copies up to <em>count</em> characters of <em>string2</em> to <em>string1</em>.</td>
</tr>
<tr>
<td>strpbrk</td>
<td>string.h</td>
<td><code>char *strpbrk(const char *string1, const char *string2);</code></td>
<td>Locates the first occurrence in <em>string1</em> of any character in <em>string2</em>.</td>
</tr>
<tr>
<td>strptime<sup>4</sup></td>
<td>time.h</td>
<td><code>char *strptime (const char *buf, const char *format, struct tm *tm);</code></td>
<td>Date and time conversion</td>
</tr>
<tr>
<td>strrchr</td>
<td>string.h</td>
<td><code>char *strrchr(const char *string, int c);</code></td>
<td>Locates the last occurrence of <em>c</em> in <em>string</em>.</td>
</tr>
<tr>
<td>strspn</td>
<td>string.h</td>
<td><code>size_t strspn(const char *string1, const char *string2);</code></td>
<td>Returns the length of the initial substring of <em>string1</em> consisting of characters contained in <em>string2</em>.</td>
</tr>
<tr>
<td>strstr</td>
<td>string.h</td>
<td><code>char *strstr(const char *string1, const char *string2);</code></td>
<td>Returns a pointer to the first occurrence of <em>string2</em> in <em>string1</em>.</td>
</tr>
<tr>
<td>strtod</td>
<td>stdlib.h</td>
<td><code>double strtod(const char *nptr, char **endptr);</code></td>
<td>Converts <em>nptr</em> to a double precision value.</td>
</tr>
<tr>
<td>strtod32</td>
<td>stdlib.h</td>
<td><code>_Decimal32 strtod32(const char *nptr, char **endptr);</code></td>
<td>Converts <em>nptr</em> to a single-precision decimal floating-point value.</td>
</tr>
<tr>
<td>strtod64</td>
<td>stdlib.h</td>
<td><code>_Decimal64 strtod64(const char *nptr, char **endptr);</code></td>
<td>Converts <em>nptr</em> to a double-precision decimal floating-point value.</td>
</tr>
<tr>
<td>strtod128</td>
<td>stdlib.h</td>
<td><code>_Decimal128 strtod128(const char *nptr, char **endptr);</code></td>
<td>Converts <em>nptr</em> to a quad-precision decimal floating-point value.</td>
</tr>
<tr>
<td>strtof</td>
<td>stdlib.h</td>
<td><code>float strtof(const char *nptr, char **endptr);</code></td>
<td>Converts <em>nptr</em> to a float value.</td>
</tr>
<tr>
<td>strtok</td>
<td>string.h</td>
<td><code>char *strtok(char *string1, const char *string2);</code></td>
<td>Locates the next token in <em>string1</em> delimited by the next character in <em>string2</em>.</td>
</tr>
<tr>
<td>strtok_r</td>
<td>string.h</td>
<td><code>char *strtok_r(char *string, const char *seps, char **lasts);</code></td>
<td>Locates the next token in <em>string</em> delimited by the next character in <em>seps</em>. (Restartable version of
strtok.)</td>
</tr>
<tr>
<td>strtol</td>
<td>stdlib.h</td>
<td><code>long int strtol(const char *nptr, char **endptr, int base);</code></td>
<td>Converts <em>nptr</em> to a signed long integer.</td>
</tr>
<tr>
<td>strtold</td>
<td>stdlib.h</td>
<td><code>long double strtold(const char *nptr, char **endptr);</code></td>
<td>Converts <em>nptr</em> to a long double value.</td>
</tr>
<tr>
<td>strtoul</td>
<td>stdlib.h</td>
<td><code>unsigned long int strtoul(const char *string1, char **string2, int base);</code></td>
<td>Converts <em>string1</em> to an unsigned long integer.</td>
</tr>
<tr>
<td>strxfrm</td>
<td>string.h</td>
<td><code>size_t strxfrm(char *string1, const char *string2, size_t count);</code></td>
<td>Converts <em>string2</em> and places the result in <em>string1</em>. The conversion is determined by the program's current locale.</td>
</tr>
<tr>
<td>swprintf</td>
<td>wchar.h</td>
<td><code>int swprintf(wchar_t *wcsbuffer, size_t n, const wchar_t *format, ...);</code></td>
<td>Formats and stores a series of wide characters and values into the wide-character buffer <em>wcsbuffer</em>.</td>
</tr>
<tr>
<td>swscanf</td>
<td>wchar.h</td>
<td><code>int swscanf (const wchar_t <em>*buffer</em>, const wchar_t <em>*format</em>, ...)</code>
</td>
<td>Reads data from <em>buffer</em> into the locations given by <em>arg-list</em>.</td>
</tr>
<tr>
<td>system</td>
<td>stdlib.h</td>
<td><code>int system(const char *string);</code></td>
<td>Passes <em>string</em> to the system command analyzer.</td>
</tr>
<tr>
<td>tan</td>
<td>math.h</td>
<td><code>double tan(double x);</code></td>
<td>Calculates the tangent of <em>x</em>.</td>
</tr>
<tr>
<td>tanh</td>
<td>math.h</td>
<td><code>double tanh(double x);</code></td>
<td>Calculates the hyperbolic tangent of <em>x</em>.</td>
</tr>
<tr>
<td>time</td>
<td>time.h</td>
<td><code>time_t time(time_t *timeptr);</code></td>
<td>Returns the current calendar time.</td>
</tr>
<tr>
<td>time64</td>
<td>time.h</td>
<td><code>time64_t time64(time64_t *timeptr);</code></td>
<td>Returns the current calendar time.</td>
</tr>
<tr>
<td>tmpfile</td>
<td>stdio.h</td>
<td><code>FILE *tmpfile(void);</code></td>
<td>Creates a temporary binary file and opens it.</td>
</tr>
<tr>
<td>tmpnam</td>
<td>stdio.h</td>
<td><code>char *tmpnam(char *string);</code></td>
<td>Generates a temporary file name.</td>
</tr>
<tr>
<td>toascii</td>
<td>ctype.h</td>
<td><code>int toascii(int c);</code></td>
<td>Converts <em>c</em> to a character in the 7-bit US-ASCII character set.</td>
</tr>
<tr>
<td>tolower</td>
<td>ctype.h</td>
<td><code>int tolower(int c);</code></td>
<td>Converts <em>c</em> to lowercase.</td>
</tr>
<tr>
<td>toupper</td>
<td>ctype.h</td>
<td><code>int toupper(int c);</code></td>
<td>Converts <em>c</em> to uppercase.</td>
</tr>
<tr>
<td>towctrans</td>
<td>wctype.h</td>
<td><code>wint_t towctrans(wint_t wc, wctrans_t desc);</code></td>
<td>Translates the wide character <em>wc</em> based on the mapping described by <em>desc</em>.</td>
</tr>
<tr>
<td>towlower</td>
<td>wctype.h</td>
<td><code>wint_t towlower (wint_t wc);</code></td>
<td>Converts uppercase letter to lowercase letter.</td>
</tr>
<tr>
<td>towupper</td>
<td>wctype.h</td>
<td><code>wint_t towupper (wint_t wc);</code></td>
<td>Converts lowercase letter to uppercase letter.</td>
</tr>
<tr>
<td>ungetc</td>
<td>stdio.h</td>
<td><code>int ungetc(int c, FILE *stream);</code></td>
<td>Pushes <em>c</em> back onto the input <em>stream</em>.</td>
</tr>
<tr>
<td>ungetwc</td>
<td>stdio.h<br>
wchar.h</td>
<td><code>wint_t ungetwc(wint_t wc, FILE *stream);</code></td>
<td>Pushes the wide character <em>wc</em> back onto the input stream.</td>
</tr>
<tr>
<td>va_arg</td>
<td>stdarg.h</td>
<td><code>var_type va_arg(va_list arg_ptr, var_type);</code></td>
<td>Returns the value of one argument and modifies <em>arg_ptr</em> to point to the next argument.</td>
</tr>
<tr>
<td>va_end</td>
<td>stdarg.h</td>
<td><code>void va_end(va_list arg_ptr);</code></td>
<td>Facilitates normal return from variable argument list processing.</td>
</tr>
<tr>
<td>va_start</td>
<td>stdarg.h</td>
<td><code>void va_start(va_list arg_ptr, variable_name);</code></td>
<td>Initializes <em>arg_ptr</em> for subsequent use by <em>va_arg</em> and <em>va_end</em>.</td>
</tr>
<tr>
<td>vfprintf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vfprintf(FILE *stream, const char *format, va_list arg_ptr);</code></td>
<td>Formats and prints characters to the output <em>stream</em> using a variable number of arguments.</td>
</tr>
<tr>
<td>vfscanf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vfscanf(FILE *stream, const char *format, va_list arg_ptr);</code></td>
<td>Reads data from a specified stream into locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>vfwprintf</td>
<td>stdarg.h<br>
stdio.h<br>
wchar.h</td>
<td><code>int vfwprintf(FILE *stream, const wchar_t *format, va_list arg);</code></td>
<td>Equivalent to fwprintf, except that the variable argument list is replaced by <em>arg</em>.</td>
</tr>
<tr>
<td>vfwscanf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vfwscanf(FILE *stream, const wchar_t *format, va_list arg_ptr);</code></td>
<td>Reads wide data from a specified stream into locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>vprintf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vprintf(const char *format, va_list arg_ptr);</code></td>
<td>Formats and prints characters to stdout using a variable number of arguments.</td>
</tr>
<tr>
<td>vscanf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vscanf(const char *format, va_list arg_ptr);</code></td>
<td>Reads data from stdin into locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>vsprintf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vsprintf(char *target-string, const char *format, va_list arg_ptr);</code></td>
<td>Formats and stores characters in a buffer using a variable number of arguments.</td>
</tr>
<tr>
<td>vsnprintf</td>
<td>stdio.h</td>
<td><code>int vsnprintf(char *outbuf, size_t n, const char*, va_list);</code></td>
<td>Same as vsprintf except that the function will stop after n characters have been written to outbuf.</td>
</tr>
<tr>
<td>vsscanf</td>
<td>stdio.h stdarg.h</td>
<td><code>int vsscanf(const char *buffer, const char *format, va_list arg_ptr);</code></td>
<td>Reads data from a buffer into locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>vswprintf</td>
<td>stdarg.h<br>
wchar.h</td>
<td><code>int vswprintf(wchar_t *wcsbuffer,  size_t n, const wchar_t *format,  va_list arg);</code></td>
<td>Formats and stores a series of wide characters and values in the buffer <em>wcsbuffer</em>.</td>
</tr>
<tr>
<td>vswscanf</td>
<td>stdio.h wchar.h</td>
<td><code>int vswscanf(const wchar_t *buffer, const wchar_t *format, va_list arg_ptr);</code></td>
<td>Reads wide data from a buffer into locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>vwprintf</td>
<td>stdarg.h<br>
wchar.h</td>
<td><code>int vwprintf(const wchar_t *format, va_list arg);</code></td>
<td>Equivalent to wprintf, except that the variable argument list is replaced by <em>arg</em>.</td>
</tr>
<tr>
<td>vwscanf</td>
<td>stdio.h wchar.h</td>
<td><code>int vwscanf(const wchar_t *format, va_list arg_ptr);</code></td>
<td>Reads wide data from stdin into locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>wcrtomb</td>
<td>wchar.h</td>
<td><code>int wcrtomb (char *s, wchar_t wchar, mbstate_t *pss);</code></td>
<td>Converts a wide character to a multibyte character. (Restartable version of wctomb.)</td>
</tr>
<tr>
<td>wcscat</td>
<td>wchar.h</td>
<td><code>wchar_t *wcscat(wchar_t *string1, const wchar_t *string2);</code></td>
<td>Appends a copy of the string pointed to by <em>string2</em> to the end of the string pointed to by <em>string1</em>.</td>
</tr>
<tr>
<td>wcschr</td>
<td>wchar.h</td>
<td><code>wchar_t *wcschr(const wchar_t *string, wchar_t character);</code></td>
<td>Searches the wide-character string pointed to by <em>string</em> for the occurrence of <em>character</em>.</td>
</tr>
<tr>
<td>wcscmp</td>
<td>wchar.h</td>
<td><code>int wcscmp(const wchar_t *string1, const wchar_t *string2);</code></td>
<td>Compares two wide-character strings, <em>*string1</em> and <em>*string2</em>.</td>
</tr>
<tr>
<td>wcscoll</td>
<td>wchar.h</td>
<td><code>int wcscoll (const wchar_t *wcs1, const wchar_t *wcs2);</code></td>
<td>Compares two wide-character strings using the collating sequence in the current locale.</td>
</tr>
<tr>
<td>wcscpy</td>
<td>wchar.h</td>
<td><code>wchar_t *wcscpy(wchar_t *string1, const wchar_t *string2);</code></td>
<td>Copies the contents of <em>*string2</em> (including the ending wchar_t  null character) into <em>*string1</em>.</td>
</tr>
<tr>
<td>wcscspn</td>
<td>wchar.h</td>
<td><code>size_t wcscspn(const wchar_t *string1, const wchar_t *string2);</code></td>
<td>Determines the number of wchar_t  characters in the initial segment of the string pointed to by <em>*string1</em> that do not appear in the string pointed to by <em>*string2</em>.</td>
</tr>
<tr>
<td>wcsftime</td>
<td>wchar.h</td>
<td><code>size_t wcsftime(wchar_t *wdest, size_t maxsize, const wchar_t *format,  const struct tm *timeptr);</code></td>
<td>Converts the time and date specification in the <em>timeptr</em> structure into a wide-character string.</td>
</tr>
<tr>
<td>wcslen</td>
<td>wchar.h</td>
<td><code>size_t wcslen(const wchar_t *string);</code></td>
<td>Computes the number of wide-characters in the string pointed to by <em>string</em>.</td>
</tr>
<tr>
<td>wcslocaleconv</td>
<td>locale.h</td>
<td><code>struct wcslconv *wcslocaleconv(void);</code></td>
<td>Formats numeric quantities in struct wcslconv according to the current locale.</td>
</tr>
<tr>
<td>wcsncat</td>
<td>wchar.h</td>
<td><code>wchar_t *wcsncat(wchar_t *string1, const wchar_t *string2, size_t count);</code></td>
<td>Appends up to <em>count</em> wide characters from <em>string2</em> to the end of <em>string1</em>, and appends a wchar_t null character to the result.</td>
</tr>
<tr>
<td>wcsncmp</td>
<td>wchar.h</td>
<td><code>int wcsncmp(const wchar_t *string1, const wchar_t *string2, size_t count);</code></td>
<td>Compares up to <em>count</em> wide characters in <em>string1</em> to  <em>string2</em>.</td>
</tr>
<tr>
<td>wcsncpy</td>
<td>wchar.h</td>
<td><code>wchar_t *wcsncpy(wchar_t *string1, const wchar_t *string2, size_t count);</code></td>
<td>Copies up to <em>count</em> wide characters from <em>string2</em> to  <em>string1</em>.</td>
</tr>
<tr>
<td>wcspbrk</td>
<td>wchar.h</td>
<td><code>wchar_t *wcspbrk(const wchar_t *string1, const wchar_t *string2);</code></td>
<td>Locates the first occurrence in the string pointed to by <em>string1</em> of any wide characters from the string pointed to by <em>string2</em>.</td>
</tr>
<tr>
<td>wcsptime</td>
<td>wchar.h</td>
<td><code>wchar_t *wcsptime (const wchar_t *buf, const wchar_t *format, struct tm *tm );</code></td>
<td>Date and time conversion. Equivalent to strptime(), except that it uses wide characters.</td>
</tr>
<tr>
<td>wcsrchr</td>
<td>wchar.h</td>
<td><code>wchar_t *wcsrchr(const wchar_t  *string, wchar_t character);</code></td>
<td>Locates the last occurrence of  <em>character</em> in the string pointed to by <em>string</em>.</td>
</tr>
<tr>
<td>wcsrtombs<sup>4</sup></td>
<td>wchar.h</td>
<td><code>size_t wcsrtombs (char *dst, const wchar_t **src, size_t len, mbstate_t *ps);</code></td>
<td>Converts wide character string to multibyte string. (Restartable version of wcstombs.)</td>
</tr>
<tr>
<td>wcsspn</td>
<td>wchar.h</td>
<td><code>size_t wcsspn(const wchar_t *string1, const wchar_t *string2);</code></td>
<td>Computes the number of wide characters in the initial segment of the string pointed to by <em>string1</em>, which consists entirely of wide characters from the string pointed to by <em>string2</em>.</td>
</tr>
<tr>
<td>wcsstr</td>
<td>wchar.h</td>
<td><code>wchar_t *wcsstr(const wchar_t *wcs1, const wchar_t *wcs2);</code></td>
<td>Locates the first occurrence of <em>wcs2</em>  in <em>wcs1</em>.</td>
</tr>
<tr>
<td>wcstod</td>
<td>wchar.h</td>
<td><code>double wcstod(const wchar_t *nptr, wchar_t **endptr);</code></td>
<td>Converts the initial portion of the wide-character string pointed to by <em>nptr</em> to a double value.</td>
</tr>
<tr>
<td>wcstod32</td>
<td>wchar.h</td>
<td><code>_Decimal32 wcstod32(const wchar_t *nptr, wchar_t **endptr);</code></td>
<td>Converts the initial portion of the wide-character string pointed to by <em>nptr</em> to a single-precision decimal floating-point value.</td>
</tr>
<tr>
<td>wcstod64</td>
<td>wchar.h</td>
<td><code>_Decimal64 wcstod64(const wchar_t *nptr, wchar_t **endptr);</code></td>
<td>Converts the initial portion of the wide-character string pointed to by <em>nptr</em> to a double-precision decimal floating-point value.</td>
</tr>
<tr>
<td>wcstod128</td>
<td>wchar.h</td>
<td><code>_Decimal128 wcstod128(const wchar_t *nptr, wchar_t **endptr);</code></td>
<td>Converts the initial portion of the wide-character string pointed to by <em>nptr</em> to a quad-precision decimal floating-point value.</td>
</tr>
<tr>
<td>wcstok</td>
<td>wchar.h</td>
<td><code>wchar_t *wcstok(wchar_t *wcs1, const wchar_t *wcs2, wchar_t **ptr)</code></td>
<td>Breaks <em>wcs1</em> into a sequence of tokens, each of which is delimited by a wide character from the wide string pointed to by <em>wcs2</em>.</td>
</tr>
<tr>
<td>wcstol</td>
<td>wchar.h</td>
<td><code>long int wcstol(const wchar_t *nptr, wchar_t **endptr, int base);</code></td>
<td>Converts the initial portion of the wide-character string pointed to by <em>nptr</em> to a long integer value.</td>
</tr>
<tr>
<td>wcstombs</td>
<td>stdlib.h</td>
<td><code>size_t wcstombs(char *dest, const wchar_t *string, size_t count);</code></td>
<td>Converts the wchar_t <em>string</em> into a multibyte string <em>dest</em>.</td>
</tr>
<tr>
<td>wcstoul</td>
<td>wchar.h</td>
<td><code>unsigned long int wcstoul(const wchar_t *nptr, wchar_t **endptr, int base);</code></td>
<td>Converts the initial portion of the wide-character string pointed to by <em>nptr</em> to an unsigned long integer
value.</td>
</tr>
<tr>
<td>wcsxfrm</td>
<td>wchar.h</td>
<td><code>size_t wcsxfrm (wchar_t *wcs1, const wchar_t *wcs2, size_t n);</code></td>
<td>Transforms a wide-character string to values which represent character collating weights and places the resulting wide-character string into an array.</td>
</tr>
<tr>
<td>wctob</td>
<td>stdarg.h<br>
wchar.h</td>
<td><code>int wctob(wint_t wc);</code></td>
<td>Determines whether <em>wc</em> corresponds to a member of the extended character set whose multibyte character representation is a single byte when in the initial shift state.</td>
</tr>
<tr>
<td>wctomb</td>
<td>stdlib.h</td>
<td><code>int wctomb(char *string, wchar_t character);</code></td>
<td>Converts the wchar_t value of <em>character</em> into a multibyte <em>string</em>.</td>
</tr>
<tr>
<td>wctrans</td>
<td>wctype.h</td>
<td><code>wctrans_t wctrans(const char *property);</code></td>
<td>Constructs a value with type wctrans_t that describes a mapping between wide characters identified by the string argument property.</td>
</tr>
<tr>
<td>wctype</td>
<td>wchar.h</td>
<td><code>wctype_t wctype (const char *property);</code></td>
<td>Obtains handle for character property classification.</td>
</tr>
<tr>
<td>wcwidth</td>
<td>wchar.h</td>
<td><code>int wcswidth(const wchar_t *pwcs>, size_t n);</code></td>
<td>Determine the display width of a wide character string.</td>
</tr>
<tr>
<td>wmemchr</td>
<td>wchar.h</td>
<td><code>wchar_t *wmemchr(const wchar_t *s, wchar_t c, size_t n);</code></td>
<td>Locates the first occurrence of <em>c</em> in the initial <em>n</em> wide characters of the object pointed to by <em>s.</em></td>
</tr>
<tr>
<td>wmemcmp</td>
<td>wchar.h</td>
<td><code>int wmemcmp(const wchar_t *s1, const wchar_t *s2, size_t n);</code></td>
<td>Compares the first <em>n</em> wide characters of the object pointed to by <em>s1</em> to the first <em>n</em> characters of the object pointed to by <em>s2</em>.</td>
</tr>
<tr>
<td>wmemcpy</td>
<td>wchar.h</td>
<td><code>wchar_t *wmemcpy(wchar_t *s1, const wchar_t *s2, size_t n);</code></td>
<td>Copies <em>n</em> wide characters from the object pointed to by <em>s2</em> to the object pointed to by  <em>s1</em>
.</td>
</tr>
<tr>
<td>wmemmove</td>
<td>wchar.h</td>
<td><code>wchar_t *wmemmove(wchar_t *s1, const wchar_t *s2, size_t n);</code></td>
<td>Copies <em>n</em> wide characters from the object pointed to by <em>s2</em> to the object pointed to by  <em>s1</em>
.</td>
</tr>
<tr>
<td>wmemset</td>
<td>wchar.h</td>
<td><code>wchar_t *wmemset(wchar_t *s, wchar_t c, size_t n);</code></td>
<td>Copies the value of <em>c</em> into each of the first <em>n</em> wide characters of the object pointed to by
<em>s</em>.</td>
</tr>
<tr>
<td>wprintf</td>
<td>wchar.h</td>
<td><code>int wprintf(const wchar_t  *format, ...);</code></td>
<td>Equivalent to fwprintf with the argument stdout interposed before the arguments to wprintf.</td>
</tr>
<tr>
<td>wscanf</td>
<td>wchar.h</td>
<td><code>int wscanf(const wchar_t  *format, ...);</code></td>
<td>Equivalent to fwscanf with the argument stdin interposed before the arguments of wscanf.</td>
</tr>
<tr>
<td>y0</td>
<td>math.h</td>
<td><code>double y0(double x);</code></td>
<td>Calculates the Bessel function value of the second kind of order 0.</td>
</tr>
<tr>
<td>y1</td>
<td>math.h</td>
<td><code>double y1(double x);</code></td>
<td>Calculates the Bessel function value of the second kind of order 1.</td>
</tr>
<tr>
<td>yn</td>
<td>math.h</td>
<td><code>double yn(int n, double x);</code></td>
<td>Calculates the Bessel function value of the second kind of order <em>n.</em></td>
</tr>
</tbody>
</table>
</div>