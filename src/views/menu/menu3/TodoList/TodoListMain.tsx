import { useRootStore } from "@/mobx-store";
import React from "react";
import TodoListItem from "./TodoListItem";
import { Content } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";

const TodoListMain = () => {
	const {
		todoListStore: { filterTodoList }
	} = useRootStore();
	return (
		<Content>
			<section className="main">
				<ul className="todo-list">
					{filterTodoList?.map(todo => (
						<TodoListItem todo={todo} key={todo.id} />
					))}
				</ul>
			</section>
		</Content>
	);
};

export default observer(TodoListMain);
