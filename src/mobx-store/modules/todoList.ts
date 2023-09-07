import { observable, makeObservable, action } from "mobx";
import Todo from "./todo";

export default class TodoList {
	todoList: any[];
	constructor() {
		this.todoList = [];

		makeObservable(this, {
			todoList: observable,
			addTodo: action.bound
		});
	}

	addTodo(title: any) {
		this.todoList.push(new Todo({ title, id: this.createTodoId() }));
		console.log(this.todoList, "是否添加成功");
	}

	createTodoId() {
		if (!this.todoList.length) {
			return 1;
		}

		const res = this.todoList.reduce((id, item) => {
			console.log(id < item.id, "itetasdasd", item.id, id);
			return id < item.id ? item.id : id;
		}, 0);
		console.log(res, "res...");
		return res + 1;
		// return (
		// 	this.todoList.reduce((id, todo) => {
		// 		console.log(id, todo.id, "这为啥啊");
		// 		return id < todo.id ? id : todo.id;
		// 	}, 0) + 1
		// );
	}
}
