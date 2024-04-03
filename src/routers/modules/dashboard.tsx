import { LayoutIndex } from "@/routers/constant";
import { type RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";
import React from "react";

const dashboardRouter: RouteObject[] = [
	{
		path: "/dashboard",
		element: <LayoutIndex />,
		meta: { title: "Dashboard" },
		children: [
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(async () => await import("@/views/dashboard/dataVisualize"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
			{
				path: "/dashboard/embedded",
				element: lazyLoad(React.lazy(async () => await import("@/views/dashboard/embedded"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded"
				}
			}
		]
	}
];

export default dashboardRouter;
