import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

const menuState: MenuState = {
	isCollapse: false,
	menuList: []
};

const menuSlice = createSlice({
	name: "menu",
	initialState: menuState,
	reducers: {
		updateCollapse(state: MenuState, { payload }: PayloadAction<boolean>) {
			state.isCollapse = payload;
		},
		setMenuList(state: MenuState, { payload }: PayloadAction<Menu.MenuOptions[]>) {
			state.menuList = payload;
		}
	}
});

export default menuSlice.reducer;
export const { updateCollapse, setMenuList } = menuSlice.actions;
