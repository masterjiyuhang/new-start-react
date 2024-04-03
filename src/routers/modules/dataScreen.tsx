import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { type RouteObject } from "@/routers/interface";
import lazyLoad from "@/routers/utils/lazyLoad";

const dataScreenRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dataScreen/index",
				element: lazyLoad(React.lazy(async () => await import("@/views/dataScreen/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "数据大屏",
					key: "dataScreen"
				}
			}
		]
	}
];

export default dataScreenRouter;
