import { createContext, useContext } from "react";
import CounterStore from "./modules/counter";
import TodoListStore from "./modules/todoList";
import TestStore from "./modules/test";

class RootStore {
	counterStore: CounterStore;
	todoListStore: TodoListStore;
	TestStore: TestStore;
	constructor() {
		this.counterStore = new CounterStore();
		this.todoListStore = new TodoListStore();
		this.TestStore = new TestStore();
	}
}

const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore | undefined | null>(null);

export const RootStoreProvider = ({ children }: any) => {
	return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
	const rootStore = useContext(RootStoreContext);
	if (!rootStore) {
		throw new Error("useRootStore must be used within a StoreProvider");
	}
	return rootStore;
};
