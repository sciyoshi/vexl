export enum Op {
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

	toString(): string {
		return `${this.op} ${this.arg}`;
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

	toString(): string {
		return this.args.map(el => el.toString()).join(` ${this.op} `);
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

export class Empty extends Node {
	valueOf(): null {
		return null;
	}

	toString(): string {
		return "empty";
	}
}

export class Ident extends Node {
	static props = ["name"];

	name: string;

	constructor(name: string) {
		super();
		this.name = name;
	}
}

export class Value<T> extends Node {
	static props = ["value"];

	value: T;

	constructor(value: T) {
		super();
		this.value = value;
	}

	valueOf(): T {
		return this.value;
	}

	toString(): string {
		return this.value.toString();
	}
}

export class Null extends Node {
	valueOf(): null {
		return null;
	}

	toString(): string {
		return "null";
	}
}

export class Number extends Value<number> {}

export class String extends Value<string> {}

export class Bool extends Value<boolean> {}
