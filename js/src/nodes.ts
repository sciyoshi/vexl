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

export function precedence(op: Op): number {
	switch (op) {
		case Op.OR:
			return 10;
		case Op.AND:
			return 20;
		case Op.NOT:
			return 30;
		case Op.IS:
			return 40;
		case Op.ISNOT:
			return 40;
		case Op.IN:
			return 40;
		case Op.NOTIN:
			return 40;
		case Op.CT:
			return 40;
		case Op.NOTCT:
			return 40;
		case Op.EQ:
			return 40;
		case Op.NE:
			return 40;
		case Op.GE:
			return 40;
		case Op.GT:
			return 40;
		case Op.LE:
			return 40;
		case Op.LT:
			return 40;
		case Op.ADD:
			return 50;
		case Op.SUB:
			return 50;
		case Op.MUL:
			return 60;
		case Op.DIV:
			return 60;
	}
}

export function paren(parent: OpNode, child: Node): string {
	if (!(child instanceof UnaryOp || child instanceof BoolOp || child instanceof BinOp)) {
		return child.toString();
	}

	if (precedence(parent.op) <= precedence(child.op)) {
		return child.toString();
	}

	return `(${child.toString()})`;
}

export class Node {
	static props: string[] = [];
}

export interface OpNode {
	op: Op;
}

export class UnaryOp extends Node implements OpNode {
	static props = ["op", "arg"];

	op: Op;
	arg: Node;

	constructor(op: Op, arg: Node) {
		super();
		this.op = op;
		this.arg = arg;
	}

	toString(): string {
		return `${this.op} ${paren(this, this.arg)}`;
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
		return this.args.map(el => paren(this, el)).join(` ${this.op} `);
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

	toString(): string {
		return `${paren(this, this.left)} ${this.op} ${paren(this, this.right)}`;
	}
}

export class Empty extends Node {
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

	toString(): string {
		return this.name;
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
