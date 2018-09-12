---
layout: post
title: Basic Instructions
date: 2018-08-29 20:32:00 +0700
description: Basic Instructions
img: instruction.jpg
tags: [Assembly, NASM]
---
##### <code>AAA</code> (ASCII Adjust AL for Addition)
The <code>aaa</code> instruction is used to adjust the content of the <code>AL</code> register after that register has been used to perform the addition of two unpacked BCDs.

The algorithm is as follows

<pre>
<code>IF (al AND 0Fh > 9) or (AF = 1)  ;; if low nibble of AL > 9 or the Auxilliary Flag is set
   al = al+6
   ah = ah+1
   CF set
   AF set
ENDIF
al = al AND 0Fh ;; clear the high nibble of AL</code>
</pre>

The auxiliary flag is set whenever there is an overflow of the lower 4 bits after an addition.

Example

<pre>
<code data-language="c">mov  al,7
add  al,2    ;al = 9, AF clear, CF clear
aaa          ;al = 9, ah is unchanged, CF clear</code>
</pre>

<pre>
<code data-language="c">mov  al,7
add  al,6    ;al = 13 = 0Dh, al AND 0Fh = 0Dh > 9, AF clear, CF clear
aaa          ;al = al+6 = 19 = 13h AND 0Fh = 3, ah=ah+1, CF set</code>
</pre>

<pre>
<code data-language="c">mov  al,7
add  al,9    ;al = 16 = 10h, al AND 0Fh = 0 <= 9, AF set, CF clear
aaa          ;al = al+6 = 22 = 16h AND 0Fh = 6, ah=ah+1, CF set</code>
</pre>

Because only the lower 4 bits of <code>AL</code> are retained, thus it is possible to add the ASCII values of numerical digits directly without the need to convert them to their binary values beforehand.

<pre>
<code data-language="c">mov  al,"7"  ;37h
add  al,"2"  ;al = 37h+32h = 69h AND 0Fh = 9, AF clear, CF clear
aaa          ;al = 69h AND 0Fh = 9, ah is unchanged, CF clear</code>
</pre>

Example of adding two large numbers

<pre>
<code data-language="c">global _start

section .data
num1    db   "491756380472816275825"
num2    db   "8387562019932850157"
size1   dd   21
size2   dd   19
length    db   0

section .bss
answer  resb 32

section .text
_start:

; ECX will be used to hold the count of digits in the longer string
; EDX will be used to hold the count of digits in the shorter string
; ESI will be used to point to the current digit of the longer string
; EDI will be used to point to the current digit of the shorter string
; EBX will be used to point to the current digit of the answer
   pushad

   mov      eax,[size1]
   cmp      eax,[size2]
   jle      .lower

   mov      ecx,[size1]
   mov      edx,[size2]
   mov      esi,num1
   add      esi,ecx         ;points to the byte after the last digit
   dec      esi             ;now points to last digit
   mov      edi,num2
   add      edi,edx         ;points to the byte after the last digit
   dec      edi             ;now points to last digit
   jmp      .init

.lower:
   mov      ecx,[size2]
   mov      edx,[size1]
   mov      esi,num2
   add      esi,ecx         ;points to the byte after the last digit
   dec      esi             ;now points to last digit
   mov      edi,num1
   add      edi,edx         ;points to the byte after the last digit
   dec      edi             ;now points to last digit

.init:
   mov      ebx,answer      ; size for the answer and then load EBX with its address. the answer will be stored in reverse order
   clc                      ;clear the CF before starting the addition

; The inc and dec instructions don't affect the CF.
; The CF would be affected if you change those for add reg,1 and sub reg,1
; and you would then need to save and restore that flag within the loops.

.shortloop:
   mov      al,[esi]
   adc      al,[edi]         ;add the two digits and include CF from previous addition

   aaa                       ;adjust the resulting digit of the addition
   mov      [ebx],al         ;store it
   inc      ebx
   dec      esi
   dec      edi
   dec      ecx
   dec      edx
   jnz      .shortloop

; At this point, all the digits of the shorter number have been added.
; The remaining digits of the longer number must still be processed
; with any carry from previous additions.

   inc      ecx
   dec      ecx
   jnz      .longloop
   jnc      .finish          ;no overflow from last addition
   mov      byte[ebx],1
   inc      ebx
   jmp      .finish

.longloop:
   mov     al,[esi]
   adc     al,0
   aaa
   mov     [ebx],al
   inc     ebx
   dec     esi
   dec     ecx
   jnz     .longloop

   jnc     .finish            ;no overflow from last addition
   mov     byte[ebx],1
   inc     ebx

.finish:
; At this point the answer is in reverse order and in binary format.
; The digits will now be reversed and converted to a null-terminated
; ASCII string ready for display.
; ESI will be used to point from the start of the answer
; EBX will be used to point from the end of the answer
; length will be used to count the length of the answer

   mov     byte[ebx],0         ;to terminate ASCII string
   mov     esi,answer
   dec     ebx                 ;point to last digit

.reverse:
   inc     byte[length]            ;count the length of the answer
   mov     al,[esi]
   mov     ah,[ebx]
   add     ax,3030h            ;convert both to ASCII
   mov     [esi],ah
   mov     [ebx],al
   inc     esi
   dec     ebx
   cmp     esi,ebx
   jbe     .reverse

   popad                       ;restore all registers
   mov     eax,0x4
   mov     ebx,0x1
   mov     ecx,answer
   mov     edx,[length]          ;the length of the answer
   int     0x80                ;print the answer

   ; terminate
   mov     eax,0x1
   xor     ebx,ebx
   int     0x80</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>AAA</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets to 1 if there is a decimal borrow; otherwise, it's cleared to 0.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets to 1 if there is a decimal borrow; otherwise, it's cleared to 0.</td>
</tr>

</table>
</div>

##### <code>AAD</code> (ASCII Adjust AX before Division)
The <code>aad</code> is used to adjust the content of the AX register before that register is used to perform the division of two unpacked BCDs by another unpacked BCD digit.

The algorithm is as follows

<pre>
<code>AL = (AH * 10) + AL
AH = 0</code>
</pre>

Example

<pre>
<code data-language="c">mov  ax,0307h     ; al = 07h, ah = 03h
aad               ; al = (ah*10) + al, ah = 0
mov  bl,5
div  bl           ; al = quotient, ah = remainder</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>AAD</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>undefined.</td>
</tr>
</table>
</div>

##### <code>AAM</code> (ASCII Adjust AX after Multiply)
The <code>aam</code> instruction is used to adjust the content of the AL and AH registers after the AL register has been used to perform the multiplication of two unpacked BCD bytes.

The algorithm is as follows

<pre>
<code>al = al mod 10
ah = al/10</code>
</pre>

Example

<pre>
<code data-language="c">mov  al,7
mov  ah,3
mul  ah      ;al = 21 = 15h, ah = 0
aam          ;al = 21 mod 10 = 1, ah = 21/10 = 2</code>
</pre>

In fact, this multiplication could be used without any preceding multiplication.

Example

<pre>
<code data-language="c">mov  al,73
aam          ;al = 73 mod 10 = 3, ah = 73/10 = 7</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>undefined</td>
</tr>
</table>
</div>

##### <code>ADC</code> (Add with Carry)
The <code>adc</code> instruction is used to add the destination operand with source operand and also with the carry flag.

The algorithm is as follows

<pre>
<code>operand1 = operand1 + operand2 + CF</code>
</pre>

Example

<pre>
<code data-language="c">STC             ; set CF = 1
MOV AL, 5       ; AL = 5
ADC AL, 1       ; AL = AL + 1 + CF = 7 </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>ADC</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the result.</td>
</tr>
</table>
</div>

##### <code>ADD</code> (Add)
The <code>adc</code> instruction is used to add the destination operand with source operand.

The algorithm is as follows

<pre>
<code>operand1 = operand1 + operand2</code>
</pre>

Example
<pre>
<code data-language="c">mov al, 5     ; al = 5
add al, -3    ; al = 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>ADD</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the result.</td>
</tr>
</table>
</div>

##### <code>AND</code> (Logical AND)
The <code>and</code> instruction is used to perform a bitwise AND operation on the destination operand and source operand and stores the result in the destination operand.

The algorithm is as follows

<pre>
<code>operand1 = operand1 AND operand2</code>
</pre>

Example

<pre>
<code data-language="c">mov al,'a'         ; AL = 01100001b
and al,11011111b   ; AL = 01000001b ('A')</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>AND</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>cleared.</td>
</tr>
</table>
</div>

##### <code>CALL</code> (Call Procedure)
The <code>call</code> instruction is used to save procedure linking information on the stack and branches to the procedure specified with the destination operand.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CALL</code></td>
<td>procedure name<br>
label</td>
</tr>
</table>
</div>

##### <code>CBW</code> (Convert Byte to Word)
The <code>cbw</code> instruction is used to perform a bitwise AND operation on the destination operand and source operand and stores the result in the destination operand.

The algorithm is as follows

<pre>
<code>if high bit of AL = 1 then:
   AH = 255 (0FFh)
else
   AH = 0</code>
</pre>

Example

<pre>
<code data-language="c">mov ax,0            ; AH = 0, AL = 0
mov al, -5          ; AX = 000FBh (251)
cbw                 ; AX = 0FFFBh (-5)</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CBW</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected.</td>
</tr>
</table>
</div>

##### <code>CDQ</code> (Convert Double to Quad)
The <code>cdq</code> instruction is used to extend the sign bit of EAX into the EDX register.

The algorithm is as follows

<pre>
<code>if high bit of EAX = 1 then:
   EDX = 0xFFFFFFFF
else
   EDX = 0x0</code>
</pre>

Example

<pre>
<code data-language="c">mov   eax, 0x5   ; eax = 0x5, SF = 0
cdq              ; edx = 0x00000000</code>
</pre>

<pre>
<code>mov   eax, 0x5   ; eax = 0x5
neg   eax        ; eax = 0xFFFFFFFB, SF = 1
cdq              ; edx = 0xFFFFFFFF</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CDQ</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected.</td>
</tr>
</table>
</div>

##### <code>CLC</code> (Clear Carry Flag)
The <code>cdq</code> instruction is used to clear the CF flag.

The algorithm is as follows

<pre>
<code>CF = 0</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CLC</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>cleared to 0.</td>
</tr>
</table>
</div>

##### <code>CLI</code> (Clear Interrupt Flag)
The <code>cli</code> instruction is used to clear the IF flag, interrupts disabled when interrupt flag cleared.

The algorithm is as follows

<pre>
<code>IF = 0</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CLI</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>cleared to 0</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected.</td>
</tr>
</table>
</div>

##### <code>CMC</code> (Complement Carry Flag)
The <code>cmc</code> instruction is used to invert the value of CF flag.

The algorithm is as follows

<pre>
<code>if CF = 1 then CF = 0
if CF = 0 then CF = 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CMC</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the complement of its original value.</td>
</tr>
</table>
</div>


##### <code>CMP</code> (Compare Two Operands)
The <code>cmc</code> instruction is used to compare the first operand with the second operand and sets the status flag in the EFLAGS register according to the results.

The algorithm is as follows

<pre>
<code>operand1 - operand2</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 5
mov bl, 5
cmp al, bl      ; AL = 5, ZF = 1 (so equal!)</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CMP</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the result.</td>
</tr>
</table>
</div>

##### <code>CMPSB</code> (Compare Two Operands)
The <code>cmpsb</code> instruction is used to compare the byte specified with the first operand with the byte specified with the second operand and sets the status flag in the EFLAGS register according to the results. The address of the first operand is read from the <code>DS:SI</code> registers. The address of the second operand is read from the <code>ES:DI</code> registers.

The algorithm is as follows

<pre>
<code>DS:[SI] - ES:[DI]
set flags according to result:
OF, SF, ZF, AF, PF, CF
if DF = 0 then
   SI = SI + 1
   DI = DI + 1
else
   SI = SI - 1
   DI = DI - 1</code>
</pre>

Example

<pre>
<code data-language="c">cld                     ;Scan in the forward direction
mov     cx, 100         ;Scanning 100 bytes (CX is used by REPE)
lea     si, buffer1     ;Starting address of first buffer
lea     di, buffer2     ;Starting address of second buffer
repe    cmpsb           ;   ...and compare it.
jne     mismatch        ;The Zero Flag will be cleared if there is a mismatch</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CMPSB</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
</table>
</div>


##### <code>CMPSW</code> (Compare Two Operands)
The <code>cmpsw</code> instruction is used to compare the word specified with the first operand with the word specified with the second operand and sets the status flag in the EFLAGS register according to the results. The address of the first operand is read from the <code>DS:SI</code> registers. The address of the second operand is read from the <code>ES:DI</code> registers.

The algorithm is as follows

<pre>
<code>DS:[SI] - ES:[DI]
set flags according to result:
OF, SF, ZF, AF, PF, CF
if DF = 0 then
   SI = SI + 2
   DI = DI + 2
else
   SI = SI - 2
   DI = DI - 2</code>
</pre>

Example

<pre>
<code data-language="c">; set forward direction:
cld

; load source into ds:si,
; load target into es:di:
mov     ax, cs
mov     ds, ax
mov     es, ax
lea     si, dat1
lea     di, dat2

; set counter to data length in words:
mov     cx, size

; compare until equal:
repe    cmpsw
jnz     not_equal

; "yes" - equal!
mov     al, 'y'
mov     ah, 0eh
int     10h

jmp     exit_here

not_equal:
      ; "no" - not equal!
      mov     al, 'n'
      mov     ah, 0eh
      int     10h

exit_here:
      ; wait for any key press:
      mov ah, 0
      int 16h

      ret

; data vectors must have equal lengths:
x1:
dat1 dw 1234h, 5678h, 9012h, 3456h
dat2 dw 1234h, 5678h, 9012h, 3456h
size = ($ - x1) / 4</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CMPSW</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the temporary result of the comparison.</td>
</tr>
</table>
</div>

##### <code>CWD</code> (Convert Word To Doubleword)
The <code>cwd</code> instruction is used to extend the sign bit of AX into the DX register.

The algorithm is as follows

<pre>
<code>if high bit of AX = 1 then:
   DX = 65535 (0FFFFh)
else
   DX = 0</code>
</pre>

Example

<pre>
<code data-language="c">mov dx, 0      ; DX = 0
mov ax, 0      ; AX = 0
mov ax, -5     ; DX:AX = 00000h:0FFFBh
cwd            ; DX:AX = 0FFFFh:0FFFBh</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>CWD</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>DAA</code> (Decimal Adjust AL after Addition)
The <code>cwd</code> instruction is used to adjust the content of the AL register after that register is used to perform the addition of two packed BCDs.

The algorithm is as follows

<pre>
<code>IF (al AND 0Fh > 9) or (the Auxilliary Flag is set)
   al = al+6
   AF set
ENDIF
IF (al > 99h) or (Carry Flag is set)
   al = al + 60h
   CF set
ENDIF</code>
</pre>

Example

<pre>
<code data-language="c">mov dx, 0      ; DX = 0
mov ax, 0      ; AX = 0
mov ax, -5     ; DX:AX = 00000h:0FFFBh
cwd            ; DX:AX = 0FFFFh:0FFFBh</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>DAA</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets if the adjustment of the value results in a decimal carry in either digit of the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets if the adjustment of the value results in a decimal carry in either digit of the result</td>
</tr>
</table>
</div>

##### <code>DAS</code> (Decimal Adjust AL after Subtraction)
The <code>das</code> instruction is used to adjust the content of the AL register after that register is used to perform the subtraction of two packed BCDs.

The algorithm is as follows

<pre>
<code>if low nibble of AL > 9 or AF = 1 then:
   AL = AL - 6
   AF = 1
if AL > 9Fh or CF = 1 then:
   AL = AL - 60h
   CF = 1</code>
</pre>

Example

<pre>
<code data-language="c">mov dx, 0      ; DX = 0
mov ax, 0      ; AX = 0
mov ax, -5     ; DX:AX = 00000h:0FFFBh
cwd            ; DX:AX = 0FFFFh:0FFFBh</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>DAS</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets if the adjustment of the value results in a decimal carry in either digit of the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets if the adjustment of the value results in a decimal carry in either digit of the result</td>
</tr>
</table>
</div>

##### <code>DEC</code> (Decrement)
The <code>dec</code> instruction is used to subtract 1 from the destination operand while preserving the state of the CF flag.

The algorithm is as follows

<pre>
<code>operand = operand - 1</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 255     ; AL = 0FFh (255 or -1)
dec al          ; AL = 0FEh (254 or -2)</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>DEC</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>DIV</code> (Unsigned Divide)
The <code>div</code> instruction is used to divide (unsigned) the value in the AX register, DX:AX register pair or EDX:EAX register pair (dividend) by the source operand (divisor) and stores the result in the AX.

The algorithm is as follows

<pre>
<code>when operand is a byte:
AL = AX / operand
AH = remainder (modulus)

when operand is a word:
AX = (DX AX) / operand
DX = remainder (modulus)</code>
</pre>

Example

<pre>
<code data-language="c">mov ax, 203      ; AX = 00CBh
mov bl, 4
div bl           ; AL = 50 (32h), AH = 3</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>DIV</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>HLT</code> (Halt)
The <code>hlt</code> instruction is used to stop instruction execution and place the processor in the HALT state.

Example

<pre>
<code data-language="c">mov eax, 5
hlt</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>HLT</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>IDIV</code> (Signed Divide)
The <code>idiv</code> instruction is used to divide (signed) the value in the AL, AX, or EAX register by the source operand and store the result in the AX, DX:AX, or EDX:EAX registers.

The algorithm is as follows

<pre>
<code>when operand is a byte:
AL = AX / operand
AH = remainder (modulus)

when operand is a word:
AX = (DX AX) / operand
DX = remainder (modulus)</code>
</pre>

Example

<pre>
<code data-language="c">mov ax, -203         ; AX = 0FF35h
mov bl, 4
idiv bl              ; AL = -50 (0CEh), AH = -3 (0FDh)</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>IDIV</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>IMUL</code> (Signed Multiply)
The <code>imul</code> instruction is used to multiply AL, AX, or EAX registers (depending on the operand size) with the source operand and store the product in the AX, DX:AX, or EDX:EAX registers.

The algorithm is as follows

<pre>
<code>when operand is a byte:
AX = AL * operand

when operand is a word:
(DX AX) = AX * operand</code>
</pre>

Example

<pre>
<code data-language="c">mov al, -2
mov bl, -4
imul bl          ; AX = 8</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>IDIV</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>For the one operand form of the instruction, sets when significant bits are carried into the upper half of the result and cleared when the result fits exactly in the lower half of the result. For the two- and three-operand forms of the instruction, sets when the result must be truncated to fit in the destination operand size and cleared when the result fits exactly in the destination operand size</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>For the one operand form of the instruction, sets when significant bits are carried into the upper half of the result and cleared when the result fits exactly in the lower half of the result. For the two- and three-operand forms of the instruction, sets when the result must be truncated to fit in the destination operand size and cleared when the result fits exactly in the destination operand size</td>
</tr>
</table>
</div>

##### <code>INC</code> (Increment)
The <code>inc</code> instruction is used to add 1 from the destination operand while preserving the state of the CF flag.

The algorithm is as follows

<pre>
<code>operand = operand + 1</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 4
inc al           ; AL = 5 </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>INC</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>INT</code> (Interrupt)
The <code>inc</code> instruction is used to generate a call to the interrupt or except handler specified with the destination operand. The destination operand specifies an interrupt vector number from 0 to 255, encoded as 8-bit unsigned intermediate value. Each interrupt vector number provides index to a gate descriptor in the IDT. The interrupt vector number specifies an interrupt descriptor in the interrupt descriptor table (IDT). It provides index into the IDT. The selected interrupt descriptor in turn contains a pointer to an interrupt or exception handler procedure. In protected mode, the IDT contains an array of 8-byte descriptors, each of which is an interrupt gate, trap gate or task gate. In real-address mode, the IDT is an array of 4-byte far pointers (2-byte code segment selector and a 2-byte instruction pointer), each of which point directly to a procedure in the selected segment. (In real-address mode, the IDT is called the interrupt vector table, and its pointers are called interrupt vectors).

The algorithm is as follows

<pre>
<code>Push to stack:
- flags register
- CS
- IP

IF = 0
Transfer control to interrupt procedure</code>
</pre>

Example

<pre>
<code data-language="c">mov ah, 0eh         ; teletype
mov al, 'A'
int 10h             ; BIOS interrupt</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>INT</code></td>
<td>immediate byte</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>INTO</code> (Call to Interrupt Procedure)
The <code>into</code> instruction is used to call interrupt 4 if overflow flag is 1.

The algorithm is as follows

<pre>
<code>if OF = 1 then INT 4</code>
</pre>

Example

<pre>
<code data-language="c">; -5 - 127 = -132 (not in -128..127)
; the result of SUB is wrong (124),
; so OF = 1 is set:
mov al, -5
sub al, 127            ; AL = 7Ch (124)
into                   ; process error. </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>INTO</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>may be cleared, depending on the mode of operation of the processor when the INT instruction is executed</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>IRET</code> (Interrupt Return)
The <code>iret</code> instruction is used to return program control from an exception or interrupt handler to a program or procedure that was interrupted by an exception, an external interrupt, or a software-generated interrupt.

The algorithm is as follows

<pre>
<code>Pop from stack:
- IP
- CS
- flags register</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>IRET</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>affected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>affected</td>
</tr>
</table>
</div>

##### Jump Instructions
<table class="table table-bordered">
<tbody><tr>
<th>Instruction</th>
<th>Operands</th>
<th>Meaning</th>
<th>Jump Condition</th>
</tr>

<tr>
<td><code>JA</code></td>
<td>label</td>
<td>Jump if Above</td>
<td>CF=0 and ZF=0</td>
</tr>

<tr>
<td><code>JAE</code></td>
<td>label</td>
<td>Jump if Above or Equal</td>
<td>CF=0 </td>
</tr>

<tr>
<td><code>JB</code></td>
<td>label</td>
<td>Jump if Below</td>
<td>CF=1</td>
</tr>

<tr>
<td><code>JBE</code></td>
<td>label</td>
<td>Jump if Below or Equal</td>
<td>CF=1 or ZF=1</td>
</tr>

<tr>
<td><code>JC</code></td>
<td>label</td>
<td>Jump if Carry</td>
<td>CF=1</td>
</tr>

<tr>
<td><code>JCXZ</code></td>
<td>label</td>
<td>Jump if CX Zero</td>
<td>CX=0</td>
</tr>

<tr>
<td><code>JE</code></td>
<td>label</td>
<td>Jump if Equal</td>
<td>ZF=1</td>
</tr>

<tr>
<td><code>JG</code></td>
<td>label</td>
<td>Jump if Greater (signed)</td>
<td>ZF=0 and SF=OF</td>
</tr>

<tr>
<td><code>JGE</code></td>
<td>label</td>
<td>Jump if Greater or Equal (signed)</td>
<td>SF=OF</td>
</tr>

<tr>
<td><code>JL</code></td>
<td>label</td>
<td>Jump if Less (signed)</td>
<td>SF != OF</td>
</tr>

<tr>
<td><code>JLE</code></td>
<td>label</td>
<td>Jump if Less or Equal (signed)</td>
<td>ZF=1 or SF != OF</td>
</tr>

<tr>
<td><code>JMP</code></td>
<td>label</td>
<td>Unconditional Jump</td>
<td>unconditional</td>
</tr>

<tr>
<td><code>JNA</code></td>
<td>label</td>
<td>Jump if Not Above</td>
<td>CF=1 or ZF=1</td>
</tr>

<tr>
<td><code>JNAE</code></td>
<td>label</td>
<td>Jump if Not Above or Equal</td>
<td>CF=1</td>
</tr>

<tr>
<td><code>JNB</code></td>
<td>label</td>
<td>Jump if Not Below</td>
<td>CF=0</td>
</tr>

<tr>
<td><code>JNBE</code></td>
<td>label</td>
<td>Jump if Not Below or Equal</td>
<td>CF=0 and ZF=0</td>
</tr>

<tr>
<td><code>JNC</code></td>
<td>label</td>
<td>Jump if Not Carry</td>
<td>CF=0</td>
</tr>

<tr>
<td><code>JNE</code></td>
<td>label</td>
<td>Jump if Not Equal</td>
<td>ZF=0</td>
</tr>

<tr>
<td><code>JNG</code></td>
<td>label</td>
<td>Jump if Not Greater (signed)</td>
<td>ZF=1 or SF != OF</td>
</tr>

<tr>
<td><code>JNGE</code></td>
<td>label</td>
<td>Jump if Not Greater or Equal (signed)</td>
<td>SF != OF</td>
</tr>

<tr>
<td><code>JNL</code></td>
<td>label</td>
<td>Jump if Not Less (signed)</td>
<td>SF=OF </td>
</tr>

<tr>
<td><code>JNLE</code></td>
<td>label</td>
<td>Jump if Not Less or Equal (signed)</td>
<td>ZF=0 and SF=OF</td>
</tr>

<tr>
<td><code>JNO</code></td>
<td>label</td>
<td>Jump if Not Overflow (signed)</td>
<td>OF=0</td>
</tr>

<tr>
<td><code>JNP</code></td>
<td>label</td>
<td>Jump if No Parity</td>
<td>PF=0</td>
</tr>

<tr>
<td><code>JNS</code></td>
<td>label</td>
<td>Jump if Not Signed (signed)</td>
<td>SF=0</td>
</tr>

<tr>
<td><code>JNZ</code></td>
<td>label</td>
<td>Jump if Not Zero</td>
<td>ZF=0</td>
</tr>

<tr>
<td><code>JO</code></td>
<td>label</td>
<td>Jump if Overflow (signed)</td>
<td>OF=1</td>
</tr>

<tr>
<td><code>JP</code></td>
<td>label</td>
<td>Jump if Parity</td>
<td>PF=1</td>
</tr>

<tr>
<td><code>JPE</code></td>
<td>label</td>
<td>Jump if Parity Even</td>
<td>PF=1</td>
</tr>

<tr>
<td><code>JPO</code></td>
<td>label</td>
<td>Jump if Parity Odd</td>
<td>PF=0</td>
</tr>

<tr>
<td><code>JS</code></td>
<td>label</td>
<td>Jump if Signed (signed)</td>
<td>SF=1</td>
</tr>

<tr>
<td><code>JZ</code></td>
<td>label</td>
<td>Jump if Zero</td>
<td>ZF=1</td>
</tr>
</tbody>
</table>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LAHF</code> (Load Status Flags into AH Register)
The <code>lahf</code> instruction is used to move the low byte of the EFLAGS register (which includes status flags SF, ZF, AF, PF, and CF) to the AH register.

The algorithm is as follows

<pre>
<code>AH = flags register</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>LAHF</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LEA</code> (Load Effective Address)
The <code>lea</code> instruction is used to compute the effective address of the second operand and store it in the
first operand.

The algorithm is as follows

<pre>
<code>REG = address of memory (offset)</code>
</pre>

Example

<pre>
<code data-language="c">mov bx, 35h
mov di, 12h
lea si, [bx+di]            ; SI = 35h + 12h = 47h</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>LEA</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LODSB</code>
The <code>lodsb</code> instruction is used to load a byte from the source operand into the AL register. The source operand is a memory location, the address of which is read from the DS:SI register. If the DF flag is 1, the SI register is decremented. The SI register is incremented or decremented by 1.

The algorithm is as follows

<pre>
<code>AL = DS:[SI]
if DF = 0 then
   SI = SI + 1
else
   SI = SI - 1</code>
</pre>

Example

<pre>
<code data-language="c">section .text
 global _start         ;must be declared for using gcc

_start:                  ;tell linker entry point
 mov    ecx, len
 mov    esi, s1
 mov    edi, s2

loop_here:
 lodsb
 add al, 02
 stosb
 loop    loop_here
 cld
 rep     movsb

 mov     edx,20        ;message length
 mov     ecx,s2        ;message to write
 mov     ebx,1         ;file descriptor (stdout)
 mov     eax,4         ;system call number (sys_write)
 int     0x80          ;call kernel

 mov     eax,1         ;system call number (sys_exit)
 int     0x80          ;call kernel

section .data
s1 db 'password', 0 ;source
len equ $-s1

section .bss
s2 resb 10               ;destination</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>lodsb</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LODSW</code>
The <code>lodsw</code> instruction is used to load a word from the source operand into the AX register. The source operand is a memory location, the address of which is read from the DS:SI register. If the DF flag is 1, the SI register is decremented. The SI register is incremented or decremented by 2.

The algorithm is as follows

<pre>
<code>AX = DS:[SI]
if DF = 0 then
   SI = SI + 2
else
   SI = SI - 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>lodsw</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LODSD</code>
The <code>lodsd</code> instruction is used to load a double word from the source operand into the EAX register. The source operand is a memory location, the address of which is read from the DS:ESI register. If the DF flag is 1, the ESI register is decremented. The ESI register is incremented or decremented by 4.

The algorithm is as follows

<pre>
<code>AX = DS:[ESI]
if DF = 0 then
   ESI = ESI + 4
else
   ESI = ESI - 4</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>lodsd</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LOOP</code>
The <code>loop</code> instruction is used to perform a loop operation using the ECX or CX register as a counter. Each
time the loop instruction is executed, the count register is decremented, then checked for 0. If the count is 0, the
loop is terminated and program execution continues with the instruction following the LOOP instruction. If the count is
not zero, a near jump is performed to the destination operand.

The algorithm is as follows

<pre>
<code>CX = CX - 1
if CX <> 0 then
   jump
else
   no jump, continue</code>
</pre>

Example

<pre>
<code data-language="c">section	.text
   global _start        ;must be declared for using gcc

_start:	                ;tell linker entry point
   mov ecx,10
   mov eax, '1'

l1:
   mov [num], eax
   mov eax, 4
   mov ebx, 1
   push ecx

   mov ecx, num
   mov edx, 1
   int 0x80

   mov eax, [num]
   sub eax, '0'
   inc eax
   add eax, '0'
   pop ecx
   loop l1

   mov eax,1             ;system call number (sys_exit)
   int 0x80              ;call kernel
section	.bss
num resb 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>loop</code></td>
<td>label</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LOOPE</code> / <code>LOOPZ</code>
The <code>loope</code> instruction is used to perform a loop operation using the ECX or CX register as a counter. Each
time the loop instruction is executed, the count register is decremented. If the count is 0, the loop is terminated and program execution continues with the instruction following the LOOPE instruction. If the count is not and ZF flag is set to 1, a near jump is performed to the destination operand.

The algorithm is as follows

<pre>
<code>CX = CX - 1
if CX <> 0 and (ZF = 1) then
   jump
else
   no jump, continue</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>loope</code> / <code>loopz</code></td>
<td>label</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>LOOPNE</code> / <code>LOOPNZ</code>
The <code>loopne</code> instruction is used to perform a loop operation using the ECX or CX register as a counter. Each
time the loop instruction is executed, the count register is decremented, then checked for 0. If the count is 0,
the loop is terminated and program execution continues with the instruction following the LOOPNE instruction. If the
count is not and ZF flag is set to 0, a near jump is performed to the destination operand.

The algorithm is as follows

<pre>
<code>CX = CX - 1
if CX <> 0 and (ZF = 0) then
   jump
else
   no jump, continue</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>loopne</code> / <code>loopnz</code></td>
<td>label</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>MOV</code>
The <code>mov</code> instruction is used to copy the second operand to the first operand.

The algorithm is as follows

<pre>
<code>operand1 = operand2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>mov</code></td>
<td>REG, memory<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>MOVSB</code>
The <code>movsb</code> instruction is used to move a byte at DS:SI to ES:DI. After the move operation, the SI and DI registers are incremented or decremented automatically according to the setting of the DF flag. The SI and DI registers are incremented or decremented by 1 byte.

The algorithm is as follows

<pre><code>ES:[DI] = DS:[SI]
if DF = 0 then
   SI = SI + 1
   DI = DI + 1
else
   SI = SI - 1
   DI = DI - 1</code>
</pre>

<pre>
<code data-language="c">section	.text
   global _start        ;must be declared for using gcc

_start:	                ;tell linker entry point
   mov	ecx, len
   mov	esi, s1
   mov	edi, s2
   cld
   rep	movsb

   mov	edx,20	        ;message length
   mov	ecx,s2	        ;message to write
   mov	ebx,1	        ;file descriptor (stdout)
   mov	eax,4	        ;system call number (sys_write)
   int	0x80	        ;call kernel

   mov	eax,1	        ;system call number (sys_exit)
   int	0x80	        ;call kernel

section .data
s1 db 'Hello, world!',0 ;string 1
len equ $-s1

section	 .bss
s2 resb	20              ;destination</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>movsb</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>MOVSW</code>
The <code>movsw</code> instruction is used to move a word at DS:SI to ES:DI. After the move operation, the SI and DI registers are incremented or decremented automatically according to the setting of the DF flag. The SI and DI registers are incremented or decremented by 2 byte.

The algorithm is as follows

<pre><code>ES:[DI] = DS:[SI]
if DF = 0 then
   SI = SI + 2
   DI = DI + 2
else
   SI = SI - 2
   DI = DI - 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>movsw</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>MOVSD</code>
The <code>movsd</code> instruction is used to move a double word at DS:ESI to ES:EDI. After the move operation, the SI and DI registers are incremented or decremented automatically according to the setting of the DF flag. The SI and DI registers are incremented or decremented by 4 byte.

The algorithm is as follows

<pre><code>ES:[DI] = DS:[SI]
if DF = 0 then
   SI = SI + 4
   DI = DI + 4
else
   SI = SI - 4
   DI = DI - 4</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>movsd</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>MOVSX</code>
The <code>movsx</code> instruction is used to copy the content of the source operand to the destination operand and sign
 extends the value to 16 or 32 bits with 1. The size of the converted value depends on the operand-size attribute.

Example

<pre><code data-languuage="c">mov     bx, 0C3EEh  ; Sign bit of bl is now 1: BH == 1100 0011, BL == 1110 1110
movsx   ebx, bx     ; Load signed 16-bit value into 32-bit register and sign-extend
                    ; EBX is now equal FFFFC3EEh</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>movsx</code></td>
<td>REG, REG<br>
REG, memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>MUL</code> (Unsigned Multiply)
The <code>mul</code> instruction is used to perform an unsigned multiplication of the first operand (AL, AX, or EAX) and
 the second operand and stores the result in the destination operand (AX, DX:AX, or EDX:EAX).

The algorithm is as follows

<pre><code>when operand is a byte:
ax = al * operand

when operand is a word:
(dx:ax) = ax * operand</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>mul</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared to 0 if the upper half of the result is 0; otherwise, they are set to 1</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>cleared to 0 if the upper half of the result is 0; otherwise, they are set to 1</td>
</tr>
</table>
</div>

##### <code>NEG</code>
The <code>neg</code> instruction is used to replace the value of the operand with its two's complement.

The algorithm is as follows

<pre>
<code>Invert all bits of the operand
Add 1 to inverted operand</code>
</pre>

<pre>
<code data-language="c">mov al, 5          ; AL = 05h
neg al             ; AL = 0FBh (-5)
neg al             ; AL = 05h (5) </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>neg</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>cleared to 0 if the upper half of the result is 0; otherwise, they are set to 1</td>
</tr>
</table>
</div>


##### <code>NOP</code>
The <code>nop</code> instruction is used to perform no operation.

<pre>
<code data-language="c">; do nothing, 3 times:
nop
nop
nop
ret</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>nop</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>NOT</code>
The <code>not</code> instruction is used to perform a bitwise NOT operation (each 1 is cleared to 0, and each 0 is set to 1) on the destination operand and stores the result in the destination operand location.

The algorithm is as follows

<pre>
<code>if bit is 1 turn it to 0
if bit is 0 turn it to 1</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 00011011b
not al                   ; AL = 11100100b </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>not</code></td>
<td>REG<br>
memory</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>OR</code> (Logical Inclusive OR)
The <code>or</code> instruction is used to perform a bitwise OR operation between the destination and source operands and stores the result in the destination operand location.

Example

<pre>
<code data-language="c">mov al, 'A' ; AL = 01000001b
or al, 00100000b             ; AL = 01100001b ('a')</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>or</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>POP</code>
The <code>pop</code> instruction is used to load the value from the top of the stack to the location specified with the destination operand and then increments the stack pointer. The address-size attribute of the stack segment determines the stack
pointer size (16 bits or 32 bits) and the operand-size attribute of the current code segment determines the amount of
the stack pointer is incremented (2 bytes or 4 bytes).

The algorithm is as follows

<pre>
<code>operand = SS:[SP] (top of the stack)
SP = SP + 2 </code>
</pre>

Example

<pre>
<code data-language="c">mov ax, 1234h
push ax
pop dx       ; DX = 1234h </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>or</code></td>
<td>REG<br>
memory
</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>POPA</code>
The <code>popa</code> instruction is used to pop all general purpose registers DI, SI, BP, SP, BX, DX, CX, AX from the stack. SP value is ignored, it is popped but not set to SP register


<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>popa</code></td>
<td>no operands
</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>POPAD</code>
The <code>popa</code> instruction is used to pop all general purpose registers edi, esi, ebp, esp, ebx, edx, ecx, eax from the stack. ESP value is ignored, it is popped but not set to ESP register


<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>popad</code></td>
<td>no operands
</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>POPF</code>
The <code>popf</code> instruction is used to get flags register stored in the stack.

The algorithm is as follows

<pre>
<code data-language="c">flags = SS:[SP] (top of the stack)
SP = SP + 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>popf</code></td>
<td>no operands
</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>POPFD</code>
The <code>popfd</code> instruction is used to get flags register stored in the stack.

The algorithm is as follows

<pre>
<code data-language="c">flags = SS:[ESP] (top of the stack)
ESP = ESP + 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>popfd</code></td>
<td>no operands
</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>PUSH</code>
The <code>push</code> instruction is used to store the value of the destination operand into the stack and decrements the stack pointer.

The algorithm is as follows

<pre>
<code data-language="c">SP = SP - 2
SS:[SP] (top of the stack) = operand</code>
</pre>

Example

<pre>
<code data-language="c">mov ax, 1234h
push ax
pop dx                ; DX = 1234h</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>push</code></td>
<td>REG<br>
memory<br>
immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>PUSHA</code>
The <code>pusha</code> instruction is used to push all general purpose registers AX, CX, DX, BX, SP, BP, SI, DI into the
 stack.


<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>pusha</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>PUSHAD</code>
The <code>pushad</code> instruction is used to push all general purpose registers eax, ecx, edx, ebx, esp, ebp, esi, edi
 into the stack.


<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>pushad</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>PUSHF</code>
The <code>pushf</code> instruction is used to store flags register in the stack.

The algorithm is as follows

<pre>
<code>SP = SP - 2
SS:[SP] (top of the stack) = flags</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>pushf</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>PUSHFD</code>
The <code>pushfd</code> instruction is used to store flags register in the stack.

The algorithm is as follows

<pre>
<code>ESP = ESP - 2
SS:[ESP] (top of the stack) = flags</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>pushfd</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>RCL</code>
The <code>rcl</code> instruction is used to shift (rotate) the bits of the first operand, the number of bit positions specified in the second operand and stores the result in the destination operand. The RCL instruction shifts the CF flag into the least-significant bit and shifts the most significant bit into the CF flag.

The algorithm is as follows

<pre>
<code>shift all bits left, the bit that goes off is set to CF and previous value of CF is inserted to the right-most position.</code>
</pre>

![RCL Instruction](/assets/img/RCL.png){:class="img-responsive"}

Example

<pre>
<code data-language="c">stc                       ; set carry (CF=1).
mov al, 1ch               ; AL = 00011100b
rcl al, 1                 ; AL = 00111001b, CF=0</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>rcl</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for single-bit rotates. It is undefined for multi-bit rotates</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the bit shifted into it</td>
</tr>
</table>
</div>

##### <code>RCR</code>
The <code>rcr</code> instruction is used to shift (rotate) the bits of the first operand, the number of bit positions specified in the second operand and stores the result in the destination operand. The RCR instruction shifts the CF flag into the most-significant bit and shifts the less-significant bit into the CF flag.

The algorithm is as follows

<pre>
<code>shift all bits right, the bit that goes off is set to CF and previous value of CF is inserted to the leftmost position.</code>
</pre>

![RCR Instruction](/assets/img/RCR.png){:class="img-responsive"}

Example

<pre>
<code data-language="c">stc                              ; set carry (CF=1)
mov al, 1ch                      ; AL = 00011100b
rcr al, 1                        ; AL = 10001110b, CF=0</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>rcr</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for single-bit rotates it is undefined for multi-bit rotates</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the bit shifted into it</td>
</tr>
</table>
</div>

##### <code>REP</code> (Repeat)
The <code>rep</code> instruction is used to repeat following <code>movsb</code>, <code>movsw</code>, <code>movsd</code>, <code>lodsb</code>, <code>lodsw</code>, <code>lodsd</code>, <code>stosb</code>, <code>stosw</code>, <code>stosd</code> instructions (E)CX times.

The algorithm is as follows

<pre>
<code>check_cx:
if CX <> 0 then
   do following chain instruction
   CX = CX - 1
   go back to check_cx
else
   exit from REP cycle</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>rep</code></td>
<td>chain instructions</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>REPE</code> / <code>REPZ</code>
The <code>repe</code> instruction is used to repeat following <code>cpmsb</code>, <code>cpmsw</code>, <code>cpmsd</code>, <code>scasb</code>, <code>scasw</code>, <code>scasd</code> while ZF = 1 (result is equal), maximum (E)CX times.

The algorithm is as follows

<pre>
<code>check_cx:
if CX <> 0 then
    do following chain instruction
    CX = CX - 1
    if ZF = 1 then:
       go back to check_cx
    else
       exit from REPE cycle
else
    exit from REPE cycle</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>repe</code></td>
<td>chain instructions</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>REPNE</code> / <code>REPNZ</code>
The <code>repne</code> instruction is used to repeat following <code>cpmsb</code>, <code>cpmsw</code>, <code>cpmsd</code>, <code>scasb</code>, <code>scasw</code>, <code>scasd</code> while ZF = 0 (result is not equal), maximum (E)CX times.

The algorithm is as follows

<pre>
<code>check_cx:
if CX <> 0 then
   do following chain instruction
   CX = CX - 1
   if ZF = 0 then:
      go back to check_cx
   else
      exit from REPNE cycle
else
   exit from REPNE cycle</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>repne</code></td>
<td>chain instructions</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>RET</code>
The <code>ret</code> instruction is used to return program control to a return address located on the top of the stack. The address is usually placed on the stack by <code>call</code> instruction.

The algorithm is as follows

<pre>
<code>Pop from stack:
IP
CS

if immediate operand is present:
SP = SP + operand</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>ret</code></td>
<td>no operands or even immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>ROL</code>
The <code>rol</code> instruction is used to shift all the bits toward more significant bit positions except for the most-significant bit, which is rotated to the least-significant bit location.

Example

<pre>
<code data-language="c">mov al, 1ch           ; AL = 00011100b
rol al, 1             ; AL = 00111000b, CF=0</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>rol</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for single-bit rotates; it is undefined for multi-bit rotates</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the bit shifted into it</td>
</tr>
</table>
</div>

##### <code>ROR</code>
The <code>ror</code> instruction is used to shift all the bits toward least significant bit positions except for the least-significant bit, which is rotated to the most-significant bit location.

Example

<pre>
<code data-language="c">mov al, 1ch      ; AL = 00011100b
ror al, 1        ; AL = 00001110b, CF=0 </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>ror</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for single-bit rotates; it is undefined for multi-bit rotates</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the bit shifted into it</td>
</tr>
</table>
</div>

##### <code>SAHF</code>
The <code>sahf</code> instruction is used to load the SF, ZF, AF, PF, and CF flags of the EFLAGS register with values from the corresponding bits in the AH register (bits 7, 6, 4, 2, and 0, respectively). Bits 1, 3, and 5 of register AH are ignored.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>sahf</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>loaded with values from the AH register</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>loaded with values from the AH register</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>loaded with values from the AH register</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>loaded with values from the AH register</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>loaded with values from the AH register</td>
</tr>
</table>
</div>

##### <code>SAL</code>
The <code>sal</code> instruction is used to shift the bits in the first operand to the left by number of bits specified in the second operand. Bits shifted beyond the destination operand boundary are first shifted into the CF flag, then discarded. At the end of the shift operation, the CF flag contains the last bit shifted out of the destination operand.

The algorithm is as follows

<pre>
<code>Shift all bits left, the bit that goes off is set to CF.
Zero bit is inserted to the right-most position.</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 0e0h             ; AL = 11100000b
sal al, 1                ; AL = 11000000b, CF=1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>sal</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for 1-bit shifts; otherwise, it is undefined</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined for a non-zero count</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the last bit shifted out of the destination operand; it is undefined for SHL and SHR instructions where the count is greater than or equal to the size (in bits) of the destination operand</td>
</tr>
</table>
</div>

##### <code>SAR</code>
The <code>sar</code> instruction is used to shift the bits in the first operand to the right by number of bits specified in the second operand. Bits shifted beyond the destination operand boundary are first shifted into the CF flag, then discarded. At the end of the shift operation, the CF flag contains the last bit shifted out of the destination operand.

The algorithm is as follows

<pre>
<code>Shift all bits right, the bit that goes off is set to CF.
The sign bit that is inserted to the left-most position has the same value as before shift.</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 0e0h                ; AL = 11100000b
sar al, 1                   ; AL = 11110000b, CF=0.
mov bl, 4ch                 ; BL = 01001100b
sar bl, 1                   ; BL = 00100110b, CF=0.</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>sar</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for 1-bit shifts; otherwise, it is undefined</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined for a non-zero count</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the last bit shifted out of the destination operand; it is undefined for SHL and SHR instructions where the count is greater than or equal to the size (in bits) of the destination operand</td>
</tr>
</table>
</div>

##### <code>SBB</code> (Subtract with Borrow)
The <code>sbb</code> instruction is used to subtract the first operand with the second operand and the borrow and stores
 the result in the first operand.

The algorithm is as follows

<pre>
<code>operand1 = operand1 - operand2 - CF</code>
</pre>

Example

<pre>
<code data-language="c">stc
mov al, 5
sbb al, 3            ; AL = 5 - 3 - 1 = 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>sbb</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the result</td>
</tr>
</table>
</div>

##### <code>SCASB</code>
The <code>scasb</code> instruction is used to compare the byte specified with memory operand with the value in the AL register and sets the status flags in the EFLAGS according to the result. The memory operand address is read from the ES:DI register.

The algorithm is as follows

<pre>
<code>AL - ES:[DI]
set flags according to result:
OF, SF, ZF, AF, PF, CF

if DF = 0 then
   DI = DI + 1
else
   DI = DI - 1 </code>
</pre>

Example

<pre>
<code data-language="c">section .text
   global _start        ;must be declared for using gcc

_start:	                ;tell linker entry point

   mov ecx,len
   mov edi,my_string
   mov al , 'e'
   cld
   repne scasb
   je found ; when found
   ; If not not then the following code

   mov eax,4
   mov ebx,1
   mov ecx,msg_notfound
   mov edx,len_notfound
   int 80h
   jmp exit

found:
   mov eax,4
   mov ebx,1
   mov ecx,msg_found
   mov edx,len_found
   int 80h

exit:
   mov eax,1
   mov ebx,0
   int 80h

section .data
my_string db 'hello world', 0
len equ $-my_string

msg_found db 'found!', 0xa
len_found equ $-msg_found

msg_notfound db 'not found!'
len_notfound equ $-msg_notfound</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>scasb</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
</table>
</div>

##### <code>SCASW</code>
The <code>scasw</code> instruction is used to compare the word specified with memory operand with the value in the AX register and sets the status flags in the EFLAGS according to the result. The memory operand address is read from the ES:DI register.

The algorithm is as follows

<pre>
<code>AX - ES:[DI]
set flags according to result:
OF, SF, ZF, AF, PF, CF

if DF = 0 then
   DI = DI + 2
else
   DI = DI - 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>scasw</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
</table>
</div>

##### <code>SCASD</code>
The <code>scasd</code> instruction is used to compare the double word specified with memory operand with the value in the EAX register and sets the status flags in the EFLAGS according to the result. The memory operand address is read from the ES:EDI register.

The algorithm is as follows

<pre>
<code>EAX - ES:[EDI]
set flags according to result:
OF, SF, ZF, AF, PF, CF

if DF = 0 then
   EDI = EDI + 4
else
   EDI = EDI - 4</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>scasd</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the temporary result of the comparison</td>
</tr>
</table>
</div>

##### <code>SHL</code>
The <code>shl</code> instruction is used to shift the bits in the first operand to the left by the number of bits specified in the second operand. Bits shifted beyond the first operand boundary are first shifted into the CF flag, then discarded. At the end of the shift operation, the CF flag contains the last bit shifted out of the first operand.

The algorithm is as follows

<pre>
<code>Shift all bits left, the bit that goes off is set to CF.
Zero bit is inserted to the right-most position.</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 11100000b
shl al, 1 ; AL = 11000000b, CF=1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>shl</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for 1-bit shifts; otherwise, it is undefined</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined for a non-zero count</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the last bit shifted out of the destination operand; it is undefined for SHL and SHR instructions where the count is greater than or equal to the size (in bits) of the destination operand</td>
</tr>
</table>
</div>

##### <code>SHR</code>
The <code>shr</code> instruction is used to shift the bits in the first operand to the right by the number of bits specified in the second operand. Bits shifted beyond the first operand boundary are first shifted into the CF flag, then discarded. At the end of the shift operation, the CF flag contains the last bit shifted out of the first operand.

The algorithm is as follows

<pre>
<code>Shift all bits right, the bit that goes off is set to CF.
Zero bit is inserted to the left-most position.</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 00000111b
shr al, 1               ; AL = 00000011b, CF=1.</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>shr</code></td>
<td>memory, immediate<br>
REG, immediate<br>
memory, CL<br>
REG, CL</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>affected only for 1-bit shifts; otherwise, it is undefined</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined for a non-zero count</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result. If the count is 0, the flag is not affected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>contains the value of the last bit shifted out of the destination operand; it is undefined for SHL and SHR instructions where the count is greater than or equal to the size (in bits) of the destination operand</td>
</tr>
</table>
</div>

##### <code>STC</code>
The <code>stc</code> instruction is used to set the CF flag in the EFLAGS register.

The algorithm is as follows

<pre>
<code>CF = 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>stc</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets</td>
</tr>
</table>
</div>


##### <code>STD</code>
The <code>std</code> instruction is used to set the DF flag in the EFLAGS register.

The algorithm is as follows

<pre>
<code>DF = 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>std</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>sets</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>STI</code>
The <code>sti</code> instruction is used to set the IF flag in the EFLAGS register.

The algorithm is as follows

<pre>
<code>IF = 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>sti</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>sets</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>STOSB</code>
The <code>stosb</code> instruction is used to store a byte from the AL register into the destination operand. The
destination operand is a memory location, the address of which is read from ES:DI register.

The algorithm is as follows

<pre>
<code>ES:[DI] = AL
if DF = 0 then
   DI = DI + 1
else
   DI = DI - 1</code>
</pre>

Example

<pre>
<code data-language="c">section	.text
   global _start        ;must be declared for using gcc

_start:	                ;tell linker entry point
   mov    ecx, len
   mov    esi, s1
   mov    edi, s2

loop_here:
   lodsb
   or      al, 20h
   stosb
   loop    loop_here
   cld
   rep	movsb

   mov	edx,20	        ;message length
   mov	ecx,s2	        ;message to write
   mov	ebx,1	        ;file descriptor (stdout)
   mov	eax,4	        ;system call number (sys_write)
   int	0x80	        ;call kernel

   mov	eax,1	        ;system call number (sys_exit)
   int	0x80	        ;call kernel

section	.data
s1 db 'HELLO, WORLD', 0 ;source
len equ $-s1

section	.bss
s2 resb 20              ;destination</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>stosb</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>STOSW</code>
The <code>stosw</code> instruction is used to store a word from the AX register into the destination operand. The
destination operand is a memory location, the address of which is read from ES:DI register.

The algorithm is as follows

<pre>
<code>ES:[DI] = AX
if DF = 0 then
   DI = DI + 1
else
   DI = DI - 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>stosw</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>


##### <code>STOSD</code>
The <code>stosd</code> instruction is used to store a double word from the EAX register into the destination operand. The destination operand is a memory location, the address of which is read from ES:EDI register.

The algorithm is as follows

<pre>
<code>ES:[EDI] = EAX
if DF = 0 then
   EDI = EDI + 1
else
   EDI = EDI - 1</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>stosd</code></td>
<td>no operands</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>SUB</code>
The <code>sub</code> instruction is used to subtract the second operand from the first operand and stores the result in the destination operand.

The algorithm is as follows

<pre>
<code>operand1 = operand1 - operand2</code>
</pre>

Example

<pre>
<code data-language="c">mov al, 5
sub al, 1            ; AL = 4</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>sub</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate </td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>sets according to the result</td>
</tr>
</table>
</div>


##### <code>TEST</code>
The <code>test</code> instruction is used to compute the bitwise logical AND of the first operand and the second operand and sets the SF, ZF, and PF status flags according to the result.

Example

<pre>
<code data-language="c">mov al, 00000101b
test al, 1        ; ZF = 0.
test al, 10b      ; ZF = 1. </code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>test</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate </td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared to 0</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>cleared to 0</td>
</tr>
</table>
</div>

##### <code>XCHG</code>
The <code>xchg</code> instruction is used to exchange the contents of the destination operand and the source operand.

Example

<pre>
<code data-language="c">mov al, 5
mov ah, 2
xchg al, ah          ; AL = 2, AH = 5
xchg al, ah          ; AL = 5, AH = 2</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>xchg</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared to 0</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>unaffected</td>
</tr>
</table>
</div>

##### <code>XOR</code>
The <code>xor</code> instruction is used to perform a bitwise exclusive OR operation on the destination and the source operands and stores the result in the destination operand location.

Example

<pre>
<code data-language="c">mov al, 00000111b
xor al, 00000010b           ; AL = 00000101b</code>
</pre>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Instruction</th>
<th>Operands</th>
</tr>
<tr>
<td><code>xor</code></td>
<td>REG, memory<br>
memory, REG<br>
REG, REG<br>
memory, immediate<br>
REG, immediate</td>
</tr>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Flags</th>
</tr>
<tr>
<td width="150"><code>ID</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIP</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VIF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>AC</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>VM</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>RF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>NT</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IOPL</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>OF</code></td>
<td>cleared</td>
</tr>
<tr>
<td><code>DF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>IF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>TF</code></td>
<td>unaffected</td>
</tr>
<tr>
<td><code>SF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>ZF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>AF</code></td>
<td>undefined</td>
</tr>
<tr>
<td><code>PF</code></td>
<td>sets according to the result</td>
</tr>
<tr>
<td><code>CF</code></td>
<td>cleared</td>
</tr>
</table>
</div>