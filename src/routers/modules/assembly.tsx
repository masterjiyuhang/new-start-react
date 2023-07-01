import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "../constant";
import lazyLoad from "../utils/lazyLoad";
import React from "react";

const assemblyRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "常用组件"
		},
		children: [
			{
				path: "/assembly/guide",
				element: lazyLoad(React.lazy(() => import("@/views/assembly/guide/index"))),
				meta: {
					requiresAuth: true,
					title: "引导页",
					key: "guide"
				}
			}
		]
	}
];

export default assemblyRouter;
