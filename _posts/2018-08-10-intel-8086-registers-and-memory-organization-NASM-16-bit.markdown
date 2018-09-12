---
layout: post
title: 8086 Intel Registers and Memory Organization
date: 2018-08-10 20:32:00 +0700
description: 8086 Intel Registers and Memory Organization
img: 8086.jpg
tags: [Assembly, NASM, 16-bit]
---
###### General Purpose Registers
There are 4 general purpose registers in Intel 8086. Each of the registers is 16 bits wide.
1. Accumulator Register <b>AX</b>, used in arithmetic, logic, data transfer, and I/O operations
2. Base Register <b>BX</b>, used as address register to form physical address
3. Count Register <b>CX</b>, used as a loop counter and used in shift and rotate operations
4. Data Register <b>DX</b>, used in multiplication, division, and I/O operations


Each of the registers also can be accessed in 8-bit mode:
1. the least significant byte (LSB) or low half of <b>AX</b> is <b>AL</b> and the most significant byte (MSB) or high half of <b>AX</b> is <b>AH</b>
2. the least significant byte (LSB) or low half of <b>BX</b> is <b>BL</b> and the most significant byte (MSB) or high half of <b>BX</b> is <b>BH</b>
3. the least significant byte (LSB) or low half of <b>CX</b> is <b>CL</b> and the most significant byte (MSB) or high half of <b>CX</b> is <b>CH</b>
4. the least significant byte (LSB) or low half of <b>DX</b> is <b>DL</b> and the most significant byte (MSB) or high half of <b>DX</b> is <b>DH</b>

##### Segment Registers
There are 4 segment registers. Each of the registers is 16 bits wide.
1. Code Segment <b>CS</b>, used for addressing code segment of the memory where the executable program is stored.
<b>CS</b> register cannot be changed directly.
2. Stack Segment <b>SS</b>, used for addressing stack segment of the memory where stack data is stored. <b>SS</b>
register can only be changed directly using <code>pop</code> instruction.
3. Data Segment <b>DS</b>, used for addressing data segment of the memory where the program data is stored. <b>DS</b>
register can be changed directly using <code>pop</code> and <code>lds</code> instructions.
4. Extra Segment <b>ES</b>, also used for addressing data segment of the memory where the program data is stored.
<b>ES</b> register can be changed directly using <code>pop</code> and <code>les</code> instructions.

##### Index Registers
Index registers are 16 bits wide.
1. Source Index <b>SI</b>, used as offset address relative to <b>DS</b>
2. Destination Index <b>DI</b>, used as offset address relative to <b>ES</b>

##### Pointer Registers
Pointer registers are 16 bits wide.
1. Stack Pointer <b>SP</b>. Stack Pointer points to the top address of the stack.
2. Base Pointer <b>BP</b>. Base Pointer points to the base of the stack.

##### Status Register
Status register is also called as flag register. There are 16 bits in flag register, each bit is called a flag and can take a value of 1 or 0.

![Status Register](/assets/img/flagregister.png){:class="img-responsive"}

- Carry flag (<b>CF</b>) - this flag is set to 1 when there is an unsigned overflow in arithmetic operation.

The carry flag is set if the addition or multiplication of two numbers causes a carry out the most significant bits added.

Example

<pre>
<code data-language="c">mov al,100
add al,200</code>
</pre>

The result of <code>al</code> is 300. Since <code>al</code> is an 8-bit register, the maximum value it can hold is 255. Therefore, the carry flag will be set to 1.

Let's take a look at another example

<pre>
<code data-language="c">mov ax,30000
add ax,40000</code>
</pre>

The result of <code>ax</code> is 70000. Since <code>ax</code> is an 16-bit register, the maximum value it can hold is 65535. Therefore, the carry flag will be set to 1.

The carry flag is also set if the subtraction of two numbers requires a borrow into the most significant bits subtracted.

<pre>
<code data-language="c">mov al,0
sub al,1</code>
</pre>

- Overflow flag (<b>OF</b>) - this flag is set to 1 when there is a signed overflow.

Example

<pre>
<code data-language="c">mov al,100
add al,100</code>
</pre>

The result of <code>al</code> is 200. Since <code>al</code> is an 8-bit register, the maximum positive integer it can
hold is 127. Therefore, the overflow flag will be set to 1.

- Sign flag (<b>SF</b>) - this flag is set to 1 when the result is negative.
- Zero flag (<b>ZF</b>) - this flag is set to 1 when the result is zero.
- Parity flag (<b>PF</b>) - this flag is set to 1 when the result has an even number of 1s. Even if the result is a word
 (16 bits), only 8 low bits are analyzed.

Example

<pre>
<code data-language="c">mov ax,32896
add ax,4</code>
</pre>

The result of <code>ax</code> is 32900 or 10000000 10000100 in binary. Only 8 low bits are checked, since there are 2 bits of 1s in 8 low bits (10000100) the parity flag will be set to 1.

- Auxiliarly flag (<b>AF</b>) - this flag is set to 1 when the result has a carry from 3rd bit to 4th bit. This flag is
used as <b>CF</b> when working with BCD (Binary-Coded Decimal).
- Interrupt flag (<b>IF</b>) - this flag is set to 1 to enable interrupts and set to 0 to disable interrupts.
- Direction flag (<b>DF</b>) - this flag is used in string operations to specify whether strings begin at a low address and proceed to high addresses or vice versa. CX is used as the number of iterations, DS:SI is used as the source address and DS:DI is used as the destination. After each iteration, CX is decremented by one, SI and DI are either incremented or decremented by the element size according to DF flag. If DF = 0, SI and DI are incremented, otherwise they are decremented.

##### Memory Segmentation and Addressing
The size of address bus of Intel 8086 is 20 bits which is able to address 2<sup>20</sup>=1,048,576 bytes (1 MB) memory locations.

In Real Mode of addressing, the entire memory is not accessed with an absolute index from 0 but it is divided into segments. Size of each segments is 64KB. Only 4 segments we can work with.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Segment</th>
<th>Segment Register</th>
<th>Offset register</th>
</tr>
<tr>
<td>Code Segment</td>
<td><code>CS</code></td>
<td>Instruction Pointer (<code>IP</code>)</td>
</tr>
<tr>
<td>Data Segment</td>
<td><code>SS</code></td>
<td>Source Index (<code>SI</code>)</td>
</tr>
<tr>
<td>Extra Segment</td>
<td><code>ES</code></td>
<td>Destination Index (<code>DI</code>)</td>
</tr>
<tr>
<td>Stack Segment</td>
<td><code>SS</code></td>
<td>Stack Pointer (<code>SP</code>) / Base Pointer (<code>BP</code>)</td>
</tr>
</table>
</div>

Physical address (RAM) is 20 bits wide. To express a 20-bit address, two 16-bit registers are used segment address in one 16-bit register and the offset address in another 16-bit register. Logical address is specified as segment:offset. Physical address is obtained by shifting the segment address 4 bits tot he left and adding the offset address.

![Physical Address](/assets/img/segmentoffset.jpg){:class="img-responsive"}

The physical address of the logical address A4FB:4872 is

![Physical Address](/assets/img/physical.jpg)

Since segments can be overlap, same byte could also be located by segment:offset combinations 0002:000D or 0001:001D.

Since an offset cannot exceed 16 bits, you cannot increment beyond 64k.

Any memory address evenly divisible by 16 is called a paragraph boundary. The first paragraph boundary is 0. The second is 10H and so on. Any paragraph boundary may be considered the start of a segment.