import pytest

from vexl.parser import parser
from vexl.nodes import (
    Op,
    Null,
    Bool,
    Number,
    String,
    Ident,
    UnaryOp,
    BoolOp,
    BinOp,
    Empty,
)


cases = [
    # Null
    ["null", Null()],
    # Booleans
    ["false", Bool(value=False)],
    ["true", Bool(value=True)],
    # Numbers
    ["0", Number(0)],
    ["1", Number(1)],
    ["3.14", Number(3.14)],
    [".6", Number(0.6)],
    ["42.", Number(42.0)],
    ["999999999", Number(999999999)],
    # Strings
    ['""', String("")],
    ["''", String("")],
    ['"simple"', String("simple")],
    ["'simple'", String("simple")],
    ["'@\"+_$>)&'", String('@"+_$>)&')],
    ['"@\'+_$>)&"', String("@'+_$>)&")],
    ["'escape\\''", String("escape'")],
    ['"escape\\""', String('escape"')],
    ["'escape\\\\'", String("escape\\")],
    # Identifiers
    ["a", Ident("a")],
    ["word", Ident("word")],
    ["b6_a4_c3", Ident("b6_a4_c3")],
    # Unary operators
    ["not null", UnaryOp(Op.NOT, Null())],
    ["not not null", UnaryOp(Op.NOT, UnaryOp(Op.NOT, Null()))],
    # Boolean operators
    ["1 and 2", BoolOp(Op.AND, [Number(1), Number(2)])],
    ["1 and 2 and 3", BoolOp(Op.AND, [Number(1), Number(2), Number(3)])],
    ["1 or 2", BoolOp(Op.OR, [Number(1), Number(2)])],
    ["1 or 2 or 3", BoolOp(Op.OR, [Number(1), Number(2), Number(3)])],
    ["not 1 and 2", BoolOp(Op.AND, [UnaryOp(Op.NOT, Number(1)), Number(2)])],
    ["not 1 or 2", BoolOp(Op.OR, [UnaryOp(Op.NOT, Number(1)), Number(2)])],
    ["1 and not 2", BoolOp(Op.AND, [Number(1), UnaryOp(Op.NOT, Number(2))])],
    ["1 or not 2", BoolOp(Op.OR, [Number(1), UnaryOp(Op.NOT, Number(2))])],
    [
        "1 and 2 or 3",
        BoolOp(Op.OR, [BoolOp(Op.AND, [Number(1), Number(2)]), Number(3)]),
    ],
    [
        "1 or 2 and 3",
        BoolOp(Op.OR, [Number(1), BoolOp(Op.AND, [Number(2), Number(3)])]),
    ],
    # Binary operators
    ["1 is null", BinOp(Number(1), Op.IS, Null())],
    ["1 is empty", BinOp(Number(1), Op.IS, Empty())],
    ["1 is not null", BinOp(Number(1), Op.ISNOT, Null())],
    ["1 is not empty", BinOp(Number(1), Op.ISNOT, Empty())],
    ["1 in 2", BinOp(Number(1), Op.IN, Number(2))],
    ["1 not in 2", BinOp(Number(1), Op.NOTIN, Number(2))],
    ["1 ~ 2", BinOp(Number(1), Op.CT, Number(2))],
    ["1 !~ 2", BinOp(Number(1), Op.NOTCT, Number(2))],
    ["1 = 2", BinOp(Number(1), Op.EQ, Number(2))],
    ["1 != 2", BinOp(Number(1), Op.NE, Number(2))],
    ["1 >= 2", BinOp(Number(1), Op.GE, Number(2))],
    ["1 > 2", BinOp(Number(1), Op.GT, Number(2))],
    ["1 <= 2", BinOp(Number(1), Op.LE, Number(2))],
    ["1 < 2", BinOp(Number(1), Op.LT, Number(2))],
]


@pytest.mark.parametrize("expr,result", cases)
def test_parser(expr, result):
    assert parser.parse(expr) == result
