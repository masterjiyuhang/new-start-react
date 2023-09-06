import { makeObservable, observable, action } from "mobx";

class CounterStore {
	count: number;
	constructor() {
		this.count = 0;
		makeObservable(this, {
			count: observable,
			increment: action,
			decrement: action
		});
	}

	increment() {
		this.count += 1;
		console.log("调用了吗", this.count);
	}

	decrement() {
		this.count -= 1;
	}
}
const counter = new CounterStore();
export default counter;
