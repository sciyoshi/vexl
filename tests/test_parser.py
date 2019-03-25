import pytest

from vexl.parser import parser
from vexl.nodes import Op, Null, Bool, Number, String, Ident, UnaryOp, BoolOp, BinOp


cases = [
    # Numbers
    ["NULL", Null()],
    # Booleans
    ["FALSE", Bool(value=False)],
    ["TRUE", Bool(value=True)],
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
    # Unary operators
    ["NOT NULL", UnaryOp(Op.NOT, Null())],
    # Boolean operators
    ["1 AND 2", BoolOp(Op.AND, [Number(1), Number(2)])],
    ["1 AND 2 AND 3", BoolOp(Op.AND, [Number(1), Number(2), Number(3)])],
    ["1 OR 2", BoolOp(Op.OR, [Number(1), Number(2)])],
    ["1 OR 2 OR 3", BoolOp(Op.OR, [Number(1), Number(2), Number(3)])],
    ["NOT 1 AND 2", BoolOp(Op.AND, [UnaryOp(Op.NOT, Number(1)), Number(2)])],
    ["NOT 1 OR 2", BoolOp(Op.OR, [UnaryOp(Op.NOT, Number(1)), Number(2)])],
    ["1 AND NOT 2", BoolOp(Op.AND, [Number(1), UnaryOp(Op.NOT, Number(2))])],
    ["1 OR NOT 2", BoolOp(Op.OR, [Number(1), UnaryOp(Op.NOT, Number(2))])],
    [
        "1 AND 2 OR 3",
        BoolOp(Op.OR, [BoolOp(Op.AND, [Number(1), Number(2)]), Number(3)]),
    ],
    [
        "1 OR 2 AND 3",
        BoolOp(Op.OR, [Number(1), BoolOp(Op.AND, [Number(2), Number(3)])]),
    ],
    # Binary operators
    [
        "1 OR 2 AND 3",
        BoolOp(Op.OR, [Number(1), BoolOp(Op.AND, [Number(2), Number(3)])]),
    ],
]


@pytest.mark.parametrize("expr,result", cases)
def test_parser(expr, result):
    assert parser.parse(expr) == result
