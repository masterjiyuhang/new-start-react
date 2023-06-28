import { DECREMENT, INCREMENT } from "@/redux/mutation-types";
import produce from "immer";
import type { AnyAction } from "redux";

const initState = {
	count: 1
};

const countReducer = (state = initState, action: AnyAction) => {
	return produce(state, draftState => {
		const { type, payload } = action;
		switch (type) {
			case INCREMENT:
				return { count: draftState.count + 1 };
			case DECREMENT:
				return { count: draftState.count - 1 };
			case "ADD_SOME_NUMBER":
				return { count: draftState.count + payload };
			default:
				return state;
		}
	});
};

export default countReducer;
