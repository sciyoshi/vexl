import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp } from "../nodes";
import { Connective, Condition } from "./utils";
import { LogicCondition } from "./LogicCondition";
import { ConnectiveButton } from "./ConnectiveButton";

export const LogicGroup: React.FunctionComponent<{
	items: Condition[];
	connectives: Connective[];

	onItemsChanged: (items: Condition[]) => void;
	onConnectivesChanged: (items: Connective[]) => void;

	schema: GraphQLObjectType;
}> = ({ items, connectives, onItemsChanged, onConnectivesChanged, schema }) => {
	const onItemChange = (i: number, item: Condition) => {
		const result = Array.from(items);

		result.splice(i, 1, item);

		onItemsChanged(result);
	};

	const onItemRemove = (i: number) => {
		const result = Array.from(items);

		result.splice(i, 1);

		onItemsChanged(result);

		const conns = Array.from(connectives);

		conns.splice(i, 1);

		onConnectivesChanged(conns);
	};

	const onItemAdd = (i: number) => {
		const result = Array.from(items);

		result.splice(i + 1, 0, { variable: null, predicate: null });

		onItemsChanged(result);

		const conns = Array.from(connectives);

		conns.splice(i, 0, Connective.AND);

		onConnectivesChanged(conns);
	};

	const onConnectiveChange = (i: number) => {
		const result = Array.from(connectives);

		result.splice(i, 1, result[i] == Connective.AND ? Connective.OR : Connective.AND);

		onConnectivesChanged(result);
	};

	return (
		<div>
			{items.map((item, i) => (
				<React.Fragment key={i}>
					{i > 0 ? (
						<ConnectiveButton onClick={() => onConnectiveChange(i - 1)} key={`button${i}`} type={connectives[i - 1]} />
					) : null}
					<LogicCondition
						key={`condition${i}`}
						schema={schema}
						condition={item}
						onChange={item => onItemChange(i, item)}
						onAdd={() => onItemAdd(i)}
						onRemove={() => onItemRemove(i)}
					/>
				</React.Fragment>
			))}
		</div>
	);
};
