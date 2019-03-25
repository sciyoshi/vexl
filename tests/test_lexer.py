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
    ["or", [("OR", Op.OR)]],
    ["and", [("AND", Op.AND)]],
    ["not", [("NOT", Op.NOT)]],
    ["is", [("IS", Op.IS)]],
    ["is not", [("ISNOT", Op.ISNOT)]],
    ["in", [("IN", Op.IN)]],
    ["not in", [("NOTIN", Op.NOTIN)]],
    ["~", [("CT", Op.CT)]],
    ["!~", [("NOTCT", Op.NOTCT)]],
    ["=", [("EQ", Op.EQ)]],
    ["!=", [("NE", Op.NE)]],
    [">=", [("GE", Op.GE)]],
    [">", [("GT", Op.GT)]],
    ["<=", [("LE", Op.LE)]],
    ["<", [("LT", Op.LT)]],
    ["+", [("ADD", Op.ADD)]],
    ["-", [("SUB", Op.SUB)]],
    ["*", [("MUL", Op.MUL)]],
    ["/", [("DIV", Op.DIV)]],
    # Keywords
    ["null", [("NULL", "null")]],
    ["true", [("TRUE", "true")]],
    ["false", [("FALSE", "false")]],
    ["empty", [("EMPTY", "empty")]],
]


@pytest.mark.parametrize("expr,value", cases)
def test_lexer(expr, value):
    assert [(token.type, token.value) for token in lex(expr)] == value
