import ply.yacc  # type: ignore

from .lexer import tokens  # noqa
from .nodes import (
    Null,
    Bool,
    Number,
    String,
    Ident,
    List,
    UnaryOp,
    BoolOp,
    BinOp,
    Empty,
)


precedence = (
    ("left", "OR"),
    ("left", "AND"),
    ("left", "NOT"),
    (
        "nonassoc",
        "IS",
        "ISNOT",
        "IN",
        "NOTIN",
        "CT",
        "NOTCT",
        "EQ",
        "NE",
        "GE",
        "GT",
        "LE",
        "LT",
    ),
    ("left", "ADD", "SUB"),
    ("left", "MUL", "DIV"),
)


def p_expr_boolop(p):
    """
    expr : expr AND expr
         | expr OR expr
    """
    if isinstance(p[1], BoolOp) and p[2] == p[1].op:
        p[0] = BoolOp(op=p[2], args=[*p[1].args, p[3]])
    else:
        p[0] = BoolOp(op=p[2], args=[p[1], p[3]])


def p_expr_unaryop(p):
    """
    expr : NOT expr
    """
    p[0] = UnaryOp(op=p[1], arg=p[2])


def p_expr_binop(p):
    """
    expr : expr IS expr
         | expr ISNOT expr
         | expr IN expr
         | expr NOTIN expr
         | expr CT expr
         | expr NOTCT expr
         | expr EQ expr
         | expr NE expr
         | expr GE expr
         | expr GT expr
         | expr LE expr
         | expr LT expr
         | expr ADD expr
         | expr SUB expr
         | expr MUL expr
         | expr DIV expr
    """
    p[0] = BinOp(left=p[1], op=p[2], right=p[3])


def p_expr_binop_is_empty(p):
    """
    expr : expr IS EMPTY %prec IS
         | expr ISNOT EMPTY %prec IS
    """
    p[0] = BinOp(left=p[1], op=p[2], right=Empty())


def p_expr_paren(p):
    """
    expr : LPAREN expr RPAREN
    """
    p[0] = p[2]


def p_expr(p):
    """
    expr : value
         | ident
    """
    p[0] = p[1]


def p_value(p):
    """
    value : null
          | bool
          | string
          | number
          | list
    """
    p[0] = p[1]


def p_null(p):
    """
    null : NULL
    """
    p[0] = Null()


def p_bool(p):
    """
    bool : TRUE
         | FALSE
    """
    p[0] = Bool(p[1].upper() == "TRUE")


def p_number(p):
    """
    number : NUMBER
    """
    p[0] = Number(float(p[1]) if "." in p[1] else int(p[1]))


def p_string(p):
    """
    string : STRING
    """
    p[0] = String(p[1])


def p_ident(p):
    """
    ident : IDENT
    """
    p[0] = Ident(p[1])


def p_list(p):
    """
    list : LBRACKET expr_list RBRACKET
    """
    p[0] = List(p[2])


def p_list_empty(p):
    """
    list : LBRACKET RBRACKET
    """
    p[0] = List()


def p_expr_list(p):
    """
    expr_list : expr COMMA expr_list
              | expr
    """
    p[0] = [p[1]] if len(p) == 2 else [p[1], *p[3]]


def p_error(p):
    raise


parser = ply.yacc.yacc(debug=False, write_tables=False)
