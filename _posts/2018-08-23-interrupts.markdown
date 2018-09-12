---
layout: post
title: Interrupts
date: 2018-08-23 20:32:00 +0700
description: Interrupts
img: interrupts.jpg
tags: [16-bit, Assembly, Interrupt, BIOS, DOS]
---
An interrupt is a signal from a device attached to a computer or from a program indicating an event that needs immediate attention. For instance, when you hit a key on the keyboard, and interrupt is signalled to the CPU. If everything is set up correctly, the CPU will stop the currently running code and call a function that will read port 0x60 (the keyboard's output port) to find out what the keyboard is sending. Then the function returns to the last running code before the keyboard caused the interrupt.

The hardware interrupts differ from all the software interrupts in that they have a direct channel to the processor thorough an interrupt request line or IRQ. There are 16 IRQ lines on PC

<div style="overflow:auto;">
<table class="table table-bordered">
  <thead>
  <tr>
    <th>IRQ</th>
    <th>Interrupt</th>
    <th>Function</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>0</td>
    <td>08h</td>
    <td>System timer IC</td>
  </tr>
  <tr>
    <td>1</td>
    <td>09h</td>
    <td>Keyboard controller IC</td>
  </tr>
  <tr>
    <td>2</td>
    <td>0Ah</td>
    <td>Second IRQ controller IC</td>
  </tr>
  <tr>
    <td>3</td>
    <td>0Bh</td>
    <td>Serial port 2 (COM 2: 2F8h-2FFh and COM 4: 2E8h-2EFh) or hardware modem use</td>
  </tr>
  <tr>
    <td>4</td>
    <td>0Ch</td>
    <td>Serial port 1 (COM 1: 3F8h-3FFh and COM 3: 3E8h-3EFh) or serial port mouse use</td>
  </tr>
  <tr>
    <td>5</td>
    <td>0Dh</td>
    <td>Parallel port 2 (LPT 2: 378h or 278h) or general adapter use (typically used for sound cards)</td>
  </tr>
  <tr>
    <td>6</td>
    <td>0Eh</td>
    <td>Floppy disk controller</td>
  </tr>
  <tr>
    <td>7</td>
    <td>0Fh</td>
    <td>Parallel port 1 (LPT 1: 3BCh [mono] or 378h [color]</td>
  </tr>
  <tr>
    <td>8</td>
    <td>70h</td>
    <td>Real time clock or RTC</td>
  </tr>
  <tr>
    <td>9</td>
    <td>71h</td>
    <td>Unused (redirected to IRQ 2)</td>
  </tr>
  <tr>
    <td>10</td>
    <td>72h</td>
    <td>USB on systems so equipped (can be disabled) or general adapter use</td>
  </tr>
  <tr>
    <td>11</td>
    <td>73h</td>
    <td>Windows sound system on systems so equipped (can be disabled) or general adapter use</td>
  </tr>
  <tr>
    <td>12</td>
    <td>74h</td>
    <td>Motherboard mouse port on systems so equipped or general adapter use</td>
  </tr>
  <tr>
    <td>13</td>
    <td>75h</td>
    <td>Math coprocessor</td>
  </tr>
  <tr>
    <td>14</td>
    <td>76h</td>
    <td>Primary AT/IDE hard disk controller</td>
  </tr>
  <tr>
    <td>15</td>
    <td>77h</td>
    <td>Secondary AT/IDE hard disk controller on systems so equipped (can be disabled) or general adapter use</td>
  </tr>
</tbody>
</table>
</div>

When power is applied to a computer, the POST procedure creates a table of interrupt vectors that is 1024 bytes and contains a maximum of 256 interrupts. This table lists pointers to interrupt service routines. The interrupt vector table starts at memory location 0000:0000h and ends at 0000:03fch. An interrupt vector is a 4-byte value of the form segment:offset, which represents the address of a routine to be called when the CPU receives an interrupt.

<div style="overflow:auto;">
<table class="table table-bordered">
  <thead>
  <tr>
    <th>Interrupt</th>
    <th>Address</th>
    <th>Type</th>
    <th>Function</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>00h</td>
    <td>0000:0000h</td>
    <td>Processor</td>
    <td>Divide By Zero</td>
  </tr>
  <tr>
    <td>01h</td>
    <td>0000:0004h</td>
    <td>Processor</td>
    <td>Single Step</td>
  </tr>
  <tr>
    <td>02h</td>
    <td>0000:0008h</td>
    <td>Processor</td>
    <td>Nonmaskable Interrupt (NMI)</td>
  </tr>
  <tr>
    <td>03h</td>
    <td>0000:000Ch</td>
    <td>Processor</td>
    <td>Breakpoint Instruction</td>
  </tr>
  <tr>
    <td>04h</td>
    <td>0000:0010h</td>
    <td>Processor</td>
    <td>Overflow Instruction</td>
  </tr>
  <tr>
    <td>05h</td>
    <td>0000:0014h</td>
    <td>BIOS/Software</td>
    <td>Print Screen</td>
  </tr>
  <tr>
    <td>05h</td>
    <td>0000:0014h</td>
    <td>Hardware</td>
    <td>Bounds Exception (80286, 80386)</td>
  </tr>
  <tr>
    <td>06h</td>
    <td>0000:0018h</td>
    <td>Hardware</td>
    <td>Invalid Op Code (80286, 80386)</td>
  </tr>
  <tr>
    <td>07h</td>
    <td>0000:001Ch</td>
    <td>Hardware</td>
    <td>Math Coprocessor Not Present</td>
  </tr>
  <tr>
    <td>08h</td>
    <td>0000:0020h</td>
    <td>Hardware</td>
    <td>Double Exception Error (80286, 80386) (AT Only)</td>
  </tr>
  <tr>
    <td>08h</td>
    <td>0000:0020h</td>
    <td>Hardware</td>
    <td>System Timer - IRQ 0</td>
  </tr>
  <tr>
    <td>09h</td>
    <td>0000:0024h</td>
    <td>Hardware</td>
    <td>Keyboard - IRQ 1</td>
  </tr>
  <tr>
    <td>09h</td>
    <td>0000:0024h</td>
    <td>Hardware</td>
    <td>Math Coprocessor Segment Overrun (80286, 80386) (AT Only)</td>
  </tr>
  <tr>
    <td>0Ah</td>
    <td>0000:0028h</td>
    <td>Hardware</td>
    <td>IRQ 2 - Cascade from Second programmable Interrupt Controller</td>
  </tr>
  <tr>
    <td>0Ah</td>
    <td>&nbsp;</td>
    <td>Hardware</td>
    <td>Invalid Task Segment State (80286, 80286) (AT Only)</td>
  </tr>
  <tr>
    <td>0Ah</td>
    <td>&nbsp;</td>
    <td>Hardware</td>
    <td>IRQ 2 - General Adapter Use (PC Only)</td>
  </tr>
  <tr>
    <td>0Bh</td>
    <td>0000:002Ch</td>
    <td>Hardware</td>
    <td>IRQ 3 - Serial Communications (COM 2)</td>
  </tr>
  <tr>
    <td>0Bh</td>
    <td>&nbsp;</td>
    <td>Hardware</td>
    <td>Segment Not Present (80286, 80386)</td>
  </tr>
  <tr>
    <td>0Ch</td>
    <td>0000:0030h</td>
    <td>Hardware</td>
    <td>IRQ 4 - Serial Communications (COM 1)</td>
  </tr>
  <tr>
    <td>0Ch</td>
    <td>&nbsp;</td>
    <td>Hardware</td>
    <td>Stack Segment Overflow (80286, 80386)</td>
  </tr>
  <tr>
    <td>0Dh</td>
    <td>0000:0034h</td>
    <td>Hardware</td>
    <td>Parallel Printer (LPT 2) (AT Only)</td>
  </tr>
  <tr>
    <td>0Dh</td>
    <td>&nbsp;</td>
    <td>Hardware</td>
    <td>IRQ 5 - Fixed Disk (XT Only)</td>
  </tr>
  <tr>
    <td>0Dh</td>
    <td>&nbsp;</td>
    <td>Software</td>
    <td>General Protection Fault (80286, 80386)</td>
  </tr>
  <tr>
    <td>0Eh</td>
    <td>0000:0038h</td>
    <td>Software</td>
    <td>IRQ 6- Diskette Drive Controller</td>
  </tr>
  <tr>
    <td>0Eh</td>
    <td>&nbsp;</td>
    <td>Software</td>
    <td>
      Page Fault (80386
        Only)
    </td>
  </tr>
  <tr>
    <td>0Fh</td>
    <td>0000:003Ch</td>
    <td>Software</td>
    <td>IRQ 7 - Parallel printer (LPT 1)</td>
  </tr>
  <tr>
    <td>10h</td>
    <td>0000:0040h</td>
    <td>Software</td>
    <td>Video</td>
  </tr>
  <tr>
    <td>10h</td>
    <td>&nbsp;</td>
    <td>Software</td>
    <td>Numeric Coprocessor Fault (80286, 80386)</td>
  </tr>
  <tr>
    <td>11h</td>
    <td>0000:0044h</td>
    <td>Software</td>
    <td>Equipment List</td>
  </tr>
  <tr>
    <td>
      12h
    </td>
    <td>0000:0048h</td>
    <td>Software</td>
    <td>Memory Size</td>
  </tr>
  <tr>
    <td>13h</td>
    <td>0000:004Ch</td>
    <td>Software</td>
    <td>Fixed Disk/ Diskette</td>
  </tr>
  <tr>
    <td>14h</td>
    <td>0000:0050h</td>
    <td>Software</td>
    <td>Serial Communication</td>
  </tr>
  <tr>
    <td>15h</td>
    <td>0000:0054h</td>
    <td>Software</td>
    <td>System Services</td>
  </tr>
  <tr>
    <td>16h</td>
    <td>0000:0058h</td>
    <td>Software</td>
    <td>Keyboard</td>
  </tr>
  <tr>
    <td>17h</td>
    <td>0000:005Ch</td>
    <td>Software</td>
    <td>Parallel Printer</td>
  </tr>
  <tr>
    <td>18h</td>
    <td>0000:0060h</td>
    <td>Software</td>
    <td>Load ROM Basic (PC Only)</td>
  </tr>
  <tr>
    <td>18h</td>
    <td>&nbsp;</td>
    <td>Software</td>
    <td>Process Boot Failure (XT, AT)</td>
  </tr>
  <tr>
    <td>19h</td>
    <td>0000:0064h</td>
    <td>Software</td>
    <td>Boot Strap Loader</td>
  </tr>
  <tr>
    <td>1Ah</td>
    <td>0000:0068h</td>
    <td>Software</td>
    <td>Time of Day</td>
  </tr>
  <tr>
    <td>1Bh</td>
    <td>0000:006Ch</td>
    <td>Software</td>
    <td>Keyboard Break</td>
  </tr>
  <tr>
    <td>1Ch</td>
    <td>0000:0070h</td>
    <td>User</td>
    <td>User Timer Tick</td>
  </tr>
  <tr>
    <td>1Dh</td>
    <td>0000:0074h</td>
    <td>BIOS Table</td>
    <td>Video Parameter Table</td>
  </tr>
  <tr>
    <td>1Eh</td>
    <td>0000:006Ch</td>
    <td>BIOS Table</td>
    <td>Diskette parameter table</td>
  </tr>
  <tr>
    <td>1Fh</td>
    <td>0000:007Ch</td>
    <td>User</td>
    <td>Video Graphics Characters</td>
  </tr>
  <tr>
    <td>20h-3Fh</td>
    <td>0000:0080h - 0000:00FCh</td>
    <td>Software</td>
    <td>Reserved for DOS</td>
  </tr>
  <tr>
    <td>40h</td>
    <td>0000:0100h</td>
    <td>Software</td>
    <td>Diskette Boot Revector</td>
  </tr>
  <tr>
    <td>41h</td>
    <td>0000:0104h</td>
    <td>BIOS Table</td>
    <td>Fixed Disk Parameter Table</td>
  </tr>
  <tr>
    <td>42h</td>
    <td>0000:0108h</td>
    <td>BIOS Table</td>
    <td>EGA Default Video Driver</td>
  </tr>
  <tr>
    <td>43h</td>
    <td>0000:010Ch</td>
    <td>User</td>
    <td>Video Graphics Characters</td>
  </tr>
  <tr>
    <td>44h - 45h</td>
    <td>0000:0110h - 0000:0114h</td>
    <td>Software</td>
    <td>Reserved</td>
  </tr>
  <tr>
    <td>46h</td>
    <td>0000:0118h</td>
    <td>BIOS Table</td>
    <td>Fixed Disk Parameter Table</td>
  </tr>
  <tr>
    <td>47h - 49h</td>
    <td>0000:011Ch - 0000:0124h</td>
    <td>Software</td>
    <td>Reserved</td>
  </tr>
  <tr>
    <td>4Ah</td>
    <td>0000:0128h</td>
    <td>User</td>
    <td>User Alarm</td>
  </tr>
  <tr>
    <td>4Bh - 6Fh</td>
    <td>0000:012Ch - 0000:01BCh</td>
    <td>Software</td>
    <td>Reserved</td>
  </tr>
  <tr>
    <td>70h</td>
    <td>0000:01C0h</td>
    <td>Hardware</td>
    <td>IRQ 8 - Real Time Clock</td>
  </tr>
  <tr>
    <td>71h</td>
    <td>0000:01C4h</td>
    <td>Hardware</td>
    <td>IRQ 9 - Redirect Cascade</td>
  </tr>
  <tr>
    <td>72h</td>
    <td>0000:01C8h</td>
    <td>Hardware</td>
    <td>IRQ 10 - General Adapter Use</td>
  </tr>
  <tr>
    <td>73h</td>
    <td>0000:01CCh</td>
    <td>Hardware</td>
    <td>IRQ 11 - General Adapter Use</td>
  </tr>
  <tr>
    <td>74h</td>
    <td>0000:01D0h</td>
    <td>Hardware</td>
    <td>IRQ 12 - General  Adapter Use/ PS/2 Mouse</td>
  </tr>
  <tr>
    <td>75h</td>
    <td>0000:01D4h</td>
    <td>Hardware</td>
    <td>IRQ 13 - Math Coprocessor Exception</td>
  </tr>
  <tr>
    <td>76h</td>
    <td>0000:01D8h</td>
    <td>Hardware</td>
    <td>IRQ 14 - Primary Hard Disk Controller</td>
  </tr>
  <tr>
    <td>77h</td>
    <td>0000:01DCh</td>
    <td>Hardware</td>
    <td>IRQ 15 - Secondary Hard Disk Controller / General Adapter Use</td>
  </tr>
</tbody>
</table>
</div>
