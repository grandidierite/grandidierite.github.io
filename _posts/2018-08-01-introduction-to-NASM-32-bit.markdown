---
layout: post
title: Introduction to NASM 32 bit
date: 2018-08-01 13:42:20 +0700
description: introduction to nasm 32 bit
img: nasmhelloworld.jpg
tags: [Assembly, NASM, 32-bit]
---
An assembly program is usually divided into sections. Each section has its use: <code>.text</code> is for writing
instructions, <code>.data</code> is for declaring global variables.

An assembly program can be divided into multiple files. One of them should contain the <code>_start</code> label. It is
the entry point, it marks the first instruction to be executed. This label should be declared <code>global</code>.

<pre>
<code data-language="c">global  _start

section .data
msg     db      'Hello World!', 0Ah     ; assign msg variable with your message string

section .text

_start:
    mov     edx, 13     ; number of bytes to write - one for each letter plus 0Ah (line feed character)
    mov     ecx, msg    ; move the memory address of our message string into ecx
    mov     ebx, 1      ; write to the STDOUT file
    mov     eax, 4      ; invoke SYS_WRITE (kernel opcode 4)
    int     80h

    mov     ebx, 0      ; return 0 status on exit - 'No Errors'
    mov     eax, 1      ; invoke SYS_EXIT (kernel opcode 1)
    int     80h</code>
</pre>

Comments start with a semicolon.

<code>section</code>, <code>global</code>, and <code>db</code> are directives.

<code>mov</code> and <code>int</code> are instructions.

Save the code above as helloworld.asm. To compile and execute the assembly program, use the following commands

<pre>
<code data-language="bash">nasm -f elf32 helloworld.asm
ld -m elf_i386 helloworld.o -o helloworld
./helloworld</code>
</pre>

The option <code>-f</code> of the NASM command is for specifying the output file format. <code>elf32</code> is output format for 32-bit linux object file.

The option <code>-m</code> of the ld command is for specifying machine architecture.