import { INCREMENT, DECREMENT } from "@/redux/mutation-types";
import type { Dispatch } from "react";

export const increment = (payload?: number) => ({ type: INCREMENT, payload });
export const decrement = (payload: number) => ({ type: DECREMENT, payload });

export const incrementAsync = (delay: number) => {
	return (dispatch: Dispatch<any>) => {
		setTimeout(() => {
			dispatch(increment());
		}, delay);
	};
};
