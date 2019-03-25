from typing import List, Optional, Union
import re
import enum
import dataclasses


class Op(enum.Enum):
    OR = (10, "or")
    AND = (20, "and")
    NOT = (30, "not")
    IS = (40, "is")
    ISNOT = (40, "is not", r"is\s*not")
    IN = (40, "in")
    NOTIN = (40, "not in", r"not\s*in")
    CT = (40, "~")
    NOTCT = (40, "!~")
    EQ = (40, "=")
    NE = (40, "!=")
    GE = (40, ">=")
    GT = (40, ">")
    LE = (40, "<=")
    LT = (40, "<")
    ADD = (50, "+")
    SUB = (50, "-")
    MUL = (60, "*")
    DIV = (60, "/")

    precedence: int
    symbol: str
    regex: Optional[str]

    def __init__(self, precedence: int, symbol: str, regex: Optional[str] = None):
        self.precedence = precedence
        self.symbol = symbol
        self.regex = regex or re.escape(symbol)

    def __repr__(self):
        return f"{type(self).__qualname__}.{self.name}"


@dataclasses.dataclass
class Node:
    pass


@dataclasses.dataclass
class UnaryOp(Node):
    op: Op
    arg: Node


@dataclasses.dataclass
class BoolOp(Node):
    op: Op
    args: List[Node]


@dataclasses.dataclass
class BinOp(Node):
    left: Node
    op: Op
    right: Node


@dataclasses.dataclass
class Ident(Node):
    name: str


@dataclasses.dataclass
class Empty(Node):
    pass


@dataclasses.dataclass
class Value(Node):
    pass


@dataclasses.dataclass
class Null(Value):
    value = None


@dataclasses.dataclass
class Bool(Value):
    value: bool


@dataclasses.dataclass
class Number(Value):
    value: Union[int, float]


@dataclasses.dataclass
class String(Value):
    value: str
