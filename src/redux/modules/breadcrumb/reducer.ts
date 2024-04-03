import { type AnyAction } from "redux";
import { type BreadcrumbState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const breadcrumbState: BreadcrumbState = {
	breadcrumbList: {}
};

// breadcrumb reducer
const breadcrumbReducer = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_BREADCRUMB_LIST:
				draftState.breadcrumbList = action.breadcrumbList;
				break;
			default:
				return draftState;
		}
	});

export default breadcrumbReducer;
