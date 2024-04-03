import { type RouteObject } from "@/routers/interface";
import { LayoutIndex } from "../constant";
import lazyLoad from "../utils/lazyLoad";
import React from "react";

const assemblyRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "常用组件"
		},
		children: [
			{
				path: "/assembly/guide",
				element: lazyLoad(React.lazy(async () => await import("@/views/assembly/guide/index"))),
				meta: {
					requiresAuth: true,
					title: "引导页",
					key: "guide"
				}
			},
			{
				path: "/assembly/selectIcon",
				element: lazyLoad(React.lazy(async () => await import("@/views/assembly/selectIcon/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "Icon 选择",
					key: "selectIcon"
				}
			},
			{
				path: "/assembly/svgIcon",
				element: lazyLoad(React.lazy(async () => await import("@/views/assembly/svgIcon/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "Svg Icon ",
					key: "selectIcon"
				}
			},
			{
				path: "/assembly/batchImport",
				element: lazyLoad(React.lazy(async () => await import("@/views/assembly/batchImport/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "批量导入数据",
					key: "selectIcon"
				}
			},
			{
				path: "/assembly/earth",
				element: lazyLoad(React.lazy(async () => await import("@/views/assembly/earth/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "3D地球",
					key: "selectIcon"
				}
			},
			{
				path: "/assembly/button",
				element: lazyLoad(React.lazy(async () => await import("@/views/assembly/button/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "常见button",
					key: "selectIcon"
				}
			}
		]
	}
];

export default assemblyRouter;
