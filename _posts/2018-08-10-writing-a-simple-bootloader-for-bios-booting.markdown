---
layout: post
title: Writing a simple bootloader for BIOS Booting
date: 2018-08-11 20:32:00 +0700
description: Writing a simple bootloader for BIOS Booting
img: bootloader.jpg
tags: [Bootloader, NASM, 16-bit, Assembly]
---
When a BIOS based computer is switched on the BIOS (Basic Input-Output System) runs several several tests to verify the hardware components called POST (Power On Slef Test). the BIOS is baked into the motherboard of your computer, usually stored on what is called an EEPROM. After POST executes successfully, the BIOS looks for a boot device from a list of devices. These boot devices can either be a floppy drive, CDROM, hard drive, a network interface, or other removable media such as USB flash drive. The BIOS checks for the boot sector on the bootable device. The Boot sector is MBR (Master Boot Record). MBR consists of 512 bytes at the first sector of the hard disk. MBR is not located inside any partition. MBR precedes the first partition. The last 2 bytes of MBR contain boot signature which is (0x55 and 0xAA) used by BIOS to determine if the selected boot drive is bootable or not. If the selected boot drive is bootable, BIOS will load the first 512 bytes into the memory and instruct the CPU to execute them.

Bootloader is a piece of code that runs before any operating system is running. The 512 bytes at first sector is created by bootloader. Bootloader runs in 16-bit real mode.

<pre>
<code data-language="c">; Since we're operating in 16-bit mode
; we need to prefix any instruction with the Operand Size Override Prefix (0x66)
BITS 16

message db 'This is a simple bootloader!', 0

start:
    ; Set up 4K stack after this bootloader
    ; [Remember: Effective Address = Segment*16 + Offset]
    mov ax, 07C0h   ; Set 'ax' equal to the location of the bootloader loaded
    add ax, 20h     ; Skip over the size of the bootloader (512 bytes)
    mov ss, ax      ; Set 'ss' to the location after the bootloader
    mov sp, 4096    ; Set 'ss:sp' to the top of our 4K stack

    ; Set data segment to where we're loaded so we can implicitly access all 64K from here since the null-terminated
    ; string's location is not far from the location of the bootloader loaded
    mov ax, 07C0h   ; Set 'ax' equal to the location of the bootloader loaded
    mov ds, ax      ; Set 'ds' to the location of the bootloader loaded

    ; Print our message and stop execution
    mov si, message ; Put the first character's offset of the null-terminated string into 'si'
    call print      ; Call our string-printing routine
    cli             ; Clear the Interrupt Flag (disable external interrupts)
    hlt             ; Halt the CPU (until the next external interrupt)

; Routine for outputting string in 'si' register to screen
print:
    mov ah, 0Eh     ; Specify 'int 10h' 'teletype output' function
                    ; [AL = Character, BH = Page Number, BL = Colour (in graphics mode)]
.printchar:
    lodsb           ; Load byte at address SI into AL, and increment SI
    cmp al, 0
    je .done        ; If the character is zero (NUL), stop writing the string
    int 10h         ; Otherwise, print the character via 'int 10h'
    jmp .printchar  ; Repeat for the next character
.done:
    ret


; Pad to 510 bytes (boot sector size minus 2) with 0s, and finish with the two-byte standard boot signature
times 510-($-$$) db 0
dw 0xAA55	        ; => 0x55 0xAA (little endian byte order)</code>
</pre>

