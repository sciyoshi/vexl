%lex
%options case-insensitive
%%

\s+ /* skip whitespace */
[0-9]+(\.[0-9]*)? return "NUMBER"
"NULL" return "NULL"
"TRUE" return "TRUE"
"FALSE" return "FALSE"
"EMPTY" return "EMPTY"
"OR" return "OR"
"AND" return "AND"
"NOT IN" return "NOTIN"
"NOT" return "NOT"
"IN" return "IN"
"IS NOT" return "ISNOT"
"IS" return "IS"
"~" return "CT"
"!~" return "NOTCT"
"=" return "EQ"
"!=" return "NE"
">=" return "GE"
">" return "GT"
"<=" return "LE"
"<" return "LT"
"+" return "ADD"
"-" return "SUB"
"*" return "MUL"
"/" return "DIV"
"(" return "LPAREN"
")" return "RPAREN"
"[" return "LBRACKET"
"]" return "RBRACKET"
"," return "COMMA"

<<EOF>> return "EOF"

/lex

%start expression

%%

expression
	: value EOF
		{ $$ = $1; return $1; }
	;

value
	: NULL
		{ return new Null() }
	| TRUE
		{ $$ = True() }
	| FALSE
		{ $$ = False() }
	| EMPTY
		{ $$ = Empty() }
	;
