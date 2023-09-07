import { makeAutoObservable } from "mobx";
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
		makeAutoObservable(this);
	}
}
