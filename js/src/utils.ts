const escapes: { [key:string]: string } = {
	n: "\n",
	t: "\t",
	"\\": "\\",
	'"': '"',
	"'": "'"
};

export function unescapeUnicode(val: string): string {
	return val.replace(/\\([nt\\\'\"])/, (m, c) => escapes[c]);
}
