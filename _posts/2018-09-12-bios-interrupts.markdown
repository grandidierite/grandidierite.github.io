---
layout: post
title: BIOS Interrupts
date: 2018-09-12 17:32:00 +0700
description: BIOS Interrupts
img: biosinterrupts.jpg
tags: [BIOS, 16-bit, Assembly, Interrupt]
---
#### Interrupt 10H (<code>int 10h</code>) Video Services

##### Interrupt 10H Service 0 : Set video mode

<b>Input:</b><br>
AH = 0<br>
AL = Mode

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th>Mode</th>
<th>Display Lines</th>
<th>Number of Colors</th>
<th>Adapters</th>
</tr>
<tr>
<td>0</td>
<td>40 x 25</td>
<td>Black &amp; White text</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>1</td>
<td>40 x 25</td>
<td>Color text</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>2</td>
<td>80 x 25</td>
<td>Black &amp; White text</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>3</td>
<td>80 x 25</td>
<td>Color text</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>4</td>
<td>320 x 200</td>
<td>4</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>5</td>
<td>320 x 200</td>
<td>Black &amp; White</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>6</td>
<td>640 x 200</td>
<td>2 (on or off)</td>
<td>CGA, EGA, VGA</td>
</tr>
<tr>
<td>7</td>
<td>80 x 25</td>
<td>Monochrome</td>
<td>MDA, EGA, VGA</td>
</tr>
<tr>
<td>8</td>
<td>160 x 200</td>
<td>16</td>
<td>PCjr</td>
</tr>
<tr>
<td>9</td>
<td>320 x 200</td>
<td>16</td>
<td>PCjr</td>
</tr>
<tr>
<td>A</td>
<td>640 x 200</td>
<td>1</td>
<td>PCjr</td>
</tr>
<tr>
<td>B</td>
<td>Reserved for future use</td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td>C</td>
<td>Reserved for future use</td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td>D</td>
<td>320 x 200</td>
<td>16</td>
<td>EGA, VGA</td>
</tr>
<tr>
<td>E</td>
<td>640 x 200</td>
<td>16</td>
<td>EGA, VGA</td>
</tr>
<tr>
<td>F</td>
<td>640 x 350</td>
<td>Monochrome</td>
<td>EGA, VGA</td>
</tr>
<tr>
<td>10H</td>
<td>640 x 350</td>
<td>16</td>
<td>EGA, VGA</td>
</tr>
<tr>
<td>11H</td>
<td>640 x 480</td>
<td>2</td>
<td>VGA</td>
</tr>
<tr>
<td>12H</td>
<td>640 x 480</td>
<td>16</td>
<td>VGA</td>
</tr>
<tr>
<td>13H</td>
<td>320 x 200</td>
<td>256</td>
<td>VGA</td>
</tr>
</tbody>
</table>
</div>

<p>CGA - Color Graphics Adapter<br>
   EGA - Enhanced Graphics Adapter<br>
   VGA - Video Graphics Array</p>

When the mode is changed, the screen is cleared. However, do not use this service as a "clear-screen" service, since
this can take a little longer than the normal screen-clearing routines (service 06h or 07h). To avoid screen clearing
(PCjr, EGA, and PC convertible only), call with the high bit in AL set (bit 7 = 1).

The cursor is not displayed in graphics mode. Changing the video mode also changes the cursor size.

For the PCjr, CGA, and EGA modes 0, 2, and 5 are identical to modes 1, 3 and 4 except color burst is not enabled.
("Color burst" controls the display of color on composite monitors: when color burst is on, color is displayed; when
it's off, color is not displayed. RGB displays are not affected by color burst status).

Function updates byte at 40:49. Bit 7 of byte 40:87 (EGA/VGA display data area) is set to the value of AL bit 7.

Example

<pre>
<code data-language="c">mov al, 13h
mov ah, 0
int 10h</code>
</pre>

##### Interrupt 10H Service 1 : Set cursor size
Adjusts the size of the cursor by setting its start and end lines.

<b>Input:</b><br>
AH = 1<br>
CH = Cursor start line (bits 4 to 0) and options (bits 5-7)<br>
CL = Cursor end line (bits 4 to 0)

when bit 5 of CH is set to 0, the cursor is visible. when bit 5 is 1, the cursor is not visible.

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

Example

<pre>
<code data-language="c">; hide blinking text cursor:
mov ch, 32
mov ah, 1
int 10h

; show standard blinking text cursor:
mov ch, 6
mov cl, 7
mov ah, 1
int 10h

; show box-shaped blinking text cursor:
mov ch, 0
mov cl, 7
mov ah, 1
int 10h

; note: some bioses required CL to be >=7,
; otherwise wrong cursor shapes are displayed.</code>
</pre>

##### Interrupt 10H Service 2 : Set cursor position
Sets the cursor position (row and column) for a specified display page.

<b>Input:</b><br>
AH = 02h<br>
BH = Display page number<br>
DH = row<br>
DL = column

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

This service can position the cursor on the active display page or on an inactive page.

In graphics modes, this service sets the logical position of the cursor, event though the cursor itself is not displayed
 (there is no cursor display in any graphics mode).

To make cursor invisible, position it on row 25.

To upper left corner of the display is DH = 0h, DL = 0h, while the lower right corner is DH = 18h (24), DL = 27h (39)
for 40-column mode or 4fh (79) for 80-column mode.

See service 05h for a list of legal page numbers for the different display modes. because the service does no value
checking, erratic results can occur if you specify an illegal page number. The page number for graphics mode is 0.

##### Interrupt 10H Service 3 : Read cursor position and size
Reports the cursor position (row and column) and size for a specified display page.

<b>Input:</b><br>
AH = 03h<br>
BH = Display page number

<b>Output:</b><br>
CH = Cursor start line<br>
CL = Cursor end line<br>
DH = row<br>
DL = column

<b>Register destroyed:</b> AX, SP, BP, SI, DI

##### Interrupt 10H Service 4 : Read Light-Pen Position
Reports the position and status of the light pen.

<b>Input:</b><br>
AH = 04h

<b>Output:</b><br>
AH = Status (0 = not triggered, 1 = triggered)<br>
BX = Pixel column number (0-639)<br>
CH = Pixel line number (0-199)<br>
CX = Pixel line number for modes 0fh-10h (0-nnn)<br>
DH = Character row number (0-24)<br>
DL = Character column number (0-39 or 0-79)

<b>Register destroyed:</b> AX, SP, BP, SI, DI

The position is reported in two forms: the character position (row in DH, column in DL), and the pixel location (raster line in CH, column/dot in BX).

The pixel coordinates for the light pen position are not precise. The y coordinate is always a multiple of 2, while the x coordinate is a multiple of 4 for the 320 x 200 mode and a multiple of 8 for the 640 x 200 graphics mode.

##### Interrupt 10H Service 5 : Set active display page
Set the active display page.

<b>Input:</b><br>
AH = 05h<br>
AL = Display page number

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th>Video Mode</th>
<th>Legal Pages</th>
</tr>
<tr>
<td>00h</td>
<td>0-7</td>
</tr>
<tr>
<td>01h</td>
<td>0-7</td>
</tr>
<tr>
<td>02h</td>
<td>0-3</td>
</tr>
<tr>
<td>03h</td>
<td>0-3</td>
</tr>
<tr>
<td>04h</td>
<td>0</td>
</tr>
<tr>
<td>05h</td>
<td>0</td>
</tr>
<tr>
<td>06h</td>
<td>0</td>
</tr>
<tr>
<td>07h</td>
<td>0</td>
</tr>
<tr>
<td>08h</td>
<td>0</td>
</tr>
<tr>
<td>09h</td>
<td>0</td>
</tr>
<tr>
<td>0ah</td>
<td>0</td>
</tr>
<tr>
<td>0dh</td>
<td>0-7</td>
</tr>
<tr>
<td>0eh</td>
<td>0-3</td>
</tr>
<tr>
<td>0fh</td>
<td>0-1</td>
</tr>
<tr>
<td>10h</td>
<td>0-1</td>
</tr>
</tbody>
</table>
</div>

##### Interrupt 10H Service 6 : Scroll window up
Scrolls a specific window upward a specified number of lines.

<b>Input:</b><br>
AH = 06h<br>
AL = Number of lines to scroll (if 0, clear entire window)<br>
BH = Display attribute for blank lines<br>
CH = Row number of upper left corner
CL = Column number of upper left corner
DH = Row number of lower right corner
DL = Column number of lower right corner


<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

Lines are inserted at the bottom with all lines moving up. The new lines are filled with blank characters of a
specified display attribute (value in BH). The lines that disappear at the top of the window are lost.

If the number of lines to scroll is specified as 0, the entire window is filled with blanks. Use the service 07h to
scroll window down.

This service affects only the currently active display page.

##### Interrupt 10H Service 7 : Scroll window down
Scrolls a specific window downward a specified number of lines.

<b>Input:</b><br>
AH = 07h<br>
AL = Number of lines to scroll (if 0, clear entire window)<br>
BH = Display attribute for blank lines<br>
CH = Row number of upper left corner<br>
CL = Column number of upper left corner<br>
DH = Row number of lower right corner<br>
DL = Column number of lower right corner


<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

Lines are inserted at the top with all lines moving down. The new lines are filled with blank characters of specified
display attribute (value in BH). The lines that disappear at the bottom of the window are lost.

If the number of lines to scroll is specified as 0, the entire window is filled with blanks. Use the service 06h to
scroll window up.

This service affects only the currently active display page.

##### Interrupt 10H Service 8 : Read character and attribute at cursor
Reports the ASCII value and (in text mode) attribute of the character at the current cursor location of the specified
display page.

<b>Input:</b><br>
AH = 08h<br>
BH = Display page number (text modes only)


<b>Output:</b><br>
AH = Attribute of character (text mode)<br>
AL = ASCII value of character

<b>Register destroyed:</b> AX, SP, BP, SI, DI

In graphics mode, the display page need not be specified.

The current character and attribute can be obtained for any page, even if the page is not the current active page.

In graphics mode, the service returns 00h in AL if it does not recognize the character pattern.

Use service 09h to write a character with a specific attribute.

##### Interrupt 10H Service 9 : Write character and attribute at cursor
Displays a specified character with a specified attribute a specified number of times.

<b>Input:</b><br>
AX = 09h<br>
AL = ASCII value of character<br>
BH = Display page (text mode only)<br>
BL = Attribute/Color<br>
CX = Number of times to write character

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

Display begins at the current cursor location on the specified display page, but the cursor itself is not moved.

In text mode, characters extending beyond the right side of the screen wrap to the next line; In graphics mode, they do
not.

This service displays control characters as printable characters, rather than as their cursor-control equivalents. For
example, if AL is 13, then the musical note will be displayed, rather than a carriage return.

In graphics mode, if the attribute (BL) is given with bit 7 set, the color bits of the character displayed are XORed
with the color bits of the current character. You can use this feature to write characters and then erase them.

The difference between this service and service 0ah is that this service allows the user to specify the display
attribute byte.

##### Interrupt 10H Service 10 : Write character at cursor
Displays a specified character a specified number of times.

<b>Input:</b><br>
AX = 0ah<br>
AL = ASCII value of character<br>
BH = Display page (text mode only)<br>
CX = Number of times to write character

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

Display begins at the current cursor location on the specified display page, but the cursor itself is not moved.

Use service 09h for graphics modes, since it allows the changing of colors.

In text mode, characters extending beyond the right side of the screen wrap to the next line; in graphics mode, they do
not.

This service displays control characters as printable characters, rather than as their cursor-control equivalents. For
example, if AL is 13, then the musical note will be displayed, rather than a carriage return.

The difference between this service and service 0ah is that this service doesn't allow the user to specify the display
attribute byte. This service uses the current attribute at the cursor for the new character.

##### Interrupt 10H Service 11 : Set color palette
Selects color palette for various display modes.

<b>Input:</b><br>
AX = 0bh<br>
AL = ASCII value of character<br>
BH = Palette color ID (0 or 1)<br>
BL = Color or palette value to be used with color ID (0 - 31)

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

If BH = 0 (Palette Color ID) is 0, then:
* sets background color for 320 x 200 graphics modes
* sets border color for text modes
* sets foreground color for 640 x 200 graphics modes

BL contains the color to use. The EGA will set the
* background color for 640 x 200 graphics modes

When setting the border color for text modes, colors 16-31 will select the high-intensity background set.

If BH = 1 (Palette Color ID) is 1, then
* selects the palette for 320 x 200 graphics modes

The value in BL determines which palette combination to use, as defined below

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th colspan="2">Palette 0 (BL = 0)</th>
</tr>
<tr>
<th>Pixel Value</th>
<th>Color</th>
</tr>
<tr>
<td>0</td>
<td>Current background color</td>
</tr>
<tr>
<td>1</td>
<td>Green</td>
</tr>
<tr>
<td>2</td>
<td>Red</td>
</tr>
<tr>
<td>3</td>
<td>Brown</td>
</tr>
</tbody>
</table>
</div>

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th colspan="2">Palette 1 (BL = 1)</th>
</tr>
<tr>
<th>Pixel Value</th>
<th>Color</th>
</tr>
<tr>
<td>0</td>
<td>Current background color</td>
</tr>
<tr>
<td>1</td>
<td>Cyan</td>
</tr>
<tr>
<td>2</td>
<td>Magenta</td>
</tr>
<tr>
<td>3</td>
<td>White</td>
</tr>
</tbody>
</table>
</div>

##### Interrupt 10H Service 12 : Write pixel
Writes a pixel dot of a specified color at a specified screen coordinate.

<b>Input:</b><br>
AH = 0ch<br>
AL = Pixel color<br>
CX = Horizontal position of pixel<br>
DX = Vertical position of pixel<br>
BH = Display page number (graphics modes with more than 1 page)

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th colspan="2">Legal values</th>
</tr>
<tr>
<th>Mode</th>
<th>CX (Horizontal)</th>
<th>DX (Vertical)</th>
<th>AL (Pixel Color)</th>
<th>BH (Page Number)</th>
</tr>
<tr>
<td>04h</td>
<td>0-319</td>
<td>0-199</td>
<td>0-3</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>05h</td>
<td>0-319</td>
<td>0-199</td>
<td>0-3</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>06h</td>
<td>0-639</td>
<td>0-199</td>
<td>0-1</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>0Dh</td>
<td>0-319</td>
<td>0-199</td>
<td>0-15</td>
<td>0-7</td>
</tr>
<tr>
<td>0Eh</td>
<td>0-639</td>
<td>0-199</td>
<td>0-15</td>
<td>0-3</td>
</tr>
<tr>
<td>0Fh</td>
<td>0-639</td>
<td>0-349</td>
<td>0-1</td>
<td>0-1</td>
</tr>
<tr>
<td>10h</td>
<td>0-639</td>
<td>0-349</td>
<td>0-15</td>
<td>0-1</td>
</tr>
</tbody>
</table>
</div>

If the pixel color (AL) is specified with bit 7 set, the color bits of the pixel are XORed with the color bits of the
current pixel at the specified coordinate. You can use this feature to write characters and then erase them.

For mode 0dh through 10h, a page number needs to be supplied in BH.

##### Interrupt 10H Service 13 : Read pixel
Reports the color of the pixel at a specified screen coordinate.

<b>Input:</b><br>
AH = 0dh<br>
CX = Horizontal position of pixel<br>
DX = Vertical position of pixel<br>
BH = Display page number (graphics modes with more than 1 page)<br>

<b>Output:</b><br>
AL = Color of pixel

<b>Register destroyed:</b> AX, SP, BP, SI, DI

For mode 0dh through 10h, a page number needs to be supplied in BH.

##### Interrupt 10H Service 14 : Write character in Teletype (TTY) mode
Writes on character at the current cursor location and advances the cursor.

<b>Input:</b><br>
AH = 0eh<br>
AL = Character to write<br>
BL = Foreground color (graphics modes only)<br>
BH = Display page number (text modes only)

<b>Output:</b> none

In text modes, the character displayed retains the display attribute of the previous character that occupied the screen
location. In graphics modes, it is necessary to specify the foreground color (in BL) each time you call this service.

In text modes, characters may be written to display pages other than the active page.

This service responds to the ASCII meanings of characters 07h (bell), 08h (backspace), 0ah (line feed), and odh
(carriage return). All other ASCII values result in the displaying of a character, with the cursor moving one position.

If the cursor is at the end of a line, it wraps to the next line. If the cursor is at the end of the last screen line,
the screen is scrolled upward and the display attribute for the entire new line is taken from the last character from
the preceding line.

##### Interrupt 10H Service 15 : Get current video mode
Reports the current video mode, the number of character positions per line in that video mode, and the current display
page.

<b>Input:</b><br>
AH = 0fh

<b>Output:</b><br>
AL = Video mode<br>
AH = Number of character columns per line<br>
BH = Active display page number

<b>Register destroyed:</b> AX, SP, BP, SI, DI

##### Interrupt 10H Service 16 : Set palette registers
Sets the palette and overscan (border) registers on the PCjr and EGA.

<b>Input:</b><br>
AH = 10h<br>
AL = subservice

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Subservice</th>
<th>Description</th>
</tr>
<tr>
<td>0</td>
<td>Set palette register<br>
BL = Palette register<br>
BH = Value to set</td>
</tr>
<tr>
<td>1</td>
<td>Set overscan (border) color register<br>
BH = Value to set</td>
</tr>
<tr>
<td>2</td>
<td>Set palette registers and border register<br>
ES:DX = Pointer to color list</td>
</tr>
<tr>
<td>3</td>
<td>Toggle intensify / blinking bit<br>
BL = 0 (enable intensify)<br>
BH = 1 (enable blinking)</td>
</tr>
</table>
</div>

<b>Register destroyed:</b> AX, SP, BP, SI, DI

There are 16 palette registers on the EGA and PCjr displays and 1 overscan (border) register. This service gives the
user control over these registers. The four subservices are explained below

<b>Subservice 0 (Set Palette Register)</b>

Each of the 16 palette registerscan take on 1 of 64 values. The value in BH is formatted as follows
Bit 7 - reserved<br>
Bit 6 - reserved<br>
Bit 5 - secondary red<br>
Bit 4 - secondary green<br>
Bit 3 - secondary blue<br>
Bit 2 - red<br>
Bit 1 - green<br>
Bit 0 - blue

The secondary colors have an intensify of 1/3, while the normal colors have an intensify of 2/3. For example, BH = 02h
will produce green, BH = 10h will produce a dim green, and BH = 12h will produce a bright green.

The default values for the palette registers, which are the same as the Color Graphics Adapter (CGA), are defined below:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Palette Register</th>
<th>Color Value</th>
<th>Color</th>
</tr>
<tr>
<td>00h</td>
<td>00h</td>
<td>Black</td>
</tr>
<tr>
<td>01h</td>
<td>01h</td>
<td>Blue</td>
</tr>
<tr>
<td>02h</td>
<td>02h</td>
<td>Green</td>
</tr>
<tr>
<td>03h</td>
<td>03h</td>
<td>Cyan</td>
</tr>
<tr>
<td>04h</td>
<td>04h</td>
<td>Red</td>
</tr>
<tr>
<td>05h</td>
<td>05h</td>
<td>Magenta</td>
</tr>
<tr>
<td>06h</td>
<td>14h</td>
<td>Brown</td>
</tr>
<tr>
<td>07h</td>
<td>07h</td>
<td>White</td>
</tr>
<tr>
<td>08h</td>
<td>38h</td>
<td>Dark Gray</td>
</tr>
<tr>
<td>09h</td>
<td>39h</td>
<td>Light Blue</td>
</tr>
<tr>
<td>0ah</td>
<td>3ah</td>
<td>Light Green</td>
</tr>
<tr>
<td>0bh</td>
<td>3bh</td>
<td>Light Cyan</td>
</tr>
<tr>
<td>0ch</td>
<td>3ch</td>
<td>Light Red</td>
</tr>
<tr>
<td>0dh</td>
<td>3dh</td>
<td>Light Magenta</td>
</tr>
<tr>
<td>0eh</td>
<td>3eh</td>
<td>Yellow</td>
</tr>
<tr>
<td>0fh</td>
<td>3fh</td>
<td>Bright White</td>
</tr>
</table>
</div>

<b>Subservice 1 (Set Overscan (Border) Register)</b>

This subservice sets the border color. The Enhanced Color Display supports overscan in 200-line modes only.

<b>Subservice 2 (Set All Palette Registers and Overscan Register)</b>

ES:DX points to a 17-byte color list, in which the first 16 bytes consists of new values for the 16 palette registers
and the last byte is the new overscan register value.

<b>Subservice 3 (Toggle intensify / blinking bit)</b>

Normally bit 7 of the attribute byte is used to indicate foreground blinking. With this subservice, bit 7 can indicate
foreground blinking (BL = 1) or background intensify (BL = 0).

##### Interrupt 10H Service 17 : Character Generator
Changes font on the Enhanced Graphics Adapter (EGA) to predefined fonts or user-defined fonts in both text and graphics
modes.

<b>Input:</b><br>
AH = 11h<br>
AL = subservice

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th>Subservice</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>Load user-defined font (text modes)<br>
ES:BP = Pointer to font table<br>
CX = Character count<br>
DX = Table character offset<br>
BL = Font block to load (0-3)<br>
BH = Bytes per character</td>
</tr>
<tr>
<td>01h</td>
<td>Load 8 x 14 character font (monochrome set)<br>
BL = Font block to load (0-3)</td>
</tr>
<tr>
<td>02h</td>
<td>Load 8 x 8 double-dot character font (text modes)<br>
BL = Font block to load (0-3)</td>
</tr>
<tr>
<td>03h</td>
<td>Set the block specifier (text modes)<br>
BL = Bits 3, 2: Select block (0-3) to use when bit 3 of attribute byte is 1<br>
Bits 1, 0: Select block (0-3) to use when bit 3 of attribute byte is 0</td>
</tr>
<tr>
<td>10h</td>
<td>Load user-defined text font (text modes)<br>
BL = Bits 3, 2: Select block (0-3) to use when bit 3 of attribute byte is 1<br>
Bits 1, 0: Select block (0-3) to use when bit 3 of attribute byte is 0</td>
</tr>
<tr>
<td>11h</td>
<td>Load 8 x 14 character font (monochrome set) (text modes)<br>
BL = Font block to load (0-3)</td>
</tr>
<tr>
<td>12h</td>
<td>Load 8 x 8 double-dot character font (text modes)<br>
BL = Font block to load (0-3)</td>
</tr>
<tr>
<td>20h</td>
<td>Load user-defined 8 x 8 character font (graphics mode)<br>
ES:BP = Pointer to user graphics table for graphics characters 128-255. INT 1fh is set to this pointer</td>
</tr>
<tr>
<td>21h</td>
<td>Load user-defined character font (graphics mode)<br>
ES:BP = Pointer to user graphics table for graphics characters 0-128<br>
CX = Bytes per character<br>
BL = Number of rows<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : DL contains number of rows<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : 14 rows<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : 25 rows<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : 43 rows</td>
</tr>
<tr>
<td>22h</td>
<td>Load ROM 8 x 14 character font (Graphics mode)<br>
BL = Number of rows (Same format as subservice 21h)</td>
</tr>
<tr>
<td>23h</td>
<td>Load ROM 8 x 8 double-dot character font (Graphics mode)<br>
BL = Number of rows (Same format as subservice 21h)</td>
</tr>
<tr>
<td>30h</td>
<td>Return font information<br>
BH = Type of pointer to return<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : Current INT 1fh pointer<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : Current INT 44h pointer<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : ROM 8 x 14 font pointer<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : ROM 8 x 8 double-dot font pointer<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 04h : ROM 8 x 8 double-dot font pointer (top)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 05h : ROM text alternate 9 x 14 pointer</td>
</tr>
</tbody>
</table>
</div>

<b>Output:</b><br>
ES:BP = Pointer to table specified in BH<br>
CX = Scan lines per character<br>
DL = rows

Subservices 00h, 01h, and 02h perform a mode set, completely altering the video state but not clearing the display
buffer (the screen is not cleared).

Subservices 10h, 11h, and 12h are the same as 00h, 01h, and 02h, respectively, except for the following differences:
* subservices 10h, 11h, and 12h rely on page 0 as being the active page
* the number of bytes per character is recalculated
* the number of rows is recalculated
* the length of the regenerative buffer is recalculated
* five cursor control (CRTC) registers are reprogrammed

Subservices 10h-23h should only be called immediately after a mode set.

Subservice 03h (set the block specifier) lets you display two character sets at the same time, each from one block of
256 characters, thus allowing for a 512-character set. When a 512-character set is used, it is recommended that you set
the color planes with 8 consistent colors by executing service 10h, subservice 00h (AX=1000h) and setting BX = 0712h.

Each increment of 64k EGA memory allows another font block to be used. The default of 64k allows one font block, whereas
 an EGA memory of 256k allows up to four font block. Each block holds definitions for 256 characters.

When defining the character, set in graphics modes, a full set of 256 characters must be supplied (compare this with
character-set definitions in the text modes, where any number of characters -- up to 256 per block -- may be loaded).

Subservice 21h will load 256 character definitions. Video modes 4, 5, and 6 use only the first 128 characters. All other
 modes use all 256 characters.

##### Interrupt 10H Service 18 : Alternate select
Returns information on the Enhanced Display Adapter (EGA) and allows the selection of an alternative EGA print screen
routine.

<b>Input:</b><br>
AH = 12h<br>
AL = subservice<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10h : return EGA information<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 20h : select alternative EGA print screen routine

<b>Output:</b><br>
BH = Display mode in effect<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : Color mode (3Dxh address range)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : Monochrome mode (3Bxh address range)<br>
BL = EGA memory<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : 64k<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : 128k<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : 192k<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : 256k<br>
CH = Adapter bits<br>
CL = Switch setting

The value returned in CL (Switch setting)represents the DIP switch settings on the EGA. The adapter bits (CH) is defined
 as follows

<div style="overflow:auto;">
<pre>
7 6 5 4 3 2 1 0
x x x x . . . .     Unused
. . . . x x . .     Reserved
. . . . . . x .     FEAT1 (pin 17)
. . . . . . . x     FEAT0 (pin 19)</pre>
</div>

To print the screen contents when the number of rows changes, use subservice 20h (Set alternative print screen) to
install a print screen routine that will work correctly with the row change.

##### Interrupt 10H Service 19 : Write character string
Writes a string of characters with the specified attributes to any display page.

<b>Input:</b><br>
AH = 13h<br>
AL = Subservice (0-3)<br>
BH = Display page number<br>
BL = Attribute (subservice 0 and 1)<br>
CX = Length of string<br>
DH = Row position where string is to be written<br>
DL = Column position where string is to be written<br>
ES:SP = Pointer to string to write

<b>Output:</b> none

<b>Register destroyed:</b> AX, SP, BP, SI, DI

This service is available only for XTs dated 1/19/86 and later, ATs, EGAs, and PC Convertibles.

The service has four subservices, as follows:<br>
AL = 00h : Assign all characters the attribute in BL; do not update cursor<br>
AL = 01h : Assign all characters the attribute in BL; update cursor<br>
AL = 02h : Use attributes in string; do not update cursor<br>
AL = 03h : Use attributes in string; update cursor

In subservices 0 and 1, all characters in the string are written to the screen with the same attribute -- the attribute
specified in BL.

In subservices 2 and 3, the attribute byte for each character is found in the string itself. The string itself consists
of a character followed by its attribute, another character followed by its attribute, and so on. The string is copied
directly to the video buffer as is.

In subservices 0 and 2, the cursor position is not updated after the string is written.

In subservices 1 and 3, the cursor is moved to the first position following the last character in the string.

Like service 0eh, service 13h responds appropriately to ASCII 07h (bell), 08h (backspace), 10h (line feed), and 0dh
(carriage return). All other characters are printed.

##### Interrupt 10H Service 20 : LCD Handler
Allows the use of user-defined fonts and the mapping for the high-intensity attribute to a different attribute on an LCD
 display. This service is available only on the PC convertible.

<b>Input:</b><br>
AH = 14h<br>
AL = Subservice

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th>Subservice</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>Load user-specified font<br>
ES:BP = Pointer to font table<br>
CX = Number of characters to store (1 - 255)<br>
DX = Character offset into RAM font buffer<br>
BL = Font block to load<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : main font (block 0)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : alternate font (block 1)<br>
BH = Bytes per character (1 -255)</td>
</tr>
<tr>
<td>01h</td>
<td>Load system ROM default font block<br>
BL = Font block to load<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : main font (block 0)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : alternate font (block 1)</td>
</tr>
<tr>
<td>02h</td>
<td>Mapping of LCD high-intensity attribute<br>
BL = Mapping scheme<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : ignore high-intensity attribute<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : map high-intensity to reverse video<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : map high-intensity to underline<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : map high-intensity to select alternate font</td>
</tr>
</tbody>
</table>
</div>

<b>Output:</b> none

##### Interrupt 10H Service 21 : Return Physical Display Characteristics Convertible
Returns the alternate display adapter type and a table describing the characteristics of the current display. This
service is available only for the PC convertible.

<b>Input:</b><br>
AH = 15h

<b>Output:</b><br>
AX = Alternate display adapter type<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : no alternate adapter<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5140h : LCD<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5153h : CGA type display<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5151h : monochrome type display<br>
ES:DI = Pointer to 7-word current display adapter table

The format of the display adapter table is as follows:<br>
Word 1 : Display mode number<br>
Word 2 : Vertical PELs per meter<br>
Word 3 : Horizontal PELs per meter<br>
Word 4 : Total number of vertical PELs<br>
Word 5 : Total number of horizontal PELs<br>
Word 6 : Height of PEL in micrometers (vertical direction)<br>
Word 7 : Width of PEL in micrometers (horizontal direction)

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th colspan="5">PC Convertible Display Adapter Tables</th>
</tr>
<tr>
<th>Word</th>
<th>Monochrome</th>
<th>CGA</th>
<th>LCD (CGA)</th>
<th>LCD (Monochrome)</th>
</tr>
<tr>
<td>1</td>
<td>5151h</td>
<td>5153h</td>
<td>5140h</td>
<td>5140h</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0498h</td>
<td>08e1h</td>
<td>0</td>
</tr>
<tr>
<td>3</td>
<td>0</td>
<td>0a15h</td>
<td>0987h</td>
<td>0</td>
</tr>
<tr>
<td>4</td>
<td>0</td>
<td>00c8h</td>
<td>00c8h</td>
<td>0</td>
</tr>
<tr>
<td>5</td>
<td>0</td>
<td>0280h</td>
<td>0280h</td>
<td>0</td>
</tr>
<tr>
<td>6</td>
<td>0</td>
<td>0352h</td>
<td>0172h</td>
<td>0</td>
</tr>
<tr>
<td>7</td>
<td>0</td>
<td>0184h</td>
<td>0172h</td>
<td>0</td>
</tr>
</tbody>
</table>
</div>

Note that the PC Convertible Technical Reference Manual incorrectly documents words 6 and 7 for an LCD acting as a CGA. The correct values are listed above.

#### Interrupt 11H (<code>int 11h</code>) Read Equipment-List
Returns a list of installed equipment on the system.

<b>Input:</b> none

<b>Output:</b><br>
AX = Equipment code

<b>Equipment code (AX)</b>

<div style="overflow:auto;">
<pre>
F E D C B A 9 8  7 6 5 4 3 2 1 0
x x . . . . . .  . . . . . . . .  Number of printers installed
. . x . . . . .  . . . . . . . .  Internal modem installed
. . . x . . . .  . . . . . . . .  Game adapter installed? (always 1 on PCJr)
. . . . x x x .  . . . . . . . .  Number of RS-232 ports
. . . . . . . x  . . . . . . . .  Reserved
. . . . . . . .  x x . . . . . .  Number of diskettes - 1 (i.e. 0=1 disk)
. . . . . . . .  . . x x . . . .  Initial video mode (see below)
. . . . . . . .  . . . . x . . .  Reserved
. . . . . . . .  . . . . . x . .  Reserved
. . . . . . . .  . . . . . . x .  Math coprocessor installed?
. . . . . . . .  . . . . . . . x  1=diskettes present; 0=no disks present</pre>
</div>

The value returned in AX is the same as that stored at memory location 0:0410h, which is initialized during the power-up tests.

For the IBM PC, XT, and PCjr, bits 2 and 3 used to list the amount of RAM installed on the system board in increments of 16K. For example, 00 meant 16K, while 11 meant 64K.

Bit 0 indicates only whether the system has one or more diskette drives. Refer to bits 6 and 7 to find out how many diskettes are actually present. To determine the number of hard disks installed, use INT 13h, Service 8.

#### Interrupt 12H (<code>int 12h</code>) Report Memory Size
Reports the number of contiguous 1K memory blocks in the system (up to 640k).

<b>Input:</b> none

<b>Output:</b><br>
AX = Memory size (up to 640k)

The value returned in AX is the same as that stored at memory location 0:0413h, which is initialized during the power-up tests.

This is the amount of memory available to the entire system. This is not the amount of memory available to the user's program. Use INT 21h, Function 48h, to determine the amount of memory available to a user's program.

To determine the amount of memory above the 1024K address range, use INT 15h, Service 88h.

#### Interrupt 13H (<code>int 13h</code>) Disk I/O Services, Floppy and Hard Disks

#### Interrupt 13H Service 0 : Reset fixed disk / Diskette System
Resets the fixed disk or diskette controller and drive, forcing recalibration of the read/write head.

<b>Input:</b><br>
AH = 00h<br>
DL = Drive number

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error, cleared otherwise

If DL is greater than or equal to 80h, the floppy diskette controller is reset, and then the fixed disk controller is
reset. The status returned in AH in this case is the status of the fixed disk; to get the status of the floppy diskette
controller, examine memory location 0:441h.

If an error is reported by the disk BIOS routines, use this service to reset the floppy and/or fixed disk controllers
and retry the operation.

A fixed disk reset is executed only if the value in DL is less than or equal to the last fixed disk on the system. That
is, the lower 7 bits of DL should be less than or equal to the number of fixed disks.

For the AT, XT-286, and PC convertible, the BIOS executes int 15h, service 90h (Device busy), for the diskette (type =
01h) and the fixed disk (type = 00h) prior to waiting for the interrupt. Int 15h, service 91h (interrupt complete), is
executed upon completion. Also diskette operations that require the diskette motor to be on will call int 15h, service
90h (device busy), with the type equal to "diskette drive motor start" (type = fdh). This allows the system to perform
another task while the drive motor is waiting to get up to speed.

##### Interrupt 13H Service 1 : Get disk system status
Returns status information about the most recent fixed or floppy disk operation.

<b>Input:</b><br>
AH = 01h<br>
DL = Drive number

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error, cleared otherwise

<div style="overflow:auto;">
<table class="table table-bordered">
<tbody>
<tr>
<th colspan="2">Status of Operation (AH)</th>
</tr>
<tr>
<th>AH</th>
<th>Meaning</th>
</tr>
<tr>
<td>ffh</td>
<td>Sense operation failed (fixed)</td>
</tr>
<tr>
<td>e0h</td>
<td>Status error (fixed)</td>
</tr>
<tr>
<td>cch</td>
<td>Write fault (fixed)</td>
</tr>
<tr>
<td>bbh</td>
<td>Undefined error (fixed)</td>
</tr>
<tr>
<td>80h</td>
<td>Drive not ready</td>
</tr>
<tr>
<td>40h</td>
<td>Seek failure</td>
</tr>
<tr>
<td>20h</td>
<td>Controller failure</td>
</tr>
<tr>
<td>11h</td>
<td>ECC corrected data error (fixed)</td>
</tr>
<tr>
<td>10h</td>
<td>CRC or ECC data error</td>
</tr>
<tr>
<td>0fh</td>
<td>DMA arbitration out of range (fixed)</td>
</tr>
<tr>
<td>0eh</td>
<td>Control data address mark detected (fixed)</td>
</tr>
<tr>
<td>0dh</td>
<td>Invalid number sectors on format (fixed)</td>
</tr>
<tr>
<td>0ch</td>
<td>Media type not found (floppy)</td>
</tr>
<tr>
<td>0bh</td>
<td>Bad cylinder found (fixed)</td>
</tr>
<tr>
<td>0ah</td>
<td>Bad sector flag detected (fixed)</td>
</tr>
<tr>
<td>09h</td>
<td>Attempt to DMA across a 64k boundary</td>
</tr>
<tr>
<td>08h</td>
<td>DMA overrun</td>
</tr>
<tr>
<td>07h</td>
<td>Drive parameter activity failed (fixed)</td>
</tr>
<tr>
<td>06h</td>
<td>Diskette change line active (floppy)</td>
</tr>
<tr>
<td>05h</td>
<td>Reset failed (fixed)</td>
</tr>
<tr>
<td>04h</td>
<td>Sector not found</td>
</tr>
<tr>
<td>03h</td>
<td>Attempt to write on write-protected disk</td>
</tr>
<tr>
<td>02h</td>
<td>Address mark not found</td>
</tr>
<tr>
<td>01h</td>
<td>Invalid command</td>
</tr>
<tr>
<td>00h</td>
<td>No error</td>
</tr>
</tbody>
</table>
</div>

The most recent diskette operation status is found at 0:441h. The most recent fixed disk operation status is at 0:474h.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

##### Interrupt 13H Service 2 : Read sectors into memory
Reads one or more sectors from a fixed or floppy disk into memory.

<b>Input:</b><br>
AH = 02h<br>
AL = Number of sectors to read<br>
CH = Cylinder number (10 bit value, upper 2 bits in CL)<br>
CL = Starting sector number<br>
DH = Head number<br>
DL = Drive number<br>
ES:BX = Address of memory buffer

<b>Output:</b><br>
AH = Status of operation<br>
AL = Number of sectors read<br>
CF = Set if error, else cleared

Reads the specified number of sectors starting at the specified location (head, cylinder, and track) from a disk into a
buffer starting at ES:BX.

Value in DL less than 80h specify floppy disks; value greater than 80h specify fixed disks. For example, 0 means the
first floppy diskette, while 80h means the first fixed disk.

The cylinder number is ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the
remaining eight bits are in CH. The starting sector number fits in the low-order portion (lower 6 bits) of CL.

The value returned in AL (number of sectors read) may not give the correct number of sectors, even though no error has
occurred. Use the results of the carry flag and AH (status flag) to determine the status of the operation.

The sectors written must all be on the same cylinder and same side for diskettes, while a hard drive can write at most
128 sectors at one time.

If an error is encountered while reading a sector, use service 0 to reset the drive and retry the operation. It is
recommended that at least 3 retries be attempted before an error is signalled, since the error may have resulted from
the diskette motor not being up to speed.

Because the architecture of the DMA channel, an error will occur if the buffer in memory for the sectors overlaps a 64k
page boundary. A 64k page boundary is a memory which is one of the following (10000h, 20000h, 30000h, etc). Ensure that
no part of your buffer falls on such a boundary. If it does, create a new buffer or start the buffer just after the
boundary.

If an error 11h is returned, the data is good but the BIOS reports that is was corrected using the ECC error-correcting
algorithm. The error may not occur again if the information is written back out.

This service differs from the DOS int 25h (Read absolute sector) in that the DOS int 25h works with logical devices RAM
disks, bernoulli drives, etc). It is much more flexible. Also int 25h works with a linear address, whereas this service
works with 3 coordinates to address a disk location. int 25h doesn't have a DMA problem mentioned above, and there is no
 limit on the number of sectors that can be read in one operation. In addition, int 25h will do all the error-retry
 attempts itself. int 25h should be used instead of this service for obtaining absolute sector control. Programs that
 may need to use this service rather than int 25h include partition manipulators, system software, and disk cache
 software.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

##### Interrupt 13H Service 3 : Write sectors from memory
Writes one or more sectors from a memory to a fixed or floppy disk.

<b>Input:</b><br>
AH = 03h<br>
AL = Number of sectors to write<br>
CH = Cylinder number (10 bit value, upper 2 bits in CL)<br>
CL = Starting sector number<br>
DH = Head number<br>
DL = Drive number<br>
ES:BX = Address of memory buffer

<b>Output:</b><br>
AH = Status of operation<br>
AL = Number of sectors written<br>
CF = Set if error, else cleared

Writes the specified number of sectors from the buffer at ES:BX to the specified location (head, cylinder, and track) on
 the disk.

Value in DL less than 80h specify floppy disks; value greater than 80h specify fixed disks. For example, 0 means the
first floppy diskette, while 80h means the first fixed disk.

The cylinder number is ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the
remaining eight bits are in CH. The starting sector number fits in the low-order portion (lower 6 bits) of CL.

The value returned in AL (number of sectors read) may not give the correct number of sectors, even though no error has
occurred. Use the results of the carry flag and AH (status flag) to determine the status of the operation.

The sectors read must all be on the same cylinder and same side for diskettes, while a hard drive can read at most 128
sectors at one time.

If an error is encountered while writing a sector, use service 0 to reset the drive and retry the operation. It is
recommended that at least 3 retries be attempted before an error is signalled, since the error may have resulted from
the diskette motor not being up to speed.

Because the architecture of the DMA channel, an error will occur if the buffer in memory for the sectors overlaps a 64k
page boundary. A 64k page boundary is a memory which is one of the following (10000h, 20000h, 30000h, etc). Ensure that
no part of your buffer falls on such a boundary. If it does, create a new buffer or start the buffer just after the
boundary.

This service differs from the DOS int 26h (write absolute sector) in that the DOS int 26h works with logical devices
(RAM disks, Bernoulli Drives, etc). It is much more flexible. Also int 26h works with a linear address, whereas this
service works with 3 coordinates to address a disk location. int 26h doesn't have a DMA problem mentioned above, and
there is no limit on the number of sectors that can be written in a single operation. In addition, int 26h will do all
of the error-retry attempts itself. int 26h should be used instead of this service for obtaining absolute sector control
. Programs that may need to use this service rather than int 26h include partition table modifiers, system software, and
 disk cache software.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

##### Interrupt 13H Service 4 : Verify sectors
Verifies one or more fixed disk or diskette sectors.

<b>Input:</b><br>
AH = 04h<br>
AL = Number of sectors to verify<br>
CH = Cylinder number (10 bit value, upper 2 bits in CL)<br>
CL = Starting sector number<br>
DH = Head number<br>
DL = Drive number<br>
ES:BX = Address of memory buffer

<b>Output:</b><br>
AH = Status of operation<br>
AL = Number of sectors verified<br>
CF = Set if error, else cleared

Verifies the specified number of sectors starting at the specified location (head, cylinder, and track) on the disk. The
 verification process consists of checking that the sector can be found and read (checking address field) and that the
 Cyclic Redundancy Check (CRC) is correct. No memory area is needed for this operation.

Value in DL less than 80h specify floppy disks; value greater than 80h specify fixed disks. For example, 0 means the
first floppy diskette, while 80h means the first fixed disk.

The cylinder number is ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the
remaining eight bits are in CH. The starting sector number fits in the low-order portion (lower 6 bits) of CL.

The value returned in AL (number of sectors read) may not give the correct number of sectors, even though no error has
occurred. Use the results of the carry flag and AH (status flag) to determine the status of the operation.

The sectors verified must all be on the same cylinder and same side for diskettes, while a hard drive can verify up to
255 sectors at one time.

If an error is encountered while verifying a sector, use service 0 to reset the drive and retry the operation. It is
recommended that at least 3 retries be attempted before an error is signalled, since the error may have resulted from
the diskette motor not being up to speed.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

##### Interrupt 13H Service 5 : Format Cylinder
Initializes each sector on a specified cylinder with sector address and size information.

<b>Input:</b><br>
AH = 04h<br>
AL = Number of sectors to format (diskette) or Interleave (XT)<br>
CH = Cylinder number (10 bit value, upper 2 bits in CL)<br>
DH = Head number<br>
DL = Drive number<br>
ES:BX = Pointer to address field list

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error, else cleared

Values in DL less than 80h specify floppy disks; Values from 80h to 87h specify fixed disks.

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the remaining eight bits are in CH. The starting sector number fits in the low-order portion (lower 6 bits) of CL.

If an error is encountered, use Service 0h to reset the drive and retry the operation.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

"Interleaving" is the process of putting logically contiguous sectors in physically noncontiguous locations, in order to to increase disk performance. Below is outlined the different ways of changing the interleave factor depending on the type of media (fixed disk or diskette) and the machine type.

The pointer to the address field list (ES:BX) varies depending on what type of machine and type of disk (fixed or diskette) the formatting process will occur on. Also the interleave factor is specified differently for the different machines and disk types. Below are the formats for the different types of machines and disks.

ES:BX points to a list of address marks for each sector on the track to be formatted. Each address mark consists of 4
bytes. Therefore, to format a 9-sector track, the list must consist of 36 bytes (4 * 9). The 4 bytes making up the
address mark are defined as follows:<br>
Byte 1 : Cylinder number (C)<br>
Byte 2 : Head number (H)<br>
Byte 3 : Sector number (R), or record number<br>
Byte 4 : Sector size (N)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : 128 bytes per sector<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : 256 bytes per sector<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : 512 bytes per sector<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : 1024 bytes per sector

Standard MS-DOS diskettes are formatted with 512 bytes per sector (n = 2) and with no interleave. Thus, the address
field list for a standard MS-DOS nine-sector track would look like this

<div style="overflow:auto;">
<pre>C H R N    C H R N    C H R N ... C H R N
0 1 1 2    0 1 2 2    0 1 3 2     0 1 9 2</pre>
</div>

Before formatting a diskette, if there is more than one type of diskette supported by the drive, you will need to call
service 71h (set DASD type for format) or service 18h (set media type for format). If these services are not called,
service 05h will format the disk using the maximum disk type supported by the disk drive. Older machines that don't
support service 17h (set DASD type for format) or service 18h (set media type for format) may have to directly modify
the Diskette drive parameter table. This table is pointed to by int 1eh. If modifications are made to the Diskette
Parameter Table, make sure the original values are restored.

The XT uses the AL register to specify the interleave factor. The pointer ES:BX is not needed for the XT.

These machines use an address table (pointed by ES:BX), similar to the one used in diskette mode but with a sight
variation. The buffer must be 512 bytes long. The first 2 * (sectors per track) bytes contain information for each
sector on the track. For each sector, there are 2 bytes in the table. These 2 bytes are defined as follows:<br>
Byte 1 : Sector format state (F)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : Good sector<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 80h : Bad sector<br>
Byte 2 : Sector number (N)

For example, the following table is used to format a track for a fixed disk with 17 sectors per track an interleave
factor of 3.

<div style="overflow:auto;">
<pre>db    00h, 01h, 00h, 07h, 00h, 0Dh, 00h, 02h, 00h, 08h, 00h, 0Eh
db    00h, 03h, 00h, 09h, 00h, 0Fh, 00h, 04h, 00h, 0Ah, 00h, 10h
db    00h, 05h, 00h, 0Bh, 00h, 11h, 00h, 06h, 00h, 0Ch</pre>
</div>

#### Interrupt 13H Service 6 : Format Track and set bad sector flags (fixed disk)
Initializes each sector on a specified cylinder with sector address and size information. Also marks the sectors on the
track as unusable (bad) by setting the bad sector flag in the ID fields. Only XTs may use this service.

<b>Input:</b><br>
AH = 06h<br>
AL = Interleave value<br>
CH = Cylinder number (10 bit value, upper 2 bits in CL)<br>
DH = Head number<br>
DL = Drive number

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error, else cleared

This service will destroy all previous contents of the disk.

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the remaining eight bits are in CH.

If an error is encountered, use Service 0h to reset the drive and retry the operation.

##### Interrupt 13H Service 7 : Format Disk Starting at cylinder (fixed disk)
Initializes each sector on a specified cylinder and all subsequent cylinders with sector address and size information.
Only XTs may use this service.

<b>Input:</b><br>
AH = 07h<br>
AL = Interleave value<br>
CH = Cylinder number (10 bit value, upper 2 bits in CL)<br>
DL = Drive number

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error, else cleared

This service will destroy all previous contents of the disk.

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the remaining eight bits are in CH.

If an error is encountered, use Service 0h to reset the drive and retry the operation.

##### Interrupt 13H Service 8 : Get current drive parameters (fixed disk)
Reports disk drive parameters, such as the number of heads, tracks, and sectors per track.

<b>Input:</b><br>
AH = 08h<br>
DL = Drive number

<b>Output:</b><br>
CH = Maximum value for cylinder (10-bit value; upper 2 bits in CL)<br>
CL = Maximum value for sector<br>
DH = Maximum value for heads

For fixed disks:<br>
AH = Status of operation<br>
DL = Number of fixed disks<br>
CF = Set if error; otherwise cleared

For Diskette:<br>
AX = 0<br>
BL = Bits 7 to 4 = 0<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bits 3 to 0 -- Valid drive type in CMOS<br>
BH = 0<br>
DL = Number of diskettes<br>
ES:DI = Pointer to 11-byte diskette drive parameter table

This service is available for diskettes on PC Convertibles, XT-286s, and ATs dated after 1/10/84. All machines support the fixed disk mode of this service.

Values in DL less than 80h specify diskettes; values greater than 80h specify fixed disks. For example, 0 means the first diskette, while 80h means the first fixed disk.

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the remaining eight bits are in CH. The starting sector number fits in the low-order portion (lower 6 bits) of CL.

If the drive is a fixed disk and there is an error, the Carry Flag will be set. If the drive number is invalid, AH will be equal to 7. And if no fixed disk drive is present or the fixed disk drive adapter is not installed, AH will be equal to 1.

If the drive is a diskette and there is an error, then:

If the drive type is known but 1) the CMOS is invalid, not present, 2) the battery is discharged, or 3) the CMOS checksum is invalid, then all registers will contain valid information, but BL will be 0.

If the drive type is not known or the requested drive is not installed, then BX, CX, DH, ES, and DI will all be 0. DL will contain the number of diskette drives.

<table class="table table-bordered">
<tr>
<th colspan="2">Valid Diskette Drive Types in CMOS</th>
</tr>
<tr>
<th>BL (bits 3-0)</th>
<th>Meaning</th>
</tr>
<tr>
<td>00h</td>
<td>Unknown drive type</td>
</tr>
<tr>
<td>01h</td>
<td>360K, 5.25 inch, 40 track</td>
</tr>
<tr>
<td>02h</td>
<td>1.2M, 5.25 inch, 80 track</td>
</tr>
<tr>
<td>03h</td>
<td>720K, 3.5 inch,  80 track</td>
</tr>
</table>

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

##### Interrupt 13H Service 9 : Initialize fixed disk tables (fixed disk)
Initializes a fixed disk using parameter tables.

<b>Input:</b><br>
AH = 09h<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error; otherwise cleared

The behavior of this service depends on the type of machine it is executed on:

<b>XT</b>

If the drive number is a legal value (80h <= DL <= 87h), then both drives 0 and 1 are initialized. INT 41h actually points to four tables. The table used for the drive number is determined by the setting of switches on the fixed disk drive adapter. If the initialization of drive 0 fails, drive 1 initialization is not attempted.

<b>AT and XT-286</b>

If DL is 80h, then drive 0 is initialized via INT 41h. If DL is 81h, then drive 1 is initialized  via INT 46h.

If an error is encountered, use Service 0h to reset the drive and retry the operation.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 10 : Read long
Reads one or more long sectors into memory from a fixed disk. A long sector is a sector of information plus 4 bytes
representing the ECC code for the sector. This service can be performed on fixed disks only.

<b>Input:</b><br>
AH = 0ah<br>
AL = Number of sectors to read (1-127)<br>
CH = Cylinder number (10-bit value; upper 2 bits in CL)<br>
CL = Starting sector number<br>
DH = Head number<br>
DL = Drive number<br>
ES:BX = Address of memory buffer

<b>Output:</b><br>
AH = Status of operation<br>
AL = Number of sectors read<br>
CF = Set if error; otherwise cleared

The service reads the specified number of long sectors starting at the specified location (head, cylinder, and track) from a fixed disk into a buffer starting at ES:BX.

This service is for diagnostics only. For a more generalized version of the read sector command, see service 02h, which
reads sectors for both diskettes and fixed disks. Also see INT 25h (DOS), which allows the reading of absolute sectors from any type of block device.

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7 and 6 of CL; the remaining eight bits are in CH. The starting sector number fits in the low-order portion (lower 6 bits) of CL.

The value returned in AL (number of sectors read) may not give the correct number of sectors, even though there no reading error has occurred. Use the results of the Carry flag and AH (status flag) to determine the status of the operation.

The number of sectors to read (AL) can be 127 sectors at most.

If an error is encountered while reading a sector, use Service 0h to reset the drive and retry the
operation. It is recommended that at least 3 retries be attempted before an error is signalled, since the
error may have resulted from the diskette motor not being up to speed.

Because of the architecture of the DMA channel, an error will occur if the buffer in memory for the
sectors overlaps a 64K page boundary. A 64K page boundary is a memory location which is one of the
following (10000h, 20000h, 30000h, etc.). Ensure that no part of your buffer falls on this boundary.
If it does, create a new buffer or start the buffer just after the boundary.

If an error 11h is returned, the data is good but the BIOS is reporting that it was corrected via the
ECC error-correcting algorithm. The error may not occur again if the information is written back out.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 11 : Write long
Writes one or more long sectors into memory from a fixed disk. A long sector is a sector of information plus 4 bytes
representing the ECC code for the sector. This service can be performed on fixed disks only.

<b>Input:</b><br>
AH = 0ah<br>
AL = Number of sectors to write (1-127)<br>
CH = Cylinder number (10-bit value; upper 2 bits in CL)<br>
CL = Starting sector number<br>
DH = Head number<br>
DL = Drive number<br>
ES:BX = Address of memory buffer

<b>Output:</b><br>
AH = Status of operation<br>
AL = Number of sectors written<br>
CF = Set if error; otherwise cleared

Writes the information at a memory buffer to the sectors starting at the specified location (head, cylinder, and track)

This service is for diagnostics only. For a more generalized version, see Service 03h, which writes
sectors for both diskettes and fixed disks. Also see INT 26h (DOS), which  allows the writing of absolute
sectors from any type of block device.

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7
and 6 of CL; the remaining eight bits are in CH. The starting sector number fits in the low-order portion
(lower 6 bits) of CL.

The value returned in AL (number of sectors written) may not give the correct number of sectors, even
though no writing error has occurred. Use the results of the Carry flag and AH (status flag) to
determine the status of the operation.

The number of sectors to write (AL) can be 127 sectors at most.

If an error is encountered while writing a sector, use Service 0h to reset the drive and retry the
operation. It is recommended that at least 3 retries be attempted before an error is signalled, since the
error may have resulted from the diskette motor not being up to speed.

Because of the architecture of the DMA channel, an error will occur if the buffer in memory for the
sectors overlaps a 64K page boundary. A 64K page boundary is a memory location which is one of the
following (10000h, 20000h, 30000h, etc.). Ensure that no part of your buffer falls on such a
boundary. If it does, then create a new buffer or start the buffer just after the boundary.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 12 : Seek to cylinder
Positions the read/write heads over a specified cylinder for a fixed disk. This service can be performed on fixed disks
only.

<b>Input:</b><br>
AH = 0ch<br>
CH = Cylinder number (10-bit value; upper 2 bits in CL)<br>
DH = Head number<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error; otherwise cleared

The cylinder number is a ten-bit quantity (0 through 1023). Its most significant two bits are in bits 7
and 6 of CL; the remaining eight bits are in CH. The starting sector number fits in the low-order portion
(lower 6 bits) of CL.

If an error is encountered, use Service 0h to reset the drive and retry the operation.

Even though the head value is not needed, you must supply a legal value--or else the seek will not be
performed and an error will be returned.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 13 : Alternate disk reset
Resets the fixed disk controller and drives, forcing recalibration of the read/write heads. This service can be
performed on fixed disks only.

<b>Input:</b><br>
AH = 0dh<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error; otherwise cleared

See Service 00h for a more generalized version of this service.

A fixed disk reset is only executed if the value in DL is less than or equal to the last fixed disk on
the system. That is, the lower 7 bits of DL should be less than or equal to the number of fixed disks.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 14, Service 15 : Reserved for diagnostics
<br>

##### Interrupt 13H Service 16 : Test for drive ready
Tests to see if the fixed drive is ready. This service can be performed on fixed disks only.

<b>Input:</b><br>
AH = 10h<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error; otherwise cleared

If the fixed disk drive is ready, then AH is 0 and the Carry Flag is clear.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 17 : Recalibrate drive
This service recalibrates a specified fixed disk to reset the seek speed. This service can be performed on fixed disks
only.

<b>Input:</b><br>
AH = 11h<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
AH = Status of operation<br>
CF = Set if error; otherwise cleared

This service is called by both Service 00h and Service 0Dh. Thus calling either of these services will accomplish the same as calling Service 11h.

This service sends the RECALIBRATE command to the disk controller, making the controller default to
its original state and place the read/write arm at track 0.

If an error is encountered, use Service 0h to reset the drive and retry the operation.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion.

##### Interrupt 13H Service 18, Service 19, Service 20 : Reserved for diagnostics
<br>

##### Interrupt 13H Service 21 : Read DASD type
Returns the type of interface associated with a drive and also the number of sectors the drive contains. Can be used to
determine if a diskette drive supports the sensing of a diskette change.

<b>Input:</b><br>
AH = 15h<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
CF = Set if error; otherwise cleared<br>
AH = Disk type<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status of operation if error<br>
CX:DX = If no error and AH <> 0, then 4-byte integer with number of sectors

This service is not available for PCs, PCjrs, and XTs dated before 1/10/86.

This service allows you to determine whether a drive supports the Change Line Status service (Service
16h). The Change Line Status informs the system whether or not a diskette has changed since the last
access to it.

Use Service 17h (Set DASD Type) to set the type.

<table class="table table-bordered">
<tr>
<th colspan="2">Disk Type</th>
</tr>
<tr>
<th>AH</th>
<th>Meaning</th>
</tr>
<tr>
<td>00h</td>
<td>Drive not present</td>
</tr>
<tr>
<td>01h</td>
<td>Diskette, no change line available</td>
</tr>
<tr>
<td>02h</td>
<td>Diskette, change line available</td>
</tr>
<tr>
<td>03h</td>
<td>Fixed Disk</td>
</tr>
</table>

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) and the fixed disk (Type = 00h) prior to waiting for the interrupt. INT 15h,
Service 91h (Interrupt Complete), is executed upon completion. Also diskette operations that require
the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to
"Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the
drive motor is waiting to get up to speed.

##### Interrupt 13H Service 22 : Change line status
This service reports whether or not a diskette has been changed (disk drive door opened) since the last disk access.
This service can be performed on diskettes only.

<b>Input:</b><br>
AH = 16h<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
CF = Set if error; otherwise cleared<br>
AH = Change line status

This service is not available for PCs, PCjrs, and XTs dated before 1/10/86.

Use Service 15h to determine if a drive supports change line detection.

If the Carry Flag is set and AH is 01h or 80h, then an error has occurred. If AH is 06h, the Carry Flag
will be set, but that does not signal an error; instead it means the "Diskette change" signal is active (as shown below).

<table class="table table-bordered">
<tr>
<th>Change</th>
<th>Line Status</th>
</tr>
<tr>
<th>AH</th>
<th>Meaning</th>
</tr>
<tr>
<td>00h</td>
<td>"Diskette change" signal not active</td>
</tr>
<tr>
<td>01h</td>
<td>Invalid diskette parameter (ERROR)</td>
</tr>
<tr>
<td>06h</td>
<td>"Diskette change" signal active</td>
</tr>
<tr>
<td>80h</td>
<td>Drive not ready (ERROR)</td>
</tr>
</table>

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt
Complete), is executed upon completion. Diskette operations that require the diskette motor to be on
will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type
= FDh). This allows the system to perform another task while the drive motor is waiting to get up to
speed.

##### Interrupt 13H Service 23 : Set DASD type for format
This service sets the type of diskette for a particular type of drive in order that the disk is properly formatted. This
 service can be performed on diskettes only.

<b>Input:</b><br>
AH = 17h<br>
AL = Diskette/drive combination<br>
DL = Drive number (Bit 7 must be set)

<b>Output:</b><br>
CF = Set if error; otherwise cleared<br>
AH = Status of operation (see service 01h)

<table class="table table-bordered">
<tr>
<th colspan="2">Diskette/Drive Combination</th>
</tr>
<tr>
<th>AL</th>
<th>Meaning</th>
</tr>
<tr>
<td>01h</td>
<td>Diskette 320/360K in 360K drive</td>
</tr>
<tr>
<td>02h</td>
<td>Diskette 360K in 1.2M drive</td>
</tr>
<tr>
<td>03h</td>
<td>Diskette 1.2M in 1.2M drive</td>
</tr>
<tr>
<td>04h</td>
<td>Diskette 720K in 720K drive</td>
</tr>
</table>

This service is not available for PCs, PCjrs, and XTs dated before 1/10/86.

A diskette/drive combination value of 04h is not valid for ATs before 6/10/85.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the
diskette (Type = 01h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt
Complete), is executed upon completion. Diskette operations that require the diskette motor to be on
will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type
= FDh). This allows the system to perform another task while the drive motor is waiting to get up to
speed.

##### Interrupt 13H Service 24 : Set media type for format
This service returns a Diskette Drive Parameter Table (DDPT) for a specified diskette drive. This service can be
performed on diskettes only.

<b>Input:</b><br>
AH = 18h<br>
CH = Number of tracks (10-bit value; upper 2 bits in CL)<br>
CL = Sectors per track<br>
DL = Drive number (Bit 7 must be clear)

<b>Output:</b><br>
CF = Set if error; otherwise cleared<br>
AH = Status of operation (see service 01h)<br>
ES:DI = Pointer to 11-byte Diskette Drive Parameter Table

This service is not available for PCs, PCjrs, XTs dated before 1/10/86, and ATs dated before 11/15/85.

Machines that support this service call it before calling Service 05h (Format a Track).

For each supported media type, there is one Diskette Drive Parameter Table (DDPT).

In the event that the Change Status line is active (i.e., that a disk change has occurred), this service first attempts to deactivate the Change Status line (by properly recognizing the new diskette). If unable to do so, the service returns an error. Therefore, if no diskette is present in the drive, an error will be returned.

For the AT, XT-286, and PC Convertible, the BIOS executes INT 15h, Service 90h (Device Busy), for the diskette (Type = 01h) prior to waiting for the interrupt. INT 15h, Service 91h (Interrupt Complete), is executed upon completion. Diskette operations that require the diskette motor to be on will call INT 15h, Service 90 (Device Busy), with the type equal to "Diskette Drive Motor Start" (Type = FDh). This allows the system to perform another task while the drive motor is waiting to get up to speed.

#### Interrupt 14H (<code>int 14h</code>) Serial I/O Services (Communication Ports)

##### Interrupt 14H Service 0 : Initialize serial port parameters
Initializes the baud rate, parity, stop-bit, and word length parameters for a serial port, and returns the status for
the port.

<b>Input:</b><br>
AH = 00h<br>
AL = Communication parameters<br>
DX = Serial port number (0 - COM1, 1 - COM2, etc)

<b>Output:</b><br>
AX = Line and modem status (see status 03h)

<div style="overflow:auto;">
<pre><b>           Baud rate           Parity           Stop bits      Word Length</b>
<b>Bit:</b>       <u>7 6 5</u><u>               </u><u>4 3</u><u>              </u><u>2</u><u>              </u><u>1 0</u>
           0 0 0    110        0 0  None        0  One         1 0  7 bits
           0 0 1    150        0 1  Odd         1  Two         1 1  8 bits
           0 1 0    300        1 0  None
           0 1 1    600        1 1  Even
           1 0 0  1,200
           1 0 1  2,400
           1 1 0  4,800
           1 1 1  9,600</pre>
</div>

##### Interrupt 14H Service 1 : Send one character
Sends one character to the specified serial port.

<b>Input:</b><br>
AH = 01h<br>
AL = Character<br>
DX = Serial port number (0 - COM1, 1 - COM2, etc)

<b>Output:</b><br>
AH = Line status (see status 03h)

If an error occurs, bit 7 of AH will be set. Since bit 7 is used as a general error flag, this service is unable to
identify a time-out error. For complete diagnostic information, use service 03h (get serial port status).

##### Interrupt 14H Service 2 : Receive one character
Receives one character to the specified serial port.

<b>Input:</b><br>
AH = 02h<br>
DX = Serial port number (0 - COM1, 1 - COM2, etc)

<b>Output:</b><br>
AL = Character<br>
AH = Line status (see status 03h)

This service waits for a character. If no character is available or an error occurs, no character is returned and bit 7
of AH is set.

If an error occurs, bit 7 of AH will be set. Since bit 7 is used as a general error flag, this service is unable to
identify a time-out error. For complete diagnostic information, use service 03h (get serial port status).

##### Interrupt 14H Service 3 : Get serial port status
Returns line status and modem status information for a specified serial port.

<b>Input:</b><br>
AH = 03h<br>
DX = Serial port number (0 - COM1, 1 - COM2, etc)

<b>Output:</b><br>
AX = Line and Modem status (see below)

Status information is returned to AX, as follows

<b>AH (Line status)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
1 . . . . . . .       Time-out error
. 1 . . . . . .       Transfer shift register empty
. . 1 . . . . .       Transfer holding register empty
. . . 1 . . . .       Break-detect error
. . . . 1 . . .       Framing error
. . . . . 1 . .       Parity error
. . . . . . 1 .       Overrun error
. . . . . . . 1       Data ready</pre>
</div>

<b>AL (Modem status)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
1 . . . . . . .       Received line signal detect
. 1 . . . . . .       Ring indicator
. . 1 . . . . .       Data set ready
. . . 1 . . . .       Clear to send
. . . . 1 . . .       Change in receive line signal detected
. . . . . 1 . .       Trailing edge ring detector
. . . . . . 1 .       Change in data set ready
. . . . . . . 1       Change in clear to send</pre>
</div>

If bit 7 of the Line status byte (AH) is set, then the rest of the bits in AH and AL are unpredictable.

Early versions of the ROM-BIOS for the original PC had a programming error that would cause "time-out" errors to be reported as "transfer shift register empty" and "break-detect" errors. This has been corrected in all other versions of the ROM-BIOS.

#### Interrupt 15H (<code>int 15h</code>) Cassette and extended service

##### Interrupt 15H Service 0 : Turn cassette motor on (PC, PCjr only)

<b>Input:</b><br>
AH = 00h

<b>Output:</b> none

All programs using the cassette must actually turn on the device before use. There is a noticeable delay between turn-on
 and device ready. A noticeable clicking noise can be heard by switching the cassette on and off.

##### Interrupt 15H Service 1 : Turn cassette motor off (PC, PCjr only)

<b>Input:</b><br>
AH = 01h

<b>Output:</b> none

All programs using the cassette should turn off the device after use. A noticeable clicking noise can be heard by switching the cassette on and off.

##### Interrupt 15H Service 2 : Read blocks from cassette (PC, PCjr only)

<b>Input:</b><br>
AH = 02h<br>
CX = Count of bytes to read<br>
ES:BX = Pointer to data buffer

<b>Output:</b><br>
AH = Error code if CF = 1<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : if CRC error<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : data transition lost (bit signal scrambled)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : no data found on tape<br>
DX = Count of bytes actually read

Data is transferred in 256 byte blocks, though only the number of bytes requested are actually stored.

##### Interrupt 15H Service 3 : Write blocks from cassette (PC, PCjr only)

<b>Input:</b><br>
AH = 03h<br>
CX = Count of bytes to write<br>
ES:BX = Pointer to data buffer

<b>Output:</b><br>
CX = 0

Data is actually written in 256 byte blocks. If CX is less than 256, then the block is padded. No error detection/correction is available for writing.

##### Interrupt 15H Service 64 : Read/Modify Profiles
Read or modify the system or modem parameters (PC convertible only).

<b>Input:</b><br>
AH = 40h<br>
AL = Subservice

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Subservice</th>
<th>Description</th>
</tr>
<tr>
<td>0</td>
<td>return system profile in CX, BX</td>
</tr>
<tr>
<td>1</td>
<td>modify system profile (CX,BX = profile info)</td>
</tr>
<tr>
<td>2</td>
<td>return internal modem profile in BX</td>
</tr>
<tr>
<td>3</td>
<td>modify internal modem profile (BX = profile info)</td>
</tr>
</table>
</div>

<b>Output:</b><br>
CF = Set if error, else cleared<br>
AL = 0 if successful, else non-0<br>
BX = returned System Profile for subservice 0 and Modem Profile for subservice 2<br>
CX = returned System Profile for Subservice 0

<b>System Profile info in BX</b>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>Bit 15</td>
<td>0  - Set system cold start mode<br>
    1* - Set system warm start mode</td>
</tr>
<tr>
<td>Bit 14</td>
<td>0  - Disable low battery warning message<br>
    1* - Enable low battery warning message</td>
</tr>
<tr>
<td>Bits 13,12</td>
<td>Startup video mode<br>
 00  - Reserved<br>
 01  - 40 x 25 monochrome using CGA/LCD<br>
 10* - 80 x 25 monochrome using CGA/LCD<br>
 11  - 80 x 25 monochrome using MONO/LCD</td>
</tr>
<tr>
<td>Bits 11,10</td>
<td>LCD bright attribute<br>
 00* - Ignore LCD bright attribute<br>
 01  - Map LCD bright to underscore<br>
 10  - Map LCD bright to reverse video<br>
 11  - Map LCD bright to alternate font</td>
</tr>
<tr>
<td>Bit 9</td>
<td>0* - Internal modem not available on battery power<br>
    1  - Internal modem available on battery power</td>
</tr>
<tr>
<td>Bit 8</td>
<td>0* - RS-232/Parallel available on battery power<br>
    1  - RS-232/Parallel available on battery power</td>
</tr>
<tr>
<td>Bits 7-0 (BL)</td>
<td>Reserved</td>
</tr>
</table>
</div>

<b>System Profile info in CX</b>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>Bits 15-8 (CH)</td>
<td>Time before LCD will blank on lack of keyboard activity.<br>
Time is in minutes. A 0 disables this feature.</td>
</tr>
<tr>
<td>Bits 7-0 (CL)</td>
<td>Time before system power off on lack of keyboard activity.<br>
Time is in minutes. A 0 disables this feature.</td>
</tr>
</table>
</div>

<b>Modem Profile info in BX</b>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>Bits 15,14</td>
<td>Reserved</td>
</tr>
<tr>
<td>Bit  13</td>
<td>0* - Manual Answer<br>
    1  - Automatic Answer</td>
</tr>
<tr>
<td>Bits 12-10</td>
<td>Parity and framing<br>
000  - Mark, 7-bit data<br>
001  - Space, 7-bit data<br>
010  - Odd, 7-bit data<br>
011* - Even, 7-bit data<br>
100 - None, 8-bit data<br>
101 - Reserved<br>
110 - Reserved<br>
111 - Reserved</td>
</tr>
<tr>
<td>Bits 9,8</td>
<td>Modem data rate<br>
00  - 110 bits per second<br>
01  - 300 bits per second<br>
10* - 1200 bits per second<br>
11 -- 2400 bits per second</td>
</tr>
<tr>
<td>Bits 7-0 (BL)</td>
<td>Reserved</td>
</tr>
</table>
</div>

&#42; signals the default setting after power loss

##### Interrupt 15H Service 65 : Wait for External Event
This service waits for a specified status change after an external event. The external event can be an interrupt or the
DMA controller. While waiting for the specific status, the system clocks are stopped in order to conserve battery power.
 This service is available only for the PC convertible.

<b>Input:</b><br>
AH = 41h<br>
AL = Event type code<br>
BH = Condition compare or mask value<br>
BL = Time-out (in units of 55 ms); 0 means no time-out<br>
ES:DI = Pointer to user byte for event determination (if AL is 01h-04h)<br>
DX = I/O port address for event determination (if AL is 11h-14h)

<b>Output:</b><br>
CF = 0 if external event occured; 1 if time-out

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Event Type Code (AL)</th>
</tr>
<tr>
<td>00h</td>
<td>Return after after any event ahs occurred</td>
</tr>
<tr>
<td>01h</td>
<td>Compare value, return if equal</td>
</tr>
<tr>
<td>02h</td>
<td>Compare value, return if not equal</td>
</tr>
<tr>
<td>03h</td>
<td>Test bit; return if non-0</td>
</tr>
<tr>
<td>04h</td>
<td>Test bit; return if 0</td>
</tr>
</table>
</div>

Event Type Codes 11h-14h are the same as 01h-04h, except the event determination is coming from the I/O port address in
DX, instead of the user byte specified by ES:DI.

If the event type is 01h-02h or 11h-12h then the byte signalling the event determination is compared (using the CMP
instruction) against BH. If the event type is 03h-04h or 13h-14h then the byte signalling the event determination is
tested (using the TEST instruction) against BH.

This service is available only for the PC Convertible.

##### Interrupt 15H Service 66 : Request system power off
The system is power off. The next time the system is turned on, control can be returned to the instruction following
this power-off call. (PC Convertible only)

<b>Input:</b><br>
AH = 42h<br>
AL = Event type code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : use profile for resume mode state<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : resume mode no matter what

<b>Output:</b><br>
CF = set if error else cleared<br>
AH = modified

Control is returned immediately if this service is not available. If it is available, then power is turned off. The next time the system is turned on, if the event type code (AL) is 1 or the System Profile (see Service 40h) has warm start mode set, the machine will start right where it left off, executing the program that generated this service.

This service is available only for the PC Convertible.

Before the system is powered down, the diskette motors are turned off.

##### Interrupt 15H Service 67 : Read System Status
Reports the status of the system for the PC convertible.

<b>Input:</b><br>
AH = 43h

<b>Output:</b><br>
CF = set if error else cleared<br>
AH = modified<br>
AL = Status (see below)

<b>Status (AL)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
1 . . . . . . .       Low battery
. 1 . . . . . .       Operating on external power source
. . 1 . . . . .       Standby power lost
. . . 1 . . . .       Power activated by real-time clock alarm
. . . . 1 . . .       Internal modem power-on
. . . . . 1 . .       Serial/parallel power-on
. . . . . . 1 .       Reserved
. . . . . . . 1       LCD not attached</pre>
</div>

This service is available only for the PC Convertible.

If the standby power is lost (bit 5 is on), then the real-time clock time will be incorrect.

See INT 1Ah, Service 08h, for power-on using the real-time clock alarm.

##### Interrupt 15H Service 68 : Activate/Deactivate Modem Power
Activates or deactivates the PC Convertible internal modem.

<b>Input:</b><br>
AH = 44h<br>
AL = Modem power state<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : turn internal modem power off<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : turn internal modem power on

<b>Output:</b><br>
CF = set if error else cleared<br>
AL = 0 if successful, else non-0

This service is available only for the PC Convertible.

If the internal modem power is turned on (AL = 01h), it is initialized to the current settings found in the modem profile. See Service 40h for more information on the modem profile.

##### Interrupt 15H Service 79 : Keyboard Intercept
Called by the keyboard hardware handler (int 09h), allowing the replacement or removal of a key.

<b>Input:</b><br>
AH = 4fh<br>
AL = Scan code

<b>Output:</b><br>
CF = set if error else cleared<br>
AL = New scan code if changed, else original scan code

Upon entry to this service, AL will contain the scan code of the keystroke. If the user wishes to change the scan code,
put the new scan code in AL and set the Carry Flag. If the scan code is to remain the same, then leave AL alone and set the Carry Flag. The user can remove or ignore the keystroke by returning with the Carry Flag clear.

This service is not available for the PC, PCjr, XT dated 11/08/82, and the AT dated 1/10/84.

By writing a handler for this service, the user can change the meaning of a key. The operating system normally will return the scan code unchanged (that is, it will leave AL alone and return with the Carry Flag set).

To determine the machines that support this feature, see Service C0h (Return System Configuration).

##### Interrupt 15H Service 128 : Device Open
Provides an interface to open a device with a specific process.

<b>Input:</b><br>
AH = 80h<br>
BX = Device ID<br>
CX = Process ID

<b>Output:</b><br>
CF = set if service not supported else cleared

The PC, PCjr, and the XT dated 11/08/82 do not support this service.

This interface is supported for multi-tasking environments, where more than one process (or task)
may be executing in the system. Usually the operating system will supply the handler for this
service; this way, the operating system can keep track of which processes are using each device on the system.

The operating system will use this service to initiate the use of a device by a process.

##### Interrupt 15H Service 129 : Device Close
Provides an interface to close a device with a specific process.

<b>Input:</b><br>
AH = 81h<br>
BX = Device ID<br>
CX = Process ID

<b>Output:</b><br>
CF = set if service not supported else cleared

The PC, PCjr, and the XT dated 11/08/82 do not support this service.

This interface is supported for multi-tasking environments, where more than one process (or task)
may be executing in the system. Usually the operating system will supply the handler for this
service; this way, the operating system can keep track of which processes are using each device on the system.

The operating system will use this service to initiate the use of a device by a process.

##### Interrupt 15H Service 130 : Device Program Termination
Provides an interface to discontinue the use of a device by all processes currently using the device.

<b>Input:</b><br>
AH = 82h<br>
BX = Device ID

<b>Output:</b><br>
CF = set if service not supported else cleared

The PC, PCjr, and the XT dated 11/08/82 do not support this service.

This interface is supported for multi-tasking environments, where more than one process (or task)
may be executing in the system. Usually the operating system will supply the handler for this
service; this way, the operating system can keep track of which process is using each device on the
system.

The operating system will use this service to discontinue the use of a device by all processes
currently using the device.

##### Interrupt 15H Service 131 : Event Wait
Modifies a byte in the user's memory after a specified time interval. Control is transferred to the caller immediately
after this service is called.

<b>Input:</b><br>
AH = 83h<br>
AL = Subservice<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : set interval<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : cancel set interval

<b>Output:</b><br>
CF = set if service not supported else cleared

After this service is called, control is returned immediately to the caller. This service does not work by delaying and
then returning control to the user, but returns control immediately; the user must
periodically look at the byte specified (pointed to by ES:BX) to determine when the interval has elapsed.

The PC, PCjr, and the XT dated 11/08/82 do not support this service. The AT dated 1/10/84 is only
able to set the interval; thus the value in AL is not used.

The byte is posted by setting the high bit (bit 7). To test the end of the interval, make sure the high
bit of the byte is clear before calling Subservice 0 (Set Interval).

The real-time clock is used to count the number of microseconds.

The granularity of the time is 976 microseconds.

CX is the high-order word of the count. For example, if CX is 98h and DX is 9680h, then a 10-second delay
would be specified.

##### Interrupt 15H Service 132 : Joystick Support
Reads the current joystick switch settings or reports the current joystick resistive inputs.;

<b>Input:</b><br>
AH = 84h<br>
AL = Subservice<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : read current switch settings<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : read resistive inputs

<b>Output:</b><br>
CF = set if error else cleared<br>
If DX = 00h (Read current switch settings):<br>
AL = Bits 7 to 4 contain switch settings<br>
If DX = 01h (Read resistive inputs):<br>
AX = A(x) value<br>
BX = A(y) value<br>
CX = B(x) value<br>
DX = B(y) value

This service is available only for the AT, XT dated after 11/08/82, and XT-286.

##### Interrupt 15H Service 133 : System Request Pressed
Provides an interface for special processing of the Sys Req key.

<b>Input:</b><br>
AH = 85h<br>
AL = Subservice<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : system request key Make (pressed)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : system request key Break (released)

<b>Output:</b><br>
CF = set if service not supported else cleared

By default, this service does nothing but clear the Carry Flag. It is up to the operating system or user to provide a handler to process the Sys Req key. This service is called by INT 09h (Keyboard) after the Sys Req key has been pressed ("made") or released ("broken").

The PC, PCjr, and the XT dated 11/08/82 do not support this service.

Currently there is no standard use for the System Request key. Future operating systems will probably use it to switch
between tasks.


##### Interrupt 15H Service 134 : Wait
Waits a specified number of microseconds before returning control to the caller.

<b>Input:</b><br>
AH = 86h<br>
CX:DX = Number of microseconds to elapse

<b>Output:</b><br>
CF = set if error or wait in progress, else cleared

This service is not available for the PC, PCjr, and the XT.

The real-time clock is used to count the number of microseconds.

The granularity of the time is 976 microseconds.

CX is the high-order word of the count. For example, if CX is 98h and DX is 9680h, a 10-second delay would be specified.

##### Interrupt 15H Service 135 : Move Block
Provides the ability for a real mode program to move a block of data to or from the area above 1 megabyte in the
protected mode.

<b>Input:</b><br>
AH = 87h<br>
CX = Size in words of block to move (maximum 8000h = 32k)<br>
ES:SI = Pointer to a global description table (GDT) (see below)

<b>Output:</b><br>
CF = set if error, else cleared<br>
ZF = Cleared if error else set<br>
AH = Status of operation<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : successful<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : memory parity error<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : exception interrupt error occurred<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : Get address line 20h failed

This service is available only for the AT and XT-286.

ES:SI points to a list of 6 descriptors. Each descriptor is 8 bytes long. A descriptor is formatted as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Bytes</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>2</td>
<td>Word containing segment limit</td>
</tr>
<tr>
<td>02h</td>
<td>2</td>
<td>Low word of 24-bit address</td>
</tr>
<tr>
<td>04h</td>
<td>1</td>
<td>High byte of 24-bit address</td>
</tr>
<tr>
<td>05h</td>
<td>1</td>
<td>Access rights byte</td>
</tr>
<tr>
<td>06h</td>
<td>2</td>
<td>Reserved (must be 0)</td>
</tr>
</table>
</div>

The Global Descriptor Table (GDT) pointed to by ES:SI consists of a list of 6 descriptors. The descriptors are defined below, appearing in the same order as they appear in memory.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Bytes</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>8</td>
<td>Dummy Descriptor. Initialized by user to 0.</td>
</tr>
<tr>
<td>08h</td>
<td>8</td>
<td>Descriptor of this GDT. Initialized by user to 0. Modified by BIOS.</td>
</tr>
<tr>
<td>10h</td>
<td>8</td>
<td>Descriptor of Source block. Initialized by user.</td>
</tr>
<tr>
<td>18h</td>
<td>8</td>
<td>Descriptor of Destination block. Initialized by user.</td>
</tr>
<tr>
<td>20h</td>
<td>8</td>
<td>Descriptor for Protected Mode Code Segment. Initialized by user to 0. Modified by BIOS.</td>
</tr>
<tr>
<td>28h</td>
<td>8</td>
<td>Descriptor for Protected Mode Stack Segment. Initialized by user to 0. Modified by BIOS.</td>
</tr>
</table>
</div>

Therefore, for a block move to be performed, only the third and fourth descriptors need to contain
values other than 0s. The source and target descriptor fields should be initialized as follows:
*  The segment limit field (offset 00h) must contain 2 * (CX - 1) or greater.
*  The 24-bit address field (offset 02h) must contain the source or destination address.
*  The Access Rights byte (offset 05h) must contain 93h
(CPL0-R/W).

Transfers of large blocks of data may result in lost interrupts, since no interrupts are allowed during the move.

##### Interrupt 15H Service 136 : Get Extended Memory Size
Reports amount of memory above 1024k.

<b>Input:</b><br>
AH = 88h

<b>Output:</b><br>
CF = set if error, else cleared<br>
AX = Number of 1k blocks above 1024k

This service is available only for the AT and XT-286.

The amount of memory returned by this service is stored in the CMOS battery. It is determined and set during power-on.

For the memory above the 1024K range to be usable, the planar memory (memory on the system board) must be fully populated. The memory above the 1024K range is often called "extended" memory.

##### Interrupt 15H Service 137 : Switch to Protected Mode
Switches into Protected (virtual address) mode. Also transfers control to the code segment in the protected mode
specified by user.

<b>Input:</b><br>
AH = 89h<br>
BH = Index into Interrupt Descriptor Table (IDT) stating start of first 8 hardware interrupts (Interrupt Level 1)<br>
BL = Index into Interrupt Descriptor Table (IDT) stating start of first 8 hardware interrupts (Interrupt Level 2)<br>
ES:SI = Pointer to the Global Descriptor Table (GDT) (see below)

<b>Output:</b><br>
AH = 0 if successful, else nonzero

<b>Register Destroyed:</b> AX, BP, and all segment registers

This service is available only for the AT and XT-286.

ES:SI points to a list of eight descriptors. Each descriptor is 8 bytes long. A descriptor is formatted as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Bytes</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>2</td>
<td>Word containing segment limit</td>
</tr>
<tr>
<td>02h</td>
<td>2</td>
<td>Low word of 24-bit address</td>
</tr>
<tr>
<td>04h</td>
<td>1</td>
<td>High byte of 24-bit address</td>
</tr>
<tr>
<td>05h</td>
<td>1</td>
<td>Access rights byte</td>
</tr>
<tr>
<td>06h</td>
<td>2</td>
<td>Reserved (must be 0)</td>
</tr>
</table>
</div>

The Global Descriptor Table (GDT) pointed to by ES:SI consists of a list of 6 descriptors. The descriptors are defined below, appearing in the same order as they appear in memory.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Bytes</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>8</td>
<td>Dummy Descriptor. Initialized by user to 0.</td>
</tr>
<tr>
<td>08h</td>
<td>8</td>
<td>Descriptor of this GDT. Initialized by user to 0. Modified by BIOS.</td>
</tr>
<tr>
<td>10h</td>
<td>8</td>
<td>Descriptor of Source block. Initialized by user.</td>
</tr>
<tr>
<td>18h</td>
<td>8</td>
<td>Descriptor of Destination block. Initialized by user.</td>
</tr>
<tr>
<td>20h</td>
<td>8</td>
<td>Descriptor for Protected Mode Code Segment. Initialized by user to 0. Modified by BIOS.</td>
</tr>
<tr>
<td>28h</td>
<td>8</td>
<td>Descriptor for Protected Mode Stack Segment. Initialized by user to 0. Modified by BIOS.</td>
</tr>
</table>
</div>

The six descriptors that must be initialized by the user must have the segment limit, base address, and access rights byte fields initialized.

The BIOS is not available to the user; thus the user must perform all I/O.

The user must initialize an exception handler and table.

There can't be any overlap between the Interrupt Descriptor Table (IDT) and the Real Mode BIOS Interrupt Descriptor
Table (IDT).

Because of to the 80286's reserved areas, the user must move the interrupt vector locations.

Reinitialization of the hardware interrupt controllers is needed in order to define those locations that do not exist in the 80286 reserved areas.

##### Interrupt 15H Service 138 : Device Busy
This service is called to notify the system that a device is waiting to be serviced.

<b>Input:</b><br>
AH = 90h<br>
AL = Device type (see below)

<b>Output:</b><br>
CF = 0 if wait not satisfied; 1 if minimum wait time satisfied

This service is not available for the PC, PCjr, and XT dated 11/08/82.

The device types are classified into three generalized groups. These groups are:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>00h - 7Fh</td>
<td>Serially reusable devices.</td>
</tr>
<tr>
<td>80h - BFh</td>
<td>Reentrant devices. ES:BX is used to differentiate calls.</td>
</tr>
<tr>
<td>C0h - FFh</td>
<td>Devices that are time-out only with no posting.</td>
</tr>
</table>
</div>

The defined device types are listed below:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Device Type (AL)</th>
<th>Device</th>
<th>Time-Out</th>
</tr>
<tr>
<td>00h</td>
<td>Fixed disk</td>
<td>Yes</td>
</tr>
<tr>
<td>01h</td>
<td>Diskette</td>
<td>Yes</td>
</tr>
<tr>
<td>02h</td>
<td>Keyboard</td>
<td>No</td>
</tr>
<tr>
<td>03h</td>
<td>Pointing Device</td>
<td>Yes</td>
</tr>
<tr>
<td>80h</td>
<td>Network (ES:BX, pointer to Network Control Block)</td>
<td>No</td>
</tr>
<tr>
<td>fdh</td>
<td>Diskette drive motor start</td>
<td>Yes</td>
</tr>
<tr>
<td>feh</td>
<td>Printer</td>
<td>Yes</td>
</tr>
</table>
</div>

When a device is needed by a process, but access to it is delayed, the system can perform another task
to achieve maximum performance until the device is freed up for the process to use. In a multi-tasking
environment, that is the purpose for this service. The operating system can keep track of which process
is waiting for which device, and perform another task while the device is busy. See Service 91h for a
service that signals that a device is ready for a process.

##### Interrupt 15H Service 192 : Return System Configuration
Reports the machine model number, sub-model number, BIOS revision level, and other hardware-specific attributes.

<b>Input:</b><br>
AH = c0h

<b>Output:</b><br>
CF = set if error, else cleared<br>
AH = 0<br>
ES:BX = Pointer to a System Descriptor Table

This service is not available for the PC, PCjr, XT dated 11/08/82, and the AT dated 1/10/84. Use the
return state of AH to determine if the service is returning valid information.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="3">System Descriptor Table</th>
</tr>
<tr>
<th>Description</th>
<th>Length (Byte)</th>
<th>Value</th>
</tr>
<tr>
<td>Table Length</td>
<td>1</td>
<td>8</td>
</tr>
<tr>
<td>System model number</td>
<td>1</td>
<td>?</td>
</tr>
<tr>
<td>Sub-model number</td>
<td>1</td>
<td>?</td>
</tr>
<tr>
<td>BIOS revision level</td>
<td>1</td>
<td>?</td>
</tr>
<tr>
<td>Feature information</td>
<td>1</td>
<td>?</td>
</tr>
<tr>
<td>Reserved</td>
<td>4</td>
<td>0</td>
</tr>
</table>
</div>

<b>Feature Information</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
x . . . . . . .     Fixed Disk BIOS uses DMA channel 3
. x . . . . . .     2nd interrupt chip present
. . x . . . . .     Real-time clock present
. . . x . . . .     Keyboard intercept called in INT 09h
. . . . x . . .     Wait for external event supported
. . . . . x . .     Reserved
. . . . . . x .     Reserved
. . . . . . . x     Reserved</pre>
</div>

The XT dated 1/10/86 has a bug in its Feature Information. It incorrectly states that the second
interrupt chip is present (bit 6 is set) and that the fixed disk BIOS doesn't use DMA channel 3 (bit 7
is clear). Both of these are incorrect. To test for this condition, if the model number is FBh and the
BIOS level is 1, then ASSUME that the Fixed disk BIOS does use DMA channel 3 and the second interrupt
chip is not present.

Programs using the DMA channel 3 presence must also be aware that other adapters may be using this
channel, such as the IBM Network Adapter, which will not be reflected in the Feature Information byte.

See INT 15h, Service 4Fh, for more information on Keyboard intercept (bit 4 of the Feature Information
byte) and see INT 09h for more information of the hardware keyboard interrupt.

See INT 15h, Service 41h, for more information on the Wait for External Event (bit 3 of the Feature
Information byte).

#### Interrupt 16h (<code>int 16h</code>) Keyboard I/O Services

##### Interrupt 16h Service 0 : Keyboard read
Returns the next character in the keyboard buffer; if no character is available, this service waits until one is
available.

<b>Input:</b><br>
AH = 00h

<b>Output:</b><br>
AL = ASCII character code<br>
AH = Scan code

The scan codes are the number representing the location of the key on the keyboard. As new keys have been added and the
keybboard layout rearranged, this numbering scheme has not been consistent with its original purpose.

If the character is a special character, then AL will be 0 and the value of in AH will be extended scan code for the key.

Use the scan codes to differentiate between keys representing the same ASCII code, such as the plus key across the top of the keyboard and the gray plus key.

After the character has been removed from the keyboard buffer, the keyboard buffer start pointer (at 0:041Ah) is increased by 2. If the start pointer is beyond the end of the buffer, the start pointer is reset to the start of the keyboard buffer.

If no character is available at the keyboard, then the AT, XT-286, and PC Convertible issue an INT 15h, Service 90h (Device Busy), for the keyboard, informing the operating system that there is a keyboard loop taking place and thereby allowing the operating system to perform another task.

After every character is typed, the AT, XT-286, and PC Convertible issue an INT 15h, Service 91h (Interrupt Complete). This allows the operating system to switch back to a task that is waiting for a character at the keyboard.

See Service 10h for an equivalent service that supports the enhanced (101/102-key) keyboard.

##### Interrupt 16h Service 1 : Keyboard Status
Checks to see if a character is available in the buffer.

<b>Input:</b><br>
AH = 01h

<b>Output:</b><br>
ZF = 0, if character is available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1, if character is not available<br>
AL = ASCII character code (if character is available)<br>
AH = Scan code (if character is available)

If a character is available, the Zero Flag is cleared and AX contains the ASCII value in AL and the scan code in AH. The character is not removed from the buffer. Use Service 00h to remove the character from the buffer. See Service 00h for a complete description of the meaning of AX if a character is available.

This service is excellent for clearing the keyboard or allowing a program to be interruptable by a specific key sequence.

See Service 11h for an equivalent service that supports the enhanced (101/102-key) keyboard.

##### Interrupt 16h Service 2 : Get shift status
Returns the current keyboard shift status.

<b>Input:</b><br>
AH = 02h

<b>Output:</b><br>
AL = Shift status

<b>Shift Status (AL)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
1 . . . . . . .      Insert locked
. 1 . . . . . .      Caps Lock locked
. . 1 . . . . .      Num Lock locked
. . . 1 . . . .      Scroll Lock locked
. . . . 1 . . .      Alt key is pressed
. . . . . 1 . .      Ctrl key is pressed
. . . . . . 1 .      Left Shift key is pressed
. . . . . . . 1      Right Shift key is pressed</pre>
</div>

This shift status byte is obtained from the byte at memory location 0:0417h.

See Service 12h to obtain the shift status for the enhanced (101/102-key) keyboard.

##### Interrupt 16h Service 3 : Set typematic rate
Sets the typematic rate and delay of the keyboard.

<b>Input:</b><br>
AH = 03h<br>
AL = Subservice<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 : return to default keyboard state<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : increase initial delay<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : slow typematic rate by 1/2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : perform subservices 1 and 2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : turns off typematic characters<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : set typematic rate and delay<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BL = Typematic rate (see below)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BH = Delay value (see below)

<b>Output:</b> none

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Typematic Rate in Characters per Second (BL)</th>
</tr>
<tr>
<th>BL</th>
<th>Rate</th>
</tr>
<tr>
<td>00h</td>
<td>30.0</td>
</tr>
<tr>
<td>01h</td>
<td>26.7</td>
</tr>
<tr>
<td>02h</td>
<td>24.0</td>
</tr>
<tr>
<td>03h</td>
<td>21.8</td>
</tr>
<tr>
<td>04h</td>
<td>20.0</td>
</tr>
<tr>
<td>05h</td>
<td>18.5</td>
</tr>
<tr>
<td>06h</td>
<td>17.1</td>
</tr>
<tr>
<td>07h</td>
<td>16.0</td>
</tr>
<tr>
<td>08h</td>
<td>15.0</td>
</tr>
<tr>
<td>09h</td>
<td>13.3</td>
</tr>
<tr>
<td>0ah</td>
<td>12.0</td>
</tr>
<tr>
<td>0bh</td>
<td>10.9</td>
</tr>
<tr>
<td>0ch</td>
<td>10.0</td>
</tr>
<tr>
<td>0dh</td>
<td>9.2</td>
</tr>
<tr>
<td>0eh</td>
<td>8.6</td>
</tr>
<tr>
<td>0fh</td>
<td>8.0</td>
</tr>
<tr>
<td>10h</td>
<td>7.5</td>
</tr>
<tr>
<td>11h</td>
<td>6.7</td>
</tr>
<tr>
<td>12h</td>
<td>6.0</td>
</tr>
<tr>
<td>13h</td>
<td>5.5</td>
</tr>
<tr>
<td>14h</td>
<td>5.0</td>
</tr>
<tr>
<td>15h</td>
<td>4.6</td>
</tr>
<tr>
<td>16h</td>
<td>4.3</td>
</tr>
<tr>
<td>17h</td>
<td>4.0</td>
</tr>
<tr>
<td>18h</td>
<td>3.7</td>
</tr>
<tr>
<td>19h</td>
<td>3.3</td>
</tr>
<tr>
<td>1ah</td>
<td>3.0</td>
</tr>
<tr>
<td>1bh</td>
<td>2.7</td>
</tr>
<tr>
<td>1ch</td>
<td>2.5</td>
</tr>
<tr>
<td>1dh</td>
<td>2.3</td>
</tr>
<tr>
<td>1eh</td>
<td>2.1</td>
</tr>
<tr>
<td>1fh</td>
<td>2.0</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Delay Value in Milliseconds (BH)</th>
</tr>
<tr>
<th>BH</th>
<th>Delay</th>
</tr>
<tr>
<td>0</td>
<td>250</td>
</tr>
<tr>
<td>1</td>
<td>500</td>
</tr>
<tr>
<td>2</td>
<td>750</td>
</tr>
<tr>
<td>3</td>
<td>1000</td>
</tr>
</table>
</div>

Subservices 0 through 4 are available only for the PCjr. Subservice 5 is available only for ATs dated 11/15/85 and after, and for XT-286s.

Subservice 0 (Return to Default Keyboard State) restores the keyboard to its original state. The original state at power-on is typematic on, normal initial delay and normal typematic rate.

Subservice 1 (Increase Initial Delay) increases the delay between the first character typed and the burst of typematic
characters.

For Subservices 0 through 4, each time the typematic rate is changed, all previous states are removed. For example, if you want to increase the typematic delay and the rate is currently being slowed, use Subservice 3 (Perform Subservices 1 and 2) rather than Subservice 1 (Increase Initial Delay) by itself.

##### Interrupt 16h Service 4 : Adjust keyboard click
Turns keyboard click on or off.

<b>Input:</b><br>
AH = 04h<br>
AL = 0 : turn keyboard click off<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : turn keyboard click on

<b>Output:</b> none

This service is available only on the PCjr and the PC Convertible.

##### Interrupt 16h Service 5 : Keyboard write
Puts a scan code/character code combination in the keyboard buffer.

<b>Input:</b><br>
AH = 05h<br>
CH = Scan code<br>
CL = ASCII character code

<b>Output:</b><br>
AL = 00h : operation successful<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01 : Buffer full

This service is available only for ATs dated 11/15/85 and after, and XT 286s.

This service "fools" a program into thinking that keys have come from the keyboard. A good example of this would be the operation needed by a program that implements keyboard macros.

For a description and list of scan codes, see "Scan Codes."

##### Interrupt 16h Service 16 : Extended Keyboard read
Returns the next character in the keyboard buffer; if no character is available, this service waits until one is available. This service is provided to support the enhanced (101/102-key) keyboard.

<b>Input:</b><br>
AH = 10h

<b>Output:</b><br>
AL = ASCII character code<br>
AH = Scan code

This service is supported only on the AT dated 11/15/85 and after, PC XT dated 1/10/86 and after, and XT-286.

The scan codes are the numbers representing the location of the key on the keyboard. As new keys have been added and the keyboard layout rearranged, this numbering scheme has not been consistent with its original purpose. See the list of scan codes.

If the character is a special character, AL will be 0 and the value in AH will be the extended scan code for the key. See the list of scan codes.

Use the scan codes to differentiate between keys representing the same ASCII code, such as the plus key across the top of the keyboard and the gray plus key.

After the character has been removed from the keyboard buffer, the keyboard buffer start pointer (at 0:041Ah) is increased by 2. If the start pointer is beyond the end of the buffer, the start pointer is reset to the start of the keyboard buffer.

If no character is available at the keyboard, an INT 15h, Service 90h (Device Busy), will be issued for the keyboard,
informing the operating system that there is a keyboard loop taking place and thereby allowing the operating system to perform another
task.

After every character is typed, an INT 15h, Service 91h (Interrupt Complete), is issued. This allows the operating system to switch back to a task that is waiting for a character at the keyboard.

See Service 00h for an equivalent service that works with all keyboards, not supporting the new keys on the enhanced (101/102-key) keyboard.

##### Interrupt 16h Service 17 : Extended Keyboard status
Checks to see if a character is available in the buffer. This service is provided to support the extended keyboard (101/102-key keyboard).

<b>Input:</b><br>
AH = 11h

<b>Output:</b><br>
ZF = 0, if character is available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1, if character is not available<br>
AX = If character is available, then set to character as in service 10h

This service is supported only on the AT dated 11/15/85 and after, the XT dated 1/10/86 and after, and the XT-286.

If a character is available, the Zero Flag is cleared and AX contains the ASCII value in AL and the scan code in AH. The character is not removed from the buffer. Use Service 10h to remove the character from the buffer. See Service 10h for a complete description of the meaning of AX if a character is available.

This service is excellent for clearing the keyboard or allowing a program to be interruptable by a specific key sequence.

See Service 01h for an equivalent service that works with all keyboards, not supporting the new keys on the enhanced (101/102-key) keyboard.

##### Interrupt 16h Service 18 : Get Extended Keyboard status
Returns the current keyboard shift status. This service is provided to support the enhanced (101/102-key) keyboard.

<b>Input:</b><br>
AH = 12h

<b>Output:</b><br>
AL = Shift status<br>
AH = Extended shift status

<b>Shift Status (AL)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
1 . . . . . . .      Insert locked
. 1 . . . . . .      Caps Lock locked
. . 1 . . . . .      Num Lock locked
. . . 1 . . . .      Scroll Lock locked
. . . . 1 . . .      Alt key is pressed
. . . . . 1 . .      Ctrl key is pressed
. . . . . . 1 .      Left Shift key is pressed
. . . . . . . 1      Right Shift key is pressed</pre>
</div>

<b>Extended Shift Status (AH)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
1 . . . . . . .      Sys Req key is pressed
. 1 . . . . . .      Caps Lock key is pressed
. . 1 . . . . .      Num Lock key is pressed
. . . 1 . . . .      Scroll Lock key is pressed
. . . . 1 . . .      Right Alt key is pressed
. . . . . 1 . .      Right Ctrl key is is pressed
. . . . . . 1 .      Left Alt key is pressed
. . . . . . . 1      Left Ctrl key is pressed</pre>
</div>

This service is supported only on the AT dated 11/15/85 and after, the XT dated 1/10/86 and after, and the XT-286.

The shift status byte return in AL is obtained from the byte at memory location 0:0417h. Note that this is the same value that is returned by Service 02h.

Note that the Extended Shift Status (value returned in AH) reports if keys are being pressed, not locked.

See Service 02h for an equivalent service that works with all keyboards, not supporting the new keys on the enhanced (101/102-key) keyboard.

#### Interrupt 17h (<code>int 17h</code>) Printer I/O Service

##### Interrupt 17h Service 0 : Send one byte to printer
Sends one character to the specified parallel printer and returns the current status of the printer.

<b>Input:</b><br>
AH = 00h<br>
AL = Character to print<br>
DX = parallel printer number (0 - LPT1, 1 - LPT2, etc)

<b>Output:</b><br>
AH = Printer status (see service 02h)

For the AT, XT-286, and PC Convertible, INT 15h, Service 90h (Device Busy), is called when the printer is busy. This notifies the operating system that a time-out loop is going to begin.

##### Interrupt 17h Service 1 : Initialize printer
Sends initialization control codes to the specified parallel printer and returns the current status of the printer.

<b>Input:</b><br>
AH = 01h<br>
DX = parallel printer number (0 - LPT1, 1 - LPT2, etc)

<b>Output:</b><br>
AH = Printer status (see service 02h)

This service sends the hex values 08h and 0Ch to the printer's control port, thereby initializing the printer.

##### Interrupt 17h Service 2 : Get printer status
Returns status information about the specified parallel printer.

<b>Input:</b><br>
AH = 02h<br>
DX = parallel printer number (0 - LPT1, 1 - LPT2, etc)

<b>Output:</b><br>
AH = Printer status

<b>Printer Status (AH)</b>

<div style="overflow:auto;">
<pre>7 6 5 4 3 2 1 0
x . . . . . . .      Printer not busy (0=busy)
. x . . . . . .      Acknowledgement from printer
. . x . . . . .      Out of paper
. . . x . . . .      Printer selected
. . . . x . . .      I/O error
. . . . . 0 0 .      Not used
. . . . . . . x      Time-out error</pre>
</div>

##### Interrupt 18h (<code>int 18h</code>) Basic Loader Service
Activates Cassette BASIC.

This service transfers control to F600:0, which is the location in ROM of the standard BASIC interpreter. This interrupt works only on IBM computers. Compatibles do not have BASIC in ROM but must instead run a disk-based version of BASIC, usually known as GW-BASIC.

This interrupt is executed if the Power-On Self Test (POST) is unable to read the operating system off a floppy or fixed
 disk.

##### Interrupt 19h (<code>int 19h</code>) Bootstrap Loader Service
Attempts to load the sector at head 0, cylinder 0, sector 1, of a diskette or fixed disk into memory at 0:7C00h, and
transfer control there. This sector usually has an operating system bootstrap loader.

This interrupt attempts to load the sector at head 0, track 0, sector 1, on the first diskette into memory at 0:7C00h. If unable, it then attempts to load the sector at head 0, track 0, sector 1 of the first hard disk. If it is unable to load from either the diskette or the fixed disk, it calls INT 18h, which calls the ROM BASIC.

If INT 19h is successful, control is transferred to the first byte of the sector, which has been read in at memory
location 0:7C00h. That is, CS is set to 0 and IP is set to 7C00h.

This interrupt is not a substitute for a Ctrl-Alt-Del warm boot. This interrupt is the last action
performed by the Power-On Self Test (POST), which is activated by Ctrl-Alt-Del. If a user program
attempts to execute this interrupt directly, the machine may lock up.

To correctly reboot within an application program, jump to FFFF:0h in memory. That is, set CS to FFFF
and IP to 0. This is the same process that occurs when the machine is first powered on. Following
these steps will perform a "cold" boot. To perform a "warm" boot using this method, first set the word at
location 0:472h to 1234h. This will simulate the pressing of the Ctrl-Alt-Del.

A cold boot initializes all hardware, tests all hardware, tests RAM, then calls INT 19h to load the bootstrap loader. This process is performed when the computer is turned on or a hardware reset button is pressed.

A warm boot initializes and tests all hardware but does not test RAM. It then calls INT 19h to load the
bootstrap loader. This process is performed when Ctrl-Alt-Del is typed.

The sector read from the diskette will in turn read in the rest of the operating system. A fixed disk
will read in a Partition Table, which will then read in the correct operating system.

##### Interrupt 1Ah (<code>int 1ah</code>) System Timer and Clock Services

##### Interrupt 1Ah Service 0 : Read system-timer time counter
Reports the current time of day, and whether 24 hours has passed since 1) the last power-on, 2) the last system reset, or 3) the last system-timer time read or set.

<b>Input:</b><br>
AH = 00h

<b>Output:</b><br>
CX = High-order part of clock count<br>
DX = Low-order part of clock count<br>
AL = 0 if 24 hours has not passed; else 1

The following formulas convert the clock count to the time of day:

<p>Hour      = Clock / 65543 (1007h)<br>
Remainder = Clock MOD 65543</p>

<p>Minutes   = Remainder / 1092 (444h)<br>
Remainder = Remainder MOD 1092</p>

<p>Second    = Remainder / 18.21<br>
Remainder = Remainder MOD 18.21</p>

<p>Hundredths = CINT(Remainder * 100)</p>

The "system timer" (as distinguished from the real-time clock) is the timer that's set when the system is started. This time is temporary, lasting only as long as the system is turned on.

The clock count may also be read as a 4-byte integer at memory location 0:046C. This 4-byte value is equal to the 4-byte integer in CX:DX after Service 00h has been called.

After the call, the flag (at 0:0470h) stating whether 24 hours has passed or not, is cleared.

When TIME is typed at the command line, DOS gets the time by means of this service.

Counts occur at the rate of 18.2 per second.

##### Interrupt 1Ah Service 1 : Set system-timer time counter
Sets the current time of day.

<b>Input:</b><br>
AH = 01h<br>
CX = High-order part of clock count<br>
DX = Low-order part of clock count

<b>Output:</b> none

The following formula converts the time of day to a clock count:

Count = (Hout * 65543.33) + (Minutes * 1092.38) + (Seconds * 18.21) + (Hundreths * .182)

The "system timer" (as distinguished from the real-time clock) is the timer that's set when the system is started. This time is temporary, lasting only as long as the system is turned on.

The clock count may also be set as a 4-byte integer at memory location 0:046C. This 4-byte value will be set to the 4-byte integer in CX:DX after the call.

After the set, the flag (at 0:0470h) stating whether 24 hours has passed or not, is cleared.

When TIME is typed at the command line, DOS gets the time by means of this service. Setting a new time will call this
service.

Counts occur at the rate of 18.2 per second.

##### Interrupt 1Ah Service 2 : Read real-time clock time
Reads the time from the computer's real-time clock.

<b>Input:</b><br>
AH = 02h

<b>Output:</b><br>
CF = Set if clock not operating; else clared<br>
CH = Hours (BCD)<br>
CL = Minutes (BCD)<br>
DH = Seconds (BCD)<br>
DL = 1 if daylight saving time option; else 0

All times are in Binary Coded Decimal (BCD). For example, 9:04.12 am will be reported as CX = 0904; DH = 12.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for ATs, XT-286s, and PC Convertibles. Previous machines will report unpredictable results (including the state of the Carry Flag).

The daylight saving time option is not reported on ATs with dates prior to 6/10/85.

The information returned from this service could differ from the system time. This is because the real-time clock is read once upon system startup, updating the system timer. All other references to time use the system timer. If either the real-time clock is changed (via Service 03h) or the system timer is changed (via Service 01h), the other clock is not changed accordingly.

Even though the system uses the system timer for timing information, both the real-time clock and the system timer are updated continuously.

##### Interrupt 1Ah Service 3 : Set real-time clock time
Sets the time for the computer's real-time clock.

<b>Input:</b><br>
AH = 03h<br>
CH = Hours (BCD)<br>
CL = Minutes (BCD)<br>
DH = Seconds (BCD)<br>
DL = 1 if daylight saving time option; else 0

<b>Output:</b> none

All times are in Binary Coded Decimal (BCD). For example, 9:04.12 am would be set as CX = 0904; DH = 12.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used
so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for ATs, XT-286s, and PC Convertibles. Previous machines will report
unpredictable results (including the state of the Carry Flag).

Setting the real-time clock will not affect the system time. This is because the real-time clock is
read once upon system startup, updating the system timer. All other references to time use the system
timer. If either the real-time clock is changed (via this service) or the system timer is changed (via
Service 01h), the other clock is not changed accordingly.

Even though the system uses the system-timer for timing information, both the real-time clock and the system timer are updated continuously.

##### Interrupt 1Ah Service 4 : Read real-time clock date
Reads the date from the computer's real-time clock.

<b>Input:</b><br>
AH = 04h

<b>Output:</b><br>
CF = Set if clock not operating; else cleared<br>
CH = Century (19 or 20) (BCD)<br>
CL = Year (BCD)<br>
DH = Month (BCD)<br>
DL = Day (BCD)

All dates are in Binary Coded Decimal (BCD). For example, November 15, 1987 will be reported as CX = 1987; DX = 1115.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for ATs, XT-286s, and PC Convertibles. Previous machines will report unpredictable results (including the state of the Carry Flag).

The information returned from this service could differ from the system date. This is because the real-time clock is read once upon system startup, updating the system timer. All other references to date use the system timer. If either the real-time clock date is changed (via Service 05h) or the system timer is changed (via Service 01h), the other date is not changed accordingly.

Even though the system uses the system timer for date information, both the real-time clock and the system timer are updated continuously.

##### Interrupt 1Ah Service 5 : Set real-time clock date
Sets the date on the computer's real-time clock.

<b>Input:</b><br>
AH = 05h<br>
CH = Century (19 or 20) (BCD)<br>
CL = Year (BCD)<br>
DH = Month (BCD)<br>
DL = Day (BCD)

<b>Output:</b> none

All dates are in Binary Coded Decimal (BCD). For example, January 15, 1987 will be set as CX = 1987; DX = 0115.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for ATs, XT-286s, and PC Convertibles. Previous machines will report unpredictable results (including the state of the Carry Flag).

Setting the real-time clock date will not affect the system date. This is because the real-time clock is read once upon system startup, updating the system timer. All other references to date use the system timer. If either the real-time clock date is changed (via this service) or the system timer is changed (via Service 01h), the other date is not changed accordingly.

Even though the system uses the system timer for date information, both the real-time clock and the system timer are updated continuously.

##### Interrupt 1Ah Service 6 : Set real-time clock alarm
Sets the time at which the computer will issue an alarm by calling INT 4Ah.

<b>Input:</b><br>
AH = 06h<br>
CH = Hours (BCD)<br>
CL = Minutes (BCD)<br>
DH = Seconds (BCD)

<b>Output:</b><br>
CF = Set if clock not operating or alarm already set; else cleared

All dates are in Binary Coded Decimal (BCD). For example, June 1, 1985 will be set as CX = 1985; DX = 0601.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for ATs, XT-286s, and PC Convertibles. Previous machines will report unpredictable results (including the state of the Carry Flag).

After this service is executed, an INT 4Ah will be generated as soon as the hour, minute, and second specified match the
 time on the real-time clock date. It is up to the programmer to install an interrupt handler for INT 4Ah before calling this service

The alarm interrupt (INT 4Ah) will continue to occur every 24 hours at the specified time until it is reset via Service 07h (Reset Real-Time Clock Alarm). Only one alarm time can be active at a time.

Because the real-time clock is updated even if the computer is turned off, the alarm time set via this service will remain active even after the computer is turned off (of course, the alarm won't be generated while the computer is off).

Setting the real-time clock date will not affect the system date. This is because the real-time clock is read once upon system startup, updating the system timer. All other references to date use the system timer. If either the real-time clock date is changed (via Service 05h) or the system timer is changed (via Service 01h), the other date is not changed accordingly.

Even though the system is using the system timer for date information, both the real-time clock and the system timer are updated continuously.

##### Interrupt 1Ah Service 7 : Reset real-time clock alarm
Prevents the real-time clock alarm from occurring.

<b>Input:</b><br>
AH = 07h

<b>Output:</b> none

This service disables the alarm process. It does so by not executing an INT 4Ah at any time. See Service 06h (Set Real-Time Clock Alarm) to set the alarm.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used
so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for ATs, XT-286s, and PC Convertibles. Previous machines will report
unpredictable results (including the state of the Carry Flag).

##### Interrupt 1Ah Service 8 : Set clock-activated power-on mode
Sets the time at which the computer will issue an alarm by calling INT 4Ah.

<b>Input:</b><br>
AH = 08h<br>
CH = Hours (BCD)<br>
CL = Minutes (BCD)<br>
DH = Seconds (BCD)

<b>Output:</b><br>
CF = Set if clock not operating or alarm already set; else cleared

This service is available only for the PC Convertible. Previous machines will report unpredictable results (including the state of the Carry Flag). ATs, XT-286s, and the PS/2 family will set the Carry Flag, thus reporting an error state.

All dates are in Binary Coded Decimal (BCD). For example, June 1, 1985 will be set as CX = 1985; DX = 0601.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used so that, even while the computer is off, the date, time, and alarm time are maintained.

After this service is executed, the machine will automatically power on as soon as the hour, minute, and second specified match the time on the real-time clock date. If the system is already on, then INT 4Ah (User Alarm) will be executed.

If the system is on, the alarm interrupt (INT 4Ah) will continue to occur every 24 hours at the specified time until it is reset via Service 07h (Reset Real-Time Clock Alarm). Only one alarm time can be active at a time.

##### Interrupt 1Ah Service 9 : Read Clock alarm time and status
Reads the alarm time and status from the real-time clock.

<b>Input:</b><br>
AH = 09h

<b>Output:</b><br>
CF = Set if clock not operating; else cleared<br>
CH = Hours (BCD)<br>
CL = Minutes (BCD)<br>
DH = Seconds (BCD)<br>
DL = Alarm status<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : alarm not enabled<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : alarm enabled but will not power-on system<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : alarm enabled and will power-on system

Note that all dates are in Binary Coded Decimal (BCD). For example, June 1, 1985 will be set as CX = 1985; DX = 0601.

The real-time clock is the clock that runs even when the computer is turned off. A CMOS battery is used so that, even while the computer is off, the date, time, and alarm time are maintained.

This service is available only for the PC Convertible. ATs and XT-286s will set the Carry Flag, thus reporting an error state. Previous machines will report unpredictable results (including the state of the Carry Flag).

##### Interrupt 1Ah Service 10 : Read system-timer day counter
Returns the number of days since January 1, 1980 from the System Timer.

<b>Input:</b><br>
AH = 0ah

<b>Output:</b><br>
CF = Set if error; else cleared<br>
CX = Number of days since January 1, 1980

The system timer is the timer set when the system is started. This date is temporary, lasting only as long as the system
 is turned on.

This service is available only for XTs dated 1/10/86 and later. ATs and XT-286s will set the Carry Flag, thus reporting an error state. Previous machines will report unpredictable results (including the state of the Carry Flag).

##### Interrupt 1Ah Service 11 : Set system-timer day counter
Sets the number of days since January 1, 1980 for the System-Timer.

<b>Input:</b><br>
AH = 0bh

<b>Output:</b><br>
CF = Set if error; else cleared

The system timer is the timer set when the system is started. This date is temporary, lasting only as long as the system
 is turned on.

This service is available only for XTs dated 1/10/86 and later. ATs and XT-286s will set the Carry Flag,
thus reporting an error state. Previous machines will report unpredictable results (including the state of the Carry
Flag).

##### Interrupt 1Ah Service 128 : Set up sound multiplexer
Determines the source to be used for sound generation.

<b>Input:</b><br>
AH = 80h<br>
AL = Sound source<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : 8253 channel 2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : cassette input<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : "audio in" line on I/O channel<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : complex sound generator chip (TI 76496)

<b>Output:</b><br>
CF = Set if error; else cleared

This service is available only for the PCjr. ATs, XT-286s, and PC Convertibles will set the Carry
Flag, thus reporting an error state. Previous machines will report unpredictable results (including the state of the
Carry Flag).

On power-up, the default sound source is the 8253 programmable-timer chip, via channel 2.

##### Interrupt 1Bh (<code>int 1bh</code>) Keyboard Break
Called when a Control-Break key sequence is encountered.

When the machine is powered on, the interrupt handler for this interrupt just IRETs back to the caller. DOS, however,
installs a Ctrl-Break handler that sets an internal flag to signal that a keyboard Break condition has occurred.

DOS tests the state of the internal flag occasionally, depending on the state of the Control-Break Check (INT 21h, Function 33h). If the flag is on during a test, then the string "^C", followed by a Carriage-Return/ Line-Feed combination, is displayed on the screen, the DOS internal flag is reset, and INT 23h (Control-Break Exit Address) is called.

Note that INT 09h (Keyboard) sets the byte at 0:0471h to signal that a Control-Break key has been entered.

##### Interrupt 1Ch (<code>int 1ch</code>) User Timer Tick
Called at every timer tick (18.2 times per second, or every 55 ms) by INT 08h (System Timer).

By default, the interrupt handler for this interrupt IRETs back to the caller. The user can supply his own handler so he can attain control at every timer tick.

Note that this interrupt is called by the hardware timer interrupt (INT 08h), which has not signaled
the end of the interrupt back to the interrupt controller. Therefore, this routine is limited in
the actions it can take, since all interrupts will be disabled. A better approach to this problem is to
intercept INT 08h. The new INT 08h handler will first call the standard INT 08h, which will handle
the interrupt controller completion signals mentioned above. Then after the standard INT 08h is
completed, the new handler can do whatever it has to do at every timer tick.

##### Interrupt 4Ah (<code>int 4ah</code>) User Alarm
Called by the Real-Time Clock (RTC) interrupt handler when the real-time clock alarm conditions are meet.

By default, the interrupt handler for this interrupt IRETs to the caller. The user can supply a handler that will gain
control whenever the current time is equal to the alarm time. Make sure this interrupt handler is installed before using INT 1Ah, Service 06h, to set the real-time clock alarm.

This service is available only for the AT, XT-286, and PC Convertible.

The Real-Time Clock (RTC) interrupt handler is INT 70h for the AT and XT-286. The PC Convertible uses INT 08h (System
Timer).

##### Interrupt 70h (<code>int 70h</code>) Real-Time Clock
Handles the alarm and periodic interrupts for the real-time clock.

This is a hardware interrupt (IRQ 8) activated by the CMOS timer 1024 times per second.

This interrupt is available only on the AT and XT-286. The real-time clock on the PC Convertible generates an INT 02h (Non-Maskable Interrupt) to handle the periodic and alarm functions.

This interrupt provides two services. The first is the periodic interrupt that is generated when a time delay is specified. See INT 15h, Service 83h (Event Wait), and Service 86h (Wait), for more information. The second service is the Alarm Interrupt.
 When the CMOS alarm time matches the current CMOS time, then INT 4Ah (User Alarm) is executed.

