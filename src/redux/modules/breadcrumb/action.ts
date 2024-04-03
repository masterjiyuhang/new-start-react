import * as types from "@/redux/mutation-types";

// * setBreadcrumbList
export const setBreadcrumbList = (breadcrumbList: Record<string, any>) => ({
	type: types.SET_BREADCRUMB_LIST,
	breadcrumbList
});
