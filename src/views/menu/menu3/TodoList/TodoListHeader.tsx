import { useRootStore } from "@/mobx-store";
import React, { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { Button, Col, Input, Row } from "antd";
import { observer } from "mobx-react-lite";

function TodoListHeader() {
	const [title, setTitle] = useState("");
	const { todoListStore } = useRootStore();
	const { addTodo, removeCompletedTodo, hiddenCompletedTodo } = todoListStore;
	return (
		<>
			<Header>
				<Input
					type="text"
					autoFocus
					placeholder="什么东西干完了？"
					className="new-todo"
					value={title}
					onChange={e => {
						setTitle(e.target.value);
					}}
					onKeyUp={e => {
						if (e.key !== "Enter") return;
						addTodo(title);
						setTitle("");
					}}
				/>

				<Button
					type="link"
					onClick={() => {
						addTodo(title);
						setTitle("");
					}}
				>
					新增
				</Button>
			</Header>
			<Row gutter={16}>
				<Col span={8}>
					<Button danger type="primary" onClick={removeCompletedTodo}>
						删除已完成的项目
					</Button>
				</Col>
				<Col span={8}>
					<Button type="primary" onClick={hiddenCompletedTodo}>
						隐藏已完成的项目
					</Button>
				</Col>
			</Row>
		</>
	);
}

export default observer(TodoListHeader);
