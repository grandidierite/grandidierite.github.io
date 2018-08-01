---
layout: post
title: Basic Execution Environment of Intel Processor 32-bit Architecture
date: 2018-07-30 13:42:20 +0700
description: Basic Execution Environment of Intel Processor 32-bit Architecture
img: nasm.jpg
tags: [Assembly, NASM, 32-bit]
---
##### General Purpose Registers
There are 8 general purpose registers in 32-bit mode:
1. accumulator register <b>EAX</b>. Used in arithmetic operations
2. base register <b>EBX</b>. Used as pointer to data in the <b>DS</b> segment
3. counter register <b>ECX</b>. Used in shift/rotate instructions and loops
4. data register <b>EDX</b>. Used in arithmetic operations and I/O operations
5. stack pointer register <b>ESP</b>. Used as pointer to the top of the stack
6. stack base pointer register <b>EBP</b>. Used to point to the base of the stack
7. source index pointer <b>ESI</b>. Used as a pointer to a source in stream operations
8. destination index register <b>EDI</b>. Used as a pointer to a destination in stream operations

Register <b>EAX</b>, <b>EBX</b>, <b>ECX</b>, and <b>EDX</b> can be accessed in 16-bit mode:
1. <b>AX</b>
2. <b>BX</b>
3. <b>CX</b>
4. <b>DX</b>

It also can be accessed in 8-bit mode:
1. the least significant byte (LSB) or low half of <b>AX</b> is <b>AL</b> and the most significant byte (MSB) or high half of <b>AX</b> is <b>AH</b>
2. the least significant byte (LSB) or low half of <b>BX</b> is <b>BL</b> and the most significant byte (MSB) or high half of <b>BX</b> is <b>BH</b>
3. the least significant byte (LSB) or low half of <b>CX</b> is <b>CL</b> and the most significant byte (MSB) or high half of <b>CX</b> is <b>CH</b>
4. the least significant byte (LSB) or low half of <b>DX</b> is <b>DL</b> and the most significant byte (MSB) or high half of <b>DX</b> is <b>DH</b>

![General Purpose Registers](/assets/img/dataregister.png){:class="img-responsive"}

##### Segment Registers
Segment registers are 16-bit registers. They are 6 segment registers:
1. Stack Segment (<b>SS</b>). Pointer to the stack
2. Code Segment (<b>CS</b>). Pointer to the code
3. Data Segment (<b>DS</b>). Pointer to the data
4. Extra Segment (<b>ES</b>). Pointer to extra data ('E' stands for 'Extra')
5. F Segment (<b>FS</b>). Pointer to more extra data ('F' comes after 'E')
6. G Segment (<b>GS</b>). Pointer to still more extra data ('G' comes after 'F')

Segment registers are used to access memory segments. Memory segmentation is the old way of accessing memory regions. All major operating systems including OSX, Linux, (from version 0.1) and Windows (from NT) are now using paging.

##### EFLAGS Register
The EFLAGS is a 32-bit register used as a collection of bits representing Boolean values to store the results of operations and the state of the processor.

The 32-bit EFLAGS register contains a group of status flags, a control flag, and a group of system flags.

![EFLAGS Registers](/assets/img/eflags.png){:class="img-responsive"}

The status flags (bits 0, 2, 4, 6, 7, and 11) of the EFLAGS register indicate the results of arithmetic instructions, such as the <b>ADD</b>, <b>SUB</b>, <b>MUL</b>, and <b>DIV</b> instructions. The status flag functions are:
1. Carry flag <b>CF</b> (bit 0), set if arithmetic operation generates a carry or a borrow out of the most significant bit of the result. This flag indicates an overflow condition for unsigned-integer arithmetic.
2. Parity flag <b>PF</b> (bit 2), set if the least significant byte of the result contains an even number of 1 bits
3. Auxiliary Carry flag <b>AF</b> (bit 4), set if an arithmetic generates a carry or a borrow out of bit 3 of the result. This flag is used in binary-coded decimal (BCD) arithmetic
4. Zero flag <b>ZF</b> (bit 6), set if the result is zero
5. Sign flag <b>SF</b> (bit 7), set equal to the most-significant bit of the result, which is the sign bit of a signed integer (0 indicates a positive value and 1 indicates a negative value)
6. Overflow flag <b>OF</b> (bit 11), set if the integer result is too large a positive number or to small a negative number to fit in the destination operand

The control flag of the EFLAGS register controls the string instructions (<b>MOVS</b>, <b>CMPS</b>, <b>SCAS</b>, <b>LODS</b>, and <b>STOS</b>)
* Direction flag <b>DF</b> (bit 10), setting the <b>DF</b> flag causes the string instructions to auto-decrement (to process strings from high addresses to low addresses). Clearing the flag causes the string instructions to auto-increment (to process strings from low addresses to high addresses). The <b>STD</b> and <b>CLD</b> instructions set and clear the <b>DF</b> flag, respectively.

The system flags and IOPL field in the EFLAGS register control operating system or executive operations. They should not be modified by application programs. The functions of the system flags are as follow
1. Trap flag <b>TF</b> (bit 8), set to enable single-step mode for debugging
2. Interrupt enable flag <b>IF</b> (bit 9), controls the response of the processor to maskable interrupt requests. Set to respond to maskable interrupts; cleared to inhibit maskable interrupts
3. Nested task flag <b>NT</b> (bit 14), controls the chaining of interrupted and called tasks. Set when the current task is linked to the previously executed task; cleared when the current task is not linked to another task
4. I/O privilege level field <b>IOPL</b> (bit 12 and 13), indicates the I/O privilege level of the currently running program or task. The current privilege level (CPL) of the currently running program or task must be less than or equal to the I/O privilege level to access the I/O address space. The <b>POPF</b> and <b>IRET</b> instructions can modify this field only when operating at a CPL of 0
5. Resume flag <b>RF</b> (bit 16), controls the processor's response to debug exceptions
6. Virtual-8086 mode flag <b>VM</b> (bit 17), set to enable virtual-8086 mode; clear to return to protected mode without virtual-8086 mode semantics
7. Alignment check (or access control) flag <b>AC</b> (bit 18), if the <b>AM</b> bit is set in the CR0 register, alignment checking of user-mode data accesses is enabled if and only if this flag is 1. If the SMAP bit is set in the CR4 register, explicit supervisor-mode data accesses to user-mode pages are allowed if and only if this bit is 1
8. Virtual interrupt flag <b>VIF</b> (bit 19), virtual image of the <b>IF</b> flag. Used in conjunction with the <b>VIP</b> flag. To use this flag and the <b>VIP</b> flag the virtual mode extensions are enabled by setting the <b>VME</b> flag in control register CR4.
9. Virtual interrupt pending flag <b>VIP</b> (bit 20), set to indicate an interrupt is pending; clear when no interrupt is pending. Used in conjunction with the <b>VIF</b> flag
10. Identification flag <b>ID</b> (bit 21), the ability of a program to set or clear this flag indicates support for the CPUID instruction

##### Instruction Pointer Register
The <b>EIP</b> register contains the address of the next instruction to be executed if no branching is done. <b>EIP</b>
can only be read through the stack after a <code>call</code> instruction.
