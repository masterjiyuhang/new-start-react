import { Button } from "antd";
import React from "react";

export default function TodoItem({ todo }: any) {
	return (
		<li>
			<div className="view">
				<input type="checkbox" className="toggle" />
				<label> {todo.title}</label>
				<Button type="primary" danger size="small">
					X
				</Button>
			</div>
		</li>
	);
}
