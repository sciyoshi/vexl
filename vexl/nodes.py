from typing import List, Optional
import re
import enum
import dataclasses


class Op(enum.Enum):
    OR = (10, "or")
    AND = (20, "and")
    NOT = (30, "not")
    IN = (40, "in")
    NOTIN = (40, "not in")
    CT = (40, "~")
    NOTCT = (40, "!~")
    EQ = (40, "=")
    NE = (40, "!=")
    GT = (40, ">")
    GE = (40, ">=")
    LT = (40, "<")
    LE = (40, "<=")
    ADD = (50, "+")
    SUB = (50, "-")
    MUL = (50, "*")
    DIV = (50, "/")

    precedence: int
    symbol: str
    regex: Optional[str]

    def __init__(self, precedence: int, symbol: str, regex: Optional[str] = None):
        self.precedence = precedence
        self.symbol = symbol

        if " " not in symbol:
            self.regex = regex or re.escape(symbol)


@dataclasses.dataclass
class Node:
    pass


@dataclasses.dataclass
class UnaryOp(Node):
    pass


@dataclasses.dataclass
class BoolOp(Node):
    args: List[Node]


@dataclasses.dataclass
class BinOp(Node):
    left: Node
    right: Node


@dataclasses.dataclass
class Value(Node):
    pass


@dataclasses.dataclass
class Null(Value):
    pass
