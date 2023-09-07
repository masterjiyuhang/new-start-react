import { useRootStore } from "@/mobx-store";
import { Tag } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

const TodoListFooter = () => {
	const { todoListStore } = useRootStore();
	const { unCompletedTodoListCount } = todoListStore;
	return (
		<>
			<div>
				<Tag color="#87d068">未完成的数量：{unCompletedTodoListCount}</Tag>
			</div>
		</>
	);
};
export default observer(TodoListFooter);
