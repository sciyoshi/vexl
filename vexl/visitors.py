from typing import Any, Iterator, Union
import dataclasses

from .nodes import (
    Node,
    Null,
    Bool,
    Number,
    String,
    Ident,
    List,
    UnaryOp,
    BoolOp,
    BinOp,
    Empty,
)

OpNode = Union[UnaryOp, BoolOp, BinOp]


class Visitor:
    def visit(self, node: Node) -> Any:
        for tp in type(node).__mro__:
            if tp is Node:
                break

            if isinstance(node, (UnaryOp, BoolOp, BinOp)) and hasattr(
                self, f"visit_{tp.__name__}_{node.op}"
            ):
                return getattr(self, f"visit_{tp.__name__}_{node.op}")(node)

            if hasattr(self, f"visit_{tp.__name__}"):
                return getattr(self, f"visit_{tp.__name__}")(node)

        return self.visit_Node(node)

    def children(self, node: Node) -> Iterator[Node]:
        for field in dataclasses.fields(node):
            child = getattr(node, field.name)

            if isinstance(child, Node):
                yield child
            elif isinstance(child, list):
                yield from child

    def visit_Node(self, node: Node) -> Any:
        for child in self.children(node):
            self.visit(child)


class FormatVisitor(Visitor):
    def paren(self, parent: OpNode, child: Node) -> str:
        if not isinstance(child, (UnaryOp, BoolOp, BinOp)):
            return self.visit(child)

        if parent.op.precedence <= child.op.precedence:
            return self.visit(child)

        return f"({self.visit(child)})"

    def visit_List(self, node: List) -> str:
        return f"[{', '.join(self.visit(child) for child in self.children(node))}]"

    def visit_Null(self, node: Null) -> str:
        return "null"

    def visit_Bool(self, node: Bool) -> str:
        return str(node.value).lower()

    def visit_Number(self, node: Number) -> str:
        return str(node.value)

    def visit_String(self, node: String) -> str:
        return repr(node.value)

    def visit_Ident(self, node: Ident) -> str:
        return node.name

    def visit_Empty(self, node: Empty) -> str:
        return "empty"

    def visit_UnaryOp(self, node: UnaryOp) -> str:
        return f"{node.op.symbol} {self.paren(node, node.arg)}"

    def visit_BoolOp(self, node: BoolOp) -> str:
        args = [self.paren(node, child) for child in node.args]

        return f" {node.op.symbol} ".join(args)

    def visit_BinOp(self, node: BinOp) -> str:
        left = self.paren(node, node.left)
        right = self.paren(node, node.right)

        return f"{left} {node.op.symbol} {right}"

    def visit_Node(self, node: Node) -> str:
        return str(node)
