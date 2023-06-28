import { AuthState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";
import produce from "immer";
import { AnyAction } from "redux";

const authSate: AuthState = {
	authButtons: {},
	authRouter: []
};
const authReducer = (state: AuthState = authSate, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_AUTH_BUTTONS:
				draftState.authButtons = action.authButtons;
				break;
			case types.SET_AUTH_ROUTER:
				draftState.authRouter = action.authRouter;
				break;
			default:
				return draftState;
		}
	});

export default authReducer;
