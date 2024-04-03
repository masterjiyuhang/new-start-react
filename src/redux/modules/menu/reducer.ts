import { type AnyAction } from "redux";
import produce from "immer";
import * as types from "@/redux/mutation-types";
import { type MenuState } from "@/redux/interface";

const menuState: MenuState = {
	// menu collapse
	isCollapse: false,
	// menu List
	menuList: []
};

// 创建 menu-reducer
const menu = (state: MenuState = menuState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.UPDATE_COLLAPSE:
				draftState.isCollapse = action.isCollapse;
				break;
			case types.SET_MENU_LIST:
				draftState.menuList = action.menuList;
				break;
			default:
				return draftState;
		}
	});

export default menu;
