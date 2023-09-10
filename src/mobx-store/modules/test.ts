import { action, computed, observable } from "mobx";

/**
 * 用于测试装饰器的使用
 */
class TestStore {
	@observable num = 0;
	@observable loading = false;
	@observable name = "二航 🚀🐢";

	@action.bound
	changeName = (name: string) => {
		this.name = name;
	};

	@action.bound
	resetName = () => {
		this.name = "二航 🚀🐢";
	};

	@computed
	currentNameUp = () => {
		return this.name.toUpperCase();
	};
}

export default TestStore;
