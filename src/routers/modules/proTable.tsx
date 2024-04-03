import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { type RouteObject } from "@/routers/interface";

// 超级表格模块
const proTableRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "超级表格"
		},
		children: [
			{
				path: "/proTable/useHooks",
				element: lazyLoad(React.lazy(async () => await import("@/views/proTable/useHooks"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Hooks",
					key: "useHooks"
				}
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(async () => await import("@/views/proTable/useComponent"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent"
				}
			}
		]
	}
];

export default proTableRouter;
