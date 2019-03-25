import pytest

from vexl.parser import parser
from vexl.nodes import Null


cases = [
    # Numbers
    ["null", Null()]
]


@pytest.mark.parametrize("expr,result", cases)
def test_parser(expr, result):
    assert parser.parse(expr) == result
