import * as types from "@/redux/mutation-types";

// addTabs
export const addTabs = (tabItem: Menu.MenuOptions) => ({
	type: types.SET_TABS_LIST,
	tabItem
});

// setTabsActive
export const setTabsActive = (tabsActive: string) => ({
	type: types.SET_TABS_ACTIVE,
	tabsActive
});
