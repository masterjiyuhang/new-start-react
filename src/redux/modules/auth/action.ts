import * as types from "@/redux/mutation-types";

export const setAuthButtons = (authButtons: Record<string, any>) => ({
	type: types.SET_AUTH_BUTTONS,
	authButtons
});

// * setAuthRouter
export const setAuthRouter = (authRouter: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouter
});
