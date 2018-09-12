---
layout: post
title: DOS Interrupts
date: 2018-09-12 09:32:00 +0700
description: DOS Interrupts
img: dosinterrupts.jpg
tags: [16-bit, Assembly, Interrupt, DOS]
---
#### Interrupt 20H (int 20h) Terminate Program
Terminates program execution.

<b>Input:</b><br>
CS = Segement address of Program Segment Prefix (PSP)

<b>Ouput:</b> none

This function, equivalent in effect to interrupt 21h service 0 terminates the execution of a program and returns control
 to DOS, which restores the terminate, ctrl-break and critical-error exit addresses from the PSP, and all files written
 to by the program must be close before interrupt 20h is called.

It is best to use int 21h function 4ch to exit from exe programs since function 4ch doesn't require that CS point to the PSP.

#### Interrupt 21H (int 21h) DOS Service Calls

##### Interrupt 21H Service 0 : Terminate program
Terminates a program and returns to DOS.

<b>Input:</b><br>
AH = 00h<br>
CS = Segment address of Program Segment Prefix (PSP)

<b>Ouput:</b> none

DOS terminates the program, flushes the file buffers, and restores the terminate, ctrl-break and critical error exit
addresses from the PSP.

Close all files first then ensure that CS contains the segment address of the PSP.

This function is an historical remnant offering no advantages over function 4ch. It's better to use function 4Ch, which returns an error code that other programs can access (via Function 4Dh or the ERRORLEVEL statement in batch files); also, CS need not be set first when using Function 4Ch. (INT 20h is equivalent to Function 0)

If a Ctrl-Break (Ctrl-C) is detected, an INT 23h is generated.

##### Interrupt 21H Service 1 : Read keyboard character and echo
Reads a character from the standard input device (usually the keyboard) and echoes it to the standard output device
(usually the screen).

<b>Input:</b><br>
AH = 01h

<b>Ouput:</b><br>
AL = Character read

For the special keys, such as the cursor and function keys, this function returns a 0 in AL; call the function again to
read the extended code of the special character.

If a Ctrl-Break (Ctrl-C) is detected, an INT 23h is generated.

This function checks for ctrl-break and ctrl-c. Use function 07h if you don't wish to check ctrl-break and ctrl-c.

##### Interrupt 21H Service 2 : Character output
Outputs a character to the standard output device.

<b>Input:</b><br>
AH = 02h<br>
DL = Character

<b>Ouput:</b> none

This function outputs to the standard output device the character whose ASCII value in DL.

To output an entire string, see function 09h.

If a Ctrl-Break (Ctrl-C) is detected, an INT 23h is generated.

##### Interrupt 21H Service 3 : Auxiliary character input
Waits for a character from ths standard auxiliary device. Checks for ctrl-break and ctrl-c.

<b>Input:</b><br>
AH = 03h

<b>Ouput:</b><br>
AL = Character read

This function inputs a character into AL from the standard auxiliary device, which is normally the first serial port (At
 startup PC-DOS initializes the first serial port to 2400 baud, eight data bits, one stop bit, and no parity).

If a Ctrl-Break (Ctrl-C) is detected, an INT 23h is generated.

Input is unbuffered and not interrupt-driven; if your program can't process the characters fast enough, data may be lost.

This function does not monitor the status of the serial port. For greater control, use the ROM-BIOS services (Interrupt
14h).

##### Interrupt 21H Service 4 : Auxiliary character output
Outputs a character to the standard auxiliary device.

<b>Input:</b><br>
AH = 04h<br>
DL = Character

<b>Ouput:</b> none

This function outputs the character whose ASCII value is in DL to the standard auxiliary device, which is normally the
first serial port. (At startup, PC-DOS initializes the first serial port to 2400 baud, eight data bits, one stop bit, and no parity.)

If the device is busy, the function waits until it is ready. If a Ctrl-Break or Ctrl-C is detected, INT 23h is executed
following output.

This function does not monitor the status of the serial port. For greater control, use the ROM-BIOS services (Interrupt
14h).

##### Interrupt 21H Service 5 : Printer character output
Outputs a character to the standard printer device.

<b>Input:</b><br>
AH = 05h<br>
DL = Character

<b>Output:</b> none

This function outputs the character whose ASCII value is in DL to the standard printer device, which is normally the first parallel port, LPT1.

If the device is busy, the function waits until it is ready.

If a Ctrl-Break (Ctrl-C) is detected, INT 23h is executed following output.

Because this functions offers no way to determine printer status, it is preferable to open the LPT1 device as a file.

For greater control, use the ROM-BIOS services (INT 17h).

##### Interrupt 21H Service 6 : Direct console character I/O
Gets a character from the standard input device, if one is available; or outputs a character to the standard output
device. Does not echo characters read or check for ctrl-break or ctrl-c.

To input a character

<b>Input:</b><br>
AH = 06h<br>
DL = ffh

<b>Output:</b><br>
AL = Character<br>
ZF = 0 if character is available; 1 if character is no available

To output a character

<b>Input:</b><br>
AH = 06h<br>
DL = Character

<b>Output:</b> none

If this function is used for input and no character is ready, the Zero Flag is set; if a character is
ready, the Zero Flag is cleared and the character value is returned in AL. Input is not echoed to the
standard output device.

A 0 returned in AL means that one of the "special" characters (a function key or a cursor key, for
example) was input. A second call to Function 06h will then return the extended code of the special
character. See the Key Codes table for a list of special keys and their extended codes.

This function does not issue an INT 23h in response to Ctrl-Break or Ctrl-C.

##### Interrupt 21H Service 7 : Direct console character input without echo
Waits for a character from the standard input device. Does not echo, and does not check for ctrl-break or ctrl-c.

<b>Input:</b><br>
AH = 07h

<b>Output:</b><br>
AL = Character

This function waits for a character from the standard input device. When a character is available, the function returns
its ASCII value in AL but does not echo it to the standard output device.

A 0 returned in AL means that one of the "special" characters (a function key or a cursor key, for
example) was input. Call the function again to read the extended code of the special character (see the
Key codes table).

Does not execute an INT 23h in response to Ctrl-Break or Ctrl-C.

##### Interrupt 21H Service 8 : Console character input without echo
Waits for a character from the standard input device. Does not echo, and does not check for ctrl-break or ctrl-c.

<b>Input:</b><br>
AH = 07h

<b>Output:</b><br>
AL = Character

This function waits for a character from the standard input device. When a character is available, the function returns
its ASCII value in AL but does not echo it to the standard output device.

A 0 returned in AL means that one of the "special" characters (a function key or a cursor key, for
example) was input. Call the function again to read the extended code of the special character (see the
Key codes table).

Does not execute an INT 23h in response to Ctrl-Break or Ctrl-C.

##### Interrupt 21H Service 9 : Print string
Outputs a string of characters to the standard output device. Checks for ctrl-break (ctrl-c).

<b>Input:</b><br>
AH = 09h<br>
DS:BX = Pointer to character string

<b>Output:</b> none

The function outputs a string to the standard output device, checking for Ctrl-Break and Ctrl-C.

The string must be terminated with a $ (dollar-sign); the dollar-sign is not displayed. This
function is therefore not suitable for displaying strings that include the dollar-sign character. All
other characters, including control characters, are displayed.

If a Ctrl-Break or Ctrl-C is detected, an INT 23h is generated following output.

To output a single character, see Function 02h.

##### Interrupt 21H Service 10 : Buffered input
Reads a string of characters from the standard input device until the enter key is pressed. Echos the characters and
checks for ctrl-break and ctrl-c

<b>Input:</b><br>
AH = 0ah<br>
DS:BX = Pointer to an input buffer; offset 0 (first byte) of buffer specifies maximum buffer length.

<b>Output:</b> none

This function reads characters from the standard input device, until a carriage return is encountered. The characters,
including the carriage return, are stored beginning at offset 2 (third byte) of a buffer specified in DS:BX.

Store maximum capacity of buffer (255 or less) at the first byte at DS:DX; include the terminating carriage return in
the count.

At offset 1 (second byte) of DS:DX, DOS returns the number of characters that were actually received, not including the final carriage return.

If DOS encounters a Ctrl-Break or Ctrl-C, it executes an INT 23h.

The DOS editing commands are active during input with this function.

If the buffer becomes filled to within one byte of capacity, DOS rejects all further characters up to, but not including, the terminating carriage return.

##### Interrupt 21H Service 11 : Check standard input status
Checks to see if a character is available from the standard input device. Checks for ctrl-break and ctrl-c.

<b>Input:</b><br>
AH = 0bh

<b>Output:</b><br>
AL = ffh (if a character is available)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h (if no character is available)

This function can be used to see if a character is available at the standard input device (usually the keyboard), before
 transferring control to one of the waiting keyboard input services (Function 01h, Function 07h, and Function 08h).

The function returns FFh if a character is available and 00h if none is available.

If DOS encounters a Ctrl-Break or Ctrl-C, it executes an INT 23h.

##### Interrupt 21H Service 12 : Clear input buffer, then invoke function
Removes any characters in the typeahead buffer, then invokes the specified keyboard function.

<b>Input:</b><br>
AH = 0ch<br>
AL = function to be invoked (01h, 06h, 07h, 08h, or 0ah)

<b>Output:</b><br>
AL = input character (unless function invoked was 0ah)

This function clears the keyboard buffer, then invokes one of five DOS services (specified in AL): functions 01h, 06h,
07h, 08h, or 0ah. The purpose is to ensure that your program receives new input before it performs the followup function.

Since Function 06h is supported, the followup function need not be keyboard input; it may be
display output. See specified followup function for details.

If you just want to clear the keyboard buffer, you can use this function with AL = 6 and DL = 0FFh,
which will check to see if any characters are waiting to be read without reading any.

##### Interrupt 21H Service 13 : Disk reset
Flushes all file buffers.

<b>Input:</b><br>
AH = 0dh

<b>Output:</b> none

This function flushes all file buffers but does not close files. To ensure that the proper length of a
changed file is recorded in the disk directory, use one of the two Close File Functions (10h or 3Eh).

##### Interrupt 21H Service 14 : Select default drive
Sets the default drive and returns the number of logical drives in the system.

<b>Input:</b><br>
AH = 0eh<br>
DL = Drive number (0 = A, 1 = B, etc)

<b>Output:</b><br>
AL = Number of logical drives in system

The floppy disk on a single floppy system is counted as two logical drives, A: and B:.

DOS 3 and later versions report a minimum of 5 logical drives, unless the CONFIG.SYS file contains a LASTDRIVE statement.

To determine the number of physical floppy drives on the system, use Interrupt 11h (17). To determine the
number of physical hard drives, use Interrupt 13h, Function 8.

##### Interrupt 21H Service 15 : Open file using FCBs
Open an existing file using a File Control Block (FCB)

<b>Input:</b><br>
AH = 0fh<br>
DS:DX = Pointer to an unopened FCB

<b>Output:</b><br>
AL = 00h (if file successfully opened)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if file not found)

The FCB is initialized as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Length</th>
<th>Field</th>
<th>Initialized to</th>
<th>Initialized by</th>
</tr>
<tr>
<td>00h</td>
<td>1</td>
<td>Drive code</td>
<td>Drive specified</td>
<td>user</td>
</tr>
<tr>
<td>01h</td>
<td>8</td>
<td>Filename</td>
<td>Filename</td>
<td>User</td>
</tr>
<tr>
<td>09h</td>
<td>3</td>
<td>Extension</td>
<td>Filename extension</td>
<td>User</td>
</tr>
<tr>
<td>0ch</td>
<td>2</td>
<td>Current block</td>
<td>00h</td>
<td>DOS</td>
</tr>
<tr>
<td>0eh</td>
<td>2</td>
<td>Record size</td>
<td>80h</td>
<td>DOS</td>
</tr>
<tr>
<td>10h</td>
<td>4</td>
<td>File size</td>
<td>Value in file directory</td>
<td>DOS</td>
</tr>
<tr>
<td>14h</td>
<td>2</td>
<td>Date</td>
<td>Value in file directory</td>
<td>DOS</td>
</tr>
<tr>
<td>16h</td>
<td>2</td>
<td>Time</td>
<td>Value in file directory</td>
<td>DOS</td>
</tr>
<tr>
<td>18h</td>
<td>8</td>
<td>Reserved</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>20h</td>
<td>1</td>
<td>Current record</td>
<td>See notes below</td>
<td>User</td>
</tr>
<tr>
<td>21h</td>
<td>4</td>
<td>Number of record number</td>
<td>See notes below</td>
<td>User</td>
</tr>
</table>
</div>

An extended File Control Block is used to access files with special attributes. An extended File Control Block has three
 additional fields, starting at offset -07h, as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Length</th>
<th>Field</th>
<th>Initialized to</th>
<th>Initialized by</th>
</tr>
<tr>
<td>-07h</td>
<td>1</td>
<td>Extended FCB ID</td>
<td>ffh</td>
<td>User</td>
</tr>
<tr>
<td>-06h</td>
<td>5</td>
<td>Reserved</td>
<td>Must be zeros</td>
<td>User</td>
</tr>
<tr>
<td>-01h</td>
<td>1</td>
<td>Attribute Byte</td>
<td>File attribute</td>
<td>User</td>
</tr>
</table>
</div>

If the drive code was 0 (default drive), this function changes it to the current default drive, where A = 1, B = 2, etc.

The record-size field is set by DOS to 80h (128) bytes. If you want to use a different value, change
the field after the file has been opened and before you perform any disk operation. If the record size
is less than 64 bytes, all four bytes of this field are used; otherwise only the lower three bytes are used.

The current record field is used for sequential read/write operations, and must be set before
performing any sequential read/writes. Set the current record field to the record number that you
wish to access within the current block. The current record field can take on any value between 0 and 127.

The random record number field must be set before any random read/write operations can be performed.
Set this field to the record number relative to the beginning of the file that you wish to access.

File Control Blocks are a holdover from DOS 1. It is preferable to manipulate files using the newer DOS
services that deal with files via handles. (All file functions above 2Eh use handles rather than FCBs.)

##### Interrupt 21H Service 16 : Close file using FCBs
Close a file and update the file directory, using a File Control Block (FCB).

<b>Input:</b><br>
AH = 10h<br>
DS:DX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h (if file closed)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if file not found)

If you're closing a file on a floppy disk, DOS attempts to determine if the disk in the drive has
been changed, and returns 0FFh in AL if so. The determination is not reliable in versions of DOS
prior to 3.0; using this function in DOS 2 when the disk has been changed may result in a trashed disk.

##### Interrupt 21H Service 17 : Search for first matching file using FCBs
Searches the current directory for the first matching filename.

<b>Input:</b><br>
AH = 11h<br>
DS:DX = Pointer to an unopened FCB

<b>Output:</b><br>
AL = 00h (if filename match found)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if no filename match found)

The intended use of this service is to handle filenames that include '?' wildcard characters. This
function begins the process, and Function 12h (18) continues the search for subsequent files.

Function 29h (Parse Filename) is useful for creating an unopened FCB in preparation for searching.

If a file is found, an unopened FCB will be set up at the current Disk Transfer Address. Before calling
this function, you should therefore ensure that there is enough room reserved at the DTA for the
FCB; if necessary, use Function 1Ah to set the DTA.

If the FCB is an extended FCB, you can specify the attributes of the file you wish to search for. If
you specify any combination of the hidden, system, or directory attribute bits, the search will match
normal files and also any files with the specified attributes. If you specify the volume-label
attribute, however, the function will search only for a volume-label entry. The archive and read-only
attributes cannot be used as search criteria.

If the search uses an extended FCB, and extended FCB is put in the DTA with the 0FFh signature byte
(offset -7) at the start of the DTA.

File Control Blocks are a holdover from DOS 1. It is preferable to search for files using functions 4Eh
(Find First) and 4Fh (Find Next).

##### Interrupt 21H Service 18 : Search for next matching file using FCBs
Searches the current directory for the next matching filename, following a function 11h call or a previous function 12h
call.

<b>Input:</b><br>
AH = 12h<br>
DS:DX = Pointer to an unopened FCB specified in a previous function 11h or function 12h

<b>Output:</b><br>
AL = 00h (if another match found)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if no match found)

The information needed by Function 12h is destroyed by any operation on the file using the FCB created
via Function 11h. Therefore, if you want to search for several files and also do I/O on them, you must
save the search information that is stored in the FCB.

##### Interrupt 21H Service 19 : Delete file using FCBs
Deletes all files in the current directory that match the filename specified in the FCB.

<b>Input:</b><br>
AH = 13h<br>
DS:DX = Pointer to an unopened FCB

<b>Output:</b><br>
AL = 00h (if file deleted)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if file not found)

The '?' wildcard character can be included in the file specification; compare this to the delete
function using file handles (Function 41h), which does not allow any wildcard characters.

Read-only files will not be deleted by this function.

Close all open files before deleting them.

##### Interrupt 21H Service 20 : Sequential read using FCBs
Reads the next sequential record from a file, then increments the FCB's current block and current record fields.

<b>Input:</b><br>
AH = 14h<br>
DS:DX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h (if read was successful)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h (if EOF encountered and no data read)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h (if DTA too small (segment wrap))<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h (if EOF encountered and partial record read)

The sequential record number is taken from the values in the current block (offset 0Ch) and the
current record (offset 20h) fields of the FCB. These fields are automatically updated after the read
operation. The number of bytes to read is taken from the record size field at offset 0Eh of the FCB.

The data is read in at the current Disk Transfer Address (DTA). Use Function 1Ah to set the DTA. If
the transfer of data would cause segment wraparound, an error 2 is generated.

If an EOF is encountered before a full record has been read, the remainder of the record is padded to
the requested size with zeros.

##### Interrupt 21H Service 21 : Sequential write using FCBs
Writes the record addressed by the current block and current record fields from the Disk Transfer Address (DTA), then
increments the block and records fields.

<b>Input:</b><br>
AH = 15h<br>
DS:DX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h (if write was successful)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h (if disk full)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h (if DTA too small (segment wrap))

The sequential record number is taken from the values in the current block (offset 0Ch) and the
current record (offset 20h) fields of the FCB. These fields are automatically updated after the write
operation. The number of bytes to write is taken from the record size field at offset 0Eh of the FCB.

The data to be written to disk is taken from the current Disk Transfer Address (DTA). Use Function
1Ah to set the DTA. If the transfer of data would cause segment wraparound, an error 2 is generated.

If the record written doesn't fill an entire sector, DOS buffers the data for an eventual write when a
sector's worth of data is accumulated.

If the file specified has the read-only attribute set, the write is not performed.

##### Interrupt 21H Service 22 : Create file using FCBs
Creates and opens a new file or opens an existing file and truncates it to zero length.

<b>Input:</b><br>
AH = 16h<br>
DS:DX = Pointer to an unopened FCB

<b>Output:</b><br>
AL = 00h (if file created)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if file not created)

You can assign special attributes to the file by means of an Extended FCB.

The file opened is assigned a length of 0 bytes. Therefore, this function is generally used to open
an output file, while function 0Fh is used to open an input file.

This function is a holdover from DOS 1.0.  It is preferable to use the new style functions like 3Ch to create a file.

##### Interrupt 21H Service 23 : Rename file using FCBs
Changes all matching occurrences of the first filename in the current directory to the second filename.

<b>Input:</b><br>
AH = 17h<br>
DS:DX = Pointer to an FCB that has been modified to contain two filenames

<b>Output:</b><br>
AL = 00h (if operation is successful)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh (if operation is unsuccessful)

This function renames files via a modified FCB that contains the drive code and original filename in their usual
positions, and has a new filename beginning six bytes after the original filename (at offset 11h in the FCB).

The '?' wildcard character may appear in either the first filename or the second filename. A '?'
character in the first filename has the conventional meaning: it is used to find files that match this
filespec.

A '?' in the second filename has a different effect: It means don't change the corresponding character in matching
filenames.

This function will not rename a file to that of an already existing filename; in that event, the
function will terminate, returning FFh in AL.

Read-only files are not renamed by this function.

##### Interrupt 21H Service 24 : Reserved
<br>

##### Interrupt 21H Service 25 : Get current disk
Gets the drive number of the current default drive.

<b>Input:</b><br>
AH = 19h

<b>Output:</b><br>
AL = Number of default drive (A = 0, B = 1, etc)

The drive numbers returned by this function are one less than the drive numbers used by many functions;
many functions use 0 for the default drive and start with A = 1 (rather than A = 0).

##### Interrupt 21H Service 26 : Set disk transfer address (DTA)
Sets the Disk Transfer Address (DTA).

<b>Input:</b><br>
AH = 1ah<br>
DS:BX = Address of DTA

<b>Output:</b> none

DOS supplies a default DTA of 128 bytes at offset 80h in the Program Segment Prefix (PSP).

Reserve sufficient buffer area; DOS will detect and abort disk transfers that would wrap around within
the segment or fall off the end of the current segment.

This function is used with the FCB Read and FCB Write file operations. It is also used with the
"Find First" and "Find Next" functions, both Handle and FCB.

##### Interrupt 21H Service 27 : Get FAT Information for Current Drive
Gets disk characteristics and the media descriptor byte for the current drive. (The media descriptor byte specifies the
type of drive).

<b>Input:</b><br>
AH = 1bh

<b>Output:</b><br>
AL = Number of sectors per cluster<br>
CX = Sector size in bytes<br>
DX = Total number of disk clusters<br>
DS:BX = Pointer to the media descriptor byte (FAT ID byte)

<b>Media Descriptor (FAT ID) Byte</b>

The media descriptor byte is limited to the values f0 through ff. This range is no longer sufficient to provide unique
identifiers for each media type. The following values are defined:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>ffh</td>
<td>Double-sided 5 1/4" floppy, 8 sectors</td>
</tr>
<tr>
<td>feh</td>
<td>Single-sided 3 1/4" floppy, 8 sectors or Single-sided 8" floppy, 26 sectors or Single-sided 8" floppy, 8
sectors</td>
</tr>
<tr>
<td>fdh</td>
<td>Double-sided 5 1/4" floppy, 9 sectors or Single-sided 8" floppy 26 sectors</td>
</tr>
<tr>
<td>fch</td>
<td>Single-sided floppy, 9 sectors per track</td>
</tr>
<tr>
<td>f9h</td>
<td>Double-sided 5 1/4" floppy, 15 sectors or Double-sided 3 1/2" floppy, 9 sectors</td>
</tr>
<tr>
<td>f8h</td>
<td>Hard disk</td>
</tr>
<tr>
<td>f0h</td>
<td>Double-sided 3 1/2" floppy, 18 sectors or any other undefined media type</td>
</tr>
</table>
</div>

For more reliable information about media type, use interrupt 25h to read the BIOS Parameter Block (BPB) in the boot
record.

This function changes the current value of DS. To ensure the stability of your program, it's best to <code>push
ds</code> before calling this service.

To perform the same function for a drive other than the default, use function 1ch.

##### Interrupt 21H Service 28 : Get FAT Information for Specified Drive
Gets disk characteristics and the media descriptor byte for the any drive.

<b>Input:</b><br>
AH = 1ch<br>
DL = Drive number (0 = default, 1 = A, 2 = B, etc)

<b>Output:</b><br>
AL = Number of sectors per cluster<br>
CX = Sector size in bytes<br>
DX = Total number of disk clusters<br>
DS:BX = Pointer to the media descriptor byte (FAT ID byte)

<b>Media Descriptor (FAT ID) Byte</b>

The media descriptor byte is limited to the values f0 through ff. This range is no longer sufficient to provide unique
identifiers for each media type. The following values are defined:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>ffh</td>
<td>Double-sided 5 1/4" floppy, 8 sectors</td>
</tr>
<tr>
<td>feh</td>
<td>Single-sided 3 1/4" floppy, 8 sectors or Single-sided 8" floppy, 26 sectors or Single-sided 8" floppy, 8
sectors</td>
</tr>
<tr>
<td>fdh</td>
<td>Double-sided 5 1/4" floppy, 9 sectors or Single-sided 8" floppy 26 sectors</td>
</tr>
<tr>
<td>fch</td>
<td>Single-sided floppy, 9 sectors per track</td>
</tr>
<tr>
<td>f9h</td>
<td>Double-sided 5 1/4" floppy, 15 sectors or Double-sided 3 1/2" floppy, 9 sectors</td>
</tr>
<tr>
<td>f8h</td>
<td>Hard disk</td>
</tr>
<tr>
<td>f0h</td>
<td>Double-sided 3 1/2" floppy, 18 sectors or any other undefined media type</td>
</tr>
</table>
</div>

For more reliable information about media type, use interrupt 25h to read the BIOS Parameter Block (BPB) in the boot
record.

This function changes the current value of DS. To ensure the stability of your program, it's best to <code>push
ds</code> before calling this service.

##### Interrupt 21H Service 29, Service 30, Service 31, Service 32 : Reserved
<br>

##### Interrupt 21H Service 33 : Random read using FCBs
Reads a specified record from a file into memory at the current Disk Address Transfer (DTA).

<b>Input:</b><br>
AH = 21h<br>
DS:BX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h : if read was successful<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if EOF encountered and no data read<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : if DTA too small (segment wrap)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : if EOF encountered and partial record read

This function reads the record specified by the random-record field (offset 21h) and the record-size field (offset 0Eh)
of the FCB. The current block and current record fields are set to reflect the random-record field, and the record is read into memory at the current Disk Transfer Address.

The random-record field is not updated after this function. It is your program's responsibility to set
this field each time it calls this function. Function 27h, which is similar to this function,
will automatically update the random-record field. (Function 27h can also read multiple records.)

If an EOF is encountered before a full record has been read, the remainder of the record is padded to
the requested size with zeros.

The data is read in at the current Disk Transfer Address (DTA). Use Function 1Ah to set the DTA. If
the transfer of data would cause segment wraparound, an error 2 is generated.

##### Interrupt 21H Service 34 : Random write using FCBs
Writes the specified record in the current Disk Address Transfer (DTA) to a file.

<b>Input:</b><br>
AH = 22h<br>
DS:BX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h : if write was successful<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if disk full<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : if DTA too small (segment wrap)

This function writes the record specified by the random-record field (offset 21h) and the record-size field (offset 0Eh)
 of the FCB. The current block and current record fields are set to reflect the random-record field, and the record is written to the file from the current Disk Transfer Address.

The random-record field is not updated after this function. It is your program's responsibility to set
this field each time it calls this function. Function 28h, which is similar to this function, will automatically update the random-record field. (Function 28h can also write multiple records.)

The data to be written is taken from the current Disk Transfer Address (DTA). Use Function 1Ah to set the DTA. If the transfer of data would cause segment wraparound, an error 2 is generated.

If the record written doesn't fill an entire sector, DOS buffers the data for an eventual write when a sector's worth of data is accumulated.

If the file specified has the read-only attribute set, the write is not performed.

##### Interrupt 21H Service 35 : Get file size using FCBs
Returns the number of records in a file.

<b>Input:</b><br>
AH = 23h<br>
DS:BX = Pointer to an unopened FCB

<b>Output:</b><br>
AL = 00h : if matching file found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh : if no matching file found

This function reports the size of a file as a number of records (rounded up). The number of records is returned in the
random-record field (offset 21h) of the FCB.

Before calling, you must set the record-size field (offset 0Eh) in the FCB. To determine the size of the file in bytes, set the record-size field to 1.

To determine a file's size using the new-style handle functions, use LSEEK (function 42h) to seek to the end of the file.

##### Interrupt 21H Service 36 : Set random-record field using FCBs
Sets the random-record field in the PCBs.

<b>Input:</b><br>
AH = 24h<br>
DS:BX = Pointer to an opened FCB

<b>Output:</b> none

This function sets the random-record field to correspond to the current block and record fields in the FCB.

This function facilitates switching from sequential to random I/O.

##### Interrupt 21H Service 37 : Set Interrupt Vector
Sets the address of an interrupt vector.

<b>Input:</b><br>
AH = 25h<br>
AL = Interrupt number<br>
DS:BX = Address of interrupt handler

<b>Output:</b> none

Prior to calling, you may want to get the address of the current interrupt handler (via Function 35h) so
that your program can restore the original routine when it exits. This is the preferred way to set interrupt vectors.

##### Interrupt 21H Service 38 : Create Program Segment
Creates a new Program Segment Prefix (PSP).

<b>Input:</b><br>
AH = 26h<br>
DX = Segment address of new PSP<br>
CS:0 = PSP to copy information from

<b>Output:</b> none

This function creates a new Program Segment Prefix (PSP), in order to prepare a separately loaded subprogram (i.e., overlay), for execution. The PSP at the start of the current program's code segment is copied into the first 256 bytes of the new segment specified in DX. The new PSP is updated with the current Int 22h, Int 23h, and Int 24 interrupt handlers. Memory size information at location 06h of the new PSP is updated to reflect available memory.

This function has been superseded by the EXEC function (Function 4Bh) in versions 2.0 and later of DOS; this function
should not be used.

##### Interrupt 21H Service 39 : Random block read using FCBs
Reads one or more records into memory at the current Disk Transfer Address (DTA).

<b>Input:</b><br>
AH = 27h<br>
CX = Number of records to read<br>
DS:BX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h : if read was successful<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if EOF encountered, and last record complete<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : if DTA too small<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : if EOF encountered, last record was partial<br>
CX = Number of records read

This function reads in the number of records specified by CX (CX must be greater than zero), beginning at the file address specified by the random-record (offset 21h) and record-size (0Eh) fields of the FCB. The current block and current record fields are set to reflect the random-record field, and the records are read into memory at the current Disk Transfer Address.

Use Function 1Ah to set the Disk Transfer Address. If the transfer of data would cause segment
wraparound, an error 2 is generated.

If an EOF is encountered and the last record read was not complete, the function pads the last record
with zeros to the requested size.

After the requested records have been read, this function updates the random-record, current-block,
and current-record fields of the FCB to point to the next record. Function 21h is similar to this
function except: 1) Function 21 does not automatically update these three fields, and 2)
Function 21h can read only a single record per call, whereas this function can read multiple records.

##### Interrupt 21H Service 40 : Random block write using FCBs
Writes one or more records from the current Disk Transfer Address (DTA) to a file.

<b>Input:</b><br>
AH = 28h<br>
CX = Number of records to write<br>
DS:BX = Pointer to an opened FCB

<b>Output:</b><br>
AL = 00h : if write was successful<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if disk full<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 02h : if DTA too small (segment wrap)<br>
CX = Number of records written

This function writes the number of records specified by CX, starting at the file offset specified by random-record (offset 21h) and record-size (0Eh) fields of the FCB. The current block and current record fields are set to reflect the random-record field, and the records are written to the file from the current DTA.

The data to be written is taken from the current Disk Transfer Address (DTA). Use Function 1Ah to set
the DTA. If the transfer of data would cause segment wraparound, an error 2 is generated.

If the records being written don't fill an entire sector, DOS buffers the data for an eventual write
when a full sector's worth of data is accumulated.

If the file specified has the read-only attribute set, the write is not performed.

If you specify a value of 0 in CX, the function writes no records, but it adjusts the file's length
to the position of the specified random record. This is useful if you have logically deleted records at
the end of the file, since it enables you to truncate the file appropriately and free up disk space.

##### Interrupt 21H Service 41 : Parse Filename
Parses a command line text string and places it in the various fields of an FCB.

<b>Input:</b><br>
AH = 29h<br>
AL = Parsing flags (see below)<br>
DS:SI = Pointer to the string to be parsed<br>
ES:DI = Pointer to FCB

<b>Output:</b><br>
AL = ffh : if function fails<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : if function succeeds, no wildcards encountered<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if function succeeds and wildcards are encountered

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Parsing flags</th>
</tr>
<tr>
<th>Bit</th>
<th>Means</th>
</tr>
<tr>
<td>0</td>
<td>Scan past (ignore) leading separator characters</td>
</tr>
<tr>
<td>1</td>
<td>Drive ID byte in FCB is modified only if drive is specified in command line</td>
</tr>
<tr>
<td>2</td>
<td>Filename in FCB is modified only if filename is specified in command line</td>
</tr>
<tr>
<td>3</td>
<td>Filename extension in FCB is modified only if filename extension is specified in command line</td>
</tr>
<tr>
<td>4-7</td>
<td>Ignored</td>
</tr>
</table>
</div>

Function 29h parses a command line for a filespec with the form d:FILENAME.EXT. If a filename is found, an FCB is
created; otherwise the function returns ffh in AL. The function enables a program to set up a default drive, filename,
and extension, and to allow the user to override these defaults at will.

DS:SI points to the location of the filespec to be parsed. ES:SI points to the location where the FCB will be created.
The low-order four bits of AL specify parsing parameters, as follows:

If bit 0 is 1, the function scans past leading separator characters (blank spaces, for example) to
find the filespec. If bit 0 is 0, the filespec is expected to be in the first byte of the command line.

If bit 1 is 1, the function sets the drive byte in the FCB only if it is included in the filespec being
parsed. This allows the FCB to have its own default drive (which the user may override), rather than
using the DOS default drive.

If bit 2 is 1, the function changes the filename in the FCB only if a valid filename is found in the
filespec. This allows your program to set up a default filename, which can be overridden by the
command input.

If bit 3 is 1, the filename extension in the FCB is changed only if a valid filename extension is found
in the filespec.

If the function encounters a '*' wildcard character in the filename or extension, it fills out the
remainder of the filename or extension with '?' wildcard characters. Assuming the rest of the
parsing operation is successful, the function in this case returns 01h in AL, alerting your program
of the need for find-first / find-next processing (see Function 11h and Function 12h).

If the parse is unsuccessful, AL returns FFh, and the second byte of the FCB (ES:DI+1) will be blank.

Function 29h cannot handle path names.

##### Interrupt 21H Service 42 : Get System Date
Reports the current system date, including the day of the week.

<b>Input:</b><br>
AH = 2ah

<b>Output:</b><br>
AL = Day of the week (0 - 6, 0 = Sunday)<br>
CX = Year (1980 - 2099)<br>
DH = Month (1 - 12)<br>
DL = Day (1 - 31)

The DOS 2.00 and 2.10 manuals state that Function 2Ch returns the day of the week in AL. That is
incorrect: This function, not Function 2Ch, returns the day of the week.

Note the similarity between the registers returned for this function, and the register setup of Function 2Bh, Set System
 Date.

##### Interrupt 21H Service 43 : Set System Date
Sets the current system date.

<b>Input:</b><br>
AH = 2bh<br>
CX = Year (1980 - 2099)<br>
DH = Month (1 - 12)<br>
DL = Day (1 - 31)

<b>Output:</b><br>
AL = 00h : if valid date specified<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh : if invalid date specified

Note the similarity between the register setup for this function, and the registers returned by Function 2Ah, Get System
 Date.

##### Interrupt 21H Service 44 : Get System Time
Reports the current system time of a day.

<b>Input:</b><br>
AH = 2ch

<b>Output:</b><br>
CH = Hour (0 - 23)<br>
CL = Minutes (0 - 59) <br>
DH = Seconds (0 - 59)<br>
DL = Hunderedths of a second (0 - 99)

Function 2Ch reports the time of day as calculated from the ROM-BIOS clock-tick count.

This Function has a complementary register format to that of Function 2Dh, Set System Time.

On most systems, the hundreths field will only be accurate to within 1/18.2 seconds rather than 1/100 seconds.

In some systems in which the real-time clock does not track hundredths of a second, the value in DL may be unpredictable.

##### Interrupt 21H Service 45 : Set System Time
Sets the current system time.

<b>Input:</b><br>
AH = 2dh<br>
CH = Hour (0 - 23)<br>
CL = Minutes (0 - 59) <br>
DH = Seconds (0 - 59)<br>
DL = Hunderedths of a second (0 - 99)

<b>Output:</b><br>
AL = ffh : if time not set successfully<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : if time set successfully

The register format of this function is the same as that returned by Function 2Ch (Get System Time).

##### Interrupt 21H Service 46 : Set or reset verify switch
Turns the disk verify operation on or off.

<b>Input:</b><br>
AH = 2eh<br>
AL = 00h : to turn VERIFY off<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : to turn VERIFY on<br>
DL = 00h

<b>Output:</b> none

Function 2Eh turns the DOS VERIFY switch on or off. If VERIFY is on, DOS reads the CRC (cyclic redundancy check) bytes of the just-written data, and verifies that they are correct. Note that setting the VERIFY switch ON does NOT cause a read-after-write verification of data copied to the disk, only a verification of the CRC bytes.

In DOS 1 and 2 only, DL must be set to 0 before this function is called.

Network disks do not support the verification function.

Use Function 54h (Get Verify Setting) to determine the current state of the VERIFY switch.

##### Interrupt 21H Service 47 : Get disk transfer address (DTA)
Gets the current Disk Transfer Address (GTA).

<b>Input:</b><br>
AH = 2fh

<b>Output:</b><br>
ES:BX = Address of current DTA

If Function 1Ah (Set Disk Transfer Address) is not used to explicitly set the DTA, a default DTA of 128
bytes in length at offset 80h in the PSP is automatically established by DOS.

##### Interrupt 21H Service 48 : Get DOS version number
Returns the major and minor version numbers of DOS.

<b>Input:</b><br>
AH = 30h

<b>Output:</b><br>
AL = Major version number<br>
AH = Minor version number

If this call were used under DOS 2.11, AL would return 02h, and AH would return 0Bh (11 decimal).

DOS 1.x returns 00h in AL.

##### Interrupt 21H Service 49 : Terminate and stay resident
Terminates a process, but keeps a specified portion resident in memory.

<b>Input:</b><br>
AH = 31h<br>
AL = Return code<br>
DX = Size of resident portion, in paragraphs

<b>Output:</b> none

Function 31h is an enhanced version of DOS Interrupt 27h, Terminate and Stay Resident, that offers two extra features: It allows more than 64K of memory to remain resident, and allows the terminating process to report a return code.

This function does not release any memory that was allocated by the terminating process via Function 48h (Allocate
Memory).

The return code may be retrieved by a parent process via Function 4Dh, or tested by means of the ERRORLEVEL feature of DOS batch processing.

Open files are not closed by this function.

##### Interrupt 21H Service 50 : Reserved
<br>

##### Interrupt 21H Service 51 : Get or set ctrl-break status
Reports the status of or sets extended ctrl-break checking.

<b>Input:</b><br>
AH = 33h<br>
AL = 00h : to get BREAK state<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : to set BREAK state<br>
DL = 00h : to set BREAK OFF<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : to set BREAK ON

<b>Output:</b><br>
DL = 00h : BREAK is off<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : BREAK is on

With DOS versions 2.00 and later, Ctrl-Break checking can be extended to take place any time input or output is
requested via DOS. (DOS normally acts on Ctrl-Break only under a limited set of circumstances--during certain keyboard and screen functions.) Use Function 33h to toggle extended Ctrl-Break monitoring on or off.

The default for Ctrl-Break monitoring is off.

The state of the control break flag can be set at the DOS prompt with the "break on" command, so it is a nice idea to save the state of the break flag and restore it before returning to DOS.

##### Interrupt 21H Service 52 : Reserved
<br>

##### Interrupt 21H Service 53 : Get Interrupt Vector
Returns the address of the interrupt-handling routine for a specified interrupt number.

<b>Input:</b><br>
AH = 35h<br>
AL = Interrupt number

<b>Output:</b><br>
ES:BX = Pointer to the interrupt-handling routine

##### Interrupt 21H Service 54 : Get Disk Free Space
Returns the number of available clusters, and other information about the disk in the specified drive.

<b>Input:</b><br>
AH = 36h<br>
DL = Drive number (0 = default, 1 = A, 2 = B, etc)

<b>Output:</b><br>
AX = Sectors per cluster<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffffh is invalid drive specified<br>
BX = Number of available clusters<br>
CX = Bytes per sector<br>
DX = Total number of clusters per drive

This function returns information similar to that provided by Functions 1Bh and 1Ch, with three exceptions. This function:
* returns the number of available clusters;
* does not return a pointer to the media descriptor byte;
* returns an error code if the specified drive is invalid

##### Interrupt 21H Service 55 : Reserved
<br>

##### Interrupt 21H Service 56 : Get or set country-dependent information
DOS 2.x: Returns country-dependent information for the current country.

DOS 3.x: Returns country-dependent information for the current country or a specified country, or sets the current
country.

The country-dependent information returned by DOS 2.x is different from that returned by DOS 3.x.

<b>DOS 3</b>

1. To get country-dependent information for the current country or a specified country:

<b>Input:</b><br>
AH = 38h<br>
AL = Country code (00h = current country)<br>
BX = 16-bit country code (if AL = ffh)<br>
DS:DX = Pointer to a 34-byte memory buffer

<b>Output:</b><br>
AX = error code, if CF (Carry flag) is set<br>
BX = country code<br>
DS:DX = country-dependent information

To get country-dependent information for the current country, call this Function with 00h in AL. To get information for
another country, specify the appropriate country code in AL. For country codes larger than 254 (FDh), enter FFh in AL and the country code in BX.

The return information in DS:DX is structured as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Bytes</th>
<th>Content</th>
</tr>
<tr>
<td>2</td>
<td>Date format (see below)</td>
</tr>
<tr>
<td>5</td>
<td>Currency symbol (ASCIIZ string)</td>
</tr>
<tr>
<td>2</td>
<td>Thousand separator (ASCIIZ string)</td>
</tr>
<tr>
<td>2</td>
<td>Decimal separator (ASCIIZ string)</td>
</tr>
<tr>
<td>2</td>
<td>Date separator (ASCIIZ string)</td>
</tr>
<tr>
<td>2</td>
<td>Time separator (ASCIIZ string)</td>
</tr>
<tr>
<td>1</td>
<td>Currency format (see below)</td>
</tr>
<tr>
<td>1</td>
<td>Number of significant decimal digits in currency</td>
</tr>
<tr>
<td>1</td>
<td>Time format:<br>
Bit 0 = 0 for 12-hour format<br>
Bit 0 = 1 for 24-hour format</td>
</tr>
<tr>
<td>4</td>
<td>Pointer to a FAR produce that performs case mapping for the specified country</td>
</tr>
<tr>
<td>2</td>
<td>Data list separator (ASCIIZ string)</td>
</tr>
<tr>
<td>10</td>
<td>Reserved</td>
</tr>
</table>
</div>

The possible date format values are as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>00h</td>
<td>USA: m d y</td>
</tr>
<tr>
<td>01h</td>
<td>Europe: d m y</td>
</tr>
<tr>
<td>02h</td>
<td>Japan: y m d</td>
</tr>
</table>
</div>

Currency format field values:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>00h</td>
<td>Currency symbol precedes value; no spaces between symbol and value</td>
</tr>
<tr>
<td>01h</td>
<td>Currency symbol follows value; no spaces between symbol and value</td>
</tr>
<tr>
<td>02h</td>
<td>Currency symbol precedes value; one space between symbol and value</td>
</tr>
<tr>
<td>03h</td>
<td>Currency symbol follows value; one space between symbol and value</td>
</tr>
<tr>
<td>04h</td>
<td>Currency symbol replaces decimal separator (DOS 3.2 and above only)</td>
</tr>
</table>
</div>

2. To set the current country (DOS 3.0 and above only)

<b>Input:</b><br>
AH = 38h<br>
AL = Country code<br>
BX = 16-bit country code (if AL = ffh)<br>
DX = ffffh

<b>Output:</b><br>
AH = Error code, if CF is set

To specify a country code larger than 254 (fdh), place ffh in AL and the 16-bit country code in BX.

The DOS case-mapping routine whose address (as segment:offset) is returned with the country
dependent information will map character values from 80h to FFh to their uppercase equivalents. To use
this routine, first place the character to be mapped to uppercase in the AL register. Then make a FAR
CALL to this routine.  The uppercased character will be returned in the AL register.

<b>DOS 2.10</b>

<b>Input:</b><br>
AH = 38h<br>
AL = 00h<br>
DS:DX = Pointer to a 32-byte memory area

<b>Output:</b><br>
AX = Error code, if CF is set<br>
DS:DX = Country-dependent information

The return information at DS:BX is structured as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Bytes</th>
<th>Contents</th>
</tr>
<tr>
<td>2</td>
<td>Date/time format</td>
</tr>
<tr>
<td>2</td>
<td>Currency symbol (ASCIIZ string)</td>
</tr>
<tr>
<td>2</td>
<td>Thousands separator (ASCIIZ string)</td>
</tr>
<tr>
<td>Decimal separator (ASCIIZ string)</td>
</tr>
<tr>
<td>24</td>
<td>Reserved</td>
</tr>
</table>
</div>

The possible date/time format values are as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>00h</td>
<td>USA standard</td>
<td>h:m:s m/d/y</td>
</tr>
<tr>
<td>01h</td>
<td>Europe Standard</td>
<td>h:m:s d/m/y</td>
</tr>
<tr>
<td>02h</td>
<td>Japan Standard</td>
<td>h:m:s y:m:d</td>
</tr>
</table>
</div>

##### Interrupt 21H Service 57 : Create directory (mkdir)
Create a subdirectory.

<b>Input:</b><br>
AH = 39h<br>
DS:DX = Pointer to directory name to create (ASCIIZ string)

<b>Output:</b><br>
AX = Error code, if CF set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied, or pathname already exists

Call function 59h for extended error code information for DOS 3.0.and above.

Function 39h (mkdir) creates a subdirectory whose path is specified in the ASCIIZ string at address DS:DX, the string
length is limited to 64 characters. If the function is unable to create the directory, it sets the carry flag and
returns an error code in AX.

The directory name may include a drive letter.

If any of the parent directories in the path do not exist, the directory is not created.

##### Interrupt 21H Service 58 : Remove directory (rmdir)
Remove the specified subdirectory.

<b>Input:</b><br>
AH = 3ah<br>
DS:DX = Pointer to directory name to be removed (ASCIIZ string)

<b>Output:</b><br>
AX = Error code, if CF set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied (directory not empty)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 16 : Cannot delete current directory

Call function 59h for extended error code information for DOS 3.0.and above.

Function 3Ah (RMDIR) removes the subdirectory whose path is specified in the ASCIIZ string at address DS:DX; the string length is limited to 64 characters. If the function is unable to delete the directory, it sets the Carry Flag and returns an
error code in AX.

##### Interrupt 21H Service 59 : Change directory (chdir)
Change the current directory.

<b>Input:</b><br>
AH = 3bh<br>
DS:DX = Pointer to name of the new default directory (ASCIIZ string)

<b>Output:</b><br>
AX = Error code, if CF set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found

Call function 59h for extended error code information for DOS 3.0.and above.

Function 3Bh (CHDIR) changes the current directory to the directory whose path is specified in the ASCIIZ string at
address DS:DX; the string length is limited to 64 characters.  The path name may include a drive letter.

##### Interrupt 21H Service 60 : Create a file
Create a new file or open and truncate an existing file to zero length.

<b>Input:</b><br>
AH = 3ch<br>
CX = File attribute<br>
DS:DX = Pointer to filename (ASCIIZ string)

<b>Output:</b><br>
AX = File handler, if CF is not set;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : no handle available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied (file is read-only, or root directory is full

Call function 59h for extended error code information for DOS 3.0.and above.

This function opens the file whose pathname is specified in the ASCIIZ string at DS:DX. If the file doesn't already
exist, it is created. Warning: If a file with the specified name already exists, it is
truncated to zero length, effectively deleting the old data from the file. The file is opened for read/write.

The CX register specifies the attribute of the file you're creating, as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>CX</th>
<th>Attribute Specified</th>
</tr>
<tr>
<td>00h</td>
<td>Normal</td>
</tr>
<tr>
<td>01h</td>
<td>Read-only</td>
</tr>
<tr>
<td>02h</td>
<td>Hidden</td>
</tr>
<tr>
<td>04h</td>
<td>System</td>
</tr>
</table>
</div>

Sum the values to combine the attributes.

Information can be written to a file created in Read-only mode. However, using this function to open an existing read-only file will generate an error.

The CHMOD function (43h) can be used to change the file's attribute.

##### Interrupt 21H Service 61 : Open a file
Opens a file with the specified access code.

<b>Input:</b><br>
AH = 3dh<br>
AL = Open mode<br>
DS:DX = Pointer to filename (ASCIIZ string)

<b>Output:</b><br>
AX = File handler, if CF is not set;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : function number invalid<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : file not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : no handle available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12 : open mode invalid

Call function 59h for extended error code information for DOS 3.0.and above.

This function opens the file whose pathname is specified in the ASCIIZ string at DS:DX using the "open mode" byte to determine how the file may be accessed. The function opens any existing file, including hidden files, and sets the record size to 1 byte.

<b>Open Mode Coding in AL</b>

<pre> Bit Number (AL)          Open Mode            DOS 2.x usage
7 6 5 4 3 2 1 0
. . . . . A A A          Access mode          Read/Write access
. . . . R . . .          Reserved             Always 0
. S S S . . . .          Sharing mode         Must be 0 in DOS 2
I . . . . . . .          Inheritance flag     Must be 0 in DOS 2</pre>

<b>Access Mode (lower three bits of AL)</b>

The low-order three bits (access mode) are used in the same manner in both DOS 2 and 3. These bits indicate allowable access (read, write, or read/write).

<pre> Bit           Hex       Access Mode
2 1 0
0 0 0           0        Read-only access
0 0 1           1        Write-only access
0 1 0           2        Read/write access</pre>

<b>Bit 3 Reserved (must always be zero)</b>

<b>Sharing Mode (Bits 4, 5, and 6 of AL) -- DOS 3.0 and above</b>

In DOS 3.0 and above, bits 4, 5, and 6 specify a sharing mode (must be set to 0 in DOS 2.x). These bits govern the manner (if any) in which other users on a network may open and use the file after you have opened it. The following settings (and no
others) are valid:

<pre> Bit           Hex       Sharing Mode
6 5 4
0 0 0           0        Compatibility mode
0 0 1           1        Deny Read/Write mode (Exclusive mode)
0 1 0           2        Deny Write mode
0 1 1           3        Deny Read mode
1 0 0           4        Deny None mode</pre>

<b>Inheritance Flag (bit 7 of AL) -- DOS 3.0 and above</b>

The Inheritance Flag (bit 7), specifies whether or not child processes will inherit the use of this file. If bit 7 is 0,
 child processes automatically have access to the file. If bit 7 is 1, the file is not automatically available to child processes. Like any other process, however, a child process can request access to the file on a shared basis; see the discussion of sharing/access mode interactions, below.

<pre>Bit 7         Inheritance Flag
  0           File is inherited by child processes
  1           File is not inherited
</pre>

<b>Availability of an opened file to subsequent processes</b>

Once a file has been opened by a process, the availability of that file to other processes is determined by both the
sharing mode and access mode of the original process as well as by the sharing mode and access mode specified by the subsequent process. Here is a case-by-case overview of these interactions:

The file is first opened in compatibility sharing mode. A file is considered to be in "compatibility" mode if it is
opened:
* via an FCB function
* via any of the CREATE functions
* via any handle function call in which compatibility mode is specified

A file in compatibility mode may be opened any number of times by a single process, unless the file is already open under one of the other four sharing modes. If the file has the read-only attribute, however, and it is currently open in Deny Write sharing mode with Read access, the file may be opened in Compatibility mode with Read access.

The file is opened in one of the other sharing modes. See the table below.

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>A file first opened in</th>
<th>May be reopened in</th>
</tr>
<tr>
<td>Deny Read/Write mode, Read Only access (AL=X0010000)</td>
<td>May not be reopened </td>
</tr>
<tr>
<td>Deny Read/Write mode, Write Only access (AL=X0010001)</td>
<td>May not be reopened</td>
</tr>
<tr>
<td>Deny Read/Write mode, Read/Write access (AL=X0010010)</td>
<td>May not be reopened</td>
</tr>
<tr>
<td>Deny Write mode, Read Only access (AL=X0100000)</td>
<td>Deny Write, Read Only (AL = x0100000)<br>
Deny None, Read Only (AL = x1000000)</td>
</tr>
<tr>
<td>Deny Write mode, Write Only access (AL=X0100001)</td>
<td>Deny Read, Read Only (AL = x0110000)<br>
Deny None, Read Only (AL = x1000000)</td>
</tr>
<tr>
<td>Deny Write mode, Read/Write access (AL=X0100010)</td>
<td>Deny None, Read Only (AL = x1000000)</td>
</tr>
<tr>
<td>Deny Read mode, Read Only access (AL = x0110000)</td>
<td>Deny Write, Write Only (AL = x0100001)<br>
Deny None, Write Only (AL = x1000001)</td>
</tr>
<tr>
<td>Deny Read mode, Write Only access (AL = x0110001)</td>
<td>Deny Read, Write Only (AL = x0110001)<br>
Deny None, Write Only (AL = x1000001)</td>
</tr>
<tr>
<td>Deny Read mode, Read/Write access (AL = x0110010)</td>
<td>Deny None, Write Only (AL = x1000001)</td>
</tr>
<tr>
<td>Deny None mode, Read Only access (AL = x1000000)</td>
<td>Deny Write, Read Only (AL = x0100000)<br>
Deny Write, Write Only (AL = x0100001)<br>
Deny Write, Read/Write (AL = x0100010)<br>
Deny None, Read Only (AL = x1000000)<br>
Deny None, Write Only (AL = x1000001)<br>
Deny None,  Read/Write (AL = x1000010)</td>
</tr>
<tr>
<td>Deny None mode, Write Only access (AL = x1000001)</td>
<td>Deny Read, Read Only (AL = x0110000)<br>
Deny Read, Write Only (AL = x0110001)<br>
Deny Read, Read/Write (AL = x0110010)<br>
Deny None, Read Only (AL = x1000000)<br>
Deny None, Write Only (AL = x1000001)<br>
Deny None, Read/Write (AL = x1000010)</td>
</tr>
<tr>
<td>Deny None mode, Read/Write access (AL = x1000010)</td>
<td>Deny None, Read Only (AL = x1000000)<br>
Deny None, Write Only (AL = x1000001)<br>
Deny None, Read/Write (AL = x1000010)</td>
</tr>
</table>
</div>

Files that end with a colon (devices) are not opened with this function call.

File sharing must be loaded for the sharing modes of this function to work.

Child processes that inherit files also inherit their sharing and access restrictions.

##### Interrupt 21H Service 62 : Close a file handle
Flush the file's buffers, close the file, and release the file handle.

<b>Input:</b><br>
AH = 3eh<br>
BX = File Handle

<b>Output:</b><br>
AX = Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle

Call Function 59h for extended error code information.

This function flushes the file's buffers, closes the file, releases the handle, and updates the directory.

##### Interrupt 21H Service 63 : Read from file or device using a handle
Read bytes from a file or device into a buffer.

<b>Input:</b><br>
AH = 3fh<br>
BX = File Handle<br>
CX = Number of bytes to read<br>
DS:DX = Address of buffer

<b>Output:</b><br>
AX = Number of bytes to read, or Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle

Call Function 59h for extended error code information (DOS 3.0 and above).

This function reads data from the file or device whose handle is in BX. Data is read starting at the location pointed to by the file pointer. The file pointer is incremented by the number of bytes read.

If the Carry Flag is not set and AX = 0, the file pointer was at the end of the file when the function was called.

If the Carry Flag is not set and AX is less than the number of bytes requested, either the function read to the end of the file, or an error occurred.

You can read bytes from anywhere in the file by calling function 42h to move to file poniter before reading data.

If the keyboard device is specified, this function reads either the specified number of bytes, or all
bytes up to the next carriage return, whichever is less. (If the number of bytes specified is at least
two larger than the number of characters typed, the carriage-return line-feed pair will be returned as
the last two bytes, and will count as two bytes.)

##### Interrupt 21H Service 64 : Write to file or device using a handle
Write bytes from a buffer to a file or buffer.

<b>Input:</b><br>
AH = 40h<br>
BX = File Handle<br>
CX = Number of bytes to write<br>
DS:DX = Address of buffer

<b>Output:</b><br>
AX = Number of bytes to written, or Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle

Call function 59h for extended error code information (DOS 3.0 and above).

This function writes data to the file or device whose handle is in BX. Data is written starting at the current file pointer. The file pointer is then incremented by the number of bytes written.

If a disk full condition is encountered, no error code will be returned (i.e., CF will not be set);
however, fewer bytes than requested will have been written. You should check for this condition by
testing for AX less than CX after returning from the function.

A file can be truncated my moving the file pointer to the new end of file (with function 42h) and
calling this function with CX = 0.

You can write bytes to anywhere in the file by calling function 42h to move to file poniter before
writing data.

Writing to a file marked "read-only" will generate an error code of 5, "access denied."

##### Interrupt 21H Service 65 : Delete file
Delete the named file.

<b>Input:</b><br>
AH = 41h<br>
DS:DX = Pointer to filespec (ASCIIZ string)

<b>Output:</b><br>
AX = Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied

Call Function 59h for extended error code information (DOS 3.0 and above).

This function removes the directory entry for the file whose pathname is given in the ASCIIZ string pointed to by DS:DX. Wildcard characters may not be used in the pathname specification. (Note that the corresponding FCB function, Function 13h, does permit wildcard characters.)

To delete a read-only file, first remove the read-only attribute with Function 43h.

##### Interrupt 21H Service 66 : Move file pointer (lseek)
Move the file-pointer the specified number of bytes from the beginning, end or current location, as determined by the
mode code in AL.

<b>Input:</b><br>
AH = 42h<br>
BX = File Handle<br>
CX:DX = Offset, in bytes (signed 32-bit integer)<br>
AL = Mode code

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>AL</th>
<th>Action</th>
</tr>
<tr>
<td>0</td>
<td>Move pointer CX:DX bytes from beginning of file</td>
</tr>
<tr>
<td>1</td>
<td>Move pointer CX:DX bytes from current location</td>
</tr>
<tr>
<td>2</td>
<td>Move pointer CX:DX bytes from end of file</td>
</tr>
</table>
</div>

<b>Output:</b><br>
DX:AX = New pointer location (signed 32-bit integer)<br>
AX = Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid mode code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle

Call Function 59h for extended error code information (DOS 3.0 and above).

This function changes the logical read/write position in the specified file, by incrementing or decrementing the value assigned to the file pointer. The offset to add to the file pointer is given as a signed 32-bit integer in the CX:DX register pair--the
 more significant portion of the offset in CX. A mode code, specified in AL, indicates whether the offset specified in CX:DX is referenced to the beginning of the file (mode 0), the pointer's current location (mode 1), or the end of the file (mode
  2).

No matter what mode is specified in AL, a positive offset value in CX:DX always increases the value of
the file pointer. Note that using mode 2 with a positive value in CX:DX will therefore move the file
pointer beyond the end of the file.

Use a mode code of 2 with an offset of 0 to move the file pointer to the end of the file, or to find the
length of the file.

It is possible to move the pointer to a location before the beginning of the file or after the end of
the file. Moving the pointer to a position before the start of the file will not generate an error,
but the next read or write operation will fail.

A file can be extended by moving the file pointer past the end of the file and writing one or more
bytes of data.

A file can be truncated my moving the file pointer to the new end of file and writing zero bytes using
function 40h.

##### Interrupt 21H Service 67 : Get or set file attributes (chmod)
Gets or sets the attributes of a specified file.

<b>To get attributes</b>

<b>Input:</b><br>
AH = 43h<br>
AL = 00h<br>
DS:BX = Pointer to filespec (ASCIIZ string)

<b>Output:</b><br>
CX = File's attributes<br>
AX = Error code, if CF is set

<b>To set attributes</b>

<b>Input:</b><br>
AH = 43h<br>
AL = 01h<br>
CX = Desired attributes<br>
DS:BX = Pointer to filespec (ASCIIZ string)

<b>Output:</b><br>
AX = Error code, if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid function code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Patch not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied

Call Function 59h for extended error code information (DOS 3.0 and above).

This function returns or sets the attribute byte of the specified file. To determine the current attributes, put 00h in
AL; the attribute byte is returned in CX. To set attributes, put 01h in AL and the desired attribute byte in CX.

The CX register specifies the attribute of the file you're creating, as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>CX</th>
<th>Attribute Specified</th>
</tr>
<tr>
<td>00h</td>
<td>Normal</td>
</tr>
<tr>
<td>01h</td>
<td>Read-only</td>
</tr>
<tr>
<td>02h</td>
<td>Hidden</td>
</tr>
<tr>
<td>04h</td>
<td>System</td>
</tr>
<tr>
<td>20h</td>
<td>Archive</td>
</tr>
</table>
</div>

Sum the values to combine attributes.

Setting any of the bits other than the above will generate an error.

##### Interrupt 21H Service 68 : I/O control for devices (IOCTL)
Passes information to a device (or file) or gets information from a device (or file).

<b>Input:</b><br>
AH = 44h<br>
AL = Subfunction<br>
BX = File handle<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)<br>
CX = Number of bytes to read or write<br>
DS:DX = Data or buffer

<b>Output:</b> See entries for each subfunction

Function 44h (IOCTL) offers a number of subfunctions (16 in DOS 3.3, 10 in DOS 3.0, 8 in DOS 2), all having to do with
the exchange of information between an application and a device (or file). Only subfunctions 00h, 06h, and 07h are defined for files. In all cases, the subfunction to be performed is determined by the value in AL, as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>AL</th>
<th>Subfunction</th>
</tr>
<tr>
<td>00h</td>
<td>Get device information (returned in DX)</td>
</tr>
<tr>
<td>01h</td>
<td>Set device information (from DX; DH must be 0)</td>
</tr>
<tr>
<td>02h</td>
<td>Read bytes from the device control channel into memory at DS:DX (character device)</td>
</tr>
<tr>
<td>03h</td>
<td>Write bytes from memory at DS:DX to the device control channel (character device)</td>
</tr>
<tr>
<td>04h</td>
<td>Read bytes from the device control channel into memory at DS:DX (block device)</td>
</tr>
<tr>
<td>05h</td>
<td>Write bytes from memory at DS:DX to the device control channel</td>
</tr>
<tr>
<td>06h</td>
<td>Get input status</td>
</tr>
<tr>
<td>07h</td>
<td>Get output status</td>
</tr>
<tr>
<td>08h</td>
<td>Is block device removable? (DOS 3.0 and later)</td>
</tr>
<tr>
<td>09h</td>
<td>Is logical device local or remote? (DOS 3.1 and later)</td>
</tr>
<tr>
<td>0ah</td>
<td>Is handle local or remote? (DOS 3.1 and later)</td>
</tr>
<tr>
<td>0bh</td>
<td>Change sharing retry count (DOS 3.0 and later)</td>
</tr>
<tr>
<td>0dh</td>
<td>Generic IOCTL request for block devices (DOS 3.2)</td>
</tr>
<tr>
<td>0eh</td>
<td>Get logical drive (DOS 3.2. and later)</td>
</tr>
<tr>
<td>0fh</td>
<td>Set logical drive letter (DOS 3.2 and later)</td>
</tr>
</table>
</div>

See the separate entries for specific information about each subfunction.

Only functions 00h, 06h, and 07h are defined for files.

Subfunctions 00h and 08h are not supported on network devices.  Subfunction 0Bh requires file sharing, which is loaded with the SHARE command.

##### Interrupt 21H Service 68-0 : IOCTL: Get device information
Gets device information.

<b>Input:</b><br>
AH = 44h<br>
AL = 00h<br>
BX = Device or File handle

<b>Output:</b><br>
AX = Error code if CF is set<br>
DX = Device information

Subfunction 00h returns device information in DX. Bit 7 of DX is 1 if the channel is a character device, and 0 if the
channel is a block device (disk file).

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">DX for Character Device (Bit 7 = 1)</th>
</tr>
<tr>
<th>Bit</th>
<th>Description</th>
</tr>
<tr>
<td>0</td>
<td>Set if standard console input device</td>
</tr>
<tr>
<td>1</td>
<td>Set if standard console output device</td>
</tr>
<tr>
<td>2</td>
<td>Set if this is a null device</td>
</tr>
<tr>
<td>3</td>
<td>Set if the device is a clock</td>
</tr>
<tr>
<td>4</td>
<td>Reserved</td>
</tr>
<tr>
<td>5</td>
<td>Set for binary mode, 0 for ASCII code</td>
</tr>
<tr>
<td>6</td>
<td>0 if the end of file (EOF) on input</td>
</tr>
<tr>
<td>7</td>
<td>Set to indicate a device (and not a file)</td>
</tr>
<tr>
<td>8-13</td>
<td>Reserved</td>
</tr>
<tr>
<td>14</td>
<td>Set if this device can process control strings via subfunctions 02h, 03h, 04h, and 05h</td>
</tr>
<tr>
<td>15</td>
<td>Reserved</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">DX for Disk File (Bit 7 = 0)</th>
</tr>
<tr>
<th>Bit</th>
<th>Description</th>
</tr>
<tr>
<td>0-5</td>
<td>Block device number</td>
</tr>
<tr>
<td>6</td>
<td>Set if the channel has been written</td>
</tr>
<tr>
<td>7</td>
<td>0 to indicate a block device</td>
</tr>
<tr>
<td>8-13</td>
<td>Reserved</td>
</tr>
<tr>
<td>14</td>
<td>Set if this device can process control strings via subfunctions 02h, 03h, 04h, and 05h</td>
</tr>
<tr>
<td>15</td>
<td>Reserved</td>
</tr>
</table>
</div>

##### Interrupt 21H Service 68-1 : IOCTL: Set device information
Sets device information.

<b>Input:</b><br>
AH = 44h<br>
AL = 01h<br>
BX = Device handle<br>
DH = 00h<br>
DL = Device information

<b>Output:</b><br>
AX = Error code if CF is set

Subfunction 01h sets device information for character devices, using the following encoding scheme in DX:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Bit</th>
<th>Description</th>
</tr>
<tr>
<td>0</td>
<td>Set if standard console input device</td>
</tr>
<tr>
<td>1</td>
<td>Set if standard console output device</td>
</tr>
<tr>
<td>2</td>
<td>Set if this is a null device</td>
</tr>
<tr>
<td>3</td>
<td>Set if the device is a clock</td>
</tr>
<tr>
<td>4</td>
<td>reserved</td>
</tr>
<tr>
<td>5</td>
<td>Set for binary mode, 0 for ASCII mode</td>
</tr>
<tr>
<td>6</td>
<td>0 if end of file (EOF) on input</td>
</tr>
<tr>
<td>7</td>
<td>Set to indicate a device (and not a file)</td>
</tr>
<tr>
<td>8-14</td>
<td>Must be 0</td>
</tr>
</table>
</div>

This subfunction is not supported for disk files.


##### Interrupt 21H Service 68-2 : IOCTL: Read from character device
Reads a control string from a character device.

<b>Input:</b><br>
AH = 44h<br>
AL = 02h<br>
BX = Device handle<br>
CX = Number of bytes to read<br>
DS:DX = Data or Buffer

<b>Output:</b><br>
AX = Error code if CF is set

This subfunction reads CX bytes of data from the character device's control channel into either DS:DX or memory pointed
to by DS:DX. How data is read is defined by the device driver.  Data can be read only if the device can process control
strings.

##### Interrupt 21H Service 68-3 : IOCTL: Write to character device
Writes a control string to a character device.

<b>Input:</b><br>
AH = 44h<br>
AL = 03h<br>
BX = Device handle<br>
CX = Number of bytes to write<br>
DS:DX = Data or Buffer

<b>Output:</b><br>
AX = Error code if CF is set

This subfunction writes CX bytes of data to the character device's control channel from either DS:DX or from memory
pointed to by DS:DX. How data is written is defined by the device driver.  Data can be written only if the device can process control strings.

##### Interrupt 21H Service 68-4 : IOCTL: Read from block device
Reads a control string from a block device.

<b>Input:</b><br>
AH = 44h<br>
AL = 04h<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)<br>
CX = Number of bytes to read<br>
DS:DX = Data or Buffer

<b>Output:</b><br>
AX = Number of bytes read<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Device doesn't support control strings<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Drive is invalid

This subfunction reads CX bytes of data from the block device's control channel into either DS:DX or the memory pointed
to by DS:DX. How data is written is defined by the device driver.  Data can be read only if the device can process
control strings.

##### Interrupt 21H Service 68-5 : IOCTL: Write to block device
Write a control string to a block device.

<b>Input:</b><br>
AH = 44h<br>
AL = 05h<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)<br>
CX = Number of bytes to write<br>
DS:DX = Data or Buffer

<b>Output:</b><br>
AX = Number of bytes written<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Device doesn't support control strings<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Drive is invalid

This subfunction writes CX bytes of data to the block device's control channel from either DS:DX or from memory pointed
to by DS:DX. How data is written is defined by the device driver. Data can be written only if the device can process
control strings.

##### Interrupt 21H Service 68-6 : IOCTL: Get input status
Checks to see if the device or file is ready for input.

<b>Input:</b><br>
AH = 44h<br>
AL = 06h<br>
BX = Device or file handle

<b>Output:</b><br>
<b>(File)</b><br>
AL = ffh : until EOF is reached<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : after EOF is reached

<b>(Device)</b><br>
AL = ffh : if device ready<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : if device not ready

This subfunction reports the input status of the device or file. AL returns FFh for ready and 00h for not ready (or end
of file).

##### Interrupt 21H Service 68-7 : IOCTL: Get output status
Checks to see if the device or file is ready for output.

<b>Input:</b><br>
AH = 44h<br>
AL = 07h<br>
BX = Device or file handle

<b>Output:</b><br>
<b>(File)</b><br>
AL = ffh : until EOF is reached<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : after EOF is reached

<b>(Device)</b><br>
AL = ffh : if device ready<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 00h : if device not ready

This subfunction reports the input status of the device or file. AL returns FFh for ready and 00h for not ready (or end
of file).

##### Interrupt 21H Service 68-8 : Is device removable?
Indicates whether or not a device has removable media.

<b>Input:</b><br>
AH = 44h<br>
AL = 08h<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)

<b>Output:</b><br>
AX = 00h : if device is removable<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if device is fixed<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0fh : if invalid drive specified<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code if CF is set

This subfunction (DOS 3.0 and later only) indicates whether or not a device has removable media (such as a floppy disk
or a removable cartridge hard disk). A value of 00h in AX means the device is removable; a value of 01h means it is fixed. AX returns an error code of 0Fh if an invalid drive has been specified in BL.

##### Interrupt 21H Service 68-9 : Is logical device remote?
Reports whether a block device is associated with a network directory.

<b>Input:</b><br>
AH = 44h<br>
AL = 09h<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)

<b>Output:</b><br>
DX = Bit 12 => 1 : if device is local<br>
DX = Bit 12 => 0 : if device is remote

This subfunction (DOS 3.1 and later only) allows you to determine whether a block device (specified in BL with
default=0, A=1, etc.) is associated with a network directory. For local devices, DX returns the attribute word from the device header; for remote devices, DX returns with bit 12 set.

##### Interrupt 21H Service 68-10 : Is handle remote?
Reports whether a device is local or remote.

<b>Input:</b><br>
AH = 44h<br>
AL = 0ah<br>
BX = Drive handle

<b>Output:</b><br>
AX = Bit 15 => 0 : if handle is local<br>
AX = Bit 15 => 1 : if handle is remote

This subfunction (DOS 3.1 and later only) allows you to determine whether a handle (specified in BX) is for a local or a
 remote device. For local handles, DX returns the attribute word from the device header; for remote devices, DX returns
 with bit 15 set.

##### Interrupt 21H Service 68-11 : Change sharing retry count
Specifies the retry count for cases when there is a resource conflict.

<b>Input:</b><br>
AH = 44h<br>
AL = 0bh<br>
CX = Number of times to execute delay loop<br>
DX = Number of retries

<b>Output:</b><br>
AX = Error code if CF is set

This subfunction (DOS 3.0 and later only) sets the two parameters that DOS uses in attempting to resolve file-sharing conflicts. Specify the number of retries in DX and the number of delay loops between retries in CX. The default values are 3 retries and 1 delay loop. SHARE needs to be loaded before using ths subfunction.

##### Interrupt 21H Service 68-13 : Generic IOCTL request
This subfunction provides low-level control over a block device.

<b>Input:</b><br>
AH = 44h<br>
AL = 0dh<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)<br>
CH = 08h (Major code)<br>
CL = Minor code:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 40h : Set device parameters<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 60h : Get device parameters<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 41h : Write track on logical device<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 61h : Read track on logical device<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 42h : Format and verify track on logical device<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 62h : Verify track on logical device<br>
DS:DX = Pointer to parameter block

##### Interrupt 21H Service 68-14 : Get logical drive
Returns the drive letter used most recently for block devices that have more than one logical drive letter.

<b>Input:</b><br>
AH = 44h<br>
AL = 0eh<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)

<b>Output:</b><br>
AL = 00h : if only one letter is assigned to the block device. Drive letter used most recently (1 = A, 2 = B, etc)<br>
AX = Error code if CF is set

Some block devices use more than one drive letter to refer to the same device.  For example, the floppy disk drive on a system with only one floppy disk drive can be referred to as either A: or B:. This function tells both if more than one drive letter refers to a device and, if so, which drive letter was used most recently.

Function 440Fh can be used to set the most-recent drive letter used for a device.

##### Interrupt 21H Service 68-15 : Set logical drive
Sets the drive letter used most recently to refer to a device that has more than one drive letter.

<b>Input:</b><br>
AH = 44h<br>
AL = 0fh<br>
BL = Drive number (0 = default, 1 = A, 2 = B, etc)

<b>Output:</b><br>
AL = 00h : if only one letter is assigned to the block device. Highest letter assigned to block device (1 = A, 2 = B, etc)<br>
AX = Error code if CF is set

Some block devices use more than one drive letter to refer to the same device.  For example, the floppy disk drive on a system with only one floppy disk drive can be referred to as either A: or B:. This function sets the drive letter used most recently to refer to a drive.


Function 440Eh can be used to get the most recent drive letter used to refer to a device.

If you issue an I/O operation using a drive letter other than the most recently used drive letter, DOS will issue a message "Insert diskette for...". You can avoid this message by changing the current drive letter before issuing any I/O function calls.

##### Interrupt 21H Service 69 : Duplicate a file handle
Creates a new file handle by duplicating the existing handle of an open file or device. The new handle shares the
existing file pointer.

<b>Input:</b><br>
AH = 45h<br>
BX = File handle

<b>Output:</b><br>
AX = Duplicate file handle<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : no handles available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle

Call Function 59h for extended error code information (DOS 3.0 and above).

Function 45h (DUP) returns a new file handle that refers to the same file or device as the old file handle specified in BX.

Moving the file pointer of either handle by a Read, Write, or Lseek causes the other handle to be changed also. However, closing one handle does not close the other.

By duplicating a handle and closing one of the handles, you can flush the file to disk and update the directory; since the other handle will still be open, you won't need to re-open the file, a time-consuming process.

##### Interrupt 21H Service 70 : Force handle duplication
Force one handle to refer to the same file as another handle. (Both handles must already exist)

<b>Input:</b><br>
AH = 46h<br>
BX = First file handle<br>
CX = Handle to be changed

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : no handles available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle

Call Function 59h for extended error code information (DOS 3.0 and above).

This function causes the second handle (in CX) to refer to the same file, at the same location, as the first handle (in BX). If the second handle refers to an open file, that file is closed before the handle is set equal to the first handle.

##### Interrupt 21H Service 71 : Get current directory
Reports the full pathname of the current directory.

<b>Input:</b><br>
AH = 47h<br>
BX = Drive number (0 = default, 1 = A, 2 = B, etc)<br>
DS:SI = Pointer to a 64-byte buffer

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 15 : Invalid drive specified

Call Function 59h for extended error code information (DOS 3.0 and above).

This function returns the full pathname of the current directory, excluding the drive designator and initial backslash
character, as an ASCIIZ string at the memory buffer pointed to by DS:SI.

The pathname may be as long as 63 bytes (without the initial backslash), plus the terminating zero byte.
If the current directory is the root, the function returns a null ASCIIZ string (that is, the first
byte of the buffer will be zero).

In some versions of DOS prior to 3.0, the pathname can contain members that are longer than the 12-character limit for file names.  For example, this function under DOS 2.0 returns "directoryname\subdir" if the directory path "\director\subdir" exists and the user typed
"cd \directoryname\subdir".  Note that this path is in lower case and contains too many characters. DOS
3.0 and above always return a correct path name in upper case -- "DIRECTOR\SUBDIR" in this case.

##### Interrupt 21H Service 72 : Allocate memory
Allocates a specified number of memory paragraphs.

<b>Input:</b><br>
AH = 48h<br>
BX = Number of memory  paragraphs to be allocated

<b>Output:</b><br>
AX = Segment address of allocated memory<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7 : Memory control blocks destroyed<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8: Insufficient memory<br>
BX = Size of largest available block (CF set)

Call Function 59h for extended error code information (DOS 3.0 and above).

Function 48h dynamically allocates memory, in multiples of 16 bytes (one paragraph). The amount of memory to be
allocated, in paragraphs, is specified in BX. If the function is successful, AX:0000 points to the allocated memory block. (AX holds the segment address; the offset is always 0000).

By setting BX=FFFFh before calling, this function can be used to find the amount of available memory, which will be returned in BX. (The call will return an error, which can be ignored, since DOS cannot allocate more than 640k of memory.)


##### Interrupt 21H Service 73 : Free Allocated memory
Releases memory that was allocated via function 48h.

<b>Input:</b><br>
AH = 49h<br>
ES = Segment address of memory to be released

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7 : Memory control blocks destroyed<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9 : Invalid memory block address

Call Function 59h for extended error code information (DOS 3.0 and above).

This function returns to DOS the memory that was allocated by means of Function 48h. ES points to the segment address of the block that is being returned; this is the same value that Function 48h returned in AX.

##### Interrupt 21H Service 74 : Modify memory allocation
Changes the size of a memory block that was allocated by function 48h.

<b>Input:</b><br>
AH = 4ah<br>
BX = New block size, in paragraphs<br>
ES = Segment address of the memory block to be modified

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7 : Memory control block destroyed<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8 : Insufficient memory<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9 : Invalid block address

Call Function 59h for extended error code information (DOS 3.0 and above).

This function is used to increase or decrease the size of a memory block allocated by Function 48h. ES contains the
segment address of the block whose size will be changed. BX contains the new size of the block, in paragraphs (16-bytes
units).

##### Interrupt 21H Service 75 : Load or execute a program (exec)
Loads a subprogram into memory and (optionally) executes it.

<b>Input:</b><br>
AH = 4bh<br>
AL = 00h : to load and run<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03h : to load but not run<br>
DS:DX = Pointer to a ASCII Z string specifying pathname of subprogram<br>
ES:BX = Pointer to a parameter block

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid function number<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8 : Insufficient memory<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10 : Invalid environment<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11 : Invalid format

Function 4Bh (EXEC) allows a program to load a subprogram into memory and, optionally, execute it.

If AL is 00h, the subprogram is loaded, a PSP is created, and the program is executed. The terminate and Ctrl-Break
vectors are set to the instruction following the EXEC call, so that control returns to the calling program as soon as the subprogram ends.

If AL is 03h, the subprogram is loaded, no PSP is created, and the subprogram is not automatically executed, although
your program can jump to it.

Load the DS:DX register pair with a pointer to an ASCIIZ string containing the drive, path, and filename of the file to
be brought into memory. And load the ES:BX pair with a pointer to a parameter block to be passed to the incoming subprogram. The parameter block layout is as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="3">For subfunction 00h (load and run)</th>
</tr>
<tr>
<th>Offset</th>
<th>Size (bytes)</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>2</td>
<td>Segment address of environment strings</td>
</tr>
<tr>
<td>02h</td>
<td>4</td>
<td>Segment and offset of command line</td>
</tr>
<tr>
<td>06h</td>
<td>4</td>
<td>Segment and offset of first default FCB</td>
</tr>
<tr>
<td>0ah</td>
<td>4</td>
<td>Segment and offset of second default FCB</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="3">For subfunction 03h</th>
</tr>
<tr>
<td>Offset</td>
<td>Size (bytes)</td>
<td>Description</td>
</tr>
<tr>
<td>00h</td>
<td>2</td>
<td>Segment address where file is to be loaded</td>
</tr>
<tr>
<td>02h</td>
<td>2</td>
<td>Relocation factor for program (applies only to exe-format program)</td>
</tr>
</table>
</div>

The environment strings, which must be paragraph-aligned, consists of a sequence of ASCIIZ strings followed by a byte of 00h after all the strings. Each ASCIIZ string typically takes the form of parameter=value. The total environment string must be less than 32K in length. If the segment for the environment strings is set to 00h, the subprogram inherits the environment of the calling program.

Note that the subprogram always recieves a copy of the environment string, so that any changes made to the subprogram's environment won't be reflected in calling program's environment.

When a subprogram is loaded and executed, all open file handles are available to the subprogram. That means, among other things, that the calling program can redirect standard input and output for the subprogram. The only file handles that are not available to the subprogram are those that were opened with the inheritance bit set to 1 (see Function 3Dh).

Before using Function 4Bh, you must release enough memory to load the subprogram (using function 4Ah).

This function changes all registers, including the stack registers. Therefore, before calling a subprogram, save SS and SP in variables inside your program code.

The EXEC function call uses the loader in COMMAND.COM to load programs.

##### Interrupt 21H Service 76 : Terminate a process (exit)
Ends a program and returns a code to the calling process.

<b>Input:</b><br>
AH = 4ch<br>
AL = Return code

<b>Output:</b> none

This function is the proper method of terminating a program in DOS versions 2.0 and above. It closes all files, and
hands control back to the parent process (usually COMMAND.COM), along with the return code specified in AL.

The return code may be tested by means of Function 4Dh or the DOS ERRORLEVEL command.

##### Interrupt 21H Service 77 : Get return code of a subprocess (wait)
Gets a return code from a terminated subprocess.

<b>Input:</b><br>
AH = 4dh

<b>Output:</b><br>
AX = Return code

This function retrieves the return code from a process that has been terminated via Function 4Ch (EXIT) or Function 31h (Terminate and Stay Resident). There are two parts to the information returned: AL reports the return code issued by the terminating program itself; AH reports the manner in which it was terminated. The possible values in AH are:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>00h</td>
<td>Normal termination</td>
</tr>
<tr>
<td>01h</td>
<td>terminated via ctrl-break or ctrl-c</td>
</tr>
<tr>
<td>02h</td>
<td>terminated by DOS because of critical device error</td>
</tr>
<tr>
<td>03h</td>
<td>terminated via function 31h, terminate and stay resident</td>
</tr>
</table>
</div>

##### Interrupt 21H Service 78 : Find first matching file (find first)
Finds the first filename matching the specified filespec, and provides information at the current Disk Transfer Address (DTA).

<b>Input:</b><br>
AH = 4eh<br>
CX = File attribute<br>
DS:DX = Pointer to filespec (ASCIIZ string)

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 18 : No more files to be found

Call Function 59h for extended error code information (DOS 3.0 and above).

This function searches for the first filename matching the filespec (ASCIIZ string pointed to by DS:DX). The filespec
may include a drive letter and path, and the filename can include wildcard characters.

The function returns information in a 43-byte area at the current DTA. The information is formatted as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Size</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>21</td>
<td>Used by DOS for find-next processing (function 4fh)</td>
</tr>
<tr>
<td>15h</td>
<td>1</td>
<td>Attribute of file found</td>
</tr>
<tr>
<td>16h</td>
<td>2</td>
<td>Time stamp of file</td>
</tr>
<tr>
<td>18h</td>
<td>2</td>
<td>Date stamp of file</td>
</tr>
<tr>
<td>1ah</td>
<td>4</td>
<td>File size in bytes</td>
</tr>
<tr>
<td>1eh</td>
<td>13</td>
<td>Filename and extension, as an ASCIIZ string</td>
</tr>
</table>
</div>

The filename and extension are reported in conventional notation, with blanks removed and a period between the filename and the extension. If the file has no extension, the period is suppressed.

You can search for the next matching file using
function 4Fh (Find Next Matching File).

Function 1Ah can be used to set the DTA (Disk Transfer Address).

You can control the scope of the search by entering an attribute byte in CX. If CX is 0, the function
searches for normal files only. If CX specifies any combination of the hidden, system, or directory
attribute bits, the search matches normal files and also any files with those attributes. If CX
specifies the volume label attribute, the function looks only for entries with the volume label
attribute. The archive and read-only attribute bits have no effect on the search operation.

##### Interrupt 21H Service 79 : Find next matching file (find next)
Finds the next matching file (after a previous call to function 4eh or 4fh call) and returns information at the current Disk Transfer Address (DTA).

<b>Input:</b><br>
AH = 4fh

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 18 : No more files to be found

Call Function 59h for extended error code information (DOS 3.0 and above).

Function 4Fh continues the file search that was begun by Function 4Eh, returning 43 bytes of information at the current DTA address. The information is formatted as in Function 4Eh:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>Offset</th>
<th>Size</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>21</td>
<td>Used by DOS for find-next processing</td>
</tr>
<tr>
<td>15h</td>
<td>1</td>
<td>Attribute of file found</td>
</tr>
<tr>
<td>16h</td>
<td>2</td>
<td>Time stamp of file</td>
</tr>
<tr>
<td>18h</td>
<td>2</td>
<td>Date stamp of file</td>
</tr>
<tr>
<td>1ah</td>
<td>4</td>
<td>File size in bytes</td>
</tr>
<tr>
<td>1eh</td>
<td>13</td>
<td>Filename and extension, as an ASCIIZ string</td>
</tr>
</table>
</div>

The filename and extension are reported in conventional notation, with blanks removed and a period between the filename and the extension. If the file has no extension, the period is suppressed.

##### Interrupt 21H Service 80, Service 81, Service 82, Service 83 : Reserved
<br>

##### Interrupt 21H Service 84 : Get VERIFY setting
Returns the current state of the system VERIFY flag.

<b>Input:</b><br>
AH = 54h

<b>Output:</b><br>
AL = 00h : if VERIFY is off<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : if VERIFY is on

Function 54h returns in AL the current state of the system VERIFY flag. The VERIFY flag may be set by means of Function
2Eh, or via the DOS VERIFY command.

##### Interrupt 21H Service 85 : Reserved
<br>

##### Interrupt 21H Service 86 : Rename a file
Rename a file, move a file to a different directory on the same disk or both.

<b>Input:</b><br>
AH = 56h<br>
DS:DX = Pointer to an ASCIIZ string containing original path and filename<br>
ES:DI = Pointer to an ASCIIZ string containing new path and filename

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 17 : Not the same device

Call Function 59h for extended error code information (DOS 3.0 and above).

This function renames a file, moves a file to a different directory on the same disk, or both.

If a drive designator is included in the new filename, it must be the same as the one included or implied in the original filename.

Wildcard characters cannot be included in the filenames.

##### Interrupt 21H Service 87 : Get or set a file's date and time
Gets or sets a file's date and time.

To get a file's date and time:

<b>Input:</b><br>
AH = 57h<br>
AL = 00h<br>
BX = File handle

<b>Output:</b><br>
AX = Error code if CF is set<br>
CX = TIme<br>
DX = Date

To set a file's date and time:

<b>Input:</b><br>
AH = 57h<br>
AL = 01h<br>
BX = File handle<br>
CX = Time<br>
DX = Date

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : invalid function number in AL<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : invalid handle

Function 57h gets or sets the date and time for a file that has been opened with a file handle (such as with function 3Dh).

The date and time are defined as follows:

CX = Time = Hour * 2048 + Minute * 32 + Second / 2

DX = Date = (Year - 1980) * 512 + Month * 32 + Day

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>CX Bits</th>
<th>Description</th>
</tr>
<tr>
<td>11 - 15</td>
<td>Hours (0..23)</td>
</tr>
<tr>
<td>5 - 10</td>
<td>Minutes (0..59)</td>
</tr>
<tr>
<td>0 - 4</td>
<td>Seconds/2 (0..30)</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>DX Bits</th>
<th>Description</th>
</tr>
<tr>
<td>9 - 15</td>
<td>Year since 1980 (0..119)</td>
</tr>
<tr>
<td>5 - 8</td>
<td>Month (1..12)</td>
</tr>
<tr>
<td>0 - 4</td>
<td>Day (1..31)</td>
</tr>
</table>
</div>

Contrary to what some DOS documentation says, the date and time are returned in the conventional
format, with the high-order part in CH and DH and the low-order part in CL and DL.

##### Interrupt 21H Service 89 : Get extended error information
Returns diagnostic information following an unsuccessful DOS function call or interrupt 24h.

<b>Input:</b><br>
AH = 59h<br>
BX = 0000h for DOS 3.0 and above

<b>Output:</b><br>
AX = Extended error code<br>
BH = Error class<br>
BL = Suggested action<br>
CH = Locus (source of error)

<b>Register destroyed:</b> CL, DX, SI, DI, ES, and DS are all changed

This function returns detailed diagnostic information about an error condition. It can be used from inside a critical-error (Interrupt 24h) handler; after a DOS function call that reports an error by setting the Carry Flag; and after an FCB file operation that reports a return code of FFh.

<div style="overflow:auto;">
<table class ="table table-bordered">
<tr>
<th colspan="2">Values returned in AX (extended error code)</th>
</tr>
<tr>
<th>AX</th>
<th>Extended error code</th>
</tr>
<tr>
<td>01h</td>
<td>Invalid function number</td>
</tr>
<tr>
<td>02h</td>
<td>File not found</td>
</tr>
<tr>
<td>03h</td>
<td>Path not found</td>
</tr>
<tr>
<td>04h</td>
<td>Too many open files</td>
</tr>
<tr>
<td>05h</td>
<td>Access denied</td>
</tr>
<tr>
<td>06h</td>
<td>Invalid handle</td>
</tr>
<tr>
<td>07h</td>
<td>Memory control block destroyed</td>
</tr>
<tr>
<td>08h</td>
<td>Insufficient memory</td>
</tr>
<tr>
<td>09h</td>
<td>Invalid memory block address</td>
</tr>
<tr>
<td>0ah</td>
<td>Invalid environment</td>
</tr>
<tr>
<td>0bh</td>
<td>Invalid format</td>
</tr>
<tr>
<td>0ch</td>
<td>Invalid access code</td>
</tr>
<tr>
<td>0dh</td>
<td>Invalid data</td>
</tr>
<tr>
<td>0fh</td>
<td>Invalid disk drive</td>
</tr>
<tr>
<td>10h</td>
<td>Attempt to remove current directory</td>
</tr>
<tr>
<td>11h</td>
<td>Not the same device</td>
</tr>
<tr>
<td>12h</td>
<td>No more fiels</td>
</tr>
<tr>
<td>13h</td>
<td>Disk is write-protected</td>
</tr>
<tr>
<td>14h</td>
<td>Unknown unit</td>
</tr>
<tr>
<td>15h</td>
<td>Drive not ready</td>
</tr>
<tr>
<td>16h</td>
<td>Unknown command</td>
</tr>
<tr>
<td>17h</td>
<td>Data error (CRC)</td>
</tr>
<tr>
<td>18h</td>
<td>Bad request structure length</td>
</tr>
<tr>
<td>19h</td>
<td>Seek error</td>
</tr>
<tr>
<td>1ah</td>
<td>Unknown medium type</td>
</tr>
<tr>
<td>1bh</td>
<td>Sector not found</td>
</tr>
<tr>
<td>1ch</td>
<td>Printer out of paper</td>
</tr>
<tr>
<td>1dh</td>
<td>Write fault</td>
</tr>
<tr>
<td>1eh</td>
<td>Read fault</td>
</tr>
<tr>
<td>1fh</td>
<td>General failure</td>
</tr>
<tr>
<td>20h</td>
<td>Sharing violation</td>
</tr>
<tr>
<td>21h</td>
<td>Lock violation</td>
</tr>
<tr>
<td>22h</td>
<td>Invalid disk change</td>
</tr>
<tr>
<td>23h</td>
<td>FCB unavailable</td>
</tr>
<tr>
<td>50h</td>
<td>File already exists</td>
</tr>
<tr>
<td>52h</td>
<td>Cannot make directory</td>
</tr>
<tr>
<td>53h</td>
<td>Critical error</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Value returned in BH (error class)</th>
</tr>
<tr>
<th>BX</th>
<th>Error Class</th>
</tr>
<tr>
<td>01h</td>
<td>Out of resource</td>
</tr>
<tr>
<td>02h</td>
<td>Temporary problem that can be expected to go away</td>
</tr>
<tr>
<td>03h</td>
<td>Authorization (permission) problem</td>
</tr>
<tr>
<td>04h</td>
<td>Internal error (i.e., a system software bug)</td>
</tr>
<tr>
<td>05h</td>
<td>Hardware problem (not the fault of your program)</td>
</tr>
<tr>
<td>06h</td>
<td>System software failure</td>
</tr>
<tr>
<td>07h</td>
<td>Application program error</td>
</tr>
<tr>
<td>08h</td>
<td>File or other item not found</td>
</tr>
<tr>
<td>09h</td>
<td>File or other item of invalid or unsuitable format or type</td>
</tr>
<tr>
<td>0ah</td>
<td>File or other item interlocked</td>
</tr>
<tr>
<td>0bh</td>
<td>Media problem (e.g. CRC probem, wrong disk in drive)</td>
</tr>
<tr>
<td>0ch</td>
<td>Collision with existing item</td>
</tr>
<tr>
<td>0dh</td>
<td>other (unclassified)</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Values returned in BL (suggested action)</th>
</tr>
<tr>
<th>BL</th>
<th>Suggested Action</th>
</tr>
<tr>
<td>01h</td>
<td>Retry a few times</td>
</tr>
<tr>
<td>02h</td>
<td>Pause, then retry</td>
</tr>
<tr>
<td>03h</td>
<td>Ask user to resupply input</td>
</tr>
<tr>
<td>04h</td>
<td>Abort with cleanup (orderly shutdown)</td>
</tr>
<tr>
<td>05h</td>
<td>Immediate abort (do not pass GO)</td>
</tr>
<tr>
<td>06h</td>
<td>Ignore</td>
</tr>
<tr>
<td>07h</td>
<td>Ask user for remedial action (e.g. insertion of diskette), then retry</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Values returned in CH (source of error)</th>
</tr>
<tr>
<th>CH</th>
<th>Source of error</th>
</tr>
<tr>
<td>01h</td>
<td>Unknown</td>
</tr>
<tr>
<td>02h</td>
<td>Block device (disk)</td>
</tr>
<tr>
<td>03h</td>
<td>Network</td>
</tr>
<tr>
<td>04h</td>
<td>Serial device</td>
</tr>
<tr>
<td>05h</td>
<td>Memory</td>
</tr>
</table>
</div>
<br>

Since new error codes may be added from time to time, your program should be able to gracefully handle unrecognized
error codes.

##### Interrupt 21H Service 90 : Create unique file
Creates an unique filename, then opens that file in the specified directory.

<b>Input:</b><br>
AH = 5ah<br>
CX = File attribute<br>
DS:DX = Pointer to path ending in \ (ASCIIZ string)

<b>Output:</b><br>
DS:DX = Pointer to filename (ASCIIZ string)<br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied

Call Function 59h for extended error code information.

Function 5Ah creates a file, and opens it in compatibility mode with Read/Write access. This function is often used to
create temporary files, but note that DOS does not automatically delete the file when the program terminates.

The pathname must end with a backslash character.

Reserve 13 bytes following the pathname so that DOS can append name of the newly created file.

##### Interrupt 21H Service 91 : Create new file
Create the specified file, if the file does not already exist.

<b>Input:</b><br>
AH = 5bh<br>
CX = File attributes<br>
DS:DX = Pointer to pathname (ASCIIZ string)

<b>Output:</b><br>
AX = Handle<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : No handle available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 80 : File already exists

Call Function 59h for extended error code information.

This function will create a file if and only if it does not already exist.

This function is identical to Function 3Ch (Create File) if the specified file does not already exist.
If the file does exist, however, this function will fail, whereas 3Ch will truncate the existing file to
zero length, and then open it.

##### Interrupt 21H Service 92 : Lock/unlock file access
Denies or permits access to a specified region of a file.

<b>Input:</b><br>
AH = 5ch<br>
AL = 00h : to lock a file<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : to unlock a file<br>
BX = File handle<br>
CX = Offset of region (high-order word)<br>
DX = Offset of region (low-order word)<br>
SI = Length of region (high-order word)<br>
DI = Length of region (low-order word)

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid function code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6 : Invalid handle<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 33 : File-locking violation (specified region is already locked)

This function is used to lock or unlock a selected portion of a file, preventing or allowing access to that region by other processes in a multitasking or networking environment.

CX and DX together make up a 4-byte integer that specifies the byte offset into the file of the
region to be locked or unlocked; SI and DI make up a 4-byte integer specifying the length of the region.

Terminating a process that has an open file with a locked region, or closing a file with a locked
region, has undefined results. If your program can be aborted via Int 23h or 24h, you should ensure
that the locks are released before terminating the program.

The unlocking operation must specify exactly the same file region as the locking operation.

A child process (i.e., a process created via the EXEC system call), does not inherit access to
regions of a file that were locked by its parent.

Use this function in the following file modes:
* Deny read sharing mode
* Deny none sharing mode
* Deny write sharing mode, and file opened for read/write
* Deny write sharing mode, and file opened for write only

##### Interrupt 21H Service 93 : Reserved
<br>

##### Interrupt 21H Service 94-0 : Get machine name
On system equipped with IBM PC Network or Microsoft Networks, returns the ASCIIZ name of the local computer.

<b>Input:</b><br>
AH = 5eh<br>
AL = 00h<br>
DS:DX = Pointer to a memory buffer (16 bytes) where computer name will be returned

<b>Output:</b><br>
CH = 0 : name not defined<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; not 0 : name is defined<br>
CL = NETBIOS name number (if CH not 0)<br>
DS:DX = Pointer to computer name (ASCIIZ string)<br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : network not loaded

This subfunction of 5Eh returns an ASCIIZ string containing the text of the local computer name. The string is padded
with spaces to a length of 15 characters.

##### Interrupt 21H Service 94-2 : Set printer setup
Specifies the setup string to be put at the front of files destined for a printer on the IBM PC Network or Microsoft
Network.

<b>Input:</b><br>
AH = 5eh<br>
AL = 02h<br>
BX = Redirection list index<br>
CX = Length of setup string (maximum 64 bytes)<br>
DS:DX = Pointer to a memory buffer (16 bytes) where computer name will be returned

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Network not loaded

Call Function 59h for extended error code information.

This subfunction of function 5Eh allows individual users on a network to specify their own setup strings for a shared
printer. This setup string will be prefixed to all files sent to the printer from this node.

This function is called with a redirection list index in BX; this index value may be determined by calling function 5F02h (Get Redirection List Entry).

The setup string must be no longer than 64 bytes.

This function is available only in DOS version 3.1 and later, and requires that the IBM PC Network or Microsoft Networks program be running.

Since the redirection index value may change between the time the redirection list is scanned and this
function call is issued, you should call this function immediately after calling Function 5F02h,
Get Redirection List Entry. (A call to function 5F03h (Redirect Device) or 5F04h (Cancel
Redirection) could cause the redirection list entry to change.)

##### Interrupt 21H Service 94-3 : Get printer setup
Reads the setup string currently being used for files printed on a network printer.

<b>Input:</b><br>
AH = 5eh<br>
AL = 03h<br>
BX = Redirection list index<br>
ES:DI = Pointer to 64-byte memory buffer

<b>Output:</b><br>
CX = Length of setup string<br>
ES:DI = Pointer to memory buffer containing returned setup string<br>
AX = Error code if CF is set

Call Function 59h for extended error code information.

This function returns the local user's printer setup string for a shared printer, which was set via function FE02h.

This function is called with a redirection list index in BX; this index value may be determined by
calling of function 5F02h (Get Redirection List Entry).

The setup string will not be longer than 64 bytes.

This function is available only in DOS version 3.1 and later, and requires that the IBM PC Network or Microsoft Networks program be running.

Since the redirection index value may change between the time the redirection list is scanned and this
function call is issued, you should call this function immediately after calling Function 5F02h,
Get Redirection List Entry. (A call to function 5F03h (Redirect Device) or 5F04h (Cancel
Redirection) could cause the redirection list entry to change.)

##### Interrupt 21H Service 95-2 : Get redirection list entry
Returns information on one entry in the network redirection list.

<b>Input:</b><br>
AH = 5fh<br>
AL = 02h<br>
BX = Index into redirection list<br>
DS:SI = Pointer to a 128-byte buffer for local device name<br>
ES:DI = Pointer to a 128-byte buffer for network name

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Network not loaded<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 18 : No more files<br>
BH = Device status flag<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bit 0 = 0 if device is valid<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bit 0 = 1 if device is invalid<br>
BL = Device type (3 = printer, 4 = disk drive)<br>
CX = Parameter saved via function 5f03h

<b>Register destroyed:</b> DX and BP are both changed

Subfunction 02 of Function 5Fh returns an entry in the network redirection list. The list itself is created via
Subfunction 03.

To call Subfunction 02, place the index value you wish to inspect in BX. The local device name will be returned in a
16-byte area pointed to by DS:SI, and its network name will be returned in a 128-byte area pointed to by ES:DI. BL returns a device-type code (3 for a printer, 4 for a disk drive), and CX returns a parameter (specified by means of Subfunction 03) associated with the device.

To list all devices on the network, execute this function repeatedly, starting with an index (BX) value of 00h, incrementing BX by 1 until AX reports an error code of 18.

##### Interrupt 21H Service 95-3 : Redirect device
Redirects I/O from a local printer or disk drive to a device on the network.

<b>Input:</b><br>
AH = 5fh<br>
AL = 03h<br>
BL = Device type (3 = printer, 4 = disk drive)<br>
CX = Saved parameter (all values but 0 are reserved)<br>
DS:SI = Pointer to an ASCIIZ string containing local device name<br>
ES:DI = Pointer to an ASCIIZ string containing network path followed by an ASCIIZ string containing a password

<b>Output:</b><br>
AX = Error code if CF is set<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : network not loaded<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8 : insufficient memory

This function allows you to redirect I/O from a local printer or disk drive to a network device.  You can also control access to the network device by means of a password.

Call this function with a device type code in BL (3 for a printer or 4 for a disk drive), and a 0 in CX. DS:SI should point to the name of the device you wish to redirect, and ES:DI should point to an ASCIIZ string giving the name of the destination
network. The network name must be followed by a second ASCIIZ string specifying a password. The password may be 0 to 8 characters in length; to specify no password, provide a null ASCIIZ string (a 0 byte).

If the redirected device is a printer, acceptable names are PRN, LPT1, LPT2, and LPT3. If the redirected device is a disk drive, the source ASCIIZ string should consist of a drive letter followed by a colon.

The source ASCIIZ string may also be null; in this case, DOS attempts to provide access to the network name with the specified password.

##### Interrupt 21H Service 95-4 : Cancel redirection
Cancels a previous established network redirection.

<b>Input:</b><br>
AH = 5fh<br>
AL = 04h<br>
BL = Device type (3 = printer, 4 = disk drive)<br>
CX = Saved parameter (all values but 0 are reserved)<br>
DS:SI = Pointer to an ASCIIZ string specifying either the local device to cancel or its associated network name

<b>Output:</b><br>
AX = Error code if CF is set

This function undoes a previously established network redirection link. DS:SI points to the name of the link to cancel,
and it may contain a printer name (PRN, LPT1, LPT2, or LPT3), a drive designator, or the network name (in the last case, the ASCIIZ string should be followed by a second ASCIIZ string giving the password associated with the link).

##### Interrupt 21H Service 96, Service 97 : Reserved<br>

##### Interrupt 21H Service 98 : Get PSP address
Returns the segment address of the Program Segment Prefix (PSP) for the current process.

<b>Input:</b><br>
AH = 62h

<b>Output:</b><br>
BX = Segment of the PSP

Function 62h returns in BX the address of the PSP for the program that is currently running.

#### Interrupt 22H (<code>int 22h</code>) Terminate Address
Contains the address to which a program transfers control upon termination. When a program is executed, DOS copies this
address into offset 0Ah through ODh of the Program Segment Prefix. DOS normally sets this address when it executes a program with the EXEC function call.

#### Interrupt 23H (<code>int 23h</code>) Break Address
Contains the address to which control is passed in response to a Break-key action. When a program is executed, DOS
copies this address into offset 0Eh through 11h of the Program Segment Prefix.

The Break action is generated either by Ctrl-C or (on the IBM PC family and many clones) Ctrl-Break. Normally, DOS
checks for a Break only during character I/O functions. With extended Break checking in effect (see Interrupt 21h, Function 33h), DOS checks for Break during any I/O function.

#### Interrupt 24H (<code>int 24h</code>) Critical-Error Handler Address
Contains the address to which control is passed in response to a "critical" (usually hardware) error. When a program is
executed, DOS copies this address into offset 12h through 15h of the Program Segment Prefix.

When the critical error handling routine is invoked, the following diagnostic information is available:

<p>1. Bit 7 of AH is clear if the error is related to a disk operation. If bit 7 of AH is set, it usually means the
error is not a disk error (although an error in a disk's FAT can still result in bit 7 of AH being set)</p>

<p>2. If Bit 7 of AH is clear, AL returns the disk drive ID number (0=A, 1=B, etc.), and bits 0 through 2 of AH provide further information, as follows:</p>

<pre>Bit 2 1 0
    . . 0     Read error
    . . 1     Write error
    0 0 .     Error involving DOS system files
    0 1 .     Error involving the FAT</pre>

<p>3. BP:SI point to a device header control block</p>

<p>4. The low-order byte of DI provides the following information (the high-order byte of DI is undefined):</p>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<td>00h</td>
<td>Write-protect error</td>
</tr>
<tr>
<td>01h</td>
<td>Invalid drive number</td>
</tr>
<tr>
<td>02h</td>
<td>Drive not ready</td>
</tr>
<tr>
<td>03h</td>
<td>Invalid command</td>
</tr>
<tr>
<td>04h</td>
<td>CRC error</td>
</tr>
<tr>
<td>05h</td>
<td>Bad request structure length</td>
</tr>
<tr>
<td>06h</td>
<td>Seek error</td>
</tr>
<tr>
<td>07h</td>
<td>Unknown medium; disk format not recognized</td>
</tr>
<tr>
<td>08h</td>
<td>Sector not found</td>
</tr>
<tr>
<td>09h</td>
<td>Printer out of paper</td>
</tr>
<tr>
<td>0ah</td>
<td>Write error</td>
</tr>
<tr>
<td>0bh</td>
<td>Read Error</td>
</tr>
<tr>
<td>0ch</td>
<td>General, nonspecific error</td>
</tr>
</table>
</div>
<br>

<p>5. The stack contains the complete register set of the program that issued the DOS function call that ended in the critical error. To retrieve this information, first perform the following instructions:</p>

<pre>push bp
mov bp,sp</pre>

The stack will then be structured as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>BP Offset</th>
<th>Stack contents</th>
</tr>
<tr>
<td>00h</td>
<td>BP value that you pushed</td>
</tr>
<tr>
<td>02h</td>
<td>IP:CS of DOS service invoking critical error handler</td>
</tr>
<tr>
<td>06h</td>
<td>Flag of DOS service invoking critical error handler</td>
</tr>
<tr>
<td>08h</td>
<td>AX of program invoking DOS service</td>
</tr>
<tr>
<td>0ah</td>
<td>BX of program invoking DOS service</td>
</tr>
<tr>
<td>0ch</td>
<td>CX of program invoking DOS service</td>
</tr>
<tr>
<td>0eh</td>
<td>DX of program invoking DOS service</td>
</tr>
<tr>
<td>10h</td>
<td>SI of program invoking DOS service</td>
</tr>
<tr>
<td>12h</td>
<td>DI of program invoking DOS service</td>
</tr>
<tr>
<td>14h</td>
<td>BP of program invoking DOS service</td>
</tr>
<tr>
<td>16h</td>
<td>DS of program invoking DOS service</td>
</tr>
<tr>
<td>18h</td>
<td>ES of program invoking DOS service</td>
</tr>
<tr>
<td>1ah</td>
<td>IP:CS of program invoking DOS service</td>
</tr>
<tr>
<td>1eh</td>
<td>Flags of program invoking DOS service</td>
</tr>
</table>
</div>
<br>

In reporting the condition to your program's user, do not use DOS function calls above 0Ch. Doing so will destroy DOS's
internal stack and result in unpredictable behavior.

On exit from your error-handling routine, DOS will look for an return code in AL and behave as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>AL</th>
<th>DOS Action</th>
</tr>
<tr>
<td>0</td>
<td>Ignore the error</td>
</tr>
<tr>
<td>1</td>
<td>Retry the operation</td>
</tr>
<tr>
<td>2</td>
<td>Abort the program (issue int 23h)</td>
</tr>
</table>
</div>
<br>

#### Interrupt 25H (<code>int 25h</code>) Absolute Disk Read
Reads one or more sectors on a specified logical disk.

<b>Input:</b><br>
AL = Drive number (0 = A, 1 = B)<br>
CX = Number of sectors to read<br>
DX = Starting sector number<br>
DS:DX = Buffer to store sector read

<b>Output:</b><br>
AX = Error code (if CF is set, see below)<br>
Flag = DOS leaves the flags on the stack

This DOS service (and its write counterpart, Interrupt 26h) is comparable to service provided by the ROM-BIOS in
Interrupt 13h, except for these two differences:

<p>1. DOS numbers disk sectors sequentially, starting at cylinder 0, head 0, sector 1. The BIOS service identifies sectors by three separate coordinates--cylinder, head, and sector). The following formula converts BIOS-numbered sectors to the DOS
format:</p>

DOS.Sector.Number = (BIOS.Sector-1) + BIOS.Head * Sectors.per.Head + BIOS.Cylinder * Sectors.per.Head * Heads.per.Disk

<p>2. DOS works with logical drives, while the BIOS works with physical drives only. That means that the DOS interrupt
can be used to read a phantom drive B, a RAM drive, or a logical drive that has been mapped to a nondefault physical
drive via the ASSIGN command.</p>

Error information is reported in AX as follows:

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Error code in AH</th>
</tr>
<tr>
<th>AH</th>
<th>Description</th>
</tr>
<tr>
<td>01h</td>
<td>Invalid command</td>
</tr>
<tr>
<td>02h</td>
<td>Address mark not found</td>
</tr>
<tr>
<td>03h</td>
<td>Attempt to write on write-protected diskette</td>
</tr>
<tr>
<td>04h</td>
<td>Sector not found</tD>
</tr>
<tr>
<td>05h</td>
<td>Reset failure</td>
</tr>
<tr>
<td>07h</td>
<td>Drive parameter activity failure</td>
</tr>
<tr>
<td>08h</td>
<td>DMA overrun</td>
</tr>
<tr>
<td>09h</td>
<td>DMA boundary error</td>
</tr>
<tr>
<td>10h</td>
<td>CRC or ECC data error</td>
</tr>
<tr>
<td>11h</td>
<td>Possible error corrected by ECC (AL contains burst length)</td>
</tr>
<tr>
<td>20h</td>
<td>Controller failure</td>
</tr>
<tr>
<td>40h</td>
<td>Bad seek</td>
</tr>
<tr>
<td>80h</td>
<td>Drive timeout</td>
</tr>
<tr>
<td>bbh</td>
<td>Undefined error</td>
</tr>
<tr>
<td>ffh</td>
<td>Sense operation failure</td>
</tr>
</table>
</div>
<br>

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th colspan="2">Error code in AL</th>
</tr>
<tr>
<th>AL</th>
<th>Description</th>
</tr>
<tr>
<td>00h</td>
<td>Write-protect error</td>
</tr>
<tr>
<td>01h</td>
<td>Invalid drive number</td>
</tr>
<tr>
<td>02h</td>
<td>Drive not ready</td>
</tr>
<tr>
<td>03h</td>
<td>Invalid command</tD>
</tr>
<tr>
<td>04h</td>
<td>CRC error</td>
</tr>
<tr>
<td>05h</td>
<td>Bad request structure length</td>
</tr>
<tr>
<td>06h</td>
<td>Seek error</td>
</tr>
<tr>
<td>07h</td>
<td>Unknown error; disk format not recognized</td>
</tr>
<tr>
<td>08h</td>
<td>Sector not found</td>
</tr>
<tr>
<td>09h</td>
<td>Printer out of paper</td>
</tr>
<tr>
<td>0ah</td>
<td>Write error</td>
</tr>
<tr>
<td>0bh</td>
<td>Read error</td>
</tr>
<tr>
<td>0ch</td>
<td>General, nonspecific error</td>
</tr>
</table>
</div>

Note that the AH error information is the same as that returned in AH by Interrupt 13h, Service 2, and the AL error information is the same returned in DL in response to a critical error (Interrupt 24h).

Following a call to Interrupt 25h, DOS leaves one word (the flag contents at the time the interrupt was invoked) on the
stack. You should POP this word to prevent stack growth.

#### Interrupt 26H (<code>int 26h</code>) Absolute Disk Write
Writes one or more sectors on a specified logical disk.

<b>Input:</b><br>
AL = Drive number (0 = A, 1 = B)<br>
CX = Number of sectors to write<br>
DX = Starting sector number<br>
DS:DX = Address of sectors to write

<b>Output:</b><br>
AX = Error code (if CF is set, see below)<br>
Flag = DOS leaves the flags on the stack

This interrupt reads one or more sectors from a disk drive, and is comparable to the service provided by the ROM BIOS in Interrupt 13h.

See the descrition on INT 25h for the full details.

#### Interrupt 27H (<code>int 27h</code>) Terminate and Stay Resident
Terminates a program and leaves a specified portion installed in memory.

<b>Input:</b><br>
CS = Segment of PSP<br>
DX = Address at which next program may be loaded (i.e., highest address to stay resident + 1)

Interrupt 27h is the original (i.e. DOS 1.x) method of creating a TSR program. Unlike its DOS 2.0-and-later counterpart,
 Interrupt 21h, Function 31h, it does not allow you to pass a return code. And the amount of memory that may kept resident is limited to 64K.

Use INT 21h function 31h to keep EXE programs resident in memory.

Files are not closed by Interrupt 27h.

#### Interrupt 2FH (<code>int 2fh</code>) Multiplex Interrupt
Defines a general interface between two processes. Applications using this interrupt must define specific functions and parameters. Functions currently defined by DOS include the resident portions of PRINT, ASSIGN, SHARE, and APPEND.

A multiplex handlers is referenced by its "multiplex number," in the AH register. The choice of multiplex number is
arbitrary; you may assign any number to your routine between 80h and FFh; 0 through 7Fh are reserved for use by DOS.

The function to be performed by the multiplex handler is specified in AL. Other registers may hold other parameters, as
needed (see the separate descriptions of the multiplex handlers implemented by DOS).

All multiplex handlers must define a call for AL = 0 (Get Installed State). AL values of F8h to FFh are reserved by DOS.

Multiplex Handlers Implemented or Reserved by DOS

<div style="overflow:auto;">
<table class="table table-bordered">
<tr>
<th>AH</th>
<th>Description</th>
</tr>
<tr>
<td>1h</td>
<td>Resident part of PRINT</td>
</tr>
<tr>
<td>2h</td>
<td>Resident part of ASSIGN</td>
</tr>
<tr>
<td>10h</td>
<td>Resident part of SHARE</td>
</tr>
<tr>
<td>b7h</td>
<td>Resident part of APPEND</td>
</tr>
</table>
</div>

All other values from AH = 0 to AH = 7Fh are reserved by DOS.

Interrupt 2Fh is available in DOS versions 3.1 and later.

##### Multiplex Interrupt (PRINT)

Provides control of the PRINT spooler.

<b>Get Installed State</b>

<b>Input:</b><br>
AH = 01h<br>
AL = 00h

<b>Output:</b><br>
AL = 00h : Not installed, okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : Not installed, not okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh : Installed

<b>Submit File</b>

<b>Input:</b><br>
AH = 01h<br>
AL = 01h<br>
DS:DX = Pointer to submit packet

<b>Output:</b><br>
AX = Error code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid function<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : Too many open files<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8 : Queue full<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9 : Busy<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12 : Name too long<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 15 : Invalid drive

The submit packet must include a "level" value (one byte; for DOS 3.1 through 3.3, the level value must be 0), followed by an ASCIIZ string containing the drive, path, and filename of the file to be printed. Wildcard characters are not supported.

<b>Cancel File (remove from queue)</b>

<b>Input:</b><br>
AH = 01h<br>
AL = 02h<br>
DS:DX = Pointer to ASCIIZ string specifying file to be cancelled

<b>Output:</b><br>
AX = Error code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid function<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : Too many open files<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8 : Queue full<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9 : Busy<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12 : Name too long<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 15 : Invalid drive

Wildcard characters are supported.

<b>Cancel All Files (purge queue)</b>

<b>Input:</b><br>
AH = 01h<br>
AL = 03h

<b>Status (inspect queue)</b>

<b>Input:</b><br>
AH = 01h<br>
AL = 04h<br>
DS:DX = Pointer to ASCIIZ string specifying file to be cancelled

<b>Output:</b><br>
DX = Error count<br>
DS:SI = Pointer to print queue

The error count reports the number of consecutive failures experienced by PRINT in outputting the most recent character.

The print queue, pointed to by DS:SI, is a series of 64-byte entries specifying the files to be printed. The file
currently being printed appears first. The end of the queue is indicated by an entry beginning with 00h.

A call to Status freezes the files in the queue. Call End of Status (AL=5) to release the files for printing.

<b>End of Status</b>

<b>Input:</b><br>
AH = 01h<br>
AL = 05h

<b>Output:</b><br>
AX = Error code<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 : Invalid function<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 : File not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 : Path not found<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4 : Too many open files<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 : Access denied<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8 : Queue full<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9 : Busy<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12 : Name too long<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 15 : Invalid drive

##### Multiplex Interrupt (ASSIGN)
Reports whether the resident part of ASSIGN is installed.

<b>Input:</b><br>
AH = 02h<br>
AL = 00h

<b>Output:</b><br>
AL = 00h : Not installed, okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : Not installed, not okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh : Installed

##### Multiplex Interrupt (SHARE)
Reports whether the resident part of SHARE is installed.

<b>Input:</b><br>
AH = 10h<br>
AL = 00h

<b>Output:</b><br>
AL = 00h : Not installed, okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : Not installed, not okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh : Installed

##### Multiplex Interrupt (APPEND)
Reports whether the resident part of APPEND is installed.

<b>Input:</b><br>
AH = b7h<br>
AL = 00h

<b>Output:</b><br>
AL = 00h : Not installed, okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 01h : Not installed, not okay to install<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ffh : Installed

