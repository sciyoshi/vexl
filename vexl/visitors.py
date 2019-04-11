from typing import cast, Any, Iterator, Union, TypeVar, Generic, Dict
import dataclasses

from .nodes import (
    Op,
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

T = TypeVar("T")


class Visitor(Generic[T]):
    def visit(self, node: Node) -> T:
        for tp in type(node).__mro__:
            if tp is Node:
                break

            if isinstance(node, (UnaryOp, BoolOp, BinOp)) and hasattr(
                self, f"visit_{tp.__name__}_{node.op.name}"
            ):
                return cast(
                    T, getattr(self, f"visit_{tp.__name__}_{node.op.name}")(node)
                )

            if hasattr(self, f"visit_{tp.__name__}"):
                return cast(T, getattr(self, f"visit_{tp.__name__}")(node))

        return self.visit_Node(node)

    def children(self, node: Node) -> Iterator[Node]:
        for field in dataclasses.fields(node):
            child = getattr(node, field.name)

            if isinstance(child, Node):
                yield child
            elif isinstance(child, list):
                yield from child

    def visit_Node(self, node: Node) -> T:
        for child in self.children(node):
            self.visit(child)

        return cast(T, None)


class FormatVisitor(Visitor[str]):
    def paren(self, parent: OpNode, child: Node) -> str:
        if not isinstance(child, (UnaryOp, BoolOp, BinOp)):
            return self.visit(child)

        if parent.op.precedence <= child.op.precedence:
            return self.visit(child)

        return f"({self.visit(child)})"

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

    def visit_List(self, node: List) -> str:
        return f"[{', '.join(self.visit(el) for el in self.children(node))}]"

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


@dataclasses.dataclass
class EvaluationVisitor(Visitor[Any]):
    context: Dict[str, Any]

    def visit_Null(self, node: Null) -> Any:
        return None

    def visit_Bool(self, node: Bool) -> Any:
        return node.value

    def visit_Number(self, node: Number) -> Any:
        return node.value

    def visit_String(self, node: String) -> Any:
        return node.value

    def visit_Ident(self, node: Ident) -> Any:
        return self.context.get(node.name, None)

    def visit_List(self, node: List) -> Any:
        return [self.visit(el) for el in self.children(node)]

    def visit_UnaryOp(self, node: UnaryOp) -> Any:
        value = self.visit(node.arg)

        if node.op == Op.NOT:
            return None if value is None else not value

        return value

    def visit_BoolOp_AND(self, node: BoolOp) -> Any:
        result: Any = True

        for arg in node.args:
            el = self.visit(arg)
            if el is not None and not el:
                return el
            if result is not None:
                result = el

        return result

    def visit_BoolOp_OR(self, node: BoolOp) -> Any:
        result: Any = False

        for arg in node.args:
            el = self.visit(arg)
            if el is not None and el:
                return el
            if result is not None:
                result = el

        return result

    def visit_BinOp(self, node: BinOp) -> Any:
        # left, right = self.visit(node.left), self.visit(node.right)
        pass
