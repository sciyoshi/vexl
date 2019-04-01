%lex
%%

\s+ /* skip whitespace */
[0-9]+(\.[0-9]*)? return 'NUMBER'
"NULL" return 'NULL'
"TRUE" return 'TRUE'
"FALSE" return 'FALSE'
"EMPTY" return 'EMPTY'
<<EOF>> return 'EOF'

/lex

%start expression

%%

expression
	: NUMBER EOF
		{ $$ = $1; return $1; }
	;

value
	: NULL
		{ $$ = Null() }
	| TRUE
		{ $$ = Null() }
	;
