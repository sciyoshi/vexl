import ply.yacc  # type: ignore

from .lexer import tokens  # noqa
from .nodes import Null


def p_expr(p):
    """
    expr : value
    """
    p[0] = p[1]


def p_value(p):
    """
    value : NULL
    """
    p[0] = Null()


def p_error(p):
    raise


parser = ply.yacc.yacc(debug=False, write_tables=False)
