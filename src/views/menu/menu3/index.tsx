import { useRootStore } from "@/mobx-store";
import { useState } from "react";
import TodoItem from "./TodoItem";
import { observer } from "mobx-react-lite";

const MainDefault = () => {
	const { todoListStore } = useRootStore();
	const { todoList } = todoListStore;

	return (
		<>
			<section className="main">
				<ul className="todo-list">
					{todoList.map(todo => (
						<TodoItem todo={todo} key={todo.id} />
					))}
				</ul>
			</section>
		</>
	);
};

const Main = observer(MainDefault);

const Menu3 = () => {
	const [title, setTitle] = useState("");
	const { todoListStore } = useRootStore();
	const { addTodo } = todoListStore;
	return (
		<div className="card content-box">
			<span className="text">Menu3 🍓🍇🍈🍉</span>

			<header className="header">
				<h1>todoList</h1>
				<input
					type="text"
					autoFocus
					placeholder="What needs to be done?"
					className="new-todo"
					value={title}
					onChange={e => setTitle(e.target.value)}
					onKeyUp={e => {
						if (e.key !== "Enter") return;
						addTodo(title);
						setTitle("");
					}}
				/>
			</header>

			<Main />
		</div>
	);
};

export default Menu3;
