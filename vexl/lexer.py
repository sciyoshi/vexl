from typing import Iterator, Callable

import re
import ply.lex  # type: ignore

from .nodes import Op


class LexToken:
    """
    Typed proxy for ply.lex.LexToken.
    """

    type: str
    value: str


def _op_lexer(op: Op) -> Callable[[LexToken], LexToken]:
    def func(t: LexToken) -> LexToken:
        t.value = op
        return t

    func.__name__ = f"t_{op.name}"
    func.__doc__ = op.regex

    return func


tokens = tuple(op.name for op in Op) + (
    "LPAREN",
    "RPAREN",
    "LBRACKET",
    "RBRACKET",
    "COMMA",
    "IDENT",
    "NUMBER",
    "STRING",
    "NULL",
    "TRUE",
    "FALSE",
    "EMPTY",
)


t_OR = _op_lexer(Op.OR)
t_AND = _op_lexer(Op.AND)
t_NOTIN = _op_lexer(Op.NOTIN)
t_NOT = _op_lexer(Op.NOT)
t_IN = _op_lexer(Op.IN)
t_ISNOT = _op_lexer(Op.ISNOT)
t_IS = _op_lexer(Op.IS)
t_CT = _op_lexer(Op.CT)
t_NOTCT = _op_lexer(Op.NOTCT)
t_EQ = _op_lexer(Op.EQ)
t_NE = _op_lexer(Op.NE)
t_GE = _op_lexer(Op.GE)
t_GT = _op_lexer(Op.GT)
t_LE = _op_lexer(Op.LE)
t_LT = _op_lexer(Op.LT)
t_ADD = _op_lexer(Op.ADD)
t_SUB = _op_lexer(Op.SUB)
t_MUL = _op_lexer(Op.MUL)
t_DIV = _op_lexer(Op.DIV)
t_LPAREN = r"\("
t_RPAREN = r"\)"
t_LBRACKET = r"\["
t_RBRACKET = r"\]"
t_COMMA = r","


def t_IDENT(t: LexToken) -> LexToken:
    r"[_a-zA-Z]\w*"

    if t.value.upper() in {"NULL", "TRUE", "FALSE", "EMPTY"}:
        t.type = t.value.upper()

    return t


def t_NUMBER(t: LexToken) -> LexToken:
    r"\d+(\.\d*)?|\.\d+"
    return t


def t_STRING(t: LexToken) -> LexToken:
    r"\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'"
    t.value = t.value[1:-1].encode("utf8").decode("unicode-escape")
    return t


t_ignore = " \t"


def t_error(t: LexToken) -> LexToken:
    pass


_lexer = ply.lex.lex(reflags=re.UNICODE | re.IGNORECASE)


def lex(data: str) -> Iterator[LexToken]:
    lexer = _lexer.clone()
    lexer.input(data)

    while True:
        token = lexer.token()
        if not token:
            break
        yield token
