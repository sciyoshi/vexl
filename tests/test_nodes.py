import pytest

from vexl.parser import parse
from vexl.visitors import FormatVisitor

cases = [
    # Null
    ["null"],
    # Booleans
    ["false"],
    ["true"],
    # Numbers
    ["0"],
    ["1"],
    ["3.14"],
    ["0.6"],
    ["42.0"],
    ["999999999"],
    # Strings
    ["''"],
    ["'simple'"],
    ["'@\"+_$>)&'"],
    ['"@\'+_$>)&"'],
    # Identifiers
    ["a"],
    ["word"],
    ["b6_a4_c3"],
    # Unary operators
    ["not null"],
    ["not not null"],
    # Boolean operators
    ["1 and 2"],
    ["1 and 2 and 3"],
    ["1 or 2"],
    ["1 or 2 or 3"],
    ["not 1 and 2"],
    ["not 1 or 2"],
    ["1 and not 2"],
    ["1 or not 2"],
    ["1 and 2 or 3"],
    ["1 or 2 and 3"],
    # Binary operators
    ["1 is null"],
    ["1 is empty"],
    ["1 is not null"],
    ["1 is not empty"],
    ["1 in 2"],
    ["1 not in 2"],
    ["1 ~ 2"],
    ["1 !~ 2"],
    ["1 = 2"],
    ["1 != 2"],
    ["1 >= 2"],
    ["1 > 2"],
    ["1 <= 2"],
    ["1 < 2"],
    ["1 + 2"],
    ["1 - 2"],
    ["1 * 2"],
    ["1 / 2"],
    ["1 * 2 / 3"],
    ["1 / 2 / 3"],
    ["1 * 2 + 3"],
    ["1 + 2 * 3"],
]


@pytest.mark.parametrize("expr", [case[0] for case in cases])
def test_format(expr):
    assert FormatVisitor().visit(parse(expr)) == expr
