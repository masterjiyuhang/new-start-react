import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { type RouteObject } from "@/routers/interface";

// menu 模块
const menuRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "CSS 案例"
		},
		path: "/demo",
		children: [
			{
				path: "/demo/loading",
				element: lazyLoad(React.lazy(async () => await import("@/views/demo/loading/index"))),
				meta: {
					requiresAuth: true,
					title: "加载中",
					key: "loading"
				}
			},
			{
				path: "/demo/menu2/menu21",
				element: lazyLoad(React.lazy(async () => await import("@/views/menu/menu2/menu21/index"))),
				meta: {
					requiresAuth: true,
					title: "菜单2-1",
					key: "menu21"
				}
			},
			{
				path: "/demo/menu2/menu22/menu221",
				element: lazyLoad(React.lazy(async () => await import("@/views/menu/menu2/menu22/menu221/index"))),
				meta: {
					requiresAuth: true,
					title: "菜单2-2-1",
					key: "menu221"
				}
			},
			{
				path: "/demo/menu2/menu22/menu222",
				element: lazyLoad(React.lazy(async () => await import("@/views/menu/menu2/menu22/menu222/index"))),
				meta: {
					requiresAuth: true,
					title: "菜单2-2-2",
					key: "menu222"
				}
			},
			{
				path: "/demo/menu2/menu23",
				element: lazyLoad(React.lazy(async () => await import("@/views/menu/menu2/menu23/index"))),
				meta: {
					requiresAuth: true,
					title: "菜单2-3",
					key: "menu23"
				}
			},
			{
				path: "/demo/menu3",
				element: lazyLoad(React.lazy(async () => await import("@/views/menu/menu3/index"))),
				meta: {
					requiresAuth: true,
					title: "菜单3",
					key: "menu3"
				}
			}
		]
	}
];

export default menuRouter;
