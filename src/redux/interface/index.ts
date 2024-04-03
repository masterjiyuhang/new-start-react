import type { SizeType } from "antd/es/config-provider/SizeContext";

/* themeConfigProp */
/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* TabsState */
export interface TabsState {
	tabsActive?: string;
	cch?: string;
	tabsList: Menu.MenuOptions[];
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: Record<string, any>;
}

/* AuthState */
export interface AuthState {
	authButtons: Record<string, any>;
	authRouter: string[];
}
