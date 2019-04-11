import pytest

from vexl import parse
from vexl.visitors import EvaluationVisitor

cases = [
    # Null
    ["null", None],
    # Booleans
    ["false", False],
    ["true", True],
    # Numbers
    ["0", 0],
    ["1", 1],
    ["3.14", 3.14],
    ["0.6", 0.6],
    ["42.0", 42],
    ["999999999", 999999999],
    # Identifiers
    ["a", None],
    ["word", None],
    ["b6_a4_c3", None],
    # Unary operators
    ["not null", None],
    ["not false", True],
    ["not true", False],
    ["not not null", None],
    ["not not false", False],
    ["not not true", True],
    # Boolean operators
    ["1 and 2", 2],
    ["1 and 2 and 3", 3],
    ["1 or 2", 1],
    ["1 or 2 or 3", 1],
    ["not 1 and 2", False],
    ["not 1 or 2", 2],
    ["1 and not 2", False],
    ["1 or not 2", 1],
    ["1 and 2 or 3", 2],
    ["1 or 2 and 3", 1],
    ["(1 or 2) and 3", 3],
    # Binary operators
]


@pytest.mark.parametrize("expr,value", cases)
def test_evaluate(expr, value):
    assert EvaluationVisitor({}).visit(parse(expr)) == value
