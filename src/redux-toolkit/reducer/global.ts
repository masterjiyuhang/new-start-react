import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

const state: GlobalState = {
	token: "",
	userInfo: "",
	assemblySize: "middle",
	language: "",
	themeConfig: {
		primary: "#1890ff",
		isDark: false,
		weakOrGray: "",
		breadcrumb: true,
		tabs: false,
		footer: false
	}
};

const globalSlice = createSlice({
	name: "global",
	initialState: state,
	reducers: {
		setToken(state: GlobalState, { payload }: PayloadAction<string>) {
			state.token = payload;
		},
		setAssemblySize(state: GlobalState, { payload }: PayloadAction<SizeType>) {
			state.assemblySize = payload;
		},
		setLanguage(state: GlobalState, { payload }: PayloadAction<string>) {
			state.language = payload;
		},
		setDark(state: GlobalState, { payload }: PayloadAction<boolean>) {
			state.themeConfig.isDark = payload;
		},
		setWeakOrGray(state: GlobalState, { payload }: PayloadAction<string>) {
			state.themeConfig.weakOrGray = payload;
		},
		setThemeConfig(state: GlobalState, { payload }: PayloadAction<any>) {
			state.themeConfig = payload;
		}
	}
});

export const { setToken, setAssemblySize, setLanguage, setDark, setWeakOrGray, setThemeConfig } = globalSlice.actions;
export default globalSlice.reducer;
