import { observable, makeObservable, action, flow, computed } from "mobx";
import Todo from "./todo";
import axios from "axios";

export default class TodoList {
	todoList: any[];
	filterCondition: "All" | "Active" | "Completed";
	constructor() {
		this.todoList = [];
		this.filterCondition = "All";

		makeObservable(this, {
			todoList: observable,
			addTodo: action.bound,
			loadTodoList: flow,
			removeTodo: action.bound,
			removeCompletedTodo: action.bound,
			hiddenCompletedTodo: action.bound,
			unCompletedTodoListCount: computed,

			filterCondition: observable,
			changeFilterCondition: action.bound,
			filterTodoList: computed
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

	removeCompletedTodo() {
		this.todoList = this.todoList.filter(todoItem => !todoItem.isCompleted);
	}

	hiddenCompletedTodo() {
		// this.todoList.map(todoItem => {
		// 	return (todoItem.isHidden = todoItem.isCompleted ? true : false);
		// });
		// console.log("想要隐藏已经完成的");
		this.filterCondition = "Active";
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

	// 获取未完成的数量
	get unCompletedTodoListCount() {
		return this.todoList.filter((todo: Todo) => !todo.isCompleted).length;
	}

	changeFilterCondition(condition: any) {
		console.log(condition, "condition");
		this.filterCondition = condition;
	}

	get filterTodoList() {
		switch (this.filterCondition) {
			case "Active":
				return this.todoList.filter(item => !item.isCompleted);
			case "Completed":
				return this.todoList.filter(item => item.isCompleted);
			case "All":
				return this.todoList;
			default:
				break;
		}
	}
}
