import { createContext, useContext } from "react";
import CounterStore from "./modules/counter";

class RootStore {
	counterStore: CounterStore;
	constructor() {
		this.counterStore = new CounterStore();
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
