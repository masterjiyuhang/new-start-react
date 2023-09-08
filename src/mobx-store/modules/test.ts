import { action, observable } from "mobx";

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
}

export default TestStore;
