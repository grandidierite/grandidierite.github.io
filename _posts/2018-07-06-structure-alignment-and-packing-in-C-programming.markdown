---
layout: post
title: Structure Alignment and Packing in C Programming
date: 2018-07-06 18:32:50 +0700
description: Structure Alignment and Packing in C Programming
img: alignment.jpg
tags: [C]
---
A modern CPU fetches data from memory in multiples of word sized chunks. The word size is dependent on the platform. For 64-bit platform, it would be 8-bytes, meaning that the CPU would fetch data in multiples of 8. For 32-bit platform, the word size is 4-bytes.

The storage for data does not normally start at arbitrary byte addresses in memory. Aligning data in memory to be in multiples of word size helps the read performance.

Every data type has an alignment associated with it which is mandated by the processor architecture rather than the language itself. Aligning data elements allows the processor to fetch data from memory in an efficient manner and thereby improves the performance. The compiler tries to maintain these alignments for data elements to provide optimal performance. The typical alignment requirement for data types on 32-bit and 64-bit platform are shown below

<table class="table">
<thead>
<tr>
<th>Data Type</th>
<th>32-bit (bytes)</th>
<th>64-bit (bytes)</th>
</tr>
</thead>
<tbody>
<tr>
<td>char</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>short</td>
<td>2</td>
<td>2</td>
</tr>
<tr>
<td>int</td>
<td>4</td>
<td>4</td>
</tr>
<tr>
<td>long</td>
<td>8</td>
<td>8</td>
</tr>
<tr>
<td>float</td>
<td>4</td>
<td>4</td>
</tr>
<tr>
<td>double</td>
<td>8</td>
<td>8</td>
</tr>
<tr>
<td>long long</td>
<td>8</td>
<td>8</td>
</tr>
<tr>
<td>long double</td>
<td>4</td>
<td>16</td>
</tr>
<tr>
<td>Any pointer</td>
<td>4</td>
<td>8</td>
</tr>
</tbody>
</table>

For structures that generally contain data elements of different types, the compiler tries to maintain the proper alignment of data elements by inserting unused memory between elements. This technique known as Padding. The compiler also aligns the entire structure to its most strictly aligned member. The compiler may also increase the size of structure if necessary, to make it a multiple of the alignment by adding padding at the end of the structure. This is known as Tail Padding.

Let's say we have a 64-bit platform and we create a structure like the one below

<pre>
<code data-language="c">struct my_struct {
    char *p;  /* 8 bytes */
    char c;   /* 1 byte */
    long x;   /* 8 bytes */
};</code>
</pre>

You might think that <code>sizeof(struct my_struct)</code> should be 10 bytes, but it's actually 24 bytes. This is because of self-alignment. Compiler inserted 7 bytes of padding between <code>c</code> and <code>x</code> to keep the structure aligned.

<pre>
<code data-language="c">struct my_struct {
    char *p;  /* 8 bytes */
    char c;   /* 1 byte */
    char padding[7];   /* 7 bytes */
    long x;   /* 8 bytes */
};</code>
</pre>

![Memory representation of struct my_struct members](/assets/img/my_struct.jpg){:class="img-responsive"}

You can minimize the memory wastage by ordering the structure elements such that the widest (largest) element comes first, followed by the second widest, and so on. The following example helps illustrate the effect of ordering of data elements on the size of the structure.

<pre>
<code data-language="c">struct s1
{
    char a;  /* 1 byte */
    short a1;   /* 2 bytes */
    char b1;   /* 1 byte */
    float b;   /* 4 bytes */
    int c;   /* 4 bytes */
    char e;   /* 1 byte */
    double f;   /* 8 bytes */
};</code>
</pre>

The structure above can be aligned and padded to be as follows

<pre>
<code data-language="c">struct s1
{
    char a;  /* 1 byte */
    char pad1[1]; /* 1 byte */
    short a1;   /* 2 bytes */
    char b1;   /* 1 byte */
    char pad2[3]; /* 3 bytes */
    float b;   /* 4 bytes */
    int c;   /* 4 bytes */
    char e;   /* 1 byte */
    char pad3[7];  /* 7 bytes */
    double f;   /* 8 bytes */
};</code>
</pre>

![Memory representation of struct s1](/assets/img/s1.jpg){:class="img-responsive"}

The size of <code>struct s1</code> after being aligned and padded is 32 bytes.

Now we re-arrange the structure as follows

<pre>
<code data-language="c">struct s1
{
    double f;
    float b;
    int c;
    short a1;
    char a,b1,e;
};</code>
</pre>

After being aligned and padded, the structure will be as follows

<pre>
<code data-language="c">struct s1
{
    double f;
    float b;
    int c;
    short a1;
    char a;
    char b1;
    char e;
    char pad[3];
};</code>
</pre>

![Memory representation of struct s1](/assets/img/re-s1.jpg){:class="img-responsive"}

The size of the <code>struct s1</code> after re-arranging the elements is 24 bytes. Hence, simply re-arranging the elements during the structure definition may help in avoiding memory wastage.

You can specify the structure members in bits. Structures in C are capable of implementing bit fields. Bit fields allows us to access particular fields stored in an integer. Floating point types are not allowed as bit fields.

For example, we want to store a date with the details of date, month and year.

<pre>
<code data-language="c">struct date
{
    short dt;
    short mn;
    short yr;
};

struct date today;</code>
</pre>

The size of variable today of struct date type is 6 bytes (48 bits). We don't need this much memory. It is enough to have just 23 bits of memory that is 6 bits to store maximum date of 31, 5 bits to store maximum month of 12, and 12 bits to store maximum year of 2047.

The members of struct date are signed types, member dt can hold value from -32 to +31, member mn can hold value from -16 to +15, and member yr can hold value from -2048 to +2047. Actually we don't need the signed value. Hence we can further save the memory by defining the bit fields as unsigned type.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct date
{
    unsigned short dt:5;
    unsigned short mn:4;
    unsigned short yr:11;
};

int main()
{
    struct date a;
    a.dt=29;
    a.mn=6;
    a.yr=2018;

    printf("Date: %u/%u/%u\n", a.dt, a.mn, a.yr);
    printf("Memory Taken %lu bytes\n", sizeof(a));

    return 0;
}</code>
</pre>

Output:

<pre>
Date: 29/6/2018
Memory Taken 4 bytes
</pre>

Generally, bytes have address but bits have no address, hence the operator &amp; cannot be used to access the address of bit fields. Trying to access the address of bit fields result compilation error.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct date
{
    unsigned short dt:5;
    unsigned short mn:4;
    unsigned short yr:11;
};

int main()
{
    struct date a;

    printf("%u\n%u\n%u\n", &a.dt, &a.mn, &a.yr);

    return 0;
}</code>
</pre>

Output:

<pre>
example.c: In function 'main':
example.c:11:2: error: cannot take address of bit-field 'dt'
printf("%u\n%u\n%u",&a.dt,&a.mn,&a.yr);
^
example.c:11:2: error: cannot take address of bit-field 'mn'
example.c:11:2: error: cannot take address of bit-field 'yr'
</pre>

A bit field can't be defined with the size more than its data size. For example, a bit can't be defined as

<pre>
<code data-language="c">unsigned short x:17;</code>
</pre>

Because under any platform the size of short type is 2 bytes or 16 bits, specifying more than 16 bits is illegal and results compilation error.

You can use pragma directive to specify the new alignment in bytes for structures.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct test {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};
int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of product: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

Output:

<pre>
Address of a.aa: 140723078278112
Address of a.bb: 140723078278116
Address of a.cc: 140723078278120
Address of a.dd: 140723078278128
Address of a.ee: 140723078278144
Size of product: 48
</pre>

<code>#pragma pack(n)</code> option (n=1,2,4,8 or 16) allows you to change the alignment of data types within a struct to align to boundaries smaller than its size. It doesn't force alignment of ALL variables, it only changes the alignment of variables larger than the pack setting. For example, if we set <code>#pragma pack</code> to 8, the 16-byte <code>_Decimal128</code> data type aligns on the 8-byte boundary, but the other data types still use their natural alignment.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#pragma pack(8)

struct test {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};
int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

Output:

<pre>
Address of a.aa: 140736045874560
Address of a.bb: 140736045874564
Address of a.cc: 140736045874568
Address of a.dd: 140736045874576
Address of a.ee: 140736045874584
Size of struct test: 40
</pre>

How about if we change the pack setting to 4? Now both 8-byte variable <code>dd</code> and 16-byte variable <code>ee</code> have changed alignment.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#pragma pack(4)

struct test {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};
int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

Output:

<pre>
Address of a.aa: 140731871146800
Address of a.bb: 140731871146804
Address of a.cc: 140731871146808
Address of a.dd: 140731871146812
Address of a.ee: 140731871146820
Size of struct test: 36
</pre>

Continuing on to pack setting of 2

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#pragma pack(2)

struct test {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};
int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

Output:

<pre>
Address of a.aa: 140727235492128
Address of a.bb: 140727235492130
Address of a.cc: 140727235492134
Address of a.dd: 140727235492136
Address of a.ee: 140727235492144
Size of struct test: 32
</pre>

At pack setting of 1, there are no more padding bytes and the struct is as small as possible.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#pragma pack(1)

struct test {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};
int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

Output:

<pre>
Address of a.aa: 140733856856000
Address of a.bb: 140733856856001
Address of a.cc: 140733856856005
Address of a.dd: 140733856856007
Address of a.ee: 140733856856015
Size of product: 31
</pre>

If we want to set the new alignment only on a certain struct, we can use <code>#pragma pack(push,n)</code> and <code>#pragma pack(pop)</code> where n is 1, 2, 4, 8 or 16.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct test1 {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};

#pragma pack(push,1)
struct test2 {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
};
#pragma pack(pop)

int main()
{
    struct test1 a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    struct test2 b;
    b.aa=(char)0x44;
    b.bb=0x55555555;
    b.cc=0x6666;
    b.dd=0x7777777777777777;
    b.ee.ee2[0]=0x8888888888888888;
    b.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test1: %lu\n", sizeof(a));

    printf("Address of b.aa: %lu\n", &b.aa);
    printf("Address of b.bb: %lu\n", &b.bb);
    printf("Address of b.cc: %lu\n", &b.cc);
    printf("Address of b.dd: %lu\n", &b.dd);
    printf("Address of b.ee: %lu\n", &b.ee);
    printf("Size of struct test2: %lu\n", sizeof(b));

    return 0;
}</code>
</pre>

Output:

<pre>
Address of a.aa: 140727209497760
Address of a.bb: 140727209497764
Address of a.cc: 140727209497768
Address of a.dd: 140727209497776
Address of a.ee: 140727209497792
Size of struct test1: 48
Address of b.aa: 140727209497728
Address of b.bb: 140727209497729
Address of b.cc: 140727209497733
Address of b.dd: 140727209497735
Address of b.ee: 140727209497743
Size of struct test2: 31
</pre>

You may also use attributes to specify a new alignment.
* <code>__attribute__((aligned(n)))</code> , this attribute sets the minimum alignment of the specified variables to a specific number of bytes. n must be a the positive of 2 or NIL. NIL can be specified as either <code>__attribute__((aligned()))</code> or <code>__attribute__((aligned))</code>, the compiler automatically sets the alignment for the declared variable or field to the largest alignment
* <code>__attribute__((packed))</code> , this attribute specifies that a variable or structure field should have the smallest possible alignment -- one byte for a variable and one bit for a field

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct test {
    char  aa;    // size = 1
    int   bb;    // size = 4
    short cc;    // size = 2
    long  dd;    // size = 8
    union {      // size = 16 (_Decimal128 is 16, using union to set the value)
        _Decimal128 ee1;
        long ee2[2];
    } ee;
} __attribute__ ((aligned (8)));

int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

<pre>
Address of a.aa: 140735785059040
Address of a.bb: 140735785059044
Address of a.cc: 140735785059048
Address of a.dd: 140735785059056
Address of a.ee: 140735785059072
Size of struct test: 48
</pre>

![Memory representation of struct test __attribute__((aligned(8)))](/assets/img/align1.jpg){:class="img-responsive"}

The structure declaration above forces the compiler to ensure that each variable of type <code>struct test</code> is aligned on a 8-byte boundary and the size of variables of type <code>struct test</code> should be a multiple of 8 bytes.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct test {
    char  aa;
    int   bb;
    short cc __attribute__ ((aligned (32)));
    long  dd;
    union {
        _Decimal128 ee1;
        long ee2[2];
    } ee __attribute__ ((aligned (8)));
} __attribute__ ((aligned (64)));

int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

<pre>
Address of a.aa: 140729355421056
Address of a.bb: 140729355421060
Address of a.cc: 140729355421088
Address of a.dd: 140729355421096
Address of a.ee: 140729355421104
Size of struct test: 64
</pre>

![Memory representation of struct test __attribute__((aligned(64)))](/assets/img/align2.jpg){:class="img-responsive"}

The structure declaration above ensure that each variable of type <code>struct test</code> is aligned on a 8-byte boundary and the size of variables of type <code>struct test</code> should be a multiple of 64 bytes.

Having attribute <code>__attribute__ ((aligned (32)))</code> on variable <code>cc</code> makes the variable <code>aa</code> and <code>bb</code> aligned on a 32-byte boundary and the total size of those variables should be a multiple of 32 bytes.

Having attribute <code>__attribute__ ((aligned (8)))</code> on <code>union ee</code> makes the variable <code>aa</code>, <code>bb</code>, <code>cc</code>, and <code>dd</code> aligned on a 8-byte boundary and the total size of those variables should be a multiple of 8 bytes.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct test {
    char  aa;
    int   bb;
    short cc;
    long  dd;
    union {
        _Decimal128 ee1;
        long ee2[2];
    } ee;
} __attribute__ ((packed, aligned (64)));

int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

<pre>
Address of a.aa: 140736487059200
Address of a.bb: 140736487059201
Address of a.cc: 140736487059205
Address of a.dd: 140736487059207
Address of a.ee: 140736487059215
Size of struct test: 64
</pre>

![Memory representation of struct test __attribute__((packed, aligned(64)))](/assets/img/align3.jpg){:class="img-responsive"}

Having attribute <code>__attribute__ ((packed))</code> on <code>struct test</code> makes its each member aligned on a 1-byte boundary.

Having attribute <code>__attribute__ ((aligned(64)))</code> on <code>struct test</code> makes the size of variables of type <code>struct test</code> should be a multiple of 64 bytes.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct test {
    char  aa;
    int   bb;
    short cc __attribute__ ((aligned (32)));
    long  dd;
    union {
        _Decimal128 ee1;
        long ee2[2];
    } ee __attribute__ ((aligned (8)));
} __attribute__ ((packed, aligned (64)));

int main()
{
    struct test a;
    a.aa=(char)0x44;
    a.bb=0x55555555;
    a.cc=0x6666;
    a.dd=0x7777777777777777;
    a.ee.ee2[0]=0x8888888888888888;
    a.ee.ee2[1]=0x8888888888888888;

    printf("Address of a.aa: %lu\n", &a.aa);
    printf("Address of a.bb: %lu\n", &a.bb);
    printf("Address of a.cc: %lu\n", &a.cc);
    printf("Address of a.dd: %lu\n", &a.dd);
    printf("Address of a.ee: %lu\n", &a.ee);
    printf("Size of struct test: %lu\n", sizeof(a));

    return 0;
}</code>
</pre>

<pre>
Address of a.aa: 140722069327424
Address of a.bb: 140722069327425
Address of a.cc: 140722069327456
Address of a.dd: 140722069327458
Address of a.ee: 140722069327472
Size of struct test: 64
</pre>

![Memory representation of struct test __attribute__((packed, aligned(64)))](/assets/img/align4.jpg){:class="img-responsive"}

Having attribute <code>__attribute__ ((packed))</code> on <code>struct test</code> makes its each member aligned on a 1-byte boundary.

Having attribute <code>__attribute__ ((aligned(64)))</code> on <code>struct test</code> makes the size of variables of type <code>struct test</code> should be a multiple of 64 bytes.

Having attribute <code>__attribute__ ((aligned (32)))</code> on variable <code>cc</code> makes the total size of variable <code>aa</code> and <code>bb</code> should be a multiple of 32 bytes.

Having attribute <code>__attribute__ ((aligned (8)))</code> on <code>union ee</code> makes the total size of variable <code>aa</code>, <code>bb</code>, <code>cc</code>, and <code>dd</code> should be a multiple of 8 bytes.

