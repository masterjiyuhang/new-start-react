import { createContext, useContext } from "react";
import CounterStore from "./modules/counter";
import TodoListStore from "./modules/todoList";

class RootStore {
	counterStore: CounterStore;
	todoListStore: TodoListStore;
	constructor() {
		this.counterStore = new CounterStore();
		this.todoListStore = new TodoListStore();
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
