from typing import cast, List as ListT, Any

import ply.yacc  # type: ignore

from .lexer import tokens  # noqa
from .nodes import (
    Node,
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

ParseList = ListT[Any]


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


def p_expr_boolop(p: ParseList) -> None:
    """
    expr : expr AND expr
         | expr OR expr
    """
    if isinstance(p[1], BoolOp) and p[2] == p[1].op:
        p[0] = BoolOp(op=p[2], args=[*p[1].args, p[3]])
    else:
        p[0] = BoolOp(op=p[2], args=[p[1], p[3]])


def p_expr_unaryop(p: ParseList) -> None:
    """
    expr : NOT expr
    """
    p[0] = UnaryOp(op=p[1], arg=p[2])


def p_expr_binop(p: ParseList) -> None:
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


def p_expr_binop_is_empty(p: ParseList) -> None:
    """
    expr : expr IS EMPTY %prec IS
         | expr ISNOT EMPTY %prec IS
    """
    p[0] = BinOp(left=p[1], op=p[2], right=Empty())


def p_expr_paren(p: ParseList) -> None:
    """
    expr : LPAREN expr RPAREN
    """
    p[0] = p[2]


def p_expr(p: ParseList) -> None:
    """
    expr : value
         | ident
    """
    p[0] = p[1]


def p_value(p: ParseList) -> None:
    """
    value : null
          | bool
          | string
          | number
          | list
    """
    p[0] = p[1]


def p_null(p: ParseList) -> None:
    """
    null : NULL
    """
    p[0] = Null()


def p_bool(p: ParseList) -> None:
    """
    bool : TRUE
         | FALSE
    """
    p[0] = Bool(p[1].upper() == "TRUE")


def p_number(p: ParseList) -> None:
    """
    number : NUMBER
    """
    p[0] = Number(float(p[1]) if "." in p[1] else int(p[1]))


def p_string(p: ParseList) -> None:
    """
    string : STRING
    """
    p[0] = String(p[1])


def p_ident(p: ParseList) -> None:
    """
    ident : IDENT
    """
    p[0] = Ident(p[1])


def p_list(p: ParseList) -> None:
    """
    list : LBRACKET expr_list RBRACKET
    """
    p[0] = List(p[2])


def p_list_empty(p: ParseList) -> None:
    """
    list : LBRACKET RBRACKET
    """
    p[0] = List()


def p_expr_list(p: ParseList) -> None:
    """
    expr_list : expr COMMA expr_list
              | expr
    """
    p[0] = [p[1]] if len(p) == 2 else [p[1], *p[3]]


def p_error(p: ParseList) -> None:
    raise


_parser = ply.yacc.yacc(debug=False, write_tables=False)


def parse(expr: str) -> Node:
    return cast(Node, _parser.parse(expr))
