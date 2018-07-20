---
layout: post
title: Looking at The Source Code for Function isalpha, isdigit, isalnum, isspace, islower, isupper, isxdigit, iscntrl, isprint, ispunct, isgraph, tolower, and, toupper in C Programming
date: 2018-07-21 13:32:20 +0700
description: Looking at The Source Code for Function isalpha, isdigit, isalnum, isspace, islower, isupper, isxdigit, iscntrl, isprint, ispunct, isgraph, tolower, and, toupper in C Programming
img: isalpha.jpg
tags: [C]
---
In ctype.h header file, there are many built in functions which are used to validate the data type of given variable and to convert to upper to lower case and lower to upper case.

Those functions are listed below

<div style="overflow:scroll;">
<table class="table">
<thead>
<tr>
<th>Function</th>
<th>Description</th>
<th>Characters</th>
</tr>
</thead>

<tbody>
<tr>
<td><code>isalpha()</code></td>
<td>check whether character is alphabetic</td>
<td>A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z; a; b; c; d; e; f; g; h; i; j; k; l; m; n; o; p; q; r; s; t; u; v; w; x; y; z;</td>
</tr>
<tr>
<td><code>isdigit()</code></td>
<td>check whether character is digit</td>
<td>1; 2; 3; 4; 5; 6; 7; 8; 9; 0;</td>
</tr>
<tr>
<td><code>isalnum()</code></td>
<td>check whether character is alphanumeric</td>
<td>A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z; a; b; c; d; e; f; g; h; i; j; k; l; m; n; o; p; q; r; s; t; u; v; w; x; y; z; 1; 2; 3; 4; 5; 6; 7; 8; 9; 0;</td>
</tr>
<tr>
<td><code>isspace()</code></td>
<td>check whether character is space</td>
<td>tab; newline; vertical-tab; form-feed; carriage-return; space;</td>
</tr>
<tr>
<td><code>islower()</code></td>
<td>check whether character is lower case</td>
<td>a; b; c; d; e; f; g; h; i; j; k; l; m; n; o; p; q; r; s; t; u; v; w; x; y; z;</td>
</tr>
<tr>
<td><code>isupper()</code></td>
<td>check whether character is upper case</td>
<td>A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z;</td>
</tr>
<tr>
<td><code>isxdigit()</code></td>
<td>check whether character is hexadecimal</td>
<td>1; 2; 3; 4; 5; 6; 7; 8; 9; 0; a; b; c; d; e; f; A; B; C; D; E; F;</td>
</tr>
<tr>
<td><code>iscntrl()</code></td>
<td>check whether character is control character</td>
<td>alert; backspace; tab; newline; vertical-tab; form-feed; carriage-return; NUL; SOH; STX; ETX; EOT; ENQ; ACK; SO; SI; DLE; DC1; DC2; DC3; DC4; NAK; SYN; ETB; CAN; EM; SUB; ESC; IS4; IS3; IS2; IS1; DEL;</td>
</tr>
<tr>
<td><code>isprint()</code></td>
<td>check whether character is printable character</td>
<td>A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z; a; b; c; d; e; f; g; h; i; j; k; l; m; n; o; p; q; r; s; t; u; v; w; x; y; z; 1; 2; 3; 4; 5; 6; 7; 8; 9; 0; tab; newline; vertical-tab; form-feed; carriage-return; space; exclamation-mark; quotation-mark; number-sign; dollar-sign; percent-sign; ampersand; asterisk; apostrophe; left-parenthesis;right-parenthesis; plus-sign; comma; hyphen; period; slash; colon; semicolon; less-than-sign; equals-sign; greater-than-sign; question-mark; commercial-at; left-square-bracket; backslash; circumflex; right-square-bracket; underline; grave-accent; left-curly-bracket; vertical-line; tilde; right-curly-bracket;</td>
</tr>
<tr>
<td><code>ispunct()</code></td>
<td>check whether character is punctuation</td>
<td>exclamation-mark; quotation-mark; number-sign; dollar-sign; percent-sign; ampersand; asterisk; apostrophe; left-parenthesis;right-parenthesis; plus-sign; comma; hyphen; period; slash; colon; semicolon; less-than-sign; equals-sign; greater-than-sign; question-mark; commercial-at; left-square-bracket; backslash; circumflex; right-square-bracket; underline; grave-accent; left-curly-bracket; vertical-line; tilde; right-curly-bracket;</td>
</tr>
<tr>
<td><code>isgraph()</code></td>
<td>check whether character is graphical character</td>
<td>A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z; a; b; c; d; e; f; g; h; i; j; k; l; m; n; o; p; q; r; s; t; u; v; w; x; y; z; 1; 2; 3; 4; 5; 6; 7; 8; 9; 0; exclamation-mark; quotation-mark; number-sign; dollar-sign; percent-sign; ampersand; asterisk; apostrophe; left-parenthesis;right-parenthesis; plus-sign; comma; hyphen; period; slash; colon; semicolon; less-than-sign; equals-sign; greater-than-sign; question-mark; commercial-at; left-square-bracket; backslash; circumflex; right-square-bracket; underline; grave-accent; left-curly-bracket; vertical-line; tilde; right-curly-bracket;</td>
</tr>
<tr>
<td><code>tolower()</code></td>
<td>convert alphabetic characters to lower case</td>
<td>A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z;</td>
</tr>
<tr>
<td><code>toupper()</code></td>
<td>convert alphabetic characters to upper case</td>
<td>a; b; c; d; e; f; g; h; i; j; k; l; m; n; o; p; q; r; s; t; u; v; w; x; y; z;</td>
</tr>
</tbody>
</table>
</div>

