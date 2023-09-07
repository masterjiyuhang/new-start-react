import { useRootStore } from "@/mobx-store";
import { Button, Card, Checkbox } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";

const TodoCompleted = observer(({ TodoItem }: any) => {
	const { isCompleted, modifyTodoIsCompleted } = TodoItem;

	return (
		<>
			{/* <input type="checkbox" className="toggle" checked={isCompleted} onChange={modifyTodoIsCompleted} /> */}
			<Checkbox checked={isCompleted} onChange={modifyTodoIsCompleted} />
		</>
	);
});

const TodoRemove = observer(({ id }: { id: any }) => {
	const { todoListStore } = useRootStore();
	const { removeTodo } = todoListStore;
	return (
		<>
			<Button type="primary" danger size="small" onClick={() => removeTodo(id)}>
				X
			</Button>
		</>
	);
});

const TodoLabel = observer(({ todoItem }: { todoItem: any }) => {
	const { title, modifyTodoIsEditing } = todoItem;
	return (
		<>
			<label className="todo-label" onDoubleClick={modifyTodoIsEditing}>
				{" "}
				{title}
			</label>
		</>
	);
});

const EditLabel = observer(({ todoItem }: { todoItem: any }) => {
	const ref = useRef<HTMLInputElement | null>(null);

	const { isEditing, modifyTodoTitle } = todoItem;

	useEffect(() => {
		if (isEditing && ref.current) {
			ref.current.focus();
		}
	}, [isEditing]);

	const handleBlur = () => {
		if (ref.current) {
			modifyTodoTitle(ref.current.value);
		}
	};

	const handleKeyUp = (e: { key: string }) => {
		if (e.key !== "Enter") return;

		if (ref.current) {
			modifyTodoTitle(ref.current.value);
		}
	};
	return (
		<>
			<input
				ref={ref}
				type="text"
				className="edit-input"
				defaultValue={todoItem.title}
				onBlur={handleBlur}
				onKeyUp={handleKeyUp}
			/>
		</>
	);
});

const TodoItem = ({ todo }: any) => {
	const { isCompleted, isEditing } = todo;

	const liClassName = clsx({
		completed: isCompleted,
		editing: isEditing
	});
	return (
		<li className={liClassName}>
			<Card>
				{!isEditing ? (
					<div className="view">
						<TodoCompleted TodoItem={todo} />
						<TodoLabel todoItem={todo} />
						<TodoRemove id={todo.id} />
					</div>
				) : (
					<EditLabel todoItem={todo} />
				)}
			</Card>
		</li>
	);
};

export default observer(TodoItem);
