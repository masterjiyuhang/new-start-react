import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { type RouteObject } from "@/routers/interface";

// 首页模块
const homeRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: lazyLoad(React.lazy(async () => await import("@/views/home/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;
