import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";
import TodoListMain from "./TodoListMain";
import "./todoList.scss";

const TodoList = () => {
	return (
		<div className="todoList-demo">
			<h1>Todo List Demo</h1>

			<TodoListHeader />
			<TodoListMain />
			<TodoListFooter />
		</div>
	);
};

export default TodoList;
