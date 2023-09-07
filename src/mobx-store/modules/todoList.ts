import { observable, makeObservable, action, flow } from "mobx";
import Todo from "./todo";
import axios from "axios";

export default class TodoList {
	todoList: any[];
	constructor() {
		this.todoList = [];

		makeObservable(this, {
			todoList: observable,
			addTodo: action.bound,
			loadTodoList: flow,
			removeTodo: action.bound
		});

		this.loadTodoList();
	}

	addTodo(title: any) {
		this.todoList.push(new Todo({ title, id: this.createTodoId() }));
		console.log(this.todoList, "是否添加成功");
	}

	removeTodo(id: any) {
		this.todoList = this.todoList.filter(todo => todo.id !== id);
	}

	createTodoId() {
		if (!this.todoList.length) {
			return 1;
		}

		const res = this.todoList.reduce((id, item) => {
			return id < item.id ? item.id : id;
		}, 0);
		return res + 1;
	}

	*loadTodoList(): Generator<any, any, any> {
		let response = yield axios.get("http://localhost:3001/todos");
		response.data.forEach((todo: { id: any; title: any; isCompleted?: boolean | undefined }) => {
			this.todoList.push(new Todo(todo));
		});
	}
}
