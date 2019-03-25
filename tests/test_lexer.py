import pytest

from vexl.lexer import lex
from vexl.nodes import Op

cases = [
    # Numbers
    ["0", [("NUMBER", "0")]],
    ["1", [("NUMBER", "1")]],
    ["3.14", [("NUMBER", "3.14")]],
    [".6", [("NUMBER", ".6")]],
    ["42.", [("NUMBER", "42.")]],
    ["999999999", [("NUMBER", "999999999")]],
    # Strings
    ['""', [("STRING", "")]],
    ["''", [("STRING", "")]],
    ['"simple"', [("STRING", "simple")]],
    ["'simple'", [("STRING", "simple")]],
    ["'@\"+_$>)&'", [("STRING", '@"+_$>)&')]],
    ['"@\'+_$>)&"', [("STRING", "@'+_$>)&")]],
    ["'escape\\''", [("STRING", "escape'")]],
    ['"escape\\""', [("STRING", 'escape"')]],
    ["'escape\\\\'", [("STRING", "escape\\")]],
    # Identifiers
    ["a", [("IDENT", "a")]],
    ["word", [("IDENT", "word")]],
    ["b6_a4_c3", [("IDENT", "b6_a4_c3")]],
    # Operations
    ["+", [("ADD", "+")]],
    ["-", [("SUB", "-")]],
    ["*", [("MUL", "*")]],
    ["/", [("DIV", "/")]],
    # Keywords
    ["and", [("AND", Op.AND)]],
    ["or", [("OR", Op.OR)]],
    ["not", [("NOT", Op.NOT)]],
    ["null", [("NULL", "null")]],
    ["true", [("TRUE", "true")]],
    ["false", [("FALSE", "false")]],
    ["empty", [("EMPTY", "empty")]],
]


@pytest.mark.parametrize("expr,value", cases)
def test_lexer(expr, value):
    assert [(token.type, token.value) for token in lex(expr)] == value
