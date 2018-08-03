---
layout: post
title: Instruction Operands and Memory Addressing Modes in NASM 32-bit
date: 2018-08-03 15:42:20 +0700
description: Instruction Operands and Memory Addressing Modes in NASM 32-bit
img: operand.jpg
tags: [Assembly, NASM, 32-bit]
---
##### Instruction Operands
Operand is a term used to describe any object that is capable of being manipulated. There are three basic types of
operands: immediate, register, and memory. An immediate operand is an constant value that is encoded as part of the
instruction. These are typically used to specify constant arithmetic, logical or offset values. Only source operands can
 be used as immediate operands. Register operands are contained in general-purpose register. A memory operand specifies
 a location in memory, which can contains any of the data types. An instruction can specify either the source or
 destination operand as a memory operand, but not both.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Type</th>
<th>Example</th>
<th>Equivalent C/C++ Statement</th>
</tr>
<tr>
<td>Immediate</td>
<td><code>imul ebx,11h</code></td>
<td><code>ebx *= 0x11</code></td>
</tr>
<tr>
<td>Immediate</td>
<td><code>mov eax,42</code></td>
<td><code>eax = 42</code></td>
</tr>
<tr>
<td>Immediate</td>
<td><code>xor dl,55h</code></td>
<td><code>dl ^= 0x55</code></td>
</tr>
<tr>
<td>Immediate</td>
<td><code>add esi,8</code></td>
<td><code>esi += 8</code></td>
</tr>
<tr>
<td>Register</td>
<td><code>mov eax,ebx</code></td>
<td><code>eax = ebx</code></td>
</tr>
<tr>
<td>Register</td>
<td><code>inc ecx</code></td>
<td><code>ecx += 1</code></td>
</tr>
<tr>
<td>Register</td>
<td><code>mul ebx</code></td>
<td><code>edx:eax = eax * ebx</code></td>
</tr>
<tr>
<td>Memory</td>
<td><code>mov eax,[ebx]</code></td>
<td><code>eax = *ebx</code></td>
</tr>
<tr>
<td>Memory</td>
<td><code>add eax,[val1]</code></td>
<td><code>eax += *val1</code></td>
</tr>
<tr>
<td>Memory</td>
<td><code>sub byte[edi],12</code></td>
<td><code>*(short *)edi -= 12</code></td>
</tr>
<tr>
<td>Memory</td>
<td><code>or ecx,[ebx+esi]</code></td>
<td><code>ecx |= *(ebx + esi)</code></td>
</tr>
</table>
</div>

The multiplicative product's high-order and low-order doublewords are stored in <b>EDX</b> and <b>EAX</b>, respectively.

<div style="overflow:auto;">l
<table class="table table-bordered">
<tr>
<th>Access Memory</th>
<th>Allocate Memory</th>
</tr>
<tr>
<td><code>byte[ptr]</code></td>
<td><code>db</code> (1 byte)</td>
</tr>
<tr>
<td><code>word[ptr]</code></td>
<td><code>dw</code> (2 bytes)</td>
</tr>
<tr>
<td><code>dword[ptr]</code></td>
<td><code>dd</code> (4 bytes)</td>
</tr>
<tr>
<td><code>qword[ptr]</code></td>
<td><code>dq</code> (8 bytes)</td>
</tr>
</table>
</div>


##### Memory Addressing Modes
The x86-32 instruction set supports using up to four separate components to specify a memory operand. The four
components are a fixed displacement value, a base register, an index register, and a scale factor. An effective address
is calculated as follows:

<b>Effective Address = BaseReg + IndexReg * ScaleFactor + Disp</b>

The base register (BaseReg) can be any general-purpose register; the index register (IndexReg) can be any
general-purpose register except <b>ESP</b>; Displacement values (Disp) are constant offsets that are encoded within the
instruction; valid scale factors (ScaleFactor) include 1,2,4, and 8. The size of the final effective address
(EffectiveAddress) is always 32 bits.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Addressing Form</th>
<th>Example</th>
</tr>
<tr>
<td>Disp</td>
<td><code>mov eax,[MyVal]</code></td>
</tr>
<tr>
<td>BaseReg</td>
<td><code>mov eax,[ebx]</code></td>
</tr>
<tr>
<td>BaseReg + Disp</td>
<td><code>mov eax,[ebx+12]</code></td>
</tr>
<tr>
<td>Disp + IndexReg * ScaleFactor</td>
<td><code>mov eax,[MyArray+esi*4]</code></td>
</tr>
<tr>
<td>BaseReg + IndexReg</td>
<td><code>mov eax,[ebx+esi]</code></td>
</tr>
<tr>
<td>BaseReg + IndexReg + Disp</td>
<td><code>mov eax,[ebx+esi+12]</code></td>
</tr>
<tr>
<td>BaseReg + IndexReg * ScaleFactor</td>
<td><code>mov eax,[ebx+esi*4]</code></td>
</tr>
<tr>
<td>Basereg + IndexReg * Scalefactor + Disp</td>
<td><code>mov eax, [ebx+esi*4+20]</code></td>
</tr>
</table>
</div>