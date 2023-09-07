import { action, makeObservable, observable } from "mobx";
export default class Todo {
	id: any;
	title: any;
	isCompleted?: boolean;
	isEditing?: boolean;

	constructor(todo: { id: any; title: any; isCompleted?: boolean }) {
		this.id = todo.id;
		this.title = todo.title;
		this.isCompleted = todo.isCompleted || false;
		this.isEditing = false;
		makeObservable(this, {
			title: observable,
			isCompleted: observable,
			isEditing: observable,
			modifyTodoIsCompleted: action.bound,
			modifyTodoIsEditing: action.bound,
			modifyTodoTitle: action.bound
		});
	}

	modifyTodoIsCompleted() {
		console.log(!this.isCompleted, "modifyTodoIsCompleted");
		this.isCompleted = !this.isCompleted;
	}

	modifyTodoIsEditing() {
		this.isEditing = !this.isEditing;
	}

	modifyTodoTitle(title: any) {
		this.title = title;
		this.isEditing = false;
	}
}
