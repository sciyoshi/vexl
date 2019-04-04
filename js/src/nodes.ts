enum Op {
	OR = "or",
	AND = "and",
	NOT = "not",
	IS = "is",
	ISNOT = "is not",
	IN = "in",
	NOTIN = "not in",
	CT = "~",
	NOTCT = "!~",
	EQ = "=",
	NE = "!=",
	GE = ">=",
	GT = ">",
	LE = "<=",
	LT = "<",
	ADD = "+",
	SUB = "-",
	MUL = "*",
	DIV = "/"
}

export class Node {
	static props: string[] = [];
}

export class UnaryOp extends Node {
	static props = ["op", "arg"];

	op: Op;
	arg: Node;

	constructor(op: Op, arg: Node) {
		super();
		this.op = op;
		this.arg = arg;
	}
}

export class BoolOp extends Node {
	static props = ["op", "args"];

	op: Op;
	args: Node[];

	constructor(op: Op, args: Node[]) {
		super();
		this.op = op;
		this.args = args;
	}
}

export class BinOp extends Node {
	static props = ["left", "op", "right"];

	left: Node;
	op: Op;
	right: Node;

	constructor(left: Node, op: Op, right: Node) {
		super();
		this.left = left;
		this.op = op;
		this.right = right;
	}
}

export class Null extends Node {
	valueOf(): null {
		return null;
	}
}

export class Value<T> extends Node {
	static props = ["value"];

	value: T;

	constructor(value: T) {
		super();
		this.value = value;
	}
}

export class Number extends Value<number> {

}

export class String extends Value<string> {

}

export class Bool extends Value<boolean> {

}
