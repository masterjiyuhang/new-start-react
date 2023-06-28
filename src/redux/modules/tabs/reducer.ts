import { HOME_URL } from "@/config/config";
import produce from "immer";
import * as types from "@/redux/mutation-types";
import { TabsState } from "@/redux/interface";

// interface TabsState {
// 	tabsActive: string;
// 	tabsList: Menu.MenuOptions[];
// }
const tabState: TabsState = {
	tabsActive: HOME_URL,
	tabsList: [{ title: "首页", path: HOME_URL }]
};

const tabsReducer = (state: TabsState = tabState, action: any) => {
	return produce(state, draftState => {
		switch (action.type) {
			case types.SET_TABS_LIST:
				if (draftState.tabsList.every(item => item.path !== action.tabItem.path)) {
					draftState.tabsList.push(action.tabItem);
				}
				break;
			case types.SET_TABS_ACTIVE:
				draftState.tabsActive = action.tabsActive;
				break;
			default:
				return draftState;
		}
	});
};

export default tabsReducer;
