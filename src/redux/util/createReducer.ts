import produce from "immer";
import { type ActionFromReducer } from "redux";

export const createReducer = <State, Payload>(
	cases: Record<string, (s: State, action: ActionFromReducer<Payload>) => State | any> = {},
	defaultState: State
) => {
	return (state = defaultState, action: ActionFromReducer<Payload>) =>
		produce(state, (draft: State) => {
			if (action && action.type && cases[action.type] instanceof Function) {
				cases[action.type](draft, action);
			}
		});
};
