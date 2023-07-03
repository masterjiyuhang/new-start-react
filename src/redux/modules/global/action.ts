import * as types from "@/redux/mutation-types";
import type { SizeType } from "antd/es/config-provider/SizeContext";

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});

export const setAssemblySize = (assemblySize: SizeType) => ({
	type: types.SET_ASSEMBLY_SIZE,
	assemblySize
});
