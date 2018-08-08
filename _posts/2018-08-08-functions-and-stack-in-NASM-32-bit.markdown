---
layout: post
title: Functions and Stack in NASM 32-bit
date: 2018-08-08 15:42:20 +0700
description: Functions and Stack in NASM 32-bit
img: nasmstack.jpg
tags: [Assembly, NASM, 32-bit]
---
When a function is called, a stack frame is created to support the function's execution. The stack frame contains the function's local variables and the arguments passed to the function by its caller. The frame also contains housekeeping information that allows the called function (the callee) to return to the caller safely. The exact contents and layout of the stack vary by processor architecture and function call convention.

The stack is a last in first out (LIFO) structure, the data stored first is retrieved last. Values are placed onto the stack via <code>push</code> and removed via <code>pop</code>.

To keep track the stack, the system uses the base pointer <code>ebp</code> and the stack pointer <code>esp</code>, whereas <code>esp</code> points to the top of the stack and <code>ebp</code> points to the bottom of the stack. In the Intel architecture, as program adds data to the stack, the stack grows downward from high memory to low memory. When items removed from the stack, stack shrinks upward from low to high memory. When a word value is pushed onto the stack, the memory address of <code>esp</code> decreases 2 bytes and when a word value is popped off the stack, the memory address of <code>esp</code> increases 2 bytes. When a double word value is pushed onto/popped off the stack, the memory address of <code>esp</code> decreases/increases 4 bytes.

![Stack](/assets/img/stack.jpg){:class="img-responsive"}

So when we say "top of the stack" on x86, we actually mean the lowest address in the memory area occupied by the stack.

To push new data onto the stack we use the <code>push</code> instruction. What <code>push</code> does is first decrement <code>esp</code> by 4, and then store its operand in the location <code>esp</code> points to.

<pre>
<code data-language="c">push eax</code>
</pre>

is actually equivalent to this:

<pre>
<code data-language="c">sub esp,4
mov [esp],eax</code>
</pre>

Similarly, the <code>pop</code> instruction takes a value off the top of stack and places it in its operand, increasing the stack pointer afterwards.

<pre>
<code data-language="c">pop eax</code>
</pre>

is actually equivalent to this:

<pre>
<code data-language="c">mov eax,[esp]
add esp,4</code>
</pre>

Function has three components: function prologue, function body, and function epilogue. The purpose of function prologue is to save the previous state of the program and set up the stack for the local variables of the function. The function body is usually responsible for some kind of unique and specific task. This part of the function may contains various instructions, branches (jumps) to other functions, etc. The function epilogue is used to restore the program's state to its initial.

Let's take a look at an example

<pre>
<code data-language="c">;;; ;------------------------------------------------------
;;; ;------------------------------------------------------
;;; ; _foobar: needs 3 arguments. The arguments are pushed onto the stack before calling this function.
;;; ;
;;; ; Examples:
;;; ;          push    110
;;; ;          push    45
;;; ;          push    67
;;; ;          call _foobar
;;; ;
;;; ;REGISTERS MODIFIED: EAX
;;; ;------------------------------------------------------
;;; ;------------------------------------------------------
_foobar:
    ; ebp must be preserved across calls. Since
    ; this function modifies it, it must be
    ; saved.
    ;
    push    ebp

    ; From now on, ebp points to the current stack
    ; frame of the function
    ;
    mov     ebp, esp

    ; Make space on the stack for local variables
    ;
    sub     esp, 16

    ; eax <-- a. eax += 2. then store eax in xx
    ;
    mov     eax, DWORD[ebp+8]
    add     eax, 2
    mov     DWORD[ebp-4], eax

    ; eax <-- b. eax += 3. then store eax in yy
    ;
    mov     eax, DWORD[ebp+12]
    add     eax, 3
    mov     DWORD[ebp-8], eax

    ; eax <-- c. eax += 4. then store eax in zz
    ;
    mov     eax, DWORD[ebp+16]
    add     eax, 4
    mov     DWORD[ebp-12], eax

    ; add xx + yy + zz and store it in sum
    ;
    mov     eax, DWORD[ebp-8]
    mov     edx, DWORD[ebp-4]
    lea     eax, [edx+eax]
    add     eax, DWORD[ebp-12]
    mov     DWORD[ebp-16], eax

    ; Compute final result into eax, which
    ; stays there until return
    ;
    mov     eax, DWORD[ebp-4]
    imul    eax, DWORD[ebp-8]
    imul    eax, DWORD[ebp-12]
    add     eax, DWORD[ebp-16]

    ; The leave instruction here is equivalent to:
    ;
    ;   mov esp, ebp
    ;   pop ebp
    ;
    ; Which cleans the allocated locals and restores
    ; ebp.
    ;
    leave
    ret

section .text
        global _start
_start:
     push    34
     push    59
     push    98
     call    _foobar

     mov     ebx, 0
     mov     eax, 1
     int     0x80</code>
</pre>
<br>

Let's examine the stack

<pre>
<code data-language="c">push    34
push    59
push    98</code>
</pre>

First, three values are pushed onto the stack

![Stack](/assets/img/step1.jpg){:class="img-responsive"}

<pre>
<code data-language="c">call _foobar</code>
</pre>

Next, we call the function _foobar. To return to the caller, a function must have the correct return address.
<code>call</code> instruction will push the return address onto the stack before jumping to the target address.

![Stack](/assets/img/step2.jpg){:class="img-responsive"}

<pre>
<code data-language="c">push ebp</code>
</pre>

This instruction saves the value of register <code>ebp</code> to the stack.

![Stack](/assets/img/step3.jpg){:class="img-responsive"}

<pre>
<code data-language="c">mov ebp,esp</code>
</pre>

This instruction will make register <code>ebp</code> point to the same location as register <code>esp</code>.

![Stack](/assets/img/step4.jpg){:class="img-responsive"}

<pre>
<code data-language="c">sub esp,16</code>
</pre>

This instruction makes empty space on the stack for local variables.

![Stack](/assets/img/step5.jpg){:class="img-responsive"}

<pre>
<code data-language="c">mov     eax, DWORD[ebp+8]
add     eax, 2
mov     DWORD[ebp-4], eax</code>
</pre>

![Stack](/assets/img/step6.jpg){:class="img-responsive"}

<pre>
<code data-language="c">mov     eax, DWORD[ebp+12]
add     eax, 3
mov     DWORD[ebp-8], eax</code>
</pre>

![Stack](/assets/img/step7.jpg){:class="img-responsive"}


<pre>
<code data-language="c">mov     eax, DWORD[ebp+16]
add     eax, 4
mov     DWORD[ebp-12], eax</code>
</pre>

![Stack](/assets/img/step8.jpg){:class="img-responsive"}


<pre>
<code data-language="c">mov     eax, DWORD[ebp-8]
mov     edx, DWORD[ebp-4]
lea     eax, [edx+eax]
add     eax, DWORD[ebp-12]
mov     DWORD[ebp-16], eax</code>
</pre>

![Stack](/assets/img/step9.jpg){:class="img-responsive"}

<pre>
<code data-language="c">mov     eax, DWORD[ebp-4]
imul    eax, DWORD[ebp-8]
imul    eax, DWORD[ebp-12]
add     eax, DWORD[ebp-16]</code>
</pre>

![Stack](/assets/img/step10.jpg){:class="img-responsive"}

<pre>
<code data-language="c">leave</code>
</pre>

After executing instruction above, local variables will be removed from the stack, register <code>esp</code> will point to the return address, and register <code>ebp</code> will be back to its initial value.

![Stack](/assets/img/step11.jpg){:class="img-responsive"}

<pre>
<code data-language="c">ret</code>
</pre>

The <code>ret</code> instruction pops the return address off the stack and returns control from a function to the calling program.

![Stack](/assets/img/step12.jpg){:class="img-responsive"}
