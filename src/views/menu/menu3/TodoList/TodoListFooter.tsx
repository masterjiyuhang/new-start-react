import { useRootStore } from "@/mobx-store";
import { Button, Tag } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

const TodoListFooter = () => {
	const { todoListStore } = useRootStore();
	const { unCompletedTodoListCount, filterCondition, changeFilterCondition } = todoListStore;
	return (
		<>
			<div>
				<Tag color="#87d068">未完成的数量：{unCompletedTodoListCount}</Tag>
			</div>
			<ul>
				{["All", "Active", "Completed"].map(item => (
					<li key={item}>
						<Button
							type={filterCondition === item ? "primary" : "default"}
							onClick={() => {
								changeFilterCondition(item);
							}}
						>
							{item}
						</Button>
					</li>
				))}
			</ul>
		</>
	);
};
export default observer(TodoListFooter);
