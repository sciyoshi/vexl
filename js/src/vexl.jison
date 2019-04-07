%lex
%options case-insensitive
%%

\s+ /* skip whitespace */
\d+(\.\d*)?|\.\d+ return "NUMBER"
\"(?:[^\"\\]|\\.)*\"|\'(?:[^'\\]|\\.)*\' return "STRING"
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

%left OR
%left AND
%left NOT

%start expression

%%

expression
	: expr EOF
		{ return $1; }
	;

expr
	: expr AND expr
		{ $$ = new nodes.BoolOp(nodes.Op.AND, [$1, $3]) }
	| expr OR expr
		{ $$ = new nodes.BoolOp(nodes.Op.OR, [$1, $3]) }
	| NOT expr
		{ $$ = new nodes.UnaryOp(nodes.Op.NOT, $2) }
	| value
		{ $$ = $1 }
	;

value
	: NULL
		{ $$ = new nodes.Null() }
	| TRUE
		{ $$ = new nodes.Bool(true) }
	| FALSE
		{ $$ = new nodes.Bool(false) }
	| EMPTY
		{ $$ = new nodes.Empty() }
	| NUMBER
		{ $$ = new nodes.Number($1.indexOf(".") >= 0 ? parseFloat($1) : parseInt($1)) }
	| STRING
		{ $$ = new nodes.String(unescapeUnicode($1.substring(1, $1.length - 1))) }
	;
