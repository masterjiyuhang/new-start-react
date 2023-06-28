import { INCREMENT, DECREMENT } from "@/redux/mutation-types";
import type { Dispatch } from "react";

export const increment = (payload?: number) => ({ type: INCREMENT, payload: payload });
export const decrement = (payload: number) => ({ type: DECREMENT, payload: payload });

export const incrementAsync = (delay: number) => {
	console.log(delay, "能打印出来吗");
	return (dispatch: Dispatch<any>) => {
		setTimeout(() => {
			dispatch(increment());
		}, delay);
	};
};
