---
layout: post
title: Functions in C Programming
date: 2018-07-07 13:32:20 +0700
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
files to use these functions. They are a;ready declared and defined in C libraries.

List of Standard C Library Functions

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
<td>char *ctime64(const time64_t *<em>time</em>);</td>
<td>Converts <em>time</em> to
a character string.</td>
</tr>
<tr>
<td>ctime_r</td>
<td>time.h</td>
<td>char *ctime_r(const time_t *time,
char *buf);</td>
<td>Converts <em>time</em> to
a character string. (Restartable version of ctime.)</td>
</tr>
<tr>
<td>ctime64_r</td>
<td>time.h</td>
<td>char *ctime64_r(const time64_t *time,
char *buf);</td>
<td>Converts <em>time</em> to
a character string. (Restartable version of ctime64.)</td>
</tr>
<tr>
<td>difftime</td>
<td>time.h</td>
<td>double difftime(time_t <em>time2</em>, time_t <em>time1</em>);</td>
<td>Computes the difference between <em>time2</em> and <em>time1</em>.</td>
</tr>
<tr>
<td>difftime64</td>
<td>time.h</td>
<td>double difftime64(time64_t <em>time2</em>, time64_t <em>time1</em>);</td>
<td>Computes the difference between <em>time2</em> and <em>time1</em>.</td>
</tr>
<tr>
<td>div</td>
<td>stdlib.h</td>
<td>div_t div(int <em>numerator</em>, int <em>denominator</em>);</td>
<td>Calculates the quotient and remainder of
the division of <em>numerator</em> by <em>denominator</em>.</td>
</tr>
<tr>
<td>erf</td>
<td>math.h</td>
<td>double erf(double <em>x</em>);</td>
<td>Calculates the error function of  <em>x</em>.</td>
</tr>
<tr>
<td>erfc</td>
<td>math.h</td>
<td>double erfc(double <em>x</em>);</td>
<td>Calculates the error function for large values
of <em>x</em>.</td>
</tr>
<tr>
<td>exit</td>
<td>stdlib.h</td>
<td>void exit(int <em>status</em>);</td>
<td>Ends a program normally.</td>
</tr>
<tr>
<td>exp</td>
<td>math.h</td>
<td>double exp(double <em>x</em>);</td>
<td>Calculates the exponential function of a
floating-point argument <em>x</em>.</td>
</tr>
<tr>
<td>fabs</td>
<td>math.h</td>
<td>double fabs(double <em>x</em>);</td>
<td>Calculates the absolute value of a floating-point
argument <em>x</em>.</td>
</tr>
<tr>
<td>fclose</td>
<td>stdio.h</td>
<td>int fclose(FILE *<em>stream</em>);</td>
<td>Closes the specified <em>stream</em>.</td>
</tr>
<tr>
<td>fdopen<sup>5</sup></td>
<td>stdio.h</td>
<td>FILE *fdopen(int <var class="pv">handle</var>,
const char <var class="pv">*type</var>);</td>
<td>Associates an input or output stream with
the file identified by handle.</td>
</tr>
<tr>
<td>feof</td>
<td>stdio.h</td>
<td>int feof(FILE *<em>stream</em>);</td>
<td>Tests whether the end-of-file flag is set
for a given <em>stream</em>.</td>
</tr>
<tr>
<td>ferror</td>
<td>stdio.h</td>
<td>int ferror(FILE *<em>stream</em>);</td>
<td>Tests for an error indicator in reading from
or writing to <em>stream</em>.</td>
</tr>
<tr>
<td>fflush<sup>1</sup></td>
<td>stdio.h</td>
<td>int fflush(FILE *<em>stream</em>);</td>
<td>Writes the contents of the buffer associated
with the output <em>stream</em>.</td>
</tr>
<tr>
<td>fgetc<sup>1</sup></td>
<td>stdio.h</td>
<td>int fgetc(FILE *<em>stream</em>);</td>
<td>Reads a single unsigned character from the
input <em>stream</em>.</td>
</tr>
<tr>
<td>fgetpos<sup>1</sup></td>
<td>stdio.h</td>
<td>int fgetpos(FILE *<em>stream</em>, fpos_t *<em>pos</em>);</td>
<td>Stores the current position of the file pointer
associated with <em>stream</em> into the object pointed to
by <em>pos</em>.</td>
</tr>
<tr>
<td>fgets<sup>1</sup></td>
<td>stdio.h</td>
<td>char *fgets(char *<em>string</em>, int <em>n</em>, FILE *<em>stream</em>);</td>
<td>Reads a string from the input <em>stream</em>.</td>
</tr>
<tr>
<td>fgetwc<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>wint_t fgetwc(FILE *<em>stream</em>);</td>
<td>Reads the next multibyte character from the
input stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>fgetws<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>wchar_t *fgetws(wchar_t *<em>wcs</em>,  int <em>n</em>, FILE *<em>stream</em>);</td>
<td>Reads wide characters from the stream into
the array pointed to by <em>wcs</em>.</td>
</tr>
<tr>
<td>fileno<sup>5</sup></td>
<td>stdio.h</td>
<td>int fileno(FILE <var class="pv">*stream</var>);</td>
<td>Determines the file handle currently associated
with <var class="pv">stream</var>.</td>
</tr>
<tr>
<td>floor</td>
<td>math.h</td>
<td>double floor(double <em>x</em>);</td>
<td>Calculates the floating-point value representing
the largest integer less than or equal to <em>x</em>.</td>
</tr>
<tr>
<td>fmod</td>
<td>math.h</td>
<td>double fmod(double <em>x</em>,
double <em>y</em>);</td>
<td>Calculates the floating-point remainder of <em>x/y</em>.</td>
</tr>
<tr>
<td>fopen</td>
<td>stdio.h</td>
<td>FILE *fopen(const char *<em>filename</em>, const char *<em>mode</em>);</td>
<td>Opens the specified file.</td>
</tr>
<tr>
<td>fprintf</td>
<td>stdio.h</td>
<td>int fprintf(FILE *<em>stream</em>, const char *<em>format-string</em>, <em>arg-list</em>);</td>
<td>Formats and prints characters and values
to the output <em>stream</em>.</td>
</tr>
<tr>
<td>fputc<sup>1</sup></td>
<td>stdio.h</td>
<td>int fputc(int <em>c</em>,
FILE *<em>stream</em>);</td>
<td>Prints a character to the output <em>stream</em>.</td>
</tr>
<tr>
<td>fputs<sup>1</sup></td>
<td>stdio.h</td>
<td>int fputs(const char *<em>string</em>, FILE *<em>stream</em>);</td>
<td>Copies a string to the output <em>stream</em>.</td>
</tr>
<tr>
<td>fputwc<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>wint_t fputwc(wchar_t <em>wc</em>,  FILE <em>*stream</em>);</td>
<td>Converts the wide character <em>wc</em> to a multibyte character and writes it to the output stream pointed
to by  <em>stream</em> at the current position.</td>
</tr>
<tr>
<td>fputws<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>int fputws(const wchar_t *<em>wcs</em>, FILE  <em>*stream</em>);</td>
<td>Converts the wide-character string <em>wcs</em> to a multibyte-character string and writes it to <em>stream</em> as a multibyte character string.</td>
</tr>
<tr>
<td>fread</td>
<td>stdio.h</td>
<td>size_t fread(void *<em>buffer</em>, size_t <em>size</em>, size_t <em>count</em>, FILE *<em>stream</em>);</td>
<td>Reads up to <var class="pv">count</var> items of <em>size</em> length from the input <em>stream</em>, and stores
them in <em>buffer</em>.</td>
</tr>
<tr>
<td>free</td>
<td>stdlib.h</td>
<td>void free(void *<em>ptr</em>);</td>
<td>Frees a block of storage.</td>
</tr>
<tr>
<td>freopen</td>
<td>stdio.h</td>
<td>FILE *freopen(const char *<em>filename</em>, const char *<em>mode</em>, FILE *<em>stream</em>);</td>
<td>Closes <em>stream</em>, and
reassigns it to the file specified.</td>
</tr>
<tr>
<td>frexp</td>
<td>math.h</td>
<td>double frexp(double <em>x</em>, int *<em>expptr</em>);</td>
<td>Separates a floating-point number into its
mantissa and exponent.</td>
</tr>
<tr>
<td>fscanf</td>
<td>stdio.h</td>
<td>int fscanf(FILE *<em>stream</em>, const char *<em>format-string</em>, <em>arg-list</em>);</td>
<td>Reads data from <em>stream</em> into locations given by <em>arg-list</em>.</td>
</tr>
<tr>
<td>fseek<sup>1</sup></td>
<td>stdio.h</td>
<td>int fseek(FILE *<em>stream</em>, long int <em>offset</em>, int <em>origin</em>);</td>
<td>Changes the current file position associated
with <em>stream</em> to a new location.</td>
</tr>
<tr>
<td>fsetpos<sup>1</sup></td>
<td>stdio.h</td>
<td>int fsetpos(FILE *<em>stream</em>, const fpos_t *<em>pos</em>);</td>
<td>Moves the current file position to a new
location determined by <em>pos</em>.</td>
</tr>
<tr>
<td>ftell<sup>1</sup></td>
<td>stdio.h</td>
<td>long int ftell(FILE *<em>stream</em>);</td>
<td>Gets the current position of the file pointer.</td>
</tr>
<tr>
<td>fwide<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>int fwide(FILE <em>*stream</em>, int <em>mode</em>);</td>
<td>Determines the orientation of the stream
pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>fwprintf<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>int fwprintf(FILE <em>*stream</em>, const wchar_t <em>*format</em>, <em>arg-list</em>);</td>
<td>Writes output to the stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>fwrite</td>
<td>stdio.h</td>
<td>size_t fwrite(const void *<em>buffer</em>, size_t <em>size</em>,size_t <em>count</em>, FILE *<em>stream</em>);</td>
<td>Writes up to <em>count</em> items
of <em>size</em> length from <em>buffer</em> to <em>stream</em>.</td>
</tr>
<tr>
<td>fwscanf<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>int fwscanf(FILE <em>*stream</em>, const wchar_t <em>*format</em>, <em>arg-list</em>)</td>
<td>Reads input from the stream pointed to by <em>stream</em>.</td>
</tr>
<tr>
<td>gamma</td>
<td>math.h</td>
<td>double gamma(double <em>x</em>);</td>
<td>Computes the Gamma Function</td>
</tr>
<tr>
<td>getc<sup>1</sup></td>
<td>stdio.h</td>
<td>int getc(FILE *<em>stream</em>);</td>
<td>Reads a single character from the input <em>stream</em>.</td>
</tr>
<tr>
<td>getchar<sup>1</sup></td>
<td>stdio.h</td>
<td>int getchar(void);</td>
<td>Reads a single character from <em>stdin.</em></td>
</tr>
<tr>
<td>getenv</td>
<td>stdlib.h</td>
<td>char *getenv(const char *<em>varname</em>);</td>
<td>Searches environment variables for <em>varname</em>.</td>
</tr>
<tr>
<td>gets</td>
<td>stdio.h</td>
<td>char *gets(char *<em>buffer</em>);</td>
<td>Reads a string from <em>stdin</em>, and stores it in <em>buffer</em>.</td>
</tr>
<tr>
<td>getwc<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>wint_t getwc(FILE <em>*stream</em>);</td>
<td>Reads the next multibyte character from  <em>stream</em>, converts it to a wide character and advances the
associated file position indicator for <em>stream</em>.</td>
</tr>
<tr>
<td>getwchar<sup>6</sup></td>
<td>wchar.h</td>
<td>wint_t getwchar(void);</td>
<td>Reads the next multibyte character from stdin,
converts it to a wide character, and advances the associated file position
indicator for stdin.</td>
</tr>
<tr>
<td>gmtime</td>
<td>time.h</td>
<td>struct tm *gmtime(const time_t *<em>time</em>);</td>
<td>Converts a <em>time</em> value
to a structure of type tm.</td>
</tr>
<tr>
<td>gmtime64</td>
<td>time.h</td>
<td>struct tm *gmtime64(const time64_t *<em>time</em>);</td>
<td>Converts a <em>time</em> value
to a structure of type tm.</td>
</tr>
<tr>
<td>gmtime_r</td>
<td>time.h</td>
<td>struct tm *gmtime_r (const time_t *time,
struct tm *result);</td>
<td>Converts a <var class="pv">time</var> value to a structure
of type tm. (Restartable version of gmtime.)</td>
</tr>
<tr>
<td>gmtime64_r</td>
<td>time.h</td>
<td>struct tm *gmtime64_r (const time64_t *time,
struct tm *result);</td>
<td>Converts a <var class="pv">time</var> value to a structure
of type tm. (Restartable version of gmtime64.)</td>
</tr>
<tr>
<td>hypot</td>
<td>math.h</td>
<td>double hypot(double <em>side1</em>, double <em>side2</em>);</td>
<td>Calculates the hypotenuse of a right-angled
triangle with sides of length <em>side1</em> and <em>side2</em>.</td>
</tr>
<tr>
<td>isalnum</td>
<td>ctype.h</td>
<td>int isalnum(int <em>c</em>);</td>
<td>Tests if <em>c</em> is alphanumeric.</td>
</tr>
<tr>
<td>isalpha</td>
<td>ctype.h</td>
<td>int isalpha(int <em>c</em>);</td>
<td>Tests if <em>c</em> is alphabetic.</td>
</tr>
<tr>
<td>isascii</td>
<td>ctype.h</td>
<td>int isascii(int <em>c</em>);</td>
<td>Tests if <em>c</em> is within
the 7-bit US-ASCII range.</td>
</tr>
<tr>
<td>iscntrl</td>
<td>ctype.h</td>
<td>int iscntrl(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a control
character.</td>
</tr>
<tr>
<td>isdigit</td>
<td>ctype.h</td>
<td>int isdigit(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a decimal
digit.</td>
</tr>
<tr>
<td>isgraph</td>
<td>ctype.h</td>
<td>int isgraph(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a printable
character excluding the space.</td>
</tr>
<tr>
<td>islower</td>
<td>ctype.h</td>
<td>int islower(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a lowercase
letter.</td>
</tr>
<tr>
<td>isprint</td>
<td>ctype.h</td>
<td>int isprint(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a printable
character including the space.</td>
</tr>
<tr>
<td>ispunct</td>
<td>ctype.h</td>
<td>int ispunct(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a punctuation
character.</td>
</tr>
<tr>
<td>isspace</td>
<td>ctype.h</td>
<td>int isspace(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a whitespace
character.</td>
</tr>
<tr>
<td>isupper</td>
<td>ctype.h</td>
<td>int isupper(int <em>c</em>);</td>
<td>Tests if <em>c</em> is an
uppercase letter.</td>
</tr>
<tr>
<td>iswalnum<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswalnum (wint_t wc);</td>
<td>Checks for any alphanumeric wide character.</td>
</tr>
<tr>
<td>iswalpha<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswalpha (wint_t wc);</td>
<td>Checks for any alphabetic wide character.</td>
</tr>
<tr>
<td>iswcntrl<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswcntrl (wint_t wc);</td>
<td>Tests for any control wide character.</td>
</tr>
<tr>
<td>iswctype<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswctype(wint_t wc, wctype_t wc_prop);</td>
<td>Determines whether or not the wide character
wc has the property wc_prop.</td>
</tr>
<tr>
<td>iswdigit<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswdigit (wint_t wc);</td>
<td>Checks for any decimal-digit wide character.</td>
</tr>
<tr>
<td>iswgraph<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswgraph (wint_t wc);</td>
<td>Checks for any printing wide character except
for the wide-character space.</td>
</tr>
<tr>
<td>iswlower<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswlower (wint_t wc);</td>
<td>Checks for any lowercase wide character.</td>
</tr>
<tr>
<td>iswprint<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswprint (wint_t wc);</td>
<td>Checks for any printing wide character.</td>
</tr>
<tr>
<td>iswpunct<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswpunct (wint_t wc);</td>
<td>Test for a wide non-alphanumeric, non-space
character.</td>
</tr>
<tr>
<td>iswspace<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswspace (wint_t wc);</td>
<td>Checks for any wide character that corresponds
to an implementation-defined set of wide characters for which iswalnum is
false.</td>
</tr>
<tr>
<td>iswupper<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswupper (wint_t wc);</td>
<td>Checks for any uppercase wide character.</td>
</tr>
<tr>
<td>iswxdigit<sup>4</sup></td>
<td>wctype.h</td>
<td>int iswxdigit (wint_t wc);</td>
<td>Checks for any hexadecimal digit character.</td>
</tr>
<tr>
<td>isxdigit<sup>4</sup></td>
<td>wctype.h</td>
<td>int isxdigit(int <em>c</em>);</td>
<td>Tests if <em>c</em> is a hexadecimal
digit.</td>
</tr>
<tr>
<td>j0</td>
<td>math.h</td>
<td>double j0(double <em>x</em>);</td>
<td>Calculates the Bessel function value of the
first kind of order 0.</td>
</tr>
<tr>
<td>j1</td>
<td>math.h</td>
<td>double j1(double <em>x</em>);</td>
<td>Calculates the Bessel function value of the
first kind of order 1.</td>
</tr>
<tr>
<td>jn</td>
<td>math.h</td>
<td>double jn(int <em>n</em>,
double <em>x</em>);</td>
<td>Calculates the Bessel function value of the
first kind of order <var class="pv">n</var>.</td>
</tr>
<tr>
<td>labs</td>
<td>stdlib.h</td>
<td>long int labs(long int <em>n</em>);</td>
<td>Calculates the absolute value of <em>n</em>.</td>
</tr>
<tr>
<td>ldexp</td>
<td>math.h</td>
<td>double ldexp(double <em>x</em>, int <em>exp</em>);</td>
<td>Returns the value of <em>x</em> multiplied by (2 to the power of <em>exp</em>).</td>
</tr>
<tr>
<td>ldiv</td>
<td>stdlib.h</td>
<td>ldiv_t ldiv(long int <em>numerator</em>, long int <em>denominator</em>);</td>
<td>Calculates the quotient and remainder of <em>numerator</em>/<em>denominator</em>.</td>
</tr>
<tr>
<td>localeconv</td>
<td>locale.h</td>
<td>struct lconv *localeconv(void);</td>
<td>Formats numeric quantities in struct lconv
according to the current locale.</td>
</tr>
<tr>
<td>localtime</td>
<td>time.h</td>
<td>struct tm *localtime(const time_t *<em>timeval</em>);</td>
<td>Converts <em>timeval</em> to
a structure of type tm.</td>
</tr>
<tr>
<td>localtime64</td>
<td>time.h</td>
<td>struct tm *localtime64(const time64_t *<em>timeval</em>);</td>
<td>Converts <em>timeval</em> to
a structure of type tm.</td>
</tr>
<tr>
<td>localtime_r</td>
<td>time.h</td>
<td>struct tm *localtime_r (const time_t *timeval,
struct tm *result);</td>
<td>Converts a <var class="pv">time</var> value to a structure
of type <var class="pv">tm</var>. (Restartable version of localtime.)</td>
</tr>
<tr>
<td>localtime64_r</td>
<td>time.h</td>
<td>struct tm *localtime64_r (const
time64_t *timeval, struct tm *result);</td>
<td>Converts a <var class="pv">time</var> value to a structure
of type <var class="pv">tm</var>. (Restartable version of localtime64.)</td>
</tr>
<tr>
<td>log</td>
<td>math.h</td>
<td>double log(double <em>x</em>);</td>
<td>Calculates the natural logarithm of <em>x</em>.</td>
</tr>
<tr>
<td>log10</td>
<td>math.h</td>
<td>double log10(double <em>x</em>);</td>
<td>Calculates the base 10 logarithm of <em>x</em>.</td>
</tr>
<tr>
<td>longjmp</td>
<td>setjmp.h</td>
<td>void longjmp(jmp_buf <em>env</em>, int <em>value</em>);</td>
<td>Restores a stack environment previously set
in <em>env</em> by the setjmp function.</td>
</tr>
<tr>
<td>malloc</td>
<td>stdlib.h</td>
<td>void *malloc(size_t <em>size</em>);</td>
<td>Reserves a block of storage.</td>
</tr>
<tr>
<td>mblen</td>
<td>stdlib.h</td>
<td>int mblen(const char *<em>string</em>, size_t <em>n</em>);</td>
<td>Determines the length of a multibyte character <em>string</em>.</td>
</tr>
<tr>
<td>mbrlen<sup>4</sup></td>
<td>wchar.h</td>
<td>int mbrlen (const char *s, size_t
n, mbstate_t *ps);</td>
<td>Determines the length of a multibyte character.
(Restartable version of mblen.)</td>
</tr>
<tr>
<td>mbrtowc<sup>4</sup></td>
<td>wchar.h</td>
<td>int mbrtowc (wchar_t *pwc, const
char *s, size_t n, mbstate_t *ps);</td>
<td>Convert a multibyte character to a wide character
(Restartable version of mbtowc.)</td>
</tr>
<tr>
<td>mbsinit<sup>4</sup></td>
<td>wchar.h</td>
<td>int mbsinit (const mbstate_t *ps);</td>
<td>Test state object <var class="pv">*ps</var> for
initial state.</td>
</tr>
<tr>
<td>mbsrtowcs<sup>4</sup></td>
<td>wchar.h</td>
<td>size_t mbsrtowc (wchar_t *dst, const
char **src, size_t len, mbstate_t *ps);</td>
<td>Convert multibyte string to a wide character
string. (Restartable version of mbstowcs.)</td>
</tr>
<tr>
<td>mbstowcs</td>
<td>stdlib.h</td>
<td>size_t mbstowcs(wchar_t *<em>pwc</em>, const char *<em>string</em>,
size_t <em>n</em>);</td>
<td>Converts the multibyte characters in <em>string</em> to their corresponding wchar_t codes, and stores
not more than <em>n</em> codes in <em>pwc</em>.</td>
</tr>
<tr>
<td>mbtowc</td>
<td>stdlib.h</td>
<td>int mbtowc(wchar_t *<em>pwc</em>, const char *<em>string</em>, size_t <em>n</em>);</td>
<td>Stores the wchar_t code corresponding
to the first <em>n</em> bytes of multibyte character <em>string</em> into the wchar_t character <em>pwc</em>.</td>
</tr>
<tr>
<td>memchr</td>
<td>string.h</td>
<td>void *memchr(const void *<em>buf</em>, int <em>c</em>, size_t <em>count</em>);</td>
<td>Searches the first <em>count</em> bytes of <em>buf</em> for the first occurrence of <em>c</em> converted to an unsigned character.</td>
</tr>
<tr>
<td>memcmp</td>
<td>string.h</td>
<td>int memcmp(const void *<em>buf1</em>, const void *<em>buf2</em>, size_t <em>count</em>);</td>
<td>Compares up to <em>count</em> bytes
of <em>buf1</em> and <em>buf2</em>.</td>
</tr>
<tr>
<td>memcpy</td>
<td>string.h</td>
<td>void *memcpy(void *<em>dest</em>, const void *<em>src</em>,
size_t <em>count</em>);</td>
<td>Copies <em>count</em> bytes
of <em>src</em> to <em>dest</em>.</td>
</tr>
<tr>
<td>memmove</td>
<td>string.h</td>
<td>void *memmove(void *<em>dest</em>, const void *<em>src</em>,
size_t <em>count</em>);</td>
<td>Copies <em>count</em> bytes
of <em>src</em> to <em>dest</em>.  Allows copying
between objects that overlap.</td>
</tr>
<tr>
<td>memset</td>
<td>string.h</td>
<td>void *memset(void *<em>dest</em>, int <em>c</em>, size_t <em>count</em>);</td>
<td>Sets <em>count</em> bytes
of <em>dest</em> to a value <em>c</em>.</td>
</tr>
<tr>
<td>mktime</td>
<td>time.h</td>
<td>time_t mktime(struct tm *<em>time</em>);</td>
<td>Converts local <em>time</em> into
calendar time.</td>
</tr>
<tr>
<td>mktime64</td>
<td>time.h</td>
<td>time64_t mktime64(struct tm *<em>time</em>);</td>
<td>Converts local <em>time</em> into
calendar time.</td>
</tr>
<tr>
<td>modf</td>
<td>math.h</td>
<td>double modf(double <em>x</em>,
double *<em>intptr</em>);</td>
<td>Breaks down the floating-point value <em>x</em> into fractional and integral parts.</td>
</tr>
<tr>
<td>nextafter</td>
<td>math.h</td>
<td>double nextafter(double <em>x</em>, double <em>y</em>);</td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nextafterl</td>
<td>math.h</td>
<td>long double nextafterl(long double <em>x</em>, long double <em>y</em>);</td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nexttoward</td>
<td>math.h</td>
<td>double nexttoward(double <em>x</em>, long double <em>y</em>);</td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nexttowardl</td>
<td>math.h</td>
<td>long double nexttowardl(long double <em>x</em>, long double <em>y</em>);</td>
<td>Calculates the next representable value after <em>x</em> in the direction of <em>y</em>.</td>
</tr>
<tr>
<td>nl_langinfo<sup>4</sup></td>
<td>langinfo.h</td>
<td>char *nl_langinfo(nl_item <var class="pv">item</var>);</td>
<td>Retrieve from the current locale the string
that describes the requested information specified by <var class="pv">item</var>.</td>
</tr>
<tr>
<td>perror</td>
<td>stdio.h</td>
<td>void perror(const char *<em>string</em>);</td>
<td>Prints an error message to stderr.</td>
</tr>
<tr>
<td>pow</td>
<td>math.h</td>
<td>double pow(double <em>x</em>,
double <em>y</em>);</td>
<td>Calculates the value <em>x</em> to the power <em>y</em>.</td>
</tr>
<tr>
<td>printf</td>
<td>stdio.h</td>
<td>int printf(const char *<em>format-string</em>, <em>arg-list</em>);</td>
<td>Formats and prints characters and values
to stdout.</td>
</tr>
<tr>
<td>putc<sup>1</sup></td>
<td>stdio.h</td>
<td>int putc(int <em>c</em>, FILE *<em>stream</em>);</td>
<td>Prints <em>c</em> to the output <em>stream</em>.</td>
</tr>
<tr>
<td>putchar<sup>1</sup></td>
<td>stdio.h</td>
<td>int putchar(int <em>c</em>);</td>
<td>Prints <em>c</em> to stdout.</td>
</tr>
<tr>
<td>putenv</td>
<td>stdlib.h</td>
<td>int *putenv(const char *<var class="pv">varname</var>);</td>
<td>Sets the value of an environment variable
by altering an existing variable or creating a new one.</td>
</tr>
<tr>
<td>puts</td>
<td>stdio.h</td>
<td>int puts(const char *<em>string</em>);</td>
<td>Prints a string to stdout.</td>
</tr>
<tr>
<td>putwc<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>wint_t putwchar(wchar_t <em>wc</em>,  FILE <em>*stream</em>);</td>
<td>Converts the wide character <em>wc</em> to a multibyte character, and writes it to the stream at the current
position.</td>
</tr>
<tr>
<td>putwchar<sup>6</sup></td>
<td>wchar.h</td>
<td>wint_t putwchar(wchar_t <em>wc</em>);</td>
<td>Converts the wide character <em>wc</em> to a multibyte character and writes it to stdout.</td>
</tr>
<tr>
<td>qsort</td>
<td>stdlib.h</td>
<td>void qsort(void *<em>base</em>, size_t <em>num</em>, size_t <em>width</em>, int(*<em>compare</em>)(const void *<em>element1</em>, const void *<em>element2</em>));</td>
<td>Performs a quick sort of an array of <em>num</em> elements, each of <em>width</em> bytes
in size.</td>
</tr>
<tr>
<td>raise</td>
<td>signal.h</td>
<td>int raise(int <em>sig</em>);</td>
<td>Sends the signal <em>sig</em> to
the running program.</td>
</tr>
<tr>
<td>rand</td>
<td>stdlib.h</td>
<td>int rand(void);</td>
<td>Returns a pseudo-random integer.</td>
</tr>
<tr>
<td>rand_r</td>
<td>stdlib.h</td>
<td>int rand_r(void);</td>
<td>Returns a pseudo-random integer. (Restartable
version)</td>
</tr>
<tr>
<td>realloc</td>
<td>stdlib.h</td>
<td>void *realloc(void *<em>ptr</em>, size_t <em>size</em>);</td>
<td>Changes the <em>size</em> of
a previously reserved storage block.</td>
</tr>
<tr>
<td>regcomp</td>
<td>regex.h</td>
<td>int regcomp(regex_t <em>*preg</em>, const char <em>*pattern</em>, int <em>cflags</em>);</td>
<td>Compiles the source regular expression pointed
to by <em>pattern</em> into an executable version and stores
it in the location pointed to by <em>preg</em>.</td>
</tr>
<tr>
<td>regerror</td>
<td>regex.h</td>
<td>size_t regerror(int <em>errcode</em>, const regex_t <em>*preg</em>, char <em>*errbuf</em>,  size_t <em>errbuf_size</em>);</td>
<td>Finds the description for the error code <em>errcode</em> for the regular expression  <em>preg</em>.</td>
</tr>
<tr>
<td>regexec</td>
<td>regex.h</td>
<td>int regexec(const regex_t <em>*preg</em>, const char <em>*string</em>, size_t <em>nmatch</em>, regmatch_t <em>*pmatch</em>, int <em>eflags</em>);</td>
<td>Compares the null-ended string <em>string</em> against the compiled regular expression <em>preg</em> to find a match between the two.</td>
</tr>
<tr>
<td>regfree</td>
<td>regex.h</td>
<td>void regfree(regex_t *preg);</td>
<td>Frees any memory that was allocated by regcomp
to implement the regular expression <em>preg</em>.</td>
</tr>
<tr>
<td>remove</td>
<td>stdio.h</td>
<td>int remove(const char *<em>filename</em>);</td>
<td>Deletes the file specified by <em>filename</em>.</td>
</tr>
<tr>
<td>rename</td>
<td>stdio.h</td>
<td>int rename(const char *<em>oldname</em>, const char *<em>newname</em>);</td>
<td>Renames the specified file.</td>
</tr>
<tr>
<td>rewind<sup>1</sup></td>
<td>stdio.h</td>
<td>void rewind(FILE *<em>stream</em>);</td>
<td>Repositions the file pointer associated with <em>stream</em> to the beginning of the file.</td>
</tr>
<tr>
<td>scanf</td>
<td>stdio.h</td>
<td>int scanf(const char *<em>format-string</em>, <em>arg-list</em>);</td>
<td>Reads data from stdin into locations given
by <em>arg-list</em>.</td>
</tr>
<tr>
<td>setbuf</td>
<td>stdio.h</td>
<td>void setbuf(FILE *<em>stream</em>, char *<em>buffer</em>);</td>
<td>Controls buffering for <em>stream</em>.</td>
</tr>
<tr>
<td>setjmp</td>
<td>setjmp.h</td>
<td>int setjmp(jmp_buf <em>env</em>);</td>
<td>Saves a stack environment that can be subsequently
restored by longjmp.</td>
</tr>
<tr>
<td>setlocale</td>
<td>locale.h</td>
<td>char *setlocale(int <em>category</em>, const char *<em>locale</em>);</td>
<td>Changes or queries variables defined in the <em>locale</em>.</td>
</tr>
<tr>
<td>setvbuf</td>
<td>stdio.h</td>
<td>int setvbuf(FILE *<em>stream</em>, char *<em>buf</em>, int <em>type</em>, size_t <em>size</em>);</td>
<td>Controls buffering and buffer <em>size</em> for <em>stream</em>.</td>
</tr>
<tr>
<td>signal</td>
<td>signal.h</td>
<td>void(*signal (int <em>sig</em>, void(*<em>func</em>)(int))) (int);</td>
<td>Registers func as a signal handler for the
signal sig.</td>
</tr>
<tr>
<td>sin</td>
<td>math.h</td>
<td>double sin(double <em>x</em>);</td>
<td>Calculates the sine of <em>x</em>.</td>
</tr>
<tr>
<td>sinh</td>
<td>math.h</td>
<td>double sinh(double <em>x</em>);</td>
<td>Calculates the hyperbolic sine of <em>x</em>.</td>
</tr>
<tr>
<td>snprintf</td>
<td>stdio.h</td>
<td>int snprintf(char *outbuf, size_t n, const
char*, ...)</td>
<td>Same as sprintf except that the function
will stop after n characters have been written to outbuf.</td>
</tr>
<tr>
<td>sprintf</td>
<td>stdio.h</td>
<td>int sprintf(char *<em>buffer</em>, const char *<em>format-string</em>, <em>arg-list</em>);</td>
<td>Formats and stores characters and values
in <em>buffer</em>.</td>
</tr>
<tr>
<td>sqrt</td>
<td>math.h</td>
<td>double sqrt(double <em>x</em>);</td>
<td>Calculates the square root of <em>x</em>.</td>
</tr>
<tr>
<td>srand</td>
<td>stdlib.h</td>
<td>void srand(unsigned int <em>seed</em>);</td>
<td>Sets the <em>seed</em> for
the pseudo-random number generator.</td>
</tr>
<tr>
<td>sscanf</td>
<td>stdio.h</td>
<td>int sscanf(const char *<em>buffer</em>, const char *<em>format</em>, <em>arg-list</em>);</td>
<td>Reads data from <em>buffer</em> into the locations given by <em>arg-list</em>.</td>
</tr>
<tr>
<td>strcasecmp</td>
<td>strings.h</td>
<td>int srtcasecmp(const char *string1, const
char *string2);</td>
<td>Compares strings without case sensitivity.</td>
</tr>
<tr>
<td>strcat</td>
<td>string.h</td>
<td>char *strcat(char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Concatenates <em>string2</em> to <em>string1</em>.</td>
</tr>
<tr>
<td>strchr</td>
<td>string.h</td>
<td>char *strchr(const char *<em>string</em>, int <em>c</em>);</td>
<td>Locates the first occurrence of <em>c</em> in <em>string</em>.</td>
</tr>
<tr>
<td>strcmp</td>
<td>string.h</td>
<td>int strcmp(const char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Compares the value of <em>string1</em> to <em>string2</em>.</td>
</tr>
<tr>
<td>strcoll</td>
<td>string.h</td>
<td>int strcoll(const char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Compares two strings using the collating
sequence in the current locale.</td>
</tr>
<tr>
<td>strcpy</td>
<td>string.h</td>
<td>char *strcpy(char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Copies <em>string2</em> into <em>string1</em>.</td>
</tr>
<tr>
<td>strcspn</td>
<td>string.h</td>
<td>size_t strcspn(const char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Returns the length of the initial substring
of <em>string1</em> consisting of characters not contained
in <em>string2</em>.</td>
</tr>
<tr>
<td>strerror</td>
<td>string.h</td>
<td>char *strerror(int <em>errnum</em>);</td>
<td>Maps the error number in <em>errnum</em> to an error message string.</td>
</tr>
<tr>
<td>strfmon<sup>4</sup></td>
<td>wchar.h</td>
<td>int strfmon (char *s, size_t maxsize,
const char *format, ...);</td>
<td>Converts monetary value to string.</td>
</tr>
<tr>
<td>strftime</td>
<td>time.h</td>
<td>size_t strftime (char *<em>dest</em>, size_t <em>maxsize</em>, const char *<em>format</em>, const struct tm *<em>timeptr</em>);</td>
<td>Stores characters in an array pointed to
by <em>dest</em>, according to the string determined by <em>format</em>.</td>
</tr>
<tr>
<td>strlen</td>
<td>string.h</td>
<td>size_t strlen(const char *<em>string</em>);</td>
<td>Calculates the length of <em>string</em>.</td>
</tr>
<tr>
<td>strncasecmp</td>
<td>strings.h</td>
<td>int strncasecmp(const char *string1, const
char *string2, size_t count);</td>
<td>Compares strings without case sensitivity.</td>
</tr>
<tr>
<td>strncat</td>
<td>string.h</td>
<td>char *strncat(char *<em>string1</em>, const char *<em>string2</em>, size_t <em>count</em>);</td>
<td>Concatenates up to <em>count</em> characters of <em>string2</em> to <em>string1</em>.</td>
</tr>
<tr>
<td>strncmp</td>
<td>string.h</td>
<td>int strncmp(const char *<em>string1</em>, const char *<em>string2</em>, size_t <em>count</em>);</td>
<td>Compares up to <em>count</em> characters
of <em>string1</em> and <em>string2</em>.</td>
</tr>
<tr>
<td>strncpy</td>
<td>string.h</td>
<td>char *strncpy(char *<em>string1</em>, const char *<em>string2</em>, size_t <em>count</em>);</td>
<td>Copies up to <em>count</em> characters
of <em>string2</em> to <em>string1</em>.</td>
</tr>
<tr>
<td>strpbrk</td>
<td>string.h</td>
<td>char *strpbrk(const char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Locates the first occurrence in <em>string1</em> of any character in <em>string2</em>.</td>
</tr>
<tr>
<td>strptime<sup>4</sup></td>
<td>time.h</td>
<td>char *strptime (const char *buf,
const char *format, struct tm *tm);</td>
<td>Date and time conversion</td>
</tr>
<tr>
<td>strrchr</td>
<td>string.h</td>
<td>char *strrchr(const char *<em>string</em>, int <em>c</em>);</td>
<td>Locates the last occurrence of <em>c</em> in <em>string</em>.</td>
</tr>
<tr>
<td>strspn</td>
<td>string.h</td>
<td>size_t strspn(const char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Returns the length of the initial substring
of <em>string1</em> consisting of characters contained in <em>string2</em>.</td>
</tr>
<tr>
<td>strstr</td>
<td>string.h</td>
<td>char *strstr(const char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Returns a pointer to the first occurrence
of <em>string2</em> in <em>string1</em>.</td>
</tr>
<tr>
<td>strtod</td>
<td>stdlib.h</td>
<td>double strtod(const char *<em>nptr</em>, char **<em>endptr</em>);</td>
<td>Converts <em>nptr</em> to
a double precision value.</td>
</tr>
<tr>
<td>strtod32</td>
<td>stdlib.h</td>
<td>_Decimal32 strtod32(const char *<em>nptr</em>, char **<em>endptr</em>);</td>
<td>Converts <em>nptr</em> to
a single-precision decimal floating-point value.</td>
</tr>
<tr>
<td>strtod64</td>
<td>stdlib.h</td>
<td>_Decimal64 strtod64(const char *<em>nptr</em>, char **<em>endptr</em>);</td>
<td>Converts <em>nptr</em> to
a double-precision decimal floating-point value.</td>
</tr>
<tr>
<td>strtod128</td>
<td>stdlib.h</td>
<td>_Decimal128 strtod128(const char *<em>nptr</em>, char **<em>endptr</em>);</td>
<td>Converts <em>nptr</em> to
a quad-precision decimal floating-point value.</td>
</tr>
<tr>
<td>strtof</td>
<td>stdlib.h</td>
<td>float strtof(const char *<em>nptr</em>, char **<em>endptr</em>);</td>
<td>Converts <em>nptr</em> to
a float value.</td>
</tr>
<tr>
<td>strtok</td>
<td>string.h</td>
<td>char *strtok(char *<em>string1</em>, const char *<em>string2</em>);</td>
<td>Locates the next token in <em>string1</em> delimited by the next character in <em>string2</em>.</td>
</tr>
<tr>
<td>strtok_r</td>
<td>string.h</td>
<td>char *strtok_r(char *<em>string</em>, const char *<em>seps</em>,
char **<em>lasts</em>);</td>
<td>Locates the next token in <em>string</em> delimited by the next character in <em>seps</em>.
(Restartable version of strtok.)</td>
</tr>
<tr>
<td>strtol</td>
<td>stdlib.h</td>
<td>long int strtol(const char *<em>nptr</em>, char **<em>endptr</em>, int <em>base</em>);</td>
<td>Converts <em>nptr</em> to
a signed long integer.</td>
</tr>
<tr>
<td>strtold</td>
<td>stdlib.h</td>
<td>long double strtold(const char *<em>nptr</em>, char **<em>endptr</em>);</td>
<td>Converts <em>nptr</em> to
a long double value.</td>
</tr>
<tr>
<td>strtoul</td>
<td>stdlib.h</td>
<td>unsigned long int strtoul(const char *<em>string1</em>, char **<em>string2</em>, int <em>base</em>);</td>
<td>Converts <em>string1</em> to
an unsigned long integer.</td>
</tr>
<tr>
<td>strxfrm</td>
<td>string.h</td>
<td>size_t strxfrm(char *<em>string1</em>, const char *<em>string2</em>, size_t <em>count</em>);</td>
<td>Converts <em>string2</em> and
places the result in <em>string1</em>. The conversion is determined
by the program's current locale.</td>
</tr>
<tr>
<td>swprintf</td>
<td>wchar.h</td>
<td>int swprintf(wchar_t <em>*wcsbuffer</em>, size_t <em>n</em>, const wchar_t <em>*format</em>,  <em>arg-list</em>);</td>
<td>Formats and stores a series of wide characters
and values into the wide-character buffer <em>wcsbuffer</em>.</td>
</tr>
<tr>
<td>swscanf</td>
<td>wchar.h</td>
<td>int swscanf (const wchar_t <var class="pv">*buffer</var>,
const wchar_t <var class="pv">*format</var>, <em>arg-list</em>)</td>
<td>Reads data from <var class="pv">buffer</var> into
the locations given by<var class="pv"> arg-list</var>.</td>
</tr>
<tr>
<td>system</td>
<td>stdlib.h</td>
<td>int system(const char *<em>string</em>);</td>
<td>Passes <em>string</em> to
the system command analyzer.</td>
</tr>
<tr>
<td>tan</td>
<td>math.h</td>
<td>double tan(double <em>x</em>);</td>
<td>Calculates the tangent of <em>x</em>.</td>
</tr>
<tr>
<td>tanh</td>
<td>math.h</td>
<td>double tanh(double <em>x</em>);</td>
<td>Calculates the hyperbolic tangent of <em>x</em>.</td>
</tr>
<tr>
<td>time</td>
<td>time.h</td>
<td>time_t time(time_t *<em>timeptr</em>);</td>
<td>Returns the current calendar time.</td>
</tr>
<tr>
<td>time64</td>
<td>time.h</td>
<td>time64_t time64(time64_t *<em>timeptr</em>);</td>
<td>Returns the current calendar time.</td>
</tr>
<tr>
<td>tmpfile</td>
<td>stdio.h</td>
<td>FILE *tmpfile(void);</td>
<td>Creates a temporary binary file and opens
it.</td>
</tr>
<tr>
<td>tmpnam</td>
<td>stdio.h</td>
<td>char *tmpnam(char *<em>string</em>);</td>
<td>Generates a temporary file name.</td>
</tr>
<tr>
<td>toascii</td>
<td>ctype.h</td>
<td>int toascii(int <em>c</em>);</td>
<td>Converts <em>c</em> to a character
in the 7-bit US-ASCII character set.</td>
</tr>
<tr>
<td>tolower</td>
<td>ctype.h</td>
<td>int tolower(int <em>c</em>);</td>
<td>Converts <em>c</em> to lowercase.</td>
</tr>
<tr>
<td>toupper</td>
<td>ctype.h</td>
<td>int toupper(int <em>c</em>);</td>
<td>Converts <em>c</em> to uppercase.</td>
</tr>
<tr>
<td>towctrans</td>
<td>wctype.h</td>
<td>wint_t towctrans(wint_t <em>wc</em>, wctrans_t <em>desc</em>);</td>
<td>Translates the wide character <em>wc</em> based on the mapping described by <em>desc</em>.</td>
</tr>
<tr>
<td>towlower<sup>4</sup></td>
<td>wctype.h</td>
<td>wint_t towlower (wint_t wc);</td>
<td>Converts uppercase letter to lowercase letter.</td>
</tr>
<tr>
<td>towupper<sup>4</sup></td>
<td>wctype.h</td>
<td>wint_t towupper (wint_t wc);</td>
<td>Converts lowercase letter to uppercase letter.</td>
</tr>
<tr>
<td>ungetc<sup>1</sup></td>
<td>stdio.h</td>
<td>int ungetc(int <em>c</em>,
FILE *<em>stream</em>);</td>
<td>Pushes <em>c</em> back onto
the input <em>stream</em>.</td>
</tr>
<tr>
<td>ungetwc<sup>6</sup></td>
<td>
<div class="lines">stdio.h<br>
wchar.h<br>
</div></td>
<td>wint_t ungetwc(wint_t <em>wc</em>, FILE <em>*stream</em>);</td>
<td>Pushes the wide character <em>wc</em> back onto the input stream.</td>
</tr>
<tr>
<td>va_arg</td>
<td>stdarg.h</td>
<td><em>var_type</em> va_arg(va_list <em>arg_ptr</em>, var_type);</td>
<td>Returns the value of one argument and modifies <em>arg_ptr</em> to point to the next argument.</td>
</tr>
<tr>
<td>va_end</td>
<td>stdarg.h</td>
<td>void <em>va_end</em>(va_list <em>arg_ptr</em>);</td>
<td>Facilitates normal return from variable argument
list processing.</td>
</tr>
<tr>
<td>va_start</td>
<td>stdarg.h</td>
<td>void <em>va_start</em>(va_list <em>arg_ptr, variable_name</em>);</td>
<td>Initializes <em>arg_ptr</em> for subsequent use by <em>va_arg</em> and <em>va_end</em>.</td>
</tr>
<tr>
<td>vfprintf</td>
<td>stdio.h stdarg.h</td>
<td>int vfprintf(FILE *<em>stream</em>, const char *<em>format</em>, <em>va_list arg_ptr</em>);</td>
<td>Formats and prints characters to the output <em>stream</em> using a variable number of arguments.</td>
</tr>
<tr>
<td>vfscanf</td>
<td>stdio.h stdarg.h</td>
<td>int vfscanf(FILE <em>*stream</em>, const char <em>*format</em>, va_list <em>arg_ptr</em>);</td>
<td>Reads data from a specified stream into locations
given by a variable number of arguments.</td>
</tr>
<tr>
<td>vfwprintf<sup>6</sup></td>
<td>
<div class="lines">stdarg.h<br>
stdio.h<br>
wchar.h<br>
</div></td>
<td>int vfwprintf(FILE <em>*stream</em>, const wchar_t <em>*format</em>, <em>va_list arg</em>);</td>
<td>Equivalent to fwprintf, except that the variable
argument list is replaced by <em>arg</em>.</td>
</tr>
<tr>
<td>vfwscanf</td>
<td>stdio.h stdarg.h</td>
<td>int vfwscanf(FILE <em>*stream</em>, const wchar_t <em>*format</em>, <em>va_list arg_ptr</em>);</td>
<td>Reads wide data from a specified stream into
locations given by a variable number of arguments.</td>
</tr>
<tr>
<td>vprintf</td>
<td>stdio.h stdarg.h</td>
<td>int vprintf(const char *<em>format</em>, va_list <em>arg_ptr</em>);</td>
<td>Formats and prints characters to stdout using
a variable number of arguments.</td>
</tr>
<tr>
<td>vscanf</td>
<td>stdio.h stdarg.h</td>
<td>int vscanf(const char <em>*format</em>, <em>va_list arg_ptr</em>);</td>
<td>Reads data from stdin into locations given
by a variable number of arguments.</td>
</tr>
<tr>
<td>vsprintf</td>
<td>stdio.h stdarg.h</td>
<td>int vsprintf(char *<em>target-string</em>, const char *<em>format</em>, va_list <em>arg_ptr</em>);</td>
<td>Formats and stores characters in a buffer
using a variable number of arguments.</td>
</tr>
<tr>
<td>vsnprintf</td>
<td>stdio.h</td>
<td>int vsnprintf(char *outbuf, size_t n, const
char*, va_list);</td>
<td>Same as vsprintf except that the function
will stop after n characters have been written to outbuf.</td>
</tr>
<tr>
<td>vsscanf</td>
<td>stdio.h stdarg.h</td>
<td>int vsscanf(const char<em>*buffer</em>, const char <em>*format</em>, <em>va_list arg_ptr</em>);</td>
<td>Reads data from a buffer into locations given
by a variable number of arguments.</td>
</tr>
<tr>
<td>vswprintf</td>
<td>
<div class="lines">stdarg.h<br>
wchar.h<br>
</div></td>
<td>int vswprintf(wchar_t <em>*wcsbuffer</em>,  size_t <em>n</em>, const wchar_t <em>*format</em>,  <em>va_list arg</em>);</td>
<td>Formats and stores a series of wide characters
and values in the buffer <em>wcsbuffer</em>.</td>
</tr>
<tr>
<td>vswscanf</td>
<td>stdio.h wchar.h</td>
<td>int vswscanf(const wchar_t <em>*buffer</em>, const wchar_t <em>*format</em>, <em>va_list arg_ptr</em>);</td>
<td>Reads wide data from a buffer into locations
given by a variable number of arguments.</td>
</tr>
<tr>
<td>vwprintf<sup>6</sup></td>
<td>
<div class="lines">stdarg.h<br>
wchar.h<br>
</div></td>
<td>int vwprintf(const wchar_t <em>*format</em>, <em>va_list arg</em>);</td>
<td>Equivalent to wprintf, except that the variable
argument list is replaced by <em>arg</em>.</td>
</tr>
<tr>
<td>vwscanf</td>
<td>stdio.h wchar.h</td>
<td>int vwscanf(const wchar_t <em>*format</em>, <em>va_list arg_ptr</em>);</td>
<td>Reads wide data from stdin into locations
given by a variable number of arguments.</td>
</tr>
<tr>
<td>wcrtomb<sup>4</sup></td>
<td>wchar.h</td>
<td>int wcrtomb (char *s, wchar_t wchar,
mbstate_t *pss);</td>
<td>Converts a wide character to a multibyte
character. (Restartable version of wctomb.)</td>
</tr>
<tr>
<td>wcscat</td>
<td>wchar.h</td>
<td>wchar_t *wcscat(wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>);</td>
<td>Appends a copy of the string pointed to by <em>string2</em> to the end of the string pointed to by <em>string1</em>.</td>
</tr>
<tr>
<td>wcschr</td>
<td>wchar.h</td>
<td>wchar_t *wcschr(const wchar_t  <em>*string</em>, wchar_t  <em>character</em>);</td>
<td>Searches the wide-character string pointed
to by <em>string</em> for the occurrence of <em>character</em>.</td>
</tr>
<tr>
<td>wcscmp</td>
<td>wchar.h</td>
<td>int wcscmp(const wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>);</td>
<td>Compares two wide-character strings, <em>*string1</em> and <em>*string2</em>.</td>
</tr>
<tr>
<td>wcscoll<sup>4</sup></td>
<td>wchar.h</td>
<td>int wcscoll (const wchar_t *wcs1,
const wchar_t *wcs2);</td>
<td>Compares two wide-character strings using
the collating sequence in the current locale.</td>
</tr>
<tr>
<td>wcscpy</td>
<td>wchar.h</td>
<td>wchar_t *wcscpy(wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>);</td>
<td>Copies the contents of <em>*string2</em> (including the ending wchar_t  null character) into <em>*string1</em>.</td>
</tr>
<tr>
<td>wcscspn</td>
<td>wchar.h</td>
<td>size_t wcscspn(const wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>);</td>
<td>Determines the number of wchar_t  characters
in the initial segment of the string pointed to by <em>*string1</em> that do not appear in the string pointed to by <em>*string2</em>.</td>
</tr>
<tr>
<td>wcsftime</td>
<td>wchar.h</td>
<td>size_t wcsftime(wchar_t <em>*wdest</em>, size_t <em>maxsize</em>, const wchar_t <em>*format</em>,  const struct tm <em>*timeptr</em>);</td>
<td>Converts the time and date specification
in the <em>timeptr</em> structure into a wide-character string.</td>
</tr>
<tr>
<td>wcslen</td>
<td>wchar.h</td>
<td>size_t wcslen(const wchar_t  <em>*string</em>);</td>
<td>Computes the number of wide-characters in
the string pointed to by <em>string</em>.</td>
</tr>
<tr>
<td>wcslocaleconv</td>
<td>locale.h</td>
<td>struct wcslconv *wcslocaleconv(void);</td>
<td>Formats numeric quantities in struct
wcslconv according to the current locale.</td>
</tr>
<tr>
<td>wcsncat</td>
<td>wchar.h</td>
<td>wchar_t *wcsncat(wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>, size_t <em>count</em>);</td>
<td>Appends up to <em>count</em> wide
characters from <em>string2</em> to the end of <em>string1</em>, and appends a wchar_t null character to the result.</td>
</tr>
<tr>
<td>wcsncmp</td>
<td>wchar.h</td>
<td>int wcsncmp(const wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>, size_t <em>count</em>);</td>
<td>Compares up to <em>count</em> wide
characters in <em>string1</em> to  <em>string2</em>.</td>
</tr>
<tr>
<td>wcsncpy</td>
<td>wchar.h</td>
<td>wchar_t *wcsncpy(wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>, size_t <em>count</em>);</td>
<td>Copies up to <em>count</em> wide
characters from <em>string2</em> to  <em>string1</em>.</td>
</tr>
<tr>
<td>wcspbrk</td>
<td>wchar.h</td>
<td>wchar_t *wcspbrk(const wchar_t  <em>*string1</em>, const wchar_t  <em>*string2</em>);</td>
<td>Locates the first occurrence in the string
pointed to by <em>string1</em> of any wide characters from
the string pointed to by <em>string2</em>.</td>
</tr>
<tr>
<td>wcsptime</td>
<td>wchar.h</td>
<td>wchar_t *wcsptime ( const wchar_t *buf, const
wchar_t *format, struct tm *tm );</td>
<td>Date and time conversion. Equivalent to strptime(),
except that it uses wide characters.</td>
</tr>
<tr>
<td>wcsrchr</td>
<td>wchar.h</td>
<td>wchar_t *wcsrchr(const wchar_t  <em>*string</em>, wchar_t  <em>character</em>);</td>
<td>Locates the last occurrence of  <em>character</em> in the string pointed to by <em>string</em>.</td>
</tr>
<tr>
<td>wcsrtombs<sup>4</sup></td>
<td>wchar.h</td>
<td>size_t wcsrtombs (char *dst, const
wchar_t **src, size_t len, mbstate_t *ps);</td>
<td>Converts wide character string to multibyte
string. (Restartable version of wcstombs.)</td>
</tr>
<tr>
<td>wcsspn</td>
<td>wchar.h</td>
<td>size_t wcsspn(const wchar_t <em>*string1</em>, const wchar_t <em>*string2</em>);</td>
<td>Computes the number of wide characters in
the initial segment of the string pointed to by <em>string1</em>, which consists entirely of wide characters from the string pointed
to by <em>string2</em>.</td>
</tr>
<tr>
<td>wcsstr</td>
<td>wchar.h</td>
<td>wchar_t *wcsstr(const wchar_t <em>*wcs1</em>, const wchar_t <em>*wcs2</em>);</td>
<td>Locates the first occurrence of <em>wcs2</em>  in <em>wcs1</em>.</td>
</tr>
<tr>
<td>wcstod</td>
<td>wchar.h</td>
<td>double wcstod(const wchar_t <em>*nptr</em>, wchar_t <em>**endptr</em>);</td>
<td>Converts the initial portion of the wide-character
string pointed to by <em>nptr</em> to a double value.</td>
</tr>
<tr>
<td>wcstod32</td>
<td>wchar.h</td>
<td>_Decimal32 wcstod32(const wchar_t <em>*nptr</em>, wchar_t <em>**endptr</em>);</td>
<td>Converts the initial portion of the wide-character
string pointed to by <em>nptr</em> to a single-precision decimal
floating-point value.</td>
</tr>
<tr>
<td>wcstod64</td>
<td>wchar.h</td>
<td>_Decimal64 wcstod64(const wchar_t <em>*nptr</em>, wchar_t <em>**endptr</em>);</td>
<td>Converts the initial portion of the wide-character
string pointed to by <em>nptr</em> to a double-precision decimal
floating-point value.</td>
</tr>
<tr>
<td>wcstod128</td>
<td>wchar.h</td>
<td>_Decimal128 wcstod128(const wchar_t <em>*nptr</em>, wchar_t <em>**endptr</em>);</td>
<td>Converts the initial portion of the wide-character
string pointed to by <em>nptr</em> to a quad-precision decimal
floating-point value.</td>
</tr>
<tr>
<td>wcstok</td>
<td>wchar.h</td>
<td>wchar_t *wcstok(wchar_t <em>*wcs1</em>, const wchar_t <em>*wcs2</em>, wchar_t <em>**ptr</em>)</td>
<td>Breaks <em>wcs1</em> into
a sequence of tokens, each of which is delimited by a wide character from
the wide string pointed to by <em>wcs2</em>.</td>
</tr>
<tr>
<td>wcstol</td>
<td>wchar.h</td>
<td>long int wcstol(const wchar_t <em>*nptr</em>, wchar_t <em>**endptr</em>, int <em>base</em>);</td>
<td>Converts the initial portion of the wide-character
string pointed to by <em>nptr</em> to a long integer value.</td>
</tr>
<tr>
<td>wcstombs</td>
<td>stdlib.h</td>
<td>size_t wcstombs(char *dest, const
wchar_t *<em>string</em>, size_t <var class="pv">count</var>);</td>
<td>Converts the wchar_t <em>string</em> into a multibyte string <em>dest</em>.</td>
</tr>
<tr>
<td>wcstoul</td>
<td>wchar.h</td>
<td>unsigned long int wcstoul(const wchar_t  <em>*nptr</em>, wchar_t <em>**endptr</em>, int  <em>base</em>);</td>
<td>Converts the initial portion of the wide-character
string pointed to by <em>nptr</em> to an unsigned long integer
value.</td>
</tr>
<tr>
<td>wcsxfrm<sup>4</sup></td>
<td>wchar.h</td>
<td>size_t wcsxfrm (wchar_t <em>*wcs1</em>, const wchar_t <em>*wcs2</em>,
size_t <em>n</em>);</td>
<td>Transforms a wide-character string to values
which represent character collating weights and places the resulting wide-character
string into an array.</td>
</tr>
<tr>
<td>wctob</td>
<td>
<div class="lines">stdarg.h<br>
wchar.h<br>
</div></td>
<td>int wctob(wint_t <em>wc</em>);</td>
<td>Determines whether <em>wc</em> corresponds to a member of the extended character set whose multibyte
character representation is a single byte when in the initial shift state.</td>
</tr>
<tr>
<td>wctomb</td>
<td>stdlib.h</td>
<td>int wctomb(char *<em>string</em>, wchar_t <em>character</em>);</td>
<td>Converts the wchar_t value of <em>character</em> into a multibyte <em>string</em>.</td>
</tr>
<tr>
<td>wctrans</td>
<td>wctype.h</td>
<td>wctrans_t wctrans(const char <em>*property</em>);</td>
<td>Constructs a value with type wctrans_t that
describes a mapping between wide characters identified by the string argument
property.</td>
</tr>
<tr>
<td>wctype<sup>4</sup></td>
<td>wchar.h</td>
<td>wctype_t wctype (const char  <em>*property</em>);</td>
<td>Obtains handle for character property classification.</td>
</tr>
<tr>
<td>wcwidth</td>
<td>wchar.h</td>
<td>int wcswidth(const wchar_t   <em>*pwcs</em>, size_t <em>n</em>);</td>
<td>Determine the display width of a wide character
string.</td>
</tr>
<tr>
<td>wmemchr</td>
<td>wchar.h</td>
<td>wchar_t *wmemchr(const wchar_t <em>*s</em>, wchar_t <em>c</em>, size_t <em>n</em>);</td>
<td>Locates the first occurrence of <em>c</em> in the initial <em>n</em> wide characters of the object
pointed to by  <em>s.</em></td>
</tr>
<tr>
<td>wmemcmp</td>
<td>wchar.h</td>
<td>int wmemcmp(const wchar_t <em>*s1</em>, const wchar_t <em>*s2</em>, size_t <em>n</em>);</td>
<td>Compares the first <em>n</em> wide
characters of the object pointed to by <em>s1</em> to the first
 <em>n</em> characters of the object pointed to by <em>s2</em>.</td>
</tr>
<tr>
<td>wmemcpy</td>
<td>wchar.h</td>
<td>wchar_t *wmemcpy(wchar_t <em>*s1</em>, const wchar_t <em>*s2</em>, size_t <em>n</em>);</td>
<td>Copies <em>n</em> wide characters
from the object pointed to by <em>s2</em> to the object pointed
to by  <em>s1</em>.</td>
</tr>
<tr>
<td>wmemmove</td>
<td>wchar.h</td>
<td>wchar_t *wmemmove(wchar_t <em>*s1</em>, const wchar_t <em>*s2</em>, size_t <em>n</em>);</td>
<td>Copies <em>n</em> wide characters
from the object pointed to by <em>s2</em> to the object pointed
to by  <em>s1</em>.</td>
</tr>
<tr>
<td>wmemset</td>
<td>wchar.h</td>
<td>wchar_t *wmemset(wchar_t <em>*s</em>, wchar_t <em>c</em>, size_t <em>n</em>);</td>
<td>Copies the value of <em>c</em> into each of the first <em>n</em> wide characters of
the object pointed to by <em>s</em>.</td>
</tr>
<tr>
<td>wprintf<sup>6</sup></td>
<td>wchar.h</td>
<td>int wprintf(const wchar_t  <em>*format</em>,  <em>arg-list</em>);</td>
<td>Equivalent to fwprintf with the argument
stdout interposed before the arguments to wprintf.</td>
</tr>
<tr>
<td>wscanf<sup>6</sup></td>
<td>wchar.h</td>
<td>int wscanf(const wchar_t  <em>*format</em>,  <em>arg-list</em>);</td>
<td>Equivalent to fwscanf with the argument stdin
interposed before the arguments of wscanf.</td>
</tr>
<tr>
<td>y0</td>
<td>math.h</td>
<td>double y0(double <em>x</em>);</td>
<td>Calculates the Bessel function value of the
second kind of order 0.</td>
</tr>
<tr>
<td>y1</td>
<td>math.h</td>
<td>double y1(double <em>x</em>);</td>
<td>Calculates the Bessel function value of the
second kind of order 1.</td>
</tr>
<tr>
<td>yn</td>
<td>math.h</td>
<td>double yn(int <em>n</em>,
double <em>x</em>);</td>
<td>Calculates the Bessel function value of the
second kind of order <em>n.</em></td>
</tr>
<tr>
<td colspan="4" align="left" valign="top" headers="wq779 wq780 wq781 wq782">
<div>
<div class="noteParent border-2 ibm-border-blue-50 margin-top-1 margin-bottom-1"><div class="notetitle ibm-bold ibm-textcolor-blue-50 background-blue ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1" id="wq783">Note</div><div class=" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0"><div class="notebody"><sup>1</sup> This function is not supported for files opened
with type=record.</div></div></div>
</div>
<div>
<div class="noteParent border-2 ibm-border-blue-50 margin-top-1 margin-bottom-1"><div class="notetitle ibm-bold ibm-textcolor-blue-50 background-blue ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1" id="wq784">Note</div><div class=" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0"><div class="notebody"><sup>2</sup> This function is not supported for files opened with type=record and
mode=ab+, rb+, or wb+.</div></div></div>
</div>
<div>
<div class="noteParent border-2 ibm-border-blue-50 margin-top-1 margin-bottom-1"><div class="notetitle ibm-bold ibm-textcolor-blue-50 background-blue ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1" id="wq785">Note</div><div class=" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0"><div class="notebody"><sup>3</sup> The ILE C compiler only supports fully buffered and line-buffered streams.
Since a block and a line are equal to the record length of the opened file,
fully buffered and line-buffered streams are supported in the same way. The <samp class="xph">setbuf()</samp> and <samp class="xph">setvbuf()</samp> functions have no effect.</div></div></div>
</div>
<div>
<div class="noteParent border-2 ibm-border-blue-50 margin-top-1 margin-bottom-1"><div class="notetitle ibm-bold ibm-textcolor-blue-50 background-blue ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1" id="wq786">Note</div><div class=" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0"><div class="notebody"><sup>4</sup> This function is not
available when LOCALETYPE(*CLD) is specified on the compilation command.</div></div></div>
</div>
<div>
<div class="noteParent border-2 ibm-border-blue-50 margin-top-1 margin-bottom-1"><div class="notetitle ibm-bold ibm-textcolor-blue-50 background-blue ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1" id="wq787">Note</div><div class=" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0"><div class="notebody"><sup>5</sup> This function is available
only when SYSIFCOPT(*IFSIO) is specified on the CRTCMOD or CRTBNDC command.</div></div></div>
</div>
<div>
<div class="noteParent border-2 ibm-border-blue-50 margin-top-1 margin-bottom-1"><div class="notetitle ibm-bold ibm-textcolor-blue-50 background-blue ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1" id="wq788">Note</div><div class=" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0"><div class="notebody"><sup>6</sup> This function
is not available when either LOCALETYPE(*CLD) or SYSIFCOPT(*NOIFSIO) is specified
on the compilation command.</div></div></div>
</div></td>
</tr>
</tbody>
</table>