import {
	precedence,
	Op,
	Node,
	Null,
	Bool,
	Number,
	String,
	Ident,
	UnaryOp,
	BoolOp,
	BinOp,
	Empty
} from "./nodes";

export class Visitor<T> {
	[key: string]: any;

	visit<N extends Node>(node: N): T {
		let type = node.constructor;

		while (type && type !== Node) {
			if (this[`visit_${type.name}`]) {
				return this[`visit_${type.name}`](node);
			}

			type = Object.getPrototypeOf(type);
		}

		return this.visit_Node(node);
	}

	visit_Node(node: Node): T {
		return (null as unknown) as T;
	}
}

export class EvaluationVisitor extends Visitor<any> {
	context: { [key: string]: any } = {};

	visit_Null(node: Null): any {
		return null;
	}

	visit_Bool(node: Bool): any {
		return node.value;
	}

	visit_Number(node: Number): any {
		return node.value;
	}

	visit_String(node: String): any {
		return node.value;
	}

	visit_Ident(node: Ident): any {
		return node.name in this.context ? this.context[node.name] : null;
	}

	visit_UnaryOp(node: UnaryOp): any {
		const value = this.visit(node.arg);

		if (node.op === Op.NOT) {
			return value === null ? null : !value;
		}
	}

	visit_BoolOp(node: BoolOp): any {
		let result: any = node.op == Op.AND ? true : false;

		for (let arg of node.args) {
			let el = this.visit(arg);

			if (node.op === Op.AND && el !== null && !el) {
				return el;
			} else if (node.op === Op.OR && el !== null && el) {
				return el;
			} else if (result !== null) {
				result = el;
			}
		}

		return result;
	}

	visit_BinOp(node: BinOp): any {
		// left, right = self.visit(node.left), self.visit(node.right)
	}
}
