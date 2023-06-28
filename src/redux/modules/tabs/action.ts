import * as types from "@/redux/mutation-types";

// Set Tabs List
export const setTabsList = (tabsList: Menu.MenuOptions) => ({
	type: types.SET_TABS_LIST,
	tabsList
});

// setTabsActive
export const setTabsActive = (tabsActive: string) => ({
	type: types.SET_TABS_ACTIVE,
	tabsActive
});
