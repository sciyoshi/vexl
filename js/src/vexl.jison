%lex
%options case-insensitive
%%

\s+ /* skip whitespace */
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
[_a-zA-Z]\w* return "IDENT"
\d+(\.\d*)?|\.\d+ return "NUMBER"
\"(?:[^\"\\]|\\.)*\"|\'(?:[^'\\]|\\.)*\' return "STRING"

<<EOF>> return "EOF"

/lex

%left OR
%left AND
%right NOT
%nonassoc IS ISNOT IN NOTIN CT NOTCT EQ NE GE GT LE LT
%left ADD SUB
%left MUL DIV

%start expression

%%

expression
	: expr EOF
		{ return $1; }
	;

expr
	: expr AND expr
		{ $$ = $1 instanceof nodes.BoolOp && $1.op == nodes.Op.AND ?
			new nodes.BoolOp(nodes.Op.AND, [...$1.args, $3]) :
			new nodes.BoolOp(nodes.Op.AND, [$1, $3]) }
	| expr OR expr
		{ $$ = $1 instanceof nodes.BoolOp && $1.op == nodes.Op.OR ?
			new nodes.BoolOp(nodes.Op.OR, [...$1.args, $3]) :
			new nodes.BoolOp(nodes.Op.OR, [$1, $3]) }
	| NOT expr
		{ $$ = new nodes.UnaryOp(nodes.Op.NOT, $2) }
	| expr IS expr
		{ $$ = new nodes.BinOp($1, nodes.Op.IS, $3) }
	| expr IS EMPTY %prec IS
		{ $$ = new nodes.BinOp($1, nodes.Op.IS, new nodes.Empty()) }
	| expr ISNOT expr
		{ $$ = new nodes.BinOp($1, nodes.Op.ISNOT, $3) }
	| expr ISNOT EMPTY %prec IS
		{ $$ = new nodes.BinOp($1, nodes.Op.ISNOT, new nodes.Empty()) }
	| expr IN expr
		{ $$ = new nodes.BinOp($1, nodes.Op.IN, $3) }
	| expr NOTIN expr
		{ $$ = new nodes.BinOp($1, nodes.Op.NOTIN, $3) }
	| expr CT expr
		{ $$ = new nodes.BinOp($1, nodes.Op.CT, $3) }
	| expr NOTCT expr
		{ $$ = new nodes.BinOp($1, nodes.Op.NOTCT, $3) }
	| expr EQ expr
		{ $$ = new nodes.BinOp($1, nodes.Op.EQ, $3) }
	| expr NE expr
		{ $$ = new nodes.BinOp($1, nodes.Op.NE, $3) }
	| expr GE expr
		{ $$ = new nodes.BinOp($1, nodes.Op.GE, $3) }
	| expr GT expr
		{ $$ = new nodes.BinOp($1, nodes.Op.GT, $3) }
	| expr LE expr
		{ $$ = new nodes.BinOp($1, nodes.Op.LE, $3) }
	| expr LT expr
		{ $$ = new nodes.BinOp($1, nodes.Op.LT, $3) }
	| expr ADD expr
		{ $$ = new nodes.BinOp($1, nodes.Op.ADD, $3) }
	| expr SUB expr
		{ $$ = new nodes.BinOp($1, nodes.Op.SUB, $3) }
	| expr MUL expr
		{ $$ = new nodes.BinOp($1, nodes.Op.MUL, $3) }
	| expr DIV expr
		{ $$ = new nodes.BinOp($1, nodes.Op.DIV, $3) }
	| LPAREN expr RPAREN
		{ $$ = $2 }
	| IDENT
		{ $$ = new nodes.Ident($1) }
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
	| NUMBER
		{ $$ = new nodes.Number($1.indexOf(".") >= 0 ? parseFloat($1) : parseInt($1)) }
	| STRING
		{ $$ = new nodes.String(unescapeUnicode($1.substring(1, $1.length - 1))) }
	;
